import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/apiService';

export const HeroSection: React.FC = () => {
  const [heroData, setHeroData] = useState({
    badge: "SIKAR'S PREMIER INTERIOR ARCHITECTURE STUDIO",
    titlePrefix: 'Premium Interior Design',
    titleHighlight: 'Services in Sikar',
    subtitle: 'Award-winning turnkey interior designer in Sikar, Rajasthan. Bespoke home interiors, modular kitchens, luxury bedroom suites & commercial spaces with 10-year warranty.',
    primaryCtaText: 'Book Free Site Visit',
    primaryCtaLink: '/site-visit',
    secondaryCtaText: 'Explore 3D Studio',
    secondaryCtaLink: '/design-ai',
    backgroundImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85'
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
          backgroundImage: content.hero.backgroundImage || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85'
        });
      }
    });
  }, []);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  ];

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden bg-forest-950 text-cream-100 pt-20 sm:pt-24 pb-16">
      {/* Background Luxury Interior Photograph */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.9 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={heroData.backgroundImage}
          alt="Shree Shyam Interior Modern Luxury Living Architecture"
          className="w-full h-full object-cover object-center pointer-events-none filter brightness-90"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";
          }}
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40" />
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl sm:max-w-2xl">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs font-bold tracking-[0.25em] text-cream-200/90 uppercase mb-4"
          >
            {heroData.badge}
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12] text-cream-50"
          >
            {heroData.titlePrefix} <br />
            <span className="text-[#C68A43] italic font-normal">{heroData.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base text-cream-200/90 font-light leading-relaxed max-w-lg"
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B57731] hover:bg-[#9E6526] text-white font-semibold text-sm tracking-wide shadow-glow-copper transition-all hover:scale-105 active:scale-95 group"
            >
              <span>{heroData.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {heroData.secondaryCtaText && (
              <Link
                to={heroData.secondaryCtaLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 font-semibold text-sm tracking-wide backdrop-blur-md transition-all hover:scale-105 active:scale-95"
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
                  className="w-9 h-9 rounded-full border-2 border-forest-950 object-cover"
                  loading="eager"
                />
              ))}
            </div>
            <div className="text-xs text-cream-100 font-medium">
              <span className="font-bold block">500+ Happy Clients</span>
              <span className="text-copper-300 text-[11px]">in Rajasthan</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-cream-200/60 pointer-events-none"
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
