import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Sparkles, Maximize2 } from 'lucide-react';
import projectsData from '../data/projects.json';
import { Project } from '../types/project';
import { ImageViewer } from '../components/common/ImageViewer';
import { onImageErrorWithFallback } from '../utils/imageFallback';

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Home' | 'Office' | 'Commercial' | 'Renovation'>('All');
  const [lightboxImages, setLightboxImages] = useState<{ images: string[]; title: string } | null>(null);

  const categories = ['All', 'Home', 'Office', 'Commercial', 'Renovation'] as const;

  const filtered = projectsData.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  }) as Project[];

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 text-charcoal-800">
      {/* Header Banner */}
      <div className="bg-forest-950 text-cream-100 py-12 sm:py-16 border-b border-cream-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-copper-400" />
            <span>Turnkey Portfolio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50">
            Featured Architectural Projects
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 mt-2 max-w-2xl">
            Explore turnkey residences, modular luxury kitchens, corporate law chambers, and commercial retail transformations crafted by Shree Shyam Interior across Sikar, Jaipur & Delhi NCR.
          </p>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-copper-500 text-white shadow-glow-copper'
                    : 'bg-forest-900/80 text-cream-200 border border-cream-200/10 hover:border-copper-400/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl overflow-hidden bg-white border border-cream-200 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col"
            >
              {/* Image & Lightbox Trigger */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-cream-200">
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="eager"
                  onError={(e) => onImageErrorWithFallback(e)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-forest-950/80 text-copper-300 text-[11px] font-bold backdrop-blur-md border border-white/10 uppercase">
                  {proj.category}
                </div>

                <button
                  onClick={() =>
                    setLightboxImages({
                      images: proj.gallery && proj.gallery.length > 0 ? proj.gallery : [proj.heroImage],
                      title: proj.title
                    })
                  }
                  className="absolute top-3.5 right-3.5 p-2 rounded-full bg-forest-950/70 hover:bg-copper-500 text-white backdrop-blur-md transition-all shadow-md active:scale-95"
                  title="Pinch-zoom full gallery"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-cream-100 font-medium">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-copper-400" />
                    <span>{proj.location}</span>
                  </div>
                  <span className="font-mono text-copper-300 font-bold">{proj.area}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-forest-950 group-hover:text-copper-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-charcoal-400 mt-2 line-clamp-2 leading-relaxed">
                    {proj.overview}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.materialsUsed.slice(0, 2).map((m, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-cream-100 text-charcoal-600 text-[11px] font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-charcoal-400 block">Est. Budget</span>
                    <span className="font-mono font-bold text-forest-950">{proj.budgetRange}</span>
                  </div>
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 text-copper-300 text-xs font-bold uppercase tracking-wider hover:bg-copper-500 hover:text-white transition-all group-hover:shadow-md"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Pinch-Zoom ImageViewer */}
      {lightboxImages && (
        <ImageViewer
          isOpen={true}
          images={lightboxImages.images}
          title={lightboxImages.title}
          onClose={() => setLightboxImages(null)}
        />
      )}
    </div>
  );
};
