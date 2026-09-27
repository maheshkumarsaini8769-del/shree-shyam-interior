import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { useTheme } from '../../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [heroData, setHeroData] = useState({
    badge: "SIKAR'S PREMIER INTERIOR ARCHITECTURE STUDIO",
    titlePrefix: 'Premium Interior Design',
    titleHighlight: 'Services in Sikar',
    subtitle: 'Award-winning turnkey interior designer in Sikar, Rajasthan. Bespoke home interiors, modular kitchens, luxury bedroom suites & commercial spaces with 10-year warranty.',
    primaryCtaText: 'Book Free Site Visit',
    primaryCtaLink: '/site-visit',
    secondaryCtaText: 'Explore 3D Studio',
    secondaryCtaLink: '/design-ai',
    backgroundImage: ''
  });

  useEffect(() => {
    apiService.getSiteContent().then((content) => {
      if (content?.hero) {
        setHeroData({
          badge: content.hero.badge || "SIKAR'S PREMIER INTERIOR ARCHITECTURE STUDIO",
          titlePrefix: content.hero.titlePrefix || 'Premium Interior Design',
          titleHighlight: content.hero.titleHighlight || 'Services in Sikar',
          subtitle: content.hero.subtitle || 'Award-winning turnkey interior designer in Sikar, Rajasthan. Bespoke home interiors, modular kitchens, luxury bedroom suites & commercial spaces with 10-year warranty.',
          primaryCtaText: content.hero.primaryCtaText || 'Book Free Site Visit',
          primaryCtaLink: content.hero.primaryCtaLink || '/site-visit',
          secondaryCtaText: content.hero.secondaryCtaText || 'Explore 3D Studio',
          secondaryCtaLink: content.hero.secondaryCtaLink || '/design-ai',
          backgroundImage: content.hero.backgroundImage || ''
        });
      }
    });
  }, []);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  ];

  // If a custom image was uploaded/configured in CMS and is not the old fallback unsplash URL, use it
  const isCustomImage = heroData.backgroundImage &&
    !heroData.backgroundImage.includes('unsplash.com/photo-1600210492486');

  return (
    <section
      className={`relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-16 transition-colors duration-500 ${
        isDark ? 'bg-forest-950 text-cream-100' : 'bg-[#FAF7F2] text-forest-950'
      }`}
    >
      {/* Background Luxury Interior Photograph - LCP Optimized */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {isCustomImage ? (
          <img
            src={heroData.backgroundImage}
            alt="Shree Shyam Interior Architecture"
            className="w-full h-full object-cover object-center filter brightness-95"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        ) : (
          <>
            {/* Bright / Light Theme Background (task.md prompt 2) */}
            <img
              src="/hero-light.jpg"
              alt="Shree Shyam Interior Bright Luxury Architecture"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                !isDark ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />

            {/* Dark Theme Background (task.md prompt 1) */}
            <img
              src="/hero-dark.jpg"
              alt="Shree Shyam Interior Dark Luxury Architecture"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                isDark ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </>
        )}

        {/* Dynamic Architectural Overlays: Keep Center 45% readable for hero text */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            isDark
              ? 'bg-gradient-to-r from-forest-950/90 via-forest-950/60 to-transparent'
              : 'bg-gradient-to-r from-[#FAF7F2]/90 via-[#FAF7F2]/60 to-transparent'
          }`}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            isDark
              ? 'bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40'
              : 'bg-gradient-to-t from-[#FAF7F2]/80 via-transparent to-[#FAF7F2]/30'
          }`}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl sm:max-w-2xl">
          {/* Top Luxury Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-semibold tracking-[0.18em] uppercase backdrop-blur-md mb-5 transition-colors ${
              isDark
                ? 'bg-forest-900/80 border-copper-500/30 text-copper-300'
                : 'bg-white/85 border-copper-500/40 text-copper-700 shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-copper-400 animate-pulse" />
            <span>{heroData.badge}</span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12] transition-colors ${
              isDark ? 'text-cream-50' : 'text-forest-950'
            }`}
          >
            {heroData.titlePrefix} <br />
            <span className={`italic font-normal ${isDark ? 'text-copper-400' : 'text-copper-600'}`}>
              {heroData.titleHighlight}
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-4 sm:mt-5 text-sm sm:text-base font-normal leading-relaxed max-w-lg transition-colors ${
              isDark ? 'text-cream-200/90' : 'text-charcoal-700'
            }`}
          >
            {heroData.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              to={heroData.primaryCtaLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-copper-500 to-copper-600 hover:from-copper-600 hover:to-copper-700 text-white font-semibold text-xs tracking-wider uppercase shadow-glow-copper transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
            >
              <span>{heroData.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {heroData.secondaryCtaText && (
              <Link
                to={heroData.secondaryCtaLink}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full border font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ${
                  isDark
                    ? 'bg-cream-100/10 hover:bg-cream-100/15 border-cream-100/20 text-cream-100'
                    : 'bg-forest-950/5 hover:bg-forest-950/10 border-forest-950/15 text-forest-950'
                }`}
              >
                <span>{heroData.secondaryCtaText}</span>
              </Link>
            )}
          </motion.div>

          {/* Client Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {avatars.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Happy homeowner ${idx + 1}`}
                  className={`w-9 h-9 rounded-full border-2 object-cover ${
                    isDark ? 'border-forest-950' : 'border-white'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <div className={`text-xs font-medium ${isDark ? 'text-cream-100' : 'text-forest-950'}`}>
              <span className="font-bold block">500+ Happy Clients</span>
              <span className={`text-[11px] font-semibold ${isDark ? 'text-copper-300' : 'text-copper-600'}`}>
                in Rajasthan
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none transition-colors ${
          isDark ? 'text-cream-200/60' : 'text-charcoal-500'
        }`}
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-copper-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
