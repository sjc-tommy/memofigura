import React, { useState } from 'react';
import { Star, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { REVIEWS_DATA } from '../data/mockData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReviews = selectedCategory === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.category === selectedCategory);

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-2">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Loved by People Who Wanted to Keep a Memory Close
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Authentic words from customers who trusted us with their most cherished people and moments.
          </p>

          {/* Rating Summary Bar */}
          <div className="mt-8 inline-flex items-center gap-3 bg-[#F5F1EE] px-5 py-2.5 rounded-full border border-[#EAE4DD] shadow-2xs">
            <div className="flex text-[#8C7A66]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#8C7A66]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1A1A1A]">4.95 / 5.0</span>
            <span className="text-xs text-[#777]">• Verified Customer Proof Ratings</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F5F1EE] rounded-2xl border border-[#EAE4DD] shadow-2xs hover:border-[#D1C7BD] transition-all overflow-hidden flex flex-col"
            >
              {/* Customer photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4DD]">
                <img
                  src={review.photoUrl}
                  alt={`${review.author} custom MemoFigura keepsake`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {review.occasion}
                </span>
                {review.verifiedPurchase && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] bg-[#FDFCFB]/95 px-2.5 py-1 rounded-full shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A66]" />
                    <span>Verified Order</span>
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Star rating */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-[#8C7A66] text-[#8C7A66]'
                            : 'fill-[#E4DCD3] text-[#E4DCD3]'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-[#1A1A1A]">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#999]" data-no-translate>
                    {review.date}
                  </span>
                </div>

                {/* Review content */}
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mb-3">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed flex-1">
                  {review.comment}
                </p>

                {/* Buyer name & country */}
                <div className="mt-6 pt-5 border-t border-[#EAE4DD]">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#1A1A1A]" data-no-translate>
                    {review.author}
                  </h4>
                  <p className="mt-1 text-[11px] text-[#777] flex items-center gap-1.5">
                    <span aria-hidden="true">{review.countryFlag}</span>
                    <span>{review.country}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Principle Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#8C7A66]">
            All stories and feedback are collected from verified purchasers after digital proof sign-off.
          </p>
        </div>

      </div>
    </section>
  );
};
