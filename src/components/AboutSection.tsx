import React from 'react';
import { ArrowRight, Sparkles, Hand, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutSectionProps {
  onNavigate: (route: PageRoute) => void;
}

const ABOUT_POINTS = [
  {
    icon: Sparkles,
    title: 'Made individually',
    text: 'Every piece begins with your photos and story, then is designed, modeled, and finished by hand.',
  },
  {
    icon: Hand,
    title: 'Crafted to feel familiar',
    text: 'We chase the small details that make someone feel like themselves, so each figurine has its own character.',
  },
  {
    icon: ShieldCheck,
    title: 'Photos handled with care',
    text: 'Your photos are used only to review, design, produce, and deliver your order, never for public marketing.',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F1EE] border-b border-[#EAE4DD]" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: narrative */}
          <div>
            <span className="text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest block mb-3">
              About MemoFigura
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight leading-tight">
              Memories, made to hold
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#555] leading-relaxed">
              MemoFigura turns meaningful photographs into custom 3D keepsakes made to stay close. A person, a pet, a family story, or a quiet everyday memory can become something tangible: a small figurine designed to be displayed, gifted, and treasured.
            </p>
            <p className="mt-4 text-sm sm:text-base text-[#666] leading-relaxed">
              We are built around a simple idea: make memories easier to hold onto.
            </p>
            <button
              onClick={() => onNavigate('/about')}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#8C7A66] transition-colors cursor-pointer group"
            >
              <span>Read our full story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right: value points */}
          <div className="grid grid-cols-1 gap-4">
            {ABOUT_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex items-start gap-4 bg-[#FDFCFB] rounded-2xl p-5 border border-[#EAE4DD] shadow-2xs"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F5F1EE] border border-[#EAE4DD] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8C7A66]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">{point.title}</h3>
                    <p className="mt-1 text-xs sm:text-[13px] text-[#666] leading-relaxed">{point.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
