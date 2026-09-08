import React from 'react';
import { Quote, Heart, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../data/mockData';

export const CustomerStoriesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="customer-stories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Real Lives, Real Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Real Photos. Real Stories. Real Memories.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Behind every piece is an unrepeatable life chapter: an anniversary, a final goodbye, or a quiet family hug.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-12 lg:space-y-16">
          {SHOWCASE_ITEMS.map((story, index) => (
            <div
              key={story.id}
              className="bg-[#F5F1EE] rounded-2xl border border-[#EAE4DD] p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Visual Side: Original Photo + Figurine Side-by-Side (5 cols) */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="grid grid-cols-2 gap-3.5 bg-[#FDFCFB] p-3 rounded-xl border border-[#EAE4DD]">
                  
                  {/* Original photo */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="aspect-square rounded-lg overflow-hidden relative shadow-inner bg-[#E2D9D0]">
                      <img
                        src={story.photoUrl}
                        alt={`Original photo: ${story.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-[#1A1A1A]/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                        Photo
                      </div>
                    </div>
                    <span className="text-[10px] text-[#777] text-center font-medium uppercase tracking-wider">Customer upload</span>
                  </div>

                  {/* Finished figurine */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="aspect-square rounded-lg overflow-hidden relative shadow-inner bg-[#C4B6AA]">
                      <img
                        src={story.figurineUrl}
                        alt={`Completed figurine: ${story.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-[#8C7A66] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#D1C7BD]" />
                        <span>Keepsake</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#777] text-center font-medium uppercase tracking-wider">Physical Keepsake</span>
                  </div>

                </div>
              </div>

              {/* Story Narrative (7 cols) */}
              <div className={`lg:col-span-6 space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 text-xs text-[#777]">
                  <span className="inline-flex items-center gap-1 font-bold text-[#8C7A66] uppercase tracking-wider text-[10px]">
                    {story.occasion}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C7A66]" />
                    {story.location}
                  </span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] tracking-tight">
                  {story.title}
                </h3>

                <p className="text-sm text-[#555] leading-relaxed">
                  {story.story}
                </p>

                {/* Direct Quote Card */}
                <div className="bg-[#FDFCFB] rounded-xl p-5 border border-[#EAE4DD] relative mt-4">
                  <Quote className="w-5 h-5 text-[#8C7A66]/40 mb-2" />
                  <p className="font-serif italic text-base sm:text-lg text-[#1A1A1A] leading-snug">
                    "{story.customerQuote}"
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#8C7A66]">
                    — {story.customerName}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
