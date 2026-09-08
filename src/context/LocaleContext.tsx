import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocaleOption } from '../types';
import { getLiveRates } from '../services/currencyApi';

/**
 * cn.apihz.cn 翻译接口的语种编号（ytype / etype）
 * 1=英语 13=荷兰语 17=法语 19=德语 26=意大利语 41=西班牙语
 */
const TRANSLATION_TYPES: Record<string, number> = {
  'en-US': 1,
  'en-GB': 1,
  'en-CA': 1,
  'en-AU': 1,
  'de-DE': 19,
  'de-CH': 19,
  'fr-FR': 17,
  'it-IT': 26,
  'es-ES': 41,
  'nl-NL': 13,
};

const BASE_LOCALES: LocaleOption[] = [
  {
    code: 'en-US',
    country: 'United States',
    flag: '🇺🇸',
    language: 'English',
    currencyCode: 'USD',
    currencySymbol: '$',
    exchangeRate: 1.0,
  },
  {
    code: 'en-GB',
    country: 'United Kingdom',
    flag: '🇬🇧',
    language: 'English',
    currencyCode: 'GBP',
    currencySymbol: '£',
    exchangeRate: 0.79,
  },
  {
    code: 'de-DE',
    country: 'Deutschland',
    flag: '🇩🇪',
    language: 'Deutsch',
    currencyCode: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.92,
  },
  {
    code: 'fr-FR',
    country: 'France',
    flag: '🇫🇷',
    language: 'Français',
    currencyCode: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.92,
  },
  {
    code: 'it-IT',
    country: 'Italia',
    flag: '🇮🇹',
    language: 'Italiano',
    currencyCode: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.92,
  },
  {
    code: 'es-ES',
    country: 'España',
    flag: '🇪🇸',
    language: 'Español',
    currencyCode: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.92,
  },
  {
    code: 'nl-NL',
    country: 'Nederland',
    flag: '🇳🇱',
    language: 'Nederlands',
    currencyCode: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.92,
  },
  {
    code: 'en-CA',
    country: 'Canada',
    flag: '🇨🇦',
    language: 'English',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    exchangeRate: 1.36,
  },
  {
    code: 'en-AU',
    country: 'Australia',
    flag: '🇦🇺',
    language: 'English',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    exchangeRate: 1.52,
  },
  {
    code: 'de-CH',
    country: 'Schweiz',
    flag: '🇨🇭',
    language: 'Deutsch',
    currencyCode: 'CHF',
    currencySymbol: 'CHF ',
    exchangeRate: 0.88,
  },
].map((locale) => ({
  ...locale,
  translationType: TRANSLATION_TYPES[locale.code] ?? 1,
}));

export const WESTERN_LOCALES: LocaleOption[] = BASE_LOCALES;

interface LocaleContextValue {
  currentLocale: LocaleOption;
  setLocale: (locale: LocaleOption) => void;
  formatPrice: (amountInUsd: number) => string;
  locales: LocaleOption[];
  ratesUptime?: string;
  isLiveRates: boolean;
  /** 站点文案是否正在通过翻译接口转换中 */
  isTranslating: boolean;
  setIsTranslating: (value: boolean) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  currentLocale: WESTERN_LOCALES[0],
  setLocale: () => {},
  formatPrice: (amount) => `$${amount}`,
  locales: WESTERN_LOCALES,
  isLiveRates: false,
  isTranslating: false,
  setIsTranslating: () => {},
});

const STORAGE_KEY = 'memofigura_locale_pref';

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locales, setLocales] = useState<LocaleOption[]>(WESTERN_LOCALES);
  const [ratesUptime, setRatesUptime] = useState<string>('');
  const [isLiveRates, setIsLiveRates] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const [currentLocale, setCurrentLocale] = useState<LocaleOption>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = WESTERN_LOCALES.find((l) => l.code === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return WESTERN_LOCALES[0];
  });

  // Fetch daily live rates from cn.apihz.cn (with server proxy and direct fallback)
  useEffect(() => {
    let isMounted = true;
    const fetchRates = async () => {
      try {
        const data = await getLiveRates();
        if (data && data.rates && isMounted) {
          setRatesUptime(data.uptime || '');
          setIsLiveRates(true);

          setLocales((prevList) =>
            prevList.map((loc) => {
              const liveRate = data.rates[loc.currencyCode];
              if (typeof liveRate === 'number' && liveRate > 0) {
                return { ...loc, exchangeRate: liveRate };
              }
              return loc;
            })
          );

          // Update currently selected locale with the fresh live rate
          setCurrentLocale((current) => {
            const liveRate = data.rates[current.currencyCode];
            if (typeof liveRate === 'number' && liveRate > 0) {
              return { ...current, exchangeRate: liveRate };
            }
            return current;
          });
        }
      } catch {
        // Fallback to static predefined rates gracefully
      }
    };

    fetchRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const setLocale = (newLocale: LocaleOption) => {
    // Look up the freshest rate in locales
    const fresh = locales.find((l) => l.code === newLocale.code) || newLocale;
    setCurrentLocale(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, fresh.code);
    } catch {
      // ignore
    }
  };

  // Keep <html lang> in sync with the active locale
  useEffect(() => {
    try {
      document.documentElement.lang = currentLocale.code;
    } catch {
      // ignore
    }
  }, [currentLocale.code]);

  const formatPrice = (amountInUsd: number): string => {
    const converted = Math.round(amountInUsd * currentLocale.exchangeRate);
    if (currentLocale.currencySymbol.endsWith(' ')) {
      return `${currentLocale.currencySymbol}${converted}`;
    }
    return `${currentLocale.currencySymbol}${converted}`;
  };

  return (
    <LocaleContext.Provider
      value={{
        currentLocale,
        setLocale,
        formatPrice,
        locales,
        ratesUptime,
        isLiveRates,
        isTranslating,
        setIsTranslating,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
