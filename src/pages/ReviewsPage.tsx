import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, Filter, ArrowRight } from 'lucide-react';
import { REVIEWS_DATA } from '../data/mockData';
import { PageRoute } from '../types';

interface ReviewsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.category === filter);

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
            Verified Customer Keepsakes
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            Customer Reviews & Stories
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Authentic experiences from people who trusted us with their most irreplaceable moments.
          </p>

          {/* Rating Badge */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#E8E2D9] shadow-2xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <span className="text-base font-bold text-[#1C1917]">4.95 out of 5</span>
            <span className="text-xs text-[#78716C]">• Based on verified photo proof approvals</span>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['all', 'couple', 'family', 'pet', 'memorial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer capitalize ${
                  filter === cat
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat === 'all' ? 'All Reviews' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] shadow-xs overflow-hidden flex flex-col"
            >
              {/* Customer photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EFEA]">
                <img
                  src={rev.photoUrl}
                  alt={`${rev.author} custom MemoFigura keepsake`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {rev.occasion}
                </span>
                {rev.verifiedPurchase && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-emerald-700 bg-white/95 px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </span>
                )}
              </div>

              <div className="p-7 sm:p-8 flex flex-col flex-1">
                {/* Star rating */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'fill-[#EDE7E0] text-[#EDE7E0]'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 text-sm font-bold text-[#1C1917]">
                      {rev.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-[#A8A29E]" data-no-translate>
                    {rev.date}
                  </span>
                </div>

                {/* Review content */}
                <h3 className="font-serif text-xl font-bold text-[#1C1917] mb-3">
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed flex-1">
                  {rev.comment}
                </p>

                {/* Buyer name & country */}
                <div className="mt-6 pt-5 border-t border-[#F3EFEA]">
                  <h4 className="text-sm font-bold text-[#1C1917]" data-no-translate>
                    {rev.author}
                  </h4>
                  <p className="mt-1 text-xs text-[#78716C] flex items-center gap-1.5">
                    <span aria-hidden="true">{rev.countryFlag}</span>
                    <span>{rev.country}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('/custom-3d-figurine')}
            className="px-8 py-4 bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-sm rounded-full transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <span>Create Your Custom Figurine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
