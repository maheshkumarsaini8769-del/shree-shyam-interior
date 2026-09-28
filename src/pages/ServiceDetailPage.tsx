import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  Phone,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { SEOHead } from '../components/common/SEOHead';
import { ImageViewer } from '../components/common/ImageViewer';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeViewerImage, setActiveViewerImage] = useState<number | null>(null);

  if (!slug || !servicesData[slug]) {
    return <Navigate to="/services" replace />;
  }

  const service = servicesData[slug];

  // Helper icon selector
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-copper-500" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-copper-500" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-copper-500" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-copper-500" />;
    }
  };

  // Structured Data (JSON-LD)
  const serviceJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.h1,
      serviceType: service.slug,
      description: service.overview,
      provider: {
        '@type': 'HomeAndConstructionBusiness',
        name: 'Shree Shyam Interior',
        url: 'https://wooden-five.vercel.app/',
        telephone: '+919876543210',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Piprali Road, Near Railway Overbridge',
          addressLocality: 'Sikar',
          addressRegion: 'Rajasthan',
          postalCode: '332001',
          addressCountry: 'IN'
        }
      },
      areaServed: {
        '@type': 'City',
        name: 'Sikar'
      },
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          description: `${service.startingPrice} ${service.priceUnit}`
        }
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
          name: 'Services',
          item: 'https://wooden-five.vercel.app/services'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.h1,
          item: `https://wooden-five.vercel.app/services/${service.slug}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800 dark:bg-forest-950 dark:text-cream-100 pt-20 transition-colors">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        canonicalPath={`/services/${service.slug}`}
        ogImage={service.heroImage}
        jsonLd={serviceJsonLd}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white/60 dark:bg-forest-900/60 border-b border-cream-200 dark:border-copper-500/20 py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal-500 dark:text-cream-300/80">
          <Link to="/" className="hover:text-copper-600 dark:hover:text-copper-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-copper-600 dark:hover:text-copper-400 transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 dark:text-cream-50 font-semibold truncate max-w-[200px] sm:max-w-md">
            {service.h1.split('|')[0].trim()}
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading, Tagline, Overview, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper-500/10 border border-copper-500/30 text-copper-700 dark:text-copper-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.badge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest-950 dark:text-cream-50 leading-[1.15]">
                {service.h1}
              </h1>

              <p className="text-sm sm:text-base font-medium text-copper-700 dark:text-copper-400">
                {service.tagline}
              </p>

              <p className="text-sm sm:text-base text-charcoal-600 dark:text-cream-200/90 leading-relaxed">
                {service.overview}
              </p>

              {/* Price & Timeline Pill Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-sm">
                  <span className="text-[11px] font-bold text-charcoal-400 dark:text-cream-300/70 uppercase tracking-wider block">
                    Starting From
                  </span>
                  <span className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                    {service.startingPrice}
                  </span>
                  <span className="text-[10px] text-charcoal-500 dark:text-cream-300/80 block">
                    {service.priceUnit}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-sm">
                  <span className="text-[11px] font-bold text-charcoal-400 dark:text-cream-300/70 uppercase tracking-wider block">
                    Timeline
                  </span>
                  <span className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                    {service.estimatedTimeline}
                  </span>
                  <span className="text-[10px] text-charcoal-500 dark:text-cream-300/80 block">
                    Design to Handover
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-sm">
                  <span className="text-[11px] font-bold text-charcoal-400 dark:text-cream-300/70 uppercase tracking-wider block">
                    Assurance
                  </span>
                  <span className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">
                    10-Year
                  </span>
                  <span className="text-[10px] text-charcoal-500 dark:text-cream-300/80 block">
                    Material Warranty
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/site-visit"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-sm uppercase tracking-wider shadow-md transition-transform hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Site Visit in Sikar</span>
                </Link>

                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/30 text-forest-950 dark:text-cream-100 hover:text-copper-600 dark:hover:text-copper-400 font-semibold text-sm shadow-sm transition-colors"
                >
                  <span>Get Instant Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-charcoal-500 dark:text-cream-300/80 pt-1">
                <MapPin className="w-4 h-4 text-copper-500 shrink-0" />
                <span>Serving Sikar, Nawalgarh, Fatehpur, Laxmangarh & all Shekhawati regions</span>
              </div>
            </div>

            {/* Right Column: Hero Visual with Local Alt Text */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-cream-200 dark:border-copper-500/30 group">
                <img
                  src={service.heroImage}
                  alt={`${service.h1} by Shree Shyam Interior Sikar Rajasthan`}
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-copper-300 block mb-1">
                    Live Project in Sikar
                  </span>
                  <p className="font-serif text-sm font-semibold text-cream-100">
                    Crafted with certified CenturyPly & German hardware
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Highlights Grid */}
      <section className="py-14 bg-white dark:bg-forest-900/50 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
              Why Homeowners in Sikar Choose Shree Shyam
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-300 mt-2">
              Uncompromising quality, itemized transparency, and lifelong reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.keyHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-cream-50 dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-sm hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-copper-500/10 border border-copper-500/20 flex items-center justify-center mb-4">
                  {renderIcon(item.icon)}
                </div>
                <h3 className="font-serif text-base font-bold text-forest-950 dark:text-cream-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-600 dark:text-cream-200/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Turnkey Execution Process */}
      <section className="py-16 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-copper-600 dark:text-copper-400">
              Structured Milestones
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 mt-1">
              Our 5-Step Turnkey Execution Workflow
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-300 mt-2">
              Every stage is supervised by an interior architect with zero room for delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {service.workflow.map((step) => (
              <div
                key={step.step}
                className="relative p-5 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#B57731] text-white font-serif font-bold text-sm flex items-center justify-center">
                    0{step.step}
                  </span>
                  <span className="text-[10px] font-bold text-copper-600 dark:text-copper-400 uppercase tracking-wider bg-copper-500/10 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-sm font-bold text-forest-950 dark:text-cream-50 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 dark:text-cream-300/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications & Material Standards */}
      <section className="py-14 bg-white dark:bg-forest-900/50 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
              Material & Engineering Standards
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-300 mt-2">
              We never compromise on internal joinery or unbranded hardware.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-cream-200 dark:border-copper-500/20 shadow-sm bg-cream-50 dark:bg-forest-900">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-forest-950 text-cream-100 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6 w-1/3">Component</th>
                  <th className="py-3 px-4 sm:px-6 w-2/3">Certified Specification & Brand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 dark:divide-copper-500/15">
                {service.specifications.map((spec, i) => (
                  <tr key={i} className="hover:bg-white/60 dark:hover:bg-forest-800/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-forest-950 dark:text-cream-100">
                      {spec.label}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-charcoal-600 dark:text-cream-200/90 font-mono text-xs">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Project Gallery with Semantic Alt Texts */}
      <section className="py-16 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-copper-600 dark:text-copper-400">
                Craftsmanship Showcase
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 mt-1">
                Completed Works & Design Concepts
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-xs font-bold text-copper-600 dark:text-copper-400 hover:underline uppercase tracking-wider"
            >
              <span>View Full Sikar Portfolio</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveViewerImage(i)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-elevated transition-all border border-cream-200 dark:border-copper-500/20"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-cream-50">{img.caption}</p>
                  <span className="text-[10px] text-copper-300">Click to view high-res</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (AI & Google SEO Engine Optimized) */}
      <section className="py-16 bg-white dark:bg-forest-900/50 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-copper-600 dark:text-copper-400">
              Clear Transparent Answers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50 mt-1">
              Frequently Asked Questions About {service.h1.split('|')[0].trim()}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-cream-300 mt-2">
              Everything you need to know about pricing, timelines, materials, and execution in Sikar.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-cream-200 dark:border-copper-500/20 bg-cream-50 dark:bg-forest-900 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-forest-950 dark:text-cream-50 hover:text-copper-600 dark:hover:text-copper-400 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-serif text-sm sm:text-base font-bold">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-copper-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 dark:text-cream-200/90 leading-relaxed border-t border-cream-200/60 dark:border-copper-500/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal Linking: Related Services */}
      <section className="py-14 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 dark:text-cream-50 mb-6">
            Explore Related Interior Solutions in Sikar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {service.relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                to={`/services/${rel.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-sm hover:border-copper-500 hover:shadow-card transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-base font-bold text-forest-950 dark:text-cream-50 group-hover:text-copper-600 dark:group-hover:text-copper-400 transition-colors">
                    {rel.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-copper-500 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-charcoal-500 dark:text-cream-300/80 leading-relaxed">
                  {rel.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Popular Sikar Localities Link Cloud */}
          <div className="mt-8 pt-6 border-t border-cream-200 dark:border-copper-500/15 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-charcoal-400 dark:text-cream-300/70 mr-2">
              Popular Sikar Localities Served:
            </span>
            {service.popularLocalities.map((loc, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-cream-100 dark:bg-forest-800 text-[11px] text-charcoal-700 dark:text-cream-200 font-medium"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action CTA */}
      <section className="py-16 bg-forest-950 text-cream-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-copper-400">
            Start Your Sikar Dream Home
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-cream-50">
            Ready to Design Your Dream Space in Sikar?
          </h2>
          <p className="text-sm sm:text-base text-cream-200/90 max-w-xl mx-auto leading-relaxed">
            Schedule an in-person site visit on Piprali Road or anywhere in Sikar. Our senior designer brings physical material catalogs, laser meters, and turnkey cost estimates at zero charge.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/site-visit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-sm uppercase tracking-wider shadow-glow-copper transition-transform hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Free Site Visit</span>
            </Link>

            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 font-semibold text-sm backdrop-blur-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-copper-400" />
              <span>Call +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fullscreen High-Res Image Viewer Modal */}
      {activeViewerImage !== null && (
        <ImageViewer
          isOpen={true}
          images={service.gallery.map((g) => g.url)}
          initialIndex={activeViewerImage}
          onClose={() => setActiveViewerImage(null)}
          title={service.h1.split('|')[0].trim()}
        />
      )}
    </div>
  );
};
