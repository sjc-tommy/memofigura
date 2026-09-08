import React from 'react';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';

interface OccasionsGiftsSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const OccasionsGiftsSection: React.FC<OccasionsGiftsSectionProps> = ({ onNavigate }) => {
  const occasions = [
    {
      title: 'Weddings & Cake Keepsakes',
      description: 'Recreate their first dance or wedding vow moment in fine ceramic likeness.',
      route: '/wedding-gifts' as PageRoute,
      badge: 'Unforgettable',
    },
    {
      title: 'Anniversaries',
      description: 'Mark 1, 5, 10 or 25 years with the moment that started it all engraved in solid walnut.',
      route: '/anniversary-gifts' as PageRoute,
      badge: 'Paper / Wood Milestones',
    },
    {
      title: 'Milestone Birthdays',
      description: 'For parents turning 60, 70, or 80 who say they "have everything they need."',
      route: '/birthday-gifts' as PageRoute,
      badge: 'Generational Tribute',
    },
    {
      title: 'Pet Memorial & Tribute',
      description: 'A quiet, comforting presence to touch and hold when honoring a companion who crossed the rainbow bridge.',
      route: '/pet-memorial' as PageRoute,
      badge: 'Comfort & Remembrance',
    },
    {
      title: "Mother's & Father's Day",
      description: 'Their children or grandchildren in miniature form, perpetually smiling on their desk.',
      route: '/gifts' as PageRoute,
      badge: 'Tears of Joy',
    },
    {
      title: 'Holidays & Christmas',
      description: 'The gift that makes the whole room stop unwrapping and pass it around with awe.',
      route: '/gifts' as PageRoute,
      badge: 'Heirloom Unwrapping',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="occasions-gifts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F3EEE9] border border-[#EAE4DD] text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest mb-3">
            The Art of Meaningful Gifting
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            A Gift They’ll Never Expect
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Not another generic watch, scarf, or standard framed picture. A bespoke sculpture crafted from their most cherished photo.
          </p>
        </div>

        {/* 4 Brand Pillars for Gifting */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#F5F1EE] p-5 rounded-xl border border-[#EAE4DD] text-center">
            <span className="font-serif text-lg font-light text-[#1A1A1A] block">Personal</span>
            <span className="text-xs text-[#777] mt-1 block">Tied to your shared history</span>
          </div>
          <div className="bg-[#F5F1EE] p-5 rounded-xl border border-[#EAE4DD] text-center">
            <span className="font-serif text-lg font-light text-[#1A1A1A] block">Meaningful</span>
            <span className="text-xs text-[#777] mt-1 block">Unlocks deep emotional recall</span>
          </div>
          <div className="bg-[#F5F1EE] p-5 rounded-xl border border-[#EAE4DD] text-center">
            <span className="font-serif text-lg font-light text-[#1A1A1A] block">One-of-a-Kind</span>
            <span className="text-xs text-[#777] mt-1 block">Only one exists in the world</span>
          </div>
          <div className="bg-[#F5F1EE] p-5 rounded-xl border border-[#EAE4DD] text-center">
            <span className="font-serif text-lg font-light text-[#1A1A1A] block">From Their Photo</span>
            <span className="text-xs text-[#777] mt-1 block">Captured in real 3D volume</span>
          </div>
        </div>

        {/* Occasions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occ) => (
            <div
              key={occ.title}
              onClick={() => onNavigate(occ.route)}
              className="bg-[#F5F1EE] rounded-2xl p-6 border border-[#EAE4DD] hover:border-[#D1C7BD] transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#8C7A66] bg-[#FDFCFB] px-2.5 py-1 rounded mb-3 border border-[#EAE4DD]">
                  {occ.badge}
                </span>
                <h3 className="font-serif text-xl font-light text-[#1A1A1A] group-hover:text-[#8C7A66] transition-colors">
                  {occ.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666] mt-2 leading-relaxed">
                  {occ.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE4DD] flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                <span>View occasion guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8C7A66]" />
              </div>
            </div>
          ))}
        </div>

        {/* Central CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('/gifts')}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#333] transition-all shadow-md cursor-pointer"
          >
            <span>Explore All Gift Ideas</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
};
