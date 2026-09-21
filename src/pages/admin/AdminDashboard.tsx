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
  Clock,
  Sparkles
} from 'lucide-react';
import { apiService, Lead } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
    brandsCount: 0,
    projectsCount: 0,
    leadsCount: 0,
    newLeadsCount: 0,
    quotesCount: 0
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [products, categories, brands, projects, leads, quotes] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories(),
        apiService.getBrands(),
        apiService.getProjects(),
        apiService.getLeads(),
        apiService.getQuotes()
      ]);

      const newLeads = leads.filter((l) => l.status === 'New').length;

      setStats({
        productsCount: products.length,
        categoriesCount: categories.length,
        brandsCount: brands.length,
        projectsCount: projects.length,
        leadsCount: leads.length,
        newLeadsCount: newLeads,
        quotesCount: quotes.length
      });

      setRecentLeads(leads.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      await apiService.updateLeadStatus(id, { status: newStatus });
      setRecentLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      showToast(`Lead status updated to ${newStatus}`, 'success');
    } catch {
      showToast('Failed to update lead status', 'error');
    }
  };

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
            All text, product prices, project photos, partner brands, and incoming site visit leads
            are synced directly with the live website with zero hardcoding.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-glow-copper active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Material</span>
            </Link>
            <Link
              to="/admin/content"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Edit Homepage Banners</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Products', value: stats.productsCount, icon: Package, link: '/admin/products', color: 'text-blue-500' },
          { label: 'Categories', value: stats.categoriesCount, icon: FolderTree, link: '/admin/categories', color: 'text-emerald-500' },
          { label: 'Partner Brands', value: stats.brandsCount, icon: Award, link: '/admin/brands', color: 'text-amber-500' },
          { label: 'Portfolio Projects', value: stats.projectsCount, icon: Briefcase, link: '/admin/projects', color: 'text-purple-500' },
          { label: 'Site Visit Leads', value: stats.leadsCount, badge: stats.newLeadsCount > 0 ? `${stats.newLeadsCount} New` : null, icon: CalendarCheck2, link: '/admin/leads', color: 'text-rose-500' },
          { label: 'Quote Inquiries', value: stats.quotesCount, icon: FileText, link: '/admin/quotes', color: 'text-cyan-500' }
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

      {/* Recent Leads Pipeline */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10 p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-950 dark:text-cream-50">
              Recent Site Visit Leads & Bookings
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
              Client requests submitted via website form
            </p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs font-bold text-copper-600 dark:text-copper-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({stats.leadsCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-charcoal-400 dark:text-cream-200/60">
            <CalendarCheck2 className="w-10 h-10 mx-auto mb-2 opacity-30 text-copper-500" />
            <p className="text-sm font-semibold">No recent site visit leads</p>
            <p className="text-xs">When visitors submit a booking on /site-visit, they appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 dark:border-cream-200/10 text-charcoal-400 dark:text-cream-200/60 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Customer Name</th>
                  <th className="pb-3 font-bold">Phone / WhatsApp</th>
                  <th className="pb-3 font-bold">Preferred Slot</th>
                  <th className="pb-3 font-bold">Room / Budget</th>
                  <th className="pb-3 font-bold">Status Pipeline</th>
                  <th className="pb-3 font-bold text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 dark:divide-cream-200/5">
                {recentLeads.map((lead) => (
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
                      <div>{lead.date || 'Anytime'}</div>
                      <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60">{lead.slot || 'Morning'}</span>
                    </td>
                    <td className="py-3.5 text-charcoal-600 dark:text-cream-200/80">
                      <span className="capitalize">{lead.roomType || 'Living Room'}</span>
                      {lead.budget && (
                        <span className="block text-[10px] text-copper-500 font-semibold">{lead.budget}</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border outline-none cursor-pointer transition-colors ${
                          lead.status === 'New'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                            : lead.status === 'Visit Scheduled'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-500'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                        }`}
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
                          href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(lead.name)},%20this%20is%20Shree%20Shyam%20Interior%20regarding%20your%20site%20visit%20request.`}
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
        )}
      </div>
    </div>
  );
};
