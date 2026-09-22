import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { onImageErrorWithFallback } from '../../utils/imageFallback';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  fallback: string;
}

const primaryCategories: CategoryItem[] = [
  {
    id: 'plywood',
    name: 'Plywood',
    slug: 'plywood',
    image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'laminates',
    name: 'Laminates',
    slug: 'laminates',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hardware',
    name: 'Hardware',
    slug: 'hardware',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    slug: 'lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    slug: 'furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    slug: 'electrical',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tools',
    name: 'Tools & Machines',
    slug: 'tools',
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'false-ceiling',
    name: 'False Ceiling',
    slug: 'false-ceiling',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'
  }
];

export const CategoryCarousel: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-cream-100 dark:bg-forest-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
              Explore Our World
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-300 mt-0.5">
              Everything you need to create a beautiful space
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#B57731] hover:text-[#9E6526] transition-colors shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Category Cards Row */}
        <div
          className="flex lg:grid lg:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {primaryCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="flex-none w-32 sm:w-36 lg:w-auto bg-white dark:bg-forest-900 rounded-2xl overflow-hidden border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200 group flex flex-col items-center text-center p-2.5 sm:p-3"
            >
              {/* Product Category Photograph */}
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-cream-100 dark:bg-forest-800 mb-2">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
