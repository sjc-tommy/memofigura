import React from 'react';
import { ArrowRight, Sparkles, Heart, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { ProductCustomizer } from '../components/ProductCustomizer';
import { CustomerStoriesSection } from '../components/CustomerStoriesSection';
import { FaqAccordion } from '../components/FaqAccordion';
import { CartItem, FigurineCategory, PageRoute } from '../types';

interface CategoryLandingPageProps {
  route: PageRoute;
  onAddToCart: (item: CartItem) => void;
  onInstantCheckout: (item: CartItem) => void;
}

interface PageConfig {
  category: FigurineCategory;
  title: string;
  subtitle: string;
  heroImage: string;
  emotionalHook: string;
  photoTip: string;
  badge: string;
}

export const CategoryLandingPage: React.FC<CategoryLandingPageProps> = ({
  route,
  onAddToCart,
  onInstantCheckout,
}) => {
  const getPageConfig = (): PageConfig => {
    switch (route) {
      case '/custom-pet-figurine':
        return {
          category: 'pet',
          title: 'Custom Pet Figurines From Photos',
          subtitle: 'Hold a permanent three-dimensional sculpture of your dog, cat, or loyal companion.',
          heroImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85',
          emotionalHook: 'Whether they are greeting you at the front door today or waiting across the rainbow bridge, their joyful cocked head and unique coat markings deserve a permanent place in your home.',
          photoTip: 'An eye-level photo showing distinct chest markings, fur pattern, and ear position.',
          badge: '🐾 Beloved Dogs, Cats & Companions',
        };

      case '/custom-couple-figurine':
      case '/wedding-gifts':
      case '/anniversary-gifts':
        return {
          category: 'couple',
          title: 'Custom Couple 3D Figurines From Photos',
          subtitle: 'Turn your favorite candid moment together into a bespoke heirloom sculpture.',
          heroImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
          emotionalHook: 'The quiet smile during a rainy walk, the proposal on the beach, or your first dance under fairy lights. MemoFigura recreates your shared love in physical form.',
          photoTip: 'A photo where both of you are standing or seated together with clear facial expressions.',
          badge: '💍 Anniversaries, Proposals & Weddings',
        };

      case '/custom-family-figurine':
        return {
          category: 'family',
          title: 'Custom Family 3D Figurines',
          subtitle: 'Preserve multiple generations in a tactile, beautifully crafted sculpture.',
          heroImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=85',
          emotionalHook: 'Grandparents, parents, and children together in one heirloom piece that becomes the focal point of your family living room for decades.',
          photoTip: 'Group photos where heights and poses are clear, or multiple individual photos combined.',
          badge: '👨‍👩‍👧 Generational Heirlooms',
        };

      case '/pet-memorial':
        return {
          category: 'memorial',
          title: 'Custom Pet Memorial Keepsakes',
          subtitle: 'A quiet, comforting physical presence to honor a companion who will live forever in your heart.',
          heroImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
          emotionalHook: 'Touching their sculpted ear over morning coffee brings solace that digital screens cannot offer. Handcrafted with reverence and care.',
          photoTip: 'Even an older phone photo works; our sculptors take great care to restore facial volume.',
          badge: '🕊️ Rainbow Bridge Memorial Keepsakes',
        };

      case '/gifts':
      case '/birthday-gifts':
      default:
        return {
          category: 'single',
          title: 'Personalized 3D Photo Gifts & Keepsakes',
          subtitle: 'The one gift they will never expect — sculpted directly from their personal memories.',
          heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
          emotionalHook: 'When people have everything they need, give them a memory they can hold. Unwrapping a 3D likeness of a loved one brings immediate tears and genuine astonishment.',
          photoTip: 'Any clear snapshot that captures their true character, outfit, or milestone victory.',
          badge: '🎁 Meaningful, One-of-a-kind Keepsakes',
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#78716C] mb-8">
          <a href="/" className="hover:text-[#1C1917]">Home</a>
          <span>/</span>
          <span className="text-[#1C1917] font-medium">{config.title}</span>
        </nav>

        {/* Hero Banner with Curated Mood */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1C1917] text-white p-8 sm:p-12 lg:p-16 mb-16 shadow-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ backgroundImage: `url(${config.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917] via-[#1C1917]/80 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-xs text-amber-300 px-3.5 py-1.5 rounded-full border border-white/10 mb-4">
              {config.badge}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {config.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              {config.emotionalHook}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Proof Approval Before Crafting
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Private Photo Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Customizer Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Customize Your {config.title.split(' ')[1] || 'Keepsake'}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2">
              Upload your photo below. We'll send your digital 3D proof for approval before physical crafting.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ProductCustomizer
              initialCategory={config.category}
              onAddToCart={onAddToCart}
              onInstantCheckout={onInstantCheckout}
            />
          </div>
        </div>

        {/* Real Customer Stories Section */}
        <CustomerStoriesSection />

        {/* FAQ Section */}
        <div className="mt-16">
          <FaqAccordion />
        </div>

      </div>
    </div>
  );
};
