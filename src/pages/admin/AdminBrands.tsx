import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit2, Trash2, X, Check, Eye } from 'lucide-react';
import { apiService, Brand } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminBrands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    displayName: '',
    category: '',
    lightClass: 'text-[#00509B]',
    darkClass: 'dark:text-white',
    status: 'Active'
  });

  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBrands();
      setBrands(data);
    } catch {
      showToast('Failed to load brands', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      displayName: '',
      category: 'Architectural Fittings',
      lightClass: 'text-[#00509B]',
      darkClass: 'dark:text-white',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b: Brand) => {
    setEditingBrand(b);
    setFormData({ ...b });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (brand: Brand) => {
    const nextStatus = brand.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const updated = await apiService.updateBrand(brand.id, { status: nextStatus });
      setBrands((prev) => prev.map((b) => (b.id === brand.id ? updated : b)));
      showToast(`${brand.name} set to ${nextStatus}`, 'success');
    } catch {
      showToast('Failed to update brand status', 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    const payload = {
      ...formData,
      displayName: formData.displayName?.trim() || formData.name
    };

    try {
      if (editingBrand) {
        const updated = await apiService.updateBrand(editingBrand.id, payload);
        setBrands((prev) => prev.map((b) => (b.id === editingBrand.id ? updated : b)));
        showToast('Brand updated successfully', 'success');
      } else {
        const created = await apiService.createBrand(payload);
        setBrands((prev) => [...prev, created]);
        showToast('Brand added successfully', 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save brand', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete partner brand "${name}"?`)) return;

    try {
      await apiService.deleteBrand(id);
      setBrands((prev) => prev.filter((b) => b.id !== id));
      showToast('Brand deleted', 'success');
    } catch {
      showToast('Failed to delete brand', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Top Partner Brands Management
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Manage partner logos, category tags, and visibility in "Top Brands We Deal In"
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Brand</span>
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              brand.status === 'Active'
                ? 'bg-white dark:bg-[#121720] border-cream-200 dark:border-cream-200/10 shadow-soft'
                : 'bg-cream-100/50 dark:bg-[#1A212C]/40 border-dashed border-cream-300 dark:border-cream-200/10 opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    brand.status === 'Active'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-charcoal-300 dark:bg-[#1A212C] text-charcoal-600 dark:text-cream-200/50'
                  }`}
                >
                  {brand.status}
                </span>

                <button
                  onClick={() => handleToggleStatus(brand)}
                  className="text-[11px] font-semibold text-copper-600 dark:text-copper-400 hover:underline cursor-pointer"
                >
                  {brand.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>

              {/* Brand Logo / Styling Preview */}
              <div className="py-6 px-4 rounded-xl bg-cream-50 dark:bg-[#0B0F15] border border-cream-200/60 dark:border-cream-200/5 flex flex-col items-center justify-center text-center">
                <div
                  className={`font-black text-xl tracking-tight font-sans transition-colors ${brand.lightClass || 'text-forest-950'} ${brand.darkClass || 'dark:text-white'}`}
                >
                  {brand.displayName || brand.name}
                </div>
                <span className="text-[11px] font-semibold text-charcoal-500 dark:text-cream-200/70 mt-1">
                  {brand.category}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cream-100 dark:border-cream-200/10 flex items-center justify-between">
              <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50 font-mono">
                id: {brand.id}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(brand)}
                  className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(brand.id, brand.name)}
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
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                {editingBrand ? 'Edit Partner Brand' : 'Add Partner Brand'}
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
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hettich"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Display Title (Styling text)
                </label>
                <input
                  type="text"
                  value={formData.displayName || ''}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="e.g. Hettich or CENTURYPLY"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. German Fittings, Marine Plywood, Royale Paints"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Light Mode Color Class
                  </label>
                  <input
                    type="text"
                    value={formData.lightClass || ''}
                    onChange={(e) => setFormData({ ...formData, lightClass: e.target.value })}
                    placeholder="text-[#00509B]"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs font-mono text-forest-950 dark:text-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Dark Mode Color Class
                  </label>
                  <input
                    type="text"
                    value={formData.darkClass || ''}
                    onChange={(e) => setFormData({ ...formData, darkClass: e.target.value })}
                    placeholder="dark:text-white"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs font-mono text-forest-950 dark:text-cream-50"
                  />
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
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
