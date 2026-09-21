import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Package, Compass, Sparkles, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../data/products.json';
import projectsData from '../../data/projects.json';
import categoriesData from '../../data/categories.json';
import { Product } from '../../types/product';
import { Project } from '../../types/project';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Century Marine Plywood',
    'Modular Kitchen',
    'Häfele Soft Close',
    'Fluted Wall Louvers'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? (productsData as unknown as Product[]).filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredProjects = query.trim()
    ? (projectsData as Project[]).filter(
        (proj) =>
          proj.title.toLowerCase().includes(query.toLowerCase()) ||
          proj.location.toLowerCase().includes(query.toLowerCase()) ||
          proj.category.toLowerCase().includes(query.toLowerCase()) ||
          proj.designStyle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/products?item=${productId}`);
  };

  const handleSelectProject = (slug: string) => {
    onClose();
    navigate(`/projects/${slug}`);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-forest-950/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Header with Search Input & Close */}
      <div className="max-w-3xl w-full mx-auto flex items-center justify-between gap-4 border-b border-cream-200/20 pb-4">
        <div className="relative flex-1 flex items-center">
          <Search className="w-6 h-6 text-copper-400 absolute left-3 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plywood, modular kitchen, hardware, lights..."
            className="w-full bg-forest-900/60 text-cream-100 placeholder-charcoal-300 text-base sm:text-lg pl-12 pr-10 py-3.5 rounded-xl border border-cream-200/20 focus:outline-none focus:border-copper-400 focus:ring-1 focus:ring-copper-400 transition-all font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 rounded-full text-cream-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-xl bg-forest-900/60 hover:bg-forest-800 text-cream-200 hover:text-white border border-cream-200/20 transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl w-full mx-auto flex-1 overflow-y-auto mt-6 pr-1 space-y-6">
        {/* If query is empty: show recent and popular categories */}
        {!query.trim() && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-copper-400 uppercase mb-3">
                <Clock className="w-4 h-4" />
                Recent Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => handleRecentClick(term)}
                    className="px-3.5 py-1.5 rounded-lg bg-forest-900/80 hover:bg-forest-800 text-cream-100 text-sm border border-cream-200/10 hover:border-copper-400/40 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-copper-400 uppercase mb-3">
                <Sparkles className="w-4 h-4" />
                Popular Material Categories
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {categoriesData.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onClose();
                      navigate(`/products?category=${cat.slug}`);
                    }}
                    className="p-3 rounded-xl bg-forest-900/40 hover:bg-forest-900/80 border border-cream-200/10 hover:border-copper-500/40 text-left transition-all group"
                  >
                    <div className="text-sm font-semibold text-cream-100 group-hover:text-copper-400 transition-colors">
                      {cat.name}
                    </div>
                    <div className="text-xs text-charcoal-300 truncate">{cat.tagline}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* If query entered: show live results */}
        {query.trim() && (
          <div className="space-y-6 pb-8">
            {/* Products Results */}
            {filteredProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-copper-400 uppercase mb-3">
                  <Package className="w-4 h-4" />
                  Matching Products & Materials ({filteredProducts.length})
                </div>
                <div className="space-y-2">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="flex items-center justify-between p-3 rounded-xl bg-forest-900/60 hover:bg-forest-800/80 border border-cream-200/10 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover border border-cream-200/10"
                        />
                        <div>
                          <h4 className="text-cream-100 font-semibold text-sm line-clamp-1">{p.name}</h4>
                          <p className="text-xs text-copper-400">
                            {p.brand} • {p.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-copper-300 font-mono text-sm">
                        {p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Request Quote'}
                        <ArrowRight className="w-4 h-4 text-cream-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Results */}
            {filteredProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-copper-400 uppercase mb-3">
                  <Compass className="w-4 h-4" />
                  Matching Portfolio Projects ({filteredProjects.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => handleSelectProject(proj.slug)}
                      className="p-3 rounded-xl bg-forest-900/60 hover:bg-forest-800/80 border border-cream-200/10 cursor-pointer transition-all group"
                    >
                      <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                        <img
                          src={proj.heroImage}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-forest-950/80 text-copper-300">
                          {proj.category}
                        </span>
                      </div>
                      <h4 className="text-cream-100 font-semibold text-sm line-clamp-1 group-hover:text-copper-400 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-charcoal-300">{proj.location} • {proj.designStyle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && filteredProjects.length === 0 && (
              <div className="py-12 text-center text-charcoal-300">
                <Search className="w-10 h-10 mx-auto mb-3 text-copper-400/40" />
                <p className="text-cream-100 font-semibold">No materials or projects found</p>
                <p className="text-sm mt-1">Try searching for "plywood", "kitchen", "louvers", or "Sikar"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
