import React from 'react';
import { MapPin, Phone, MessageSquare, Navigation, Clock, Shield } from 'lucide-react';

export const ShowroomSection: React.FC = () => {
  return (
    <section id="showroom" className="py-20 sm:py-28 bg-forest-950 text-cream-100 relative overflow-hidden border-t border-cream-200/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Showroom Visual */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-forest-900 border border-copper-500/30 shadow-elevated">
            <div className="relative h-[320px] sm:h-[420px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Shree Shyam Interior Experience Showroom in Sikar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-forest-950/80 backdrop-blur-md border border-copper-500/40 text-copper-300 text-xs font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-copper-400" />
                <span>Experience Center Sikar</span>
              </div>
            </div>

            {/* Quick Timing Strip */}
            <div className="p-4 bg-forest-900 flex items-center justify-between text-xs text-cream-200 border-t border-cream-200/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-copper-400" />
                <span>Open All 7 Days: 10:00 AM – 8:30 PM</span>
              </div>
              <span className="text-copper-400 font-semibold">Free Parking Available</span>
            </div>
          </div>

          {/* Showroom Details & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-copper-400 text-xs uppercase tracking-widest font-bold block mb-1">
                Touch & Feel Premium Materials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-50 tracking-tight">
                Visit Our <span className="text-copper-400 italic font-normal">Sikar Showroom</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
              Experience full-scale modular kitchen mockups, over 400+ live laminate sheets, fluted charcoal wall samples, and German Häfele soft-close hardware displays under warm architectural illumination.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-cream-200">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-forest-900/60 border border-cream-200/10">
                <MapPin className="w-5 h-5 text-copper-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-cream-50">Shree Shyam Interior Experience Center</div>
                  <div className="text-charcoal-300 text-xs mt-0.5">
                    Station Road / Piprali Road Crossing, Sikar, Rajasthan - 332001
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-forest-900/60 border border-cream-200/10">
                <Shield className="w-5 h-5 text-copper-400 shrink-0" />
                <div>
                  <div className="font-bold text-cream-50">Authorized Distributor & Fabricator</div>
                  <div className="text-charcoal-300 text-xs">CenturyPly, Greenlam, Häfele & Philips certified</div>
                </div>
              </div>
            </div>

            {/* Three Working Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Shree+Shyam+Interior+Sikar+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-xs uppercase tracking-wider shadow-glow-copper transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-100 border border-cream-200/20 font-semibold text-xs uppercase tracking-wider transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-copper-400" />
                <span>Call Showroom</span>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20Shree%20Shyam%20Interior,%20I%20am%20planning%20to%20visit%20your%20Sikar%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-semibold text-xs uppercase tracking-wider transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
