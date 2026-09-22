import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Award,
  Briefcase,
  FileEdit,
  MessageSquareQuote,
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
  Share2
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useTheme } from '../../context/ThemeContext';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    apiService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: '3D Studio Finishes', path: '/admin/3d-studio', icon: Box },
    { label: 'Social Media Links', path: '/admin/social-links', icon: Share2 },
    { label: 'Logo, SEO & Banners', path: '/admin/seo-branding', icon: Sparkles },
    { label: 'Products & Materials', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Partner Brands', path: '/admin/brands', icon: Award },
    { label: 'Projects & Portfolio', path: '/admin/projects', icon: Briefcase },
    { label: 'Homepage Content CMS', path: '/admin/content', icon: FileEdit },
    { label: 'Client Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Site Visits CRM', path: '/admin/leads', icon: CalendarCheck2 },
    { label: 'Quotations Inquiries', path: '/admin/quotes', icon: FileText },
    { label: 'Business Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-[#0B0F15] text-charcoal-900 dark:text-cream-50 flex transition-colors duration-200">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#121720] border-r border-cream-200 dark:border-cream-200/10 shrink-0 sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-cream-200 dark:border-cream-200/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Shree Shyam Interior Logo"
              className="w-10 h-10 rounded-xl object-cover border border-copper-500/40 shadow-soft shrink-0"
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

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-none">
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
        <div className="p-4 border-t border-cream-200 dark:border-cream-200/10 space-y-2">
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
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 bg-white dark:bg-[#121720] h-full flex flex-col z-10 p-4 shadow-2xl border-r border-cream-200 dark:border-cream-200/10">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-cream-200/10">
              <span className="font-serif font-bold text-base text-forest-950 dark:text-cream-50">
                Admin Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-cream-100 dark:bg-[#1A212C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
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
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-copper-500 text-white font-bold'
                        : 'text-charcoal-600 dark:text-cream-200/80 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-cream-200 dark:border-cream-200/10 space-y-2">
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
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-500"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/80 dark:bg-[#121720]/80 backdrop-blur-md border-b border-cream-200 dark:border-cream-200/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200"
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
              className="p-2 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500 transition-colors"
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

        {/* Dynamic Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
