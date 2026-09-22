import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Share2,
  ChevronRight,
  MessageCircle,
  Calculator,
  Compass
} from 'lucide-react';
import { blogPosts, BLOG_CATEGORIES, BlogCategory, BlogPost } from '../data/blogData';
import { SEOHead } from '../components/common/SEOHead';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post: first post or first filtered post
  const featuredPost: BlogPost | undefined = filteredPosts.length > 0 ? filteredPosts[0] : undefined;
  const gridPosts: BlogPost[] = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  // Schema.org Blog & CollectionPage
  const blogJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Shree Shyam Interior Design Blog & Inspiration Hub',
      description: 'Interior design ideas, modular kitchen tips, bedroom styles, and cost guides for homeowners in Sikar and Rajasthan.',
      url: 'https://wooden-five.vercel.app/blog',
      publisher: {
        '@type': 'HomeAndConstructionBusiness',
        name: 'Shree Shyam Interior',
        logo: {
          '@type': 'ImageObject',
          url: 'https://wooden-five.vercel.app/logo.png'
        }
      },
      blogPost: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `https://wooden-five.vercel.app/blog/${post.slug}`,
        datePublished: '2026-03-01T08:00:00+05:30',
        author: {
          '@type': 'Person',
          name: post.author.name
        },
        image: post.image
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://wooden-five.vercel.app/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog & Design Ideas',
          item: 'https://wooden-five.vercel.app/blog'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#14251F] pt-24 pb-20 selection:bg-[#C68A43]/20">
      <SEOHead
        title="Interior Design Ideas, Modular Kitchen & Home Decor Blog | Shree Shyam Interior Sikar"
        description="Explore expert interior design guides, modular kitchen trends, bedroom styling, false ceiling tips, and budgeting advice tailored for homes in Sikar, Rajasthan."
        canonical="https://wooden-five.vercel.app/blog"
        keywords="interior design blog Sikar, modular kitchen ideas Rajasthan, home interior trends Sikar, living room design tips, bedroom decor ideas, Shree Shyam Interior blog"
        jsonLd={blogJsonLd}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#C68A43] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#14251F] font-medium">Design Ideas & Blog</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C68A43]/10 border border-[#C68A43]/20 text-[#C68A43] text-xs font-semibold tracking-wider uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Design Journal & Inspiration Hub
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#14251F] font-bold tracking-tight mb-4">
            Interior Design Ideas & Guides for <span className="italic text-[#C68A43]">Sikar Homes</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Practical advice, material selection guides, modular kitchen blueprints, and aesthetic inspiration crafted by Shree Shyam Interior’s master craftsmen and architects in Sikar, Rajasthan.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-10 max-w-4xl mx-auto">
          {/* Live Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interior ideas, modular kitchen tips, wardrobe materials, budgets..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C68A43]/40 focus:border-[#C68A43] text-stone-800 text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-600 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {BLOG_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#14251F] text-white shadow-md'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-[#C68A43] hover:text-[#14251F]'
                  }`}
                >
                  {category}
                  {category === 'All' && (
                    <span className="ml-1.5 opacity-60 text-xs">({blogPosts.length})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/80 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-[#14251F] mb-2">No Articles Found</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
              We couldn’t find any articles matching &quot;{searchQuery}&quot; in &quot;{selectedCategory}&quot;. Try adjusting your search keywords or browse all categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#14251F] text-white text-sm font-medium hover:bg-[#C68A43] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post Card (Only shown if we have at least 1 post and either on 'All' without search or filtered matches) */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <div className="group relative bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden bg-stone-100">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14251F]/90 backdrop-blur-md text-[#F7F5EE] text-xs font-semibold tracking-wide border border-white/20">
                      <Sparkles className="w-3 h-3 text-[#C68A43]" />
                      Featured Guide
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                        <span className="font-semibold text-[#C68A43] uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredPost.publishedDate}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#14251F] group-hover:text-[#C68A43] transition-colors leading-tight mb-4">
                        <Link to={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-stone-600 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium"
                          >
                            <Tag className="w-2.5 h-2.5 text-stone-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#14251F]">{featuredPost.author.name}</p>
                          <p className="text-[11px] text-stone-500">{featuredPost.author.role}</p>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14251F] text-white text-xs font-semibold hover:bg-[#C68A43] transition-colors shadow-sm"
                      >
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid of Remaining Posts */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: (idx % 3) * 0.1 }}
                    className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail Image */}
                      <Link to={`/blog/${post.slug}`} className="block relative h-52 overflow-hidden bg-stone-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#14251F]/80 backdrop-blur-sm text-white text-[11px] font-medium border border-white/10">
                          {post.category}
                        </span>
                      </Link>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.publishedDate}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#14251F] group-hover:text-[#C68A43] transition-colors leading-snug mb-2.5 line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs text-stone-700 font-medium truncate max-w-[120px]">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-xs font-bold text-[#C68A43] group-hover:text-[#14251F] inline-flex items-center gap-1 transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl bg-[#14251F] text-[#F7F5EE] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#C68A43]/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#C68A43]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C68A43]/20 text-[#C68A43] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#C68A43]/30">
              <Sparkles className="w-3 h-3" />
              Turn Ideas Into Reality
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 leading-tight">
              Ready to Design Your Dream Space in Sikar or Rajasthan?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              Whether you need an anti-termite modular kitchen, a bespoke master bedroom wardrobe, or complete turnkey bungalow interiors, our team brings European precision and 10-year warranty guarantee to your doorstep.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="https://wa.me/919414253333?text=Hello%20Shree%20Shyam%20Interior,%20I%20read%20your%20design%20blog%20and%20would%20like%20to%20discuss%20my%20interior%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold shadow-lg transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Discuss on WhatsApp
              </a>

              <Link
                to="/site-visit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C68A43] hover:bg-[#b57a35] text-white text-sm font-semibold shadow-lg transition-all duration-200"
              >
                <Compass className="w-4 h-4" />
                Book Free Site Visit
              </Link>

              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                <Calculator className="w-4 h-4" />
                Calculate Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
