import React, { useRef, useState, useEffect } from 'react';
import { X, Printer, Share2, CheckCircle2, ShieldCheck, Award, MapPin, Phone, Mail } from 'lucide-react';
import { apiService, BusinessSettings } from '../../services/apiService';

export interface QuotationItem {
  id?: string;
  productName?: string;
  name?: string;
  category?: string;
  brand?: string;
  unitPrice?: number;
  price?: number;
  quantity: number;
  unit?: string;
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
  items = [],
  subtotal,
  gstAmount,
  grandTotal
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  useEffect(() => {
    apiService.getSettings().then((s) => {
      if (s) setSettings(s);
    }).catch(() => null);
  }, []);

  if (!isOpen) return null;

  const quoteNo = quoteId
    ? quoteId.startsWith('SSI-')
      ? quoteId
      : `SSI-QT-${quoteId.slice(-6).toUpperCase()}`
    : `SSI-QT-${Math.floor(1000 + Math.random() * 9000)}`;

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const businessName = settings?.businessName || 'Shree Shyam Interior';
  const phone = settings?.primaryPhone || '+91 98765 43210';
  const email = settings?.email || 'contact@shreeshyaminterior.com';
  const address = settings?.address || 'Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001';

  // Check if GST is a real customized GSTIN or placeholder
  const rawGst = settings?.gstNumber || '';
  const isRealGst =
    rawGst.trim().length >= 15 &&
    !rawGst.includes('0000') &&
    !rawGst.includes('1234') &&
    !rawGst.includes('AAAAA');

  // Convert number to words in Indian Rupees
  const numberToWordsIndian = (num: number): string => {
    const a = [
      '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
      'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
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

    if (num <= 0) return 'Zero Rupees Only';
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

  // Robust printing using invisible iframe: prints only the bill with crisp styling and NO blank pages
  const handlePrint = () => {
    const printElement = document.getElementById('quotation-print-area');
    if (!printElement) {
      window.print();
      return;
    }

    try {
      let iframe = document.getElementById('quotation-print-frame') as HTMLIFrameElement | null;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'quotation-print-frame';
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.visibility = 'hidden';
        document.body.appendChild(iframe);
      }

      const frameDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!frameDoc) {
        window.print();
        return;
      }

      // Collect existing styles from current page
      const pageStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
        .map((el) => el.outerHTML)
        .join('\n');

      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Quotation_${quoteNo}</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            ${pageStyles}
            <style>
              @page {
                size: A4 portrait;
                margin: 8mm 10mm;
              }
              * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              html, body {
                background: #ffffff !important;
                color: #1a202c !important;
                margin: 0 !important;
                padding: 0 !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
              }
              .no-print {
                display: none !important;
              }
              #quotation-print-area {
                width: 100% !important;
                max-width: 800px !important;
                margin: 0 auto !important;
                padding: 16px !important;
                box-shadow: none !important;
                border: none !important;
              }
            </style>
          </head>
          <body>
            <div id="quotation-print-area">
              ${printElement.innerHTML}
            </div>
          </body>
        </html>
      `);
      frameDoc.close();

      setTimeout(() => {
        try {
          iframe?.contentWindow?.focus();
          iframe?.contentWindow?.print();
        } catch (_) {
          window.print();
        }
      }, 350);
    } catch (_) {
      window.print();
    }
  };

  const handleShareWhatsApp = () => {
    const text =
      `*OFFICIAL QUOTATION - ${businessName.toUpperCase()}*\n` +
      `Quote No: ${quoteNo}\n` +
      `Date: ${today}\n` +
      `Client: ${customerName}\n` +
      `Phone: ${customerPhone || 'N/A'}\n` +
      `City: ${customerCity}\n` +
      `-------------------------\n` +
      `Total Items: ${items.length} materials/fittings\n` +
      `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n` +
      (gstAmount > 0 ? `GST (18%): ₹${gstAmount.toLocaleString('en-IN')}\n` : '') +
      `*Grand Total: ₹${grandTotal.toLocaleString('en-IN')}*\n` +
      `-------------------------\n` +
      `Valid For: 30 Days\n` +
      `Contact: ${phone} | ${address}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="quotation-modal-overlay fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="quotation-modal-card bg-white text-charcoal-900 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Floating Action Controls - Hidden on print */}
        <div className="print-controls-bar bg-forest-950 text-cream-100 px-4 py-3 sm:px-6 flex items-center justify-between gap-3 shrink-0 print:hidden border-b border-copper-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-copper-400 animate-pulse"></span>
            <span className="font-serif font-bold text-sm tracking-wide">
              Official Quotation Preview & PDF Generator
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
              title="Share Quote on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cream-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Letterhead A4 Paper View */}
        <div className="overflow-y-auto p-3 sm:p-6 bg-cream-50 print:bg-white print:p-0">
          <div
            id="quotation-print-area"
            ref={printRef}
            className="bg-white p-6 sm:p-8 border border-cream-200 print:border-none shadow-sm rounded-xl max-w-[800px] mx-auto text-charcoal-900 font-sans print:shadow-none print:m-0"
          >
            {/* 1. Official Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b-2 border-copper-500">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.jpg"
                    alt={businessName}
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
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-copper-600" />
                      {phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-copper-600" />
                      {email}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-charcoal-500">
                    {isRealGst ? (
                      <>
                        <strong>GSTIN:</strong> {rawGst} • <strong>STATE CODE:</strong> 08 (Rajasthan)
                      </>
                    ) : (
                      <>
                        <strong>STATE CODE:</strong> 08 (Rajasthan) • <strong>DOCUMENT:</strong> OFFICIAL ESTIMATE
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Quotation Metadata Card */}
              <div className="sm:text-right bg-cream-50 p-3.5 rounded-xl border border-cream-200 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-copper-600 block">
                  OFFICIAL ESTIMATE & QUOTATION
                </span>
                <span className="font-mono font-bold text-sm text-forest-950 block mt-0.5">
                  {quoteNo}
                </span>
                <div className="text-[11px] text-charcoal-600 mt-2 space-y-0.5">
                  <div><strong>Date:</strong> {today}</div>
                  <div><strong>Validity:</strong> 30 Days ({validUntil})</div>
                </div>
              </div>
            </div>

            {/* 2. Bill To & Quotation Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-cream-200">
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
                  <strong>Delivery / Site City:</strong> {customerCity}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block mb-1">
                  QUOTATION SUMMARY:
                </span>
                <div className="text-xs text-charcoal-700 space-y-0.5">
                  <div><strong>Quotation For:</strong> Material Supply & Estimation</div>
                  <div><strong>Issue Center:</strong> Piprali Road, Sikar (Rajasthan)</div>
                  <div><strong>Total Products:</strong> {items.length} Item(s) Selected</div>
                  <div><strong>Terms:</strong> Standard Commercial Supply</div>
                </div>
              </div>
            </div>

            {/* 3. Itemized BOQ Table */}
            <div className="py-4">
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
                    const itemName = item.productName || item.name || 'Selected Material';
                    const unitPrice = item.unitPrice ?? item.price ?? 0;
                    const qty = item.quantity || 1;
                    const total = unitPrice * qty;
                    return (
                      <tr key={item.id || idx} className="hover:bg-cream-50/50">
                        <td className="py-2.5 px-3 font-mono text-charcoal-400 font-bold">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-forest-950">{itemName}</div>
                          {(item.category || item.selectedFinish) && (
                            <div className="text-[11px] text-charcoal-500">
                              {item.category || ''} {item.selectedFinish ? `• Finish: ${item.selectedFinish}` : ''}
                            </div>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-cream-100 text-[10px] font-bold text-copper-700 uppercase">
                            {item.brand || 'PREMIUM'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-semibold">
                          {qty} {item.unit || 'Nos'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          ₹{unitPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-forest-950">
                          ₹{total.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 4. Financial Calculations & Terms Summary */}
            <div className="pt-3 border-t-2 border-cream-200 flex flex-col sm:flex-row justify-between gap-6">
              {/* Left Column: Commercial Terms & Conditions */}
              <div className="space-y-2 flex-1 text-xs">
                <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-copper-700 block mb-1">
                    Terms & Conditions:
                  </span>
                  <ul className="text-[11px] text-charcoal-600 space-y-0.5 list-disc list-inside">
                    <li><strong>Quotation Validity:</strong> Rates are valid for 30 days from date of issue.</li>
                    <li><strong>Material Dispatch:</strong> Initiated upon order confirmation & payment schedule.</li>
                    <li><strong>Official Tax Invoice:</strong> Provided along with delivery of ordered materials.</li>
                    <li><strong>Quality Assurance:</strong> Materials covered under authentic manufacturer warranty.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Financial Calculations */}
              <div className="w-full sm:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-charcoal-600 py-1">
                  <span>Gross Material Subtotal:</span>
                  <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {gstAmount > 0 && (
                  <div className="flex justify-between text-charcoal-600 py-1">
                    <span>GST (18% Integrated / CGST + SGST):</span>
                    <span className="font-mono font-semibold">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
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

            {/* 5. Authentic Guarantee Strip */}
            <div className="mt-6 pt-3 border-t border-cream-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-cream-50/70 border border-cream-200/60">
                <ShieldCheck className="w-4 h-4 text-copper-600 mx-auto mb-1" />
                <span className="font-bold text-[10px] block text-forest-950">100% Genuine Sourcing</span>
                <span className="text-[9px] text-charcoal-500">Direct From Certified Makers</span>
              </div>
              <div className="p-2 rounded-lg bg-cream-50/70 border border-cream-200/60">
                <Award className="w-4 h-4 text-copper-600 mx-auto mb-1" />
                <span className="font-bold text-[10px] block text-forest-950">Quality Inspected</span>
                <span className="text-[9px] text-charcoal-500">Pre-Dispatch Verification</span>
              </div>
              <div className="p-2 rounded-lg bg-cream-50/70 border border-cream-200/60">
                <CheckCircle2 className="w-4 h-4 text-copper-600 mx-auto mb-1" />
                <span className="font-bold text-[10px] block text-forest-950">Brand Warranty</span>
                <span className="text-[9px] text-charcoal-500">Manufacturer Supported</span>
              </div>
            </div>

            {/* 6. Official Stamp & Authorized Signature */}
            <div className="mt-6 pt-5 border-t-2 border-cream-200 flex items-end justify-between text-xs">
              <div>
                <p className="text-[11px] text-charcoal-500">
                  Client Acceptance / Sign: _______________________
                </p>
                <p className="text-[10px] text-charcoal-400 mt-1">
                  Thank you for placing your trust in {businessName}.
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

      {/* Embedded CSS for Clean Fallback Print Rendering */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          body > * {
            visibility: hidden !important;
          }
          .quotation-modal-overlay,
          .quotation-modal-overlay * {
            visibility: visible !important;
          }
          .quotation-modal-overlay {
            position: absolute !important;
            inset: 0 !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            min-height: 100% !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            z-index: 999999 !important;
          }
          .print-controls-bar {
            display: none !important;
          }
          .quotation-modal-card {
            box-shadow: none !important;
            border: none !important;
            max-height: none !important;
            overflow: visible !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          #quotation-print-area {
            display: block !important;
            visibility: visible !important;
            padding: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 800px !important;
            border: none !important;
            box-shadow: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
        }
      `}</style>
    </div>
  );
};
