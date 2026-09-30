import React from 'react';
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  ShoppingBag,
  DollarSign,
  Printer,
  Package,
  Layers,
  FileText,
  User,
  CheckCircle2,
  Mail,
  Home
} from 'lucide-react';

export interface OrderDetailItem {
  id?: string;
  productName?: string;
  name?: string;
  brand?: string;
  category?: string;
  unitPrice?: number;
  price?: number;
  quantity: number;
  unit?: string;
  selectedFinish?: string;
  image?: string;
}

export interface RequestDetailsData {
  type: 'quote' | 'whatsapp' | 'lead';
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  city?: string;
  address?: string;
  createdAt: string;
  status: string;
  totalAmount?: number;
  items?: OrderDetailItem[];
  message?: string;
  notes?: string;
  date?: string;
  slot?: string;
  roomType?: string;
  budget?: string;
  orderType?: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RequestDetailsData | null;
  onOpenPdf?: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
  onOpenPdf
}) => {
  if (!isOpen || !data) return null;

  const cleanPhone = data.phone ? data.phone.replace(/\D/g, '') : '';
  const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  
  const typeLabel =
    data.type === 'quote'
      ? 'Material Quotation Order'
      : data.type === 'whatsapp'
      ? `WhatsApp Order (${data.orderType || 'Direct Inquiry'})`
      : 'Site Visit Consultation Booking';

  const typeIcon =
    data.type === 'quote' ? (
      <FileText className="w-5 h-5 text-copper-500" />
    ) : data.type === 'whatsapp' ? (
      <MessageSquare className="w-5 h-5 text-[#25D366]" />
    ) : (
      <Calendar className="w-5 h-5 text-rose-500" />
    );

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Recent';

  const items = data.items || [];
  const hasItems = items.length > 0;

  const totalAmount = data.totalAmount || 0;
  const subtotal = Math.round(totalAmount / 1.18);
  const gstAmount = Math.round(totalAmount - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-cream-200 dark:border-cream-200/10 flex items-center justify-between bg-cream-50/60 dark:bg-[#151D28]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 flex items-center justify-center shadow-soft">
              {typeIcon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60 font-mono">
                  {data.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    data.status === 'New'
                      ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                      : data.status === 'Contacted'
                      ? 'bg-blue-500/15 text-blue-600 border border-blue-500/30'
                      : data.status === 'Converted' || data.status === 'Completed' || data.status === 'Order Confirmed'
                      ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                      : 'bg-copper-500/15 text-copper-600 border border-copper-500/30'
                  }`}
                >
                  {data.status}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                {typeLabel}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-charcoal-400 hover:text-forest-950 dark:hover:text-cream-50 hover:bg-cream-100 dark:hover:bg-[#1A212C] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Customer Summary Card */}
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60 block mb-0.5">
                Customer Name
              </span>
              <span className="font-bold text-sm text-forest-950 dark:text-cream-50 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-copper-500" />
                {data.customerName || 'Anonymous Customer'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60 block mb-0.5">
                Contact Phone
              </span>
              <a
                href={data.phone ? `tel:${data.phone}` : undefined}
                className="font-mono font-bold text-copper-600 dark:text-copper-400 hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {data.phone || 'Not provided'}
              </a>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60 block mb-0.5">
                City / Location
              </span>
              <span className="text-charcoal-700 dark:text-cream-100 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-copper-500" />
                {data.city || data.address || 'Sikar, Rajasthan'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60 block mb-0.5">
                Request Date
              </span>
              <span className="text-charcoal-600 dark:text-cream-200/80 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-copper-500" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Site Visit Specific Booking Details */}
          {data.type === 'lead' && (
            <div className="p-4 rounded-2xl bg-white dark:bg-[#151D28] border border-cream-200 dark:border-cream-200/10 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-copper-600 dark:text-copper-400 flex items-center gap-1.5">
                <Home className="w-4 h-4" />
                <span>Site Consultation & Measurement Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C]">
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 block">Property / Room</span>
                  <span className="font-bold text-sm text-forest-950 dark:text-cream-50 capitalize">
                    {data.roomType || 'Complete Home / Villa'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C]">
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 block">Planned Budget</span>
                  <span className="font-bold text-sm text-copper-600 dark:text-copper-400">
                    {data.budget || 'Standard'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C]">
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 block">Preferred Schedule</span>
                  <span className="font-bold text-sm text-forest-950 dark:text-cream-50">
                    {data.date || 'Flexible'} ({data.slot || 'Morning'})
                  </span>
                </div>
              </div>

              {data.address && (
                <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C]">
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 block">Full Site Address</span>
                  <p className="font-semibold text-charcoal-700 dark:text-cream-100 mt-0.5">
                    {data.address}
                  </p>
                </div>
              )}

              {data.notes && (
                <div className="p-3 rounded-xl bg-cream-50 dark:bg-[#1A212C]">
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 block">Client Note / Scope</span>
                  <p className="italic text-charcoal-600 dark:text-cream-200/80 mt-0.5">
                    "{data.notes}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Ordered Materials / Items List */}
          {hasItems && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-forest-950 dark:text-cream-50 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-copper-500" />
                  <span>Ordered Materials & Specifications ({items.length})</span>
                </h4>
                {totalAmount > 0 && (
                  <span className="font-serif font-bold text-base text-copper-600 dark:text-copper-400">
                    Total: ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="border border-cream-200 dark:border-cream-200/10 rounded-2xl overflow-hidden bg-white dark:bg-[#151D28]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-cream-50 dark:bg-[#1A212C] border-b border-cream-200 dark:border-cream-200/10 text-charcoal-400 dark:text-cream-200/60 text-[10px] uppercase tracking-wider font-bold">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Material / Product</th>
                        <th className="py-2.5 px-3">Specification / Finish</th>
                        <th className="py-2.5 px-3 text-center">Quantity</th>
                        <th className="py-2.5 px-3 text-right">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100 dark:divide-cream-200/5">
                      {items.map((item, idx) => {
                        const name = item.productName || item.name || 'Material Item';
                        const unitPrice = Number(item.unitPrice || item.price || 0);
                        const qty = Number(item.quantity || 1);
                        const lineTotal = unitPrice * qty;

                        return (
                          <tr key={idx} className="hover:bg-cream-50/50 dark:hover:bg-[#1A212C]/30 transition-colors">
                            <td className="py-3 px-3 text-charcoal-400 font-mono">
                              {idx + 1}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-forest-950 dark:text-cream-50 block">
                                {name}
                              </span>
                              {item.brand && (
                                <span className="text-[10px] text-charcoal-400 dark:text-cream-200/60 block">
                                  Brand: {item.brand}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              {item.selectedFinish ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-copper-500/10 text-copper-600 dark:text-copper-400 text-[10px] font-bold">
                                  {item.selectedFinish}
                                </span>
                              ) : (
                                <span className="text-charcoal-400 dark:text-cream-200/50">Standard</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold">
                              {qty} {item.unit || ''}
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-charcoal-600 dark:text-cream-200/80">
                              ₹{unitPrice.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-bold text-forest-950 dark:text-cream-50">
                              ₹{lineTotal.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Bill Breakdown */}
                {totalAmount > 0 && (
                  <div className="p-4 bg-cream-50 dark:bg-[#1A212C] border-t border-cream-200 dark:border-cream-200/10 flex flex-col items-end space-y-1.5 font-mono">
                    <div className="flex justify-between w-64 text-charcoal-500 dark:text-cream-200/70">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between w-64 text-charcoal-500 dark:text-cream-200/70">
                      <span>GST (18% approx.):</span>
                      <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between w-64 pt-2 border-t border-cream-200 dark:border-cream-200/20 font-bold text-sm sm:text-base text-copper-600 dark:text-copper-400 font-serif">
                      <span>Grand Total:</span>
                      <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Customer Message / Inquiry Text */}
          {data.message && (
            <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/60 block">
                Customer Note / Message
              </span>
              <p className="text-charcoal-700 dark:text-cream-100 whitespace-pre-wrap">
                {data.message}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-cream-200 dark:border-cream-200/10 bg-cream-50/60 dark:bg-[#151D28]/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {cleanPhone && (
              <a
                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                  `Namaste ${data.customerName || 'ji'}! Shree Shyam Interior Sikar se baat kar rahe hain regarding your ${typeLabel} (ID: ${data.id}).`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat WhatsApp</span>
              </a>
            )}

            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-copper-500/10 hover:bg-copper-500 text-copper-600 hover:text-white text-xs font-bold transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>
            )}

            {onOpenPdf && hasItems && (
              <button
                type="button"
                onClick={onOpenPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/20 text-charcoal-700 dark:text-cream-100 hover:border-copper-500 text-xs font-bold transition-all"
                title="Print Official Letterhead Quote PDF"
              >
                <Printer className="w-3.5 h-3.5 text-copper-500" />
                <span>Print / PDF</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 text-charcoal-600 dark:text-cream-200 text-xs font-bold hover:bg-cream-100 dark:hover:bg-[#202937] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
