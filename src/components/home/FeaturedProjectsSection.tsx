import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { onImageErrorWithFallback } from '../../utils/imageFallback';

export const FeaturedProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Home' | 'Office' | 'Commercial' | 'Renovation'>('All');

  const filters: ('All' | 'Home' | 'Office' | 'Commercial' | 'Renovation')[] = [
    'All',
    'Home',
    'Office',
    'Commercial',
    'Renovation'
  ];

  const displayProjects = [
    {
      title: 'Modern Living Room',
      location: 'Jaipur',
      category: 'Home',
      slug: 'modern-luxury-living-room-sikar',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Modular Kitchen',
      location: 'Sikar',
      category: 'Home',
      slug: 'contemporary-modular-kitchen-sikar',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Office Interior',
      location: 'Delhi',
      category: 'Office',
      slug: 'executive-law-chamber-delhi',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filtered = displayProjects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section className="py-12 sm:py-16 bg-cream-100 dark:bg-forest-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
            Featured Projects
          </h2>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#B57731] hover:text-[#9E6526] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                activeFilter === filter
                  ? 'bg-[#B57731] text-white shadow-sm'
                  : 'bg-white dark:bg-forest-900 text-charcoal-600 dark:text-cream-200 border border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 3 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <Link
              key={proj.title}
              to={`/projects/${proj.slug}`}
              className="group bg-white dark:bg-forest-900 rounded-3xl overflow-hidden border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-cream-100 dark:bg-forest-800">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => onImageErrorWithFallback(e, proj.fallback)}
                />
              </div>

              {/* Title & Circular Arrow Button */}
              <div className="p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-base text-forest-950 dark:text-cream-50 group-hover:text-copper-600 dark:group-hover:text-copper-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-charcoal-400 dark:text-charcoal-300 mt-0.5">
                    {proj.location}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white dark:bg-forest-800 border border-cream-200 dark:border-cream-200/20 shadow-sm flex items-center justify-center text-forest-900 dark:text-cream-100 group-hover:bg-[#B57731] group-hover:text-white group-hover:border-[#B57731] transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
