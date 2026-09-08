import React from 'react';
import { 
  Camera, 
  Palette, 
  Eye, 
  Hammer, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  HelpCircle
} from 'lucide-react';
import { PageRoute } from '../types';

interface HowItWorksPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: '01',
      title: 'Upload Your Photo',
      subtitle: 'Any clear smartphone snapshot',
      description: 'Upload your favorite photo of a couple, pet, family, or personal portrait. High resolution and natural lighting work best, but our sculptors regularly work with vintage or candid snapshots. You can also upload multiple angles or separate photos to combine.',
      icon: Camera,
      tips: [
        'Natural lighting without harsh glare produces optimal facial detail',
        'Candid expressions often carry the deepest emotional weight',
        'Multiple reference photos can be submitted for 360° likeness',
      ],
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '02',
      title: '3D Sculpting & Modeling',
      subtitle: 'Artisanal digital craftsmanship',
      description: 'Our digital sculptors study your photograph to interpret facial depth, bone structure, hairstyle, clothing folds, and authentic proportions into a precise 3D CAD polygonal sculpture.',
      icon: Palette,
      tips: [
        'Anatomically accurate facial contouring and posture',
        'Clothing texture and gentle fabric folds recreated by hand',
        'Takes 3–5 business days to craft your digital prototype',
      ],
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '03',
      title: 'Digital Proof Review & Free Adjustments',
      subtitle: '100% Approval Guarantee',
      description: 'You receive high-resolution, 360-degree interactive digital proofs in your inbox. Review the facial likeness and proportions with your loved ones. Request adjustments freely until you are completely thrilled with the piece.',
      icon: Eye,
      tips: [
        'Review from all angles on phone or desktop',
        'Free revisions with our design concierge',
        'Physical production never begins without your explicit sign-off',
      ],
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '04',
      title: 'Precision Crafting & Hand-Finishing',
      subtitle: 'Tactile ceramic feel & solid walnut pedestal',
      description: 'Once approved, your sculpture is produced using high-density architectural composite resin, UV cured for lasting structural stability, hand-detailed for smooth organic touch, and mounted on a solid American walnut base with your custom engraved jeweler’s brass plaque.',
      icon: Hammer,
      tips: [
        'Dense, weighted feel — never hollow or brittle',
        'Hand-applied protective matte sealant resists UV fading',
        'Organic American walnut wood with polished brass plaque',
      ],
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    },
    {
      step: '05',
      title: 'Heirloom Packaging & Insured Delivery',
      subtitle: 'Ready to be unwrapped or gifted',
      description: 'Your finished sculpture is cradled in custom-cut protective foam suspension within an embossed MemoFigura gift box. Shipped via insured trackable courier directly to your door.',
      icon: Truck,
      tips: [
        'Luxury presentation box suitable for milestone unwrapping',
        'Shock-absorbing custom foam prevents transit damage',
        'Real-time courier tracking sent via email & SMS',
      ],
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
            The MemoFigura Process
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            How a Photo Becomes a Tactile Memory
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            We bridge digital memory and physical permanence with patience, artisan care, and full approval transparency at every step.
          </p>
        </div>

        {/* 5 Steps Sequence */}
        <div className="space-y-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Image (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="aspect-4/3 rounded-2xl overflow-hidden relative shadow-inner bg-stone-100 border border-[#E8E2D9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1917] text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                      Step {item.step}
                    </div>
                  </div>
                </div>

                {/* Narrative (7 cols) */}
                <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#8B4513]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8E2D9] space-y-2">
                    <span className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block">
                      Quality Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#57534E]">
                      {item.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-20 text-center bg-[#1C1917] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            Ready to See Your Memory in 3D?
          </h2>
          <p className="mt-3 text-stone-300 max-w-xl mx-auto text-sm sm:text-base">
            Upload your photo today. Inspect your custom 3D proof renders before we start physical sculpting.
          </p>
          <div className="mt-8">
            <button
              onClick={() => onNavigate('/custom-3d-figurine')}
              className="px-8 py-4 bg-white hover:bg-stone-100 text-[#1C1917] font-semibold rounded-full text-sm transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Create Your Figurine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
