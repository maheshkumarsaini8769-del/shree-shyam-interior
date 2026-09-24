import React, { useRef } from 'react';
import { X, Printer, Download, Share2, CheckCircle2, ShieldCheck, Award, Building, Phone, Mail, MapPin } from 'lucide-react';

export interface QuotationItem {
  id: string;
  productName: string;
  category: string;
  brand: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  selectedFinish?: string;
  image?: string;
}

interface QuotationPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
  customerPhone?: string;
  customerCity?: string;
  quoteId?: string;
  items: QuotationItem[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
}

export const QuotationPDFModal: React.FC<QuotationPDFModalProps> = ({
  isOpen,
  onClose,
  customerName = 'Valued Client',
  customerPhone = '',
  customerCity = 'Sikar, Rajasthan',
  quoteId,
  items,
  subtotal,
  gstAmount,
  grandTotal
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const quoteNo = quoteId ? (quoteId.startsWith('SSI-') ? quoteId : `SSI-QT-${quoteId.slice(-6).toUpperCase()}`) : `SSI-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `*OFFICIAL QUOTATION - SHREE SHYAM INTERIOR*\n` +
      `Quote No: ${quoteNo}\n` +
      `Client: ${customerName}\n` +
      `Items: ${items.length} materials/fittings\n` +
      `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n` +
      `GST (18%): ₹${gstAmount.toLocaleString('en-IN')}\n` +
      `*Grand Total: ₹${grandTotal.toLocaleString('en-IN')}*\n` +
      `Warranty: 10-Year Genuine Material Warranty\n` +
      `Location: Piprali Road, Sikar (Raj.) | +91 98765 43210`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Convert number to words in Indian Rupees
  const numberToWordsIndian = (num: number): string => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n: number): string => {
      let str = '';
      if (n > 19) {
        str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
      } else {
        str += a[n];
      }
      return str;
    };

    if (num === 0) return 'Zero Rupees Only';
    const n = Math.floor(num);
    const crore = Math.floor(n / 10000000);
    const lakh = Math.floor((n % 10000000) / 100000);
    const thousand = Math.floor((n % 100000) / 1000);
    const hundred = Math.floor((n % 1000) / 100);
    const rem = n % 100;

    let res = '';
    if (crore > 0) res += inWords(crore) + 'Crore ';
    if (lakh > 0) res += inWords(lakh) + 'Lakh ';
    if (thousand > 0) res += inWords(thousand) + 'Thousand ';
    if (hundred > 0) res += inWords(hundred) + 'Hundred ';
    if (rem > 0) res += inWords(rem);

    return (res.trim() + ' Rupees Only').toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Container */}
      <div className="bg-white text-charcoal-900 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Floating Action Controls - Hidden on print */}
        <div className="bg-forest-950 text-cream-100 px-4 py-3 sm:px-6 flex items-center justify-between gap-3 shrink-0 print:hidden border-b border-copper-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-copper-400 animate-pulse"></span>
            <span className="font-serif font-bold text-sm tracking-wide">
              Official Quotation Preview & PDF Generator
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              title="Share Quote on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cream-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Letterhead A4 Paper View */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-cream-50 print:bg-white print:p-0">
          <div
            ref={printRef}
            className="bg-white p-6 sm:p-10 border border-cream-200 print:border-none shadow-sm rounded-xl max-w-[800px] mx-auto text-charcoal-900 font-sans print:shadow-none print:m-0"
            style={{ minHeight: '1050px' }}
          >
            {/* 1. Official Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-copper-500">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.jpg"
                    alt="Shree Shyam Interior"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-copper-500 shadow-sm shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div>
                    <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 uppercase tracking-tight">
                      SHREE SHYAM <span className="text-copper-600">INTERIOR</span>
                    </h1>
                    <p className="text-[11px] font-bold text-copper-700 uppercase tracking-widest">
                      Crafting Homes, From the Heart • Sikar, Rajasthan
                    </p>
                  </div>
                </div>
                <div className="text-[11px] text-charcoal-600 leading-relaxed pt-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-copper-600 shrink-0" />
                    <span>Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001</span>
                  </div>
                  <div className="flex items-center gap-4 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-copper-600" />
                      +91 98765 43210
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-copper-600" />
                      contact@shreeshyaminterior.com
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-charcoal-500">
                    <strong>GSTIN:</strong> 08AAECS1234F1Z5 • <strong>STATE CODE:</strong> 08 (Rajasthan)
                  </div>
                </div>
              </div>

              {/* Quotation Metadata Card */}
              <div className="sm:text-right bg-cream-50 p-3.5 rounded-xl border border-cream-200 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-copper-600 block">
                  ESTIMATE / BOQ PROPOSAL
                </span>
                <span className="font-mono font-bold text-sm text-forest-950 block mt-0.5">
                  {quoteNo}
                </span>
                <div className="text-[11px] text-charcoal-600 mt-2 space-y-0.5">
                  <div><strong>Date:</strong> {today}</div>
                  <div><strong>Validity:</strong> 30 Days ({validUntil})</div>
                  <div><strong>Handover:</strong> 45-Day Guaranteed</div>
                </div>
              </div>
            </div>

            {/* 2. Bill To / Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-cream-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                  CLIENT DETAILS (BILL TO):
                </span>
                <h3 className="font-bold text-base text-forest-950">{customerName}</h3>
                {customerPhone && (
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    <strong>Mobile:</strong> {customerPhone}
                  </p>
                )}
                <p className="text-xs text-charcoal-600">
                  <strong>Site City:</strong> {customerCity}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                  PROJECT SPECIFICATIONS:
                </span>
                <div className="text-xs text-charcoal-700 space-y-0.5">
                  <div><strong>Material Grade:</strong> Certified Century Marine BWP 710</div>
                  <div><strong>Hardware System:</strong> Häfele / Blum German Soft-Close</div>
                  <div><strong>Finish Standard:</strong> 1mm Designer Merino Acrylic / Laminate</div>
                  <div><strong>Scope:</strong> Turnkey Supply, Fabrication & Installation</div>
                </div>
              </div>
            </div>

            {/* 3. Itemized BOQ Table */}
            <div className="py-5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-forest-950 text-cream-50 text-[11px] uppercase tracking-wider font-bold">
                    <th className="py-2.5 px-3 rounded-l-lg">#</th>
                    <th className="py-2.5 px-3">Description & Specifications</th>
                    <th className="py-2.5 px-3">Brand</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-cream-100">
                  {items.map((item, idx) => {
                    const total = item.unitPrice * item.quantity;
                    return (
                      <tr key={item.id || idx} className="hover:bg-cream-50/50">
                        <td className="py-3 px-3 font-mono text-charcoal-400 font-bold">{idx + 1}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-forest-950">{item.productName}</div>
                          <div className="text-[11px] text-charcoal-500">
                            {item.category} {item.selectedFinish ? `• Finish: ${item.selectedFinish}` : ''}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-cream-100 text-[10px] font-bold text-copper-700 uppercase">
                            {item.brand}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-semibold">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          ₹{item.unitPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-forest-950">
                          ₹{total.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 4. Financial Calculations & Summary */}
            <div className="pt-4 border-t-2 border-cream-200 flex flex-col sm:flex-row justify-between gap-6">
              {/* Left Column: Bank & Payment Terms */}
              <div className="space-y-3 flex-1 text-xs">
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-copper-700 block mb-1">
                    Standard Milestone Payment Schedule:
                  </span>
                  <ul className="text-[11px] text-charcoal-600 space-y-0.5 list-disc list-inside">
                    <li><strong>50% Advance:</strong> Upon 3D design approval & material dispatch</li>
                    <li><strong>40% Running:</strong> Upon carpentry carcass framework completion</li>
                    <li><strong>10% Final:</strong> On snag clearance & final handover of keys</li>
                  </ul>
                </div>

                <div className="text-[11px] text-charcoal-500 italic">
                  * Note: All electrical, quartz stone, and plumbing fixtures fabricated as per IS standards.
                </div>
              </div>

              {/* Right Column: Calculations */}
              <div className="w-full sm:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-charcoal-600 py-1">
                  <span>Gross Material Subtotal:</span>
                  <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-charcoal-600 py-1">
                  <span>GST (18% Integrated / CGST 9% + SGST 9%):</span>
                  <span className="font-mono font-semibold">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-3 rounded-xl bg-forest-950 text-cream-50 font-bold border-t-2 border-copper-500">
                  <span className="text-xs uppercase tracking-wider">Estimated Grand Total:</span>
                  <span className="font-serif text-lg text-copper-400">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[10px] text-charcoal-500 font-mono text-right pt-0.5">
                  Amount in words: {numberToWordsIndian(grandTotal)}
                </div>
              </div>
            </div>

            {/* 5. Trust Badges & Authentic Guarantee Strip */}
            <div className="mt-8 pt-4 border-t border-cream-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-cream-50/70 border border-cream-200/60">
                <ShieldCheck className="w-4 h-4 text-copper-600 mx-auto mb-1" />
                <span className="font-bold text-[10px] block text-forest-950">10-Year Warranty</span>
                <span className="text-[9px] text-charcoal-500">Century BWP 710 Guarantee</span>
              </div>
              <div className="p-2 rounded-lg bg-cream-50/70 border border-cream-200/60">
                <Award className="w-4 h-4 text-copper-600 mx-auto mb-1" />
                <span className="font-bold text-[10px] block text-forest-950">100% Genuine Fittings</span>
                <span className="text-[9px] text-charcoal-500">Häfele & Blum Certified</span>
              </div>
              <div className="p-2 rounded-lg bg-cream-50/70 border border-cream-200/60">
                <CheckCircle2 className="w-4 h-4 text-copper-600 mx-auto mb-1" />
                <span className="font-bold text-[10px] block text-forest-950">45-Day Handover</span>
                <span className="text-[9px] text-charcoal-500">Zero Delay Guarantee</span>
              </div>
            </div>

            {/* 6. Official Stamp & Authorized Signature */}
            <div className="mt-8 pt-6 border-t-2 border-cream-200 flex items-end justify-between text-xs">
              <div>
                <p className="text-[11px] text-charcoal-500">
                  Client Acceptance / Sign: _______________________
                </p>
                <p className="text-[10px] text-charcoal-400 mt-1">
                  Generated by Shree Shyam Interior Digital Estimation Desk.
                </p>
              </div>

              <div className="text-right">
                <div className="inline-block border-2 border-dashed border-copper-500/50 rounded-xl p-2 px-3 mb-1 bg-copper-500/5">
                  <span className="font-serif font-bold text-[10px] uppercase text-copper-700 block">
                    ★ SHREE SHYAM INTERIOR ★
                  </span>
                  <span className="text-[8px] text-charcoal-500 uppercase font-mono block">
                    SIKAR (RAJASTHAN) • VERIFIED BOQ
                  </span>
                </div>
                <p className="font-bold text-forest-950 text-xs mt-1">Authorized Signatory</p>
                <p className="text-[10px] text-charcoal-500">Piprali Road, Sikar (Rajasthan)</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Embedded CSS for Clean Print Rendering */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
        }
      `}</style>
    </div>
  );
};
