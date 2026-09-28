import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  UtensilsCrossed,
  Bed,
  Tv,
  DoorClosed,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { SEOHead } from '../components/common/SEOHead';

export const ServicesHubPage: React.FC = () => {
  const serviceList = Object.values(servicesData);

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'home-interior':
        return <Home className="w-6 h-6 text-copper-500" />;
      case 'modular-kitchen':
        return <UtensilsCrossed className="w-6 h-6 text-copper-500" />;
      case 'bedroom-interior':
        return <Bed className="w-6 h-6 text-copper-500" />;
      case 'living-room-interior':
        return <Tv className="w-6 h-6 text-copper-500" />;
      case 'wardrobe':
        return <DoorClosed className="w-6 h-6 text-copper-500" />;
      case 'office-interior':
        return <Briefcase className="w-6 h-6 text-copper-500" />;
      case 'false-ceiling':
      default:
        return <Layers className="w-6 h-6 text-copper-500" />;
    }
  };

  const hubJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Interior Design Services in Sikar by Shree Shyam Interior',
      description: 'Comprehensive turnkey residential and commercial interior design services in Sikar, Rajasthan.',
      itemListElement: serviceList.map((srv, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: srv.h1,
        url: `https://wooden-five.vercel.app/services/${srv.slug}`
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
          name: 'Services',
          item: 'https://wooden-five.vercel.app/services'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800 dark:bg-forest-950 dark:text-cream-100 pt-20 transition-colors">
      <SEOHead
        title="Interior Design Services in Sikar, Rajasthan | Shree Shyam Interior"
        description="Comprehensive turnkey interior design services in Sikar: Turnkey Home Interiors, German Modular Kitchens, Master Bedrooms, Living Rooms, Wardrobes, False Ceilings & Office Design."
        keywords="Interior Design Services in Sikar, Interior Designer in Sikar, Modular Kitchen in Sikar, Home Interior Designer in Sikar, Bedroom Interior Design in Sikar, Office Interior Designer in Sikar"
        canonicalPath="/services"
        jsonLd={hubJsonLd}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white/60 dark:bg-forest-900/60 border-b border-cream-200 dark:border-copper-500/20 py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal-500 dark:text-cream-300/80">
          <Link to="/" className="hover:text-copper-600 dark:hover:text-copper-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 dark:text-cream-50 font-semibold">Services</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="py-14 sm:py-18 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper-600 dark:text-copper-400">
            Turnkey Craftsmanship in Sikar, Rajasthan
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950 dark:text-cream-50 tracking-tight leading-tight">
            Specialized Interior Design Services in Sikar
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 dark:text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            From complete turnkey home interior architecture to precision German modular kitchens and commercial corporate offices, discover how Shree Shyam Interior transforms everyday spaces across Sikar and Shekhawati.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 text-xs font-medium text-charcoal-700 dark:text-cream-200 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-copper-500" />
              10-Year Warranty
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 text-xs font-medium text-charcoal-700 dark:text-cream-200 shadow-sm">
              <Award className="w-3.5 h-3.5 text-copper-500" />
              100% Genuine Brands
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 text-xs font-medium text-charcoal-700 dark:text-cream-200 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-copper-500" />
              45-Day Handover
            </span>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((service) => (
              <article
                key={service.slug}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 shadow-sm hover:shadow-elevated hover:border-copper-500/50 transition-all flex flex-col justify-between"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.heroImage}
                    alt={`${service.h1} by Shree Shyam Interior Sikar`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest-950/70 backdrop-blur-md border border-white/20 text-[11px] font-bold text-cream-100 uppercase tracking-wider">
                    {service.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs text-copper-300 font-medium">Starting from {service.startingPrice}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-copper-500/10 border border-copper-500/20 flex items-center justify-center mb-3">
                      {getServiceIcon(service.slug)}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-forest-950 dark:text-cream-50 group-hover:text-copper-600 dark:group-hover:text-copper-400 transition-colors">
                      {service.h1.split('|')[0].trim()}
                    </h2>
                    <p className="text-xs text-charcoal-500 dark:text-cream-300/80 leading-relaxed mt-2 line-clamp-3">
                      {service.overview}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="pt-2 border-t border-cream-200/60 dark:border-copper-500/10 space-y-1.5">
                    {service.keyHighlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal-600 dark:text-cream-200/80">
                        <Sparkles className="w-3 h-3 text-copper-500 shrink-0" />
                        <span className="truncate">{h.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <div className="pt-2">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-cream-100 dark:bg-forest-800 text-forest-950 dark:text-cream-100 group-hover:bg-[#B57731] group-hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sikar Local Advantage & Consultation CTA */}
      <section className="py-16 bg-white dark:bg-forest-900/50 border-t border-cream-200 dark:border-copper-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-copper-600 dark:text-copper-400">
            Free Consultation in Sikar
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 dark:text-cream-50">
            Need Expert Advice for Your Property?
          </h2>
          <p className="text-sm text-charcoal-600 dark:text-cream-200 max-w-xl mx-auto">
            Book an in-person site inspection in Sikar. Our senior interior architect visits with material catalogues, laser meters, and turnkey cost estimates at zero charge.
          </p>
          <div className="pt-2">
            <Link
              to="/site-visit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <span>Schedule Free Sikar Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
