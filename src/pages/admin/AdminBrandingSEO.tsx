import React, { useState, useEffect } from 'react';
import { Globe, Image as ImageIcon, Bell, Search, Share2, Save, Upload, Check, RefreshCw, Eye } from 'lucide-react';
import { apiService, BrandingSEOData } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminBrandingSEO: React.FC = () => {
  const [data, setData] = useState<BrandingSEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [activeTab, setActiveTab] = useState<'logo' | 'announcement' | 'seo' | 'social'>('logo');

  const { showToast } = useToast();

  useEffect(() => {
    loadBranding();
  }, []);

  const loadBranding = async () => {
    try {
      setLoading(true);
      const res = await apiService.getBrandingSEO();
      setData(res);
    } catch {
      showToast('Failed to load branding & SEO settings', 'error');
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
      // Also apply document title immediately
      if (data.seo?.siteTitle) {
        document.title = data.seo.siteTitle;
      }
      showToast('Branding, Logo & SEO settings updated live!', 'success');
    } catch {
      showToast('Failed to update branding settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;

    try {
      setUploadingLogo(true);
      const url = await apiService.uploadImage(file);
      setData({
        ...data,
        logo: { ...data.logo, imageUrl: url, type: 'image' }
      });
      showToast('Logo uploaded successfully!', 'success');
    } catch {
      showToast('Failed to upload logo image', 'error');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;

    try {
      setUploadingOg(true);
      const url = await apiService.uploadImage(file);
      setData({
        ...data,
        seo: { ...data.seo, ogImage: url }
      });
      showToast('Social Share / OG Image uploaded successfully!', 'success');
    } catch {
      showToast('Failed to upload OG image', 'error');
    } finally {
      setUploadingOg(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="py-20 text-center text-charcoal-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-forest-600" />
        Loading Branding & SEO CMS...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
              Logo, SEO & Announcement CMS
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              Live Brand Identity
            </span>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Modify brand logo image/text, top banner announcement, Google SEO meta tags, and footer information
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 font-medium text-xs shadow-md transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Live Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cream-200 dark:border-forest-800 text-xs">
        <button
          onClick={() => setActiveTab('logo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'logo'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Brand Logo & Identity
        </button>

        <button
          onClick={() => setActiveTab('announcement')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'announcement'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Bell className="w-4 h-4" />
          Announcement Bar
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'seo'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Search className="w-4 h-4" />
          SEO & Meta Tags
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'social'
              ? 'bg-forest-900 text-cream-50 dark:bg-forest-700'
              : 'text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-forest-900/40'
          }`}
        >
          <Share2 className="w-4 h-4" />
          Footer & Social Links
        </button>
      </div>

      {/* TAB 1: LOGO & IDENTITY */}
      {activeTab === 'logo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 space-y-5">
            <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
              Logo Format & Typography
            </h3>

            {/* Logo Display Type */}
            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-2">
                Header Logo Display Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['text', 'image', 'both'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setData({ ...data, logo: { ...data.logo, type } })}
                    className={`p-3 rounded-xl border text-center text-xs font-medium capitalize transition-all ${
                      data.logo.type === type
                        ? 'border-forest-900 bg-forest-50/50 dark:bg-forest-800/60 text-forest-950 dark:text-cream-50'
                        : 'border-cream-200 dark:border-forest-800 text-charcoal-600 dark:text-cream-200 hover:bg-cream-50 dark:hover:bg-forest-900'
                    }`}
                  >
                    {type === 'text' && 'Text Only (Luxury Font)'}
                    {type === 'image' && 'Image Only (Custom Logo)'}
                    {type === 'both' && 'Icon Image + Text'}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Text & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Brand Primary Name
                </label>
                <input
                  type="text"
                  value={data.logo.text}
                  onChange={(e) =>
                    setData({ ...data, logo: { ...data.logo, text: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-serif font-bold text-forest-950 dark:text-cream-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={data.logo.tagline}
                  onChange={(e) =>
                    setData({ ...data, logo: { ...data.logo, tagline: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs tracking-widest uppercase font-mono text-forest-950 dark:text-cream-50"
                />
              </div>
            </div>

            {/* Custom Logo Image Upload */}
            <div className="pt-4 border-t border-cream-200 dark:border-forest-800 space-y-3">
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100">
                Custom Logo Image (PNG / SVG / WebP)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  placeholder="https://example.com/logo.png or /uploads/logo.png"
                  value={data.logo.imageUrl}
                  onChange={(e) =>
                    setData({ ...data, logo: { ...data.logo, imageUrl: e.target.value } })
                  }
                  className="flex-1 w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono text-forest-950 dark:text-cream-100"
                />

                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-forest-900/30 hover:border-forest-900 bg-cream-50 dark:bg-forest-800 text-xs font-medium cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  {uploadingLogo ? 'Uploading...' : 'Upload File'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    disabled={uploadingLogo}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[11px] text-charcoal-500 dark:text-cream-200/60">
                Transparent PNG or vector SVG with minimum 400x120px resolution recommended.
              </p>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-forest-950 text-cream-50 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-cream-300/70 block mb-3">
                Live Header Preview
              </span>

              <div className="p-4 rounded-xl bg-forest-900/80 border border-forest-800 flex items-center gap-3">
                {data.logo.imageUrl && (data.logo.type === 'image' || data.logo.type === 'both') ? (
                  <img
                    src={data.logo.imageUrl}
                    alt="Logo preview"
                    className="h-9 w-auto max-w-[140px] object-contain"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-cream-100/10 flex items-center justify-center text-forest-400 font-serif font-bold text-lg border border-forest-700/50">
                    {data.logo.text.charAt(0) || 'S'}
                  </div>
                )}

                {(data.logo.type === 'text' || data.logo.type === 'both') && (
                  <div>
                    <div className="font-serif font-bold text-sm tracking-wide text-cream-50">
                      {data.logo.text || 'Shree Shyam'}
                    </div>
                    <div className="text-[9px] tracking-[0.2em] font-light text-cream-300/70">
                      {data.logo.tagline || 'INTERIOR'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-cream-200/60">
              Changes applied here will appear instantly across the customer website navbar and mobile menu.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENT BAR */}
      {activeTab === 'announcement' && (
        <div className="p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
                Top Announcement Banner
              </h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-200/60">
                Promotional ribbon displayed at the very top of the website on every page
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.announcement.enabled}
                onChange={(e) =>
                  setData({
                    ...data,
                    announcement: { ...data.announcement, enabled: e.target.checked }
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-cream-300 peer-focus:outline-none rounded-full peer dark:bg-forest-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-charcoal-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-900 dark:peer-checked:bg-forest-600"></div>
              <span className="ml-2 text-xs font-medium text-forest-950 dark:text-cream-100">
                {data.announcement.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={data.announcement.badge}
                  onChange={(e) =>
                    setData({
                      ...data,
                      announcement: { ...data.announcement, badge: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs uppercase font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Banner Text Message
                </label>
                <input
                  type="text"
                  value={data.announcement.text}
                  onChange={(e) =>
                    setData({
                      ...data,
                      announcement: { ...data.announcement, text: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Call-To-Action Link
                </label>
                <input
                  type="text"
                  value={data.announcement.link}
                  onChange={(e) =>
                    setData({
                      ...data,
                      announcement: { ...data.announcement, link: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={data.announcement.linkLabel}
                  onChange={(e) =>
                    setData({
                      ...data,
                      announcement: { ...data.announcement, linkLabel: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs"
                />
              </div>
            </div>

            {/* Live Banner Preview */}
            <div className="pt-4 border-t border-cream-200 dark:border-forest-800 space-y-2">
              <span className="text-[11px] font-medium text-charcoal-500 dark:text-cream-200/70">
                Live Announcement Bar Preview:
              </span>
              <div className="bg-forest-950 text-cream-100 py-2 px-4 rounded-xl flex items-center justify-between text-xs shadow-inner">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-forest-950">
                    {data.announcement.badge || 'OFFER'}
                  </span>
                  <span className="truncate text-cream-100 font-light">
                    {data.announcement.text}
                  </span>
                </div>
                <span className="text-amber-400 font-medium underline underline-offset-4 ml-4 shrink-0">
                  {data.announcement.linkLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEO & SEARCH META */}
      {activeTab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 space-y-4">
            <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
              Google SEO & Open Graph Tags
            </h3>

            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                Website Meta Title (Browser Tab Title)
              </label>
              <input
                type="text"
                value={data.seo.siteTitle}
                onChange={(e) =>
                  setData({ ...data, seo: { ...data.seo, siteTitle: e.target.value } })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-medium text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-forest-900 dark:text-cream-100">
                  Meta Description (Search Snippet)
                </label>
                <span className="text-[10px] text-charcoal-400">
                  {data.seo.metaDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={data.seo.metaDescription}
                onChange={(e) =>
                  setData({ ...data, seo: { ...data.seo, metaDescription: e.target.value } })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                SEO Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={data.seo.keywords}
                onChange={(e) =>
                  setData({ ...data, seo: { ...data.seo, keywords: e.target.value } })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Canonical Base URL
                </label>
                <input
                  type="text"
                  value={data.seo.canonicalUrl || ''}
                  onChange={(e) =>
                    setData({ ...data, seo: { ...data.seo, canonicalUrl: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                  Google Analytics Measurement ID
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={data.seo.googleAnalyticsId || ''}
                  onChange={(e) =>
                    setData({ ...data, seo: { ...data.seo, googleAnalyticsId: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
                />
              </div>
            </div>

            {/* OG Social Image */}
            <div className="pt-3 border-t border-cream-200 dark:border-forest-800 space-y-2">
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100">
                Social Share Preview Image (WhatsApp / Facebook / Twitter OG Card)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={data.seo.ogImage}
                  onChange={(e) =>
                    setData({ ...data, seo: { ...data.seo, ogImage: e.target.value } })
                  }
                  className="flex-1 px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
                />
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-forest-900/30 hover:border-forest-900 bg-cream-50 dark:bg-forest-800 text-xs font-medium cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  {uploadingOg ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOgImageUpload}
                    disabled={uploadingOg}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Google Search Snippet Preview */}
          <div className="p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 space-y-4">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-charcoal-400 block">
              Google Search Result Snippet Preview
            </span>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-forest-800 bg-gray-50/70 dark:bg-forest-950 space-y-1">
              <div className="text-[11px] text-gray-700 dark:text-gray-400 truncate">
                {data.seo.canonicalUrl || 'https://shreeshyaminterior.com'}
              </div>
              <h4 className="text-sm font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer line-clamp-2">
                {data.seo.siteTitle}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                {data.seo.metaDescription}
              </p>
            </div>

            {data.seo.ogImage && (
              <div className="space-y-1.5 pt-2 border-t border-cream-100 dark:border-forest-800">
                <span className="text-[10px] uppercase font-semibold text-charcoal-400">
                  OpenGraph Share Card
                </span>
                <img
                  src={data.seo.ogImage}
                  alt="OG Card"
                  className="w-full h-32 object-cover rounded-lg border border-cream-200 dark:border-forest-800"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: FOOTER & SOCIAL LINKS */}
      {activeTab === 'social' && (
        <div className="p-6 rounded-2xl border border-cream-200 dark:border-forest-800 bg-white dark:bg-forest-900/40 space-y-5 max-w-3xl">
          <h3 className="font-semibold text-sm text-forest-950 dark:text-cream-50">
            Footer Text & Social Media Handles
          </h3>

          <div>
            <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
              Footer About Studio Text
            </label>
            <textarea
              rows={3}
              value={data.footer.aboutText}
              onChange={(e) =>
                setData({ ...data, footer: { ...data.footer, aboutText: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs text-forest-950 dark:text-cream-100"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
              Copyright Text
            </label>
            <input
              type="text"
              value={data.footer.copyrightText}
              onChange={(e) =>
                setData({ ...data, footer: { ...data.footer, copyrightText: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
              Physical Showroom Address
            </label>
            <input
              type="text"
              value={data.footer.address}
              onChange={(e) =>
                setData({ ...data, footer: { ...data.footer, address: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-cream-200 dark:border-forest-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={data.socialLinks.instagram}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, instagram: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                value={data.socialLinks.facebook}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, facebook: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                YouTube Channel URL
              </label>
              <input
                type="text"
                value={data.socialLinks.youtube}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, youtube: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-forest-900 dark:text-cream-100 mb-1">
                Official WhatsApp Contact
              </label>
              <input
                type="text"
                value={data.socialLinks.whatsapp}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: { ...data.socialLinks, whatsapp: e.target.value }
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-cream-300 dark:border-forest-700 bg-white dark:bg-forest-950 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
