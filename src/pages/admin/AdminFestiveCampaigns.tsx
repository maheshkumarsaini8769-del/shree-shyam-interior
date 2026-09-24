import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Save,
  Check,
  Calendar,
  Gift,
  RefreshCw,
  Bell,
  Eye,
  Sliders,
  Flame,
  Palette,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import {
  apiService,
  FestivalCampaignConfig,
  FestivalType,
  FESTIVAL_PRESETS
} from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminFestiveCampaigns: React.FC = () => {
  const [config, setConfig] = useState<FestivalCampaignConfig>(FESTIVAL_PRESETS.normal);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const data = await apiService.getFestivalCampaign();
      if (data) {
        setConfig(data);
      }
    } catch {
      showToast('Failed to load festive campaign data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (presetKey: FestivalType) => {
    const preset = FESTIVAL_PRESETS[presetKey];
    if (preset) {
      setConfig({
        ...preset,
        autoSchedule: config.autoSchedule,
        startDate: config.startDate,
        endDate: config.endDate
      });
      showToast(`Selected ${preset.festivalName} preset! Click "Save & Activate" to apply live.`, 'info');
    }
  };

  const handleQuickRevertNormal = async () => {
    try {
      setSaving(true);
      const normalConfig = { ...FESTIVAL_PRESETS.normal, updatedAt: new Date().toISOString() };
      await apiService.updateFestivalCampaign(normalConfig);
      setConfig(normalConfig);
      showToast('Website successfully reverted to Normal Standard Mode!', 'success');
    } catch {
      showToast('Failed to revert to normal mode', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await apiService.updateFestivalCampaign(config);
      showToast(
        config.activeFestival === 'normal'
          ? 'Normal Mode active across website'
          : `🎉 ${config.festivalName} is now LIVE on customer website!`,
        'success'
      );
    } catch {
      showToast('Failed to save festival campaign', 'error');
    } finally {
      setSaving(false);
    }
  };

  const festivalOptions: Array<{
    id: FestivalType;
    title: string;
    sub: string;
    icon: string;
    accent: string;
  }> = [
    {
      id: 'normal',
      title: 'Normal Mode',
      sub: 'Standard luxury wood & forest theme for everyday',
      icon: '🌿',
      accent: 'border-copper-500/40'
    },
    {
      id: 'diwali',
      title: 'Diwali (दीपावली)',
      sub: 'Warm golden diyas, amber glow & Deepawali offers',
      icon: '🪔',
      accent: 'border-amber-500'
    },
    {
      id: 'holi',
      title: 'Holi (होली उत्सव)',
      sub: 'Festive gulal splashes & hardware upgrade offers',
      icon: '🎨',
      accent: 'border-pink-500'
    },
    {
      id: 'navratri',
      title: 'Navratri & Dussehra',
      sub: 'Auspicious temple woodwork & Griha Pravesh specials',
      icon: '✨',
      accent: 'border-red-500'
    },
    {
      id: 'newyear',
      title: 'New Year (नया साल)',
      sub: 'Festive confetti, starlight & transformation vouchers',
      icon: '🎉',
      accent: 'border-sky-500'
    },
    {
      id: 'patriot',
      title: 'National Days (15 Aug / 26 Jan)',
      sub: 'Tricolor pride & Made in India Teakwood offers',
      icon: '🇮🇳',
      accent: 'border-orange-500'
    },
    {
      id: 'custom',
      title: 'Custom Festival',
      sub: 'Custom name, discount code & custom banners',
      icon: '⚙️',
      accent: 'border-purple-500'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 text-[11px] font-bold uppercase tracking-wider mb-2 border border-copper-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festival Themes & Seasonal Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
            1-Click Festival Switcher (त्यौहार मोड)
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-200/70 mt-1">
            Change your entire website theme into Diwali, Holi, or New Year with a single click, and easily revert to Normal mode.
          </p>
        </div>

        {/* Quick Normal Mode Reset Button */}
        {config.activeFestival !== 'normal' && (
          <button
            onClick={handleQuickRevertNormal}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 text-white dark:bg-cream-100 dark:text-forest-950 hover:bg-forest-800 text-xs font-bold uppercase tracking-wider shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Revert to Normal Mode Now</span>
          </button>
        )}
      </div>

      {/* Current Active Status Alert Banner */}
      <div
        className={`p-5 rounded-3xl border text-xs sm:text-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card ${
          config.activeFestival === 'normal'
            ? 'bg-cream-100/70 dark:bg-[#121720] border-cream-300 dark:border-cream-200/10 text-charcoal-800 dark:text-cream-100'
            : 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-amber-500/40 text-forest-950 dark:text-cream-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl shrink-0">
            {festivalOptions.find((f) => f.id === config.activeFestival)?.icon || '🌿'}
          </div>
          <div>
            <div className="font-serif font-bold text-base sm:text-lg flex items-center gap-2">
              <span>Active Mode: {config.festivalName}</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-xs text-charcoal-600 dark:text-cream-200/80 mt-0.5">
              {config.activeFestival === 'normal'
                ? 'Standard luxury wooden catalog and showroom booking banners are currently active.'
                : `Festive announcement bar, ambient ${config.festivalName} effects, and coupon "${config.couponCode || 'N/A'}" are currently LIVE.`}
            </p>
          </div>
        </div>

        {config.autoSchedule && config.endDate && (
          <div className="shrink-0 bg-white/80 dark:bg-[#1A212C] px-3.5 py-1.5 rounded-xl border border-cream-200 dark:border-cream-200/10 text-[11px] font-medium">
            <span className="text-charcoal-500 dark:text-cream-200/60 block text-[10px]">Auto-reverts to normal on:</span>
            <span className="font-bold text-copper-600 dark:text-copper-400">{config.endDate}</span>
          </div>
        )}
      </div>

      {/* STEP 1: PRESET CARDS SELECTOR */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-cream-200/70">
          Step 1: Choose Festival Preset (1-Click Selection)
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {festivalOptions.map((opt) => {
            const isSelected = config.activeFestival === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => handleSelectPreset(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `${opt.accent} bg-white dark:bg-[#1A212C] shadow-card ring-2 ring-copper-500`
                    : 'border-cream-200 dark:border-cream-200/10 bg-white dark:bg-[#121720] hover:border-copper-500/40 hover:-translate-y-0.5'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 p-1 rounded-full bg-copper-500 text-white">
                    <Check className="w-3 h-3" />
                  </span>
                )}
                <div>
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-charcoal-500 dark:text-cream-200/70 mt-1 leading-snug">
                    {opt.sub}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-cream-100 dark:border-cream-200/5 text-[10px] font-bold text-copper-600 dark:text-copper-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{isSelected ? 'Selected' : 'Click to Select'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: EDITABLE FESTIVE DETAILS & PREVIEW */}
      <form onSubmit={handleSave} className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-cream-200/10">
          <div>
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
              Step 2: Customize Festive Campaign Details
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/60 mt-0.5">
              Review and customize banner text, coupon code, and ambient celebration effects.
            </p>
          </div>

          <div
            className="w-5 h-5 rounded-full shadow-inner border border-white"
            style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
            title="Theme Accent Color"
          />
        </div>

        {/* Live Banner Preview */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-cream-200/70">
            Live Customer Top-Banner Preview:
          </label>
          <div
            className="p-3 rounded-2xl text-xs text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-card"
            style={{
              background: `linear-gradient(135deg, #0C121A 0%, ${config.highlightColor}44 50%, #0C121A 100%)`
            }}
          >
            <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
              <span
                className="px-2.5 py-0.5 rounded text-[10px] font-bold text-black uppercase tracking-wider shrink-0"
                style={{ backgroundColor: config.highlightColor || '#F59E0B' }}
              >
                {config.badgeText || 'OFFER'}
              </span>
              <span className="truncate text-cream-100 text-xs font-normal">
                {config.bannerText || 'Festive celebration message here'}
              </span>
            </div>

            {config.couponCode && (
              <span className="px-2.5 py-1 rounded-lg bg-white/20 border border-white/30 text-white font-mono font-bold text-[11px] shrink-0">
                Code: {config.couponCode} ({config.discountPercentage}% OFF)
              </span>
            )}
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Campaign / Festival Title
            </label>
            <input
              type="text"
              value={config.festivalName}
              onChange={(e) => setConfig({ ...config, festivalName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs font-serif font-bold text-forest-950 dark:text-cream-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Top Ribbon Badge Text
            </label>
            <input
              type="text"
              value={config.badgeText}
              onChange={(e) => setConfig({ ...config, badgeText: e.target.value })}
              placeholder="e.g. 🪔 SHUBH DEEPAWALI OFFER"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs font-bold text-forest-950 dark:text-cream-50"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Announcement Banner Message (Shown at top of all pages)
            </label>
            <input
              type="text"
              value={config.bannerText}
              onChange={(e) => setConfig({ ...config, bannerText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs text-forest-950 dark:text-cream-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Festive Promo Coupon Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={config.couponCode}
                onChange={(e) => setConfig({ ...config, couponCode: e.target.value.toUpperCase() })}
                placeholder="e.g. DIWALI2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs font-mono font-bold text-copper-600 dark:text-copper-400 uppercase"
              />
              <Gift className="w-4 h-4 text-charcoal-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={config.discountPercentage}
              onChange={(e) => setConfig({ ...config, discountPercentage: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs font-bold text-forest-950 dark:text-cream-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Welcome Greeting Title (Popup)
            </label>
            <input
              type="text"
              value={config.greetingTitle}
              onChange={(e) => setConfig({ ...config, greetingTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs text-forest-950 dark:text-cream-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
              Welcome Greeting Subtitle
            </label>
            <input
              type="text"
              value={config.greetingSubtitle}
              onChange={(e) => setConfig({ ...config, greetingSubtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-cream-50 dark:bg-[#1A212C] text-xs text-forest-950 dark:text-cream-50"
            />
          </div>
        </div>

        {/* Toggles Section */}
        <div className="pt-4 border-t border-cream-100 dark:border-cream-200/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-cream-50 dark:bg-[#1A212C]">
            <div>
              <span className="text-xs font-bold text-forest-950 dark:text-cream-50 block">
                Enable Ambient Celebration Effects
              </span>
              <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                Lightweight floating golden diyas for Diwali, soft pastel specks for Holi, confetti for New Year.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={config.enableAmbientEffects}
                onChange={(e) => setConfig({ ...config, enableAmbientEffects: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cream-300 peer-focus:outline-none rounded-full peer dark:bg-forest-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-charcoal-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-copper-500"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-cream-50 dark:bg-[#1A212C]">
            <div>
              <span className="text-xs font-bold text-forest-950 dark:text-cream-50 block">
                Show Welcome Greeting Modal (Popup with Voucher)
              </span>
              <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                Displays a luxury greeting popup once per visitor session offering the festive coupon code.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={config.showGreetingModal}
                onChange={(e) => setConfig({ ...config, showGreetingModal: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cream-300 peer-focus:outline-none rounded-full peer dark:bg-forest-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-charcoal-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-copper-500"></div>
            </label>
          </div>

          {/* Auto-Schedule & Auto-Revert to Normal */}
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-forest-950 dark:text-cream-50 block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-copper-500" />
                  Auto-Schedule & Auto-Revert to Normal Mode
                </span>
                <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                  Automatically turns off festive mode and reverts website back to Normal on the expiry date!
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={config.autoSchedule}
                  onChange={(e) => setConfig({ ...config, autoSchedule: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-cream-300 peer-focus:outline-none rounded-full peer dark:bg-forest-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-charcoal-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-copper-500"></div>
              </label>
            </div>

            {config.autoSchedule && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Festival Start Date
                  </label>
                  <input
                    type="date"
                    value={config.startDate || ''}
                    onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-white dark:bg-[#121720] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Festival End Date (Auto-Revert Date)
                  </label>
                  <input
                    type="date"
                    value={config.endDate || ''}
                    onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-200 dark:border-cream-200/20 bg-white dark:bg-[#121720] text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-cream-200 dark:border-cream-200/10 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Activating Live...' : 'Save & Activate Festive Mode'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
