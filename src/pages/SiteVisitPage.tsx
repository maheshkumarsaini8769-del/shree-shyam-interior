import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Phone, User, Home } from 'lucide-react';
import { saveSiteVisit } from '../services/bookingService';
import { SiteVisitRequest } from '../types/quote';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';

export const SiteVisitPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Sikar',
    address: '',
    propertyType: '3BHK Flat',
    approxArea: '1450',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    promoCode: '',
    additionalNotes: ''
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<SiteVisitRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('Please enter your name and contact phone number', 'error');
      return;
    }

    // Save lead to backend API so it appears in the admin panel
    try {
      await apiService.submitLead({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}${formData.city ? ', ' + formData.city : ''}`,
        date: formData.preferredDate,
        slot: formData.preferredTime,
        roomType: formData.propertyType,
        notes: `Area: ${formData.approxArea} sq ft. ${formData.promoCode ? 'Promo Code: ' + formData.promoCode + '. ' : ''}${formData.additionalNotes}`.trim(),
      });
    } catch (_) {
      // Non-blocking — WhatsApp + local confirmation still proceed
    }

    const newBooking = saveSiteVisit(formData);
    setBookingConfirmed(newBooking);
    showToast(`Site visit confirmed with ID: ${newBooking.id}`, 'success');
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 text-charcoal-800">
      <SEOHead
        title="Book Free Site Visit & Consultation in Sikar | Shree Shyam Interior"
        description="Book a 100% free site consultation in Sikar & Rajasthan. Our interior architect visits your property with laser measurement tools, physical material swatches, and 3D estimates."
        keywords="Interior Designer Site Visit Sikar, Free Interior Consultation Sikar, Turnkey Estimation Sikar Rajasthan"
        canonicalPath="/site-visit"
      />
      {/* Top Banner */}
      <div className="bg-forest-950 text-cream-100 py-12 sm:py-16 border-b border-cream-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-copper-400" />
            <span>Zero-Cost Architectural Consultation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50">
            Book a Free Site Visit
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 mt-2 max-w-2xl">
            Our certified site engineers & interior specialists will visit your property in Sikar, Jaipur, or nearby districts, perform laser measurements, and present tailored turnkey solutions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft">
            {bookingConfirmed ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-20 h-20 rounded-full bg-copper-500/20 border-2 border-copper-400 text-copper-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                    Visit Scheduled Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                    Thank you, <strong className="text-forest-950">{bookingConfirmed.fullName}</strong>. Our senior consultant will get in touch with you prior to the appointment.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Booking Reference:</span>
                    <span className="font-mono font-bold text-copper-600 text-sm">
                      {bookingConfirmed.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">City / District:</span>
                    <span className="font-semibold text-forest-950">{bookingConfirmed.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Property Type:</span>
                    <span className="font-semibold text-forest-950">{bookingConfirmed.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-400">Time Slot:</span>
                    <span className="font-semibold text-forest-950">{bookingConfirmed.preferredTime}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/profile"
                    className="flex-1 py-3.5 rounded-xl bg-forest-900 text-cream-100 font-bold text-xs uppercase tracking-wider text-center"
                  >
                    View in My Profile
                  </Link>
                  <button
                    onClick={() => setBookingConfirmed(null)}
                    className="flex-1 py-3.5 rounded-xl bg-copper-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper"
                  >
                    Book Another Visit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-forest-950">
                    Schedule Your Free Consultation
                  </h2>
                  <p className="text-xs text-charcoal-400 mt-1">
                    Fill in your project details below to reserve your complimentary slot.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-forest-950 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Er. Rajeshwar Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-forest-950 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        inputMode="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-forest-950 mb-1">City / Region</label>
                      <input
                        type="text"
                        placeholder="Sikar, Jaipur, Nawalgarh, Jhunjhunu..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-forest-950 mb-1">Site Address / Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Piprali Road, Near Railway Crossing"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-forest-950 mb-1">Property Type</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                      >
                        <option value="2BHK Apartment">2BHK Apartment</option>
                        <option value="3BHK Apartment">3BHK Apartment</option>
                        <option value="4BHK / Villa">4BHK / Independent Villa</option>
                        <option value="Commercial Showroom">Commercial Showroom</option>
                        <option value="Corporate Office">Corporate Office</option>
                        <option value="Full Renovation">Full Renovation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-forest-950 mb-1">Preferred Time Slot</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                      >
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                        <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-forest-950 mb-1">Approx Carpet Area (Sq Ft)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 1450"
                      value={formData.approxArea}
                      onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 focus:outline-none focus:border-copper-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-forest-950">
                        Festive Coupon / Referral Code (Optional)
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, promoCode: 'DIWALI2026' })}
                        className="text-[11px] font-bold text-copper-600 hover:underline cursor-pointer"
                      >
                        Apply DIWALI2026
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. DIWALI2026"
                      value={formData.promoCode}
                      onChange={(e) => setFormData({ ...formData, promoCode: e.target.value.toUpperCase() })}
                      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-forest-950 font-mono uppercase focus:outline-none focus:border-copper-500 placeholder:normal-case placeholder:font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all mt-4 cursor-pointer"
                >
                  Confirm Free Site Visit Booking
                </button>
              </form>
            )}
          </div>

          {/* Guarantees Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-forest-950 text-cream-100 rounded-3xl p-6 sm:p-8 border border-copper-500/30 shadow-elevated space-y-6">
              <h3 className="font-serif font-bold text-xl text-cream-50 border-b border-cream-200/10 pb-3">
                Why Book a Site Visit?
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-cream-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-copper-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-50 block">Accurate Laser Dimensioning</strong>
                    <span className="text-charcoal-300 text-xs">
                      Eliminates guesswork and material wastage before ordering sheets.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-copper-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-50 block">Material Swatches on Site</strong>
                    <span className="text-charcoal-300 text-xs">
                      Inspect CenturyPly, Greenlam, and Häfele physical samples in your own room lighting.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-copper-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-50 block">Transparent Cost Roadmap</strong>
                    <span className="text-charcoal-300 text-xs">
                      Get a detailed itemized estimate within 24 hours of measurement.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900 border border-copper-500/20 text-xs text-copper-300">
                Showroom Desk Hotline: <a href="tel:+919876543210" className="font-bold underline text-cream-100">+91 98765 43210</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
