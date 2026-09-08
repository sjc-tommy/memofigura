import React from 'react';
import { ShieldCheck, Sparkles, Sliders, Palette, CheckCircle2 } from 'lucide-react';

export const FiguroValueProps: React.FC = () => {
  const valueCards = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#8C7A66]" />,
      title: '8K Industrial Micro-Layer Detail',
      desc: 'Printed using medical-grade stereolithography at 0.025mm layer resolution. No rough plastic lines or hollow feel—smooth, dense, and solid.',
    },
    {
      icon: <Sliders className="w-6 h-6 text-[#8C7A66]" />,
      title: '100% Fully Customizable',
      desc: 'Want to combine two separate photos? Swap an outfit or adjust a pose? Our master 3D artists composite and adapt any details you request.',
    },
    {
      icon: <Palette className="w-6 h-6 text-[#8C7A66]" />,
      title: 'Artisan Hand-Detailed Paint',
      desc: 'Every figurine is meticulously painted by miniature artists capturing realistic skin gradients, fabric weaves, and distinctive pet fur nuances.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#8C7A66]" />,
      title: 'Risk-Free 3D Proof Approval',
      desc: 'You inspect interactive 3D proof renders before we physically print. Request unlimited revisions or get a full refund if not delighted.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4DD]" id="value-propositions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Uncompromising Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Why Figuro Stands Apart
          </h2>
          <p className="mt-4 text-[16px] text-[#666]">
            Unlike cheap novelty bobbleheads or mass 3D prints, every Figuro is an individual fine-art sculpture engineered to last for generations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#FAF9F6] border border-[#EAE4DD] hover:border-[#8C7A66] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE4DD] flex items-center justify-center mb-5 shadow-2xs">
                  {card.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2.5">
                  {card.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Figuro Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
