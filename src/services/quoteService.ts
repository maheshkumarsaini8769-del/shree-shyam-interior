import { QuoteItem } from '../types/quote';
import { Product } from '../types/product';

const QUOTE_STORAGE_KEY = 'ssi_quote_items';

export const getStoredQuoteItems = (): QuoteItem[] => {
  try {
    const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse quote items from storage', e);
    return [];
  }
};

export const saveQuoteItems = (items: QuoteItem[]): void => {
  try {
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save quote items to storage', e);
  }
};

export const createQuoteItemFromProduct = (product: Product, quantity = 1, finish?: string): QuoteItem => {
  return {
    id: `${product.id}-${Date.now()}`,
    productId: product.id,
    productName: product.name,
    category: product.category,
    brand: product.brand,
    image: product.image,
    unitPrice: product.price || 0,
    unit: product.unit || 'unit',
    quantity,
    selectedFinish: finish || (product.finishes ? product.finishes[0] : undefined),
  };
};

export const generateWhatsAppQuoteUrl = (items: QuoteItem[], customerName?: string, phone?: string): string => {
  const businessPhone = '919876543210'; // Shree Shyam Interior official desk
  let message = `*Namaste Shree Shyam Interior!*\nI would like to request a detailed formal quote for the following materials:\n\n`;

  if (customerName) {
    message += `*Customer Name:* ${customerName}\n`;
  }
  if (phone) {
    message += `*Contact:* ${phone}\n\n`;
  }

  let total = 0;
  items.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    total += itemTotal;
    message += `${index + 1}. *${item.productName}* (${item.brand})\n`;
    message += `   Qty: ${item.quantity} ${item.unit} @ ₹${item.unitPrice.toLocaleString('en-IN')}\n`;
    if (item.selectedFinish) {
      message += `   Finish: ${item.selectedFinish}\n`;
    }
  });

  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

  message += `\n*Subtotal:* ₹${total.toLocaleString('en-IN')}`;
  message += `\n*Est. GST (18%):* ₹${gst.toLocaleString('en-IN')}`;
  message += `\n*Est. Total:* ₹${grandTotal.toLocaleString('en-IN')}`;
  message += `\n\nPlease share delivery timelines to Sikar/Rajasthan and best available discount.`;

  return `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;
};
