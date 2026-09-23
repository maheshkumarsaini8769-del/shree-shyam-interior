import React from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Phone,
  Building,
  Hammer,
  BadgeCheck,
  MapPin,
  Clock,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';

export const AboutPage: React.FC = () => {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Shree Shyam Interior Sikar',
    description: 'Learn about Shree Shyam Interior, Sikar’s premier interior architecture and modular kitchen studio delivering turnkey residential and commercial projects across Rajasthan.',
    url: 'https://wooden-five.vercel.app/about',
    mainEntity: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Shree Shyam Interior',
      foundingDate: '2014',
      telephone: '+919876543210',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Piprali Road, Near Railway Overbridge',
        addressLocality: 'Sikar',
        addressRegion: 'Rajasthan',
        postalCode: '332001',
        addressCountry: 'IN'
      }
    }
  };

  const pillars = [
    {
      title: '100% Genuine Marine Grade BWP Plywood',
      desc: 'We strictly reject substandard commercial boards. Every modular carcass and wardrobe unit is engineered using authentic CenturyPly Club Prime or Greenply BWP 710 marine plywood with borer & termite immunity.',
      icon: ShieldCheck
    },
    {
      title: 'German Precision Hardware & Fittings',
      desc: 'Partnered directly with Häfele and Hettich Germany. Every hinge, soft-close drawer runner, and pantry pullout is tested for 200,000 cycles with smooth, silent operation.',
      icon: Award
    },
    {
      title: 'Transparent Itemized BOQ (Zero Hidden Costs)',
      desc: 'No arbitrary lump-sum estimates. We provide crystal-clear Bill of Quantities (BOQ) with transparent per-sq-ft rates, material specifications, and 18% GST itemization.',
      icon: BadgeCheck
    },
    {
      title: 'Dust-Controlled Workshop Fabrication',
      desc: 'Unlike traditional on-site carpentry that creates weeks of dust and disruption, our modular components are precision-cut at our factory workshop and assembled cleanly on site.',
      icon: Hammer
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Laser Measurement & Site Survey',
      desc: 'Our interior architects visit your property in Sikar, Jaipur, or nearby districts with Bosch laser measurement tools to capture millimetre-precise dimensions and evaluate natural lighting.'
    },
    {
      step: '02',
      title: '3D Architectural Renders & Moodboards',
      desc: 'We develop realistic 3D visualizations showing your exact room layout, false ceiling profiles, wardrobe finishes (acrylic, fluted, PU), and custom modular kitchen workflows.'
    },
    {
      step: '03',
      title: 'Precision Fabrication & Quality Checks',
      desc: 'Your modular cabinets, TV units, and panelling are manufactured in a controlled environment using calibrated marine plywood, edge-banding machines, and German hardware fittings.'
    },
    {
      step: '04',
      title: 'Turnkey Installation & 10-Year Warranty',
      desc: 'Our certified master carpenters install your interior within the committed timeline, complete deep cleaning, and hand over your comprehensive 10-year woodwork warranty card.'
    }
  ];

  return (
    <div className="pt-24 pb-28 min-h-screen bg-cream-50 text-charcoal-900 selection:bg-copper-500/20">
      <SEOHead
        title="About Us | Best Interior Designer in Sikar"
        description="Discover the story of Shree Shyam Interior, Sikar’s trusted turnkey interior architecture and modular kitchen studio. 10+ years of excellence, 450+ completed homes, and genuine marine plywood."
        keywords="About Shree Shyam Interior, Best Interior Designer in Sikar, Turnkey Home Interior Sikar, Modular Kitchen Manufacturer Sikar, Piprali Road Interior Showroom"
        canonicalPath="/about"
        jsonLd={aboutJsonLd}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest-950 via-[#151D28] to-forest-950 text-cream-100 py-16 sm:py-20 border-b border-cream-200/10 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-copper-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-copper-500/40 text-copper-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-copper-400" />
            <span>Since 2014 • Sikar, Rajasthan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream-50 tracking-tight leading-tight">
            Crafting Homes With Heart & Architectural Integrity
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-copper-300 mt-3">
            “घर सजाते हैं, दिल से !”
          </p>

          <p className="text-sm sm:text-base text-cream-200/80 mt-4 max-w-3xl font-light leading-relaxed">
            Founded with a vision to bring world-class architectural woodwork and authentic materials to Rajasthan, Shree Shyam Interior has grown from a specialized carpentry workshop into Sikar’s most trusted turnkey interior design studio.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '10+ Years', label: 'Craftsmanship Heritage', sub: 'Established 2014 in Sikar' },
            { value: '450+', label: 'Homes & Villas Designed', sub: 'Across Sikar & Shekhawati' },
            { value: '10-Year', label: 'Woodwork Warranty', sub: 'Comprehensive structural cover' },
            { value: '100%', label: 'Certified Marine Plywood', sub: 'CenturyPly & Greenply BWP' }
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-cream-200 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all text-center"
            >
              <span className="font-serif font-bold text-2xl sm:text-3xl text-copper-600 block">
                {stat.value}
              </span>
              <span className="font-bold text-xs sm:text-sm text-forest-950 mt-1 block">
                {stat.label}
              </span>
              <span className="text-[11px] text-charcoal-400 block mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-copper-600">
              Our Journey & Mission
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 leading-tight">
              Eliminating Compromise From Rajasthan&apos;s Interior Industry
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              For years, homeowners in Sikar, Nawalgarh, and Jaipur faced the same frustrating dilemma: unreliable local contractors who swapped promised BWP plywood for inferior commercial boards, delayed projects by months, and left homeowners with peeling laminates and jammed drawer channels.
            </p>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              <strong>Shree Shyam Interior was born to change this standard forever.</strong> We introduced transparent BOQ contracts, certified material batch numbers, German soft-close architectural hardware, and laser-guided site surveys to ensure that every home we craft stands the test of desert summers, monsoon dampness, and decades of joyful living.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-950 hover:bg-forest-900 text-cream-50 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <span>View Our Completed Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/site-visit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all"
              >
                <span>Book Free Site Visit</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-cream-200 shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Shree Shyam Interior Architectural Living Space"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <span className="text-xs text-copper-300 font-bold uppercase tracking-wider block">
                    Flagship Studio • Sikar
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-cream-50 mt-1">
                    Where Architectural Vision Meets Master Craftsmanship
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-copper-600 block mb-2">
            Why Homeowners Choose Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            The 4 Pillars of Shree Shyam Interior
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-2">
            Every millimeter of woodwork we deliver is bound by our unwavering commitment to quality and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-cream-200 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-copper-500/15 text-copper-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-forest-950">
                  {pillar.title}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4-Step Turnkey Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        <div className="bg-forest-950 text-cream-100 rounded-3xl p-8 sm:p-14 border border-copper-500/30 shadow-elevated">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-copper-400 block mb-2">
              Our Turnkey Execution Method
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
              How We Bring Your Vision To Life
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80 mt-2">
              A structured, stress-free architectural journey from your first laser measurement to final turnkey handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-forest-900/80 border border-cream-200/10 space-y-3 relative group hover:border-copper-500/50 transition-colors"
              >
                <span className="font-mono text-3xl font-black text-copper-400/40 group-hover:text-copper-400 transition-colors block">
                  {step.step}
                </span>
                <h3 className="font-serif font-bold text-base text-cream-50">
                  {step.title}
                </h3>
                <p className="text-xs text-cream-200/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Showroom Visit CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-soft flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-copper-600 block">
              Experience Center in Sikar
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Visit Our Flagship Studio on Piprali Road
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
              Touch certified marine plywood samples, explore Häfele soft-close mechanisms in real-time, test designer wardrobe profiles, and meet our senior interior consultants.
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-charcoal-600 font-medium">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-copper-500" /> Mon-Sun: 9:30 AM – 8:30 PM</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-copper-500" /> +91 98765 43210</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-copper transition-all text-center"
            >
              Contact Studio Desk
            </Link>
            <Link
              to="/site-visit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-950 hover:bg-forest-900 text-cream-50 font-bold text-xs uppercase tracking-wider transition-all text-center"
            >
              Book Free Site Visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
