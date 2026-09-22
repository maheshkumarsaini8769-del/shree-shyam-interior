import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Printer,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { generateWhatsAppQuoteUrl } from '../services/quoteService';
import { useToast } from '../context/ToastContext';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';

export const QuotePage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearQuote, subtotal, gstAmount, grandTotal } = useQuote();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [siteCity, setSiteCity] = useState('Sikar');
  const [isSent, setIsSent] = useState(false);

  const handlePrint = () => {
    window.print();
    showToast('Print dialog triggered for quotation sheet', 'info');
  };

  const handleSendWhatsApp = async () => {
    if (items.length === 0) {
      showToast('Quotation list is empty', 'error');
      return;
    }

    // Save quote to backend API so it appears in the admin panel
    try {
      await apiService.submitQuote({
        customerName: customerName || 'Anonymous',
        phone: customerPhone || '',
        city: siteCity,
        items: items,
        totalAmount: grandTotal,
      });
    } catch (_) {
      // Non-blocking — WhatsApp still opens even if API fails
    }

    const url = generateWhatsAppQuoteUrl(items, customerName, customerPhone);
    window.open(url, '_blank');
    setIsSent(true);
    showToast('Quotation sent to Shree Shyam Interior desk via WhatsApp!', 'success');
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 text-charcoal-800">
      <SEOHead
        title="Instant Turnkey Cost Estimator & Quote Sheet | Sikar"
        description="Calculate estimated costs for home interior design, modular kitchens, wardrobes, and materials in Sikar, Rajasthan. Instant BOQ with GST breakdown."
        canonicalPath="/quote"
      />
      {/* Printable Quote Sheet Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-b border-cream-200">
          <div>
            <span className="text-copper-600 text-xs font-bold uppercase tracking-widest block mb-1">
              Shree Shyam Interior • Estimation Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Quotation & Material Cart
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
              Review selected materials, calculate 18% GST, and export directly via PDF or WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2.5 print:hidden">
            <button
              onClick={handlePrint}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-cream-200 hover:border-copper-500 text-forest-900 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40"
            >
              <Printer className="w-4 h-4 text-copper-500" />
              <span>Print / PDF</span>
            </button>

            {items.length > 0 && (
              <button
                onClick={clearQuote}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <ShoppingBag className="w-16 h-16 text-copper-400/40 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Your Quotation List is Empty
            </h2>
            <p className="text-sm text-charcoal-400 max-w-sm mx-auto">
              Browse our catalog to select certified Century marine plywood, Häfele fittings, or designer acrylics.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-copper-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper"
              >
                <span>Browse Materials Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
            {/* Items Table / Cards */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
              <div className="flex items-center justify-between border-b border-cream-200 pb-3 text-xs font-bold uppercase tracking-wider text-charcoal-400">
                <span>Selected Material / Product</span>
                <span>Subtotal (INR)</span>
              </div>

              <div className="space-y-4 divide-y divide-cream-100">
                {items.map((item) => {
                  const lineTotal = item.unitPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 rounded-xl object-cover border border-cream-200 shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-copper-600">
                            {item.brand} • {item.category}
                          </span>
                          <h4 className="font-bold text-sm text-forest-950">{item.productName}</h4>
                          <div className="text-xs text-charcoal-400 mt-0.5">
                            ₹{item.unitPrice.toLocaleString('en-IN')} / {item.unit}
                          </div>
                          {item.selectedFinish && (
                            <span className="inline-block px-2 py-0.5 mt-1 rounded bg-cream-100 text-[10px] text-charcoal-600">
                              Finish: {item.selectedFinish}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Modifier & Line Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div className="flex items-center gap-2 border border-cream-200 rounded-xl p-1 bg-cream-50 print:hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 rounded-lg bg-white hover:bg-cream-100 text-forest-950 transition-colors shadow-sm"
                            aria-label="Decrease Quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold px-2 text-forest-950 min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 rounded-lg bg-white hover:bg-cream-100 text-forest-950 transition-colors shadow-sm"
                            aria-label="Increase Quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-mono font-bold text-sm sm:text-base text-forest-950">
                            ₹{lineTotal.toLocaleString('en-IN')}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[11px] text-red-500 hover:text-red-700 underline mt-0.5 print:hidden"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Quality Notice */}
              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex items-center gap-3 text-xs text-charcoal-600">
                <ShieldCheck className="w-6 h-6 text-copper-500 shrink-0" />
                <span>
                  All listed products come with direct manufacturer warranties against borer, termite, and hardware cycle failure.
                </span>
              </div>
            </div>

            {/* Sidebar Summary & WhatsApp Dispatch */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-forest-950 text-cream-100 rounded-3xl p-6 sm:p-7 border border-copper-500/30 shadow-elevated space-y-5">
                <h3 className="font-serif font-bold text-xl text-cream-50 border-b border-cream-200/10 pb-3">
                  Summary & Grand Total
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-cream-200">
                    <span>Materials Subtotal:</span>
                    <span className="font-mono font-bold text-cream-50">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-cream-200">
                    <span>GST (18% Applicable):</span>
                    <span className="font-mono font-bold text-copper-300">
                      ₹{gstAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-cream-200">
                    <span>Discount (Festival Offer):</span>
                    <span className="font-mono font-bold text-green-400">Included on Booking</span>
                  </div>

                  <div className="pt-3 border-t border-cream-200/10 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-cream-50">Estimated Total:</span>
                    <span className="font-serif font-bold text-2xl text-copper-400">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Customer Details Input */}
                <div className="pt-3 border-t border-cream-200/10 space-y-3 text-xs print:hidden">
                  <div>
                    <label className="block text-copper-400 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Soni"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-forest-900 border border-cream-200/20 rounded-xl px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-copper-400"
                    />
                  </div>

                  <div>
                    <label className="block text-copper-400 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-forest-900 border border-cream-200/20 rounded-xl px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-copper-400"
                    />
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="pt-2 space-y-3 print:hidden">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-elevated transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send Quote to WhatsApp Desk</span>
                  </button>

                  <Link
                    to="/site-visit"
                    className="w-full py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-copper transition-all"
                  >
                    <span>Book Site Visit for Measurement</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
