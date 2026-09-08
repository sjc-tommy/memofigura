import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck, ArrowRight } from 'lucide-react';
import { analytics } from '../services/analytics';

interface PhotoPrivacyBannerProps {
  onLearnMore: () => void;
}

export const PhotoPrivacyBanner: React.FC<PhotoPrivacyBannerProps> = ({ onLearnMore }) => {
  const handleClick = () => {
    analytics.clickPhotoPrivacy('privacy_banner');
    onLearnMore();
  };

  return (
    <section className="py-16 lg:py-24 bg-[#1A1A1A] text-[#FDFCFB] relative overflow-hidden" id="photo-privacy-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Shield Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#262626] border border-[#333] text-[#D1C7BD] mb-6 shadow-xs">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
          Your Photos Stay Private
        </h2>

        <p className="text-base sm:text-lg text-[#D1C7BD] max-w-3xl mx-auto leading-relaxed">
          Your uploaded photos are used only to review, design, produce, quality-check, ship, and support your order. We never use customer photos for public marketing without your permission.
        </p>

        {/* 3 Privacy Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-[#242424] rounded-2xl p-6 border border-[#333]">
            <div className="flex items-center gap-2.5 text-white font-serif font-light text-base mb-2">
              <Lock className="w-4 h-4 text-[#D1C7BD] shrink-0" />
              <span>Encrypted Storage</span>
            </div>
            <p className="text-xs text-[#999] leading-relaxed">
              Files are stored on 256-bit encrypted drives accessible solely by your dedicated artisan.
            </p>
          </div>

          <div className="bg-[#242424] rounded-2xl p-6 border border-[#333]">
            <div className="flex items-center gap-2.5 text-white font-serif font-light text-base mb-2">
              <EyeOff className="w-4 h-4 text-[#D1C7BD] shrink-0" />
              <span>No Marketing Usage</span>
            </div>
            <p className="text-xs text-[#999] leading-relaxed">
              We never post your photographs or finished pieces on social media or ads without your written consent.
            </p>
          </div>

          <div className="bg-[#242424] rounded-2xl p-6 border border-[#333]">
            <div className="flex items-center gap-2.5 text-white font-serif font-light text-base mb-2">
              <FileCheck className="w-4 h-4 text-[#D1C7BD] shrink-0" />
              <span>Right to Deletion</span>
            </div>
            <p className="text-xs text-[#999] leading-relaxed">
              Request immediate permanent purge of your source photos anytime following order delivery.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D1C7BD] hover:text-white border-b border-[#D1C7BD] pb-0.5 cursor-pointer"
          >
            <span>Learn About Photo Privacy & Data Handling</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
