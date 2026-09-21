import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStatsStrip } from '../components/home/TrustStatsStrip';
import { CategoryCarousel } from '../components/home/CategoryCarousel';
import { AIVisualizerAndEstimatorRow } from '../components/home/AIVisualizerAndEstimatorRow';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { BrandMarquee } from '../components/home/BrandMarquee';
import { SiteVisitSection } from '../components/home/SiteVisitSection';
import { TestimonialsAndShowroomRow } from '../components/home/TestimonialsAndShowroomRow';
import { AISearchKnowledgeSection } from '../components/home/AISearchKnowledgeSection';
import { SEOHead } from '../components/common/SEOHead';

export const HomePage: React.FC = () => {
  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is the best interior designer in Sikar, Rajasthan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shree Shyam Interior is recognized as the leading turnkey interior design studio in Sikar, Rajasthan with over 15 years of craftsmanship, 500+ completed projects, 10-year warranty, 45-day guaranteed handover, and 100% genuine certified materials.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the average cost of interior design in Sikar per square foot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Turnkey residential interiors in Sikar range from ₹1,200 to ₹2,200 per sq ft. Custom modular kitchens start from ₹1.85 Lakhs, designer false ceilings from ₹95 per sq ft, and modern wardrobes from ₹1,400 per sq ft.'
          }
        },
        {
          '@type': 'Question',
          name: 'What interior design services does Shree Shyam Interior provide in Sikar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shree Shyam Interior offers 7 dedicated turnkey services in Sikar: Turnkey Home Interiors, Modular Kitchens, Bedroom Interior Design, Living Room & TV Units, Modern Wardrobes, False Ceiling, and Commercial Office Interiors.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does a turnkey home interior project take in Sikar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A turnkey residential interior project in Sikar takes 45 to 60 working days from 3D layout sign-off to keys handover. Modular kitchens take 21 to 30 days.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where is Shree Shyam Interior located in Sikar and how can I book a free consultation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The experience center is at Piprali Road, Near Railway Overbridge, Sikar, Rajasthan 332001. Free in-person consultations with laser measurement and physical material swatches can be booked online or by calling +91 98765 43210.'
          }
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Shree Shyam Interior | Interior Designer in Sikar, Rajasthan"
        description="Award-winning interior designer in Sikar, Rajasthan. Turnkey home interior design, custom modular kitchens, luxury bedroom suites, wardrobes, false ceilings & office interiors with 100% genuine certified materials."
        keywords="Interior Designer in Sikar, Interior Design in Sikar, Home Interior Designer in Sikar, Modular Kitchen in Sikar, Bedroom Interior Design in Sikar, Living Room Interior Design in Sikar, Office Interior Designer in Sikar, Wardrobe Design in Sikar, False Ceiling Design in Sikar, Residential Interior Design in Sikar, Commercial Interior Design in Sikar"
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />

      {/* 1. Full-Screen Premium Hero */}
      <HeroSection />

      {/* 2. Trust Statistics Floating Strip */}
      <TrustStatsStrip />

      {/* 3. Explore Our World (8 Clean Visual Category Cards) */}
      <CategoryCarousel />

      {/* 4. AI Room Visualizer + Instant Cost Estimate (Side-by-Side 2-Card Row) */}
      <AIVisualizerAndEstimatorRow />

      {/* 5. Featured Projects (3 Cards with Filter Chips) */}
      <FeaturedProjectsSection />

      {/* 6. Top Brands We Deal In (8 Brands Grid) */}
      <BrandMarquee />

      {/* 7. Book a Free Site Visit (Wide Banner with Consultant & Checkpoints) */}
      <SiteVisitSection />

      {/* 8. AI Search & Answer Engine Optimization Knowledge Guide (AEO / SCO) */}
      <AISearchKnowledgeSection />

      {/* 9. Client Testimonials + Sikar Showroom Location (Side-by-Side 2-Card Row) */}
      <TestimonialsAndShowroomRow />
    </div>
  );
};
