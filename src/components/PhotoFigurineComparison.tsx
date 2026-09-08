import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../data/mockData';
import { ShowcaseItem } from '../types';

interface PhotoFigurineComparisonProps {
  onSelectCreate?: () => void;
}

export const PhotoFigurineComparison: React.FC<PhotoFigurineComparisonProps> = ({ onSelectCreate }) => {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem>(SHOWCASE_ITEMS[0]);
  const [activeView, setActiveView] = useState<'photo' | 'sculpt' | 'figurine'>('figurine');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [mode, setMode] = useState<'interactive-slider' | 'three-step'>('three-step');

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD] relative overflow-hidden" id="photo-to-figurine-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-block px-3.5 py-1 bg-[#F3EEE9] border border-[#EAE4DD] rounded-full text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest mb-4">
            The Transformation
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            From Your Photo to Something You Can Hold
          </h2>
          
          <p className="text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl mx-auto">
            Every figurine starts with a real photo from your camera roll and becomes a physical, textured keepsake made to display and treasure forever.
          </p>

          {/* Subject Case Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {SHOWCASE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setActiveView('figurine');
                }}
                className={`px-4 py-2 text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                  selectedItem.id === item.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm font-bold'
                    : 'bg-[#FDFCFB] text-[#555] border border-[#EAE4DD] hover:bg-[#F3EEE9]'
                }`}
              >
                {item.title.split('—')[0].split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Transformation Showcase Container */}
        <div className="bg-[#F5F1EE] rounded-3xl border border-[#EAE4DD] shadow-xs overflow-hidden p-6 sm:p-8 lg:p-10">
          
          {/* Mode toggle & Stage Selectors */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE4DD]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest">Stage:</span>
              <div className="inline-flex rounded-md bg-[#FDFCFB] p-1 border border-[#EAE4DD]">
                <button
                  onClick={() => setActiveView('photo')}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeView === 'photo' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  01. Photo
                </button>
                <button
                  onClick={() => setActiveView('sculpt')}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeView === 'sculpt' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  02. 3D Proof
                </button>
                <button
                  onClick={() => setActiveView('figurine')}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeView === 'figurine' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  03. Figurine
                </button>
              </div>
            </div>

            <div className="text-[11px] text-[#666] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span>Customer photo shared with permission</span>
            </div>
          </div>

          {/* Side-by-Side Visual Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
            
            {/* Visual Display (Column 1 - 7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FDFCFB] border border-[#EAE4DD] group shadow-inner">
                {activeView === 'photo' && (
                  <div className="w-full h-full relative">
                    <img
                      src={selectedItem.photoUrl}
                      alt={`Original photo: ${selectedItem.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded font-bold">
                      01. Original Phone Photo
                    </div>
                  </div>
                )}

                {activeView === 'sculpt' && (
                  <div className="w-full h-full relative">
                    <img
                      src={selectedItem.sculptUrl}
                      alt={`3D Sculpt Digital Design: ${selectedItem.title}`}
                      className="w-full h-full object-cover contrast-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#8C7A66] text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded font-bold flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>02. 3D Digital Proof (Sent for Your Approval)</span>
                    </div>
                  </div>
                )}

                {activeView === 'figurine' && (
                  <div className="w-full h-full relative">
                    <img
                      src={selectedItem.figurineUrl}
                      alt={`Final Handcrafted 3D Figurine: ${selectedItem.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D1C7BD]" />
                      <span>03. Handcrafted Tactile Keepsake</span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#FDFCFB]/95 backdrop-blur-xs text-[#1A1A1A] text-[11px] uppercase tracking-wider px-3 py-1.5 rounded border border-[#EAE4DD] font-bold">
                      Walnut Base • Ceramic Finish
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Thumbnail Navigation */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button
                  onClick={() => setActiveView('photo')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeView === 'photo' ? 'border-[#1A1A1A] bg-[#FDFCFB]' : 'border-[#EAE4DD] bg-[#FDFCFB]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <p className="text-[10px] text-[#8C7A66] uppercase font-bold tracking-wider">01. Photo</p>
                  <p className="text-xs font-bold text-[#1A1A1A] truncate">Your picture</p>
                </button>

                <button
                  onClick={() => setActiveView('sculpt')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeView === 'sculpt' ? 'border-[#1A1A1A] bg-[#FDFCFB]' : 'border-[#EAE4DD] bg-[#FDFCFB]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <p className="text-[10px] text-[#8C7A66] uppercase font-bold tracking-wider">02. Proof</p>
                  <p className="text-xs font-bold text-[#1A1A1A] truncate">Review & approve</p>
                </button>

                <button
                  onClick={() => setActiveView('figurine')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeView === 'figurine' ? 'border-[#1A1A1A] bg-[#FDFCFB]' : 'border-[#EAE4DD] bg-[#FDFCFB]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <p className="text-[10px] text-[#8C7A66] uppercase font-bold tracking-wider">03. Keepsake</p>
                  <p className="text-xs font-bold text-[#1A1A1A] truncate">Ready to display</p>
                </button>
              </div>
            </div>

            {/* Emotional Context & Story (Column 2 - 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest">
                  {selectedItem.occasion}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] mt-1 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-[#777]">
                  {selectedItem.subtitle} • {selectedItem.location}
                </p>
              </div>

              {/* Heartfelt Quote */}
              <blockquote className="p-5 rounded-2xl bg-[#FDFCFB] border-l-2 border-[#8C7A66] text-[#1A1A1A] italic text-sm sm:text-base leading-relaxed">
                "{selectedItem.customerQuote}"
                <footer className="not-italic text-[11px] uppercase tracking-wider font-bold text-[#8C7A66] mt-3">
                  — {selectedItem.customerName}
                </footer>
              </blockquote>

              {/* Crafting Notes */}
              <div className="space-y-3 text-xs sm:text-sm text-[#555]">
                <p className="leading-relaxed">
                  <strong className="text-[#1A1A1A] font-bold">Artisan Process: </strong>
                  {selectedItem.story}
                </p>
                
                <ul className="space-y-1.5 text-xs text-[#666]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A66]" />
                    <span>Scrutinized for facial expression and authentic likeness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A66]" />
                    <span>Free unlimited revisions during digital proof review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A66]" />
                    <span>Weighty composite ceramic feel with protective matte finish</span>
                  </li>
                </ul>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  onClick={onSelectCreate}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#333] transition-all shadow-md cursor-pointer"
                >
                  <span>Turn Your Photo Into a Figurine</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
