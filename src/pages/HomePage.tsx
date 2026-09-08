import React from 'react';
import { FiguroMarqueeRibbon } from '../components/FiguroMarqueeRibbon';
import { HeroSection } from '../components/HeroSection';
import { FiguroProductGrid } from '../components/FiguroProductGrid';
import { FiguroComparisonSlider } from '../components/FiguroComparisonSlider';
import { FiguroProcessSection } from '../components/FiguroProcessSection';
import { FiguroValueProps } from '../components/FiguroValueProps';
import { ReviewsSection } from '../components/ReviewsSection';
import { FaqAccordion } from '../components/FaqAccordion';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { AboutSection } from '../components/AboutSection';
import { PageRoute, CartItem } from '../types';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectCategory?: (category: string) => void;
  onAddToCart?: (item: CartItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onSelectCategory,
  onAddToCart 
}) => {
  return (
    <div className="w-full bg-[#FDFCFB]">
      {/* Top Urgency & Guarantee Marquee */}
      <FiguroMarqueeRibbon />

      {/* 1. HERO: Immediate Visual Impact & Value Proposition */}
      <HeroSection
        onCreateYours={() => onNavigate('/custom-3d-figurine')}
        onSeeHowItWorks={() => {
          const el = document.getElementById('how-it-works-process');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else onNavigate('/how-it-works');
        }}
      />

      {/* 2. FIGURO OFFICIAL PRODUCTS CATALOG: Modeled directly after getfiguro.com */}
      <FiguroProductGrid
        onAddToCart={onAddToCart}
        onNavigateToCustomize={() => onNavigate('/custom-3d-figurine')}
      />

      {/* 3. BEFORE & AFTER INTERACTIVE SLIDER: Real photo to 3D figurine transformation */}
      <FiguroComparisonSlider
        onCustomizeClick={() => onNavigate('/custom-3d-figurine')}
      />

      {/* 4. FIGURO 5-STEP PROCESS: From photo to digital proof to 8K DLP print */}
      <FiguroProcessSection
        onStartClick={() => onNavigate('/custom-3d-figurine')}
      />

      {/* 5. VALUE PROPOSITIONS: 8K industrial detail, 100% custom, risk-free proof */}
      <FiguroValueProps />

      {/* 6. ABOUT US: Brand story module */}
      <AboutSection onNavigate={onNavigate} />

      {/* 7. REAL CUSTOMER REVIEWS: Trust & Living-Room Proof */}
      <ReviewsSection />

      {/* 7. FIGURO FAQS: Pre-purchase answers */}
      <FaqAccordion />

      {/* 8. FINAL CLOSING CTA */}
      <FinalCtaSection
        onCreateYours={() => onNavigate('/custom-3d-figurine')}
      />
    </div>
  );
};

