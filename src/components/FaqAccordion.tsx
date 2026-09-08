import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { analytics } from '../services/analytics';
import { useLocale } from '../context/LocaleContext';
import { localizeMoneyInText } from '../services/currencyApi';

interface FaqAccordionProps {
  categoryFilter?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ categoryFilter }) => {
  const { formatPrice } = useLocale();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1', 'faq-3']));

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        analytics.viewFaq(id);
      }
      return next;
    });
  };

  const filteredItems = categoryFilter
    ? FAQ_ITEMS.filter((i) => i.category === categoryFilter)
    : FAQ_ITEMS;

  return (
    <section className="py-20 lg:py-28 bg-[#FDFCFB] border-b border-[#EAE4DD]" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F3EEE9] border border-[#EAE4DD] text-[11px] font-bold text-[#8C7A66] uppercase tracking-widest mb-3">
            Questions & Clarity
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#555]">
            Everything you need to know about photo selection, digital proofs, crafting, and shipping.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#F5F1EE] rounded-xl border border-[#EAE4DD] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-light text-[#1A1A1A]">
                    {item.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-[#FDFCFB] flex items-center justify-center shrink-0 border border-[#EAE4DD] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'text-[#777]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#666] leading-relaxed border-t border-[#EAE4DD] animate-in fade-in duration-200">
                    <p>
                      {localizeMoneyInText(item.answer, formatPrice)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center bg-[#F5F1EE] rounded-xl p-6 border border-[#EAE4DD]">
          <p className="text-sm text-[#1A1A1A] font-medium">
            Have a unique question about an older vintage photo or complex group?
          </p>
          <p className="text-xs text-[#777] mt-1">
            Email our design team at <a href="mailto:care@memofigura.com" className="text-[#8C7A66] underline font-semibold">care@memofigura.com</a> — we usually review photos within 4 hours.
          </p>
        </div>

      </div>
    </section>
  );
};
