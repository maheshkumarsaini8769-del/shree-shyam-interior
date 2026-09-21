import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService, Brand } from '../../services/apiService';

interface BrandColorConfig {
  displayName: string;
  lightClass: string;
  darkClass: string;
  badgeBg: string;
  borderHover: string;
}

const BRAND_STYLE_MAP: Record<string, BrandColorConfig> = {
  'centuryply': {
    displayName: 'CENTURYPLY',
    lightClass: 'text-[#E31E24]',
    darkClass: 'dark:text-[#FF5252]',
    badgeBg: 'bg-[#E31E24]/5 dark:bg-[#E31E24]/10',
    borderHover: 'hover:border-[#E31E24]/60'
  },
  'greenlam': {
    displayName: 'Greenlam',
    lightClass: 'text-[#1B7A41]',
    darkClass: 'dark:text-[#34D399]',
    badgeBg: 'bg-[#1B7A41]/5 dark:bg-[#1B7A41]/10',
    borderHover: 'hover:border-[#1B7A41]/60'
  },
  'greenlam laminates': {
    displayName: 'Greenlam',
    lightClass: 'text-[#1B7A41]',
    darkClass: 'dark:text-[#34D399]',
    badgeBg: 'bg-[#1B7A41]/5 dark:bg-[#1B7A41]/10',
    borderHover: 'hover:border-[#1B7A41]/60'
  },
  'hafele': {
    displayName: 'HÄFELE',
    lightClass: 'text-[#D32F2F]',
    darkClass: 'dark:text-[#FF6B6B]',
    badgeBg: 'bg-[#D32F2F]/5 dark:bg-[#D32F2F]/10',
    borderHover: 'hover:border-[#D32F2F]/60'
  },
  'häfele': {
    displayName: 'HÄFELE',
    lightClass: 'text-[#D32F2F]',
    darkClass: 'dark:text-[#FF6B6B]',
    badgeBg: 'bg-[#D32F2F]/5 dark:bg-[#D32F2F]/10',
    borderHover: 'hover:border-[#D32F2F]/60'
  },
  'hettich': {
    displayName: 'Hettich',
    lightClass: 'text-[#00509B]',
    darkClass: 'dark:text-[#38BDF8]',
    badgeBg: 'bg-[#00509B]/5 dark:bg-[#00509B]/10',
    borderHover: 'hover:border-[#00509B]/60'
  },
  'asian paints': {
    displayName: 'asianpaints',
    lightClass: 'text-[#7C2D92]',
    darkClass: 'dark:text-[#C084FC]',
    badgeBg: 'bg-[#7C2D92]/5 dark:bg-[#7C2D92]/10',
    borderHover: 'hover:border-[#7C2D92]/60'
  },
  'philips': {
    displayName: 'PHILIPS',
    lightClass: 'text-[#0066A1]',
    darkClass: 'dark:text-[#38BDF8]',
    badgeBg: 'bg-[#0066A1]/5 dark:bg-[#0066A1]/10',
    borderHover: 'hover:border-[#0066A1]/60'
  },
  'philips lighting': {
    displayName: 'PHILIPS',
    lightClass: 'text-[#0066A1]',
    darkClass: 'dark:text-[#38BDF8]',
    badgeBg: 'bg-[#0066A1]/5 dark:bg-[#0066A1]/10',
    borderHover: 'hover:border-[#0066A1]/60'
  },
  'saint-gobain': {
    displayName: 'SAINT-GOBAIN',
    lightClass: 'text-[#005A9C]',
    darkClass: 'dark:text-[#60A5FA]',
    badgeBg: 'bg-[#005A9C]/5 dark:bg-[#005A9C]/10',
    borderHover: 'hover:border-[#005A9C]/60'
  },
  'godrej': {
    displayName: 'Godrej',
    lightClass: 'text-[#C41230]',
    darkClass: 'dark:text-[#F87171]',
    badgeBg: 'bg-[#C41230]/5 dark:bg-[#C41230]/10',
    borderHover: 'hover:border-[#C41230]/60'
  },
  'godrej locking solutions': {
    displayName: 'Godrej',
    lightClass: 'text-[#C41230]',
    darkClass: 'dark:text-[#F87171]',
    badgeBg: 'bg-[#C41230]/5 dark:bg-[#C41230]/10',
    borderHover: 'hover:border-[#C41230]/60'
  },
  'merino': {
    displayName: 'merino',
    lightClass: 'text-[#E65100]',
    darkClass: 'dark:text-[#FB923C]',
    badgeBg: 'bg-[#E65100]/5 dark:bg-[#E65100]/10',
    borderHover: 'hover:border-[#E65100]/60'
  },
  'havells': {
    displayName: 'HAVELLS',
    lightClass: 'text-[#ED1C24]',
    darkClass: 'dark:text-[#FF6B6B]',
    badgeBg: 'bg-[#ED1C24]/5 dark:bg-[#ED1C24]/10',
    borderHover: 'hover:border-[#ED1C24]/60'
  },
  'legrand': {
    displayName: 'legrand',
    lightClass: 'text-[#E20613]',
    darkClass: 'dark:text-[#FF6B6B]',
    badgeBg: 'bg-[#E20613]/5 dark:bg-[#E20613]/10',
    borderHover: 'hover:border-[#E20613]/60'
  },
  'fevicol': {
    displayName: 'FEVICOL',
    lightClass: 'text-[#1F3C88]',
    darkClass: 'dark:text-[#60A5FA]',
    badgeBg: 'bg-[#1F3C88]/5 dark:bg-[#1F3C88]/10',
    borderHover: 'hover:border-[#1F3C88]/60'
  },
  '3m': {
    displayName: '3M',
    lightClass: 'text-[#D32F2F]',
    darkClass: 'dark:text-[#FF6B6B]',
    badgeBg: 'bg-[#D32F2F]/5 dark:bg-[#D32F2F]/10',
    borderHover: 'hover:border-[#D32F2F]/60'
  }
};

const fallbackBrands: Brand[] = [
  { id: 'b-centuryply', name: 'CenturyPly', displayName: 'CENTURYPLY', category: 'Plywood', lightClass: 'text-[#E31E24]', darkClass: 'dark:text-[#FF5252]', status: 'Active' },
  { id: 'b-greenlam', name: 'Greenlam', displayName: 'Greenlam', category: 'Laminates', lightClass: 'text-[#1B7A41]', darkClass: 'dark:text-[#34D399]', status: 'Active' },
  { id: 'b-hafele', name: 'Häfele', displayName: 'HÄFELE', category: 'Hardware', lightClass: 'text-[#D32F2F]', darkClass: 'dark:text-[#FF6B6B]', status: 'Active' },
  { id: 'b-hettich', name: 'Hettich', displayName: 'Hettich', category: 'German Fittings', lightClass: 'text-[#00509B]', darkClass: 'dark:text-[#38BDF8]', status: 'Active' },
  { id: 'b-asianpaints', name: 'Asian Paints', displayName: 'asianpaints', category: 'Royale Paints', lightClass: 'text-[#7C2D92]', darkClass: 'dark:text-[#C084FC]', status: 'Active' },
  { id: 'b-philips', name: 'Philips', displayName: 'PHILIPS', category: 'Smart Lighting', lightClass: 'text-[#0066A1]', darkClass: 'dark:text-[#38BDF8]', status: 'Active' },
  { id: 'b-saintgobain', name: 'Saint-Gobain', displayName: 'SAINT-GOBAIN', category: 'Ceiling & Glass', lightClass: 'text-[#005A9C]', darkClass: 'dark:text-[#60A5FA]', status: 'Active' },
  { id: 'b-merino', name: 'Merino', displayName: 'merino', category: 'Surfaces', lightClass: 'text-[#E65100]', darkClass: 'dark:text-[#FB923C]', status: 'Active' }
];

export const BrandMarquee: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>(fallbackBrands);

  useEffect(() => {
    apiService.getBrands().then((data) => {
      if (data && data.length > 0) {
        setBrands(data.filter((b) => b.status === 'Active'));
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-10 sm:py-12 bg-cream-100 dark:bg-forest-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with verified partners badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 tracking-tight">
              Top Brands We Deal In
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/70 mt-1">
              Select any verified brand below to inspect authentic factory-certified materials & hardware
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-copper-500/10 dark:bg-copper-500/20 text-copper-700 dark:text-copper-400 border border-copper-500/30 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-copper-500" />
            <span>100% Genuine Certified Partners</span>
          </div>
        </div>

        {/* Brand Strip */}
        <div className="bg-white dark:bg-forest-900 rounded-3xl p-4 sm:p-6 border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center">
            {brands.map((brand) => {
              const lookupKey = (brand.name || '').toLowerCase().trim();
              const style = BRAND_STYLE_MAP[lookupKey] || {
                displayName: brand.displayName || brand.name,
                lightClass: brand.lightClass || 'text-copper-600',
                darkClass: brand.darkClass || 'dark:text-copper-400',
                badgeBg: 'bg-cream-50/80 dark:bg-forest-950/80',
                borderHover: 'hover:border-copper-500/50'
              };

              const displayTitle = brand.displayName || style.displayName;
              const textLightClass = brand.lightClass || style.lightClass;
              const textDarkClass = brand.darkClass || style.darkClass;
              const cardBg = style.badgeBg || 'bg-cream-50/80 dark:bg-forest-950/80';
              const borderHoverClass = style.borderHover || 'hover:border-copper-500/50';

              return (
                <Link
                  to={`/products?brand=${encodeURIComponent(brand.name)}`}
                  key={brand.id || brand.name}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl ${cardBg} border border-cream-200/80 dark:border-cream-200/10 ${borderHoverClass} hover:shadow-md transition-all hover:scale-105 group cursor-pointer`}
                  title={`View authentic ${displayTitle} materials in catalog`}
                >
                  <div
                    className={`font-black text-base sm:text-lg tracking-tight font-sans transition-colors text-center ${textLightClass} ${textDarkClass}`}
                  >
                    {displayTitle}
                  </div>
                  <span className="text-[10px] text-charcoal-500 dark:text-cream-200/70 mt-1 font-semibold text-center truncate max-w-full">
                    {brand.category}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
