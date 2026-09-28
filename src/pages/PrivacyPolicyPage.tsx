import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Clock,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  AlertCircle,
  Database,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'March 20, 2026';

  const policyJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy - Shree Shyam Interior',
      url: 'https://wooden-five.vercel.app/privacy-policy',
      description: 'Privacy Policy and data protection terms for Shree Shyam Interior, Sikar, Rajasthan.',
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
          name: 'Privacy Policy',
          item: 'https://wooden-five.vercel.app/privacy-policy'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#14251F] pt-24 pb-20 selection:bg-[#C68A43]/20">
      <SEOHead
        title="Privacy Policy | Shree Shyam Interior Sikar"
        description="Read the official Privacy Policy of Shree Shyam Interior. Learn how we collect, handle, safeguard, and process client information, floor plans, and project inquiries in Sikar, Rajasthan."
        canonical="https://wooden-five.vercel.app/privacy-policy"
        keywords="privacy policy Shree Shyam Interior, data protection Sikar, customer information policy"
        jsonLd={policyJsonLd}
      />

      {/* Header Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#C68A43] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#14251F] font-medium">Privacy Policy</span>
        </nav>

        <div className="border-b border-stone-200 pb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14251F]/5 text-[#14251F] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C68A43]" />
            Data Protection & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14251F] mb-3">
            Privacy Policy
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

          {/* 1. Introduction */}
          <section id="introduction">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">01.</span> Introduction
            </h2>
            <p className="mb-3">
              Welcome to <strong>Shree Shyam Interior</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), having its primary office and workshop located in Sikar, Rajasthan, India. We are dedicated to providing turnkey residential and commercial interior design, modular kitchen manufacturing, and bespoke carpentry services.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website (<a href="https://wooden-five.vercel.app" className="text-[#C68A43] underline">https://wooden-five.vercel.app</a>), use our 3D visualization studio, request instant cost estimates, book an on-site consultation, or communicate with our architects via WhatsApp or phone. By engaging with our services, you consent to the data practices described herein.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-collected">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">02.</span> Information We Collect
            </h2>
            <p className="mb-4">
              We collect information that allows us to deliver accurate project quotes, generate 3D layouts, and carry out on-site execution. This includes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                <h4 className="font-bold text-[#14251F] text-xs uppercase tracking-wider mb-1">Personal Contact Details</h4>
                <p className="text-xs text-stone-600">Full name, mobile telephone number, WhatsApp contact number, and email address.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                <h4 className="font-bold text-[#14251F] text-xs uppercase tracking-wider mb-1">Property & Site Details</h4>
                <p className="text-xs text-stone-600">Site location, plot/flat number, colony, city (Sikar, Jaipur, Nawalgarh, Jhunjhunu, etc.), and pincode.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                <h4 className="font-bold text-[#14251F] text-xs uppercase tracking-wider mb-1">Project Requirements</h4>
                <p className="text-xs text-stone-600">Floor plans, CAD/PDF drawings, room dimensions, budget tier, preferred styles (Contemporary, Rajasthani Royal, Minimalist), and timeline.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                <h4 className="font-bold text-[#14251F] text-xs uppercase tracking-wider mb-1">Technical & Usage Logs</h4>
                <p className="text-xs text-stone-600">IP address, browser type, device specifications, operating system, and pages visited on our website.</p>
              </div>
            </div>
          </section>

          {/* 3. How We Collect Information */}
          <section id="how-we-collect">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">03.</span> How We Collect Information
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-1" />
                <span><strong>Direct Web Forms:</strong> Submissions through our Free Site Visit form, Contact form, and Instant Cost Calculator.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-1" />
                <span><strong>WhatsApp & Direct Messaging:</strong> Inquiries initiated by you via our website WhatsApp action buttons and catalog sharing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-1" />
                <span><strong>On-Site Measurement Visits:</strong> Information, photographs, and laser measurements recorded during in-person property surveys.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-1" />
                <span><strong>Automated Web Cookies:</strong> Standard web analytics cookies that help us understand page navigation patterns and improve site responsiveness.</span>
              </li>
            </ul>
          </section>

          {/* 4. Purpose of Data Processing */}
          <section id="purpose-of-processing">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">04.</span> Purpose of Data Processing
            </h2>
            <p className="mb-3">We utilize your personal information exclusively for genuine commercial and interior manufacturing operations:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
              <li>Preparing customized BOQs (Bill of Quantities) and itemized cost estimations.</li>
              <li>Scheduling physical architectural visits to your property in Sikar and surrounding districts.</li>
              <li>Generating personalized 3D CAD renders, kitchen layouts, and wardrobe cut-lists.</li>
              <li>Coordinating installation logistics, modular factory fabrication, and delivery schedules.</li>
              <li>Maintaining warranty records (up to 10 years on plywood, hardware, and German fittings).</li>
              <li>Transmitting important transactional updates, invoices, and design milestone approvals.</li>
            </ul>
          </section>

          {/* 5. WhatsApp & Communication Consent */}
          <section id="whatsapp-consent" className="p-5 bg-stone-50 rounded-2xl border border-stone-200">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#14251F] mb-2 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-base">05.</span> WhatsApp & Communication Consent
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
              By submitting your phone number on our website or sending us a message via WhatsApp, you provide explicit consent to receive service-related communication from Shree Shyam Interior. This includes 3D design files, PDF quotation breakdowns, site visit confirmations, and progress photographs.
            </p>
            <p className="text-xs text-stone-500 italic">
              You can revoke this consent or opt-out of promotional messages at any time by replying &quot;STOP&quot; on WhatsApp or by emailing us at <span className="font-mono text-stone-700">support@shreeshyaminterior.com</span>.
            </p>
          </section>

          {/* 6. Legal Basis for Processing */}
          <section id="legal-basis">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">06.</span> Legal Basis for Processing
            </h2>
            <p>
              In accordance with applicable Indian laws including the <em>Information Technology Act, 2000</em> and the <em>Digital Personal Data Protection Act (DPDP), 2023</em>, our processing of your data is based upon:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600 mt-2">
              <li><strong>Your explicit consent</strong> provided during form submission or consultation booking.</li>
              <li><strong>Contractual obligation</strong> to fulfill your interior design contract and deliver contracted work.</li>
              <li><strong>Legitimate business interests</strong> such as quality assurance, client dispute resolution, and warranty fulfillment.</li>
            </ul>
          </section>

          {/* 7. Sharing of Information */}
          <section id="sharing-of-information">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">07.</span> Sharing of Information
            </h2>
            <p className="mb-3">
              <strong>We never sell, rent, or trade your personal information to third-party advertisers.</strong> We disclose data strictly on a need-to-know basis to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-stone-600">
              <li><strong>Internal Project Managers & Site Supervisors:</strong> To carry out measurements and supervise on-site carpentry, civil, electrical, and painting works.</li>
              <li><strong>Certified Hardware & Appliance Partners:</strong> (e.g., Hafele, Hettich, Blum, Greenlam) when required solely for direct hardware dispatch or warranty registration.</li>
              <li><strong>Logistics & Transportation Teams:</strong> For factory-to-site delivery of pre-laminated boards and finished modular carcasses.</li>
              <li><strong>Statutory Authorities:</strong> If legally required under Indian law, court subpoenas, or taxation regulations.</li>
            </ul>
          </section>

          {/* 8. Data Retention Policy */}
          <section id="data-retention">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">08.</span> Data Retention Policy
            </h2>
            <p>
              We retain project records, floor plans, material specifications, and client contact details for the active duration of your <strong>10-Year Warranty coverage</strong>. This ensures that if you require modular hinge readjustment, laminate repair, or warranty claims within a decade of handover, our technical staff has instant access to your exact architectural specifications. Marketing inquiries without an active contract are purged after 24 months.
            </p>
          </section>

          {/* 9. Cookies & Tracking Technologies */}
          <section id="cookies-tracking">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">09.</span> Cookies & Tracking Technologies
            </h2>
            <p>
              Our website uses basic session cookies and anonymous analytics (e.g., Google Analytics) to monitor aggregate traffic, average load times, and popular service pages. These cookies do not extract personally identifiable files from your computer or phone. You can disable cookies in your web browser settings; however, certain interactive tools like our instant cost estimator and 3D studio may experience limited functionality.
            </p>
          </section>

          {/* 10. Security of Your Information */}
          <section id="security-measures">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">10.</span> Security of Your Information
            </h2>
            <p>
              We implement industry-standard organizational and technological safeguards. All web communication is encrypted using <strong>256-bit SSL/TLS encryption</strong> (HTTPS). Lead forms and customer records are protected in secure, password-authenticated databases with restricted administrative roles.
            </p>
          </section>

          {/* 11. User Rights */}
          <section id="user-rights">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">11.</span> Your Privacy Rights
            </h2>
            <p className="mb-2">Under applicable Indian data privacy regulations, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-stone-600">
              <li>Request a copy of the personal details and site measurements we hold about you.</li>
              <li>Request correction or rectification of incomplete or inaccurate information.</li>
              <li>Request the deletion or erasure of your personal data when no active contract or statutory tax requirement applies.</li>
              <li>Withdraw your consent to receive design newsletters or promotional messages at any time.</li>
            </ul>
          </section>

          {/* 12. Third-Party Links */}
          <section id="third-party-links">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">12.</span> Third-Party Links
            </h2>
            <p>
              Our website may occasionally link to third-party websites (such as manufacturer catalogs, hardware brands, YouTube walkthroughs, or social media pages). We do not control and are not responsible for the privacy practices or content of external sites. We recommend reviewing the privacy notices of any external site you visit.
            </p>
          </section>

          {/* 13. Children’s Privacy */}
          <section id="children-privacy">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">13.</span> Children’s Privacy
            </h2>
            <p>
              Our services are directed exclusively to property owners, prospective homeowners, builders, and adults aged 18 and above. We do not knowingly solicit or collect personal information from minors.
            </p>
          </section>

          {/* 14. Contact Information & Grievance Officer */}
          <section id="contact-grievance" className="p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200">
            <h2 className="text-xl font-serif font-bold text-[#14251F] mb-3 flex items-center gap-2">
              <span className="text-[#C68A43] font-mono text-lg">14.</span> Grievance Officer & Inquiries
            </h2>
            <p className="text-stone-600 text-sm mb-4">
              If you have any questions, clarifications, concerns, or requests regarding this Privacy Policy or our data handling practices, you may reach our designated Grievance Officer:
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Designated Officer:</strong> Grievance Redressal Cell, Shree Shyam Interior</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Office Address:</strong> Near Circuit House, Jaipur Road, Sikar, Rajasthan 332001, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Direct Phone:</strong> +91 94142 53333</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C68A43] shrink-0" />
                <span><strong>Email:</strong> privacy@shreeshyaminterior.com / info@shreeshyaminterior.com</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
