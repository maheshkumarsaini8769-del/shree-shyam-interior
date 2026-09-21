import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Calculator, Calendar, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800 dark:bg-forest-950 dark:text-cream-100 flex flex-col items-center justify-center px-4 py-32 text-center transition-colors">
      <SEOHead
        title="Page Not Found (404) | Shree Shyam Interior Sikar"
        description="The requested page cannot be found. Discover interior design services, modular kitchens, project portfolio, or schedule a free site consultation in Sikar."
        noindex={true}
      />

      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-elevated space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-copper-500/10 border border-copper-500/30 flex items-center justify-center text-copper-600 dark:text-copper-400 font-serif text-3xl font-black">
          404
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
            Page Not Located
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-300/80 mt-2 leading-relaxed">
            The page you were looking for may have moved or no longer exists. Let’s get you back on track.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold">
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-cream-100 dark:bg-forest-800 hover:bg-copper-500 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </Link>

          <Link
            to="/services"
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-cream-100 dark:bg-forest-800 hover:bg-copper-500 hover:text-white transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Our Services</span>
          </Link>

          <Link
            to="/projects"
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-cream-100 dark:bg-forest-800 hover:bg-copper-500 hover:text-white transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>

          <Link
            to="/quote"
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-cream-100 dark:bg-forest-800 hover:bg-copper-500 hover:text-white transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Cost Estimator</span>
          </Link>
        </div>

        <div className="pt-2">
          <Link
            to="/site-visit"
            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
          >
            Book Free Site Visit in Sikar
          </Link>
        </div>
      </div>
    </div>
  );
};
