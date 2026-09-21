import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, PhoneCall, MessageSquare } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-forest-900 text-cream-100 relative overflow-hidden border-t border-cream-200/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-copper-400" />
          <span>Shree Shyam Interior • Sikar</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Turn Your Dream House Into <br />
          <span className="text-copper-400 italic font-normal">A Lasting Masterpiece?</span>
        </h2>

        <p className="text-base sm:text-lg text-cream-200/90 max-w-xl mx-auto font-light">
          "Crafting Homes, From the Heart!" — Speak directly with our lead interior architects and schedule your personalized survey today.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <Link
            to="/site-visit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all hover:scale-105 active:scale-95 group"
          >
            <span>Book Free Site Visit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://wa.me/919876543210?text=Hi%20Shree%20Shyam%20Interior,%20I%20would%20like%20to%20consult%20for%20my%20interior%20work."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 border border-cream-200/20 font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
