import React, { useState, useEffect } from 'react';
import { FileText, Phone, Trash2, Calendar, ShoppingBag } from 'lucide-react';
import { apiService, QuoteRequest } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const data = await apiService.getQuotes();
      setQuotes(data);
    } catch {
      showToast('Failed to load quotation inquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this quotation record?')) return;
    try {
      await apiService.deleteQuote(id);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      showToast('Quote record deleted', 'success');
    } catch {
      showToast('Failed to delete quote', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
          Quotation Requests & Material Estimates
        </h2>
        <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
          Review customer inquiries generated from the live Quotation Cart
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10">
          <FileText className="w-12 h-12 mx-auto text-copper-500/40 mb-3" />
          <h3 className="font-bold text-sm text-forest-950 dark:text-cream-50">No quotation inquiries yet</h3>
          <p className="text-xs text-charcoal-400 dark:text-cream-200/60 mt-1">
            When users build a quotation list and submit it on /quote, it will be logged here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cream-100 dark:border-cream-200/10">
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">
                    {q.customerName || 'Anonymous Customer'}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5 font-mono">
                    <span>Phone: {q.phone || 'N/A'}</span>
                    {q.city && <span>City: {q.city}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-base text-copper-600 dark:text-copper-400">
                    ₹{q.totalAmount?.toLocaleString('en-IN') || '0'}
                  </span>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items */}
              {q.items && q.items.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60">
                    Requested Items ({q.items.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.items.map((item: any, i: number) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-cream-50 dark:bg-[#1A212C] text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-forest-950 dark:text-cream-50 block truncate">
                            {item.productName || item.name}
                          </span>
                          <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60">
                            Qty: {item.quantity} • ₹{item.unitPrice?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {item.selectedFinish && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-copper-500/15 text-copper-600 font-semibold">
                            {item.selectedFinish}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
