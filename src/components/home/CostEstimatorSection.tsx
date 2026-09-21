import React, { useState, useMemo } from 'react';
import { Calculator, Download, ArrowRight, Check, Sparkles, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyType, RoomType, DesignStyle, QualityTier, EstimateInputs } from '../../types/estimate';
import { calculateEstimate, formatINR } from '../../services/estimateService';
import { useToast } from '../../context/ToastContext';

export const CostEstimatorSection: React.FC = () => {
  const { showToast } = useToast();

  const [inputs, setInputs] = useState<EstimateInputs>({
    propertyType: '3BHK',
    roomType: 'Full Home',
    designStyle: 'Contemporary Indian Luxury',
    qualityTier: 'Premium Luxury',
    areaSqFt: 1450
  });

  const breakdown = useMemo(() => calculateEstimate(inputs), [inputs]);

  const propertyTypes: PropertyType[] = ['1BHK', '2BHK', '3BHK', '4BHK / Villa', 'Office / Studio', 'Retail / Commercial'];
  const roomTypes: RoomType[] = ['Full Home', 'Living Room', 'Modular Kitchen', 'Master Bedroom', 'False Ceiling & Lighting'];
  const designStyles: DesignStyle[] = ['Contemporary Indian Luxury', 'Modern Minimalist', 'Warm Japandi', 'Royal Traditional'];
  const qualityTiers: QualityTier[] = ['Essential', 'Premium Luxury', 'Ultra Bespoke'];

  const handleDownloadEstimate = () => {
    window.print();
    showToast('Estimate summary prepared for print / PDF download', 'success');
  };

  return (
    <section className="py-20 sm:py-24 bg-forest-900 text-cream-100 relative overflow-hidden border-t border-cream-200/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5 text-copper-400" />
            <span>Transparent Pricing Engine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 tracking-tight">
            Get Instant <span className="text-copper-400 italic font-normal">Cost Estimate</span>
          </h2>
          <p className="text-sm sm:text-base text-cream-200/80 mt-2">
            Calculate your turnkey home or office budget in seconds based on current Rajasthan material & labour rates.
          </p>
        </div>

        {/* Modular Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-forest-950/80 border border-copper-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-elevated">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Property Type Selection */}
            <div>
              <label className="block text-xs uppercase font-bold text-copper-400 tracking-wider mb-2">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {propertyTypes.map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => setInputs((prev) => ({ ...prev, propertyType: pt }))}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      inputs.propertyType === pt
                        ? 'bg-copper-500 text-white border-copper-400 shadow-glow-copper'
                        : 'bg-forest-900/80 text-cream-200 border-cream-200/10 hover:border-copper-400/40'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope / Room Type */}
            <div>
              <label className="block text-xs uppercase font-bold text-copper-400 tracking-wider mb-2">
                2. Scope of Interior
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {roomTypes.map((rt) => (
                  <button
                    key={rt}
                    type="button"
                    onClick={() => setInputs((prev) => ({ ...prev, roomType: rt }))}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      inputs.roomType === rt
                        ? 'bg-copper-500 text-white border-copper-400 shadow-glow-copper'
                        : 'bg-forest-900/80 text-cream-200 border-cream-200/10 hover:border-copper-400/40'
                    }`}
                  >
                    {rt}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase font-bold text-copper-400 tracking-wider">
                  3. Carpet Area (Square Feet)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="150"
                    max="10000"
                    step="50"
                    value={inputs.areaSqFt}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        areaSqFt: Math.max(100, Number(e.target.value) || 0)
                      }))
                    }
                    className="w-24 bg-forest-900 border border-copper-500/40 rounded-lg px-2 py-1 text-right text-sm font-mono text-cream-50 font-bold focus:outline-none focus:ring-1 focus:ring-copper-400"
                  />
                  <span className="text-xs text-cream-300 font-medium">sq ft</span>
                </div>
              </div>

              <input
                type="range"
                min="200"
                max="5000"
                step="50"
                value={inputs.areaSqFt}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, areaSqFt: Number(e.target.value) }))
                }
                className="w-full h-2 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-copper-500"
              />
              <div className="flex justify-between text-[11px] text-charcoal-400 mt-1">
                <span>200 sq ft</span>
                <span>2,500 sq ft</span>
                <span>5,000+ sq ft</span>
              </div>
            </div>

            {/* Quality Tier & Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-copper-400 tracking-wider mb-2">
                  4. Finish Tier
                </label>
                <select
                  value={inputs.qualityTier}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, qualityTier: e.target.value as QualityTier }))
                  }
                  className="w-full bg-forest-900 border border-cream-200/20 text-cream-100 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-copper-400"
                >
                  {qualityTiers.map((tier) => (
                    <option key={tier} value={tier} className="bg-forest-950 text-cream-100">
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-copper-400 tracking-wider mb-2">
                  5. Design Style
                </label>
                <select
                  value={inputs.designStyle}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, designStyle: e.target.value as DesignStyle }))
                  }
                  className="w-full bg-forest-900 border border-cream-200/20 text-cream-100 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-copper-400"
                >
                  {designStyles.map((style) => (
                    <option key={style} value={style} className="bg-forest-950 text-cream-100">
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-forest-900/90 border border-copper-500/40 rounded-2xl p-6 space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-copper-400 font-bold">
                Estimated Project Total
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 mt-1">
                {formatINR(breakdown.grandTotal)}
              </div>
              <div className="text-xs text-charcoal-300 mt-1 flex items-center gap-2">
                <span>≈ {formatINR(breakdown.ratePerSqFt)} / sq ft</span>
                <span>•</span>
                <span className="text-copper-300">{breakdown.timelineWeeks} est. timeline</span>
              </div>
            </div>

            {/* Cost Breakdown Progress Bars */}
            <div className="space-y-3 pt-3 border-t border-cream-200/10 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-cream-200">Certified Materials (Century, Häfele)</span>
                  <span className="font-mono text-cream-50">{formatINR(breakdown.materialCost)}</span>
                </div>
                <div className="w-full bg-forest-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-copper-400 h-full rounded-full w-[58%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-cream-200">Labour & Master Carpentry</span>
                  <span className="font-mono text-cream-50">{formatINR(breakdown.labourCost)}</span>
                </div>
                <div className="w-full bg-forest-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-copper-500 h-full rounded-full w-[27%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-cream-200">3D Architecture & Site Supervision</span>
                  <span className="font-mono text-cream-50">{formatINR(breakdown.designFee)}</span>
                </div>
                <div className="w-full bg-forest-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-copper-600 h-full rounded-full w-[5%]" />
                </div>
              </div>

              <div className="flex justify-between font-medium pt-1 text-charcoal-300">
                <span>GST (18%)</span>
                <span className="font-mono">{formatINR(breakdown.gstAmount)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 space-y-2.5">
              <Link
                to="/site-visit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all"
              >
                <span>Lock Estimate With Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleDownloadEstimate}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 border border-cream-200/20 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4 text-copper-400" />
                <span>Download / Print Estimate PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
