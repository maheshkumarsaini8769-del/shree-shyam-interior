import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, X, Upload, Star, Eye } from 'lucide-react';
import { apiService, Project } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    category: 'Residential',
    location: 'Sikar, Rajasthan',
    client: '',
    area: '2,800 sq ft',
    budget: '₹28,50,000',
    completionDate: 'November 2024',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: '',
    scope: ['Full Turnkey Carpentry', 'Modular Kitchen', 'Designer Ceilings'],
    materialsUsed: ['CenturyPly Club Prime 710', 'Hettich Sensys Hinges', 'Greenlam High Gloss'],
    featured: true
  });

  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProjects();
      setProjects(data);
    } catch {
      showToast('Failed to load portfolio projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Residential',
      location: 'Sikar, Rajasthan',
      client: 'Private Residence',
      area: '2,500 sq ft',
      budget: '₹25,00,000',
      completionDate: 'Recent',
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      description: 'Turnkey interior execution with factory-calibrated woodwork and ambient lighting.',
      scope: ['Modular Kitchen', 'Wardrobes', 'False Ceiling'],
      materialsUsed: ['CenturyPly', 'Hettich', 'Asian Paints'],
      featured: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'beforeImage' | 'afterImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await apiService.uploadImage(file);
      setFormData((prev) => ({ ...prev, [field]: url }));
      showToast('Image uploaded', 'success');
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    const slug =
      formData.slug?.trim() ||
      formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const payload = {
      ...formData,
      slug
    };

    try {
      if (editingProject) {
        const updated = await apiService.updateProject(editingProject.id, payload);
        setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updated : p)));
        showToast('Project updated successfully', 'success');
      } else {
        const created = await apiService.createProject(payload);
        setProjects((prev) => [created, ...prev]);
        showToast('New project published', 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save project', 'error');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete portfolio project "${title}"?`)) return;

    try {
      await apiService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Project removed', 'success');
    } catch {
      showToast('Failed to delete project', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Portfolio & Completed Projects
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Manage showcase case studies, before/after comparisons, and materials used
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10 overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div className="h-48 relative overflow-hidden bg-cream-100 dark:bg-[#1A212C]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-forest-950/80 text-copper-300 text-[10px] font-bold uppercase backdrop-blur-md">
                  {project.category}
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-copper-500 text-white text-[10px] font-bold shadow-md">
                    ★ Homepage Featured
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 line-clamp-1">
                  {project.title}
                </h3>
                <span className="text-xs text-charcoal-400 dark:text-cream-200/60 block mt-0.5">
                  {project.location} • {project.client}
                </span>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-charcoal-600 dark:text-cream-200/80 pt-3 border-t border-cream-100 dark:border-cream-200/10">
                  <span>Area: {project.area}</span>
                  <span className="text-copper-600 dark:text-copper-400 font-bold">{project.budget}</span>
                </div>

                {project.beforeImage && project.afterImage && (
                  <div className="mt-3 px-2.5 py-1 rounded-lg bg-cream-50 dark:bg-[#1A212C] text-[11px] text-charcoal-500 dark:text-cream-200/70 flex items-center justify-between">
                    <span>Before/After Slider</span>
                    <span className="text-emerald-500 font-bold">Enabled</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-cream-100 dark:border-cream-200/10 mt-2 pt-3">
              <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50 font-mono">
                /{project.slug}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(project)}
                  className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-charcoal-400 hover:text-red-500 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50">
                {editingProject ? 'Edit Portfolio Project' : 'Publish New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Heritage Villa, Sikar"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Residential'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  >
                    <option value="Residential">Residential Villa</option>
                    <option value="Commercial">Commercial Office</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Living Room">Living & Lounge</option>
                    <option value="Penthouse">Luxury Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Piprali Road, Sikar"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Budget / Cost
                  </label>
                  <input
                    type="text"
                    value={formData.budget || ''}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. ₹28,50,000"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  />
                </div>
              </div>

              {/* Cover Photo */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Cover Photo (URL or File) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                  <label className="px-3 py-2 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 text-xs font-bold flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'coverImage')} />
                  </label>
                </div>
              </div>

              {/* Before and After Image URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-cream-50 dark:bg-[#1A212C] rounded-2xl border border-cream-200 dark:border-cream-200/10">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Raw Site "Before" Photo
                  </label>
                  <input
                    type="text"
                    value={formData.beforeImage || ''}
                    onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Finished "After" Photo
                  </label>
                  <input
                    type="text"
                    value={formData.afterImage || ''}
                    onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Case Study Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Architectural overview, client requirements, design layout..."
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredProject"
                  checked={formData.featured ?? true}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-copper-500"
                />
                <label htmlFor="featuredProject" className="text-xs font-bold text-forest-950 dark:text-cream-50 cursor-pointer">
                  Feature on Homepage 3-Card Grid
                </label>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
