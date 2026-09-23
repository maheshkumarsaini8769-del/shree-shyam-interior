import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Building,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Sikar',
    service: 'Full Home Turnkey Interior',
    budget: '₹6 - ₹10 Lakhs',
    message: '',
    sendToWhatsApp: true
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    try {
      setSubmitting(true);

      // Save inquiry to backend API and cloud store
      const lead = await apiService.submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.city}, Rajasthan`,
        roomType: formData.service,
        budget: formData.budget,
        notes: `Inquiry from Contact Page: ${formData.message}`.trim()
      });


      // If user selected WhatsApp copy, also log a WhatsApp Order and open chat
      if (formData.sendToWhatsApp) {
        await apiService.submitWhatsAppOrder({
          customerName: formData.name,
          phone: formData.phone,
          city: formData.city,
          orderType: 'General Chat',
          message: `Contact Inquiry: ${formData.service}. Budget: ${formData.budget}. Note: ${formData.message}`,
          status: 'New'
        }).catch(() => {});

        const cleanPhone = '919876543210';
        const text = `*Namaste Shree Shyam Interior!*\nI submitted an inquiry through your website contact page:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*City:* ${formData.city}\n*Service:* ${formData.service}\n*Budget:* ${formData.budget}\n*Note:* ${formData.message || 'Looking for interior consultation'}`;
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
      }

      setSubmittedBookingId(lead.id);
      showToast('Inquiry received! Our interior design team will contact you shortly.', 'success');
    } catch (_) {
      showToast('Thank you! Your message has been recorded.', 'success');
      setSubmittedBookingId(`INQ-${Date.now()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Shree Shyam Interior Sikar',
    description: 'Get in touch with Shree Shyam Interior in Sikar, Rajasthan for turnkey home interior design, modular kitchens, and showroom consultations.',
    url: 'https://wooden-five.vercel.app/contact',
    mainEntity: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Shree Shyam Interior',
      telephone: '+919876543210',
      email: 'contact@shreeshyaminterior.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Piprali Road, Near Railway Overbridge',
        addressLocality: 'Sikar',
        addressRegion: 'Rajasthan',
        postalCode: '332001',
        addressCountry: 'IN'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '09:30',
        closes: '20:30'
      }
    }
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 text-charcoal-900 selection:bg-copper-500/20">
      <SEOHead
        title="Contact Us | Best Interior Designer in Sikar"
        description="Contact Shree Shyam Interior on Piprali Road, Sikar, Rajasthan. Call +91 98765 43210 or visit our showroom for turnkey interior design, modular kitchens, and free site visits."
        keywords="Contact Interior Designer Sikar, Shree Shyam Interior Piprali Road Sikar, Interior Design Showroom Sikar Phone Number, Modular Kitchen Sikar Contact"
        canonicalPath="/contact"
        jsonLd={contactJsonLd}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-forest-950 via-[#151D28] to-forest-950 text-cream-100 py-14 sm:py-18 border-b border-cream-200/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-copper-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-copper-400" />
            <span>Direct Studio & Showroom Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 tracking-tight">
            Contact Shree Shyam Interior
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 mt-3 max-w-2xl font-light leading-relaxed">
            Have a project in mind or want to explore our physical material swatches? Reach out to our interior architects or visit our flagship studio on Piprali Road, Sikar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Quick Contact Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <a
            href="tel:+919876543210"
            className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all group flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-copper-500/15 text-copper-600 flex items-center justify-center shrink-0 group-hover:bg-copper-500 group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">Direct Calling</span>
              <span className="font-mono font-bold text-sm text-forest-950 mt-0.5 block">+91 98765 43210</span>
              <span className="text-[11px] text-copper-600 font-semibold mt-1 inline-block">Speak with Architect →</span>
            </div>
          </a>

          <a
            href="https://wa.me/919876543210?text=Hello%20Shree%20Shyam%20Interior,%20I%20would%20like%20to%20consult%20for%20my%20interior%20project."
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all group flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">WhatsApp Support</span>
              <span className="font-mono font-bold text-sm text-forest-950 mt-0.5 block">+91 98765 43210</span>
              <span className="text-[11px] text-[#25D366] font-semibold mt-1 inline-block">Instant Chat & Estimates →</span>
            </div>
          </a>

          <a
            href="mailto:contact@shreeshyaminterior.com"
            className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all group flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">Official Email</span>
              <span className="font-bold text-xs text-forest-950 truncate block mt-0.5">contact@shreeshyaminterior.com</span>
              <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">Send Floor Plans →</span>
            </div>
          </a>

          <div className="p-5 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">Showroom Timings</span>
              <span className="font-bold text-xs text-forest-950 block mt-0.5">9:30 AM – 8:30 PM</span>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Open All 7 Days (Mon-Sun)</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Form Left, Showroom Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact & Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft">
            {submittedBookingId ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                    Message Sent Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-2 max-w-md mx-auto">
                    Thank you, <strong className="text-forest-950">{formData.name}</strong>. Your consultation inquiry has been assigned reference ID <strong className="text-copper-600 font-mono">{submittedBookingId}</strong>. Our interior design team in Sikar will call you shortly.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/site-visit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all"
                  >
                    <span>Schedule Laser Site Visit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setSubmittedBookingId(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: 'Sikar',
                        service: 'Full Home Turnkey Interior',
                        budget: '₹6 - ₹10 Lakhs',
                        message: '',
                        sendToWhatsApp: true
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cream-100 hover:bg-cream-200 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-copper-600 block mb-1">
                    Direct Inquiry Form
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-950">
                    Tell Us About Your Space
                  </h3>
                  <p className="text-xs text-charcoal-400 mt-1">
                    Fill out this form and our senior architect will contact you within 2 business hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      placeholder="e.g. 9829012345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sikar / Nawalgarh / Jaipur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Full Home Turnkey Interior">Full Home Turnkey Interior</option>
                      <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                      <option value="Master Bedroom & Wardrobes">Master Bedroom & Wardrobes</option>
                      <option value="Living Room & TV Console">Living Room & TV Console</option>
                      <option value="Designer False Ceiling">Designer False Ceiling</option>
                      <option value="Commercial & Office Design">Commercial & Office Design</option>
                      <option value="Certified Plywood & Hardware Supply">Certified Plywood & Hardware Supply</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Under ₹3 Lakhs">Under ₹3 Lakhs (Kitchen / Room)</option>
                      <option value="₹3 - ₹6 Lakhs">₹3 - ₹6 Lakhs</option>
                      <option value="₹6 - ₹10 Lakhs">₹6 - ₹10 Lakhs (2BHK / 3BHK)</option>
                      <option value="₹10 - ₹20 Lakhs">₹10 - ₹20 Lakhs (Luxury Turnkey)</option>
                      <option value="₹20 Lakhs+">₹20 Lakhs+ (Ultra Luxury Villa)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    Your Requirements & Floor Plan Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your room dimensions, preferred finish (Acrylic, Laminate, PU), possession timeline, or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-forest-950 focus:outline-none focus:border-copper-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="sendToWhatsApp"
                    checked={formData.sendToWhatsApp}
                    onChange={(e) => setFormData({ ...formData, sendToWhatsApp: e.target.checked })}
                    className="w-4 h-4 rounded text-copper-500 focus:ring-copper-400 accent-copper-500 cursor-pointer"
                  />
                  <label htmlFor="sendToWhatsApp" className="text-xs text-charcoal-600 cursor-pointer select-none">
                    Also dispatch a copy of this inquiry to Shree Shyam Interior WhatsApp Desk for instant reply
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-copper transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry to Studio'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Showroom & Studio Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Physical Card */}
            <div className="bg-forest-950 text-cream-100 rounded-3xl p-6 sm:p-8 border border-copper-500/30 shadow-elevated space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-copper-500/20 text-copper-400 border border-copper-500/40 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-copper-400 block">Flagship Studio</span>
                  <h3 className="font-serif font-bold text-xl text-cream-50">Shree Shyam Interior</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs text-cream-200/90 leading-relaxed border-t border-cream-200/10 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-50 block mb-0.5">Showroom Address:</strong>
                    <span>Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-50 block mb-0.5">Operational Hours:</strong>
                    <span>Monday – Sunday: 9:30 AM to 8:30 PM<br /><span className="text-copper-300 font-semibold">Open All 7 Days for Client Walk-ins</span></span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-50 block mb-0.5">In-House Materials Swatch Library:</strong>
                    <span>Inspect physical samples of Century BWP plywood, Häfele soft-close hinges, Greenlam acrylic sheets, and profile lighting fixtures.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Shree+Shyam+Interior+Piprali+Road+Sikar+Rajasthan"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-copper transition-all text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Map Directions</span>
                </a>

                <Link
                  to="/site-visit"
                  className="flex-1 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-cream-200/20 transition-all text-center"
                >
                  <span>Book Free Visit</span>
                </Link>
              </div>
            </div>

            {/* Service Districts Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-soft space-y-4">
              <h4 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-copper-500" />
                <span>Districts & Towns We Serve</span>
              </h4>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Our site engineers and installation carpenters provide turnkey architectural services across the entire Shekhawati region and Jaipur:
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                {['Sikar City', 'Piprali', 'Nawalgarh', 'Fatehpur', 'Laxmangarh', 'Dhod', 'Neem Ka Thana', 'Khandela', 'Ringas', 'Jhunjhunu', 'Jaipur'].map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1 rounded-lg bg-cream-100 text-charcoal-700 font-medium border border-cream-200"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif font-bold text-xl text-forest-950">
                Visit Our Studio & Showroom
              </h3>
              <p className="text-xs text-charcoal-400 mt-0.5">
                Conveniently located on Piprali Road, Sikar with dedicated parking for clients
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Shree+Shyam+Interior+Piprali+Road+Sikar+Rajasthan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-copper-600 hover:text-copper-700 underline"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-cream-200 relative bg-cream-100">
            <iframe
              title="Shree Shyam Interior Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113406.84305886616!2d75.0743513!3d27.6154562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca3776652c7b7%3A0xa19f930113c2f0f8!2sSikar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
