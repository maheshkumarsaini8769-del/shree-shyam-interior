import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Phone,
  Calculator,
  Calendar,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { faqData, FAQ_CATEGORIES, FAQCategory } from '../data/faqData';
import { SEOHead } from '../components/common/SEOHead';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Filter FAQs based on selected category and search query
  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org FAQPage structured data
  const faqJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
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
          name: 'Frequently Asked Questions',
          item: 'https://wooden-five.vercel.app/faq'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800 dark:bg-forest-950 dark:text-cream-100 pt-20 transition-colors">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Interior Design Sikar"
        description="Find clear answers about turnkey interior design, modular kitchens, bedroom suites, false ceilings, costs per sq ft, materials, and warranties in Sikar, Rajasthan."
        keywords="Interior Design FAQ Sikar, Modular Kitchen Cost Sikar FAQ, Turnkey Home Interior Process, Plywood Warranty Sikar"
        canonicalPath="/faq"
        jsonLd={faqJsonLd}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white/60 dark:bg-forest-900/60 border-b border-cream-200 dark:border-copper-500/20 py-3 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal-500 dark:text-cream-300/80">
          <Link to="/" className="hover:text-copper-600 dark:hover:text-copper-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-charcoal-900 dark:text-cream-50 font-semibold">FAQ</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 border-b border-cream-200 dark:border-copper-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-copper-500/10 border border-copper-500/30 text-copper-700 dark:text-copper-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center & Knowledge Hub</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950 dark:text-cream-50 tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600 dark:text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our turnkey interior design services, modular kitchen engineering, material standards, budgets, and warranties in Sikar, Rajasthan.
          </p>

          {/* Search Input Box */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 text-charcoal-400 dark:text-cream-300/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions by topic (e.g. modular kitchen, price, warranty)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/30 text-sm text-forest-950 dark:text-cream-50 placeholder-charcoal-400 dark:placeholder-cream-300/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-copper-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-charcoal-400 hover:text-charcoal-700 dark:hover:text-cream-100"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <section className="py-14 sm:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-[#B57731] text-white shadow-md'
                    : 'bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 text-charcoal-700 dark:text-cream-200 hover:border-copper-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-charcoal-500 dark:text-cream-300/80">
            <span>Showing {filteredFaqs.length} questions {selectedCategory !== 'All' ? `in "${selectedCategory}"` : ''}</span>
            {searchQuery && <span>Search: "{searchQuery}"</span>}
          </div>

          {/* Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-forest-900 border border-cream-200 dark:border-copper-500/20 space-y-3">
              <HelpCircle className="w-10 h-10 text-copper-500 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-cream-50">No Matching Questions Found</h3>
              <p className="text-xs text-charcoal-500 dark:text-cream-300 max-w-sm mx-auto">
                We couldn't find an answer matching "{searchQuery}". Please reach out directly to our principal consultant.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 px-5 py-2 rounded-xl bg-cream-100 dark:bg-forest-800 text-xs font-bold uppercase tracking-wider text-copper-600 dark:text-copper-400"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <article
                    key={faq.id}
                    className="rounded-2xl border border-cream-200 dark:border-copper-500/20 bg-white dark:bg-forest-900 shadow-sm overflow-hidden transition-all hover:border-copper-500/40"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-forest-950 dark:text-cream-50 hover:text-copper-600 dark:hover:text-copper-400 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-copper-500/10 text-copper-600 dark:text-copper-400 text-xs flex items-center justify-center shrink-0 font-sans font-bold">
                          {index + 1}
                        </span>
                        <h2 className="font-serif text-base sm:text-lg font-bold text-forest-950 dark:text-cream-50">
                          {faq.question}
                        </h2>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-copper-500 shrink-0 transition-transform duration-300 ${
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
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 dark:text-cream-200/90 leading-relaxed border-t border-cream-200/60 dark:border-copper-500/10 space-y-3">
                            <p>{faq.answer}</p>
                            
                            <div className="flex flex-wrap items-center gap-1.5 pt-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-cream-300/70 mr-1">
                                {faq.category} &bull;
                              </span>
                              {faq.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cream-100 dark:bg-forest-800 text-charcoal-600 dark:text-cream-200"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          )}

          {/* Bottom Strong Call To Action Banner */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-cream-100 border border-copper-500/30 text-center space-y-5 shadow-elevated">
            <span className="text-xs font-bold uppercase tracking-widest text-copper-400">
              Personalized Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
              Still Have Questions? Get a Free Consultation
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/90 max-w-xl mx-auto leading-relaxed">
              Every home and commercial project has unique spatial requirements. Talk directly with our principal interior architect in Sikar for personalized guidance and itemized pricing.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B57731] hover:bg-[#9E6526] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-transform hover:scale-105"
              >
                <Calculator className="w-4 h-4" />
                <span>Get a Quote</span>
              </Link>

              <Link
                to="/site-visit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 text-xs font-bold uppercase tracking-wider backdrop-blur-sm transition-colors"
              >
                <Calendar className="w-4 h-4 text-copper-400" />
                <span>Contact Us / Site Visit</span>
              </Link>

              <a
                href="https://wa.me/919876543210?text=Hello%20Shree%20Shyam%20Interior%2C%20I%20have%20a%20question%20about%20interior%20design%20services%20in%20Sikar."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
