import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { QuoteItem } from '../types/quote';
import { Product } from '../types/product';
import { getStoredQuoteItems, saveQuoteItems, createQuoteItemFromProduct } from '../services/quoteService';
import { apiService, FestivalCampaignConfig } from '../services/apiService';
import { useToast } from './ToastContext';

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (product: Product, quantity?: number, finish?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearQuote: () => void;
  totalItemCount: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  appliedCoupon: string | null;
  activeCouponCode: string;
  activeCouponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  gstAmount: number;
  grandTotal: number;
  isItemInQuote: (productId: string) => boolean;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [activeFestival, setActiveFestival] = useState<FestivalCampaignConfig | null>(null);
  const activeFestivalRef = useRef<FestivalCampaignConfig | null>(null);
  const { showToast } = useToast();

  // Keep ref in sync for callbacks
  useEffect(() => {
    activeFestivalRef.current = activeFestival;
  }, [activeFestival]);

  // Sync active festival configuration & listen for real-time changes
  useEffect(() => {
    setItems(getStoredQuoteItems());

    const updateFestivalState = (cfg: FestivalCampaignConfig | null) => {
      if (!cfg) return;
      setActiveFestival(cfg);

      try {
        const savedCoupon = localStorage.getItem('ssi_applied_coupon');
        if (savedCoupon) {
          const parsed = JSON.parse(savedCoupon);
          const currentCode = (parsed.code || '').toUpperCase();

          // If site is in normal mode, remove old festival coupons
          if (cfg.activeFestival === 'normal') {
            const festiveOnlyCodes = ['DIWALI2026', 'DIWALI15', 'DEEPAWALI', 'HOLI2026', 'HOLI12', 'SHUBHLABH', 'NEWYEAR26', 'BHARAT79'];
            if (festiveOnlyCodes.includes(currentCode)) {
              localStorage.removeItem('ssi_applied_coupon');
              setAppliedCoupon(null);
              setDiscountPercent(0);
              return;
            }
          }

          // If festival changed (e.g. from Diwali to Holi), and an old festival coupon is stored,
          // automatically migrate to the new active festival coupon!
          if (cfg.activeFestival !== 'normal' && cfg.couponCode) {
            const activeCode = cfg.couponCode.toUpperCase();
            const isOldFestivalCode = ['DIWALI2026', 'DIWALI15', 'DEEPAWALI', 'HOLI2026', 'HOLI12', 'SHUBHLABH', 'NEWYEAR26', 'BHARAT79'].includes(currentCode);
            if (isOldFestivalCode && currentCode !== activeCode) {
              const newPercent = cfg.discountPercentage || 12;
              localStorage.setItem('ssi_applied_coupon', JSON.stringify({ code: activeCode, percent: newPercent }));
              setAppliedCoupon(activeCode);
              setDiscountPercent(newPercent);
              return;
            }
          }

          setAppliedCoupon(parsed.code);
          setDiscountPercent(parsed.percent || 0);
        }
      } catch {
        // ignore
      }
    };

    apiService.getFestivalCampaign().then(updateFestivalState);

    const handleFestivalChange = (e: CustomEvent<FestivalCampaignConfig>) => {
      if (e.detail) {
        updateFestivalState(e.detail);
      }
    };

    window.addEventListener('ssi_festival_changed' as any, handleFestivalChange);
    return () => {
      window.removeEventListener('ssi_festival_changed' as any, handleFestivalChange);
    };
  }, []);

  const persist = (updated: QuoteItem[]) => {
    setItems(updated);
    saveQuoteItems(updated);
  };

  const activeCouponCode = (activeFestival && activeFestival.activeFestival !== 'normal') ? (activeFestival.couponCode || '') : '';
  const activeCouponDiscount = (activeFestival && activeFestival.activeFestival !== 'normal') ? (activeFestival.discountPercentage || 0) : 0;

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Please enter a valid coupon code' };
    }

    const currentFestival = activeFestivalRef.current;
    let percent = 0;

    // 1. Highest priority: Live Festival Coupon set by Admin
    if (
      currentFestival &&
      currentFestival.activeFestival !== 'normal' &&
      currentFestival.couponCode &&
      code === currentFestival.couponCode.toUpperCase()
    ) {
      percent = currentFestival.discountPercentage || 10;
    }
    // 2. Recognized Festival-specific aliases matching active campaign
    else if (code === 'HOLI2026' || code === 'HOLI12' || code === 'HOLI15' || code === 'RANGOLI') {
      percent = (currentFestival?.activeFestival === 'holi' && currentFestival.discountPercentage)
        ? currentFestival.discountPercentage
        : 12;
    } else if (code === 'DIWALI2026' || code === 'DIWALI15' || code === 'DEEPAWALI') {
      percent = (currentFestival?.activeFestival === 'diwali' && currentFestival.discountPercentage)
        ? currentFestival.discountPercentage
        : 15;
    } else if (code === 'SHUBHLABH' || code === 'NAVRATRI' || code === 'DUSSEHRA') {
      percent = (currentFestival?.activeFestival === 'navratri' && currentFestival.discountPercentage)
        ? currentFestival.discountPercentage
        : 10;
    } else if (code === 'NEWYEAR26' || code === 'NEWYEAR2026') {
      percent = (currentFestival?.activeFestival === 'newyear' && currentFestival.discountPercentage)
        ? currentFestival.discountPercentage
        : 10;
    } else if (code === 'BHARAT79' || code === 'AZADI') {
      percent = (currentFestival?.activeFestival === 'patriot' && currentFestival.discountPercentage)
        ? currentFestival.discountPercentage
        : 10;
    }
    // 3. Evergreen Standard Codes
    else if (code === 'WELCOME10' || code === 'SHYAM10') {
      percent = 10;
    }

    if (percent > 0) {
      setAppliedCoupon(code);
      setDiscountPercent(percent);
      localStorage.setItem('ssi_applied_coupon', JSON.stringify({ code, percent }));
      showToast(`🎉 Festive Coupon "${code}" Applied! Flat ${percent}% OFF`, 'success');
      return { success: true, message: `Coupon ${code} applied successfully!` };
    }

    const suggested = activeCouponCode || 'WELCOME10';
    showToast(`Invalid coupon code "${code}". Try ${suggested}`, 'error');
    return { success: false, message: `Invalid or expired coupon code. Try ${suggested}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    localStorage.removeItem('ssi_applied_coupon');
    showToast('Coupon code removed', 'info');
  };

  const addItem = (product: Product, quantity = 1, finish?: string) => {
    const existingIndex = items.findIndex(
      (item) => item.productId === product.id && (!finish || item.selectedFinish === finish)
    );

    let updated: QuoteItem[];
    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      const newItem = createQuoteItemFromProduct(product, quantity, finish);
      updated = [...items, newItem];
    }

    persist(updated);
    showToast(`Added "${product.name.slice(0, 24)}..." to Quote`, 'success');
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    persist(updated);
    showToast('Item removed from quotation list', 'info');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = items.map((item) => (item.id === id ? { ...item, quantity } : item));
    persist(updated);
  };

  const clearQuote = () => {
    persist([]);
    showToast('Quotation list cleared', 'info');
  };

  const isItemInQuote = (productId: string) => {
    return items.some((item) => item.productId === productId);
  };

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const gstAmount = Math.round(discountedSubtotal * 0.18);
  const grandTotal = discountedSubtotal + gstAmount;

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearQuote,
        totalItemCount,
        subtotal,
        discountPercent,
        discountAmount,
        appliedCoupon,
        activeCouponCode,
        activeCouponDiscount,
        applyCoupon,
        removeCoupon,
        gstAmount,
        grandTotal,
        isItemInQuote
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
