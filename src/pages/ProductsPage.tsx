import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, Check, Eye, X, Star, ShieldCheck } from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Product } from '../types/product';
import { apiService } from '../services/apiService';
import { useQuote } from '../context/QuoteContext';
import { ImageViewer } from '../components/common/ImageViewer';
import { onImageErrorWithFallback } from '../utils/imageFallback';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>(productsData as unknown as Product[]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);

  const { addItem, isItemInQuote } = useQuote();

  useEffect(() => {
    apiService.getProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand))).sort();
    return ['all', ...list];
  }, [products]);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, [products]);

  useEffect(() => {
    const b = searchParams.get('brand');
    if (b) {
      const match = brands.find((brand) => brand.toLowerCase() === b.toLowerCase());
      setSelectedBrand(match || b);
    } else {
      setSelectedBrand('all');
    }

    const c = searchParams.get('category');
    if (c) {
      setSelectedCategory(c);
    } else {
      setSelectedCategory('all');
    }

    const s = searchParams.get('search');
    if (s) {
      setSearchQuery(s);
    } else {
      setSearchQuery('');
    }
  }, [searchParams, brands]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat =
          selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesBrand =
          selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
        const matchesQuery =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesBrand && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.reviewCount || 0) - (a.reviewCount || 0); // popular
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    setSearchParams(params);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const params = new URLSearchParams(searchParams);
    if (brand === 'all') {
      params.delete('brand');
    } else {
      params.set('brand', brand);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (!query.trim()) {
      params.delete('search');
    } else {
      params.set('search', query);
    }
    setSearchParams(params);
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 dark:bg-forest-950 text-charcoal-800 dark:text-cream-100 transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-forest-950 text-cream-100 py-12 sm:py-16 border-b border-cream-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper-500/15 border border-copper-400/30 text-copper-300 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Factory Certified Materials & Fittings</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50">
            Products & Material Catalog
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 mt-2 max-w-2xl">
            Sourced directly from CenturyPly, Greenlam, Hettich, Häfele, Blum, Havells & Asian Paints. Add items to your live quotation cart with itemized pricing.
          </p>

          {/* Search & Sort Controls Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="w-5 h-5 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search plywood, acrylics, Hettich hinges, Havells lights..."
                className="w-full bg-forest-900 border border-copper-500/30 rounded-xl pl-11 pr-10 py-3 text-sm text-cream-100 placeholder-charcoal-300 focus:outline-none focus:border-copper-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-300 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full bg-forest-900 border border-copper-500/30 rounded-xl px-3.5 py-3 text-sm text-cream-100 focus:outline-none focus:border-copper-400 transition-colors"
              >
                <option value="all">All Brands ({products.length} items)</option>
                {brands
                  .filter((b) => b !== 'all')
                  .map((b) => (
                    <option key={b} value={b}>
                      {b} {brandCounts[b] ? `(${brandCounts[b]})` : ''}
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-forest-900 border border-copper-500/30 rounded-xl px-3.5 py-3 text-sm text-cream-100 focus:outline-none focus:border-copper-400 transition-colors"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Horizontal Category Chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 mb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-forest-900 dark:bg-copper-500 text-copper-400 dark:text-white shadow-md border border-copper-400'
                : 'bg-white dark:bg-forest-900 text-charcoal-600 dark:text-cream-200 border border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
            }`}
          >
            All Products ({products.length})
          </button>
          {categoriesData.map((cat) => {
            const count = products.filter(
              (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
            ).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                    ? 'bg-forest-900 dark:bg-copper-500 text-copper-400 dark:text-white shadow-md border border-copper-400'
                    : 'bg-white dark:bg-forest-900 text-charcoal-600 dark:text-cream-200 border border-cream-200 dark:border-cream-200/10 hover:border-copper-400'
                }`}
              >
                {cat.name} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 sm:p-4 bg-white dark:bg-forest-900 rounded-2xl border border-cream-200 dark:border-cream-200/10 shadow-soft">
            <span className="text-charcoal-400 dark:text-cream-200/60 font-semibold uppercase tracking-wider text-[11px] mr-1">
              Active Filters:
            </span>

            {selectedBrand !== 'all' && (
              <button
                onClick={() => handleBrandChange('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/15 dark:bg-copper-500/20 text-copper-700 dark:text-copper-300 text-xs font-semibold hover:bg-copper-500/25 transition-colors border border-copper-500/30"
              >
                <span>Brand: <strong>{selectedBrand}</strong></span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedCategory !== 'all' && (
              <button
                onClick={() => handleCategoryClick('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/15 dark:bg-copper-500/20 text-copper-700 dark:text-copper-300 text-xs font-semibold hover:bg-copper-500/25 transition-colors border border-copper-500/30"
              >
                <span>
                  Category:{' '}
                  <strong>
                    {categoriesData.find((c) => c.slug.toLowerCase() === selectedCategory.toLowerCase())
                      ?.name || selectedCategory}
                  </strong>
                </span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {searchQuery.trim() && (
              <button
                onClick={() => handleSearchChange('')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/15 dark:bg-copper-500/20 text-copper-700 dark:text-copper-300 text-xs font-semibold hover:bg-copper-500/25 transition-colors border border-copper-500/30"
              >
                <span>Search: "<strong>{searchQuery}</strong>"</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleClearAllFilters}
              className="ml-auto text-xs font-bold text-copper-600 dark:text-copper-400 hover:underline px-2 py-1"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Results Counter Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/70">
            Showing <strong className="text-forest-950 dark:text-cream-50">{filteredProducts.length}</strong> certified architectural items
            {selectedBrand !== 'all' && (
              <span> for <span className="text-copper-600 dark:text-copper-400 font-bold">{selectedBrand}</span></span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inQuote = isItemInQuote(product.id);

            return (
              <div
                key={product.id}
                className="bg-white dark:bg-forest-900 rounded-2xl overflow-hidden border border-cream-200 dark:border-cream-200/10 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-52 sm:h-56 bg-cream-100 dark:bg-forest-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                    onError={(e) => onImageErrorWithFallback(e)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Brand Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-forest-950/80 text-copper-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                    {product.brand}
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-copper-500 hover:text-white text-forest-900 shadow-md backdrop-blur-md transition-all active:scale-95"
                    title="Quick Specifications"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-forest-950/80 text-cream-100 text-[11px] font-semibold backdrop-blur-md">
                    <Star className="w-3 h-3 fill-copper-400 text-copper-400" />
                    <span>{product.rating}</span>
                    <span className="text-charcoal-300">({product.reviewCount})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {product.subCategory && (
                      <span className="text-[10px] font-bold text-copper-600 dark:text-copper-400 uppercase tracking-wider block mb-1">
                        {product.subCategory}
                      </span>
                    )}
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="font-bold text-sm sm:text-base text-forest-950 dark:text-cream-50 line-clamp-2 hover:text-copper-600 dark:hover:text-copper-300 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-charcoal-500 dark:text-cream-200/70 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-cream-200 dark:border-cream-200/10">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        {product.price ? (
                          <div className="font-serif font-bold text-lg text-forest-950 dark:text-cream-50">
                            ₹{product.price.toLocaleString('en-IN')}{' '}
                            <span className="text-[11px] font-sans font-normal text-charcoal-400 dark:text-cream-200/60">
                              / {product.unit}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-copper-600 uppercase">
                            Rate on Enquiry
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Quote Button */}
                    <button
                      onClick={() => addItem(product)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
                        inQuote
                          ? 'bg-forest-900 text-copper-300 border border-copper-500/40'
                          : 'bg-copper-500 hover:bg-copper-600 text-white shadow-glow-copper'
                      }`}
                    >
                      {inQuote ? (
                        <>
                          <Check className="w-4 h-4 text-copper-400" />
                          <span>In Quote List</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-charcoal-400 dark:text-cream-200/70">
            <Search className="w-12 h-12 mx-auto mb-3 text-copper-400/40" />
            <h3 className="font-bold text-lg text-forest-950 dark:text-cream-50">No matching materials found</h3>
            <p className="text-sm mt-1">Try clearing your filters or choosing another brand/category.</p>
            <button
              onClick={handleClearAllFilters}
              className="mt-4 px-5 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-glow-copper"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[10000] bg-forest-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-forest-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-elevated relative my-8 border border-cream-200 dark:border-copper-500/30">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-cream-100 dark:bg-forest-800 hover:bg-cream-200 dark:hover:bg-forest-700 text-forest-900 dark:text-cream-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="relative rounded-2xl overflow-hidden bg-cream-100 dark:bg-forest-950 h-64 sm:h-72">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => onImageErrorWithFallback(e)}
                />
                <button
                  onClick={() => {
                    const imgs =
                      quickViewProduct.gallery && quickViewProduct.gallery.length > 0
                        ? quickViewProduct.gallery
                        : [quickViewProduct.image];
                    setGalleryImages(imgs);
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-forest-950/80 text-copper-300 text-xs font-semibold backdrop-blur-md hover:bg-forest-950 transition-colors"
                >
                  Pinch & Zoom Photo
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-copper-600 dark:text-copper-400 uppercase tracking-wider">
                    {quickViewProduct.brand} • {quickViewProduct.category}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-forest-950 dark:text-cream-50 mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <div className="font-serif font-bold text-2xl text-copper-600 dark:text-copper-400 mt-2">
                    {quickViewProduct.price
                      ? `₹${quickViewProduct.price.toLocaleString('en-IN')} / ${quickViewProduct.unit}`
                      : 'Price on Request'}
                  </div>
                </div>

                <p className="text-xs text-charcoal-500 dark:text-cream-200/80 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-forest-950 dark:text-cream-50 mb-1.5">
                    Highlights:
                  </h4>
                  <ul className="space-y-1 text-xs text-charcoal-600 dark:text-cream-200/80">
                    {quickViewProduct.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-copper-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                {quickViewProduct.specifications && (
                  <div className="p-3 bg-cream-50 dark:bg-forest-950 rounded-xl border border-cream-200 dark:border-cream-200/10 text-xs space-y-1">
                    {Object.entries(quickViewProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-charcoal-400 dark:text-cream-200/60">{key}:</span>
                        <span className="font-semibold text-forest-950 dark:text-cream-100">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => {
                      addItem(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all"
                  >
                    Add to Quotation List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Pinch-Zoom ImageViewer */}
      {galleryImages && (
        <ImageViewer
          isOpen={true}
          images={galleryImages}
          onClose={() => setGalleryImages(null)}
          title={quickViewProduct?.name}
        />
      )}
    </div>
  );
};
