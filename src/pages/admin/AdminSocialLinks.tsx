import React, { useState, useEffect } from 'react';
import { Share2, Save, RefreshCw, ExternalLink, Check, Mail, MapPin, Eye, Sparkles } from 'lucide-react';
import { apiService, BrandingSEOData } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminSocialLinks: React.FC = () => {
  const [data, setData] = useState<BrandingSEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await apiService.getBrandingSEO();
      setData(res);
    } catch {
      showToast('Failed to load social links', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!data) return;

    try {
      setSaving(true);
      await apiService.updateBrandingSEO(data);
      showToast('All Social Media links updated successfully!', 'success');
    } catch {
      showToast('Failed to save social links', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateLink = (key: keyof BrandingSEOData['socialLinks'], value: string) => {
    if (!data) return;
    setData({
      ...data,
      socialLinks: {
        ...data.socialLinks,
        [key]: value
      }
    });
  };

  if (loading || !data) {
    return (
      <div className="py-20 text-center text-charcoal-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-forest-600" />
        Loading Social Media Settings...
      </div>
    );
  }

  const social = data.socialLinks || {
    instagram: '',
    facebook: '',
    youtube: '',
    whatsapp: '',
    email: '',
    googleMaps: '',
    pinterest: '',
    twitter: ''
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
              Social Media Links & Channels
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300">
              Live On Website
            </span>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Attach official links for Instagram, YouTube, WhatsApp, and Facebook. Changes reflect immediately on website footer & contact buttons.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Links'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Fields (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">

          {/* 1. INSTAGRAM */}
          <div className="p-5 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900 shadow-sm transition-all hover:border-pink-400/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">Instagram Profile</h4>
                  <p className="text-[11px] text-charcoal-400">Reels, project transformations & design showcase</p>
                </div>
              </div>

              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700 hover:underline"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal-600 dark:text-cream-200">
                Instagram URL / Handle
              </label>
              <input
                type="url"
                value={social.instagram}
                onChange={(e) => updateLink('instagram', e.target.value)}
                placeholder="https://instagram.com/shreeshyaminterior"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-forest-700 bg-cream-50/60 dark:bg-forest-950 text-xs font-mono text-forest-950 dark:text-cream-100 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* 2. YOUTUBE */}
          <div className="p-5 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900 shadow-sm transition-all hover:border-red-400/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">YouTube Channel</h4>
                  <p className="text-[11px] text-charcoal-400">Full bungalow walkthroughs & showroom tours</p>
                </div>
              </div>

              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal-600 dark:text-cream-200">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={social.youtube}
                onChange={(e) => updateLink('youtube', e.target.value)}
                placeholder="https://youtube.com/@shreeshyaminterior"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-forest-700 bg-cream-50/60 dark:bg-forest-950 text-xs font-mono text-forest-950 dark:text-cream-100 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* 3. WHATSAPP */}
          <div className="p-5 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900 shadow-sm transition-all hover:border-emerald-400/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">WhatsApp Official Desk</h4>
                  <p className="text-[11px] text-charcoal-400">Direct inquiries, estimates & consultation chat</p>
                </div>
              </div>

              {social.whatsapp && (
                <a
                  href={
                    social.whatsapp.startsWith('http')
                      ? social.whatsapp
                      : `https://wa.me/${social.whatsapp.replace(/[^0-9]/g, '')}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  <span>Chat Test</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal-600 dark:text-cream-200">
                WhatsApp Number / Link
              </label>
              <input
                type="text"
                value={social.whatsapp}
                onChange={(e) => updateLink('whatsapp', e.target.value)}
                placeholder="+91 98765 43210 or https://wa.me/919876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-forest-700 bg-cream-50/60 dark:bg-forest-950 text-xs font-mono text-forest-950 dark:text-cream-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 4. FACEBOOK */}
          <div className="p-5 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900 shadow-sm transition-all hover:border-blue-400/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-sm shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">Facebook Page</h4>
                  <p className="text-[11px] text-charcoal-400">Community reviews, photo albums & announcements</p>
                </div>
              </div>

              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal-600 dark:text-cream-200">
                Facebook URL
              </label>
              <input
                type="url"
                value={social.facebook}
                onChange={(e) => updateLink('facebook', e.target.value)}
                placeholder="https://facebook.com/shreeshyaminterior"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-forest-700 bg-cream-50/60 dark:bg-forest-950 text-xs font-mono text-forest-950 dark:text-cream-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 5. GOOGLE MAPS & LOCATION */}
          <div className="p-5 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900 shadow-sm transition-all hover:border-copper-400/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-copper-500 flex items-center justify-center text-white shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">Google Maps / Showroom Location</h4>
                  <p className="text-[11px] text-charcoal-400">Directions link for Sikar showroom floating button</p>
                </div>
              </div>

              {social.googleMaps && (
                <a
                  href={social.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-copper-600 hover:text-copper-700 hover:underline"
                >
                  <span>Test Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal-600 dark:text-cream-200">
                Google Maps Directions URL
              </label>
              <input
                type="url"
                value={social.googleMaps || ''}
                onChange={(e) => updateLink('googleMaps', e.target.value)}
                placeholder="https://maps.google.com/?q=Shree+Shyam+Interior+Sikar+Rajasthan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-200 dark:border-forest-700 bg-cream-50/60 dark:bg-forest-950 text-xs font-mono text-forest-950 dark:text-cream-100 focus:outline-none focus:border-copper-500"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Website Preview (5 Columns) */}
        <div className="lg:col-span-5 space-y-5 sticky top-20">
          <div className="p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900 shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-200 dark:border-forest-800">
              <Eye className="w-4 h-4 text-copper-500" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-forest-950 dark:text-cream-50">
                Live Website Preview
              </h3>
            </div>

            <p className="text-xs text-charcoal-500 dark:text-cream-200/70">
              Yeh dekhiye aapke links customer website ke footer aur contact buttons par kaise live dikhenge:
            </p>

            {/* Footer Simulation Card */}
            <div className="p-5 rounded-xl bg-forest-950 text-cream-100 border border-copper-500/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-forest-900 border border-copper-500/40 flex items-center justify-center text-copper-400 font-serif font-bold text-sm">
                  SS
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-cream-50 block leading-tight">
                    SHREE SHYAM <span className="text-copper-400 text-xs">INTERIOR</span>
                  </span>
                  <span className="text-[10px] text-copper-300">Crafting Homes, From the Heart!</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-cream-200/10">
                <span className="text-[10px] uppercase font-bold text-copper-400 tracking-wider block">
                  Clickable Connected Social Links:
                </span>
                <div className="flex items-center gap-2.5">
                  {social.instagram ? (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                      title="Instagram"
                    >
                      <span className="text-xs font-bold">IG</span>
                    </a>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xs">IG</div>
                  )}

                  {social.youtube ? (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                      title="YouTube"
                    >
                      <span className="text-xs font-bold">YT</span>
                    </a>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xs">YT</div>
                  )}

                  {social.whatsapp ? (
                    <a
                      href={
                        social.whatsapp.startsWith('http')
                          ? social.whatsapp
                          : `https://wa.me/${social.whatsapp.replace(/[^0-9]/g, '')}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                      title="WhatsApp"
                    >
                      <span className="text-xs font-bold">WA</span>
                    </a>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xs">WA</div>
                  )}

                  {social.facebook ? (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                      title="Facebook"
                    >
                      <span className="text-xs font-bold">FB</span>
                    </a>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xs">FB</div>
                  )}
                </div>
              </div>
            </div>

            {/* Save CTA Banner */}
            <div className="p-4 rounded-xl bg-copper-500/10 border border-copper-500/30 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-copper-700 dark:text-copper-400">
                <Sparkles className="w-4 h-4" />
                <span>Instant Auto-Publish</span>
              </div>
              <p className="text-charcoal-600 dark:text-cream-200 text-[11px] leading-relaxed">
                Save button dabate hi Vercel live website par link immediately attach ho jaayenge.
              </p>
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-forest-950 dark:bg-forest-800 text-cream-50 font-bold text-xs hover:bg-forest-900 transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-copper-400" />
                <span>{saving ? 'Saving...' : 'Save & Publish Links Live'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
