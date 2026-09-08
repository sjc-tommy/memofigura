/**
 * Currency Exchange Rate Service using cn.apihz.cn
 *
 * API Documentation:
 * Endpoint: https://cn.apihz.cn/api/jinrong/huilv.php
 * Daily updated exchange rate service.
 */

export const CURRENCY_API_CONFIG = {
  url: 'https://cn.apihz.cn/api/jinrong/huilv.php',
  id: '10019329',
  key: '68c6ddd3e38d4bdcd64db29a3809eea8',
};

export interface ExchangeApiResponse {
  code: number;
  msg?: string;
  uptime?: string;
  money?: string | number;
  from?: string;
  to?: string;
  result?: number;
  rate?: string | number;
}

export interface RatesResult {
  base: string;
  rates: Record<string, number>;
  uptime: string;
  source: string;
}

// Fallback baseline rates for Western developed markets
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.8611,
  GBP: 0.745,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.89,
  CNY: 7.12,
};

const CACHE_KEY = 'memofigura_cached_rates';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour (API updates once daily)

/**
 * Fetch a single exchange rate with timeout
 */
export async function fetchDirectRate(
  from: string = 'USD',
  to: string,
  amount: number = 1
): Promise<ExchangeApiResponse | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const params = new URLSearchParams({
      id: CURRENCY_API_CONFIG.id,
      key: CURRENCY_API_CONFIG.key,
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      money: amount.toString(),
    });

    const res = await fetch(`${CURRENCY_API_CONFIG.url}?${params.toString()}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data: ExchangeApiResponse = await res.json();
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
}

/**
 * Get all current rates for supported Western currencies.
 * 1. Checks memory / localStorage cache first (1 hour validity)
 * 2. Attempts /api/rates (server-side proxy)
 * 3. Falls back to direct cn.apihz.cn client fetch
 * 4. Falls back to accurate FALLBACK_RATES
 */
export async function getLiveRates(): Promise<RatesResult> {
  // 1. Check local cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.rates) {
          return {
            base: 'USD',
            rates: parsed.rates,
            uptime: parsed.uptime || '',
            source: 'cn.apihz.cn (cached)',
          };
        }
      }
    } catch {
      // ignore
    }
  }

  // 2. Try server-side proxy
  try {
    const serverRes = await fetch('/api/rates');
    if (serverRes.ok) {
      const serverData = await serverRes.json();
      if (serverData && serverData.code === 200 && serverData.rates) {
        saveCache(serverData.rates, serverData.uptime);
        return {
          base: 'USD',
          rates: serverData.rates,
          uptime: serverData.uptime || '',
          source: 'cn.apihz.cn (via server)',
        };
      }
    }
  } catch {
    // continue to direct fetch
  }

  // 3. Try direct API calls for supported Western currencies
  const targetCurrencies = ['EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'CNY'];
  const newRates: Record<string, number> = { ...FALLBACK_RATES };
  let detectedUptime = '';

  try {
    const promises = targetCurrencies.map((curr) => fetchDirectRate('USD', curr, 1));
    const results = await Promise.all(promises);

    let liveCount = 0;
    results.forEach((res) => {
      if (res && res.code === 200 && res.to && res.rate) {
        const numRate = typeof res.rate === 'string' ? parseFloat(res.rate) : res.rate;
        if (!isNaN(numRate) && numRate > 0) {
          newRates[res.to] = numRate;
          liveCount += 1;
          if (res.uptime) detectedUptime = res.uptime;
        }
      }
    });

    // 一次都没拿到实时价时不写缓存，否则兜底值会被当成实时汇率锁死一小时
    if (liveCount > 0) saveCache(newRates, detectedUptime);
    return {
      base: 'USD',
      rates: newRates,
      uptime: detectedUptime || new Date().toISOString().substring(0, 10),
      source: 'cn.apihz.cn (live direct)',
    };
  } catch {
    // 4. Return fallback rates
    return {
      base: 'USD',
      rates: FALLBACK_RATES,
      uptime: new Date().toISOString().substring(0, 10),
      source: 'Standard Western FX (fallback)',
    };
  }
}

function saveCache(rates: Record<string, number>, uptime?: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        rates,
        uptime: uptime || '',
        timestamp: Date.now(),
      })
    );
  } catch {
    // ignore
  }
}

/**
 * 文案里的金额占位符 {USD:25} 会按当前币种实时换算，
 * 这样政策/FAQ 文字里的费用也能跟着币种切换一起变。
 */
const MONEY_TOKEN = /\{USD:(\d+(?:\.\d+)?)\}/g;

export function localizeMoneyInText(
  text: string,
  formatPrice: (amountInUsd: number) => string
): string {
  if (!text || text.indexOf('{USD:') === -1) return text;
  return text.replace(MONEY_TOKEN, (_match, amount) => formatPrice(Number(amount)));
}
