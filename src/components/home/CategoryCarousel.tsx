import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { onImageErrorWithFallback } from '../../utils/imageFallback';
import { apiService } from '../../services/apiService';
import initialCategories from '../../data/categories.json';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  fallback: string;
  tagline?: string;
  itemCount?: number;
}

const defaultFallbackImg = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80';

const mapCategories = (data: any[]): CategoryItem[] => {
  if (!Array.isArray(data) || data.length === 0) return [];
  const seen = new Set<string>();
  const res: CategoryItem[] = [];

  for (const c of data) {
    if (!c) continue;
    const id = c.id || c.slug;
    const slug = c.slug || c.id;
    const key = (id || slug || '').toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);

    res.push({
      id,
      name: c.name || 'Category',
      slug,
      image: c.image || defaultFallbackImg,
      fallback: defaultFallbackImg,
      tagline: c.tagline || '',
      itemCount: c.itemCount || 0
    });
  }
  return res;
};

export const CategoryCarousel: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const cached = localStorage.getItem('ssi_categories');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mapCategories(parsed);
        }
      }
    } catch (_) {}

    return mapCategories(initialCategories as any[]);
  });

  useEffect(() => {
    const handleUpdate = (data: any[]) => {
      if (Array.isArray(data) && data.length > 0) {
        setCategories(mapCategories(data));
      }
    };

    apiService.getCategories().then(handleUpdate).catch(() => {});

    const handleChange = (e: CustomEvent) => {
      if (e.detail) handleUpdate(e.detail);
    };
    window.addEventListener('ssi_categories_changed' as any, handleChange);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ssi_categories' && e.newValue) {
        try {
          handleUpdate(JSON.parse(e.newValue));
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('ssi_channel');
      channel.onmessage = (msg) => {
        if (msg.data?.type === 'categories_updated' && msg.data?.data) {
          handleUpdate(msg.data.data);
        }
      };
    } catch (_) {}

    const handleVisibility = () => {
      if (!document.hidden) {
        apiService.getCategories().then(handleUpdate).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('ssi_categories_changed' as any, handleChange);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (channel) channel.close();
    };
  }, []);

  return (
    <section id="categories" className="py-12 sm:py-16 bg-cream-100 dark:bg-forest-950 transition-colors scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 text-[11px] font-bold uppercase tracking-wider mb-2 border border-copper-500/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Materials & Finishes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/70 mt-0.5">
              Everything you need to create a beautiful space with authentic certified materials
            </p>
          </div>

          <Link
            to="/products#catalog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-copper-600 hover:text-copper-700 dark:text-copper-400 dark:hover:text-copper-300 transition-colors shrink-0"
          >
            <span>View All Materials ({categories.length} Categories)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Category Cards Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-4"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.slug}
              to={`/products?category=${encodeURIComponent(cat.slug || cat.id)}#catalog`}
              className="bg-white dark:bg-forest-900 rounded-2xl overflow-hidden border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200 group flex flex-col items-center text-center p-2.5 sm:p-3"
            >
              {/* Product Category Photograph */}
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-cream-100 dark:bg-forest-800 mb-2 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => onImageErrorWithFallback(e, cat.fallback)}
                />
              </div>

              {/* Title */}
              <span className="font-sans font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-100 group-hover:text-copper-600 dark:group-hover:text-copper-400 transition-colors line-clamp-1">
                {cat.name}
              </span>
              {cat.tagline && (
                <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50 line-clamp-1 mt-0.5 font-light">
                  {cat.tagline}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
