import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface ComparisonExample {
  id: string;
  title: string;
  category: string;
  photoUrl: string;
  figurineUrl: string;
  highlight: string;
}

const COMPARISONS: ComparisonExample[] = [
  {
    id: 'couple',
    title: 'Beach Proposal & Wedding',
    category: 'Couples & Weddings',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    highlight: 'Accurate lace gown folds, hairstyle curl, and customized walnut anniversary base.',
  },
  {
    id: 'pet',
    title: 'Golden Retriever "Milo"',
    category: 'Pet Companion',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=85',
    highlight: 'Signature head tilt, expressive brown eyes, and distinct chest fur markings.',
  },
  {
    id: 'levitate',
    title: 'Floating Magnetic Figurine',
    category: 'Viral Desk Decor',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    figurineUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
    highlight: 'Suspended in mid-air over illuminated magnetic levitation base with 360° spin.',
  },
];

interface FiguroComparisonSliderProps {
  onCustomizeClick: () => void;
}

export const FiguroComparisonSlider: React.FC<FiguroComparisonSliderProps> = ({
  onCustomizeClick,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage

  const current = COMPARISONS[selectedIdx];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4DD]" id="photo-to-figurine-comparison">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            The Figuro Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] tracking-tight">
            From 2D Photo To 3D Physical Figurine
          </h2>
          <p className="mt-4 text-[16px] text-[#666]">
            Drag the interactive slider below to witness how our 3D master sculptors transform a flat photograph into a tangible heirloom statue.
          </p>

          {/* Example Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {COMPARISONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                  selectedIdx === idx
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#F5F1EE] text-[#555] hover:bg-[#EAE4DD]'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Split Slider */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#EAE4DD] shadow-xl bg-[#F5F1EE]">
          <div className="relative aspect-16/10 sm:aspect-21/9 w-full select-none overflow-hidden">
            
            {/* Background: 3D Figurine Image */}
            <img
              src={current.figurineUrl}
              alt={`${current.title} 3D Figurine`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-black/75 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Finished 3D Figurine
            </span>

            {/* Foreground: Original 2D Photo (clipped by sliderPos) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={current.photoUrl}
                alt={`${current.title} Original Photo`}
                className="absolute inset-y-0 left-0 max-w-none h-full w-full object-cover"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-white/90 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider shadow-sm">
                Original 2D Photo
              </span>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-2xl border-2 border-[#1A1A1A] flex items-center justify-center">
                <div className="flex gap-1">
                  <span className="block w-1 h-3 bg-[#1A1A1A] rounded-full" />
                  <span className="block w-1 h-3 bg-[#1A1A1A] rounded-full" />
                </div>
              </div>
            </div>

            {/* Range Input Slider Covering Area */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Drag to compare before and after"
            />
          </div>

          {/* Details Bar below slider */}
          <div className="p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE4DD]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C7A66]">
                {current.category}
              </span>
              <p className="text-sm font-medium text-[#1A1A1A] mt-0.5">
                {current.highlight}
              </p>
            </div>

            <button
              onClick={onCustomizeClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              <span>Create Yours Like This</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Artisan Bullet Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto text-center">
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE4DD]">
            <span className="text-xl font-bold text-[#1A1A1A] block">0.025mm</span>
            <span className="text-xs text-[#666] mt-1 block">Layer line precision</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE4DD]">
            <span className="text-xl font-bold text-[#1A1A1A] block">100%</span>
            <span className="text-xs text-[#666] mt-1 block">Custom hand-painted</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE4DD]">
            <span className="text-xl font-bold text-[#1A1A1A] block">Unlimited</span>
            <span className="text-xs text-[#666] mt-1 block">Free digital proof revisions</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE4DD]">
            <span className="text-xl font-bold text-[#1A1A1A] block">Durable</span>
            <span className="text-xs text-[#666] mt-1 block">Solid non-hollow composite</span>
          </div>
        </div>

      </div>
    </section>
  );
};
