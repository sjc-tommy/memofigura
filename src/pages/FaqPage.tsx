import React, { useState } from 'react';
import { HelpCircle, Search, Mail, MessageSquare, ArrowRight, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { PageRoute } from '../types';
import { useLocale } from '../context/LocaleContext';
import { localizeMoneyInText } from '../services/currencyApi';

interface FaqPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const { formatPrice } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1', 'faq-3', 'faq-4']));

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'photo', label: 'Photos & Uploads' },
    { id: 'process', label: '3D Proof & Approval' },
    { id: 'materials', label: 'Materials & Craft' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'privacy', label: 'Privacy & Security' },
  ];

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      localizeMoneyInText(item.answer, formatPrice).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
            Clarity & Guidance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#57534E]">
            Detailed answers about photo submissions, 3D proof revisions, materials, and delivery guarantees.
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. proof, revisions, pet)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8E2D9] rounded-full text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513] shadow-2xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1917] text-white'
                    : 'bg-white text-[#57534E] border border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E2D9]">
              <p className="text-sm text-[#78716C]">
                No matching questions found for "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-[#8B4513] underline font-semibold cursor-pointer"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filtered.map((item) => {
              const isOpen = openIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleOpen(item.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                      {item.question}
                    </span>
                    <div className={`w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 border border-[#E8E2D9] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#1C1917] text-white border-[#1C1917]' : 'text-[#78716C]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#57534E] leading-relaxed border-t border-[#F3EFEA] animate-in fade-in duration-200">
                      <p>{localizeMoneyInText(item.answer, formatPrice)}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Concierge Support Card */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-[#E8E2D9] text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[#8B4513] flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1C1917]">
            Still Have a Question About Your Specific Photo?
          </h3>
          <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto">
            Send your photo to our artisan concierge team. We will review it free of charge and advise on resolution, composition, and expected likeness.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 bg-[#1C1917] hover:bg-[#292524] text-white rounded-full font-medium text-xs sm:text-sm transition-all shadow-2xs cursor-pointer inline-flex items-center gap-2"
            >
              <span>Contact Artisan Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
