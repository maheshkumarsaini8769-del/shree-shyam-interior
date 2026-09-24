import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Copy, Check, Gift, ArrowRight } from 'lucide-react';
import { apiService, FestivalCampaignConfig, FESTIVAL_PRESETS } from '../../services/apiService';

export const FestiveEffects: React.FC = () => {
  const [config, setConfig] = useState<FestivalCampaignConfig | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initial fetch
    apiService.getFestivalCampaign().then((data) => {
      setConfig(data);
      checkModalVisibility(data);
    });

    // Real-time listener for festival change from Admin Panel
    const handleFestivalChange = (e: CustomEvent<FestivalCampaignConfig>) => {
      if (e.detail) {
        setConfig(e.detail);
        checkModalVisibility(e.detail);
      }
    };

    window.addEventListener('ssi_festival_changed' as any, handleFestivalChange);
    return () => {
      window.removeEventListener('ssi_festival_changed' as any, handleFestivalChange);
    };
  }, []);

  const checkModalVisibility = (cfg: FestivalCampaignConfig) => {
    if (
      cfg.activeFestival !== 'normal' &&
      cfg.showGreetingModal &&
      !sessionStorage.getItem(`ssi_festive_modal_dismissed_${cfg.activeFestival}`)
    ) {
      // Delay modal slightly so user first sees the site smoothly
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  };

  const handleDismissModal = () => {
    setShowModal(false);
    if (config) {
      sessionStorage.setItem(`ssi_festive_modal_dismissed_${config.activeFestival}`, 'true');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!config || config.activeFestival === 'normal') {
    return null;
  }

  const { activeFestival, enableAmbientEffects } = config;

  return (
    <>
      {/* 1. AMBIENT VISUAL EFFECTS (NON-INTRUSIVE & LIGHTWEIGHT) */}
      {enableAmbientEffects && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
          {/* DIWALI: Golden Warm Glows & Floating Sparkles */}
          {activeFestival === 'diwali' && (
            <>
              {/* Bottom Left Diya Glow */}
              <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-amber-500/15 blur-3xl animate-pulse pointer-events-none" />
              {/* Bottom Right Diya Glow */}
              <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-orange-500/15 blur-3xl animate-pulse pointer-events-none" />

              {/* Floating Diya Icons at corner edges */}
              <div className="hidden sm:flex fixed bottom-24 left-4 z-40 items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 shadow-glow-copper text-xs font-serif pointer-events-auto transition-transform hover:scale-105">
                <span className="text-base animate-bounce">🪔</span>
                <span className="font-bold text-[11px] tracking-wide">Shubh Deepawali</span>
              </div>

              {/* Floating golden sparkle dots */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[15%] left-[8%] w-1.5 h-1.5 rounded-full bg-amber-300 blur-[1px] animate-ping duration-1000" />
                <div className="absolute top-[28%] right-[10%] w-2 h-2 rounded-full bg-yellow-400 blur-[1px] animate-pulse duration-700" />
                <div className="absolute top-[60%] left-[14%] w-1.5 h-1.5 rounded-full bg-amber-400 blur-[1px] animate-ping duration-1000" />
                <div className="absolute top-[75%] right-[12%] w-2 h-2 rounded-full bg-yellow-300 blur-[1px] animate-pulse duration-700" />
              </div>
            </>
          )}

          {/* HOLI: Organic Gulal Pastel Color Accents */}
          {activeFestival === 'holi' && (
            <>
              <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 -right-12 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

              <div className="hidden sm:flex fixed bottom-24 left-4 z-40 items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-md border border-pink-400/40 text-pink-200 shadow-card text-xs pointer-events-auto transition-transform hover:scale-105">
                <span className="text-base animate-bounce">🎨</span>
                <span className="font-bold text-[11px]">Happy Holi Festival</span>
              </div>
            </>
          )}

          {/* NEW YEAR: Confetti & Starlight */}
          {activeFestival === 'newyear' && (
            <>
              <div className="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
              <div className="hidden sm:flex fixed bottom-24 left-4 z-40 items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-sky-400/40 text-sky-200 shadow-card text-xs pointer-events-auto">
                <span className="text-base">🎉</span>
                <span className="font-bold text-[11px]">Happy New Year</span>
              </div>
            </>
          )}

          {/* NAVRATRI & DUSSEHRA */}
          {activeFestival === 'navratri' && (
            <div className="hidden sm:flex fixed bottom-24 left-4 z-40 items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/80 backdrop-blur-md border border-amber-500/40 text-amber-200 shadow-card text-xs pointer-events-auto">
              <span className="text-base">✨</span>
              <span className="font-bold text-[11px]">Jai Mata Di • Shubh Navratri</span>
            </div>
          )}

          {/* PATRIOT (Independence / Republic Day) */}
          {activeFestival === 'patriot' && (
            <div className="hidden sm:flex fixed bottom-24 left-4 z-40 items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-orange-500/40 text-cream-100 shadow-card text-xs pointer-events-auto">
              <span className="text-base">🇮🇳</span>
              <span className="font-bold text-[11px]">Swatantrata Utsav</span>
            </div>
          )}
        </div>
      )}

      {/* 2. FESTIVE GREETING MODAL (POPUP) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#121720] border-2 border-amber-500/40 dark:border-amber-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden text-center space-y-5 animate-scale-up">
            {/* Background Festive Subtle Glow */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
            />

            {/* Close Button */}
            <button
              onClick={handleDismissModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-cream-100 dark:bg-[#1A212C] text-charcoal-400 hover:text-charcoal-800 dark:hover:text-cream-50 transition-colors cursor-pointer"
              title="Close Greeting"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Festive Icon / Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{config.badgeText}</span>
            </div>

            {/* Greeting Header */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 leading-tight">
                {config.greetingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-cream-200/80 mt-2 leading-relaxed">
                {config.greetingSubtitle}
              </p>
            </div>

            {/* Coupon Card (if code provided) */}
            {config.couponCode && (
              <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] border border-dashed border-amber-500/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal-500 dark:text-cream-200/70 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-500" />
                    Festive Discount Voucher:
                  </span>
                  {config.discountPercentage > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold text-[10px]">
                      FLAT {config.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10">
                  <span className="font-mono font-black text-base text-forest-950 dark:text-amber-400 tracking-wider">
                    {config.couponCode}
                  </span>
                  <button
                    onClick={() => handleCopyCode(config.couponCode)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/site-visit"
                onClick={handleDismissModal}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider text-center shadow-glow-copper transition-all active:scale-95"
              >
                Book Festive Visit
              </Link>
              <Link
                to="/quote"
                onClick={handleDismissModal}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-700 dark:text-cream-100 hover:bg-cream-200 text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
              >
                <span>Calculate Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
