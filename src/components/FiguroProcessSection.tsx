import React from 'react';
import { UploadCloud, PenTool, CheckSquare, Layers, PackageCheck, ArrowRight } from 'lucide-react';

interface FiguroProcessSectionProps {
  onStartClick: () => void;
}

export const FiguroProcessSection: React.FC<FiguroProcessSectionProps> = ({
  onStartClick,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Upload Your Photo',
      desc: 'Submit your favorite smartphone photo, candid snapshot, or wedding picture. Our team checks clarity free of charge.',
      icon: <UploadCloud className="w-6 h-6 text-[#8C7A66]" />,
    },
    {
      num: '02',
      title: '3D Master Sculpting',
      desc: 'Our digital sculptors hand-craft every contour, hair strand, eye shape, and clothing wrinkle into a precise 3D model.',
      icon: <PenTool className="w-6 h-6 text-[#8C7A66]" />,
    },
    {
      num: '03',
      title: 'Approve Your 3D Proof',
      desc: 'We send you interactive 3D digital proof renders. Enjoy unlimited free revisions—we never print until you say YES!',
      icon: <CheckSquare className="w-6 h-6 text-[#8C7A66]" />,
    },
    {
      num: '04',
      title: '8K DLP 3D Print & Paint',
      desc: 'Printed at 0.025mm micro-layer precision in solid composite resin, followed by painstaking hand-detailing by seasoned artists.',
      icon: <Layers className="w-6 h-6 text-[#8C7A66]" />,
    },
    {
      num: '05',
      title: 'Shock-Proof Foam Delivery',
      desc: 'Encased inside custom laser-cut shock-absorbent foam and shipped with fully tracked express delivery to your doorstep.',
      icon: <PackageCheck className="w-6 h-6 text-[#8C7A66]" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EAE4DD]" id="how-it-works-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Craftsmanship Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight">
            From Photo To Figurine: How It Works
          </h2>
          <p className="mt-4 text-[16px] text-[#666]">
            Every Figuro figurine is individually sculpted from scratch. Here is our transparent journey from your digital photo to a handheld masterpiece.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-[#EAE4DD] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#EAE4DD] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-serif text-2xl font-light text-[#D1C7BD] group-hover:text-[#8C7A66] transition-colors">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#F3EEE9] flex items-center justify-between text-[11px] text-[#8C7A66] font-semibold uppercase tracking-wider">
                <span>Step {idx + 1} of 5</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A66]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onStartClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Start Your Figurine Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-[#888] mt-3">
            No risk: 100% money-back guarantee before 3D printing begins.
          </p>
        </div>

      </div>
    </section>
  );
};
