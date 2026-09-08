import React, { useEffect, useMemo, useState } from 'react';
import { Gift, Copy, Check, Share2, Wallet, Sparkles, ArrowRight, Info } from 'lucide-react';
import { PageRoute } from '../types';
import { useLocale } from '../context/LocaleContext';
import { BASE_URL } from '../services/seo';

interface ReferPageProps {
  onNavigate: (route: PageRoute) => void;
}

const FRIEND_DISCOUNT_USD = 20;
const REFERRAL_CREDIT_USD = 25;
const CODE_STORAGE_KEY = 'memofigura_refer_code_v1';

const STEPS = [
  {
    icon: Share2,
    title: 'Share your link',
    text: 'Send your personal referral link to family and friends who have a photo worth keeping close.',
  },
  {
    icon: Gift,
    title: 'They save on their first order',
    text: 'Their discount is applied automatically at checkout on the first custom figurine they order.',
  },
  {
    icon: Wallet,
    title: 'You earn keepsake credit',
    text: 'Once their order ships, we add store credit to your account to use on your next piece.',
  },
];

const NOTES = [
  'Referral credit is issued after the referred order ships and is no longer within its 7-day review window.',
  'The friend discount applies to the first order placed with your link and cannot be combined with other promotions.',
  'Credit has no cash value, is tied to the email address you registered with, and does not expire while your account is active.',
  'Please only share your own link. We may withdraw credit for orders placed through misleading or incentivised traffic.',
];

function makeCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `MEMO-${out}`;
}

export const ReferPage: React.FC<ReferPageProps> = ({ onNavigate }) => {
  const { formatPrice } = useLocale();
  const [code, setCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CODE_STORAGE_KEY);
    } catch {
      stored = null;
    }
    const next = stored || makeCode();
    if (!stored) {
      try {
        localStorage.setItem(CODE_STORAGE_KEY, next);
      } catch {
        // ignore
      }
    }
    setCode(next);
  }, []);

  const shareUrl = useMemo(() => {
    return `${BASE_URL}/?ref=${code || 'MEMO'}`;
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
              Refer &amp; Earn
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
              Share a Keepsake, Earn Credit
            </h1>
            <p className="mt-4 text-base text-[#57534E]">
              Give the people you care about{' '}
              <span data-no-translate className="font-semibold text-[#1C1917]">
                {formatPrice(FRIEND_DISCOUNT_USD)}
              </span>{' '}
              off their first custom figurine, and we will add{' '}
              <span data-no-translate className="font-semibold text-[#1C1917]">
                {formatPrice(REFERRAL_CREDIT_USD)}
              </span>{' '}
              of keepsake credit to your account once their order ships.
            </p>
          </div>

          {/* Referral link box */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9]">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-5 h-5 text-[#8B4513]" />
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">Your referral link</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 min-w-0 px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs sm:text-sm text-[#57534E] break-all">
                {code ? shareUrl : 'Preparing your link...'}
              </div>
              <button
                onClick={handleCopy}
                disabled={!code}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#1C1917] hover:bg-[#292524] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy link'}</span>
              </button>
            </div>

            <p className="mt-4 text-[11px] text-[#A8A29E]">
              Your code <span className="font-semibold text-[#78716C]">{code || '...'}</span> is stored on this
              device. Sign in with the same email at checkout so we can match your referrals.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] text-center">How it works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="bg-white p-6 rounded-2xl border border-[#E8E2D9]">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-6 h-6 text-[#8B4513]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#1C1917]">{step.title}</h3>
                    <p className="text-xs text-[#78716C] mt-2 leading-relaxed">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fine print */}
          <div className="rounded-3xl border border-[#E8E2D9] bg-white p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#8B4513]" />
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">Good to know</h2>
            </div>
            <ul className="space-y-2.5 text-sm text-[#57534E]">
              {NOTES.map((note) => (
                <li key={note} className="flex gap-3">
                  <Check className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#78716C] pt-2">
              Questions about a referral?{' '}
              <button
                onClick={() => onNavigate('/contact')}
                className="text-[#8B4513] hover:text-[#1C1917] font-semibold transition-colors cursor-pointer"
              >
                Contact our team
              </button>
              .
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('/custom-3d-figurine')}
            className="px-8 py-4 bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-sm rounded-full transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <span>Create Your Figurine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
