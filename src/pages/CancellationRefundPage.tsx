import React from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCcw,
  AlertCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const CancellationRefundPage: React.FC = () => {
  const lastUpdated = 'March 20, 2026';

  const refundJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Cancellation and Refund Policy - Shree Shyam Interior',
      url: 'https://wooden-five.vercel.app/cancellation-refund-policy',
      description: 'Cancellation and Refund guidelines for interior design, modular kitchens, and custom woodwork at Shree Shyam Interior Sikar.',
      publisher: {
        '@type': 'HomeAndConstructionBusiness',
        name: 'Shree Shyam Interior',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Circuit House, Jaipur Road',
          addressLocality: 'Sikar',
          addressRegion: 'Rajasthan',
          postalCode: '332001',
          addressCountry: 'IN'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://wooden-five.vercel.app/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Cancellation & Refund Policy',
          item: 'https://wooden-five.vercel.app/cancellation-refund-policy'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#14251F] pt-24 pb-20 selection:bg-[#C68A43]/20">
      <SEOHead
        title="Cancellation & Refund Policy | Shree Shyam Interior Sikar"
        description="Learn about our fair and transparent Cancellation and Refund Policy. Understand terms regarding booking deposit, 3D design phase, custom factory production, and defect replacements."
        canonical="https://wooden-five.vercel.app/cancellation-refund-policy"
        keywords="cancellation refund policy Shree Shyam Interior, interior design refund terms Sikar, modular kitchen cancellation"
        jsonLd={refundJsonLd}
      />

      {/* Header Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#C68A43] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#14251F] font-medium">Cancellation & Refund Policy</span>
        </nav>

        <div className="border-b border-stone-200 pb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14251F]/5 text-[#14251F] text-xs font-semibold uppercase tracking-wider mb-3">
            <RotateCcw className="w-3.5 h-3.5 text-[#C68A43]" />
            Fair & Transparent Service Terms
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14251F] mb-3">
            Cancellation & Refund Policy
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Last Updated: {lastUpdated} • Shree Shyam Interior, Sikar, Rajasthan
          </p>
        </div>
      </section>

      {/* Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 lg:p-12 shadow-sm space-y-10 text-stone-700 leading-relaxed text-sm sm:text-base">

          {/* 1. Overview & Policy Objective */}
          <section id="overview">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">01.</span> Overview & Objective
            </h2>
            <p className="mb-2">
              At <strong>Shree Shyam Interior</strong>, we operate with complete transparency regarding our turnkey design and manufacturing workflows. Because custom interior design, modular kitchen cabinetry, and bespoke woodwork involve tailor-made engineering tailored exclusively to the unique floor dimensions of your property, standard off-the-shelf return policies cannot apply.
            </p>
            <p>
              This policy provides a clear, stage-by-stage guideline explaining your rights and financial liabilities should you need to reschedule, modify, or cancel your interior project.
            </p>
          </section>

          {/* 2. Consultation & Site Visit Cancellations */}
          <section id="consultation-cancellations">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">02.</span> Free Site Visit & Consultation Rescheduling
            </h2>
            <p className="mb-2">
              Our initial on-site architectural visit and laser measurement service across Sikar city limits is provided completely complimentary (free of cost).
            </p>
            <ul className="list-disc pl-6 space-y-1 text-stone-600">
              <li>If you need to reschedule or cancel a booked site visit, we request a minimum notice of <strong>24 hours</strong> via phone or WhatsApp.</li>
              <li>There are no cancellation fees or penalties for rescheduling an on-site consultation.</li>
            </ul>
          </section>

          {/* 3. Initial Booking Deposit */}
          <section id="booking-deposit" className="p-6 bg-stone-50 rounded-2xl border border-stone-200">
            <h2 className="text-xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">03.</span> Initial Booking Deposit & Cancellation Window
            </h2>
            <p className="text-sm text-stone-600 mb-3">
              Upon paying the initial project booking deposit (typically 10% of estimated scope):
            </p>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-[#14251F]">Cancellation within 48 Hours of Booking:</span>
                <p className="text-stone-600 mt-1">If no site measurement has occurred and architectural drafts have not been initiated, 100% of the deposit is refunded minus nominal payment gateway processing charges (if applicable).</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-[#14251F]">Cancellation after Site Measurement but before 3D Renders:</span>
                <p className="text-stone-600 mt-1">A flat deduction of ₹5,000 to ₹10,000 (depending on site square footage) applies to cover architectural survey, laser mapping, and CAD drafting labor. The balance of the deposit is refunded.</p>
              </div>
            </div>
          </section>

          {/* 4. Post-3D Design Approval Stage */}
          <section id="design-approval-stage">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">04.</span> Post-3D Design Approval Stage
            </h2>
            <p>
              Once photorealistic 3D renders, MEP (Mechanical, Electrical, Plumbing) drawings, and elevation cut-lists have been delivered and approved by the client, the architectural design fee component (equivalent to the first milestone) becomes <strong>non-refundable</strong>. The client retains full ownership of the generated drawings and design layouts.
            </p>
          </section>

          {/* 5. Manufacturing & Custom Production Stage */}
          <section id="manufacturing-stage" className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              <span>05.</span> Custom Manufacturing Stage (Strictly Non-Refundable)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Once the 40% production milestone is remitted and raw boiling water-proof (BWP) plywood, imported acrylic sheets, and German hardware are sized, laser edge-banded, or cut in our modular factory, <strong>cancellations or refunds cannot be accepted</strong>. Because every cabinet and modular carcass is made to your room&apos;s specific millimeters, these units cannot be reused in another home.
            </p>
          </section>

          {/* 6. Damaged, Defective or Non-Conforming Items */}
          <section id="defective-items">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">06.</span> Damaged, Defective, or Transit Damage Replacement
            </h2>
            <p className="mb-2">
              Our 100% replacement guarantee protects our clients against transit damage or factory imperfections:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
              <li>Any modular shutter, hardware hinge, quartz slab, or panel damaged during transit or unboxing will be <strong>replaced free of charge</strong> by Shree Shyam Interior.</li>
              <li>Transit damage or non-conformance must be noted during the delivery unboxing inspection or reported within <strong>7 business days</strong> to your designated project supervisor.</li>
            </ul>
          </section>

          {/* 7. Milestone Payment Adjustments */}
          <section id="milestone-adjustments">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">07.</span> Scope Variations & Milestone Adjustments
            </h2>
            <p>
              If a client wishes to reduce or increase project scope mid-way (for example, removing a study table or adding an extra wardrobe unit), an amended Bill of Quantities (BOQ) is created. Uncommenced work items will be credited or adjusted against future milestone invoices.
            </p>
          </section>

          {/* 8. Refund Processing Timeline & Methods */}
          <section id="refund-timeline">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">08.</span> Refund Processing Timeline & Methods
            </h2>
            <p className="mb-3">
              Approved refunds are processed through the original method of payment (bank NEFT transfer, UPI reversal, or cheque).
            </p>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-[#14251F] mb-1">
                <Clock className="w-4 h-4 text-[#C68A43]" />
                Standard Processing Window:
              </div>
              <p className="text-stone-600">
                All eligible refunds will be audited and credited to the client&apos;s bank account within <strong>7 to 10 business days</strong> from the formal written approval of the cancellation request.
              </p>
            </div>
          </section>

          {/* 9. Client Delay or Project Abandonment */}
          <section id="site-abandonment">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">09.</span> Extended Site Readiness Delays
            </h2>
            <p>
              If completed modular furniture cannot be delivered because the client&apos;s civil site or flooring is incomplete, Shree Shyam Interior provides <strong>up to 30 days of complimentary insured factory warehousing</strong>. Beyond 30 days, nominal storage fees of ₹150/day may apply to ensure material protection in our humidity-controlled facility.
            </p>
          </section>

          {/* 10. Contact Information for Refund Requests */}
          <section id="refund-contact" className="p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200">
            <h2 className="text-xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">10.</span> How to Initiate a Request
            </h2>
            <p className="text-stone-600 text-sm mb-4">
              To request an adjustment, cancellation, or refund, please send an email or official letter referencing your Project Quotation ID:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Email:</strong> accounts@shreeshyaminterior.com / info@shreeshyaminterior.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Accounts Helpdesk:</strong> +91 94142 53333</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Physical Studio:</strong> Near Circuit House, Jaipur Road, Sikar, Rajasthan 332001</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default CancellationRefundPage;
