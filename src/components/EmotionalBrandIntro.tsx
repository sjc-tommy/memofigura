import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const EmotionalBrandIntro: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD] relative overflow-hidden" id="emotional-intro-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F3EEE9] text-[#8C7A66] mb-6 border border-[#EAE4DD]">
          <Heart className="w-4 h-4 fill-[#8C7A66]/30" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight mb-8">
          Made to Stay Close
        </h2>

        <div className="space-y-6 text-base sm:text-lg lg:text-xl text-[#555] leading-relaxed font-normal">
          <p className="font-serif italic text-xl sm:text-2xl text-[#8C7A66] max-w-2xl mx-auto">
            "Some memories deserve more than a place in your camera roll."
          </p>

          <p className="max-w-2xl mx-auto text-[#777] text-xs sm:text-sm tracking-widest uppercase font-medium">
            A person you love • A beloved pet • A wedding day • A family moment
          </p>

          <p className="max-w-3xl mx-auto text-[#555] text-base sm:text-lg">
            MemoFigura turns meaningful photographs into beautifully crafted 3D keepsakes — giving your memories a form you can hold, display, and treasure forever.
          </p>
        </div>

        {/* Tactile detail indicators */}
        <div className="mt-14 pt-10 border-t border-[#EAE4DD] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] block">100%</span>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66] mt-1 block">Custom Sculpted</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] block">Proof</span>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66] mt-1 block">Approval Checkpoint</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] block">Walnut</span>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66] mt-1 block">Solid Hardwood Bases</span>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] block">Private</span>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66] mt-1 block">Zero Public Marketing</span>
          </div>
        </div>

      </div>
    </section>
  );
};
