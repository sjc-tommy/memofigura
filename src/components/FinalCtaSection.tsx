import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { analytics } from '../services/analytics';

interface FinalCtaSectionProps {
  onCreateYours: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCreateYours }) => {
  const handleClick = () => {
    analytics.clickCreateYours('final_cta_section');
    onCreateYours();
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#1A1A1A] text-[#FDFCFB] overflow-hidden" id="final-cta-section">
      {/* Background mood aesthetic */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-luminosity"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=80")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/90 to-[#1A1A1A]/80 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#242424] border border-[#333] text-[11px] font-bold text-[#D1C7BD] uppercase tracking-widest mb-8">
          Made for Living Spaces, Mantels & Generations
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-white">
          Turn a Memory Into <br className="hidden sm:inline" />
          <span className="italic font-serif font-light text-[#D1C7BD]">Something You Can Hold.</span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-[#D1C7BD] max-w-2xl mx-auto leading-relaxed">
          Upload your favorite photo today. Review your 3D digital sculpt proof in 3–5 days with unlimited free adjustments.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleClick}
            id="final-cta-button"
            className="w-full sm:w-auto px-10 py-5 bg-[#FDFCFB] hover:bg-[#F3EEE9] text-[#1A1A1A] text-[12px] font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Create Your Figurine</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-[#333] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] uppercase tracking-wider text-[#AFA092]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D1C7BD]" />
            <span>Digital Proof Approval First</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D1C7BD]" />
            <span>Strict Private Photo Handling</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D1C7BD]" />
            <span>Solid Walnut Base Included</span>
          </div>
        </div>

      </div>
    </section>
  );
};
