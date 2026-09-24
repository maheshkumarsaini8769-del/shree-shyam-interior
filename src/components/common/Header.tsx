import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Calculator,
  ArrowRight,
  ChevronDown,
  Building2,
  Calendar,
  HelpCircle,
  Phone,
  Layers,
  Star,
  Compass
} from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useQuote } from '../../context/QuoteContext';
import { useTheme } from '../../context/ThemeContext';
const SearchModal = React.lazy(() => import('./SearchModal').then((m) => ({ default: m.SearchModal })));
import { apiService, BrandingSEOData } from '../../services/apiService';

export const Header: React.FC = () => {
  const { isScrolled } = useScrollDirection();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [branding, setBranding] = useState<BrandingSEOData | null>(null);
  const { totalItemCount } = useQuote();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const moreDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close More dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMoreOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const headerSolid = isScrolled || !isHome;

  // Primary Clean Links (visible directly on desktop)
  const mainNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Materials', path: '/products' },
    { label: 'Reviews', path: '/reviews' },
    { label: '3D Studio', path: '/design-ai', badge: 'AI' }
  ];

  // Secondary Links (neatly tucked inside "More" dropdown)
  const moreNavLinks = [
    {
      label: 'Cost Estimator',
      path: '/quote',
      desc: 'Instant turnkey BOQ & material cost calculator',
      icon: Calculator
    },
    {
      label: 'Book Site Visit',
      path: '/site-visit',
      desc: 'Free laser measurement & material samples in Sikar',
      icon: Calendar
    },
    {
      label: 'Design Blog & Ideas',
      path: '/blog',
      desc: 'Latest 2026 interior trends & plywood guides',
      icon: Sparkles
    },
    {
      label: 'About Studio',
      path: '/about',
      desc: '15+ Years Mastery, Century & Häfele certified',
      icon: Building2
    },
    {
      label: 'Frequently Asked (FAQ)',
      path: '/faq',
      desc: 'Timelines, warranty & turnkey process answers',
      icon: HelpCircle
    },
    {
      label: 'Contact & Showroom',
      path: '/contact',
      desc: 'Piprali Road, Sikar (Rajasthan) directions',
      icon: Phone
    }
  ];

  const isMoreActive = moreNavLinks.some((l) => location.pathname === l.path);
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


          {/* Center: Clean, Airy & Spacious Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative text-[13px] xl:text-[14px] font-medium transition-colors py-1.5 whitespace-nowrap hover:text-copper-600 dark:hover:text-copper-400 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-copper-600 dark:text-copper-400 font-semibold'
                      : 'text-charcoal-700 dark:text-cream-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-copper-500/15 text-copper-700 dark:text-copper-300 text-[10px] font-bold">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-copper-500 shadow-[0_0_8px_rgba(198,138,67,0.8)] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onMouseEnter={() => setIsMoreOpen(true)}
                className={`relative text-[13px] xl:text-[14px] font-medium transition-colors py-1.5 whitespace-nowrap flex items-center gap-1 hover:text-copper-600 dark:hover:text-copper-400 cursor-pointer ${
                  isMoreActive || isMoreOpen
                    ? 'text-copper-600 dark:text-copper-400 font-semibold'
                    : 'text-charcoal-700 dark:text-cream-100'
                }`}
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMoreOpen ? 'rotate-180 text-copper-600 dark:text-copper-400' : ''
                  }`}
                />
                {isMoreActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-copper-500 shadow-[0_0_8px_rgba(198,138,67,0.8)] rounded-full" />
                )}
              </button>

              {/* Dropdown Popup */}
              {isMoreOpen && (
                <div
                  onMouseLeave={() => setIsMoreOpen(false)}
                  className="absolute right-0 sm:left-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-lg"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/50 border-b border-cream-100 dark:border-cream-200/10 mb-1">
                    Explore Shree Shyam Interior
                  </div>

                  <div className="space-y-1">
                    {moreNavLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;

                      return (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={() => setIsMoreOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            isActive
                              ? 'bg-copper-500/10 text-copper-700 dark:text-copper-300'
                              : 'hover:bg-cream-100/70 dark:hover:bg-[#1A212C] text-forest-950 dark:text-cream-100'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-cream-100 dark:bg-forest-900 text-copper-600 dark:text-copper-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-xs block leading-tight">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60 leading-snug block mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Sleek Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-forest-900/90 border border-cream-200 dark:border-cream-200/15 hover:border-copper-500 flex items-center justify-center text-charcoal-700 dark:text-cream-100 hover:text-copper-600 dark:hover:text-copper-400 transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Search products, materials & projects"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark / Light Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-forest-900/90 border border-cream-200 dark:border-cream-200/15 hover:border-copper-500 flex items-center justify-center text-forest-900 dark:text-copper-300 transition-all shadow-sm active:scale-95 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-copper-400 fill-copper-400" />
              ) : (
                <Moon className="w-4 h-4 text-forest-900 fill-forest-900" />
              )}
            </button>

            {/* Quotation Cart Icon */}
            <Link
              to="/quote"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-forest-900/90 border border-cream-200 dark:border-cream-200/15 hover:border-copper-500 flex items-center justify-center text-forest-950 dark:text-cream-100 transition-all shadow-sm active:scale-95"
              title="Quotation Cart"
              aria-label="Quotation Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-copper-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center leading-none shadow-sm pointer-events-none">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle (Only on mobile: lg:hidden) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-cream-200/60 dark:hover:bg-forest-800 text-forest-950 dark:text-cream-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-cream-200 dark:border-cream-200/10 bg-white dark:bg-forest-950/98 px-5 py-5 space-y-4 shadow-elevated animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            {/* Quick Action Top Cards */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-cream-200 dark:border-cream-200/10">
              <Link
                to="/design-ai"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 dark:bg-forest-900 border border-copper-500/30 text-forest-950 dark:text-cream-100 text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4 text-copper-500" />
                <span>3D Visualizer</span>
              </Link>
              <Link
                to="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 dark:bg-forest-900 border border-cream-200 dark:border-cream-200/10 text-forest-950 dark:text-cream-100 text-xs font-semibold"
              >
                <Calculator className="w-4 h-4 text-copper-500" />
                <span>Cost Estimator</span>
              </Link>
            </div>

            {/* Main Section */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/50 block mb-1">
                Main Pages
              </span>
              <nav className="flex flex-col space-y-1">
                {mainNavLinks.map((link) => (
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
            </div>

            {/* More Section */}
            <div className="pt-2 border-t border-cream-100 dark:border-cream-200/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-200/50 block mb-1.5">
                More Services & Studio
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {moreNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-copper-500/15 text-copper-600 dark:text-copper-300 font-bold'
                          : 'bg-cream-50/70 dark:bg-forest-900/60 text-charcoal-700 dark:text-cream-200 hover:bg-cream-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-copper-500 shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/site-visit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-center text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Book Free Site Visit
              </Link>
              <div className="text-center text-[11px] text-charcoal-400 dark:text-charcoal-300">
                Piprali Road, Near Railway Overbridge, Sikar (Raj.)
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
