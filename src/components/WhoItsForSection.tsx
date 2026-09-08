import React from 'react';
import { ArrowRight, Heart, Users, Sparkles, Dog } from 'lucide-react';
import { PageRoute } from '../types';
import { useLocale } from '../context/LocaleContext';

interface WhoItsForProps {
  onNavigate: (route: PageRoute) => void;
  onSelectCategory?: (category: string) => void;
}

export const WhoItsForSection: React.FC<WhoItsForProps> = ({ onNavigate, onSelectCategory }) => {
  const { formatPrice } = useLocale();

  const categories = [
    {
      id: 'couple',
      title: 'Couples & Weddings',
      tag: 'Signature 7.9"',
      usdPrice: 159,
      subtitle: 'Full standing 7.9" dual figurine for anniversaries, proposals, and weddings.',
      route: '/custom-couple-figurine' as PageRoute,
      imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=85',
      icon: Heart,
    },
    {
      id: 'pet',
      title: 'Pet Figures',
      tag: 'Specialized 2.8"',
      usdPrice: 89,
      subtitle: 'Dedicated 2.8" keepsake capturing coat markings, ears, and personality.',
      route: '/custom-pet-figurine' as PageRoute,
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85',
      icon: Dog,
    },
    {
      id: 'single',
      title: 'Half-Body Portraits',
      tag: 'Compact 2.4"',
      usdPrice: 79,
      subtitle: 'Compact 2.4" portrait bust ideal for study desks, nightstands, and thoughtful gifts.',
      route: '/custom-3d-figurine' as PageRoute,
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
      icon: Sparkles,
    },
    {
      id: 'family',
      title: 'Single & Family Standing',
      tag: 'Full Standing 7.9"',
      usdPrice: 119,
      subtitle: '7.9" full-body figurines for solo achievements, graduations, or multi-person family groups.',
      route: '/custom-family-figurine' as PageRoute,
      imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=85',
      icon: Users,
    },
  ];

  const handleCardClick = (cat: typeof categories[0]) => {
    if (onSelectCategory) {
      onSelectCategory(cat.id);
    }
    onNavigate(cat.route);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="choose-keepsake-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Direct Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Choose Your Keepsake
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Select your category to start. 3D digital proof approval and solid walnut display base included with every order.
          </p>
        </div>

        {/* 4 Clean, Spacious Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onClick={() => handleCardClick(cat)}
                className="group relative rounded-2xl overflow-hidden bg-[#F5F1EE] border border-[#EAE4DD] shadow-2xs hover:border-[#D1C7BD] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image frame */}
                <div className="aspect-4/3 overflow-hidden relative bg-[#E2D9D0]">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    {cat.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#FDFCFB]/95 backdrop-blur-xs text-[#1A1A1A] text-[11px] font-bold px-2.5 py-1 rounded shadow-xs">
                    From {formatPrice(cat.usdPrice)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-xl font-light text-[#1A1A1A] group-hover:text-[#8C7A66] transition-colors flex items-center justify-between">
                      <span>{cat.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666] mt-2 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EAE4DD] flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#8C7A66]">
                    <span>Customize Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
