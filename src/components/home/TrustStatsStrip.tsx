import React, { useEffect, useState, useRef } from 'react';
import { Users, Award, ShieldCheck, Star } from 'lucide-react';
import { apiService } from '../../services/apiService';

const fallbackStats = [
  { icon: Users, value: '1000', suffix: '+', label: 'Projects Completed', subtext: 'Across Sikar, Jaipur & Shekhawati' },
  { icon: Award, value: '15', suffix: '+', label: 'Years of Craftsmanship', subtext: 'Since 2009 in Rajasthan' },
  { icon: ShieldCheck, value: '100', suffix: '%', label: 'Partner Brands', subtext: 'Certified German & Indian Makers' },
  { icon: Star, value: '4.9', suffix: '★', label: 'Client Satisfaction', subtext: 'From 320+ verified home owners' }
];

export const TrustStatsStrip: React.FC = () => {
  const [statsData, setStatsData] = useState(fallbackStats);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<string[]>(['1000', '15', '100', '4.9']);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateStats = (content: any) => {
      if (content?.stats && Array.isArray(content.stats) && content.stats.length > 0) {
        const icons = [Users, Award, ShieldCheck, Star];
        const mapped = content.stats.map((item: any, idx: number) => {
          const strVal = String(item.value || '').trim();
          const numMatch = strVal.match(/[\d.]+/);
          const rawNum = numMatch ? numMatch[0] : strVal;
          const suffix = numMatch ? strVal.slice(strVal.indexOf(rawNum) + rawNum.length) : '';
          return {
            icon: icons[idx % icons.length] || ShieldCheck,
            value: rawNum,
            suffix: suffix || (strVal.replace(rawNum, '')),
            label: item.label || '',
            subtext: item.subtext || ''
          };
        });
        setStatsData(mapped as any);
        setCounts(mapped.map((m: any) => String(m.value)));
      }
    };

    // 1. Initial load from local cache or API
    apiService.getSiteContent().then(updateStats);

    // 2. Custom event from same tab
    const handleContentChange = (e: CustomEvent<any>) => {
      if (e.detail?.stats) updateStats(e.detail);
    };
    window.addEventListener('ssi_content_changed' as any, handleContentChange);

    // 3. Storage event from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ssi_site_content' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed?.stats) updateStats(parsed);
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 4. BroadcastChannel across all browser tabs
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('ssi_channel');
      channel.onmessage = (msg) => {
        if (msg.data?.type === 'content_updated' && msg.data?.data?.stats) {
          updateStats(msg.data.data);
        }
      };
    } catch (_) {}

    // 5. Auto-sync whenever user focuses or switches back to tab
    const handleVisibility = () => {
      if (!document.hidden) {
        apiService.getSiteContent().then(updateStats);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('ssi_content_changed' as any, handleContentChange);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (channel) channel.close();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1000;
          const frameRate = 30;
          const totalFrames = Math.round(duration / (1000 / frameRate));
          let currentFrame = 0;

          const timer = setInterval(() => {
            currentFrame++;
            const progress = Math.min(currentFrame / totalFrames, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(
              statsData.map((s) => {
                const num = Number(s.value);
                if (isNaN(num)) return String(s.value);
                const isFloat = String(s.value).includes('.');
                return isFloat ? (num * eased).toFixed(1) : String(Math.round(num * eased));
              })
            );

            if (currentFrame >= totalFrames) {
              clearInterval(timer);
              setCounts(statsData.map((s) => String(s.value)));
            }
          }, 1000 / frameRate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, statsData]);

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 transition-colors duration-300">
      <div className="bg-white dark:bg-forest-900 text-forest-950 dark:text-cream-100 rounded-2xl sm:rounded-3xl border border-cream-200 dark:border-copper-500/30 px-4 sm:px-8 py-5 sm:py-6 shadow-card transition-colors duration-300">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 justify-center sm:justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-cream-100 dark:bg-forest-800/80 border border-cream-200 dark:border-copper-500/30 flex items-center justify-center text-[#B57731] dark:text-copper-400 shrink-0 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-serif font-bold text-xl sm:text-2xl text-forest-950 dark:text-cream-50 leading-tight">
                    {counts[idx]}
                    <span className="text-[#B57731] dark:text-copper-400 font-sans ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-charcoal-700 dark:text-cream-200 font-semibold truncate">
                    {stat.label}
                  </div>
                  {stat.subtext && (
                    <div className="text-[10px] text-charcoal-400 dark:text-cream-200/50 truncate max-w-[130px] sm:max-w-[190px]" title={stat.subtext}>
                      {stat.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
