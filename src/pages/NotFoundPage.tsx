import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Sparkles, Phone, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#14251F] flex flex-col items-center justify-center px-4 py-32 text-center selection:bg-[#C68A43]/20 relative overflow-hidden">
      <SEOHead
        title="Page Not Found (404) | Shree Shyam Interior Sikar"
        description="Looks like this space hasn't been designed yet. Discover bespoke interior design services, modular kitchens, luxury bedrooms, or contact Shree Shyam Interior in Sikar."
        noindex={true}
      />

      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#C68A43]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#14251F]/10 blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/90 shadow-xl relative z-10 space-y-6">
        {/* Minimal Interior Accent Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C68A43]/10 text-[#C68A43] text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          404 Architecture Error
        </div>

        {/* Large 404 Typography */}
        <div className="relative">
          <span className="font-serif text-7xl sm:text-8xl lg:text-9xl font-black text-[#14251F]/90 tracking-tighter block select-none">
            404
          </span>
          <div className="w-16 h-1 bg-[#C68A43] mx-auto -mt-2 rounded-full" />
        </div>

        {/* Requested Headline & Description */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14251F] leading-snug">
            Looks like this space hasn&apos;t been designed yet.
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 leading-relaxed max-w-sm mx-auto">
            The blueprint you are looking for has either been moved, updated, or does not exist. Let&apos;s guide you back to our completed projects and bespoke spaces.
          </p>
        </div>

        {/* 4 Requested Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* 1. Back to Home */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#14251F] text-white hover:bg-[#C68A43] transition-colors text-xs sm:text-sm font-semibold shadow-sm group"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* 2. Explore Projects */}
          <Link
            to="/projects"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-stone-100 text-stone-800 hover:bg-stone-200 hover:text-[#14251F] transition-colors text-xs sm:text-sm font-semibold group"
          >
            <Layers className="w-4 h-4 text-[#C68A43]" />
            <span>Explore Projects</span>
          </Link>

          {/* 3. View Services */}
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-stone-100 text-stone-800 hover:bg-stone-200 hover:text-[#14251F] transition-colors text-xs sm:text-sm font-semibold group"
          >
            <Compass className="w-4 h-4 text-[#C68A43]" />
            <span>View Services</span>
          </Link>

          {/* 4. Contact Us */}
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#C68A43] text-white hover:bg-[#b57a35] transition-colors text-xs sm:text-sm font-semibold shadow-sm group"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Quick Return Link */}
        <div className="pt-2">
          <Link
            to="/"
            className="text-xs text-stone-400 hover:text-[#C68A43] inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Return to Shree Shyam Interior homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
