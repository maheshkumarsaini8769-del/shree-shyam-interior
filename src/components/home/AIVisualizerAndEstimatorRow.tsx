import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, X, Sparkles, Download } from 'lucide-react';
import { PropertyType, DesignStyle } from '../../types/estimate';
import { calculateEstimate, formatINR } from '../../services/estimateService';
import { useToast } from '../../context/ToastContext';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

export const AIVisualizerAndEstimatorRow: React.FC = () => {
  const { showToast } = useToast();

  // Cost Estimator state
  const [propertyType, setPropertyType] = useState<PropertyType>('3BHK');
  const [areaSqFt, setAreaSqFt] = useState<number>(1450);
  const [designStyle, setDesignStyle] = useState<DesignStyle>('Contemporary Indian Luxury');
  const [showResultModal, setShowResultModal] = useState(false);

  const breakdown = calculateEstimate({
    propertyType,
    roomType: 'Full Home',
    designStyle,
    qualityTier: 'Premium Luxury',
    areaSqFt
  });

  return (
    <section className="py-12 sm:py-16 bg-cream-100 dark:bg-forest-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Visualize Your Dream Space (Left Card) */}
          <div className="lg:col-span-7 bg-white dark:bg-forest-900 text-forest-950 dark:text-cream-100 rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-copper-500/30 shadow-card flex flex-col justify-between overflow-hidden relative transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Text, Upload Button & Start Designing CTA */}
              <div className="md:col-span-5 space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 leading-tight">
                  Visualize <br />
                  Your Dream Space
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/80 font-light leading-relaxed">
                  Try our AI room designer and see your space in real-time.
                </p>

                {/* Start Designing CTA matching reference UI */}
                <div className="pt-2">
                  <Link
                    to="/design-ai"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B57731] hover:bg-[#9E6526] text-white font-semibold text-xs tracking-wider uppercase shadow-glow-copper transition-all active:scale-95 group"
                  >
                    <span>Start Designing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Before/After Bedroom Slider */}
              <div className="md:col-span-7">
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                  afterImage="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
                  beforeLabel="Before"
                  afterLabel="After"
                  badgePosition="bottom"
                  className="h-60 sm:h-72 w-full border border-cream-200 dark:border-cream-200/10 shadow-card"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Get Instant Cost Estimate (Right Card - Simple, Live & Clean) */}
          <div className="lg:col-span-5 bg-white dark:bg-forest-900 text-forest-950 dark:text-cream-100 rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-copper-500/30 shadow-card flex flex-col justify-between transition-colors duration-300">
            <div>
              {/* Header with Golden Calculator Icon */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-copper-500/15 dark:bg-[#C68A43]/20 border border-copper-500/30 flex items-center justify-center text-[#B57731] dark:text-copper-400 shrink-0">
                  <Calculator className="w-5 h-5 text-[#B57731] dark:text-[#C68A43]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 dark:text-cream-50 leading-tight">
                    Instant Cost Estimate
                  </h3>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-300">
                    Transparent pricing based on current Rajasthan material rates
                  </p>
                </div>
              </div>

              {/* Step 1: Quick BHK Chips */}
              <div className="space-y-2 mb-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-charcoal-600 dark:text-cream-300">
                  Select Configuration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['1BHK', '2BHK', '3BHK', '4BHK / Villa'] as PropertyType[]).map((type) => {
                    const label = type === '4BHK / Villa' ? '4 BHK+' : type;
                    const isSelected = propertyType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setPropertyType(type);
                          if (type === '1BHK') setAreaSqFt(650);
                          else if (type === '2BHK') setAreaSqFt(1050);
                          else if (type === '3BHK') setAreaSqFt(1450);
                          else if (type === '4BHK / Villa') setAreaSqFt(2200);
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border ${
                          isSelected
                            ? 'bg-[#B57731] text-white border-[#B57731] shadow-glow-copper scale-[1.02]'
                            : 'bg-cream-50 dark:bg-forest-800 text-forest-950 dark:text-cream-100 border-cream-200 dark:border-cream-200/10 hover:border-copper-400/50'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Carpet Area Slider */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal-600 dark:text-cream-300">Carpet Area</span>
                  <span className="font-mono font-bold text-copper-600 dark:text-copper-400 bg-copper-500/10 dark:bg-copper-400/15 px-2 py-0.5 rounded-md">
                    {areaSqFt.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="3500"
                  step="50"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="w-full h-2 bg-cream-200 dark:bg-forest-800 rounded-lg appearance-none cursor-pointer accent-[#B57731]"
                />
              </div>

              {/* Live Instant Cost Highlight Box */}
              <div className="p-4 rounded-2xl bg-cream-50/90 dark:bg-forest-800/80 border border-copper-500/30 text-center space-y-1 mb-4 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal-500 dark:text-cream-300 block">
                  Estimated Turnkey Budget
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#B57731] dark:text-copper-400">
                  {formatINR(breakdown.grandTotal)}
                </div>
                <p className="text-[11px] text-charcoal-500 dark:text-cream-200/80">
                  ≈ {formatINR(breakdown.ratePerSqFt)} / sq ft • Material & Carpentry Included
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/site-visit"
                className="w-full py-3 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book Free Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setShowResultModal(true)}
                className="w-full text-center text-xs text-copper-600 dark:text-copper-400 hover:underline font-semibold py-1 transition-colors"
              >
                View Itemized Bill & GST Breakdown →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Breakdown Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 z-[10000] bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-forest-900 text-forest-950 dark:text-cream-100 border border-cream-200 dark:border-copper-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-cream-100 dark:bg-white/10 hover:bg-cream-200 text-forest-950 dark:text-cream-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-copper-600 dark:text-copper-400">
                Turnkey Cost Estimation
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50 mt-1">
                {propertyType} • {areaSqFt} sq ft
              </h3>
              <div className="font-serif font-bold text-3xl text-copper-600 dark:text-copper-400 mt-2">
                {formatINR(breakdown.grandTotal)}
              </div>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                ≈ {formatINR(breakdown.ratePerSqFt)} / sq ft • {breakdown.timelineWeeks} est. execution
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-cream-200 dark:border-cream-200/10 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-600 dark:text-cream-200">Certified Materials (Century, Häfele):</span>
                <span className="font-mono font-bold text-forest-950 dark:text-cream-50">{formatINR(breakdown.materialCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600 dark:text-cream-200">Labour & Master Carpentry:</span>
                <span className="font-mono font-bold text-forest-950 dark:text-cream-50">{formatINR(breakdown.labourCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600 dark:text-cream-200">3D Architecture & Site Supervision:</span>
                <span className="font-mono font-bold text-forest-950 dark:text-cream-50">{formatINR(breakdown.designFee)}</span>
              </div>
              <div className="flex justify-between text-charcoal-400">
                <span>GST (18% Applicable):</span>
                <span className="font-mono">{formatINR(breakdown.gstAmount)}</span>
              </div>
            </div>

            <div className="mt-6 pt-2 space-y-2">
              <Link
                to="/site-visit"
                className="w-full py-3 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-glow-copper"
              >
                <span>Book Free Site Visit to Lock Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-cream-100 dark:bg-forest-900 border border-cream-200 dark:border-cream-200/10 text-forest-950 dark:text-cream-200 hover:bg-cream-200 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-copper-600" />
                <span>Print / Download Estimate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
