import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Edit2,
  Trash2,
  X,
  Star,
  Upload,
  Search,
  MessageCircle,
  CheckCircle2,
  Clock,
  EyeOff,
  CornerDownRight,
  Send,
  Phone,
  Filter,
  Sparkles,
  Award
} from 'lucide-react';
import { apiService, Testimonial } from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  // Reply Modal State
  const [replyingItem, setReplyingItem] = useState<Testimonial | null>(null);
  const [replyText, setReplyText] = useState('');
  const [savingReply, setSavingReply] = useState(false);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<'all' | 'Approved' | 'Pending' | 'Hidden' | 'needs_reply' | 'has_reply'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    city: 'Sikar, Rajasthan',
    phone: '',
    project: '4BHK Villa Turnkey Interior',
    rating: 5,
    review: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'Recent',
    status: 'Approved',
    verifiedClient: true
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
      phone: '',
      project: 'Modular Kitchen & Wardrobe',
      rating: 5,
      review: 'Exceptional craftsmanship and 100% genuine materials. Very transparent quotation.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      date: 'Recent',
      status: 'Approved',
      verifiedClient: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingItem(t);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const openReplyModal = (t: Testimonial) => {
    setReplyingItem(t);
    setReplyText(t.adminReply || '');
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
        const created = await apiService.createTestimonial({
          ...formData,
          createdAt: new Date().toISOString()
        });
        setTestimonials((prev) => [created, ...prev]);
        showToast('Review added', 'success');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save testimonial', 'error');
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'Approved' | 'Pending' | 'Hidden') => {
    try {
      const updated = await apiService.updateTestimonial(id, { status: newStatus });
      setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
      showToast(`Status updated to "${newStatus}"`, 'success');
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleSaveReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingItem) return;
    if (!replyText.trim()) {
      showToast('Please enter your reply text', 'error');
      return;
    }

    try {
      setSavingReply(true);
      const updated = await apiService.updateTestimonial(replyingItem.id, {
        adminReply: replyText.trim(),
        adminReplyDate: new Date().toISOString().split('T')[0]
      });
      setTestimonials((prev) => prev.map((t) => (t.id === replyingItem.id ? updated : t)));
      showToast('Official reply published on review', 'success');
      setReplyingItem(null);
      setReplyText('');
    } catch {
      showToast('Failed to save reply', 'error');
    } finally {
      setSavingReply(false);
    }
  };

  const handleDeleteReply = async (item: Testimonial) => {
    if (!window.confirm('Remove official reply from this review?')) return;
    try {
      const updated = await apiService.updateTestimonial(item.id, {
        adminReply: undefined,
        adminReplyDate: undefined
      });
      setTestimonials((prev) => prev.map((t) => (t.id === item.id ? updated : t)));
      showToast('Reply removed', 'success');
    } catch {
      showToast('Failed to remove reply', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Permanently delete review from "${name}"?`)) return;

    try {
      await apiService.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast('Review removed', 'success');
    } catch {
      showToast('Failed to delete review', 'error');
    }
  };

  // Quick reply preset templates
  const replyTemplates = [
    'Thank you for choosing Shree Shyam Interior! We take immense pride in crafting exceptional spaces for our valued clients.',
    'Thank you for your valuable feedback! Delighted to see your home transformed. Our team is always here for lifetime warranty & support.',
    'Thank you for trusting our modular kitchen craftsmanship! Wishing you many joyous culinary moments in your newly crafted kitchen.',
    'We appreciate your high praise! Delivering 100% genuine materials and zero-compromise finish is our sacred promise.'
  ];

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      // Status filter
      if (statusFilter === 'Approved' && item.status !== 'Approved') return false;
      if (statusFilter === 'Pending' && item.status !== 'Pending') return false;
      if (statusFilter === 'Hidden' && item.status !== 'Hidden') return false;
      if (statusFilter === 'has_reply' && !item.adminReply) return false;
      if (statusFilter === 'needs_reply' && item.adminReply) return false;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesReview = item.review.toLowerCase().includes(q);
        const matchesCity = item.city.toLowerCase().includes(q);
        const matchesProject = item.project.toLowerCase().includes(q);
        const matchesPhone = item.phone ? item.phone.includes(q) : false;
        return matchesName || matchesReview || matchesCity || matchesProject || matchesPhone;
      }
      return true;
    });
  }, [testimonials, statusFilter, searchQuery]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = testimonials.length;
    const fiveStars = testimonials.filter((t) => t.rating === 5).length;
    const replied = testimonials.filter((t) => !!t.adminReply).length;
    const needsReply = total - replied;
    const avg = total > 0 ? (testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / total).toFixed(1) : '5.0';
    return { total, fiveStars, replied, needsReply, avg };
  }, [testimonials]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 text-xs font-bold uppercase tracking-wider">
              Reviews Moderation
            </span>
            <span className="text-xs text-charcoal-400 dark:text-cream-200/50">
              Live on /reviews & Home Page
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
            Client Testimonials & Reviews
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/70 mt-0.5">
            Moderate client reviews, publish official studio responses, manage visibility and client verification
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

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider">Total Reviews</span>
            <MessageSquareQuote className="w-4 h-4 text-copper-500" />
          </div>
          <div className="text-2xl font-bold text-forest-950 dark:text-cream-50 mt-1">
            {stats.total}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Public & verified feedback</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider">Average Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-bold text-forest-950 dark:text-cream-50 mt-1 flex items-center gap-1.5">
            <span>{stats.avg}</span>
            <span className="text-xs text-charcoal-400 font-normal">/ 5.0</span>
          </div>
          <span className="text-[11px] text-copper-600 dark:text-copper-400 font-medium">{stats.fiveStars} perfect 5-star ratings</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider">Official Replies</span>
            <MessageCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-forest-950 dark:text-cream-50 mt-1">
            {stats.replied}
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Reviews with studio reply</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-500 dark:text-cream-200/60 uppercase tracking-wider">Awaiting Reply</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-forest-950 dark:text-cream-50 mt-1">
            {stats.needsReply}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Click "Reply" to respond</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'all'
                ? 'bg-copper-500 text-white shadow-sm'
                : 'text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
            }`}
          >
            All ({testimonials.length})
          </button>
          <button
            onClick={() => setStatusFilter('Approved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'Approved'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
            }`}
          >
            Approved ({testimonials.filter((t) => t.status === 'Approved' || !t.status).length})
          </button>
          <button
            onClick={() => setStatusFilter('Pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'Pending'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
            }`}
          >
            Pending ({testimonials.filter((t) => t.status === 'Pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('needs_reply')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'needs_reply'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
            }`}
          >
            Needs Reply ({stats.needsReply})
          </button>
          <button
            onClick={() => setStatusFilter('Hidden')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'Hidden'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-charcoal-600 dark:text-cream-200/70 hover:bg-cream-100 dark:hover:bg-[#1A212C]'
            }`}
          >
            Hidden ({testimonials.filter((t) => t.status === 'Hidden').length})
          </button>
        </div>

        <div className="relative shrink-0 md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by client, project, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-forest-950 dark:text-cream-50 placeholder-charcoal-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-charcoal-400 text-sm">Loading reviews...</div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#121720] rounded-2xl border border-cream-200 dark:border-cream-200/10 p-6">
          <MessageSquareQuote className="w-10 h-10 text-charcoal-300 dark:text-cream-200/30 mx-auto mb-2" />
          <h4 className="font-bold text-forest-950 dark:text-cream-50 text-sm">No reviews found</h4>
          <p className="text-xs text-charcoal-500 dark:text-cream-200/60 mt-0.5">
            Try adjusting your search query or filter tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTestimonials.map((item) => {
            const status = item.status || 'Approved';
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#121720] border border-cream-200 dark:border-cream-200/10 shadow-soft flex flex-col justify-between transition-all hover:border-copper-500/30"
              >
                <div>
                  {/* Top Bar: Client & Status & Stars */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border border-copper-500/30 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">
                            {item.name}
                          </h4>
                          {item.verifiedClient && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-charcoal-500 dark:text-cream-200/60 block mt-0.5">
                          {item.city} • {item.project}
                        </span>
                        {item.phone && (
                          <div className="flex items-center gap-1 text-[11px] text-charcoal-400 dark:text-cream-200/50 mt-0.5">
                            <Phone className="w-2.5 h-2.5" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating & Status Selector */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                        className={`text-[11px] font-bold rounded-lg px-2 py-0.5 border cursor-pointer ${
                          status === 'Approved'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                            : status === 'Pending'
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
                        }`}
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-charcoal-600 dark:text-cream-200/80 italic leading-relaxed pl-2 border-l-2 border-copper-400/40 my-2">
                    "{item.review}"
                  </p>

                  {/* Official Admin Reply Box */}
                  {item.adminReply ? (
                    <div className="mt-3 p-3 rounded-xl bg-copper-500/5 dark:bg-copper-500/10 border border-copper-500/20 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-copper-600 dark:text-copper-400" />
                          <span className="font-bold text-[11px] uppercase tracking-wider text-copper-700 dark:text-copper-300">
                            👑 Official Studio Reply
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.adminReplyDate && (
                            <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50 mr-1">
                              {item.adminReplyDate}
                            </span>
                          )}
                          <button
                            onClick={() => openReplyModal(item)}
                            title="Edit Reply"
                            className="p-1 rounded text-charcoal-500 hover:text-copper-600 hover:bg-copper-500/10"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteReply(item)}
                            title="Delete Reply"
                            className="p-1 rounded text-charcoal-400 hover:text-rose-500 hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-forest-950 dark:text-cream-100 text-[11px] leading-relaxed">
                        {item.adminReply}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <button
                        onClick={() => openReplyModal(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all border border-blue-200 dark:border-blue-700/40 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply to this Review</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-cream-100 dark:border-cream-200/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50">
                    Date: {item.date || 'Recent'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      title="Edit Review Details"
                      className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-[#1A212C] text-charcoal-600 dark:text-cream-200 hover:text-copper-500"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      title="Delete Review"
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-charcoal-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply Modal */}
      {replyingItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-copper-500" />
                <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                  Reply to Client Review
                </h3>
              </div>
              <button
                onClick={() => setReplyingItem(null)}
                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Review Excerpt */}
            <div className="p-3.5 rounded-xl bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 mb-4 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-forest-950 dark:text-cream-50">
                  {replyingItem.name} ({replyingItem.city})
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: replyingItem.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-charcoal-600 dark:text-cream-200/80 italic line-clamp-2">
                "{replyingItem.review}"
              </p>
            </div>

            {/* Quick Templates */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase text-charcoal-500 dark:text-cream-200/70 mb-1.5">
                Quick Response Templates (Click to fill)
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {replyTemplates.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReplyText(tmpl)}
                    className="w-full text-left p-2 rounded-lg bg-cream-100/60 dark:bg-[#161D27] hover:bg-copper-500/10 text-[11px] text-charcoal-700 dark:text-cream-200 border border-cream-200/60 dark:border-cream-200/5 transition-colors line-clamp-2"
                  >
                    "{tmpl}"
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                  Your Official Studio Response *
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your official response to this client review..."
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3 text-xs text-forest-950 dark:text-cream-50 leading-relaxed"
                />
                <span className="text-[10px] text-charcoal-400 mt-1 block">
                  This reply will be published visibly on the public Reviews page and website.
                </span>
              </div>

              <div className="pt-2 border-t border-cream-200 dark:border-cream-200/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyingItem(null)}
                  className="px-4 py-2 rounded-xl border border-cream-200 dark:border-cream-200/10 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingReply}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{savingReply ? 'Publishing...' : 'Publish Official Reply'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                {editingItem ? 'Edit Review Details' : 'Add Client Testimonial'}
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
                    placeholder="Client full name"
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
                    placeholder="e.g. 4BHK Bungalow Interior"
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
                    <option value={5}>★★★★★ (5 Stars - Outstanding)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-600 dark:text-cream-200/80 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || 'Approved'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50"
                  >
                    <option value="Approved">Approved (Publicly Visible)</option>
                    <option value="Pending">Pending Moderation</option>
                    <option value="Hidden">Hidden (Archived)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="verifiedClient"
                  checked={formData.verifiedClient ?? true}
                  onChange={(e) => setFormData({ ...formData, verifiedClient: e.target.checked })}
                  className="rounded border-cream-300 text-copper-500 focus:ring-copper-400"
                />
                <label htmlFor="verifiedClient" className="text-xs text-forest-950 dark:text-cream-50 font-medium cursor-pointer">
                  Mark as Verified Shree Shyam Interior Client
                </label>
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
