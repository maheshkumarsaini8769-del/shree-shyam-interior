import React, { useState, useEffect } from 'react';
import {
  FileText,
  Phone,
  Trash2,
  Calendar,
  ShoppingBag,
  ExternalLink,
  Search,
  DollarSign,
  Clock,
  CheckCircle2,
  Printer,
  MessageSquare
} from 'lucide-react';
import { apiService, QuoteRequest } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';
import { QuotationPDFModal } from '../../components/common/QuotationPDFModal';

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedQuoteForPdf, setSelectedQuoteForPdf] = useState<QuoteRequest | null>(null);
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

  const handleStatusChange = async (id: string, newStatus: NonNullable<QuoteRequest['status']>) => {
    try {
      await apiService.updateQuoteStatus(id, { status: newStatus });
      setQuotes((prev) =>
        prev.map((quote) => (quote.id === id ? { ...quote, status: newStatus } : quote))
      );
      showToast(`Quote status updated to ${newStatus}`, 'success');
    } catch {
      showToast('Failed to update quote status', 'error');
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

  const filtered = quotes.filter((q) => {
    const status = q.status || 'New';
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    const matchesSearch =
      !search.trim() ||
      q.customerName.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.includes(search) ||
      (q.city && q.city.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalQuotedValue = quotes.reduce((acc, q) => acc + (q.totalAmount || 0), 0);
  const newQuotesCount = quotes.filter((q) => !q.status || q.status === 'New').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
              Material Quotations & Estimates
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 font-mono text-xs font-bold border border-copper-500/20">
              {quotes.length}
            </span>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Customer inquiries generated from the live Material Quotation & BOQ Cart on /quote
          </p>
        </div>

        <div className="flex items-center gap-2">
          {newQuotesCount > 0 && (
            <span className="text-xs font-bold text-copper-600 dark:text-copper-400 bg-copper-500/10 border border-copper-500/20 px-3 py-1.5 rounded-xl">
              {newQuotesCount} New Quotes
            </span>
          )}
          <button
            onClick={loadQuotes}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 hover:border-copper-500/50 text-xs font-semibold text-charcoal-700 dark:text-cream-100 shadow-soft transition-all active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Refreshing...' : 'Refresh Quotes'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-charcoal-400 dark:text-cream-200/60 block">Total Quotes</span>
            <span className="font-serif font-bold text-2xl text-forest-950 dark:text-cream-50">{quotes.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-charcoal-400 dark:text-cream-200/60 block">Pending Quotes</span>
            <span className="font-serif font-bold text-2xl text-amber-500">{newQuotesCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-charcoal-400 dark:text-cream-200/60 block">Quoted Material Pipeline</span>
            <span className="font-serif font-bold text-2xl text-copper-600 dark:text-copper-400">₹{totalQuotedValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, or city..."
            className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400 shadow-soft"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `All (${quotes.length})` },
            { id: 'New', label: `New (${newQuotesCount})` },
            { id: 'Contacted', label: 'Contacted' },
            { id: 'Quotation Shared', label: 'Quotation Shared' },
            { id: 'Converted', label: 'Converted' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-copper-500 text-white shadow-sm'
                  : 'bg-white dark:bg-[#121720] text-charcoal-600 dark:text-cream-200/70 border border-cream-200 dark:border-cream-200/10 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <FileText className="w-12 h-12 mx-auto text-copper-500/40 mb-3" />
          <h3 className="font-bold text-sm text-forest-950 dark:text-cream-50">No quotation inquiries found</h3>
          <p className="text-xs text-charcoal-400 dark:text-cream-200/60 mt-1">
            When users build a quotation list and submit it on /quote, it will be logged here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => {
            const cleanPhone = q.phone?.replace(/\D/g, '') || '';
            const waLink = cleanPhone ? `https://wa.me/91${cleanPhone.startsWith('91') ? cleanPhone.slice(2) : cleanPhone}` : null;
            const currentStatus = q.status || 'New';

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-100 dark:border-cream-200/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-forest-950 dark:text-cream-50">
                          {q.customerName || 'Anonymous Customer'}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            currentStatus === 'New'
                              ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                              : currentStatus === 'Contacted'
                              ? 'bg-blue-500/15 text-blue-600 border border-blue-500/30'
                              : currentStatus === 'Converted'
                              ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                              : 'bg-copper-500/15 text-copper-600 border border-copper-500/30'
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5 font-mono">
                        <span>ID: {q.id}</span>
                        {q.city && <span>• City: {q.city}</span>}
                        <span>•</span>
                        <span>{new Date(q.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-copper-600 dark:text-copper-400 mr-2">
                      ₹{q.totalAmount?.toLocaleString('en-IN') || '0'}
                    </span>

                    {/* Official Branded PDF / Print Quote */}
                    <button
                      onClick={() => setSelectedQuoteForPdf(q)}
                      className="p-2 rounded-xl bg-copper-500/10 text-copper-600 dark:text-copper-400 hover:bg-copper-500 hover:text-white transition-colors"
                      title="View & Print Official Letterhead PDF Quote"
                    >
                      <Printer className="w-4 h-4" />
                    </button>

                    {/* Quick Call */}
                    {q.phone && (
                      <a
                        href={`tel:${q.phone}`}
                        className="p-2 rounded-xl bg-copper-500/10 text-copper-600 hover:bg-copper-500 hover:text-white transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}

                    {/* Quick Smart WhatsApp */}
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/91${cleanPhone.startsWith('91') ? cleanPhone.slice(2) : cleanPhone}?text=${encodeURIComponent(
                          `Namaste ${q.customerName || 'ji'}! Shree Shyam Interior Sikar se baat kar rahe hain. Aapka requested material quotation (₹${(q.totalAmount || 0).toLocaleString('en-IN')}) hamare paas prapt hua hai. Aapse detailed scope discuss karne ke liye kab baat karein?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                        title="Send WhatsApp Message to Customer"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}

                    {/* Status Dropdown */}
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(q.id, e.target.value as any)}
                      className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/20 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quotation Shared">Quotation Shared</option>
                      <option value="Converted">Converted</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-2 rounded-xl text-charcoal-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Quote"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {q.items.map((item: any, i: number) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl border border-cream-100 dark:border-cream-200/10 bg-white dark:bg-[#151D28] text-xs flex items-center justify-between"
                        >
                          <div className="truncate mr-2">
                            <span className="font-bold text-forest-950 dark:text-cream-50 block truncate">
                              {item.productName || item.name}
                            </span>
                            <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 font-mono">
                              Qty: {item.quantity} • ₹{item.unitPrice?.toLocaleString('en-IN')}
                            </span>
                          </div>
                          {item.selectedFinish && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-copper-500/15 text-copper-600 font-semibold shrink-0">
                              {item.selectedFinish}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Official PDF Letterhead Quotation Modal */}
      {selectedQuoteForPdf && (
        <QuotationPDFModal
          isOpen={!!selectedQuoteForPdf}
          onClose={() => setSelectedQuoteForPdf(null)}
          quoteId={selectedQuoteForPdf.id}
          customerName={selectedQuoteForPdf.customerName}
          customerPhone={selectedQuoteForPdf.phone}
          customerCity={selectedQuoteForPdf.city || 'Sikar, Rajasthan'}
          items={selectedQuoteForPdf.items || []}
          subtotal={Math.round((selectedQuoteForPdf.totalAmount || 0) / 1.18)}
          gstAmount={Math.round((selectedQuoteForPdf.totalAmount || 0) - ((selectedQuoteForPdf.totalAmount || 0) / 1.18))}
          grandTotal={selectedQuoteForPdf.totalAmount || 0}
        />
      )}
    </div>
  );
};
