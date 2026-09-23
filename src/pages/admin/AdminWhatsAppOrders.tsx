import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Trash2,
  Calendar,
  ShoppingBag,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  DollarSign,
  User
} from 'lucide-react';
import { apiService, WhatsAppOrder } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminWhatsAppOrders: React.FC = () => {
  const [orders, setOrders] = useState<WhatsAppOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await apiService.getWhatsAppOrders();
      setOrders(data);
    } catch {
      showToast('Failed to load WhatsApp orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: WhatsAppOrder['status']) => {
    try {
      await apiService.updateWhatsAppOrderStatus(id, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
      );
      showToast(`Order status updated to ${newStatus}`, 'success');
    } catch {
      showToast('Failed to update order status', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete WhatsApp order record from "${name}"?`)) return;
    try {
      await apiService.deleteWhatsAppOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      showToast('WhatsApp order deleted', 'success');
    } catch {
      showToast('Failed to delete order', 'error');
    }
  };

  const filtered = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      !search.trim() ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      (order.message && order.message.toLowerCase().includes(search.toLowerCase())) ||
      (order.orderType && order.orderType.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalValue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const newCount = orders.filter((o) => o.status === 'New').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
              WhatsApp Orders & Direct Inquiries
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] font-mono text-xs font-bold border border-[#25D366]/30">
              {orders.length}
            </span>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Dedicated pipeline of customer orders, inquiries, and material carts dispatched directly via WhatsApp Desk
          </p>
        </div>

        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-3 py-1.5 rounded-xl">
              {newCount} New Orders
            </span>
          )}
          <button
            onClick={loadOrders}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 hover:border-copper-500/50 text-xs font-semibold text-charcoal-700 dark:text-cream-100 shadow-soft transition-all active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Refreshing...' : 'Refresh Orders'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-charcoal-400 dark:text-cream-200/60 block">Total WhatsApp Orders</span>
            <span className="font-serif font-bold text-2xl text-forest-950 dark:text-cream-50">{orders.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-charcoal-400 dark:text-cream-200/60 block">Pending / New Orders</span>
            <span className="font-serif font-bold text-2xl text-amber-500">{newCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-charcoal-400 dark:text-cream-200/60 block">Total Quotation Value</span>
            <span className="font-serif font-bold text-2xl text-copper-600 dark:text-copper-400">₹{totalValue.toLocaleString('en-IN')}</span>
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
            placeholder="Search by customer name, phone number, or order details..."
            className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400 shadow-soft"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `All (${orders.length})` },
            { id: 'New', label: `New (${orders.filter((o) => o.status === 'New').length})` },
            { id: 'Contacted', label: 'Contacted' },
            { id: 'In Discussion', label: 'Discussion' },
            { id: 'Order Confirmed', label: 'Confirmed' },
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

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <MessageSquare className="w-12 h-12 mx-auto text-[#25D366]/40 mb-3" />
          <h3 className="font-bold text-sm text-forest-950 dark:text-cream-50">No WhatsApp orders found</h3>
          <p className="text-xs text-charcoal-400 dark:text-cream-200/60 mt-1">
            When users click "Send Quote to WhatsApp Desk" on /quote or message the WhatsApp desk, orders appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const cleanPhone = order.phone?.replace(/\D/g, '') || '';
            const waLink = cleanPhone ? `https://wa.me/91${cleanPhone.startsWith('91') ? cleanPhone.slice(2) : cleanPhone}` : null;

            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-100 dark:border-cream-200/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-forest-950 dark:text-cream-50">
                          {order.customerName || 'WhatsApp Client'}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-100 dark:bg-[#1A212C] text-copper-600 dark:text-copper-400 border border-copper-500/20">
                          {order.orderType || 'Quotation Order'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5 font-mono">
                        <span>ID: {order.id}</span>
                        <span>•</span>
                        <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-2.5">
                    {order.totalAmount ? (
                      <span className="font-serif font-bold text-base sm:text-lg text-copper-600 dark:text-copper-400 mr-2">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    ) : null}

                    {/* Quick Call */}
                    {order.phone && (
                      <a
                        href={`tel:${order.phone}`}
                        className="p-2 rounded-xl bg-copper-500/10 text-copper-600 hover:bg-copper-500 hover:text-white transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}

                    {/* Quick WhatsApp Chat */}
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                      className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/20 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Order Confirmed">Order Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(order.id, order.customerName)}
                      className="p-2 rounded-xl text-charcoal-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Contact & Message Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-600 dark:text-cream-200/80">
                  <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C] space-y-1">
                    <div className="font-semibold text-charcoal-700 dark:text-cream-100 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-copper-500" />
                      <span>Contact: {order.phone || 'Not provided'}</span>
                    </div>
                    {order.city && (
                      <div className="text-charcoal-500 dark:text-cream-200/60">
                        City/Location: {order.city}
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C] space-y-1">
                    <div className="font-semibold text-charcoal-700 dark:text-cream-100">
                      Inquiry / Order Summary:
                    </div>
                    <p className="text-charcoal-500 dark:text-cream-200/70 line-clamp-2">
                      {order.message || (order.items?.length ? `${order.items.length} materials selected in quotation cart` : 'Direct WhatsApp Inquiry')}
                    </p>
                  </div>
                </div>

                {/* Items preview if present */}
                {order.items && order.items.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60">
                      Cart Materials ({order.items.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {order.items.map((item: any, i: number) => (
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
    </div>
  );
};
