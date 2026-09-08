import React, { useCallback, useEffect, useRef } from 'react';
import { useLocale } from '../context/LocaleContext';
import {
  SOURCE_LANGUAGE_TYPE,
  isTranslatableText,
  peekTranslation,
  translateSegments,
} from '../services/translateApi';

/**
 * 站点语言切换引擎。
 *
 * 站点文案以英文硬编码在各组件中，切换国家/语言时由本组件在运行时遍历 DOM，
 * 把可见文本与关键属性批量送到 cn.apihz.cn 翻译接口，并按分块渐进式回填。
 * 切回英语（语种编号 1）时从留存的原文快照整体还原。
 */

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'TEXTAREA',
  'CODE',
  'PRE',
  'SVG',
  'CANVAS',
  'IFRAME',
  'KBD',
  'SAMP',
  'VAR',
]);

const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];
const OBSERVE_DEBOUNCE_MS = 250;

interface TranslationEntry {
  node: Node;
  attr: string | null;
  raw: string;
  key: string;
  prefix: string;
  suffix: string;
  applied: string | null;
}

function readEntry(entry: TranslationEntry): string | null {
  if (entry.attr) {
    if (!(entry.node instanceof Element)) return null;
    return entry.node.getAttribute(entry.attr);
  }
  return entry.node.nodeValue;
}

/**
 * 异步译文返回时，React 可能已经重写了该节点（例如推荐链接就绪后替换占位文案）。
 * 这种情况下当前值既不是登记的原文、也不是上一次回填的译文，视为过期，必须丢弃，
 * 否则会把 React 的最新内容覆盖成旧译文。
 */
function isEntryStale(entry: TranslationEntry): boolean {
  const live = readEntry(entry);
  if (live === null) return true;
  if (entry.applied !== null && live === `${entry.prefix}${entry.applied}${entry.suffix}`) return false;
  return live !== entry.raw;
}

function writeEntry(entry: TranslationEntry, translated: string) {
  if (isEntryStale(entry)) return;

  const next = `${entry.prefix}${translated}${entry.suffix}`;
  entry.applied = translated;
  if (readEntry(entry) === next) return;

  if (entry.attr) {
    (entry.node as Element).setAttribute(entry.attr, next);
  } else {
    entry.node.nodeValue = next;
  }
}

function restoreEntry(entry: TranslationEntry) {
  if (entry.applied === null) return;
  const wasApplied = `${entry.prefix}${entry.applied}${entry.suffix}`;
  entry.applied = null;
  const live = readEntry(entry);
  if (live === entry.raw || live === wasApplied) {
    if (live !== entry.raw) {
      if (entry.attr) {
        (entry.node as Element).setAttribute(entry.attr, entry.raw);
      } else {
        entry.node.nodeValue = entry.raw;
      }
    }
    return;
  }
  // React 已经写入了新内容，保留它
}

function isEntryCurrent(entry: TranslationEntry): boolean {
  if (entry.applied === null) return false;
  return readEntry(entry) === `${entry.prefix}${entry.applied}${entry.suffix}`;
}

function makeEntry(node: Node, attr: string | null, raw: string): TranslationEntry | null {
  if (!isTranslatableText(raw)) return null;
  const key = raw.trim();
  const prefix = raw.slice(0, raw.length - raw.trimStart().length);
  const suffix = raw.slice(raw.trimEnd().length);
  return { node, attr, raw, key, prefix, suffix, applied: null };
}

export const SiteTranslator: React.FC = () => {
  const { currentLocale, setIsTranslating } = useLocale();

  const entriesRef = useRef<TranslationEntry[]>([]);
  const textIndexRef = useRef(new WeakMap<Node, TranslationEntry>());
  const attrIndexRef = useRef(new WeakMap<Element, Map<string, TranslationEntry>>());
  const runningRef = useRef(false);
  const rerunRef = useRef(false);
  const targetRef = useRef<number>(SOURCE_LANGUAGE_TYPE);
  const translatingRef = useRef(false);
  const deferredRef = useRef<Set<string>>(new Set());

  const setTranslating = useCallback(
    (value: boolean) => {
      if (translatingRef.current === value) return;
      translatingRef.current = value;
      setIsTranslating(value);
    },
    [setIsTranslating]
  );

  const pruneEntries = useCallback(() => {
    const alive: TranslationEntry[] = [];
    entriesRef.current.forEach((entry) => {
      const attached = entry.attr
        ? (entry.node as Element).isConnected
        : entry.node.parentNode !== null;
      if (attached) alive.push(entry);
    });
    entriesRef.current = alive;
  }, []);

  const collect = useCallback(() => {
    pruneEntries();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (SKIP_TAGS.has(element.tagName)) return NodeFilter.FILTER_REJECT;
          if (element.hasAttribute('data-no-translate') || element.getAttribute('translate') === 'no') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }

        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let current = walker.nextNode();
    while (current) {
      if (current.nodeType === Node.TEXT_NODE) {
        const known = textIndexRef.current.get(current);
        if (known) {
          const live = current.nodeValue ?? '';
          if (!isEntryCurrent(known)) {
            if (live !== known.raw) {
              // React 重写了这个文本节点，重新登记原文
              known.raw = live;
              known.key = live.trim();
              known.prefix = live.slice(0, live.length - live.trimStart().length);
              known.suffix = live.slice(live.trimEnd().length);
              known.applied = null;
            }
            // 命中缓存直接回填，避免 React 重置节点后反复请求上游
            const cached = peekTranslation(targetRef.current, known.key);
            if (cached) writeEntry(known, cached);
          }
        } else if (isTranslatableText(current.nodeValue ?? '')) {
          const entry = makeEntry(current, null, current.nodeValue ?? '');
          if (entry) {
            entriesRef.current.push(entry);
            textIndexRef.current.set(current, entry);
          }
        }
      } else if (current.nodeType === Node.ELEMENT_NODE) {
        const element = current as Element;
        TRANSLATABLE_ATTRS.forEach((attr) => {
          const value = element.getAttribute(attr);
          if (value === null) return;

          let bucket = attrIndexRef.current.get(element);
          const known = bucket?.get(attr);
          if (known) {
            if (!isEntryCurrent(known)) {
              if (value !== known.raw) {
                known.raw = value;
                known.key = value.trim();
                known.prefix = value.slice(0, value.length - value.trimStart().length);
                known.suffix = value.slice(value.trimEnd().length);
                known.applied = null;
              }
              const cached = peekTranslation(targetRef.current, known.key);
              if (cached) writeEntry(known, cached);
            }
            return;
          }
          if (!isTranslatableText(value)) return;

          const entry = makeEntry(element, attr, value);
          if (!entry) return;
          entriesRef.current.push(entry);
          if (!bucket) {
            bucket = new Map<string, TranslationEntry>();
            attrIndexRef.current.set(element, bucket);
          }
          bucket.set(attr, entry);
        });
      }
      current = walker.nextNode();
    }
  }, [pruneEntries]);

  const applyMap = useCallback((map: Record<string, string>) => {
    if (!map) return;
    let touched = false;
    entriesRef.current.forEach((entry) => {
      const value = map[entry.key];
      if (!value || isEntryCurrent(entry)) return;
      writeEntry(entry, value);
      touched = true;
    });
    return touched;
  }, []);

  const restoreAll = useCallback(() => {
    entriesRef.current.forEach(restoreEntry);
    setTranslating(false);
  }, [setTranslating]);

  const runPass = useCallback(
    async (to: number) => {
      if (runningRef.current) {
        rerunRef.current = true;
        return;
      }
      runningRef.current = true;

      try {
        collect();

        const pending = entriesRef.current.filter(
          (entry) =>
            !isEntryCurrent(entry) &&
            isTranslatableText(entry.raw) &&
            !deferredRef.current.has(entry.key)
        );
        if (pending.length === 0) {
          setTranslating(false);
          return;
        }

        setTranslating(true);
        const map = await translateSegments(
          pending.map((entry) => entry.key),
          to,
          { from: SOURCE_LANGUAGE_TYPE, onChunk: (partial) => applyMap(partial) }
        );
        applyMap(map);

        // 本轮未能取得译文的词条延迟处理，避免被观察器无限重试
        pending.forEach((entry) => {
          if (!map[entry.key]) deferredRef.current.add(entry.key);
        });
      } catch (error) {
        // 翻译失败时保持英文原文，不影响站点可用性
        console.warn('[SiteTranslator] translation pass failed:', error);
      } finally {
        runningRef.current = false;
        setTranslating(false);

        if (rerunRef.current && targetRef.current === to) {
          rerunRef.current = false;
          window.setTimeout(() => runPass(to), 0);
        }
      }
    },
    [applyMap, collect, setTranslating]
  );

  useEffect(() => {
    const to = currentLocale.translationType || SOURCE_LANGUAGE_TYPE;
    targetRef.current = to;
    deferredRef.current.clear();

    // 切换语种前先整体还原为英文原文，避免用译文当源文再次翻译
    restoreAll();

    if (to === SOURCE_LANGUAGE_TYPE) return undefined;

    let debounceTimer: number | undefined;

    const isSelfMutation = (mutation: MutationRecord): boolean => {
      if (mutation.type === 'characterData') {
        const entry = textIndexRef.current.get(mutation.target);
        return !!entry && isEntryCurrent(entry);
      }
      if (mutation.type === 'attributes') {
        const element = mutation.target as Element;
        const entry = attrIndexRef.current.get(element)?.get(mutation.attributeName ?? '');
        return !!entry && isEntryCurrent(entry);
      }
      return false;
    };

    const observer = new MutationObserver((mutations) => {
      if (targetRef.current === SOURCE_LANGUAGE_TYPE) return;
      if (!mutations.some((mutation) => !isSelfMutation(mutation))) return;

      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => runPass(targetRef.current), OBSERVE_DEBOUNCE_MS);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRS,
    });

    runPass(to);

    return () => {
      window.clearTimeout(debounceTimer);
      observer.disconnect();
      restoreAll();
    };
  }, [currentLocale.translationType, restoreAll, runPass]);

  return null;
};
