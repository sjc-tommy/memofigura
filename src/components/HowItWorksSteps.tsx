import React from 'react';
import { Upload, Wand2, CheckCircle2, Hammer, PackageCheck, ArrowRight } from 'lucide-react';
import { analytics } from '../services/analytics';

interface HowItWorksStepsProps {
  onCreateYours: () => void;
}

export const HowItWorksSteps: React.FC<HowItWorksStepsProps> = ({ onCreateYours }) => {
  const steps = [
    {
      step: '01',
      title: 'Share Your Photo',
      subtitle: 'Upload 1–3 Clear Photos',
      description: 'Upload 1 to 3 clear snapshots showing the person, pet, outfit, and pose. Casual phone photos with natural lighting work wonderfully.',
      icon: Upload,
      detail: 'No studio photography needed • Natural light is best',
    },
    {
      step: '02',
      title: 'Shaping the Details',
      subtitle: 'Digital Proof Approval',
      highlight: true,
      description: 'Our digital sculptors carefully model facial likeness, posture, and clothing folds. You receive an interactive 3D proof to review with free adjustments.',
      icon: CheckCircle2,
      detail: '100% sign-off guarantee before physical crafting',
    },
    {
      step: '03',
      title: 'Keeping the Moment Close',
      subtitle: 'Delivered to Your Mantel',
      description: 'Your approved design is cured, hand-detailed, mounted on a solid American walnut base, and shipped in custom gift-ready packaging.',
      icon: PackageCheck,
      detail: 'Solid walnut base & protective gift packaging included',
    },
  ];

  const handleCta = () => {
    analytics.clickCreateYours('how_it_works_section');
    onCreateYours();
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Simple 3-Step Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            How Your Photo Becomes a Keepsake
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Zero guesswork. You review and approve your 3D sculpt before physical crafting begins.
          </p>
        </div>

        {/* 3 Spacious Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative transition-all ${
                  item.highlight
                    ? 'bg-[#F3EEE9] border-2 border-[#8C7A66] shadow-sm'
                    : 'bg-[#F5F1EE] border border-[#EAE4DD] shadow-2xs hover:border-[#D1C7BD]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-[#8C7A66]">
                      {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.highlight ? 'bg-[#8C7A66] text-white shadow-xs' : 'bg-[#FDFCFB] text-[#1A1A1A] border border-[#EAE4DD]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A66] block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#555] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#EAE4DD] flex items-center gap-2 text-xs font-medium text-[#777]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A66] shrink-0" />
                  <span>{item.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proof Guarantee Banner */}
        <div className="mt-14 bg-[#F5F1EE] rounded-2xl border border-[#EAE4DD] p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C7A66] mb-1">
              Zero-Risk Guarantee
            </div>
            <h4 className="font-serif font-light text-[#1A1A1A] text-xl">
              100% Digital Proof Approval First
            </h4>
            <p className="text-sm text-[#666] mt-1 max-w-lg leading-relaxed">
              If you aren't completely in love with your 3D digital sculpt, request free adjustments or receive a full 100% refund before crafting begins.
            </p>
          </div>

          <button
            onClick={handleCta}
            className="shrink-0 px-9 py-4 bg-[#1A1A1A] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#333] transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Start Your Keepsake</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
