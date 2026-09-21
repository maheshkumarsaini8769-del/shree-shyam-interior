import React, { useState, useEffect } from 'react';
import { FolderTree, Plus, Edit2, Trash2, X, Upload, Layers } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { ProductCategory, Product } from '../../types/product';
import { useToast } from '../../context/ToastContext';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<ProductCategory | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<ProductCategory>>({
    name: '',
    slug: '',
    tagline: '',
    image: '',
    itemCount: 0
  });

  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cats, prods] = await Promise.all([
        apiService.getCategories(),
        apiService.getProducts()
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch {
      showToast('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCat(null);
    setFormData({
      name: '',
      slug: '',
      tagline: '',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      itemCount: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: ProductCategory) => {
    setEditingCat(cat);
    setFormData({ ...cat });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await apiService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      showToast('Image uploaded', 'success');
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    const slug =
      formData.slug?.trim() ||
      formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const payload = {
      ...formData,
      slug
    };

    try {
      if (editingCat) {
        const updated = await apiService.updateCategory(editingCat.id, payload);
        setCategories((prev) => prev.map((c) => (c.id === editingCat.id ? updated : c)));
        showToast('Category updated', 'success');
      } else {
        const created = await apiService.createCategory(payload);
        setCategories((prev) => [...prev, created]);
        showToast('Category created', 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save category', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;

    try {
      await apiService.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
      showToast('Category deleted', 'success');
    } catch {
      showToast('Failed to delete category', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Product Categories Showcase
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Organize materials into "Explore Our World" carousel & catalog filters
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const liveProductCount = products.filter(
            (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
          ).length;

          return (
            <div
              key={cat.id || cat.slug}
              className="bg-white dark:bg-[#121720] rounded-2xl border border-cream-200 dark:border-cream-200/10 overflow-hidden shadow-soft flex flex-col justify-between group hover:shadow-card transition-all"
            >
              <div>
                <div className="h-40 bg-cream-100 dark:bg-[#1A212C] relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-forest-950/80 text-copper-300 text-[10px] font-bold backdrop-blur-md">
                    {liveProductCount} items
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm text-forest-950 dark:text-cream-50">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50 font-mono block mb-1.5">
                    slug: /{cat.slug}
                  </span>
                  <p className="text-xs text-charcoal-500 dark:text-cream-200/70 line-clamp-2">
                    {cat.tagline || 'Essential architectural finishes and hardware.'}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-cream-100 dark:border-cream-200/10 mt-3 pt-3">
                <span className="text-[10px] text-copper-500 font-semibold uppercase">Active Category</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-charcoal-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                {editingCat ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Architectural Hardware"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. hardware (auto-generated if blank)"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Marketing Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. German Soft-Close Hinges & Concealed Runners"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Cover Photo (URL or File) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
