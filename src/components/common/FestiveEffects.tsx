import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Copy, Check, Gift, ArrowRight, Flame } from 'lucide-react';
import { apiService, FestivalCampaignConfig } from '../../services/apiService';

export const FestiveEffects: React.FC = () => {
  const [config, setConfig] = useState<FestivalCampaignConfig | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDiyaPopped, setIsDiyaPopped] = useState(false);

  useEffect(() => {
    // Initial fetch
    apiService.getFestivalCampaign().then((data) => {
      setConfig(data);
      applyThemeAttribute(data);
      checkModalVisibility(data);
    });

    // Real-time listener for festival change from Admin Panel
    const handleFestivalChange = (e: CustomEvent<FestivalCampaignConfig>) => {
      if (e.detail) {
        setConfig(e.detail);
        applyThemeAttribute(e.detail);
        checkModalVisibility(e.detail);
      }
    };

    // ESC key listener to dismiss modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('ssi_festival_changed' as any, handleFestivalChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('ssi_festival_changed' as any, handleFestivalChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const applyThemeAttribute = (cfg: FestivalCampaignConfig | null) => {
    if (cfg && cfg.activeFestival && cfg.activeFestival !== 'normal') {
      document.documentElement.setAttribute('data-festival-theme', cfg.activeFestival);
      document.documentElement.style.setProperty('--festive-accent', cfg.highlightColor || '#F59E0B');
    } else {
      document.documentElement.removeAttribute('data-festival-theme');
      document.documentElement.style.removeProperty('--festive-accent');
    }
  };

  const checkModalVisibility = (cfg: FestivalCampaignConfig) => {
    if (
      cfg.activeFestival !== 'normal' &&
      cfg.showGreetingModal &&
      !sessionStorage.getItem(`ssi_festive_modal_dismissed_${cfg.activeFestival}`)
    ) {
      // Delay modal slightly so user first sees the site smoothly
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1200);
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
      {/* ========================================================================= */}
      {/* 1. IN-WEBSITE FESTIVE VISUAL DECORATIONS (TRADITIONAL TORAN, DIYAS, COLORS) */}
      {/* ========================================================================= */}
      {enableAmbientEffects && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
          {/* DIWALI: Traditional Hanging Toran Garland & Flickering Brass Diyas */}
          {activeFestival === 'diwali' && (
            <>
              {/* Top Traditional Hanging Toran (Marigold Flowers & Clay Diyas) */}
              <div className="absolute top-[64px] sm:top-[72px] left-0 right-0 z-40 pointer-events-none overflow-hidden h-7 sm:h-9 flex justify-around opacity-95">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center animate-festive-float" style={{ animationDelay: `${i * 0.25}s` }}>
                    {/* Hanging String */}
                    <div className="w-[1px] h-2 sm:h-3 bg-amber-600/60" />
                    {/* Marigold Flower Ball / Diya */}
                    {i % 2 === 0 ? (
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-sm border border-amber-300/40" />
                    ) : (
                      <div className="relative flex flex-col items-center">
                        {/* Flickering Flame */}
                        <div className="w-1.5 h-2 rounded-full bg-yellow-300 animate-flame" />
                        {/* Clay Base */}
                        <div className="w-2.5 h-1.5 rounded-b-full bg-amber-800 border-t border-amber-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Glowing Ambience */}
              <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-amber-500/20 blur-3xl animate-pulse pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-orange-500/20 blur-3xl animate-pulse pointer-events-none" />

              {/* Floating Golden Sparks Drifting Up */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[18%] left-[7%] w-1.5 h-1.5 rounded-full bg-amber-300 blur-[0.5px] animate-ping duration-1000" />
                <div className="absolute top-[32%] right-[8%] w-2 h-2 rounded-full bg-yellow-400 blur-[0.5px] animate-pulse duration-700" />
                <div className="absolute top-[55%] left-[12%] w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.5px] animate-ping duration-1000" />
                <div className="absolute top-[78%] right-[14%] w-2 h-2 rounded-full bg-yellow-300 blur-[0.5px] animate-pulse duration-700" />
              </div>

              {/* Bottom Left Interactive Floating Diya Widget */}
              <div className="fixed bottom-20 lg:bottom-8 left-4 sm:left-6 z-40 pointer-events-auto">
                <div
                  onClick={() => setIsDiyaPopped(!isDiyaPopped)}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#140D07]/90 backdrop-blur-md border border-amber-500/50 text-amber-300 shadow-glow-copper cursor-pointer hover:scale-105 active:scale-95 transition-all group select-none"
                  title="Click to view Deepawali Offer"
                >
                  {/* Flickering Diya Icon */}
                  <div className="relative flex flex-col items-center justify-center w-6 h-6">
                    <span className="text-lg leading-none animate-flame">🪔</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-xs text-amber-300 leading-none">
                      Shubh Deepawali
                    </span>
                    <span className="text-[10px] text-amber-200/70 font-mono mt-0.5">
                      {config.couponCode ? `Code: ${config.couponCode}` : 'Festive Deals'}
                    </span>
                  </div>
                </div>

                {/* Expanded Micro-card on click */}
                {isDiyaPopped && (
                  <div className="absolute bottom-14 left-0 w-64 p-4 rounded-2xl bg-white dark:bg-[#151D28] border-2 border-amber-500 shadow-2xl text-left space-y-2.5 animate-scale-up z-50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-amber-600 dark:text-amber-400">
                        🪔 Diwali Special Offer
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDiyaPopped(false);
                        }}
                        className="p-1 rounded-md text-charcoal-400 hover:bg-cream-100 dark:hover:bg-[#1A212C]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-cream-200/80 leading-snug">
                      Flat {config.discountPercentage}% OFF on Turnkey Interiors + Free 3D Walkthrough!
                    </p>
                    {config.couponCode && (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                        <span className="font-mono font-bold text-xs text-amber-700 dark:text-amber-400">
                          {config.couponCode}
                        </span>
                        <button
                          onClick={() => handleCopyCode(config.couponCode)}
                          className="px-2 py-1 rounded bg-amber-500 text-white text-[10px] font-bold"
                        >
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    )}
                    <Link
                      to="/site-visit"
                      onClick={() => setIsDiyaPopped(false)}
                      className="block w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold text-center uppercase tracking-wider transition-colors"
                    >
                      Book Site Visit →
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {/* HOLI: Vibrant Gulal Splashes & Color Bursts */}
          {activeFestival === 'holi' && (
            <>
              {/* Top and corner organic gulal powder glows */}
              <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-yellow-500/20 blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 -right-12 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/3 -left-12 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              {/* Bottom Left Floating Holi Widget */}
              <div className="fixed bottom-20 lg:bottom-8 left-4 sm:left-6 z-40 pointer-events-auto">
                <div
                  onClick={() => setIsDiyaPopped(!isDiyaPopped)}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-pink-950/90 via-purple-950/90 to-pink-950/90 backdrop-blur-md border border-pink-500/50 text-pink-200 shadow-card cursor-pointer hover:scale-105 active:scale-95 transition-all group select-none"
                >
                  <span className="text-xl animate-bounce">🎨</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-pink-300 leading-none">
                      Happy Holi Utsav!
                    </span>
                    <span className="text-[10px] text-pink-200/70 font-mono mt-0.5">
                      {config.couponCode ? `Code: ${config.couponCode}` : 'Color Offers'}
                    </span>
                  </div>
                </div>

                {isDiyaPopped && (
                  <div className="absolute bottom-14 left-0 w-64 p-4 rounded-2xl bg-white dark:bg-[#151D28] border-2 border-pink-500 shadow-2xl text-left space-y-2.5 animate-scale-up z-50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-pink-600 dark:text-pink-400">
                        🎨 Rangon Ka Tyohar Special
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDiyaPopped(false);
                        }}
                        className="p-1 rounded-md text-charcoal-400 hover:bg-cream-100 dark:hover:bg-[#1A212C]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-cream-200/80 leading-snug">
                      Complimentary German Soft-Close Hardware Upgrade on Modular Kitchens!
                    </p>
                    {config.couponCode && (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-pink-500/10 border border-pink-500/30">
                        <span className="font-mono font-bold text-xs text-pink-700 dark:text-pink-400">
                          {config.couponCode}
                        </span>
                        <button
                          onClick={() => handleCopyCode(config.couponCode)}
                          className="px-2 py-1 rounded bg-pink-500 text-white text-[10px] font-bold"
                        >
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    )}
                    <Link
                      to="/quote"
                      onClick={() => setIsDiyaPopped(false)}
                      className="block w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-bold text-center uppercase tracking-wider transition-colors"
                    >
                      Calculate Cost →
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {/* NEW YEAR: Confetti & Starlight */}
          {activeFestival === 'newyear' && (
            <>
              <div className="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
              <div className="fixed bottom-20 lg:bottom-8 left-4 sm:left-6 z-40 pointer-events-auto">
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-sky-400/40 text-sky-200 shadow-card text-xs">
                  <span className="text-lg">🎉</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-sky-300">New Year 2026</span>
                    <span className="text-[10px] text-sky-200/70 font-mono">Special Vouchers</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* NAVRATRI & DUSSEHRA */}
          {activeFestival === 'navratri' && (
            <div className="fixed bottom-20 lg:bottom-8 left-4 sm:left-6 z-40 pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-red-950/90 backdrop-blur-md border border-amber-500/40 text-amber-200 shadow-card text-xs">
                <span className="text-lg">✨</span>
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-amber-300">Shubh Navratri</span>
                  <span className="text-[10px] text-amber-200/70">Griha Pravesh Offers</span>
                </div>
              </div>
            </div>
          )}

          {/* PATRIOT (Independence / Republic Day) */}
          {activeFestival === 'patriot' && (
            <div className="fixed bottom-20 lg:bottom-8 left-4 sm:left-6 z-40 pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-950/90 backdrop-blur-md border border-orange-500/40 text-cream-100 shadow-card text-xs">
                <span className="text-lg">🇮🇳</span>
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-orange-300">Made in India</span>
                  <span className="text-[10px] text-cream-200/70">Factory Direct Ply</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FESTIVE GREETING MODAL (POPUP) - FULLY OPTIMIZED FOR MOBILE SCREENS    */}
      {/* ========================================================================= */}
      {showModal && (
        <div
          onClick={(e) => {
            // Dismiss if clicking outside the modal box
            if (e.target === e.currentTarget) {
              handleDismissModal();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/80 backdrop-blur-sm animate-fade-in touch-manipulation"
        >
          <div
            className="relative w-full max-w-md max-h-[88vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121720] border-2 shadow-2xl p-5 sm:p-7 text-center space-y-4 animate-scale-up my-auto select-none"
            style={{ borderColor: config.highlightColor || '#F59E0B' }}
          >
            {/* Background Festive Ambient Glow */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
            />

            {/* HIGHLY VISIBLE MOBILE-FRIENDLY CLOSE BUTTON */}
            <button
              type="button"
              onClick={handleDismissModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-200 dark:bg-[#252E3E] text-charcoal-800 dark:text-cream-50 hover:bg-cream-300 dark:hover:bg-[#354359] shadow-md border border-cream-300 dark:border-white/10 transition-transform active:scale-90 cursor-pointer touch-manipulation"
              title="Close Greeting (बंद करें)"
              aria-label="Close Greeting"
            >
              <X className="w-5 h-5 text-charcoal-900 dark:text-cream-50" />
            </button>

            {/* Festive Icon / Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black mt-1"
              style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{config.badgeText || 'FESTIVE OFFER'}</span>
            </div>

            {/* Greeting Header */}
            <div className="pt-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 leading-tight">
                {config.greetingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-cream-200/80 mt-2 leading-relaxed px-2">
                {config.greetingSubtitle}
              </p>
            </div>

            {/* Coupon Card (if code provided) */}
            {config.couponCode && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] border border-dashed border-amber-500/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal-500 dark:text-cream-200/70 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-500" />
                    Festive Discount Voucher:
                  </span>
                  {config.discountPercentage > 0 && (
                    <span
                      className="px-2 py-0.5 rounded-md text-black font-black text-[10px]"
                      style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
                    >
                      FLAT {config.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10">
                  <span className="font-mono font-black text-base text-forest-950 dark:text-amber-400 tracking-wider">
                    {config.couponCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(config.couponCode)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
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
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
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

            {/* Explicit Mobile Skip / Close Option */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleDismissModal}
                className="text-xs text-charcoal-500 dark:text-cream-300/70 hover:text-charcoal-800 dark:hover:text-cream-50 underline decoration-dotted transition-colors cursor-pointer py-1 px-3"
              >
                ✕ Skip & Explore Website (वेबसाइट देखें)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
