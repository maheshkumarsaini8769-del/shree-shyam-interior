import React, { useState } from 'react';
import { ArrowRight, CheckSquare, X, CheckCircle2 } from 'lucide-react';
import { saveSiteVisit } from '../../services/bookingService';
import { SiteVisitRequest } from '../../types/quote';
import { useToast } from '../../context/ToastContext';
import { apiService } from '../../services/apiService';

export const SiteVisitSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Sikar',
    address: '',
    propertyType: '3BHK Apartment',
    approxArea: '1450',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    additionalNotes: ''
  });
  const [confirmedBooking, setConfirmedBooking] = useState<SiteVisitRequest | null>(null);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('Please enter your Name and Mobile Number', 'error');
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
        notes: `Area: ${formData.approxArea} sq ft. ${formData.additionalNotes}`.trim(),
      });
    } catch (_) {
      // Non-blocking — local confirmation still proceeds
    }

    const saved = saveSiteVisit(formData);
    setConfirmedBooking(saved);
    showToast(`Site Visit Confirmed! Booking ID: ${saved.id}`, 'success');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setConfirmedBooking(null);
  };

  return (
    <section className="py-12 sm:py-16 bg-cream-100 dark:bg-forest-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container (Matching Reference Image) */}
        <div className="rounded-3xl bg-forest-900 text-cream-100 border border-copper-500/30 overflow-hidden shadow-elevated grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-12 gap-8 relative">
          {/* Left Column: Heading, Text & Book Now Button */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 leading-tight">
              Book a Free <br />
              Site Visit
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed max-w-sm">
              Our experts will visit your site, understand your needs and guide you with the best solutions.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B57731] hover:bg-[#9E6526] text-white font-semibold text-xs tracking-wider uppercase shadow-glow-copper transition-all active:scale-95 group"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Professional Interior Consultant (Matching Reference Image) */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-card border border-copper-500/20">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Shree Shyam Interior Lead Consultant"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center text-[11px] font-semibold text-copper-300 backdrop-blur-sm bg-forest-950/60 py-1 rounded-lg">
                Lead Interior Architect
              </div>
            </div>
          </div>

          {/* Right Column: 4 Golden Checkpoints & Cursive Script (Matching Reference Image) */}
          <div className="lg:col-span-4 space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-3 text-xs sm:text-sm text-cream-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C68A43]/20 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0">
                  <CheckSquare className="w-4 h-4 text-[#C68A43]" />
                </div>
                <span className="font-semibold">Free Consultation</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C68A43]/20 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0">
                  <CheckSquare className="w-4 h-4 text-[#C68A43]" />
                </div>
                <span className="font-semibold">Expert Guidance</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C68A43]/20 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0">
                  <CheckSquare className="w-4 h-4 text-[#C68A43]" />
                </div>
                <span className="font-semibold">No Obligation</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#C68A43]/20 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0">
                  <CheckSquare className="w-4 h-4 text-[#C68A43]" />
                </div>
                <span className="font-semibold">Customised Solutions</span>
              </div>
            </div>

            {/* Handwritten Script (Matching Reference Image) */}
            <div className="pt-4 text-right">
              <span className="font-script text-3xl sm:text-4xl text-cream-200 drop-shadow-md font-normal inline-block rotate-[-3deg]">
                Let's Build <br />
                Your Dream <br />
                Together
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] bg-forest-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-forest-900 text-cream-100 border border-copper-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated relative my-8">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-cream-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedBooking ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-copper-500/20 border-2 border-copper-400 text-copper-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-50">
                  Site Visit Scheduled!
                </h3>
                <p className="text-xs text-charcoal-300">
                  Thank you, <strong className="text-cream-100">{confirmedBooking.fullName}</strong>. Our senior consultant will contact you prior to arrival.
                </p>

                <div className="p-4 rounded-2xl bg-forest-950 border border-copper-500/30 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-charcoal-300">Booking ID:</span>
                    <span className="font-mono font-bold text-copper-400">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-300">City / District:</span>
                    <span className="text-cream-100">{confirmedBooking.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-300">Preferred Slot:</span>
                    <span className="text-cream-100">{confirmedBooking.preferredTime}</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-3.5 rounded-xl bg-[#B57731] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper mt-4"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-50">
                    Schedule Free Site Visit
                  </h3>
                  <p className="text-xs text-charcoal-300 mt-1">
                    Free survey in Sikar, Jaipur & nearby areas in Rajasthan.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-copper-400 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajeshwar Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-forest-950 border border-cream-200/20 rounded-xl px-3 py-2.5 text-cream-100 focus:outline-none focus:border-copper-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-copper-400 font-semibold mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        inputMode="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-forest-950 border border-cream-200/20 rounded-xl px-3 py-2.5 text-cream-100 focus:outline-none focus:border-copper-400"
                      />
                    </div>
                    <div>
                      <label className="block text-copper-400 font-semibold mb-1">City / Region</label>
                      <input
                        type="text"
                        placeholder="Sikar, Jaipur, Nawalgarh..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-forest-950 border border-cream-200/20 rounded-xl px-3 py-2.5 text-cream-100 focus:outline-none focus:border-copper-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-copper-400 font-semibold mb-1">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-forest-950 border border-cream-200/20 rounded-xl px-3 py-2.5 text-cream-100 focus:outline-none focus:border-copper-400"
                    >
                      <option value="2BHK Apartment">2BHK Apartment</option>
                      <option value="3BHK Apartment">3BHK Apartment</option>
                      <option value="4BHK / Villa">4BHK / Villa</option>
                      <option value="Commercial Showroom">Commercial Showroom</option>
                      <option value="Corporate Office">Corporate Office</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all mt-4"
                >
                  Confirm Free Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
