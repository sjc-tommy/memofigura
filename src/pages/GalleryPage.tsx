import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, MapPin, Quote } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../data/mockData';
import { PageRoute } from '../types';

interface GalleryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'couple' | 'family' | 'pet' | 'memorial'>('all');
  const [comparisonState, setComparisonState] = useState<Record<string, 'photo' | 'figurine'>>({});

  const filteredItems = filter === 'all'
    ? SHOWCASE_ITEMS
    : SHOWCASE_ITEMS.filter((item) => item.category === filter);

  const toggleView = (id: string, view: 'photo' | 'figurine') => {
    setComparisonState((prev) => ({ ...prev, [id]: view }));
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
            Real Transformations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            Customer Transformation Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Explore how everyday smartphone photographs are turned into cherished 3D heirloom sculptures. Every piece is unique to its owner.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {(['all', 'couple', 'family', 'pet', 'memorial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer capitalize ${
                  filter === cat
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat === 'all' ? 'All Stories' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const currentView = comparisonState[item.id] || 'figurine';

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image View Stage with Toggle */}
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={currentView === 'photo' ? item.photoUrl : item.figurineUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {/* View Switcher Overlay */}
                    <div className="absolute top-3 left-3 flex bg-black/60 backdrop-blur-xs p-1 rounded-full text-white text-[10px] font-medium border border-white/10">
                      <button
                        onClick={() => toggleView(item.id, 'photo')}
                        className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                          currentView === 'photo' ? 'bg-white text-black font-bold' : 'hover:text-stone-200'
                        }`}
                      >
                        Original Photo
                      </button>
                      <button
                        onClick={() => toggleView(item.id, 'figurine')}
                        className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                          currentView === 'figurine' ? 'bg-[#8B4513] text-white font-bold' : 'hover:text-stone-200'
                        }`}
                      >
                        3D Figurine
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      {item.occasion}
                    </div>
                  </div>

                  {/* Narrative details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#78716C]">
                      <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
                      {item.story}
                    </p>

                    {/* Quote */}
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1917] italic font-serif">
                      "{item.customerQuote}"
                      <span className="block not-italic font-sans font-semibold text-[11px] text-[#78716C] mt-1">
                        — {item.customerName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onNavigate('/custom-3d-figurine')}
                    className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#1C1917] text-[#1C1917] hover:text-white border border-[#E8E2D9] hover:border-[#1C1917] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Create One Like This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D9] max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
            Have a Favorite Photo Waiting in Your Camera Roll?
          </h2>
          <p className="text-sm text-[#57534E] max-w-lg mx-auto">
            Upload it now. We provide free 3D sculpt digital proof renders in 3–5 days with unlimited adjustments.
          </p>
          <button
            onClick={() => onNavigate('/custom-3d-figurine')}
            className="px-8 py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white rounded-full font-medium text-sm transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Your Figurine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
