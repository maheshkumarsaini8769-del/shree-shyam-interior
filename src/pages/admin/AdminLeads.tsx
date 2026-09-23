import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { apiService, Lead } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await apiService.getLeads();
      setLeads(data);
    } catch {
      showToast('Failed to load site visit leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      await apiService.updateLeadStatus(id, { status: newStatus });
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      showToast(`Lead moved to ${newStatus}`, 'success');
    } catch {
      showToast('Status update failed', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete lead request from "${name}"?`)) return;

    try {
      await apiService.deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast('Lead deleted', 'success');
    } catch {
      showToast('Failed to delete lead', 'error');
    }
  };

  const filtered = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch =
      !search.trim() ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.address && lead.address.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Bookings (Site Visits) CRM
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Real-time pipeline of measurement & site consultation bookings submitted by clients
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-copper-600 dark:text-copper-400 bg-copper-500/10 border border-copper-500/20 px-3 py-1.5 rounded-xl">
            {leads.filter((l) => l.status === 'New').length} New Leads ({leads.length} Total)
          </span>
          <button
            onClick={loadLeads}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 hover:border-copper-500/50 text-xs font-semibold text-charcoal-700 dark:text-cream-100 shadow-soft transition-all active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, mobile number, or city..."
            className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400 shadow-soft"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `All (${leads.length})` },
            { id: 'New', label: `New (${leads.filter((l) => l.status === 'New').length})` },
            { id: 'Contacted', label: 'Contacted' },
            { id: 'Visit Scheduled', label: 'Scheduled' },
            { id: 'Completed', label: 'Completed' }
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

      {/* Leads List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10">
          <CalendarCheck2 className="w-12 h-12 mx-auto text-copper-500/40 mb-3" />
          <h3 className="font-bold text-sm text-forest-950 dark:text-cream-50">No leads found</h3>
          <p className="text-xs text-charcoal-400 dark:text-cream-200/60 mt-1">
            Try switching filter tabs or check back when new site visit forms are submitted.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-sm sm:text-base text-forest-950 dark:text-cream-50">
                    {lead.name}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      lead.status === 'New'
                        ? 'bg-rose-500/15 text-rose-500 border border-rose-500/20'
                        : lead.status === 'Contacted'
                        ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                        : lead.status === 'Visit Scheduled'
                        ? 'bg-blue-500/15 text-blue-500 border border-blue-500/20'
                        : 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-charcoal-500 dark:text-cream-200/70">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-copper-500" />
                    <span>{lead.phone}</span>
                  </div>

                  {lead.address && (
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-copper-500 shrink-0" />
                      <span className="truncate">{lead.address}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-copper-500" />
                    <span>{lead.date || 'Flexible'} • {lead.slot || 'Morning'}</span>
                  </div>
                </div>

                {(lead.roomType || lead.budget || lead.notes) && (
                  <div className="p-2.5 rounded-xl bg-cream-50 dark:bg-[#1A212C] text-xs text-charcoal-600 dark:text-cream-200/80 space-y-1">
                    <div className="flex items-center gap-3">
                      {lead.roomType && <span><strong>Room:</strong> {lead.roomType}</span>}
                      {lead.budget && <span><strong>Budget:</strong> {lead.budget}</span>}
                    </div>
                    {lead.notes && (
                      <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60 italic">
                        "{lead.notes}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Status Selector & Direct WhatsApp Action */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-cream-100 dark:border-cream-200/10">
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                  className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-xs font-bold text-forest-950 dark:text-cream-50 outline-none cursor-pointer"
                >
                  <option value="New">Status: New</option>
                  <option value="Contacted">Status: Contacted</option>
                  <option value="Visit Scheduled">Status: Visit Scheduled</option>
                  <option value="Quotation Shared">Status: Quotation Shared</option>
                  <option value="In Progress">Status: In Progress</option>
                  <option value="Completed">Status: Completed</option>
                  <option value="Cancelled">Status: Cancelled</option>
                </select>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-copper-500/10 text-copper-600 hover:bg-copper-500 hover:text-white text-xs font-bold transition-colors shadow-sm"
                    title="Call Client"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(lead.name)},%20this%20is%20Shree%20Shyam%20Interior%20team%20regarding%20your%20site%20visit%20request.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleDelete(lead.id, lead.name)}
                    className="p-1.5 rounded-xl text-charcoal-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
