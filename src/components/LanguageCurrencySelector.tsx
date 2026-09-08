import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { LocaleOption } from '../types';

interface LanguageCurrencySelectorProps {
  variant?: 'topbar' | 'navbar' | 'mobile';
}

export const LanguageCurrencySelector: React.FC<LanguageCurrencySelectorProps> = ({
  variant = 'topbar',
}) => {
  const { currentLocale, setLocale, locales, isLiveRates, ratesUptime, isTranslating } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (l: LocaleOption) => {
    setLocale(l);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="border-t border-[#EAE4DD] pt-4 mt-2" data-no-translate>
        <label className="text-[11px] uppercase tracking-wider text-[#888] font-bold block mb-2">
          Country & Currency (欧美国家)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l)}
              className={`text-left p-2 border text-xs flex items-center justify-between cursor-pointer ${
                currentLocale.code === l.code
                  ? 'border-[#1A1A1A] bg-[#F3EEE9] font-bold text-[#1A1A1A]'
                  : 'border-[#EAE4DD] text-[#555] hover:bg-[#FAF8F5]'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <span className="text-sm">{l.flag}</span>
                <span className="truncate">{l.country}</span>
              </span>
              <span className="text-[10px] font-mono text-[#8C7A66]">{l.currencyCode}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef} data-no-translate>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
          variant === 'topbar'
            ? 'text-[#D1C7BD] hover:text-white py-1 px-2 rounded hover:bg-white/10'
            : 'text-[#666] hover:text-[#1A1A1A] py-1.5 px-2.5 rounded-full border border-[#EAE4DD] bg-[#FAF8F5]'
        }`}
        aria-label="Select Country and Currency"
      >
        <span className="text-xs">{currentLocale.flag}</span>
        <span className="font-medium tracking-wide">
          {currentLocale.currencyCode} ({currentLocale.currencySymbol.trim()})
        </span>
        <span className="text-[10px] opacity-70 flex items-center gap-1">
          | {currentLocale.language}
          {isTranslating && currentLocale.translationType !== 1 && (
            <Loader2 className="w-3 h-3 animate-spin" />
          )}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 bg-[#FDFCFB] border border-[#EAE4DD] shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-2 border-b border-[#EAE4DD] mb-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C7A66] block">
              Western Developed Countries
            </span>
            <span className="text-xs text-[#555] block mt-0.5">
              Select your region for localized currency & shipping
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-0.5 py-1">
            {locales.map((l) => {
              const isSelected = currentLocale.code === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F3EEE9] text-[#1A1A1A] font-bold'
                      : 'text-[#555] hover:bg-[#FAF8F5] hover:text-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-base leading-none">{l.flag}</span>
                    <div>
                      <span className="block text-xs leading-tight text-[#1A1A1A]">
                        {l.country}
                      </span>
                      <span className="block text-[10px] text-[#888] leading-tight">
                        {l.language} • {l.currencyCode} ({l.currencySymbol.trim()})
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#8C7A66] shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 px-3 border-t border-[#EAE4DD] mt-1 text-[10px] text-[#888] space-y-1">
            <div className="flex items-center justify-between text-[#8C7A66] font-medium">
              <span>✈️ Express delivery to North America, UK & EU</span>
              <span className="text-[9px] bg-[#EAE4DD] px-1.5 py-0.5 rounded text-[#1A1A1A]">
                {isLiveRates ? 'API Active' : 'Daily Rates'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#999]">
              <span>🌐 Site language follows your region selection</span>
              <span className="text-[9px] bg-[#EAE4DD] px-1.5 py-0.5 rounded text-[#1A1A1A]">
                {isTranslating && currentLocale.translationType !== 1
                  ? 'Translating…'
                  : currentLocale.translationType === 1
                  ? 'English'
                  : 'Translated'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#999]">
              <span>💱 1 USD =</span>
              <span className="font-mono text-[#8C7A66]">
                {currentLocale.exchangeRate.toFixed(4)} {currentLocale.currencyCode}
              </span>
            </div>
            {ratesUptime && (
              <div className="text-[9px] text-[#999] truncate">
                Rates synced: {ratesUptime} (cn.apihz.cn)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
