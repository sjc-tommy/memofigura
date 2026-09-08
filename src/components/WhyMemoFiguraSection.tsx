import React from 'react';
import { Camera, Palette, Hammer, Eye, Sparkles, ShieldCheck } from 'lucide-react';

export const WhyMemoFiguraSection: React.FC = () => {
  const pillars = [
    {
      title: 'Made from Your Photo',
      description: 'Every sculpture starts with your personal photograph. No pre-made templates or stock figures; the likeness is rooted in your real memory.',
      icon: Camera,
    },
    {
      title: 'Personalized Design',
      description: 'Our digital sculptors study your photo to recreate genuine facial features, posture, and clothing folds with anatomical fidelity.',
      icon: Palette,
    },
    {
      title: 'Carefully Crafted',
      description: 'Constructed using dense composite ceramic materials cured for stability and tactile weight, followed by careful surface detailing.',
      icon: Hammer,
    },
    {
      title: 'Preview Before Production',
      description: 'You receive 360° digital proofs in your inbox. Request revisions freely. We never start physical production without your sign-off.',
      icon: Eye,
    },
    {
      title: 'Made to Be Treasured',
      description: 'Mounted on hand-finished solid American walnut bases with optional custom engraved plaques, built to be displayed for decades.',
      icon: Sparkles,
    },
    {
      title: 'Secure Photo Handling',
      description: 'Your uploaded photos are strictly protected on encrypted drives and used solely to fulfill your order. Never sold or shared for public marketing.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="why-memofigura-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Honest Craftsmanship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Why MemoFigura
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            We treat your personal memories with quiet respect, deliberate precision, and reliable transparency.
          </p>
        </div>

        {/* 6 Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#F5F1EE] rounded-2xl p-8 border border-[#EAE4DD] shadow-2xs hover:border-[#D1C7BD] transition-all flex flex-col justify-start"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FDFCFB] border border-[#EAE4DD] flex items-center justify-center text-[#8C7A66] mb-6 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl font-light text-[#1A1A1A] mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
