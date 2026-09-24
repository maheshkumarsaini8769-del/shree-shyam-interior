import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  FolderTree,
  Award,
  Briefcase,
  CalendarCheck2,
  FileText,
  TrendingUp,
  Plus,
  ArrowRight,
  Phone,
  MessageCircle,
  MessageSquare,
  Clock,
  Sparkles,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { apiService, Lead, QuoteRequest, WhatsAppOrder } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
    brandsCount: 0,
    projectsCount: 0,
    leadsCount: 0,
    newLeadsCount: 0,
    quotesCount: 0,
    newQuotesCount: 0,
    whatsappOrdersCount: 0,
    newOrdersCount: 0
  });

  const [activeTab, setActiveTab] = useState<'bookings' | 'quotes' | 'whatsapp'>('bookings');
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [allQuotes, setAllQuotes] = useState<QuoteRequest[]>([]);
  const [allWhatsAppOrders, setAllWhatsAppOrders] = useState<WhatsAppOrder[]>([]);
  const [rowLimit, setRowLimit] = useState<'all' | 5 | 10>('all');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [products, categories, brands, projects, leads, quotes, orders] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories(),
        apiService.getBrands(),
        apiService.getProjects(),
        apiService.getLeads(),
        apiService.getQuotes(),
        apiService.getWhatsAppOrders()
      ]);

      const newLeads = leads.filter((l) => l.status === 'New').length;
      const newQuotes = quotes.filter((q) => !q.status || q.status === 'New').length;
      const newOrders = orders.filter((o) => o.status === 'New').length;

      setStats({
        productsCount: products.length,
        categoriesCount: categories.length,
        brandsCount: brands.length,
        projectsCount: projects.length,
        leadsCount: leads.length,
        newLeadsCount: newLeads,
        quotesCount: quotes.length,
        newQuotesCount: newQuotes,
        whatsappOrdersCount: orders.length,
        newOrdersCount: newOrders
      });

      // Keep full arrays so all bookings (e.g. 7 of 7) are accessible on dashboard
      setAllLeads(leads);
      setAllQuotes(quotes);
      setAllWhatsAppOrders(orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      await apiService.updateLeadStatus(id, { status: newStatus });
      setAllLeads((prev) => {
        const updated = prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead));
        setStats((prevStats) => ({
          ...prevStats,
          newLeadsCount: updated.filter((l) => l.status === 'New').length
        }));
        return updated;
      });
      showToast(`Booking status updated to ${newStatus}`, 'success');
    } catch {
      showToast('Failed to update booking status', 'error');
    }
  };

  const displayedLeads = rowLimit === 'all' ? allLeads : allLeads.slice(0, rowLimit);
  const displayedQuotes = rowLimit === 'all' ? allQuotes : allQuotes.slice(0, rowLimit);
  const displayedWhatsAppOrders = rowLimit === 'all' ? allWhatsAppOrders : allWhatsAppOrders.slice(0, rowLimit);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-forest-900 via-[#151D28] to-forest-900 border border-copper-500/30 text-white relative overflow-hidden shadow-card">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/20 text-copper-300 text-[11px] font-bold uppercase tracking-wider mb-3 border border-copper-500/30">
            <Sparkles className="w-3.5 h-3.5 text-copper-400" />
            <span>Real-time Studio Control Center</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-cream-50">
            Welcome, Administrator
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/80 mt-2 leading-relaxed">
            Site visit bookings, material quote inquiries, and WhatsApp orders are synced across all devices with instant live persistence.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              to="/admin/leads"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-glow-copper active:scale-95"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>View Bookings ({stats.leadsCount})</span>
            </Link>
            <Link
              to="/admin/whatsapp-orders"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Orders ({stats.whatsappOrdersCount})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: 'Bookings (Site Visits)',
            value: stats.leadsCount,
            badge: stats.newLeadsCount > 0 ? `${stats.newLeadsCount} New` : null,
            icon: CalendarCheck2,
            link: '/admin/leads',
            color: 'text-rose-500'
          },
          {
            label: 'Material Quotes',
            value: stats.quotesCount,
            badge: stats.newQuotesCount > 0 ? `${stats.newQuotesCount} New` : null,
            icon: FileText,
            link: '/admin/quotes',
            color: 'text-amber-500'
          },
          {
            label: 'WhatsApp Orders',
            value: stats.whatsappOrdersCount,
            badge: stats.newOrdersCount > 0 ? `${stats.newOrdersCount} New` : null,
            icon: MessageSquare,
            link: '/admin/whatsapp-orders',
            color: 'text-emerald-500'
          },
          {
            label: 'Catalog Products',
            value: stats.productsCount,
            icon: Package,
            link: '/admin/products',
            color: 'text-blue-500'
          },
          {
            label: 'Portfolio Projects',
            value: stats.projectsCount,
            icon: Briefcase,
            link: '/admin/projects',
            color: 'text-purple-500'
          },
          {
            label: 'Partner Brands',
            value: stats.brandsCount,
            icon: Award,
            link: '/admin/brands',
            color: 'text-cyan-500'
          }
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              to={kpi.link}
              className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl bg-cream-100 dark:bg-[#1A212C] ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {kpi.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {kpi.badge}
                  </span>
                )}
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-forest-950 dark:text-cream-50">
                  {loading ? '-' : kpi.value}
                </span>
                <span className="block text-xs font-semibold text-charcoal-500 dark:text-cream-200/70 truncate mt-0.5">
                  {kpi.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Multi-Tab Pipeline (Bookings, Quotes, WhatsApp Orders) */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10 p-6 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-200 dark:border-cream-200/10 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'bookings', label: `Bookings (${stats.leadsCount})`, icon: CalendarCheck2 },
              { id: 'quotes', label: `Material Quotes (${stats.quotesCount})`, icon: FileText },
              { id: 'whatsapp', label: `WhatsApp Orders (${stats.whatsappOrdersCount})`, icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-copper-500 text-white shadow-glow-copper'
                      : 'bg-cream-50 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#222B38]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            {/* Row limit toggle */}
            <div className="inline-flex items-center gap-1 bg-cream-100 dark:bg-[#1A212C] p-1 rounded-xl text-xs border border-cream-200/50 dark:border-cream-200/10">
              <span className="text-[10px] font-bold text-charcoal-400 dark:text-cream-200/60 px-2 uppercase tracking-wider">
                Show:
              </span>
              <button
                type="button"
                onClick={() => setRowLimit('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  rowLimit === 'all'
                    ? 'bg-copper-500 text-white shadow-sm'
                    : 'text-charcoal-600 dark:text-cream-200/70 hover:text-forest-950 dark:hover:text-cream-50'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setRowLimit(5)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  rowLimit === 5
                    ? 'bg-copper-500 text-white shadow-sm'
                    : 'text-charcoal-600 dark:text-cream-200/70 hover:text-forest-950 dark:hover:text-cream-50'
                }`}
              >
                Top 5
              </button>
            </div>

            <Link
              to={activeTab === 'bookings' ? '/admin/leads' : activeTab === 'quotes' ? '/admin/quotes' : '/admin/whatsapp-orders'}
              className="text-xs font-bold text-copper-600 dark:text-copper-400 hover:underline flex items-center gap-1"
            >
              <span>Open Dedicated Section</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab 1: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {allLeads.length === 0 ? (
              <div className="py-12 text-center text-charcoal-400 dark:text-cream-200/60">
                <CalendarCheck2 className="w-10 h-10 mx-auto mb-2 opacity-30 text-copper-500" />
                <p className="text-sm font-semibold">No bookings found</p>
                <p className="text-xs">When visitors submit a booking on /site-visit, they appear here.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-cream-200 dark:border-cream-200/10 text-charcoal-400 dark:text-cream-200/60 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-bold">Client Name</th>
                        <th className="pb-3 font-bold">Contact Phone</th>
                        <th className="pb-3 font-bold">Preferred Slot</th>
                        <th className="pb-3 font-bold">Property Details</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold text-right">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100 dark:divide-cream-200/5">
                      {displayedLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-cream-50 dark:hover:bg-[#1A212C]/50 transition-colors">
                          <td className="py-3.5 font-bold text-forest-950 dark:text-cream-50">
                            {lead.name}
                            {lead.address && (
                              <span className="block text-[11px] font-normal text-charcoal-400 dark:text-cream-200/60 truncate max-w-xs">
                                {lead.address}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 font-mono text-charcoal-600 dark:text-cream-200/80">
                            {lead.phone}
                          </td>
                          <td className="py-3.5 text-charcoal-600 dark:text-cream-200/80">
                            <div>{lead.date || 'Flexible'}</div>
                            <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60">{lead.slot || 'Morning'}</span>
                          </td>
                          <td className="py-3.5 text-charcoal-600 dark:text-cream-200/80">
                            <span className="capitalize">{lead.roomType || 'Apartment'}</span>
                            {lead.budget && (
                              <span className="block text-[10px] text-copper-500 font-semibold">{lead.budget}</span>
                            )}
                          </td>
                          <td className="py-3.5">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as any)}
                              className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/20 rounded-lg px-2.5 py-1 text-xs font-semibold text-forest-950 dark:text-cream-50 cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Visit Scheduled">Visit Scheduled</option>
                              <option value="Quotation Shared">Quotation Shared</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="inline-flex items-center gap-2">
                              <a
                                href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(lead.name)},%20this%20is%20Shree%20Shyam%20Interior%20team%20regarding%20your%20site%20visit%20request.`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-copper-500/10 hover:bg-copper-500/20 text-copper-500 transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Count Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-cream-200 dark:border-cream-200/10 text-xs text-charcoal-500 dark:text-cream-200/70">
                  <div>
                    Showing <span className="font-bold text-forest-950 dark:text-cream-50">{displayedLeads.length}</span> of <span className="font-bold text-forest-950 dark:text-cream-50">{allLeads.length}</span> bookings
                    {rowLimit !== 'all' && allLeads.length > displayedLeads.length && (
                      <button
                        type="button"
                        onClick={() => setRowLimit('all')}
                        className="ml-2 text-copper-600 dark:text-copper-400 font-bold hover:underline cursor-pointer"
                      >
                        (Show all {allLeads.length})
                      </button>
                    )}
                  </div>
                  <Link
                    to="/admin/leads"
                    className="font-bold text-copper-600 dark:text-copper-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open Full Bookings Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 2: Material Quotes */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {allQuotes.length === 0 ? (
              <div className="py-12 text-center text-charcoal-400 dark:text-cream-200/60">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
                <p className="text-sm font-semibold">No material quotes found</p>
                <p className="text-xs">When customers generate a BOQ cart on /quote, it appears here.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-cream-200 dark:border-cream-200/10 text-charcoal-400 dark:text-cream-200/60 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-bold">Customer Name</th>
                        <th className="pb-3 font-bold">Contact Phone</th>
                        <th className="pb-3 font-bold">Materials Selected</th>
                        <th className="pb-3 font-bold">Quoted Value</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100 dark:divide-cream-200/5">
                      {displayedQuotes.map((q) => (
                        <tr key={q.id} className="hover:bg-cream-50 dark:hover:bg-[#1A212C]/50 transition-colors">
                          <td className="py-3.5 font-bold text-forest-950 dark:text-cream-50">
                            {q.customerName || 'Anonymous Customer'}
                            {q.city && (
                              <span className="block text-[11px] font-normal text-charcoal-400 dark:text-cream-200/60">
                                City: {q.city}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 font-mono text-charcoal-600 dark:text-cream-200/80">
                            {q.phone || 'N/A'}
                          </td>
                          <td className="py-3.5 text-charcoal-600 dark:text-cream-200/80">
                            <span className="font-semibold">{q.items?.length || 0} Products</span>
                          </td>
                          <td className="py-3.5 font-serif font-bold text-copper-600 dark:text-copper-400">
                            ₹{q.totalAmount?.toLocaleString('en-IN') || '0'}
                          </td>
                          <td className="py-3.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-copper-500/15 text-copper-600 border border-copper-500/30 uppercase">
                              {q.status || 'New'}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="inline-flex items-center gap-2">
                              {q.phone && (
                                <a
                                  href={`tel:${q.phone}`}
                                  className="p-1.5 rounded-lg bg-copper-500/10 hover:bg-copper-500/20 text-copper-500 transition-colors"
                                  title="Call Customer"
                                >
                                  <Phone className="w-4 h-4" />
                                </a>
                              )}
                              <Link
                                to="/admin/quotes"
                                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-600 transition-colors"
                                title="View Quote Details"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Count Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-cream-200 dark:border-cream-200/10 text-xs text-charcoal-500 dark:text-cream-200/70">
                  <div>
                    Showing <span className="font-bold text-forest-950 dark:text-cream-50">{displayedQuotes.length}</span> of <span className="font-bold text-forest-950 dark:text-cream-50">{allQuotes.length}</span> quotes
                    {rowLimit !== 'all' && allQuotes.length > displayedQuotes.length && (
                      <button
                        type="button"
                        onClick={() => setRowLimit('all')}
                        className="ml-2 text-copper-600 dark:text-copper-400 font-bold hover:underline cursor-pointer"
                      >
                        (Show all {allQuotes.length})
                      </button>
                    )}
                  </div>
                  <Link
                    to="/admin/quotes"
                    className="font-bold text-copper-600 dark:text-copper-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open Full Quotes Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 3: WhatsApp Orders */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-4">
            {allWhatsAppOrders.length === 0 ? (
              <div className="py-12 text-center text-charcoal-400 dark:text-cream-200/60">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#25D366]" />
                <p className="text-sm font-semibold">No WhatsApp orders found</p>
                <p className="text-xs">When users dispatch inquiries via WhatsApp Desk, they appear here.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-cream-200 dark:border-cream-200/10 text-charcoal-400 dark:text-cream-200/60 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-bold">Customer Name</th>
                        <th className="pb-3 font-bold">Contact Phone</th>
                        <th className="pb-3 font-bold">Order Type</th>
                        <th className="pb-3 font-bold">Value / Details</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold text-right">Direct Chat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100 dark:divide-cream-200/5">
                      {displayedWhatsAppOrders.map((o) => {
                        const cleanPhone = o.phone?.replace(/\D/g, '') || '';
                        const waLink = cleanPhone ? `https://wa.me/91${cleanPhone.startsWith('91') ? cleanPhone.slice(2) : cleanPhone}` : null;

                        return (
                          <tr key={o.id} className="hover:bg-cream-50 dark:hover:bg-[#1A212C]/50 transition-colors">
                            <td className="py-3.5 font-bold text-forest-950 dark:text-cream-50">
                              {o.customerName || 'WhatsApp Client'}
                            </td>
                            <td className="py-3.5 font-mono text-charcoal-600 dark:text-cream-200/80">
                              {o.phone || 'N/A'}
                            </td>
                            <td className="py-3.5 text-charcoal-600 dark:text-cream-200/80">
                              <span className="font-semibold">{o.orderType}</span>
                            </td>
                            <td className="py-3.5 text-charcoal-600 dark:text-cream-200/80">
                              {o.totalAmount ? (
                                <span className="font-serif font-bold text-copper-600 dark:text-copper-400">
                                  ₹{o.totalAmount.toLocaleString('en-IN')}
                                </span>
                              ) : (
                                <span className="text-charcoal-400">{o.message || 'Direct Chat'}</span>
                              )}
                            </td>
                            <td className="py-3.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 uppercase">
                                {o.status || 'New'}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <div className="inline-flex items-center gap-2">
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] transition-colors"
                                    title="Chat on WhatsApp"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                  </a>
                                )}
                                {o.phone && (
                                  <a
                                    href={`tel:${o.phone}`}
                                    className="p-1.5 rounded-lg bg-copper-500/10 hover:bg-copper-500/20 text-copper-500 transition-colors"
                                    title="Call Customer"
                                  >
                                    <Phone className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Footer Count Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-cream-200 dark:border-cream-200/10 text-xs text-charcoal-500 dark:text-cream-200/70">
                  <div>
                    Showing <span className="font-bold text-forest-950 dark:text-cream-50">{displayedWhatsAppOrders.length}</span> of <span className="font-bold text-forest-950 dark:text-cream-50">{allWhatsAppOrders.length}</span> orders
                    {rowLimit !== 'all' && allWhatsAppOrders.length > displayedWhatsAppOrders.length && (
                      <button
                        type="button"
                        onClick={() => setRowLimit('all')}
                        className="ml-2 text-copper-600 dark:text-copper-400 font-bold hover:underline cursor-pointer"
                      >
                        (Show all {allWhatsAppOrders.length})
                      </button>
                    )}
                  </div>
                  <Link
                    to="/admin/whatsapp-orders"
                    className="font-bold text-copper-600 dark:text-copper-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open Full WhatsApp Orders Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
