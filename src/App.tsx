import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { QuoteProvider } from './context/QuoteContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';
import { FloatingActions } from './components/common/FloatingActions';
import { ScrollProgress } from './components/common/ScrollProgress';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Helper to automatically recover from stale build chunk errors when app is updated
const lazyWithRetry = (importFn: () => Promise<any>) =>
  lazy(async () => {
    try {
      const component = await importFn();
      sessionStorage.removeItem('chunk_reload_lock');
      return component;
    } catch (error: any) {
      console.warn('Chunk loading failed, reloading for newest website version...', error);
      const hasReloaded = sessionStorage.getItem('chunk_reload_lock');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_reload_lock', 'true');
        window.location.reload();
        return new Promise(() => {}); // Wait for reload
      }
      sessionStorage.removeItem('chunk_reload_lock');
      throw error;
    }
  });

// Critical Root Route: Eager import for instant FCP and LCP
import { HomePage } from './pages/HomePage';

// Secondary Routes: Route Lazy Loading with Stale Chunk Auto-Recovery
const ProductsPage = lazyWithRetry(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProjectsPage = lazyWithRetry(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazyWithRetry(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const DesignAIPage = lazyWithRetry(() => import('./pages/DesignAIPage').then((m) => ({ default: m.DesignAIPage })));
const QuotePage = lazyWithRetry(() => import('./pages/QuotePage').then((m) => ({ default: m.QuotePage })));
const SiteVisitPage = lazyWithRetry(() => import('./pages/SiteVisitPage').then((m) => ({ default: m.SiteVisitPage })));
const ProfilePage = lazyWithRetry(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const ServicesHubPage = lazyWithRetry(() => import('./pages/ServicesHubPage').then((m) => ({ default: m.ServicesHubPage })));
const ServiceDetailPage = lazyWithRetry(() => import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const FAQPage = lazyWithRetry(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })));
const BlogPage = lazyWithRetry(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsConditionsPage = lazyWithRetry(() => import('./pages/TermsConditionsPage').then((m) => ({ default: m.TermsConditionsPage })));
const CancellationRefundPage = lazyWithRetry(() => import('./pages/CancellationRefundPage').then((m) => ({ default: m.CancellationRefundPage })));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ReviewsPage = lazyWithRetry(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));


// Admin Pages Lazy Loading
const AdminLayout = lazyWithRetry(() => import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLogin = lazyWithRetry(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazyWithRetry(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminProducts = lazyWithRetry(() => import('./pages/admin/AdminProducts').then((m) => ({ default: m.AdminProducts })));
const AdminCategories = lazyWithRetry(() => import('./pages/admin/AdminCategories').then((m) => ({ default: m.AdminCategories })));
const AdminBrands = lazyWithRetry(() => import('./pages/admin/AdminBrands').then((m) => ({ default: m.AdminBrands })));
const AdminProjects = lazyWithRetry(() => import('./pages/admin/AdminProjects').then((m) => ({ default: m.AdminProjects })));
const AdminContentCMS = lazyWithRetry(() => import('./pages/admin/AdminContentCMS').then((m) => ({ default: m.AdminContentCMS })));
const AdminTestimonials = lazyWithRetry(() => import('./pages/admin/AdminTestimonials').then((m) => ({ default: m.AdminTestimonials })));
const AdminLeads = lazyWithRetry(() => import('./pages/admin/AdminLeads').then((m) => ({ default: m.AdminLeads })));
const AdminQuotes = lazyWithRetry(() => import('./pages/admin/AdminQuotes').then((m) => ({ default: m.AdminQuotes })));
const AdminWhatsAppOrders = lazyWithRetry(() => import('./pages/admin/AdminWhatsAppOrders').then((m) => ({ default: m.AdminWhatsAppOrders })));
const AdminSettings = lazyWithRetry(() => import('./pages/admin/AdminSettings').then((m) => ({ default: m.AdminSettings })));
const Admin3DStudio = lazyWithRetry(() => import('./pages/admin/Admin3DStudio').then((m) => ({ default: m.Admin3DStudio })));
const AdminBrandingSEO = lazyWithRetry(() => import('./pages/admin/AdminBrandingSEO').then((m) => ({ default: m.AdminBrandingSEO })));
const AdminSocialLinks = lazyWithRetry(() => import('./pages/admin/AdminSocialLinks').then((m) => ({ default: m.AdminSocialLinks })));
const AdminFestiveCampaigns = lazyWithRetry(() => import('./pages/admin/AdminFestiveCampaigns').then((m) => ({ default: m.AdminFestiveCampaigns })));
const FestiveEffects = lazyWithRetry(() => import('./components/common/FestiveEffects').then((m) => ({ default: m.FestiveEffects })));


// Scroll to top helper on route transition with smooth hash anchor support
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

// Luxury Skeleton Shimmer Loader during chunk lazy loading
const PageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-cream-100 dark:bg-forest-950 flex flex-col items-center justify-center pt-24 pb-16 px-4">
    <div className="w-12 h-12 rounded-2xl bg-forest-900 border border-copper-500/40 flex items-center justify-center animate-pulse mb-4">
      <span className="text-copper-400 font-serif font-bold text-lg">SS</span>
    </div>
    <div className="h-4 w-48 bg-copper-500/20 rounded-full animate-pulse mb-2" />
    <div className="h-3 w-32 bg-forest-900/10 dark:bg-cream-100/10 rounded-full animate-pulse" />
  </div>
);

// Error boundary to catch any chunk loading failures and refresh cleanly
class ChunkErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    if (error?.message?.includes('dynamically imported module') || error?.message?.includes('Failed to fetch')) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream-100 dark:bg-forest-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="p-8 rounded-3xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/30 shadow-card max-w-md space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50">Website Updated</h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/80">
              A newer version of the website is available. Click below to refresh.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useSmoothScroll();

  if (isAdminRoute) {
    return (
      <ChunkErrorBoundary>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="3d-studio" element={<Admin3DStudio />} />
              <Route path="festive" element={<AdminFestiveCampaigns />} />
              <Route path="social-links" element={<AdminSocialLinks />} />
              <Route path="seo-branding" element={<AdminBrandingSEO />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="content" element={<AdminContentCMS />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="quotes" element={<AdminQuotes />} />
              <Route path="whatsapp-orders" element={<AdminWhatsAppOrders />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </ChunkErrorBoundary>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollToTop />
      <ScrollProgress />
      <Suspense fallback={null}>
        <FestiveEffects />
      </Suspense>
      <Header />

      <main className="flex-1">
        <ChunkErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesHubPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
              <Route path="/cancellation-refund-policy" element={<CancellationRefundPage />} />
              <Route path="/design-ai" element={<DesignAIPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/site-visit" element={<SiteVisitPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ChunkErrorBoundary>
      </main>

      <Footer />
      <FloatingActions />
      <BottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <QuoteProvider>
            <AppContent />
          </QuoteProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
