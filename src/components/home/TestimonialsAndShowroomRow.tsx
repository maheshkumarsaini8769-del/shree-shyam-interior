import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Clock, Shield, Navigation, Phone, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import { apiService, Testimonial } from '../../services/apiService';

export const TestimonialsAndShowroomRow: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData as unknown as Testimonial[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load reviews from API
  useEffect(() => {
    let isMounted = true;
    apiService.getTestimonials()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const approved = data.filter((t) => t.status !== 'Hidden');
          if (approved.length > 0) {
            setTestimonials(approved);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-play reviews carousel
  useEffect(() => {
    if (!isAutoPlay || testimonials.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentReview = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-8 sm:py-12 bg-cream-100 dark:bg-forest-950 text-forest-950 dark:text-cream-100 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* CARD 1: Client Reviews / Satisfaction (Left Card - Compact Height) */}
          <div className="lg:col-span-6 bg-white dark:bg-forest-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-cream-200 dark:border-copper-500/30 shadow-card flex flex-col justify-between transition-colors duration-300 relative">
            <div>
              {/* Card Header & Controls */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-copper-600 dark:text-copper-400 text-[11px] uppercase tracking-widest font-bold">
                      Client Satisfaction
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-copper-500/10 dark:bg-copper-400/15 text-copper-700 dark:text-copper-300 text-[10px] font-bold">
                      ★ 4.9 / 5.0
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
                    What Our Clients Say
                  </h3>
                </div>

                {/* Next / Prev Navigation */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Review"
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-charcoal-300/30 dark:border-cream-200/20 hover:bg-cream-100 dark:hover:bg-forest-800 text-forest-900 dark:text-cream-100 transition-all shadow-sm active:scale-95"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Review"
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-charcoal-300/30 dark:border-cream-200/20 hover:bg-cream-100 dark:hover:bg-forest-800 text-forest-900 dark:text-cream-100 transition-all shadow-sm active:scale-95"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Review Body */}
              <div className="min-h-[85px] sm:min-h-[95px] flex flex-col justify-center">
                <div>
                  {/* Rating Stars & Quote */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(currentReview?.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-copper-500 text-copper-500" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-copper-400/30 dark:text-copper-400/25" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-charcoal-700 dark:text-cream-200 leading-relaxed italic line-clamp-3">
                    "{currentReview?.review}"
                  </p>
                </div>
              </div>
            </div>

            {/* Client Info Footer */}
            <div className="mt-3.5 pt-3 border-t border-cream-200 dark:border-cream-200/10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentReview?.avatar}
                    alt={currentReview?.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-copper-400 shadow-sm shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50">
                        {currentReview?.name}
                      </h4>
                      <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400" title="Verified Customer">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-400 dark:text-charcoal-300 leading-none mt-0.5">{currentReview?.city}</p>
                    <p className="text-[10px] text-copper-600 dark:text-copper-400 font-medium leading-tight">{currentReview?.project}</p>
                  </div>
                </div>

                {/* Dot Pagination */}
                <div className="flex items-center gap-1">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlay(false);
                        setCurrentIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex
                          ? 'w-5 bg-copper-500'
                          : 'w-1.5 bg-charcoal-300 dark:bg-forest-700 hover:bg-copper-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Action Bar: See All Reviews & Write Review */}
              <div className="mt-3 pt-2.5 border-t border-dashed border-cream-200 dark:border-cream-200/10 flex items-center justify-between gap-2">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-copper-600 dark:text-copper-400 hover:text-copper-700 dark:hover:text-copper-300 transition-colors group"
                >
                  <span>See All Reviews ({testimonials.length > 5 ? '250+' : testimonials.length})</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/reviews?action=write"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-copper-500/10 hover:bg-copper-500/20 text-copper-700 dark:text-copper-300 text-[11px] font-bold transition-all"
                >
                  <span>Write a Review</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2: Showroom Location & Experience Center (Right Card - Compact Height) */}
          <div className="lg:col-span-6 bg-white dark:bg-forest-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-cream-200 dark:border-copper-500/30 shadow-card flex flex-col justify-between overflow-hidden transition-colors duration-300 relative">
            <div>
              {/* Showroom Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-copper-600 dark:text-copper-400 text-[11px] uppercase tracking-widest font-bold">
                      Experience Center
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                      Open Today
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
                    Visit Our <span className="text-copper-500 italic font-normal">Sikar Showroom</span>
                  </h3>
                </div>
              </div>

              {/* Showroom Visual Banner with Live Badges */}
              <div className="relative rounded-xl overflow-hidden h-28 sm:h-32 w-full mb-3 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                  alt="Shree Shyam Interior Experience Center Sikar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-black/20" />

                {/* Floating Location Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-md border border-copper-500/30 text-copper-300 text-[10px] font-semibold flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-copper-400" />
                  <span>Station Road / Piprali Crossing, Sikar</span>
                </div>

                {/* Quick Timing Strip */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-cream-100 bg-forest-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cream-200/10">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-copper-400" />
                    <span>10:00 AM – 8:30 PM (All 7 Days)</span>
                  </div>
                  <span className="text-copper-400 font-semibold hidden sm:inline">Free Parking</span>
                </div>
              </div>

              {/* Showroom Specs */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2 p-2 rounded-lg bg-cream-50 dark:bg-forest-800/60 border border-cream-200 dark:border-cream-200/10">
                  <MapPin className="w-3.5 h-3.5 text-copper-500 shrink-0 mt-0.5" />
                  <div className="text-charcoal-700 dark:text-cream-200 text-[11px] leading-snug">
                    <strong className="text-forest-950 dark:text-cream-50">Shree Shyam Interior Atelier</strong> — Piprali Road Crossing, Sikar (Raj.)
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-cream-50 dark:bg-forest-800/60 border border-cream-200 dark:border-cream-200/10">
                  <Shield className="w-3.5 h-3.5 text-copper-500 shrink-0" />
                  <span className="text-charcoal-700 dark:text-cream-200 text-[11px]">
                    CenturyPly, Greenlam, Häfele & Hettich Authorized Studio
                  </span>
                </div>
              </div>
            </div>

            {/* Showroom Actions Buttons */}
            <div className="mt-3.5 pt-3 border-t border-cream-200 dark:border-cream-200/10 flex flex-wrap items-center gap-2">
              <a
                href="https://maps.google.com/?q=Shree+Shyam+Interior+Sikar+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-copper-500 hover:bg-copper-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                <Navigation className="w-3 h-3" />
                <span>Directions</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cream-100 hover:bg-cream-200 dark:bg-forest-800 dark:hover:bg-forest-700 text-forest-950 dark:text-cream-100 border border-cream-300 dark:border-cream-200/20 font-bold text-[11px] uppercase tracking-wider transition-all active:scale-95"
              >
                <Phone className="w-3 h-3 text-copper-500" />
                <span>Call Desk</span>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20Shree%20Shyam%20Interior,%20I%20am%20planning%20to%20visit%20your%20Sikar%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 font-bold text-[11px] uppercase tracking-wider transition-all active:scale-95"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
