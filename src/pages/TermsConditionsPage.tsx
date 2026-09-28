import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Scale,
  CheckCircle2,
  Clock,
  Shield,
  ChevronRight,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const TermsConditionsPage: React.FC = () => {
  const lastUpdated = 'March 20, 2026';

  const termsJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Terms and Conditions - Shree Shyam Interior',
      url: 'https://wooden-five.vercel.app/terms-and-conditions',
      description: 'Official Terms and Conditions, contract guidelines, and service agreements for Shree Shyam Interior, Sikar, Rajasthan.',
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
          name: 'Terms & Conditions',
          item: 'https://wooden-five.vercel.app/terms-and-conditions'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#14251F] pt-24 pb-20 selection:bg-[#C68A43]/20">
      <SEOHead
        title="Terms and Conditions | Shree Shyam Interior Sikar"
        description="Review the terms and conditions of service for Shree Shyam Interior. Covers design consultation, payment milestones, manufacturing, installation, and 10-year warranty guidelines in Sikar, Rajasthan."
        canonical="https://wooden-five.vercel.app/terms-and-conditions"
        keywords="terms and conditions Shree Shyam Interior, interior contract Sikar, payment milestones interior design"
        jsonLd={termsJsonLd}
      />

      {/* Header Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#C68A43] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#14251F] font-medium">Terms & Conditions</span>
        </nav>

        <div className="border-b border-stone-200 pb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14251F]/5 text-[#14251F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-[#C68A43]" />
            Client Agreement & Service Contract
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14251F] mb-3">
            Terms & Conditions
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Last Updated: {lastUpdated} • Applicable to all interior contracts in Sikar & Rajasthan
          </p>
        </div>
      </section>

      {/* Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 lg:p-12 shadow-sm space-y-10 text-stone-700 leading-relaxed text-sm sm:text-base">

          {/* 1. Agreement to Terms */}
          <section id="agreement">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">01.</span> Agreement to Terms
            </h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement between you (the &quot;Client&quot;, &quot;you&quot;, or &quot;your&quot;) and <strong>Shree Shyam Interior</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), governing your access to our website, instant cost estimator, 3D design studio, and all related interior execution and contracting services.
            </p>
            <p className="mt-2">
              By paying an initial booking deposit, confirming a design layout, or signing a formal Project Agreement (BOQ), you acknowledge that you have read, understood, and agreed to be bound by these terms in their entirety.
            </p>
          </section>

          {/* 2. Services Offered */}
          <section id="services">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">02.</span> Scope of Services Offered
            </h2>
            <p className="mb-3">
              Shree Shyam Interior provides end-to-end turnkey architectural and interior solutions across Sikar, Jaipur, Nawalgarh, Jhunjhunu, and neighboring areas of Rajasthan:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-0.5" />
                <span><strong>Turnkey Residential Interiors:</strong> Complete villa, bungalow, and apartment fit-outs.</span>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-0.5" />
                <span><strong>Modular Kitchens:</strong> Anti-termite BWP plywood, acrylic shutters, quartz counters, and German hardware.</span>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-0.5" />
                <span><strong>Modular Wardrobes & Storage:</strong> Floor-to-ceiling sliding, walk-in, and hinged lacquered glass closets.</span>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-0.5" />
                <span><strong>Civil, False Ceiling & Lighting:</strong> POP/Gypsum channel framing, cove ambient lighting, and PU polish.</span>
              </div>
            </div>
          </section>

          {/* 3. Estimates, Quotes & Pricing */}
          <section id="estimates-pricing">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">03.</span> Estimates, Quotes & Pricing
            </h2>
            <p>
              Estimates generated through our website calculator or preliminary discussions are indicative figures calculated on standard room sizes. Formal binding quotes are provided exclusively via an itemized <strong>Bill of Quantities (BOQ)</strong> following precise laser site measurements.
            </p>
            <p className="mt-2 text-stone-600">
              BOQ quotations are valid for <strong>30 calendar days</strong> from the date of issuance. Material cost escalations in raw plywood, acrylic sheets, or imported hardware after the validity period may be subject to recalculation if the project contract has not been signed.
            </p>
          </section>

          {/* 4. Design Process & Approvals */}
          <section id="design-approvals">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">04.</span> Design Process & Approvals
            </h2>
            <p className="mb-2">
              Our architectural design workflow includes 2D layout planning, material selection catalogs, and high-definition 3D photorealistic visualization:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
              <li>Each project scope entitles the client to up to <strong>three (3) rounds of design revisions</strong> at the 3D rendering stage without additional design fees.</li>
              <li>Once the final 3D design and material swatches are confirmed, the client provides a physical or electronic sign-off.</li>
              <li><strong>Critical:</strong> Once sign-off is submitted and production cut-lists are sent to the factory, structural design changes cannot be reversed without additional cost and timeline adjustments.</li>
            </ul>
          </section>

          {/* 5. Payment Terms & Milestone Schedule */}
          <section id="payment-milestones" className="p-6 bg-stone-50 rounded-2xl border border-stone-200">
            <h2 className="text-xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">05.</span> Payment Terms & Milestone Schedule
            </h2>
            <p className="text-sm text-stone-600 mb-4">
              To ensure seamless material procurement and uninterrupted factory fabrication, interior execution follows our standard milestone payment framework:
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm">
                <span className="font-semibold text-[#14251F]">1. Initial Booking & Site Survey</span>
                <span className="font-bold text-[#C68A43]">10% of Estimated Project Value</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm">
                <span className="font-semibold text-[#14251F]">2. 3D Design Approval & Material Freeze</span>
                <span className="font-bold text-[#C68A43]">40% (Before Factory Production Begins)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm">
                <span className="font-semibold text-[#14251F]">3. Material Dispatch to Site</span>
                <span className="font-bold text-[#C68A43]">40% (Prior to On-Site Installation)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm">
                <span className="font-semibold text-[#14251F]">4. Final Quality Handover</span>
                <span className="font-bold text-[#C68A43]">10% (Upon Joint Inspection Completion)</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 mt-3 italic">
              Payments can be remitted via NEFT, RTGS, UPI, Account Payee Cheques, or authorized digital gateways. Official GST tax invoices are generated upon payment confirmation.
            </p>
          </section>

          {/* 6. Client Responsibilities */}
          <section id="client-responsibilities">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">06.</span> Client Responsibilities
            </h2>
            <p className="mb-2">For smooth and on-time execution, the Client agrees to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
              <li>Ensure undisturbed site access for our carpentry technicians and supervisors during working hours (9:00 AM to 7:00 PM).</li>
              <li>Provide continuous electricity and running water for tool operation and site activities.</li>
              <li>Secure necessary permissions from the building society, RWA, or local municipal authorities.</li>
              <li>Provide safe, dry, lockable on-site space for staging delicate modular boards and hardware prior to assembly.</li>
            </ul>
          </section>

          {/* 7. Production & Manufacturing */}
          <section id="manufacturing">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">07.</span> Production & Manufacturing Standards
            </h2>
            <p>
              Modular elements (carcasses, shutters, edge-banding, drawer units) are precision-manufactured using computerized CNC and panel-saw machinery. Natural variations in timber grain, marble veining, or minor color shifts between different laminate dye lots are characteristic of authentic materials and do not represent manufacturing defects.
            </p>
          </section>

          {/* 8. Delivery & Site Installation */}
          <section id="delivery-installation">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">08.</span> Delivery & Site Installation
            </h2>
            <p>
              Materials are delivered to the site packaged with protective edge protectors and bubble wrap. Our installation supervisors will inspect deliveries alongside the client. Standard modular installation spans <strong>15 to 45 business days</strong> depending on total square footage, barring client payment delays or site unavailability.
            </p>
          </section>

          {/* 9. Completion & Handover */}
          <section id="handover">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">09.</span> Completion & Formal Handover
            </h2>
            <p>
              Upon completion of on-site installation, a joint inspection is conducted using our <strong>120-Point Handover Quality Checklist</strong>. The client verifies alignment of shutters, smooth operation of soft-close channels, surface finishes, and cleanliness. Upon signing the Handover Document, warranty certificates are activated.
            </p>
          </section>

          {/* 10. Warranties & Guarantee Terms */}
          <section id="warranty-terms">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">10.</span> Warranties & Guarantee Terms
            </h2>
            <p className="mb-3">
              Shree Shyam Interior provides a <strong>10-Year Comprehensive Warranty</strong> on boiling water-proof (BWP/BWR) plywood cabinetry carcasses and manufacturer-backed warranties on German hardware (Hafele/Hettich/Blum).
            </p>
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm text-stone-700">
              <strong className="text-amber-900 block mb-1">Warranty Exclusions:</strong>
              <ul className="list-disc pl-5 space-y-1 text-stone-600">
                <li>Seepage, leakage, or plumbing failures originating from building walls, roofs, or internal builder pipes.</li>
                <li>Physical vandalism, chemical corrosion, deep scratching by sharp items, or fire accidents.</li>
                <li>Alterations or repairs undertaken by unauthorized local third-party carpenters.</li>
              </ul>
            </div>
          </section>

          {/* 11. Intellectual Property & Design Rights */}
          <section id="intellectual-property">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">11.</span> Intellectual Property & Portfolio Photography
            </h2>
            <p>
              All 3D renderings, custom CAD drawings, mood boards, and designs prepared by Shree Shyam Interior remain our intellectual property. Unless explicitly requested otherwise in writing prior to project commencement, the Company reserves the right to photograph finished interiors for our professional portfolio, website, and social media channels while safeguarding client privacy (no personal identification or family photographs shown).
            </p>
          </section>

          {/* 12. Modifications & Change Orders */}
          <section id="modifications">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">12.</span> Modifications, Variations & Change Orders
            </h2>
            <p>
              Any changes requested by the Client after final design sign-off or commencement of factory fabrication must be formalized through a written <strong>Change Order</strong>. Change orders will outline any additional cost implications and extension of completion deadlines before implementation.
            </p>
          </section>

          {/* 13. Delays & Force Majeure */}
          <section id="force-majeure">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">13.</span> Delays & Force Majeure
            </h2>
            <p>
              Shree Shyam Interior shall not be liable for delivery or installation delays caused by unforeseen events beyond reasonable control, including natural disasters, unseasonal torrential rain, municipal restrictions, state strikes, electricity outages, raw material supplier blockades, or site access restrictions imposed by residential societies.
            </p>
          </section>

          {/* 14. Cancellation & Termination */}
          <section id="cancellation-summary">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">14.</span> Cancellation & Termination
            </h2>
            <p>
              Contract cancellations, milestone adjustments, and refund mechanisms are governed exclusively by our dedicated <Link to="/cancellation-refund-policy" className="text-[#C68A43] font-semibold underline">Cancellation & Refund Policy</Link>. Once factory production or material cutting has commenced, custom orders cannot be cancelled.
            </p>
          </section>

          {/* 15. Limitation of Liability */}
          <section id="liability">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">15.</span> Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by Indian law, Shree Shyam Interior’s aggregate monetary liability arising out of any breach of contract or negligence shall not exceed the actual fees received by the Company for the specific disputed component. In no event shall the Company be liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          {/* 16. Indemnification */}
          <section id="indemnification">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">16.</span> Indemnification
            </h2>
            <p>
              The Client agrees to indemnify, defend, and hold harmless Shree Shyam Interior, its directors, employees, and subcontractors from any claims, damages, liabilities, or expenses resulting from the Client’s violation of building codes, failure to secure society NOCs, or unauthorized alterations to pre-existing structural elements.
            </p>
          </section>

          {/* 17. Dispute Resolution & Governing Law */}
          <section id="dispute-resolution">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">17.</span> Dispute Resolution & Governing Law
            </h2>
            <p>
              These Terms shall be interpreted, governed, and construed in accordance with the laws of the Republic of India. In the event of any dispute or contention arising out of this agreement, both parties shall first attempt in good faith to resolve the matter amicably through direct senior consultation.
            </p>
            <p className="mt-2 text-stone-700 font-semibold">
              If unresolved within 30 days, all disputes shall be subject to the exclusive legal jurisdiction of the courts located in <u>Sikar, Rajasthan, India</u>.
            </p>
          </section>

          {/* 18. Severability & Entire Agreement */}
          <section id="severability">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">18.</span> Severability & Entire Agreement
            </h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable under applicable law, such provision shall be severed, and the remaining provisions shall continue in full force and effect. These Terms, together with the formal signed BOQ and Cancellation Policy, constitute the complete agreement between the parties.
            </p>
          </section>

          {/* 19. Contact & Notices Information */}
          <section id="contact-notices" className="p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200">
            <h2 className="text-xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">19.</span> Contact & Official Notices
            </h2>
            <p className="text-stone-600 text-sm mb-4">
              All formal notices, inquiries, or legal communications regarding these Terms and Conditions should be directed to:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Principal Studio:</strong> Shree Shyam Interior, Near Circuit House, Jaipur Road, Sikar, Rajasthan 332001, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Phone:</strong> +91 94142 53333 / +91 98280 00000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Email:</strong> legal@shreeshyaminterior.com / info@shreeshyaminterior.com</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default TermsConditionsPage;
