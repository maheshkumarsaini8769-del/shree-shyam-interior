import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStatsStrip } from '../components/home/TrustStatsStrip';
import { CategoryCarousel } from '../components/home/CategoryCarousel';
import { AIVisualizerAndEstimatorRow } from '../components/home/AIVisualizerAndEstimatorRow';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { BrandMarquee } from '../components/home/BrandMarquee';
import { SiteVisitSection } from '../components/home/SiteVisitSection';
import { TestimonialsAndShowroomRow } from '../components/home/TestimonialsAndShowroomRow';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
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

      {/* 8. Client Testimonials + Sikar Showroom Location (Side-by-Side 2-Card Row) */}
      <TestimonialsAndShowroomRow />
    </div>
  );
};
