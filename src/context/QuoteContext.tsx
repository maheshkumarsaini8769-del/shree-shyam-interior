import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuoteItem } from '../types/quote';
import { Product } from '../types/product';
import { getStoredQuoteItems, saveQuoteItems, createQuoteItemFromProduct } from '../services/quoteService';
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
  const { showToast } = useToast();

  useEffect(() => {
    setItems(getStoredQuoteItems());
    try {
      const savedCoupon = localStorage.getItem('ssi_applied_coupon');
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        if (parsed.code && parsed.percent) {
          setAppliedCoupon(parsed.code);
          setDiscountPercent(parsed.percent);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = (updated: QuoteItem[]) => {
    setItems(updated);
    saveQuoteItems(updated);
  };

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Please enter a valid coupon code' };
    }

    // Check against standard and festive codes
    let percent = 0;
    if (code === 'DIWALI2026' || code === 'DIWALI15' || code === 'DEEPAWALI') {
      percent = 15;
    } else if (code === 'HOLI2026' || code === 'HOLI12') {
      percent = 12;
    } else if (code === 'SHUBHLABH' || code === 'NAVRATRI') {
      percent = 10;
    } else if (code === 'NEWYEAR26' || code === 'NEWYEAR2026') {
      percent = 10;
    } else if (code === 'WELCOME10' || code === 'SHYAM10') {
      percent = 10;
    } else {
      // Check active festival from storage
      try {
        const activeCampaign = localStorage.getItem('ssi_festival_campaign_v1');
        if (activeCampaign) {
          const parsed = JSON.parse(activeCampaign);
          if (parsed.couponCode && parsed.couponCode.toUpperCase() === code) {
            percent = parsed.discountPercentage || 10;
          }
        }
      } catch {
        // ignore
      }
    }

    if (percent > 0) {
      setAppliedCoupon(code);
      setDiscountPercent(percent);
      localStorage.setItem('ssi_applied_coupon', JSON.stringify({ code, percent }));
      showToast(`🎉 Festive Coupon "${code}" Applied! Flat ${percent}% OFF`, 'success');
      return { success: true, message: `Festive coupon ${code} applied successfully!` };
    }

    showToast(`Invalid coupon code "${code}". Try DIWALI2026`, 'error');
    return { success: false, message: 'Invalid or expired coupon code' };
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
