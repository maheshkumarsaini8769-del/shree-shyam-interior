import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, Palette, Layers } from 'lucide-react';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';

export const AIDesignSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-forest-950 text-cream-100 relative overflow-hidden">
      {/* Decorative ambient radial glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-copper-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Value Props & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-copper-400" />
              <span>AI Spatial Visualizer</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream-50 leading-tight">
              Visualize <br />
              Your <span className="text-copper-400 italic font-normal">Dream Space</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-200/90 font-light leading-relaxed">
              Upload your raw room photo or pick a layout. Watch our architectural engine re-imagine your space with CenturyPly marine woodwork, Häfele concealed fittings, and 3000K warm profile illumination in real-time.
            </p>

            {/* Feature Storytelling Steps */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-3 rounded-xl bg-forest-900/70 border border-cream-200/10 flex items-start gap-2.5">
                <Sliders className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-cream-100">Step 01: Room Type</div>
                  <div className="text-[11px] text-charcoal-300">Living, Bed, Kitchen</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/70 border border-cream-200/10 flex items-start gap-2.5">
                <Palette className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-cream-100">Step 02: Mood Style</div>
                  <div className="text-[11px] text-charcoal-300">Modern, Japandi, Royal</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/70 border border-cream-200/10 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-cream-100">Step 03: Materials</div>
                  <div className="text-[11px] text-charcoal-300">Verified Brand Specs</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-forest-900/70 border border-cream-200/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-copper-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-cream-100">Step 04: Budget Match</div>
                  <div className="text-[11px] text-charcoal-300">Itemized Cost Estimate</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/design-ai"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-sm tracking-wide shadow-glow-copper transition-all hover:scale-105 active:scale-95 group w-full sm:w-auto"
              >
                <span>Start Designing Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Before/After Comparison */}
          <div className="lg:col-span-7">
            <div className="relative p-2 sm:p-3 rounded-3xl bg-forest-900/60 border border-copper-500/30 shadow-elevated">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
                afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
                beforeLabel="Before: Empty Space"
                afterLabel="After: Shree Shyam Luxury"
                className="h-[340px] sm:h-[440px] md:h-[480px] w-full"
              />
              <div className="flex items-center justify-between px-3 py-2 text-xs text-charcoal-300">
                <span>Drag the center circle left or right to compare transformation</span>
                <span className="text-copper-400 font-semibold">100% Real Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
