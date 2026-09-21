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
  gstAmount: number;
  grandTotal: number;
  isItemInQuote: (productId: string) => boolean;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    setItems(getStoredQuoteItems());
  }, []);

  const persist = (updated: QuoteItem[]) => {
    setItems(updated);
    saveQuoteItems(updated);
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
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

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
