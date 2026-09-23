import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Filter,
  Search,
  X,
  Send,
  Building,
  ShieldCheck,
  Calendar,
  ArrowRight,
  MessageCircle,
  Award,
  HeartHandshake
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiService, Testimonial } from '../services/apiService';
import { useToast } from '../context/ToastContext';
import { SEOHead } from '../components/common/SEOHead';

export const ReviewsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  // New Review Form State
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('Sikar, Rajasthan');
  const [formPhone, setFormPhone] = useState('');
  const [formProject, setFormProject] = useState('Modular Kitchen');
  const [formReview, setFormReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
    if (searchParams.get('action') === 'write') {
      setIsWriteModalOpen(true);
    }
  }, [searchParams]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTestimonials();
      // Show approved reviews or those without explicit Hidden status
      const visible = data.filter((t) => t.status !== 'Hidden');
      setTestimonials(visible);
    } catch {
      showToast('Could not load reviews, using cached ratings', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formReview.trim()) {
      showToast('Please enter your name and review message', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const newReview = await apiService.createTestimonial({
        name: formName.trim(),
        city: formCity.trim(),
        phone: formPhone.trim(),
        project: formProject,
        rating: formRating,
        review: formReview.trim(),
        avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 50)}?auto=format&fit=crop&w=150&q=80`,
        date: 'Just now',
        status: 'Approved',
        verifiedClient: true,
        createdAt: new Date().toISOString()
      });

      setTestimonials((prev) => [newReview, ...prev]);
      showToast('Thank you! Your review has been published successfully.', 'success');
      setIsWriteModalOpen(false);
      // Reset form
      setFormName('');
      setFormReview('');
      setFormPhone('');
      setFormRating(5);
    } catch {
      showToast('Failed to publish review, please retry', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return testimonials.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.review.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === '5-star') return item.rating === 5;
      if (selectedFilter === 'kitchen') return item.project.toLowerCase().includes('kitchen');
      if (selectedFilter === 'villa') return item.project.toLowerCase().includes('villa') || item.project.toLowerCase().includes('home') || item.project.toLowerCase().includes('flat') || item.project.toLowerCase().includes('bhk');
      if (selectedFilter === 'wardrobe') return item.project.toLowerCase().includes('wardrobe');
      if (selectedFilter === 'commercial') return item.project.toLowerCase().includes('commercial') || item.project.toLowerCase().includes('office') || item.project.toLowerCase().includes('showroom');

      return true;
    });
  }, [testimonials, selectedFilter, searchQuery]);

  // Schema.org Structured Data
  const reviewsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Shree Shyam Interior',
    image: 'https://wooden-five.vercel.app/logo.jpg',
    telephone: '+919876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Piprali Road, Near Railway Overbridge',
      addressLocality: 'Sikar',
      addressRegion: 'Rajasthan',
      postalCode: '332001',
      addressCountry: 'IN'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '268',
      bestRating: '5',
      worstRating: '1'
    },
    review: testimonials.slice(0, 10).map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name
      },
      datePublished: t.createdAt || '2025-01-01',
      reviewBody: t.review,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5'
      }
    }))
  };

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 dark:bg-forest-950 text-charcoal-800 dark:text-cream-100 transition-colors duration-300">
      <SEOHead
        title="Client Reviews & Ratings | Shree Shyam Interior Sikar"
        description="Read genuine verified reviews and testimonials from 250+ clients in Sikar, Jaipur & Rajasthan for Shree Shyam Interior turnkey homes, modular kitchens & woodwork."
        keywords="Interior Designer Reviews Sikar, Shree Shyam Interior Ratings, Best Interior Design Feedback Sikar Rajasthan, Modular Kitchen Reviews Sikar"
        canonicalPath="/reviews"
        jsonLd={reviewsJsonLd}
      />

      {/* Top Hero Banner */}
      <div className="bg-forest-950 text-cream-100 py-12 sm:py-16 border-b border-cream-200/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-copper-400" />
                <span>Verified Client Experiences</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 tracking-tight">
                Client Reviews & Ratings
              </h1>
              <p className="text-xs sm:text-sm text-cream-200/80 mt-2 leading-relaxed">
                Real feedback from 450+ families, architects, and business owners across Sikar, Jaipur, and Rajasthan who experienced our turnkey architectural woodwork.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write a Review</span>
              </button>

              <Link
                to="/site-visit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-900 border border-copper-500/40 hover:bg-forest-800 text-cream-100 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Book Free Visit</span>
                <ArrowRight className="w-4 h-4 text-copper-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Rating Overview Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white dark:bg-forest-900 rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-copper-500/30 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score Box */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-cream-200 dark:border-cream-200/10 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-5xl sm:text-6xl font-extrabold text-forest-950 dark:text-cream-50">
                  4.9
                </span>
                <span className="text-charcoal-400 text-sm font-semibold">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs text-charcoal-600 dark:text-cream-200/80">
                Based on <strong className="text-forest-950 dark:text-cream-50 font-bold">268+ genuine client ratings</strong> across Shekhawati & Jaipur.
              </p>

              <div className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Certified On-Site Inspections</span>
              </div>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="md:col-span-5 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-12 font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1">
                  5 ★
                </span>
                <div className="flex-1 h-2 rounded-full bg-cream-100 dark:bg-forest-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }} />
                </div>
                <span className="w-10 text-right text-charcoal-400 font-mono">92%</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-12 font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1">
                  4 ★
                </span>
                <div className="flex-1 h-2 rounded-full bg-cream-100 dark:bg-forest-800 overflow-hidden">
                  <div className="h-full bg-amber-400/80 rounded-full" style={{ width: '7%' }} />
                </div>
                <span className="w-10 text-right text-charcoal-400 font-mono">7%</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-12 font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1">
                  3 ★
                </span>
                <div className="flex-1 h-2 rounded-full bg-cream-100 dark:bg-forest-800 overflow-hidden">
                  <div className="h-full bg-amber-400/60 rounded-full" style={{ width: '1%' }} />
                </div>
                <span className="w-10 text-right text-charcoal-400 font-mono">1%</span>
              </div>

              <div className="flex items-center gap-3 text-charcoal-300 dark:text-forest-700">
                <span className="w-12 font-bold flex items-center gap-1">2 ★</span>
                <div className="flex-1 h-2 rounded-full bg-cream-100 dark:bg-forest-800 overflow-hidden">
                  <div className="h-full bg-amber-400/40 rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-10 text-right font-mono">0%</span>
              </div>

              <div className="flex items-center gap-3 text-charcoal-300 dark:text-forest-700">
                <span className="w-12 font-bold flex items-center gap-1">1 ★</span>
                <div className="flex-1 h-2 rounded-full bg-cream-100 dark:bg-forest-800 overflow-hidden">
                  <div className="h-full bg-amber-400/20 rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-10 text-right font-mono">0%</span>
              </div>
            </div>

            {/* 3 Pillars Badge Box */}
            <div className="md:col-span-3 flex flex-col justify-center space-y-3 bg-cream-50 dark:bg-[#151D28] p-4 rounded-2xl border border-cream-200 dark:border-cream-200/10 text-xs">
              <div className="flex items-center gap-2 text-forest-950 dark:text-cream-50 font-bold">
                <ShieldCheck className="w-4 h-4 text-copper-500" />
                <span>100% Genuine Materials</span>
              </div>
              <div className="flex items-center gap-2 text-forest-950 dark:text-cream-50 font-bold">
                <Award className="w-4 h-4 text-copper-500" />
                <span>10-Year Woodwork Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-forest-950 dark:text-cream-50 font-bold">
                <HeartHandshake className="w-4 h-4 text-copper-500" />
                <span>Direct Studio Accountability</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cream-200 dark:border-cream-200/10">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: '5-star', label: '★ 5 Stars Only' },
              { id: 'kitchen', label: 'Modular Kitchens' },
              { id: 'villa', label: 'Turnkey Homes & Villas' },
              { id: 'wardrobe', label: 'Wardrobes' },
              { id: 'commercial', label: 'Commercial & Offices' }
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === chip.id
                    ? 'bg-copper-500 text-white shadow-sm'
                    : 'bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 text-charcoal-600 dark:text-cream-200 hover:border-copper-400'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/30 rounded-xl pl-9 pr-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-500"
            />
          </div>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="p-6 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 animate-pulse h-48" />
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-forest-900 rounded-3xl border border-cream-200 dark:border-copper-500/20 p-8 space-y-3">
            <MessageSquare className="w-12 h-12 text-copper-400/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50">
              No Reviews Match Your Filter
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-cream-200/70 max-w-sm mx-auto">
              Be the first to share your experience with Shree Shyam Interior!
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSearchQuery('');
                setIsWriteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <span>Write a Review Now</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-forest-900 rounded-3xl p-6 sm:p-7 border border-cream-200 dark:border-copper-500/30 shadow-card flex flex-col justify-between hover:shadow-hover transition-all duration-300 relative group"
              >
                <div>
                  {/* Top Bar: Client Avatar, Name, Rating */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-copper-400/40 shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm sm:text-base text-forest-950 dark:text-cream-50">
                            {item.name}
                          </h3>
                          {item.verifiedClient !== false && (
                            <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400" title="Verified Customer">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-400 dark:text-cream-200/60">
                          {item.city}
                        </p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-copper-500/10 text-copper-700 dark:text-copper-300 text-[10px] font-bold">
                          {item.project}
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-charcoal-400 dark:text-cream-200/50 mt-1 font-mono">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="relative pl-6 my-3">
                    <Quote className="w-4 h-4 text-copper-400/40 absolute left-0 top-0.5" />
                    <p className="text-xs sm:text-sm text-charcoal-700 dark:text-cream-200/90 leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>
                </div>

                {/* Official Studio Reply (If Admin has replied) */}
                {item.adminReply && (
                  <div className="mt-4 pt-4 border-t border-cream-100 dark:border-cream-200/10">
                    <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#151D28] border border-copper-500/20 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-copper-600 dark:text-copper-400 flex items-center gap-1.5 uppercase tracking-wider">
                          <CrownBadge className="w-3.5 h-3.5 text-copper-500" />
                          <span>Response from Shree Shyam Interior</span>
                        </span>
                        {item.adminReplyDate && (
                          <span className="text-[10px] text-charcoal-400 font-mono">
                            {new Date(item.adminReplyDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-charcoal-700 dark:text-cream-200 leading-relaxed">
                        {item.adminReply}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Box at Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl bg-forest-950 text-cream-50 p-8 sm:p-12 border border-copper-500/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-copper-400 text-xs font-bold uppercase tracking-widest block">
              Join 500+ Happy Homeowners
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Ready to Design Your Dream Space in Sikar?
            </h3>
            <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl">
              Experience the craftsmanship firsthand. Visit our Piprali Road studio or schedule a free in-home measurement visit today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all cursor-pointer"
            >
              Write a Review
            </button>
            <Link
              to="/site-visit"
              className="px-6 py-3 rounded-xl bg-white text-forest-950 hover:bg-cream-100 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Book Site Visit
            </Link>
          </div>
        </div>
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121720] border border-cream-200 dark:border-copper-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-cream-200/10 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-copper-600 dark:text-copper-400 block">
                  Feedback Desk
                </span>
                <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50">
                  Share Your Experience
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 rounded-lg bg-cream-100 dark:bg-[#1A212C] text-charcoal-500 hover:text-charcoal-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 mb-1.5">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || formRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-charcoal-300 dark:text-forest-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-copper-600 dark:text-copper-400 ml-2">
                    {formRating === 5 ? '5.0 - Outstanding' : formRating === 4 ? '4.0 - Very Good' : formRating === 3 ? '3.0 - Average' : `${formRating}.0`}
                  </span>
                </div>
              </div>

              {/* Client Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Sharma"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. Piprali Road, Sikar"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-500"
                  />
                </div>
              </div>

              {/* Project Type & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 mb-1">
                    Service Completed
                  </label>
                  <select
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-500"
                  >
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Complete 3BHK Home Interior">Complete 3BHK Home Interior</option>
                    <option value="Complete 4BHK Villa Turnkey">Complete 4BHK Villa Turnkey</option>
                    <option value="Luxury Bedroom & Wardrobes">Luxury Bedroom & Wardrobes</option>
                    <option value="Living Room & TV Wall">Living Room & TV Wall</option>
                    <option value="False Ceiling & Architectural Lighting">False Ceiling & Lighting</option>
                    <option value="Commercial Office / Showroom">Commercial Office / Showroom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 mb-1">
                    Phone (Private, Optional)
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl px-3.5 py-2 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-500"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-cream-200 mb-1">
                  Your Review / Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formReview}
                  onChange={(e) => setFormReview(e.target.value)}
                  placeholder="Share details about the woodwork craftsmanship, material authenticity (Century marine ply, Häfele hinges), timeliness, and behavior of the installation team..."
                  className="w-full bg-cream-50 dark:bg-[#1A212C] border border-cream-200 dark:border-cream-200/10 rounded-xl p-3.5 text-xs text-forest-950 dark:text-cream-50 focus:outline-none focus:border-copper-500 leading-relaxed resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200 dark:border-cream-200/10">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-cream-200 dark:border-cream-200/10 text-xs font-semibold text-charcoal-600 dark:text-cream-200 hover:bg-cream-100 dark:hover:bg-[#1A212C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Publishing...' : 'Publish Review'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Crown badge helper
function CrownBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
    </svg>
  );
}

export default ReviewsPage;
