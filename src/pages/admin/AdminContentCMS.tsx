import React, { useState, useEffect } from 'react';
import { FileEdit, Save, Upload, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { apiService, SiteContent } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminContentCMS: React.FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'siteVisit' | 'showroom'>('hero');
  const [uploading, setUploading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSiteContent();
      setContent(data);
    } catch {
      showToast('Failed to load website content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: 'hero' | 'showroom' | 'siteVisit') => {
    const file = e.target.files?.[0];
    if (!file || !content) return;

    try {
      setUploading(true);
      const url = await apiService.uploadImage(file);
      if (path === 'hero') {
        setContent({
          ...content,
          hero: { ...content.hero, backgroundImage: url }
        });
      } else if (path === 'showroom') {
        setContent({
          ...content,
          showroom: { ...content.showroom, image: url }
        });
      } else if (path === 'siteVisit') {
        setContent({
          ...content,
          siteVisitBanner: { ...content.siteVisitBanner, consultantPhoto: url }
        });
      }
      showToast('Image uploaded successfully', 'success');
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      setSaving(true);
      await apiService.updateSiteContent(content);
      showToast('Website content updated live!', 'success');
    } catch {
      showToast('Failed to save website content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="py-16 text-center text-charcoal-400">
        Loading website CMS content...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Homepage Content & Banners CMS
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Modify text, headlines, background banners, and statistics across the public website
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-cream-200 dark:border-cream-200/10 pb-2 overflow-x-auto">
        {[
          { id: 'hero', label: '1. Hero Banner & Headline' },
          { id: 'stats', label: '2. Trust Statistics Counters' },
          { id: 'siteVisit', label: '3. Site Visit Banner' },
          { id: 'showroom', label: '4. Showroom & Timings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-copper-500 text-white shadow-sm'
                : 'text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 pb-2 border-b border-cream-100 dark:border-cream-200/10">
              Hero Section Text & Background Image
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Top Studio Badge Text
              </label>
              <input
                type="text"
                value={content.hero.badge || ''}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })
                }
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Main Headline (Prefix)
                </label>
                <input
                  type="text"
                  value={content.hero.titlePrefix || ''}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, titlePrefix: e.target.value } })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Headline Highlight (Italic / Gold)
                </label>
                <input
                  type="text"
                  value={content.hero.titleHighlight || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, titleHighlight: e.target.value }
                    })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-copper-500 font-bold focus:outline-none focus:border-copper-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Subtitle Description Paragraph
              </label>
              <textarea
                rows={3}
                value={content.hero.subtitle || ''}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })
                }
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Background Banner Image (Upload or Paste URL)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.hero.backgroundImage || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, backgroundImage: e.target.value }
                    })
                  }
                  className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
                <label className="px-3.5 py-2 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'hero')}
                  />
                </label>
              </div>

              {content.hero.backgroundImage && (
                <div className="mt-3 h-40 rounded-2xl overflow-hidden bg-cream-100 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10">
                  <img
                    src={content.hero.backgroundImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Primary Button Text & Link
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={content.hero.primaryCtaText || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText: e.target.value }
                      })
                    }
                    placeholder="Text"
                    className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                  <input
                    type="text"
                    value={content.hero.primaryCtaLink || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaLink: e.target.value }
                      })
                    }
                    placeholder="/link"
                    className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Secondary Button Text & Link
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText: e.target.value }
                      })
                    }
                    placeholder="Text"
                    className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                  <input
                    type="text"
                    value={content.hero.secondaryCtaLink || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaLink: e.target.value }
                      })
                    }
                    placeholder="/link"
                    className="bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STATS */}
        {activeTab === 'stats' && (
          <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-6">
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 pb-2 border-b border-cream-100 dark:border-cream-200/10">
              Trust Statistics Floating Bar (4 Counters)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(content.stats || []).map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 space-y-2.5"
                >
                  <span className="text-xs font-bold text-copper-500 uppercase">
                    Metric #{idx + 1}
                  </span>

                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/70 mb-1">
                      Counter Value (e.g. 500+, 15+, 100%)
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const next = [...content.stats];
                        next[idx].value = e.target.value;
                        setContent({ ...content, stats: next });
                      }}
                      className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-sm font-serif font-bold text-forest-950 dark:text-cream-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/70 mb-1">
                      Metric Title Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const next = [...content.stats];
                        next[idx].label = e.target.value;
                        setContent({ ...content, stats: next });
                      }}
                      className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-xs text-forest-950 dark:text-cream-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/70 mb-1">
                      Subtext Details
                    </label>
                    <input
                      type="text"
                      value={stat.subtext}
                      onChange={(e) => {
                        const next = [...content.stats];
                        next[idx].subtext = e.target.value;
                        setContent({ ...content, stats: next });
                      }}
                      className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-xs text-forest-950 dark:text-cream-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SITE VISIT BANNER */}
        {activeTab === 'siteVisit' && (
          <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 pb-2 border-b border-cream-100 dark:border-cream-200/10">
              Site Visit Banner & Lead Consultant
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Banner Title
              </label>
              <input
                type="text"
                value={content.siteVisitBanner.title || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteVisitBanner: { ...content.siteVisitBanner, title: e.target.value }
                  })
                }
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={content.siteVisitBanner.description || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteVisitBanner: { ...content.siteVisitBanner, description: e.target.value }
                  })
                }
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Consultant Name
                </label>
                <input
                  type="text"
                  value={content.siteVisitBanner.consultantName || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteVisitBanner: { ...content.siteVisitBanner, consultantName: e.target.value }
                    })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Consultant Title / Credentials
                </label>
                <input
                  type="text"
                  value={content.siteVisitBanner.consultantTitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteVisitBanner: {
                        ...content.siteVisitBanner,
                        consultantTitle: e.target.value
                      }
                    })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Consultant Photo (URL or File)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.siteVisitBanner.consultantPhoto || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteVisitBanner: {
                        ...content.siteVisitBanner,
                        consultantPhoto: e.target.value
                      }
                    })
                  }
                  className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
                <label className="px-3.5 py-2 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'siteVisit')}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                4 Inspection Checkpoints
              </label>
              <div className="space-y-2">
                {content.siteVisitBanner.checkpoints.map((cp, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={cp}
                    onChange={(e) => {
                      const next = [...content.siteVisitBanner.checkpoints];
                      next[idx] = e.target.value;
                      setContent({
                        ...content,
                        siteVisitBanner: { ...content.siteVisitBanner, checkpoints: next }
                      });
                    }}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-xs text-forest-950 dark:text-cream-50"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SHOWROOM */}
        {activeTab === 'showroom' && (
          <div className="bg-white dark:bg-[#121720] rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-cream-200/10 shadow-soft space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50 pb-2 border-b border-cream-100 dark:border-cream-200/10">
              Sikar Experience Center & Showroom Details
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Showroom Title
              </label>
              <input
                type="text"
                value={content.showroom.name || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    showroom: { ...content.showroom, name: e.target.value }
                  })
                }
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Physical Showroom Address in Sikar
              </label>
              <textarea
                rows={2}
                value={content.showroom.address || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    showroom: { ...content.showroom, address: e.target.value }
                  })
                }
                className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={content.showroom.phone || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      showroom: { ...content.showroom, phone: e.target.value }
                    })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={content.showroom.whatsapp || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      showroom: { ...content.showroom, whatsapp: e.target.value }
                    })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={content.showroom.timings || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      showroom: { ...content.showroom, timings: e.target.value }
                    })
                  }
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                Showroom Photo (URL or File)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.showroom.image || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      showroom: { ...content.showroom, image: e.target.value }
                    })
                  }
                  className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                />
                <label className="px-3.5 py-2 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'showroom')}
                  />
                </label>
              </div>

              {content.showroom.image && (
                <div className="mt-3 h-40 rounded-2xl overflow-hidden bg-cream-100 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10">
                  <img
                    src={content.showroom.image}
                    alt="Showroom Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
