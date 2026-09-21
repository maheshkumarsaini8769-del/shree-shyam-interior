import React, { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import { apiService, Testimonial } from '../../services/apiService';

export const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Testimonial[]>(testimonialsData as unknown as Testimonial[]);

  useEffect(() => {
    let active = true;
    apiService.getTestimonials()
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          const approved = data.filter((t) => t.status !== 'Hidden');
          if (approved.length > 0) {
            setItems(approved);
          }
        }
      })
      .catch(() => {
        // Fallback already set to testimonialsData
      });

    return () => {
      active = false;
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-cream-100 dark:bg-forest-950 text-forest-950 dark:text-cream-100 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-copper-600 dark:text-copper-400 text-xs uppercase tracking-widest font-bold block mb-1">
              Client Satisfaction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base text-charcoal-400 dark:text-cream-300/70 mt-1">
              Real homeowner & architect stories from Sikar, Jaipur and Delhi NCR
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl border border-charcoal-300/30 dark:border-cream-200/20 hover:bg-white dark:hover:bg-forest-900 hover:border-copper-500 text-forest-900 dark:text-cream-100 transition-all shadow-sm active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl border border-charcoal-300/30 dark:border-cream-200/20 hover:bg-white dark:hover:bg-forest-900 hover:border-copper-500 text-forest-900 dark:text-cream-100 transition-all shadow-sm active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Touch Scrollable Testimonial Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[82vw] sm:w-[360px] md:w-[400px] snap-start rounded-3xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-cream-200/10 p-6 sm:p-7 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-copper-500 text-copper-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-copper-300/40 dark:text-copper-400/30" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-charcoal-700 dark:text-cream-200 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* Client Info */}
              <div className="mt-6 pt-4 border-t border-cream-200 dark:border-cream-200/10 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-copper-400 shrink-0"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">{item.name}</h4>
                  <p className="text-xs text-charcoal-400 dark:text-charcoal-300">{item.city}</p>
                  <p className="text-[11px] text-copper-600 dark:text-copper-400 font-medium">{item.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
