import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Award,
  Briefcase,
  FileEdit,
  MessageSquareQuote,
  MessageSquare,
  CalendarCheck2,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Box,
  Sparkles,
  Share2,
  PartyPopper,
  ShieldCheck
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useTheme } from '../../context/ThemeContext';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainScrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    // Verify session validity on route change & periodically every 20 seconds
    let isCancelled = false;
    const checkSession = async () => {
      const res = await apiService.verifyAuth();
      if (!isCancelled && (!res || !res.valid)) {
        apiService.logout();
        navigate('/admin/login?revoked=true');
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 20000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [navigate, location.pathname]);

  // Reset scroll on main panel when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    apiService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Bookings (Site Visits)', path: '/admin/leads', icon: CalendarCheck2 },
    { label: 'Material Quotes', path: '/admin/quotes', icon: FileText },
    { label: 'WhatsApp Orders', path: '/admin/whatsapp-orders', icon: MessageSquare },
    { label: '3D Studio Finishes', path: '/admin/3d-studio', icon: Box },
    { label: 'Festival Themes (त्यौहार)', path: '/admin/festive', icon: PartyPopper },
    { label: 'Active Devices & Security', path: '/admin/sessions', icon: ShieldCheck },
    { label: 'Social Media Links', path: '/admin/social-links', icon: Share2 },
    { label: 'Logo, SEO & Banners', path: '/admin/seo-branding', icon: Sparkles },
    { label: 'Products & Materials', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Partner Brands', path: '/admin/brands', icon: Award },
    { label: 'Projects & Portfolio', path: '/admin/projects', icon: Briefcase },
    { label: 'Homepage Content CMS', path: '/admin/content', icon: FileEdit },
    { label: 'Client Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Business Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-screen h-[100dvh] w-full bg-cream-50 dark:bg-[#0B0F15] text-charcoal-900 dark:text-cream-50 flex overflow-hidden transition-colors duration-200">
      
      {/* Sidebar Desktop - Fully Independent Isolated Scroll */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white dark:bg-[#121720] border-r border-cream-200 dark:border-cream-200/10 shrink-0 h-full min-h-0 overflow-hidden z-30 select-none">
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-cream-200 dark:border-cream-200/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Shree Shyam Interior Logo"
              className="w-10 h-10 rounded-xl object-cover border border-copper-500/40 shadow-soft shrink-0"
              onError={(e) => {
                e.currentTarget.src = '/logo.jpg';
              }}
            />
            <div>
              <h2 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 tracking-tight leading-tight">
                Shree Shyam
              </h2>
              <span className="text-[10px] font-bold tracking-widest text-copper-500 uppercase">
                Admin Control
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links - Finger & Mouse Independent Smooth Scroll */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-4 px-3 space-y-1 admin-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          data-lenis-prevent
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-copper-500 text-white shadow-glow-copper font-bold'
                    : 'text-charcoal-600 dark:text-cream-200/75 hover:bg-cream-100 dark:hover:bg-[#1A212C] hover:text-copper-600 dark:hover:text-copper-300'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer Quick Links & Logout */}
        <div className="p-4 border-t border-cream-200 dark:border-cream-200/10 space-y-2 shrink-0 bg-white/50 dark:bg-[#121720]/50 backdrop-blur-sm">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-charcoal-500 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-copper-500" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-copper-500 font-bold uppercase">View</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (Touch-Optimized Independent Finger Scroll) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide-out Panel */}
          <div className="fixed inset-y-0 left-0 w-72 sm:w-80 max-w-[85vw] bg-white dark:bg-[#121720] h-full flex flex-col z-50 shadow-2xl border-r border-cream-200 dark:border-cream-200/10 overflow-hidden animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-4 border-b border-cream-200 dark:border-cream-200/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="w-8 h-8 rounded-lg object-cover border border-copper-500/40 shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = '/logo.jpg';
                  }}
                />
                <span className="font-serif font-bold text-base text-forest-950 dark:text-cream-50">
                  Admin Menu
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Nav Links with Finger Scroll */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-4 px-3 space-y-1 admin-scrollbar"
              style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
              data-lenis-prevent
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-copper-500 text-white font-bold shadow-md'
                        : 'text-charcoal-600 dark:text-cream-200/80 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-cream-200 dark:border-cream-200/10 space-y-2 shrink-0 bg-white/50 dark:bg-[#121720]/50">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-charcoal-500 dark:text-cream-200/70"
              >
                <ExternalLink className="w-3.5 h-3.5 text-copper-500" />
                <span>Open Live Website</span>
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Fully Independent Isolated Scroll */}
      <div className="flex-1 flex flex-col h-full min-w-0 min-h-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white/90 dark:bg-[#121720]/90 backdrop-blur-md border-b border-cream-200 dark:border-cream-200/10 px-4 sm:px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 cursor-pointer"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-forest-950 dark:text-cream-50 capitalize">
              {navItems.find((n) =>
                n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path)
              )?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Live Link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-copper-500/10 text-copper-600 dark:text-copper-400 text-xs font-bold border border-copper-500/20 hover:bg-copper-500/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-cream-200 dark:border-cream-200/10">
              <div className="w-8 h-8 rounded-full bg-copper-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                AD
              </div>
              <div className="hidden md:block text-left">
                <span className="block text-xs font-bold text-forest-950 dark:text-cream-50 leading-tight">
                  Admin User
                </span>
                <span className="block text-[10px] text-copper-500 font-semibold">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Body - Independent Smooth Scroll Container */}
        <main
          ref={mainScrollRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-6 lg:p-8 admin-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          data-lenis-prevent
        >
          <div className="max-w-7xl w-full mx-auto pb-24">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Embedded Styles for Isolated Scroll & Smooth Touch Behavior */}
      <style>{`
        .admin-scrollbar {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          touch-action: pan-y;
        }
        .admin-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .admin-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .dark .admin-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }
        .admin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(181, 119, 49, 0.4);
          border-radius: 9999px;
        }
        .admin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(181, 119, 49, 0.8);
        }
      `}</style>
    </div>
  );
};
