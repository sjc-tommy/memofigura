import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
// 允许通过项目根目录的 .env 覆盖公共 ID/KEY（申请到独享 KEY 后无需改代码）
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Configuration for cn.apihz.cn
const API_URL = 'https://cn.apihz.cn/api/jinrong/huilv.php';
const API_ID = process.env.EXCHANGE_API_ID || '10019329';
const API_KEY = process.env.EXCHANGE_API_KEY || '68c6ddd3e38d4bdcd64db29a3809eea8';

// Target currencies for Western developed countries & global market
const SUPPORTED_CURRENCIES = ['EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'CNY'];

// In-memory cache for daily exchange rates
interface RateCache {
  rates: Record<string, number>;
  uptime: string;
  timestamp: number;
}

const fallbackRates: Record<string, number> = {
  USD: 1,
  EUR: 0.86,
  GBP: 0.74,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.89,
  CNY: 7.12,
};

let rateCache: RateCache = {
  rates: { ...fallbackRates },
  uptime: new Date().toISOString().replace('T', ' ').substring(0, 19),
  timestamp: 0,
};

// Helper function to fetch exchange rate from cn.apihz.cn with timeout
async function fetchRemoteRate(from: string, to: string, amount: number = 1) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const queryParams = new URLSearchParams({
      id: API_ID,
      key: API_KEY,
      from,
      to,
      money: amount.toString(),
    });

    const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`[Currency API] Failed to fetch rate for ${from}->${to}:`, err.message);
    return null;
  }
}

// Background sync function to update the cache
async function syncRatesCache() {
  const now = Date.now();
  // Cache for 30 minutes (since upstream API is updated daily)
  if (now - rateCache.timestamp < 30 * 60 * 1000 && rateCache.timestamp > 0) {
    return;
  }

  console.log('[Currency API] Refreshing exchange rates from cn.apihz.cn...');
  const newRates: Record<string, number> = { USD: 1 };
  let lastUptime = rateCache.uptime;

  for (const curr of SUPPORTED_CURRENCIES) {
    const res = await fetchRemoteRate('USD', curr, 1);
    if (res && res.code === 200 && res.rate) {
      const parsedRate = parseFloat(res.rate);
      if (!isNaN(parsedRate) && parsedRate > 0) {
        newRates[curr] = parsedRate;
        if (res.uptime) {
          lastUptime = res.uptime;
        }
      } else {
        newRates[curr] = fallbackRates[curr] || 1;
      }
    } else {
      newRates[curr] = rateCache.rates[curr] || fallbackRates[curr] || 1;
    }
  }

  rateCache = {
    rates: newRates,
    uptime: lastUptime,
    timestamp: now,
  };
  console.log('[Currency API] Cache updated:', rateCache.rates);
}

// Trigger initial sync non-blockingly
syncRatesCache().catch(console.error);

// API Route: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API Route: Get all live rates for Western currencies
app.get('/api/rates', async (req, res) => {
  // Sync if cache is older than 30 mins
  if (Date.now() - rateCache.timestamp > 30 * 60 * 1000) {
    syncRatesCache().catch(console.error);
  }

  res.json({
    code: 200,
    base: 'USD',
    rates: rateCache.rates,
    uptime: rateCache.uptime,
    source: 'cn.apihz.cn (Daily Official Rates)',
    cached: Date.now() - rateCache.timestamp < 30 * 60 * 1000,
  });
});

// API Route: Real-time single currency conversion
app.get('/api/convert', async (req, res) => {
  const from = ((req.query.from as string) || 'USD').toUpperCase();
  const to = ((req.query.to as string) || 'USD').toUpperCase();
  const money = parseFloat((req.query.money as string) || '1');

  if (isNaN(money) || money < 0) {
    return res.status(400).json({ code: 400, msg: 'Invalid money amount' });
  }

  if (from === to) {
    return res.json({
      code: 200,
      uptime: rateCache.uptime,
      money,
      from,
      to,
      result: money,
      rate: 1,
    });
  }

  // Attempt direct API call
  const remoteRes = await fetchRemoteRate(from, to, money);
  if (remoteRes && remoteRes.code === 200) {
    return res.json(remoteRes);
  }

  // Fallback using cached cross-rates
  const fromRate = rateCache.rates[from] || fallbackRates[from] || 1;
  const toRate = rateCache.rates[to] || fallbackRates[to] || 1;
  const computedRate = toRate / fromRate;
  const computedResult = Math.round(money * computedRate * 100) / 100;

  res.json({
    code: 200,
    uptime: rateCache.uptime,
    money,
    from,
    to,
    result: computedResult,
    rate: Math.round(computedRate * 10000) / 10000,
    note: 'Computed from cached daily rates',
  });
});

// ---------------------------------------------------------------------------
// Translation proxy - cn.apihz.cn 字词句名·多语种翻译
// 语种编号: 1=英语 2=简体中文 3=繁体中文 13=荷兰语 17=法语 19=德语 26=意大利语 41=西班牙语
// 公共 ID/KEY 限制 10 次/分钟，因此这里统一排队、限频、重试并缓存。
// ---------------------------------------------------------------------------
const TRANSLATE_API_URL = 'https://cn.apihz.cn/api/zici/fanyiapihz.php';
const TRANSLATE_API_ID = process.env.TRANSLATE_API_ID || API_ID;
const TRANSLATE_API_KEY = process.env.TRANSLATE_API_KEY || API_KEY;

/**
 * 公共 ID/KEY 的上游硬限制是 10 次/分钟，且实测不支持并发（并发会返回「失败，请重试」）。
 * 旧实现在此之外还强制每次调用间隔 6.2s，首屏 8 个分块光排队就要 ~50 秒。
 * 现在保留串行（上游要求）但只留 300ms 错峰，并用 60s 滑动窗口兑底
 * 多标签页/多客户端叠加的请求，只有配额打满时才等待。
 */
const TRANSLATE_WINDOW_MS = 60_000;
/**
 * 上游返回的 400 报文里带 `max`（当前 KEY 的每分钟上限）。
 * 公共 ID/KEY 是 10 次/分钟且全网共享，因此默认只取 9 次留一格余量；
 * 换成独享 ID/KEY 后可用 TRANSLATE_RATE_LIMIT 提高，翻译速度随之线性提升。
 */
const TRANSLATE_MAX_CALLS_PER_WINDOW = Math.max(
  1,
  parseInt(process.env.TRANSLATE_RATE_LIMIT || '9', 10) || 9
);
const TRANSLATE_BURST_GAP_MS = parseInt(process.env.TRANSLATE_BURST_GAP_MS || '300', 10) || 300;
/**
 * 分块上限按实测确定：words 拼接后 2019 字符可成功、2419 字符返回 400、
 * 6024 字符直接报「words参数长度过长」；上游吞吐约 200~240 字符/秒，
 * 与分块大小基本无关，因此取 1800 字符 / 18 行的安全余量。
 */
const TRANSLATE_MAX_CHUNK_LINES = 18;
const TRANSLATE_MAX_CHUNK_CHARS = 1800;
const TRANSLATE_MAX_RETRIES = 2;
const TRANSLATE_UPSTREAM_TIMEOUT_MS = 20000;
/** 片段翻译失败后进入冷静期，避免前端反复重试把公共 KEY 的频次配额耗尽 */
const TRANSLATE_FAIL_COOLDOWN_MS = 10 * 60 * 1000;
/** 译文落盘，重启后无需重新消耗上游配额 */
const TRANSLATE_CACHE_FILE = path.join(process.cwd(), '.translate-cache.json');

const translationCache = new Map<string, string>();
const translationFailures = new Map<string, number>();
let lastTranslateCallAt = 0;
const translateCallTimestamps: number[] = [];
let translateQueue: Promise<unknown> = Promise.resolve();
let foregroundPending = 0;
let translateThrottledUntil = 0;
let cacheSaveTimer: ReturnType<typeof setTimeout> | null = null;

function loadTranslationCache() {
  try {
    if (!fs.existsSync(TRANSLATE_CACHE_FILE)) return;
    const parsed = JSON.parse(fs.readFileSync(TRANSLATE_CACHE_FILE, 'utf-8'));
    if (parsed && typeof parsed === 'object') {
      Object.entries(parsed).forEach(([cacheKey, value]) => {
        if (typeof value === 'string' && value) translationCache.set(cacheKey, value);
      });
    }
    console.log('[Translate API] cache restored: ' + translationCache.size + ' entries');
  } catch (err: any) {
    console.warn('[Translate API] cache restore failed:', err?.message);
  }
}

function scheduleCacheSave() {
  if (cacheSaveTimer) return;
  cacheSaveTimer = setTimeout(() => {
    cacheSaveTimer = null;
    try {
      fs.writeFileSync(
        TRANSLATE_CACHE_FILE,
        JSON.stringify(Object.fromEntries(translationCache)),
        'utf-8'
      );
    } catch (err: any) {
      console.warn('[Translate API] cache save failed:', err?.message);
    }
  }, 2000);
}

function markTranslateFailures(pieces: string[], to: number) {
  const now = Date.now();
  pieces.forEach((piece) => translationFailures.set(to + '|' + piece, now));
}

function isTranslateCoolingDown(piece: string, to: number): boolean {
  const failedAt = translationFailures.get(to + '|' + piece);
  return failedAt !== undefined && Date.now() - failedAt < TRANSLATE_FAIL_COOLDOWN_MS;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

/** 等到滑动窗口内还有配额，配额打满时睡到最旧的一次调用滑出窗口 */
async function waitForTranslateSlot() {
  for (;;) {
    const now = Date.now();
    while (
      translateCallTimestamps.length > 0 &&
      now - translateCallTimestamps[0] >= TRANSLATE_WINDOW_MS
    ) {
      translateCallTimestamps.shift();
    }

    if (translateCallTimestamps.length < TRANSLATE_MAX_CALLS_PER_WINDOW) {
      const gap = lastTranslateCallAt + TRANSLATE_BURST_GAP_MS - Date.now();
      if (gap > 0) {
        await delay(gap);
        continue;
      }
      lastTranslateCallAt = Date.now();
      translateCallTimestamps.push(lastTranslateCallAt);
      return;
    }

    await delay(translateCallTimestamps[0] + TRANSLATE_WINDOW_MS - Date.now() + 250);
  }
}

/** 所有上游调用共用一条串行链：上游不接受并发，且需要严格的频次控制 */
function runExclusive<T>(task: () => Promise<T>): Promise<T> {
  const run = translateQueue.then(async () => {
    await delay(translateThrottledUntil - Date.now());
    await waitForTranslateSlot();
    try {
      return await task();
    } finally {
      lastTranslateCallAt = Date.now();
    }
  });
  translateQueue = run.catch(() => undefined);
  return run;
}

/** 预约一次上游调用配额（前台优先） */
function enqueueTranslation<T>(task: () => Promise<T>): Promise<T> {
  foregroundPending += 1;
  return runExclusive(task).finally(() => {
    foregroundPending -= 1;
  });
}

/** 后台预热专用：等前台没有排队任务时才占用配额 */
async function enqueueBackgroundTranslation<T>(task: () => Promise<T>): Promise<T> {
  while (foregroundPending > 0) await delay(2000);
  return runExclusive(task);
}

/** 调用一次上游翻译，返回按换行拼接的译文（失败自动重试） */
async function callTranslateUpstream(payload: string, from: number, to: number) {
  const body = new URLSearchParams({
    id: TRANSLATE_API_ID,
    key: TRANSLATE_API_KEY,
    words: payload,
    ytype: String(from),
    etype: String(to),
    htype: '1',
  });

  for (let attempt = 0; attempt < TRANSLATE_MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TRANSLATE_UPSTREAM_TIMEOUT_MS);
    try {
      const response = await fetch(TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        body: body.toString(),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: any = await response.json();
      if (data && data.code === 200 && typeof data.words === 'string') {
        return data.words as string;
      }

      if (data && typeof data.s === 'number' && data.s > 0) {
        translateThrottledUntil = Math.max(
          translateThrottledUntil,
          Date.now() + data.s * 1000 + 500
        );
      }
      console.warn(`[Translate API] rejected (attempt ${attempt + 1}):`, data?.msg);
    } catch (err: any) {
      clearTimeout(timer);
      console.warn(`[Translate API] failed (attempt ${attempt + 1}):`, err.message);
    }

    if (attempt < TRANSLATE_MAX_RETRIES - 1) {
      await delay(Math.max(1500 * (attempt + 1), translateThrottledUntil - Date.now()));
    }
  }

  return null;
}

/**
 * 发送给上游前清洗文本：
 * - 文本节点内部的换行会让上游返回的行数对不上，统一压成空格；
 * - 上游会对参数再解码一次，正文里的 & 会把同批次后续内容整体截断，改写成 and。
 */
function sanitizeForUpstream(piece: string): string {
  return piece
    .replace(/\r\n?/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 超长片段按句子边界拆分 */
function splitLongSegment(segment: string, maxChars: number): string[] {
  if (segment.length <= maxChars) return [segment];

  const pieces: string[] = [];
  let rest = segment;
  while (rest.length > maxChars) {
    let cut = rest.lastIndexOf('. ', maxChars);
    if (cut < maxChars * 0.4) cut = rest.lastIndexOf(' ', maxChars);
    if (cut <= 0) cut = maxChars;
    pieces.push(rest.slice(0, cut + 1).trimEnd());
    rest = rest.slice(cut + 1).trimStart();
  }
  if (rest) pieces.push(rest);
  return pieces;
}

/** 把若干片段按行数与换行总长分块，行数优先 */
function buildTranslateChunks(segments: string[]): string[][] {
  const chunks: string[][] = [];
  let current: string[] = [];
  let size = 0;

  for (const segment of segments) {
    const payload = sanitizeForUpstream(segment);
    const add = current.length === 0 ? payload.length : 1 + payload.length;
    const full =
      current.length >= TRANSLATE_MAX_CHUNK_LINES || size + add > TRANSLATE_MAX_CHUNK_CHARS;

    if (current.length > 0 && full) {
      chunks.push(current);
      current = [];
      size = 0;
    }

    current.push(segment);
    size += current.length === 1 ? payload.length : 1 + payload.length;
  }
  if (current.length > 0) chunks.push(current);

  return chunks;
}

/**
 * 翻译一个分块并写入缓存。
 * 上游按换行返回译文，行数与片段数不一致时（长句被改写/合并）对半拆分重试，
 * 最坏退化为逐条翻译，避免整块译文被丢弃。
 */
async function translateChunk(
  pieces: string[],
  from: number,
  to: number,
  onEntries: (entries: Map<string, string>) => void,
  background = false
): Promise<void> {
  const pending = pieces.filter((piece) => !translationCache.has(to + '|' + piece));
  if (pending.length === 0) return;

  const schedule = background ? enqueueBackgroundTranslation : enqueueTranslation;
  const raw = await schedule(() =>
    callTranslateUpstream(pending.map(sanitizeForUpstream).join('\n'), from, to)
  );
  if (raw === null) {
    markTranslateFailures(pending, to);
    return;
  }

  const lines = raw.split('\n');
  if (lines.length !== pending.length) {
    console.warn(
      '[Translate API] line mismatch: sent ' + pending.length + ', got ' + lines.length + ' -> splitting'
    );
    if (pending.length === 1) {
      markTranslateFailures(pending, to);
      return;
    }
    const mid = Math.ceil(pending.length / 2);
    await translateChunk(pending.slice(0, mid), from, to, onEntries, background);
    await translateChunk(pending.slice(mid), from, to, onEntries, background);
    return;
  }

  const entries = new Map<string, string>();
  const blanks: string[] = [];
  pending.forEach((piece, index) => {
    const value = typeof lines[index] === 'string' ? lines[index].trim() : '';
    if (!value) {
      blanks.push(piece);
      return;
    }
    translationCache.set(to + '|' + piece, value);
    translationFailures.delete(to + '|' + piece);
    entries.set(piece, value);
  });

  if (blanks.length > 0) markTranslateFailures(blanks, to);
  if (entries.size > 0) {
    scheduleCacheSave();
    onEntries(entries);
  }
}

/**
 * 解析一组文本，返回 原文 -> 译文。
 * 命中缓存的直接返回，未命中的分块串行请求上游；
 * 处于失败冷静期的片段本轮直接跳过，交由下次访问重试。
 */
async function resolveTranslations(
  segments: string[],
  from: number,
  to: number,
  onChunk?: (entries: Map<string, string>) => void,
  background = false
): Promise<Map<string, string>> {
  const resolved = new Map<string, string>();
  const missing: string[] = [];
  const seen = new Set<string>();

  segments.forEach((segment) => {
    if (!segment || seen.has(segment)) return;
    seen.add(segment);
    const hit = translationCache.get(to + '|' + segment);
    if (hit !== undefined) {
      resolved.set(segment, hit);
    } else {
      missing.push(segment);
    }
  });

  if (missing.length === 0) return resolved;

  // 拆成上游可接受的片段，并记录每条原文由哪些片段组成
  const composition = missing.map((segment) => splitLongSegment(segment, TRANSLATE_MAX_CHUNK_CHARS));
  const uniquePieces: string[] = [];
  const pieceSeen = new Set<string>();
  let deferred = 0;
  composition.forEach((parts) =>
    parts.forEach((part) => {
      if (pieceSeen.has(part)) return;
      pieceSeen.add(part);
      if (translationCache.has(to + '|' + part)) return;
      if (isTranslateCoolingDown(part, to)) {
        deferred += 1;
        return;
      }
      uniquePieces.push(part);
    })
  );

  const pieceValues = new Map<string, string>();
  const chunks = buildTranslateChunks(uniquePieces);
  if (deferred > 0) {
    console.log('[Translate API] skipping ' + deferred + ' piece(s) in failure cooldown');
  }

  for (const chunk of chunks) {
    await translateChunk(
      chunk,
      from,
      to,
      (entries) => {
        entries.forEach((value, piece) => pieceValues.set(piece, value));
        onChunk?.(entries);
      },
      background
    );
  }

  missing.forEach((segment, index) => {
    const parts = composition[index];
    const translatedParts = parts.map(
      (part) => pieceValues.get(part) ?? translationCache.get(to + '|' + part)
    );
    if (translatedParts.some((part) => typeof part !== 'string' || !part)) return;

    const value = (translatedParts as string[]).join(' ').trim();
    if (!value) return;
    resolved.set(segment, value);
    if (parts.length > 1) {
      translationCache.set(to + '|' + segment, value);
      scheduleCacheSave();
    }
  });

  return resolved;
}

// ---------------------------------------------------------------------------
// 译文预热
//
// 上游吞吐只有 ~200 字符/秒，公共 KEY 又限 10 次/分钟，
// 冷启动时整站文案翻译不可能在几秒内完成。
// 因此把真实请求带来的站点文案收集起来，在空闲时用低优先级
// 把其余语种的译文提前灌进磁盘缓存；之后用户切换语言直接命中缓存（毫秒级）。
// 设 TRANSLATE_PREWARM=0 可关闭。
// ---------------------------------------------------------------------------
const PREWARM_LANGUAGE_TYPES = [19, 17, 26, 41, 13];
const PREWARM_IDLE_MS = 90_000;
const PREWARM_MAX_TEXTS_PER_ROUND = 400;
const prewarmPool = new Set<string>();
let prewarmTimer: ReturnType<typeof setTimeout> | null = null;
let prewarmCursor = 0;
let prewarmRunning = false;

async function runPrewarmRound(skip: number) {
  if (prewarmRunning) return;
  prewarmRunning = true;
  try {
    const texts = Array.from(prewarmPool).slice(0, PREWARM_MAX_TEXTS_PER_ROUND);
    prewarmPool.clear();
    if (texts.length === 0) return;

    const candidates = PREWARM_LANGUAGE_TYPES.filter((lang) => lang !== skip);
    if (candidates.length === 0) return;

    const target = candidates[prewarmCursor % candidates.length];
    prewarmCursor += 1;

    const missing = texts.filter(
      (text) => !translationCache.has(target + '|' + text) && !isTranslateCoolingDown(text, target)
    );
    if (missing.length === 0) return;

    const map = await resolveTranslations(missing, 1, target, undefined, true);
    console.log(
      '[Translate API] prewarm -> language ' + target + ': ' + map.size + '/' + missing.length
    );
  } catch (err: any) {
    console.warn('[Translate API] prewarm failed:', err?.message);
  } finally {
    prewarmRunning = false;
  }
}

function schedulePrewarm(texts: string[], justTranslatedTo: number) {
  if (process.env.TRANSLATE_PREWARM === '0') return;
  texts.forEach((text) => {
    if (text) prewarmPool.add(text);
  });
  if (prewarmPool.size === 0 || prewarmTimer) return;
  prewarmTimer = setTimeout(() => {
    prewarmTimer = null;
    // 上游不健康时不再加压
    if (translationFailures.size > 0) {
      prewarmPool.clear();
      return;
    }
    void runPrewarmRound(justTranslatedTo);
  }, PREWARM_IDLE_MS);
}

// API Route: 批量翻译（前端语言切换调用）
app.post('/api/translate', async (req, res) => {
  const body = req.body || {};
  const to = parseInt(body.to, 10);
  const from = parseInt(body.from ?? 1, 10) || 1;
  const texts: string[] = Array.isArray(body.texts)
    ? body.texts.filter((item: unknown) => typeof item === 'string')
    : typeof body.text === 'string'
    ? [body.text]
    : [];

  if (!to || Number.isNaN(to)) {
    return res.status(400).json({ code: 400, msg: 'Missing target language type (to)' });
  }
  if (texts.length === 0) {
    return res.json({ code: 200, results: [], to, from });
  }
  if (texts.length > 4000) {
    return res.status(400).json({ code: 400, msg: 'Too many texts in one request' });
  }

  try {
    const map = await resolveTranslations(texts, from, to);
    const results = texts.map((text) => map.get(text) ?? '');
    console.log(
      `[Translate API] ${texts.length} texts -> language ${to}: resolved ${map.size}, cache ${translationCache.size}`
    );
    res.json({ code: 200, from, to, results, source: 'cn.apihz.cn' });
    schedulePrewarm(texts, to);
  } catch (err: any) {
    console.warn('[Translate API] route error:', err.message);
    res.status(502).json({ code: 502, msg: 'Translation upstream failed' });
  }
});

// API Route: 单条翻译，便于联调
app.get('/api/translate', async (req, res) => {
  const text = String(req.query.text ?? req.query.words ?? '');
  const to = parseInt(String(req.query.to ?? ''), 10);
  const from = parseInt(String(req.query.from ?? '1'), 10) || 1;

  if (!text || !to) {
    return res.status(400).json({ code: 400, msg: 'Usage: /api/translate?text=Hello&to=19' });
  }

  const map = await resolveTranslations([text], from, to);
  res.json({ code: 200, from, to, text, result: map.get(text) ?? '' });
});

// Vite middleware & Static serving
async function startServer() {
  loadTranslationCache();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MemoFigura Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
