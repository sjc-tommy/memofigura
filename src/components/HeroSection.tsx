import React from 'react';
import { ArrowRight, Play, ShieldCheck, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { analytics } from '../services/analytics';

interface HeroSectionProps {
  onCreateYours: () => void;
  onSeeHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCreateYours,
  onSeeHowItWorks,
}) => {
  const handlePrimaryClick = () => {
    analytics.clickCreateYours('hero_primary');
    onCreateYours();
  };

  const handleSecondaryClick = () => {
    analytics.clickHowItWorks('hero_secondary');
    onSeeHowItWorks();
  };

  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-[#FDFCFB] border-b border-[#EAE4DD]" id="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="inline-block px-3.5 py-1.5 bg-[#F3EEE9] border border-[#EAE4DD] rounded-full text-[11px] font-bold uppercase tracking-widest text-[#8C7A66]">
            MemoFigura • Memories Made Tangible
          </div>
        </div>

        {/* H1 & Subtitle */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[64px] font-light text-[#1A1A1A] tracking-tight leading-[1.02]">
            Turn Meaningful Photographs <br className="hidden sm:block" />
            Into <span className="italic font-normal text-[#8C7A66]">Custom 3D Keepsakes</span>
          </h1>

          <p className="mt-6 text-[17px] sm:text-[18px] text-[#555] max-w-2xl mx-auto leading-relaxed font-normal">
            A tangible way to preserve cherished memories of family, pets, milestones, and loved ones. Crafted from your photos, approved via 3D proof, and made to stay close.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <button
              onClick={handlePrimaryClick}
              id="hero-primary-cta"
              className="w-full sm:w-auto bg-[#1A1A1A] text-white px-9 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-[#333] shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Create Your Keepsake</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={handleSecondaryClick}
              id="hero-secondary-cta"
              className="border-b-2 border-[#1A1A1A] pb-1 text-[13px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#8C7A66] hover:border-[#8C7A66] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>See How It Works</span>
            </button>
          </div>

          {/* Minimal Social Proof Avatars */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#D1C7BD] shadow-2xs" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#C4B6AA] shadow-2xs" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#AFA092] shadow-2xs" />
            </div>
            <div className="text-[13px] font-medium text-[#777]">
              <span className="text-[#1A1A1A] font-bold">4,800+</span> memories preserved in 3D
            </div>
          </div>

          {/* 3 Trust Points */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[12px] uppercase tracking-wider text-[#666]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span>Preview before we craft</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span>Photos deleted after design</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span>Detailed artisan finishing</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: Spacious Side-by-Side Transformation */}
        <div className="mt-14 lg:mt-20 max-w-5xl mx-auto">
          <div className="bg-[#F5F1EE] rounded-3xl border border-[#EAE4DD] p-5 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
              
              {/* Left: Original Photo */}
              <div className="relative group">
                <div className="aspect-4/3 rounded-2xl overflow-hidden relative shadow-inner bg-[#E2D9D0]">
                  <img
                    src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85"
                    alt="Original photo from customer phone"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Original Snapshot
                  </div>
                </div>
                <div className="mt-3 text-center sm:text-left">
                  <span className="text-xs font-serif italic text-[#666]">
                    Casual, everyday smartphone photo from camera roll
                  </span>
                </div>
              </div>

              {/* Right: Finished Figurine on Walnut Base */}
              <div className="relative group">
                <div className="aspect-4/3 rounded-2xl overflow-hidden relative shadow-md bg-[#C4B6AA]">
                  <img
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85"
                    alt="Finished handcrafted 3D figurine keepsake on walnut base"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#8C7A66] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-[#D1C7BD]" />
                    <span>Finished 3D Figurine</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#1A1A1A]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Solid Walnut Base
                  </div>
                </div>
                <div className="mt-3 text-center sm:text-left">
                  <span className="text-xs font-serif italic text-[#666]">
                    Sculpted by hand, textured ceramic finish, approved before crafting
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Reassurance Strip */}
            <div className="mt-8 pt-6 border-t border-[#EAE4DD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8C7A66] shrink-0" />
                <span className="font-serif italic text-sm text-[#1A1A1A]">
                  "An anniversary gift she cried over. The likeness in 3D is unbelievable."
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C7A66]">— Sarah & David M.</span>
              </div>
              <button
                onClick={handlePrimaryClick}
                className="font-bold text-[12px] uppercase tracking-widest text-[#1A1A1A] hover:text-[#8C7A66] flex items-center gap-1.5 cursor-pointer border-b-2 border-[#1A1A1A] pb-0.5 shrink-0"
              >
                <span>Turn Your Photo Into A Keepsake</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
