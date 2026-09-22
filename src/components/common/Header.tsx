import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Sun, Moon, Sparkles, Calculator, ArrowRight } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useQuote } from '../../context/QuoteContext';
import { useTheme } from '../../context/ThemeContext';
const SearchModal = React.lazy(() => import('./SearchModal').then((m) => ({ default: m.SearchModal })));
import { apiService, BrandingSEOData } from '../../services/apiService';

export const Header: React.FC = () => {
  const { isScrolled } = useScrollDirection();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [branding, setBranding] = useState<BrandingSEOData | null>(null);
  const { totalItemCount } = useQuote();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    apiService.getBrandingSEO().then((data) => {
      if (data) {
        setBranding(data);
        if (data.seo?.siteTitle) {
          document.title = data.seo.siteTitle;
        }
        if (data.seo?.metaDescription) {
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', data.seo.metaDescription);
          }
        }
      }
    });
  }, []);

  const isHome = location.pathname === '/';
  const headerSolid = isScrolled || !isHome;

  const navLinks: { label: string; path: string; badge?: string }[] = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'Design AI', path: '/design-ai' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Estimator', path: '/quote' }
  ];

  const showAnnouncement = branding?.announcement?.enabled && !announcementDismissed;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerSolid
            ? 'bg-white/95 dark:bg-forest-950/95 backdrop-blur-md shadow-card border-b border-cream-200 dark:border-cream-200/10'
            : 'bg-white/90 dark:bg-forest-950/80 backdrop-blur-sm border-b border-cream-200/40 dark:border-transparent'
        }`}
      >
        {/* Top Dynamic Announcement Bar */}
        {showAnnouncement && (
          <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-cream-100 px-4 py-1.5 border-b border-forest-800/60 text-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-hidden mx-auto sm:mx-0">
                {branding.announcement.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-forest-950 uppercase tracking-wider shrink-0">
                    {branding.announcement.badge}
                  </span>
                )}
                <span className="truncate text-cream-200 font-light text-[11px] sm:text-xs">
                  {branding.announcement.text}
                </span>
                {branding.announcement.link && (
                  <Link
                    to={branding.announcement.link}
                    className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 ml-1 shrink-0 text-[11px]"
                  >
                    <span>{branding.announcement.linkLabel || 'Learn More'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              <button
                onClick={() => setAnnouncementDismissed(true)}
                className="text-cream-300/70 hover:text-cream-100 p-0.5 rounded-full hover:bg-forest-800/80 transition-colors shrink-0 hidden sm:block"
                title="Dismiss announcement"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
          {/* Left: Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img
              src={branding?.logo?.imageUrl || '/logo.jpg'}
              alt={branding?.logo?.text || 'Shree Shyam Interior'}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover border border-copper-500/30 shadow-soft group-hover:border-copper-500/70 transition-all shrink-0"
              onError={(e) => {
                e.currentTarget.src = '/logo.jpg';
              }}
            />

            <div className="flex flex-col">
              <span className="font-serif font-black text-forest-950 dark:text-cream-50 text-base sm:text-lg tracking-tight leading-none uppercase group-hover:text-copper-600 dark:group-hover:text-copper-400 transition-colors">
                {branding?.logo?.text || 'SHREE SHYAM'}{' '}
                <span className="text-xs font-sans font-extrabold tracking-widest text-copper-600 dark:text-copper-400">
                  {branding?.logo?.tagline || 'INTERIOR'}
                </span>
              </span>
              <span className="text-[10px] font-sans text-charcoal-500 dark:text-cream-300/80 font-medium tracking-normal mt-0.5">
                घर सजाते हैं, दिल से !
              </span>
            </div>
          </Link>


          {/* Center: Clean, Spaced-Out Desktop Links (Lightweight & Spacious) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = link.path.startsWith('/#')
                ? location.pathname === '/' && location.hash === link.path.replace('/', '')
                : location.pathname === link.path;

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative text-[13px] xl:text-[14px] font-medium transition-colors py-1.5 whitespace-nowrap hover:text-[#B57731] dark:hover:text-copper-400 ${
                    isActive
                      ? 'text-[#B57731] dark:text-copper-400 font-semibold'
                      : 'text-charcoal-700 dark:text-cream-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#C68A43] shadow-[0_0_8px_rgba(198,138,67,0.8)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Sleek Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-forest-900/90 border border-cream-200 dark:border-cream-200/15 hover:border-copper-500 flex items-center justify-center text-charcoal-700 dark:text-cream-100 hover:text-[#B57731] dark:hover:text-copper-400 transition-all shadow-sm active:scale-95"
              title="Search products, materials & projects"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark / Light Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-forest-900/90 border border-cream-200 dark:border-cream-200/15 hover:border-copper-500 flex items-center justify-center text-forest-900 dark:text-copper-300 transition-all shadow-sm active:scale-95"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-copper-400 fill-copper-400" />
              ) : (
                <Moon className="w-4 h-4 text-forest-900 fill-forest-900" />
              )}
            </button>

            {/* Quotation Cart Icon with Perfectly Centered Badge */}
            <Link
              to="/quote"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-forest-900/90 border border-cream-200 dark:border-cream-200/15 hover:border-copper-500 flex items-center justify-center text-forest-950 dark:text-cream-100 transition-all shadow-sm active:scale-95"
              title="Quotation Cart"
              aria-label="Quotation Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#C68A43] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center leading-none shadow-sm pointer-events-none">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle (Only on mobile: lg:hidden) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-cream-200/60 dark:hover:bg-forest-800 text-forest-950 dark:text-cream-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-cream-200 dark:border-cream-200/10 bg-white dark:bg-forest-950/98 px-6 py-6 space-y-4 shadow-elevated animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-cream-200 dark:border-cream-200/10">
              <Link
                to="/design-ai"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 dark:bg-forest-900 border border-copper-500/30 text-forest-950 dark:text-cream-100 text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4 text-copper-500" />
                AI Room Visualizer
              </Link>
              <Link
                to="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 dark:bg-forest-900 border border-cream-200 dark:border-cream-200/10 text-forest-950 dark:text-cream-100 text-xs font-semibold"
              >
                <Calculator className="w-4 h-4 text-copper-500" />
                Cost Estimator
              </Link>
            </div>

            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2 text-sm font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'text-copper-600 dark:text-copper-400'
                      : 'text-charcoal-700 dark:text-cream-200 hover:text-copper-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-copper-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/site-visit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white text-center text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Book Free Site Visit
              </Link>
              <div className="text-center text-xs text-charcoal-400 dark:text-charcoal-300">
                Showroom: Piprali Road, Near Railway Overbridge, Sikar, Rajasthan - 332001
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <React.Suspense fallback={null}>
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </React.Suspense>
      )}
    </>
  );
};
