import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Upload,
  Check,
  Star,
  ExternalLink,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { apiService } from '../../services/apiService';
import { Product, ProductCategory } from '../../types/product';
import { useToast } from '../../context/ToastContext';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'CenturyPly',
    category: 'plywood',
    subCategory: '',
    price: 0,
    unit: 'sq ft',
    isPriceOnQuote: false,
    image: '',
    gallery: [],
    description: '',
    features: [''],
    specifications: {},
    finishes: [],
    applications: ['Modular Kitchens', 'Wardrobes'],
    inStock: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 1
  });

  // Specs editor temporary state
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [finishesInput, setFinishesInput] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prods, cats, brs] = await Promise.all([
        apiService.getProducts(),
        apiService.getCategories(),
        apiService.getBrands()
      ]);
      setProducts(prods);
      setCategories(cats);
      setBrands(brs.map((b) => b.name));
    } catch (e) {
      console.error(e);
      showToast('Error loading products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: brands[0] || 'CenturyPly',
      category: categories[0]?.slug || 'plywood',
      subCategory: '',
      price: 100,
      unit: 'sq ft',
      isPriceOnQuote: false,
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      description: '',
      features: ['Factory calibrated high-durability core', 'Termite and borer resistant guarantee'],
      specifications: { Grade: 'IS:710 Marine', Thickness: '19mm' },
      finishes: ['Matte', 'Gloss'],
      applications: ['Modular Kitchen', 'Wardrobe'],
      inStock: true,
      isBestseller: false,
      rating: 4.9,
      reviewCount: 12
    });
    setFinishesInput('Matte, Gloss');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setFinishesInput((product.finishes || []).join(', '));
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await apiService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      showToast('Image uploaded successfully', 'success');
    } catch {
      showToast('Image upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleAddSpec = () => {
    if (!specKey.trim() || !specVal.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        [specKey.trim()]: specVal.trim()
      }
    }));
    setSpecKey('');
    setSpecVal('');
  };

  const handleRemoveSpec = (key: string) => {
    setFormData((prev) => {
      const next = { ...(prev.specifications || {}) };
      delete next[key];
      return { ...prev, specifications: next };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    const finishesArray = finishesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      finishes: finishesArray
    };

    try {
      if (editingProduct) {
        const updated = await apiService.updateProduct(editingProduct.id, payload);
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)));
        showToast('Product updated successfully', 'success');
      } else {
        const created = await apiService.createProduct(payload);
        setProducts((prev) => [created, ...prev]);
        showToast('New product added to catalog', 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save product', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await apiService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product removed from catalog', 'success');
    } catch {
      showToast('Failed to delete product', 'error');
    }
  };

  // Filtered list
  const filtered = products.filter((p) => {
    const matchesSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesBrand = filterBrand === 'all' || p.brand.toLowerCase() === filterBrand.toLowerCase();
    return matchesSearch && matchesCat && matchesBrand;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest-950 dark:text-cream-50">
            Products & Material Catalog
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Manage genuine plywood, laminates, hardware, lights, prices, and imagery
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-copper-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by material title, brand, or feature..."
            className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl pl-10 pr-4 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
          >
            <option value="all">All Brands ({brands.length})</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#121720] rounded-3xl border border-cream-200 dark:border-cream-200/10 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-cream-50/50 dark:bg-[#1A212C]/50 border-b border-cream-200 dark:border-cream-200/10 text-charcoal-400 dark:text-cream-200/60 uppercase tracking-wider text-[10px]">
                <th className="p-4 font-bold">Image</th>
                <th className="p-4 font-bold">Product Name & Category</th>
                <th className="p-4 font-bold">Brand</th>
                <th className="p-4 font-bold">Price / Unit</th>
                <th className="p-4 font-bold">Stock & Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 dark:divide-cream-200/5">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-cream-50/60 dark:hover:bg-[#1A212C]/40 transition-colors">
                  {/* Thumbnail */}
                  <td className="p-4 w-16">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-cream-100 dark:bg-forest-950 border border-cream-200 dark:border-cream-200/10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Name & Subcategory */}
                  <td className="p-4 max-w-xs">
                    <span className="font-bold text-sm text-forest-950 dark:text-cream-50 line-clamp-1">
                      {product.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-charcoal-400 dark:text-cream-200/60">
                      <span className="capitalize">{product.category}</span>
                      {product.subCategory && <span>• {product.subCategory}</span>}
                    </div>
                  </td>

                  {/* Brand */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-copper-500/10 text-copper-700 dark:text-copper-300 font-bold text-[10px] uppercase tracking-wider border border-copper-500/20">
                      {product.brand}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-mono font-bold text-forest-950 dark:text-cream-50">
                    {product.isPriceOnQuote || !product.price ? (
                      <span className="text-amber-500 text-[11px]">Enquiry</span>
                    ) : (
                      <>
                        ₹{product.price.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] font-normal text-charcoal-400 dark:text-cream-200/60">
                          /{product.unit}
                        </span>
                      </>
                    )}
                  </td>

                  {/* Status Badges */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          product.inStock
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-500/15 text-red-500'
                        }`}
                      >
                        {product.inStock ? 'In Stock' : 'Out'}
                      </span>
                      {product.isBestseller && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                          ★ Best
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500 transition-colors"
                        title="Edit Material"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-charcoal-400 hover:text-red-500 transition-colors"
                        title="Delete Material"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-cream-200/10 mb-6">
              <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50">
                {editingProduct ? 'Edit Architectural Material' : 'Add New Material to Catalog'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-cream-100 dark:bg-[#1A212C] text-charcoal-500 hover:text-forest-950 dark:text-cream-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 max-h-[75vh] overflow-y-auto pr-2">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. CenturyPly Club Prime 710 BWP Plywood"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2.5 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              {/* Brand & Category & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Brand *
                  </label>
                  <select
                    value={formData.brand || 'CenturyPly'}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                    <option value="Shree Shyam Signature">Shree Shyam Signature</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || 'plywood'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.subCategory || ''}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    placeholder="e.g. Marine Grade"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  />
                </div>
              </div>

              {/* Price, Unit & Quotation Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    disabled={formData.isPriceOnQuote}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Unit Measurement
                  </label>
                  <input
                    type="text"
                    value={formData.unit || 'sq ft'}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g. sq ft, piece, set"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  />
                </div>

                <div className="flex items-center gap-2 pb-2">
                  <input
                    type="checkbox"
                    id="priceOnQuote"
                    checked={formData.isPriceOnQuote || false}
                    onChange={(e) => setFormData({ ...formData, isPriceOnQuote: e.target.checked })}
                    className="w-4 h-4 rounded text-copper-500 focus:ring-copper-400"
                  />
                  <label htmlFor="priceOnQuote" className="text-xs font-semibold text-charcoal-600 dark:text-cream-200">
                    Rate on Enquiry
                  </label>
                </div>
              </div>

              {/* Stock and Bestseller Toggles */}
              <div className="flex items-center gap-6 p-3 bg-cream-50 dark:bg-[#1A212C] rounded-xl border border-cream-200 dark:border-cream-200/10">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock ?? true}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-copper-500 rounded"
                  />
                  <span>Mark as In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller ?? false}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="w-4 h-4 text-copper-500 rounded"
                  />
                  <span>Highlight as Bestseller ★</span>
                </label>
              </div>

              {/* Image Input (Upload OR Paste URL) */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Product Image (Upload File or Paste URL) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Paste image URL (https://...)"
                    className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-copper-500/15 text-copper-600 dark:text-copper-400 border border-copper-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-copper-500/25 transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>

                {formData.image && (
                  <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden bg-cream-100 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed architectural specifications and usage details..."
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              {/* Finishes */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Available Finishes (Comma separated)
                </label>
                <input
                  type="text"
                  value={finishesInput}
                  onChange={(e) => setFinishesInput(e.target.value)}
                  placeholder="e.g. Natural Teak, High Gloss White, Matte Obsidian, Gold Bevel"
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-400"
                />
              </div>

              {/* Technical Specifications Key-Values */}
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Technical Specifications Table
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    placeholder="Spec Name (e.g. Warranty)"
                    className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-xs text-forest-950 dark:text-cream-50"
                  />
                  <input
                    type="text"
                    value={specVal}
                    onChange={(e) => setSpecVal(e.target.value)}
                    placeholder="Value (e.g. 25 Years)"
                    className="flex-1 bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3 py-1.5 text-xs text-forest-950 dark:text-cream-50"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3 py-1.5 rounded-xl bg-copper-500 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                {formData.specifications && Object.keys(formData.specifications).length > 0 && (
                  <div className="p-3 bg-cream-50 dark:bg-[#1A212C] rounded-xl border border-cream-200 dark:border-cream-200/10 space-y-1.5">
                    {Object.entries(formData.specifications).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-xs">
                        <span className="text-charcoal-500 dark:text-cream-200/60 font-semibold">{k}:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-950 dark:text-cream-50">{v}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSpec(k)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-cream-200 dark:border-cream-200/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/10 text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-[#1A212C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
