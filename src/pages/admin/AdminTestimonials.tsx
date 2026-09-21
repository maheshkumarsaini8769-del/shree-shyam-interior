import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Edit2, Trash2, X, Star, Upload } from 'lucide-react';
import { apiService, Testimonial } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    city: 'Sikar, Rajasthan',
    project: '4BHK Villa Turnkey Interior',
    rating: 5,
    review: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'Recent',
    status: 'Approved'
  });

  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTestimonials();
      setTestimonials(data);
    } catch {
      showToast('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      city: 'Sikar, Rajasthan',
      project: 'Modular Kitchen & Wardrobe',
      rating: 5,
      review: 'Exceptional craftsmanship and 100% genuine materials. Very transparent quotation.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      date: 'Recent',
      status: 'Approved'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingItem(t);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await apiService.uploadImage(file);
      setFormData((prev) => ({ ...prev, avatar: url }));
      showToast('Avatar uploaded', 'success');
    } catch {
      showToast('Upload failed', 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.review?.trim()) return;

    try {
      if (editingItem) {
        const updated = await apiService.updateTestimonial(editingItem.id, formData);
        setTestimonials((prev) => prev.map((t) => (t.id === editingItem.id ? updated : t)));
        showToast('Review updated', 'success');
      } else {
        const created = await apiService.createTestimonial(formData);
        setTestimonials((prev) => [created, ...prev]);
        showToast('Review added', 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save testimonial', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;

    try {
      await apiService.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast('Review removed', 'success');
    } catch {
      showToast('Failed to delete review', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Client Testimonials & Feedback
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Manage genuine client reviews displayed on homepage and showroom testimonials section
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-copper-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60 block">
                      {item.city} • {item.project}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-charcoal-600 dark:text-cream-200/80 italic leading-relaxed">
                "{item.review}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-cream-100 dark:border-cream-200/10 flex items-center justify-between text-xs">
              <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50">
                Date: {item.date}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-charcoal-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                {editingItem ? 'Edit Review' : 'Add Client Testimonial'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Mahendra Kedia"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Sikar, Rajasthan"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={formData.project || ''}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="e.g. 4BHK Bunglow Interior"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Rating (Stars 1 - 5)
                  </label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.review || ''}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Client feedback and review details..."
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Client Avatar (URL or File)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.avatar || ''}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                  <label className="px-3 py-2 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 text-xs font-bold flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-200 dark:border-cream-200/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-200 dark:border-cream-200/10 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
