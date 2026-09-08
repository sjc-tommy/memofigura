/**
 * Multi-language translation service backed by 接口盒子 (cn.apihz.cn)
 *
 * Endpoint: https://cn.apihz.cn/api/zici/fanyiapihz.php
 * 语种编号 (ytype = source, etype = target):
 *   1=英语 2=简体中文 3=繁体中文 13=荷兰语 17=法语 19=德语 26=意大利语 41=西班牙语
 *
 * Constraints of the shared id/key that this module is built around:
 *  - 调用频次上限 10 次/分钟  -> requests are batched and serialized
 *  - words 参数有长度上限      -> payloads are chunked at MAX_CHUNK_CHARS
 *  - 偶发 "失败，请重试"        -> every chunk is retried
 * 翻译结果统一按换行符拼接/拆分，并做本地持久化缓存，避免重复调用。
 */

export const TRANSLATION_API_CONFIG = {
  url: 'https://cn.apihz.cn/api/zici/fanyiapihz.php',
  id: '10019329',
  key: '68c6ddd3e38d4bdcd64db29a3809eea8',
};

/** 站点源文案为英文 */
export const SOURCE_LANGUAGE_TYPE = 1;

/**
 * 单次请求拼接的最大字符数。
 * 实测上游 words 拼接后 2019 字符可成功、2419 字符返回 400，
 * 且单次耗时随字符数线性上升（约 200 字符/秒）。
 * 跟服务端分块保持一致，这样每个 POST 约等于一次上游调用，
 * onChunk 能按分块渐进式回填，而不是等一大批全部返回才刷新。
 */
export const MAX_CHUNK_CHARS = 1800;

// v2: 译文改为剥离 emoji 后送翻，旧缓存里的 emoji 已被上游译成单词，整批作废
const CACHE_PREFIX = 'memofigura_tr_v2_';
const MAX_CACHE_ENTRIES = 4000;

const memoryCaches = new Map<number, Record<string, string>>();

function readCache(to: number): Record<string, string> {
  const cached = memoryCaches.get(to);
  if (cached) return cached;

  let store: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(`${CACHE_PREFIX}${to}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') store = parsed;
      }
    } catch {
      // ignore corrupted cache
    }
  }
  memoryCaches.set(to, store);
  return store;
}

function writeCache(to: number, entries: Record<string, string>) {
  const store = readCache(to);
  Object.assign(store, entries);

  const keys = Object.keys(store);
  if (keys.length > MAX_CACHE_ENTRIES) {
    keys.slice(0, keys.length - MAX_CACHE_ENTRIES).forEach((key) => delete store[key]);
  }
  memoryCaches.set(to, store);

  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${CACHE_PREFIX}${to}`, JSON.stringify(store));
  } catch {
    // localStorage full or unavailable - memory cache still works
  }
}

/** 品牌名 / 代码等不参与翻译的词条（上游会把 PayPal 译成 "Bitte wählen"、Apple Pay 译成 "Apfellohn"） */
const DO_NOT_TRANSLATE = new Set([
  'MemoFigura',
  'memofigura',
  'Figuro',
  'figuro',
  'MEMOFIGURA',
  'PayPal',
  'PAYPAL',
  'Apple Pay',
  'APPLE PAY',
  'Google Pay',
  'GOOGLE PAY',
]);

/** 判断一段文本是否值得送去翻译 */
export function isTranslatableText(text: string): boolean {
  const value = text.trim();
  if (value.length < 2) return false;
  if (DO_NOT_TRANSLATE.has(value)) return false;
  if (/^https?:\/\//i.test(value)) return false;
  if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(value)) return false;

  const letters = value.match(/[A-Za-z\u00C0-\u024F]/g);
  if (!letters || letters.length < 2) return false;

  return true;
}

/**
 * 翻译引擎返回的结果统一为小写，这里按原文的大小写形态还原，
 * 保证标题、按钮、全大写标签在切换语言后依然符合排版预期。
 */
export function restoreCase(source: string, translated: string): string {
  if (!translated) return '';

  const letters = source.match(/[A-Za-z\u00C0-\u024F]/g);
  if (!letters || letters.length === 0) return translated;

  const allUpper = letters.every((char) => char === char.toUpperCase());
  if (allUpper) return translated.toUpperCase();

  if (letters[0] === letters[0].toUpperCase()) {
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  }

  return translated;
}

/** 把超长文本按句子边界拆成不超过 maxChars 的片段 */
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

/**
 * 装饰性 emoji / 符号（🔥 ✨ 🐾 👨‍👩‍👧‍👦 等）。
 * 上游翻译引擎会把它们当成单词翻译（实测 🔥 -> "reaktion"、✨ -> "konform"），
 * ZWJ 组合emoji更会被直接拆毁，所以发送前先摘出来，译文回填后再放回原位。
 */
const DECORATION_PATTERN =
  /(?:\p{Extended_Pictographic}(?:\uFE0F|\u20E3)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\u20E3)?)*|[\u2600-\u27BF\u2B00-\u2BFF])/gu;

interface DecorationSplit {
  /** 真正送去翻译的纯文字 */
  clean: string;
  /** 原文开头的装饰（已含分隔空格） */
  prefix: string;
  /** 原文结尾与中间的装饰（已含分隔空格） */
  suffix: string;
}

/** 把一条文案拆成 前缀装饰 + 纯文字 + 后缀装饰 */
export function splitDecorations(text: string): DecorationSplit {
  const tokens = Array.from(text.matchAll(DECORATION_PATTERN));
  if (tokens.length === 0) return { clean: text, prefix: '', suffix: '' };

  const gaps: string[] = [];
  const emojis: string[] = [];
  let cursor = 0;
  tokens.forEach((token) => {
    const start = token.index ?? 0;
    gaps.push(text.slice(cursor, start));
    emojis.push(token[0]);
    cursor = start + token[0].length;
  });
  const tail = text.slice(cursor);

  // 第一个含真实文字的位置：之前的装饰留在开头，之后的统一挪到结尾
  let firstText = gaps.findIndex((gap) => gap.trim() !== '');
  if (firstText === -1) firstText = tail.trim() !== '' ? gaps.length : 0;

  let prefix = '';
  let suffix = '';
  const cleanParts: string[] = [];

  gaps.forEach((gap, index) => {
    if (index < firstText) {
      prefix += gap + emojis[index];
      return;
    }
    cleanParts.push(gap);
    suffix += (suffix ? ' ' : '') + emojis[index];
  });
  cleanParts.push(tail);

  const clean = cleanParts.join('').replace(/[ \t]{2,}/g, ' ').trim();
  return {
    clean,
    prefix: prefix.trim() ? prefix.trim() + ' ' : '',
    suffix: suffix ? ' ' + suffix : '',
  };
}

/**
 * 上游偶发把整段文案截断（实测 "No spam. Unsubscribe anytime." 只回 "kein spam."）。
 * 译文相对原文丢得太多时判定为不可用：本轮不落盘、不回填，保留英文原文，
 * 避免页面上出现半句话。短标签词数太少，判断没意义，直接放过。
 */
function isUsableTranslation(source: string, translated: string): boolean {
  const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
  const sourceWords = countWords(source);
  if (sourceWords < 6) return true;
  return countWords(translated) >= sourceWords * 0.35;
}

/** 按换行拼接后的总长度分块（入参必须已经是切好的片段） */
function chunkPieces(pieces: string[], maxChars: number): string[][] {
  const chunks: string[][] = [];
  let current: string[] = [];
  let size = 0;

  for (const piece of pieces) {
    if (current.length > 0 && size + 1 + piece.length > maxChars) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(piece);
    size = current.length === 1 ? piece.length : size + 1 + piece.length;
  }
  if (current.length > 0) chunks.push(current);

  return chunks;
}

export interface ServerTranslateResult {
  /** 代理是否给出了可用响应（即使部分词条为空） */
  reached: boolean;
  results: string[] | null;
}

/** 优先走服务端代理（无跨域、服务端已做限频、重试与持久化缓存） */
async function translateViaServer(
  segments: string[],
  from: number,
  to: number
): Promise<ServerTranslateResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90000);
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: segments, from, to }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return { reached: false, results: null };

    const data = await res.json();
    if (data && data.code === 200 && Array.isArray(data.results) && data.results.length === segments.length) {
      return {
        reached: true,
        results: data.results.map((item: unknown) => (typeof item === 'string' ? item : '')),
      };
    }
    return { reached: true, results: null };
  } catch {
    clearTimeout(timer);
    return { reached: false, results: null };
  }
}

/** 代理不可用时直连接口盒子 */
async function translateDirect(
  segments: string[],
  from: number,
  to: number
): Promise<string[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const params = new URLSearchParams({
      id: TRANSLATION_API_CONFIG.id,
      key: TRANSLATION_API_CONFIG.key,
      words: segments.join('\n'),
      ytype: String(from),
      etype: String(to),
      htype: '1',
    });
    // 用 POST 传 words，避免批量文案把 URL 撑爆（接口盒子允许跨域 POST）
    const res = await fetch(TRANSLATION_API_CONFIG.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json();
    if (data && data.code === 200 && typeof data.words === 'string') {
      const parts = data.words.split('\n');
      if (parts.length === segments.length) return parts;
    }
    return null;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/** 会话内单个片段的最大翻译尝试次数，超过后本轮不再请求，避免失败词条被无限重试 */
const MAX_SEGMENT_ATTEMPTS = 2;
const sessionAttempts = new Map<string, number>();

function attemptKey(to: number, segment: string): string {
  return to + '|' + segment;
}

function getSessionAttempts(to: number, segment: string): number {
  return sessionAttempts.get(attemptKey(to, segment)) ?? 0;
}

function bumpAttempt(to: number, segment: string) {
  const key = attemptKey(to, segment);
  sessionAttempts.set(key, (sessionAttempts.get(key) ?? 0) + 1);
}

export interface TranslateOptions {
  from?: number;
  /** 每完成一个分块回调一次，用于渐进式渲染 */
  onChunk?: (partial: Record<string, string>) => void;
}

/**
 * 同步读取已缓存的译文（命中返回译文，未命中返回 undefined）。
 * 供 DOM 回填使用：React 重渲染把节点还原成英文后，可直接从缓存恢复译文，无需重新请求。
 */
export function peekTranslation(to: number, key: string): string | undefined {
  if (!to || to === SOURCE_LANGUAGE_TYPE) return undefined;
  const cache = readCache(to);
  return Object.prototype.hasOwnProperty.call(cache, key) ? cache[key] : undefined;
}

/**
 * 批量翻译一组英文文案，返回 原文 -> 译文 的映射。
 * 已缓存的词条不会重复请求，未命中的按 MAX_CHUNK_CHARS 分块串行请求。
 * 代理可达时以代理结果为准（即使部分词条为空），仅在代理不可达时直连接口盒子；
 * 连续失败达到上限的片段本轮跳过，避免失败词条触发无限重试。
 */
export async function translateSegments(
  segments: string[],
  to: number,
  options: TranslateOptions = {}
): Promise<Record<string, string>> {
  const from = options.from ?? SOURCE_LANGUAGE_TYPE;
  const unique = Array.from(new Set(segments.filter((s) => typeof s === 'string')));

  if (!to || to === from) {
    return unique.reduce<Record<string, string>>((acc, seg) => {
      acc[seg] = seg;
      return acc;
    }, {});
  }

  const cache = readCache(to);
  const known: Record<string, string> = {};
  const missing: string[] = [];

  unique.forEach((seg) => {
    if (Object.prototype.hasOwnProperty.call(cache, seg)) {
      known[seg] = cache[seg];
    } else if (getSessionAttempts(to, seg) < MAX_SEGMENT_ATTEMPTS) {
      missing.push(seg);
    }
    // 已达到尝试上限的片段本轮跳过，由调用方延迟处理，避免无限重试
  });

  if (missing.length === 0) return known;

  // 先摘掉装饰 emoji，再按句子边界切超长文案；composition 记录每条原文由哪些切片组成，
  // 这样切片和原文不会因为数量不一致而错位。
  const prepared = missing.map((seg) => ({ original: seg, ...splitDecorations(seg) }));
  const composition = prepared.map((item) =>
    item.clean ? splitLongSegment(item.clean, MAX_CHUNK_CHARS) : []
  );

  const fresh: Record<string, string> = {};
  const emitted = new Set<string>();

  // 没有可翻译文字的词条（纯装饰）原样返回
  prepared.forEach((item, index) => {
    if (composition[index].length === 0) {
      fresh[item.original] = item.original;
      emitted.add(item.original);
    }
  });

  const uniquePieces: string[] = [];
  const pieceSeen = new Set<string>();
  composition.forEach((parts) =>
    parts.forEach((part) => {
      if (pieceSeen.has(part)) return;
      pieceSeen.add(part);
      uniquePieces.push(part);
    })
  );

  const pieceValues = new Map<string, string>();

  /** 把已经凑齐全部切片的原文拼回译文，并把装饰符号放回原位 */
  const assemble = (): Record<string, string> => {
    const partial: Record<string, string> = {};

    prepared.forEach((item, index) => {
      const parts = composition[index];
      if (parts.length === 0 || emitted.has(item.original)) return;

      const translatedParts: string[] = [];
      let complete = true;
      parts.forEach((part) => {
        const value = pieceValues.get(part);
        if (!value || !isUsableTranslation(part, value)) {
          complete = false;
          return;
        }
        translatedParts.push(restoreCase(part, value));
      });
      if (!complete) return;

      const body = translatedParts.join(' ').trim();
      if (!body) return;

      const value = `${item.prefix}${body}${item.suffix}`;
      partial[item.original] = value;
      fresh[item.original] = value;
      emitted.add(item.original);
    });

    return partial;
  };

  for (const chunk of chunkPieces(uniquePieces, MAX_CHUNK_CHARS)) {
    const serverResult = await translateViaServer(chunk, from, to);

    // 代理可达时以其结果为准（即使部分词条为空），不再直连，避免重复消耗公共 KEY 频次；
    // 仅在代理不可达时直连接口盒子兜底。
    const translated = serverResult.reached
      ? serverResult.results
      : await translateDirect(chunk, from, to);

    if (translated) {
      chunk.forEach((piece, index) => {
        const value = (translated[index] ?? '').trim();
        if (value) pieceValues.set(piece, value);
      });
    }

    // 分块落盘，避免中途失败导致已获取的译文丢失
    const partial = assemble();
    if (Object.keys(partial).length > 0) {
      writeCache(to, partial);
      options.onChunk?.(partial);
    }
  }

  prepared.forEach((item) => {
    if (fresh[item.original]) sessionAttempts.delete(attemptKey(to, item.original));
    else bumpAttempt(to, item.original);
  });

  return { ...known, ...fresh };
}

/** 单条翻译，供命令式场景（如 alert / document.title）使用 */
export async function translateText(text: string, to: number, from?: number): Promise<string> {
  if (!text || !to || to === (from ?? SOURCE_LANGUAGE_TYPE)) return text;
  const map = await translateSegments([text], to, { from });
  return map[text] || text;
}
