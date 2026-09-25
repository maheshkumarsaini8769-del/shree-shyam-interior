import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, Copy, Check, Gift, ArrowRight, Clock, Award, Star } from 'lucide-react';
import { apiService, FestivalCampaignConfig, FestivalType } from '../../services/apiService';

// =========================================================================
// PLEASANT WEB AUDIO CHIME (ZERO EXTERNAL ASSETS / ZERO LATENCY)
// =========================================================================
const playFestiveChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Joyful sparkling chord
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28); // D6
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (_) {}
};

// =========================================================================
// 1. INTERACTIVE PHOOLJHADI / SPARKLER CANVAS TRAIL (60FPS LIGHTWEIGHT)
// =========================================================================
const SparklerCanvas: React.FC<{ festival: string; color: string }> = ({ festival, color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      color: string;
      life: number;
    }

    const particles: Particle[] = [];
    
    // Festival specific curated palettes
    let colors = ['#F59E0B', '#FBBF24', '#FEF08A', '#F97316', '#FFFFFF'];
    if (festival === 'holi') {
      colors = ['#EC4899', '#FBBF24', '#14B8A6', '#8B5CF6', '#F43F5E', '#06B6D4'];
    } else if (festival === 'navratri') {
      colors = ['#EF4444', '#DC2626', '#F59E0B', '#FBBF24', '#F43F5E', '#FFFFFF'];
    } else if (festival === 'newyear') {
      colors = ['#38BDF8', '#60A5FA', '#FBBF24', '#F472B6', '#A78BFA', '#FFFFFF'];
    } else if (festival === 'patriot') {
      colors = ['#FF9933', '#FFFFFF', '#138808', '#2563EB'];
    } else if (color) {
      colors = [color, '#FBBF24', '#FFFFFF'];
    }

    const addSparkles = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.2 + 0.4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          alpha: 1,
          size: Math.random() * 2.2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0.94
        });
      }
    };

    // Celebration burst on click / tap anywhere!
    const addBurst = (x: number, y: number, count = 16) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.8 + 1.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          alpha: 1,
          size: Math.random() * 3 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0.95
        });
      }
    };

    let lastTime = 0;
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      if (now - lastTime < 16) return;
      lastTime = now;

      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      addSparkles(clientX, clientY, 2);
    };

    const handlePointerClick = (e: MouseEvent) => {
      addBurst(e.clientX, e.clientY, 15);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('click', handlePointerClick, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035; // gravity
        p.alpha *= p.life;

        if (p.alpha < 0.05) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('click', handlePointerClick);
    };
  }, [festival, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none"
      style={{ opacity: 0.85 }}
    />
  );
};

export { FestiveCountdown } from './FestiveCountdown';

// =========================================================================
// 2. MAIN FESTIVE EFFECTS COMPONENT
// =========================================================================
export const FestiveEffects: React.FC = () => {
  const [config, setConfig] = useState<FestivalCampaignConfig | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDiyaPopped, setIsDiyaPopped] = useState(false);
  const [isGiftRevealed, setIsGiftRevealed] = useState(false);

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
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
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
    playFestiveChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!config || config.activeFestival === 'normal') {
    return null;
  }

  const { activeFestival, enableAmbientEffects, enableSparklerTrail } = config;

  // Visual metadata per festival
  const getFestivalMeta = (type: FestivalType) => {
    switch (type) {
      case 'diwali':
        return {
          icon: '🪔',
          title: 'Shubh Deepawali',
          badge: 'DIWALI DHAMAKA',
          glowClass: 'bg-amber-500/20',
          gradient: 'from-amber-950/90 via-[#181109]/95 to-amber-950/90',
          borderColor: 'border-amber-500/50',
          textColor: 'text-amber-300'
        };
      case 'holi':
        return {
          icon: '🎨',
          title: 'Happy Holi Utsav',
          badge: 'HOLI DHAMAKA',
          glowClass: 'bg-pink-500/20',
          gradient: 'from-pink-950/90 via-purple-950/90 to-pink-950/90',
          borderColor: 'border-pink-500/50',
          textColor: 'text-pink-300'
        };
      case 'navratri':
        return {
          icon: '✨',
          title: 'Shubh Navratri',
          badge: 'NAVRATRI UTSAV',
          glowClass: 'bg-red-500/20',
          gradient: 'from-red-950/90 via-orange-950/90 to-red-950/90',
          borderColor: 'border-red-500/50',
          textColor: 'text-red-300'
        };
      case 'newyear':
        return {
          icon: '🎉',
          title: 'Happy New Year 2026',
          badge: 'NEW YEAR CELEBRATION',
          glowClass: 'bg-sky-500/20',
          gradient: 'from-sky-950/90 via-slate-950/90 to-sky-950/90',
          borderColor: 'border-sky-400/50',
          textColor: 'text-sky-300'
        };
      case 'patriot':
        return {
          icon: '🇮🇳',
          title: 'Desh Ka Interior',
          badge: 'AZADI SPECIAL',
          glowClass: 'bg-orange-500/20',
          gradient: 'from-orange-950/90 via-slate-950/90 to-green-950/90',
          borderColor: 'border-orange-500/50',
          textColor: 'text-orange-300'
        };
      default:
        return {
          icon: '🎁',
          title: config.festivalName || 'Special Festive Mode',
          badge: 'FESTIVE SPECIAL',
          glowClass: 'bg-amber-500/20',
          gradient: 'from-forest-950/90 via-copper-950/90 to-forest-950/90',
          borderColor: 'border-copper-500/50',
          textColor: 'text-copper-300'
        };
    }
  };

  const meta = getFestivalMeta(activeFestival);

  return (
    <>
      {/* 1. 60FPS PHOOLJHADI SPARKLER & BURST TRAIL */}
      {enableSparklerTrail && (
        <SparklerCanvas festival={activeFestival} color={config.highlightColor} />
      )}

      {/* 2. IN-WEBSITE FESTIVE VISUAL DECORATIONS */}
      {enableAmbientEffects && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
          {/* Top Traditional Hanging Toran Garland (Diwali & Navratri) */}
          {(activeFestival === 'diwali' || activeFestival === 'navratri') && (
            <div className="absolute top-[58px] sm:top-[68px] left-0 right-0 z-40 pointer-events-none overflow-hidden h-7 sm:h-9 flex justify-around opacity-95">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center animate-festive-float"
                  style={{ animationDelay: `${i * 0.22}s` }}
                >
                  <div className="w-[1px] h-2 sm:h-3 bg-amber-600/60" />
                  {i % 2 === 0 ? (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-sm border border-amber-300/40" />
                  ) : (
                    <div className="relative flex flex-col items-center">
                      <div className="w-1.5 h-2 rounded-full bg-yellow-300 animate-flame" />
                      <div className="w-2.5 h-1.5 rounded-b-full bg-amber-800 border-t border-amber-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Festival Specific Ambient Aura Orbs */}
          {activeFestival === 'diwali' && (
            <>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-amber-500/20 blur-3xl animate-pulse pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-orange-500/20 blur-3xl animate-pulse pointer-events-none" />
            </>
          )}

          {activeFestival === 'holi' && (
            <>
              <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-yellow-500/20 blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 -right-12 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/3 -left-12 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
            </>
          )}

          {activeFestival === 'navratri' && (
            <>
              <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-red-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
            </>
          )}

          {activeFestival === 'newyear' && (
            <>
              <div className="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
            </>
          )}

          {activeFestival === 'patriot' && (
            <>
              <div className="absolute -top-10 left-0 w-60 h-60 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 right-0 w-60 h-60 rounded-full bg-green-500/20 blur-3xl pointer-events-none" />
            </>
          )}

          {/* 3. UNIVERSAL INTERACTIVE FLOATING CELEBRATION WIDGET (Bottom-Left) */}
          <div className="fixed bottom-20 lg:bottom-8 left-4 sm:left-6 z-40 pointer-events-auto">
            <div
              onClick={() => {
                setIsDiyaPopped(!isDiyaPopped);
                playFestiveChime();
              }}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r ${meta.gradient} backdrop-blur-md border ${meta.borderColor} ${meta.textColor} shadow-glow-copper cursor-pointer hover:scale-105 active:scale-95 transition-all group select-none`}
              title="Click to view Festive Offer & Secret Gift"
            >
              <span className={`text-xl leading-none ${activeFestival === 'diwali' ? 'animate-flame' : 'animate-bounce'}`}>
                {meta.icon}
              </span>
              <div className="flex flex-col">
                <span className={`font-serif font-bold text-xs ${meta.textColor} leading-none`}>
                  {meta.title}
                </span>
                <span className="text-[10px] opacity-80 font-mono mt-0.5">
                  {config.couponCode ? `Code: ${config.couponCode}` : 'Festive Deals'}
                </span>
              </div>
            </div>

            {/* Expanded Interactive Card on Click */}
            {isDiyaPopped && (
              <div className="absolute bottom-14 left-0 w-72 sm:w-80 p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#151D28] border-2 shadow-2xl text-left space-y-3 animate-scale-up z-50 select-none" style={{ borderColor: config.highlightColor || '#F59E0B' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-forest-950 dark:text-cream-50 flex items-center gap-1.5">
                    <span>{meta.icon}</span>
                    <span>{config.greetingTitle || `${meta.title} Specials`}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDiyaPopped(false);
                    }}
                    className="p-1 rounded-md text-charcoal-400 hover:bg-cream-100 dark:hover:bg-[#1A212C] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-charcoal-600 dark:text-cream-200/80 leading-relaxed">
                  {config.greetingSubtitle || 'Enjoy turnkey interior execution benefits & certified genuine materials.'}
                </p>

                {/* Secret Lucky Gift Box Reveal */}
                {config.showSurpriseGiftBox && (
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 text-xs">
                    {isGiftRevealed ? (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                          🎉 Extra Festive Gift Unlocked!
                        </span>
                        <span className="font-bold text-forest-950 dark:text-cream-50 text-[11px] block">
                          {config.surpriseGiftText || 'Free 3D Architectural VR Walkthrough'}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsGiftRevealed(true);
                          playFestiveChime();
                        }}
                        className="w-full flex items-center justify-between text-left text-amber-700 dark:text-amber-300 font-bold hover:underline cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 text-xs">
                          <Gift className="w-4 h-4 text-amber-500" />
                          Tap to Reveal Secret Bonus Gift!
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                      </button>
                    )}
                  </div>
                )}

                {/* Coupon Code Section */}
                {config.couponCode && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 dark:bg-[#1A212C] border border-dashed border-amber-500/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-semibold text-charcoal-400 dark:text-cream-200/60">
                        Promo Code
                      </span>
                      <span className="font-mono font-black text-sm text-forest-950 dark:text-amber-400 tracking-wider">
                        {config.couponCode}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(config.couponCode)}
                      className="px-3 py-1.5 rounded-lg bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <Link
                    to="/site-visit"
                    onClick={() => setIsDiyaPopped(false)}
                    className="flex-1 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-[11px] font-bold text-center uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Book Visit
                  </Link>
                  <Link
                    to="/quote"
                    onClick={() => setIsDiyaPopped(false)}
                    className="flex-1 py-2.5 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-700 dark:text-cream-100 text-[11px] font-bold text-center uppercase tracking-wider transition-colors"
                  >
                    View Bill
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FESTIVE GREETING MODAL (POPUP) - FULLY OPTIMIZED FOR MOBILE & DESKTOP */}
      {/* ========================================================================= */}
      {showModal && (
        <div
          onClick={(e) => {
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

            {/* Coupon Card */}
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
