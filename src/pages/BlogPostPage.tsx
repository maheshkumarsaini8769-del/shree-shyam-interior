import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Tag,
  Quote,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Phone,
  Calculator,
  Compass,
  Bookmark
} from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogData';
import { SEOHead } from '../components/common/SEOHead';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  // Find the requested blog post
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <h1 className="text-2xl font-serif font-bold text-[#14251F] mb-3">Article Not Found</h1>
          <p className="text-stone-600 text-sm mb-6">
            The design guide or blog article you are looking for does not exist or may have been updated.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14251F] text-white text-sm font-semibold hover:bg-[#C68A43] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Design Blog
          </Link>
        </div>
      </div>
    );
  }

  // Related posts (same category first, excluding current post, up to 3)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  const currentUrl = `https://wooden-five.vercel.app/blog/${post.slug}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Schema.org BlogPosting
  const blogPostJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: [post.image],
      datePublished: '2026-03-01T08:00:00+05:30',
      dateModified: '2026-03-22T10:00:00+05:30',
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role
      },
      publisher: {
        '@type': 'HomeAndConstructionBusiness',
        name: 'Shree Shyam Interior',
        url: 'https://wooden-five.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://wooden-five.vercel.app/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl
      }
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
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: currentUrl
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#14251F] pt-24 pb-20 selection:bg-[#C68A43]/20">
      <SEOHead
        title={post.seoTitle}
        description={post.seoDescription}
        canonical={currentUrl}
        keywords={post.tags.join(', ')}
        ogImage={post.image}
        jsonLd={blogPostJsonLd}
      />

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-stone-500 mb-8">
          <Link to="/" className="hover:text-[#C68A43] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link to="/blog" className="hover:text-[#C68A43] transition-colors">Design Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#14251F] font-medium truncate max-w-[240px] sm:max-w-xs md:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Header Metadata */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C68A43]/10 text-[#C68A43] font-bold uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {post.publishedDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14251F] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author & Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-stone-200/80">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#C68A43]/30"
              />
              <div>
                <p className="text-sm font-bold text-[#14251F]">{post.author.name}</p>
                <p className="text-xs text-stone-500">{post.author.role} • Shree Shyam Interior</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - ' + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all text-xs font-semibold"
                title="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Banner Image */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-lg mb-10 bg-stone-100 max-h-[480px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center max-h-[480px]"
            loading="eager"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="bg-stone-50 border-l-4 border-[#C68A43] p-5 sm:p-6 rounded-r-2xl mb-10 text-stone-700 text-base sm:text-lg leading-relaxed font-sans italic">
          {post.excerpt}
        </div>

        {/* Article Body Sections */}
        <div className="space-y-10 text-[#14251F]/90 leading-relaxed font-sans">
          {post.sections.map((sec, sIdx) => (
            <section key={sIdx} className="space-y-4">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#14251F] pt-4 border-t border-stone-200/60 first:border-0 first:pt-0">
                  {sec.heading}
                </h2>
              )}

              {sec.subheading && (
                <h3 className="text-base sm:text-lg font-bold text-[#C68A43]">
                  {sec.subheading}
                </h3>
              )}

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.list && sec.list.length > 0 && (
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs my-4 space-y-2.5">
                  {sec.list.map((item, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-3 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C68A43] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.quote && (
                <div className="my-6 relative bg-[#14251F]/5 p-6 rounded-2xl border-l-4 border-[#C68A43]">
                  <Quote className="w-8 h-8 text-[#C68A43]/40 absolute top-4 right-4" />
                  <p className="text-stone-800 font-serif italic text-base sm:text-lg pr-8">
                    &ldquo;{sec.quote}&rdquo;
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags & Footer Metadata */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-2">
              Related Topics:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 hover:bg-[#C68A43]/10 hover:text-[#C68A43] text-stone-600 text-xs font-medium transition-colors"
              >
                <Tag className="w-3 h-3 text-stone-400" />
                {tag}
              </span>
            ))}
          </div>

          {/* Author Bio Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C68A43]"
            />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#14251F]">{post.author.name}</h3>
              <p className="text-xs text-[#C68A43] font-semibold mb-2">{post.author.role}</p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Dedicated to bringing German precision engineering, bespoke carpentry, and climate-resilient interior design to homeowners across Sikar and the Shekhawati region.
              </p>
            </div>
          </div>
        </div>

        {/* Consultation Callout Inside Article */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-[#14251F] to-[#1E3A2F] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C68A43]/20 text-[#C68A43] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Sikar On-Site Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
              Want this design implemented in your home?
            </h3>
            <p className="text-stone-300 text-sm mb-6 max-w-xl">
              Get an accurate quote and free 3D design walkthrough from Shree Shyam Interior. We offer factory pricing, 10-year warranty, and 45-day guaranteed handover.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/site-visit"
                className="px-5 py-2.5 rounded-full bg-[#C68A43] hover:bg-[#b57a35] text-white text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                Book Free Site Visit
              </Link>
              <a
                href="https://wa.me/919414253333?text=Hello%20Shree%20Shyam%20Interior,%20I%20read%20your%20article%20and%20want%20to%20consult%20for%20my%20home."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <Link
                to="/quote"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculate Price
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#14251F]">
                Recommended Articles
              </h2>
              <Link
                to="/blog"
                className="text-xs font-semibold text-[#C68A43] hover:text-[#14251F] inline-flex items-center gap-1 transition-colors"
              >
                View all articles
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <Link to={`/blog/${rel.slug}`} className="block h-44 overflow-hidden bg-stone-100">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-4">
                      <span className="text-[11px] font-bold text-[#C68A43] uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-[#14251F] group-hover:text-[#C68A43] transition-colors line-clamp-2 leading-snug mb-2">
                        <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                    <span className="text-[11px] text-stone-400">{rel.readTime}</span>
                    <Link
                      to={`/blog/${rel.slug}`}
                      className="text-xs font-semibold text-[#14251F] group-hover:text-[#C68A43] inline-flex items-center gap-1"
                    >
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
