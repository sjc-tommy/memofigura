import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';
import { useLocale } from '../context/LocaleContext';

interface ProductShowcaseGridProps {
  onNavigateToProduct: (category?: string) => void;
}

interface ShowcaseCard {
  id: string;
  category: string;
  label: string;
  photoUrl: string;
  figurineUrl: string;
  headline: string;
  details: string;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'couple-anniversary',
    category: 'couple',
    label: 'Couples & Weddings',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=85',
    headline: 'Anniversary Embrace in Cannon Beach',
    details: 'Custom sculpted hair details, trenchcoat lapels, and coordinates engraved on walnut.',
  },
  {
    id: 'golden-retriever',
    category: 'pet',
    label: 'Pets & Furry Friends',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=85',
    headline: 'Barnaby: Joyful Head Tilt',
    details: 'Faithfully modeled white fur patch over the eye and gentle resting posture.',
  },
  {
    id: 'family-generations',
    category: 'family',
    label: 'Generations & Family',
    photoUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=700&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=85',
    headline: 'Grandfather & Granddaughter',
    details: 'Vintage spectacles, corduroy vest texture, and comforting smile preserved in 3D.',
  },
  {
    id: 'single-achievement',
    category: 'single',
    label: 'Milestones & Solo',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=85',
    headline: 'Graduation Day Portrait',
    details: 'Cap and gown folds preserved with heirloom distinction and custom brass plaque.',
  },
];

export const ProductShowcaseGrid: React.FC<ProductShowcaseGridProps> = ({ onNavigateToProduct }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'couple' | 'pet' | 'family' | 'single'>('all');
  const { formatPrice } = useLocale();

  const filteredCards = activeTab === 'all' 
    ? SHOWCASE_CARDS 
    : SHOWCASE_CARDS.filter(c => c.category === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="product-showcase-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Real Keepsakes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Your Memories, Made Real
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Each piece is custom designed from scratch from your personal photo. Never mass-produced or templated.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#555] border border-[#EAE4DD] hover:bg-[#F3EEE9]'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setActiveTab('couple')}
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === 'couple'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#555] border border-[#EAE4DD] hover:bg-[#F3EEE9]'
              }`}
            >
              Couples
            </button>
            <button
              onClick={() => setActiveTab('pet')}
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === 'pet'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#555] border border-[#EAE4DD] hover:bg-[#F3EEE9]'
              }`}
            >
              Pets
            </button>
            <button
              onClick={() => setActiveTab('family')}
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === 'family'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#555] border border-[#EAE4DD] hover:bg-[#F3EEE9]'
              }`}
            >
              Families
            </button>
            <button
              onClick={() => setActiveTab('single')}
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === 'single'
                  ? 'bg-[#1A1A1A] text-white font-bold'
                  : 'bg-[#FDFCFB] text-[#555] border border-[#EAE4DD] hover:bg-[#F3EEE9]'
              }`}
            >
              Single Person
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#F5F1EE] rounded-2xl border border-[#EAE4DD] p-6 sm:p-7 shadow-xs hover:border-[#D1C7BD] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Transformation: Photo ↓ Figurine */}
                <div className="grid grid-cols-2 gap-3 relative rounded-xl overflow-hidden bg-[#FDFCFB] p-2 border border-[#EAE4DD]">
                  
                  {/* Left: Original Photo */}
                  <div className="flex flex-col">
                    <div className="aspect-square rounded-lg overflow-hidden relative shadow-inner bg-[#E2D9D0]">
                      <img
                        src={card.photoUrl}
                        alt={`Photo of ${card.headline}`}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-[#1A1A1A]/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                        Photo
                      </div>
                    </div>
                  </div>

                  {/* Right: Final Figurine */}
                  <div className="flex flex-col">
                    <div className="aspect-square rounded-lg overflow-hidden relative shadow-inner bg-[#C4B6AA]">
                      <img
                        src={card.figurineUrl}
                        alt={`Final Figurine of ${card.headline}`}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-[#8C7A66] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                        Keepsake
                      </div>
                    </div>
                  </div>

                  {/* Central subtle arrow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFCFB] border border-[#EAE4DD] rounded-full p-1.5 shadow-sm hidden sm:flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C7A66]" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="mt-5">
                  <span className="text-[10px] font-bold text-[#8C7A66] uppercase tracking-widest block">
                    {card.label}
                  </span>
                  <h3 className="font-serif text-xl font-light text-[#1A1A1A] mt-1">
                    {card.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666] mt-2 leading-relaxed">
                    {card.details}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-[#EAE4DD] flex items-center justify-between">
                <span className="text-xs text-[#777]">From <span data-no-translate>{formatPrice(129)}</span> • Proof included</span>
                <button
                  onClick={() => onNavigateToProduct(card.category)}
                  className="text-xs sm:text-[12px] uppercase tracking-wider font-bold text-[#1A1A1A] hover:text-[#8C7A66] flex items-center gap-1.5 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Customize piece</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom exploration link */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigateToProduct()}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#8C7A66] border-b border-[#1A1A1A] pb-0.5 cursor-pointer"
          >
            <span>Explore all custom figurine options & sizes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
