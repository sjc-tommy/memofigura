import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Mail,
  ArrowRight,
  CreditCard,
  PackageCheck,
  RotateCcw,
  Gift,
  PackageSearch,
} from 'lucide-react';
import { PageRoute } from '../types';
import { useLocale } from '../context/LocaleContext';
import { LanguageCurrencySelector } from './LanguageCurrencySelector';
import { WhatsAppBubble } from './WhatsAppBubble';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenSitemap: () => void;
  onOpenTrackOrder: () => void;
}

/** 仅展示实际开通的支付方式 */
const PAYMENTS = [
  { label: 'Credit Card', icon: CreditCard },
  { label: 'PayPal', text: 'PayPal' },
  { label: 'Apple Pay', text: 'Apple Pay' },
  { label: 'Google Pay', text: 'Google Pay' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap, onOpenTrackOrder }) => {
  const { currentLocale } = useLocale();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#F5F1EE] text-[#1A1A1A] border-t border-[#EAE4DD]">
      {/* Top 3-Pillar Trust Bar */}
      <div className="border-b border-[#EAE4DD] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C7A66] mb-1">
                Private & Secure
              </span>
              <span className="text-[13px] font-medium text-[#1A1A1A]">
                Photos deleted after design approval
              </span>
              <span className="text-[11px] text-[#777] mt-0.5">
                Strict customer privacy guaranteed
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C7A66] mb-1">
                Design Preview
              </span>
              <span className="text-[13px] font-medium text-[#1A1A1A]">
                Approve before we craft
              </span>
              <span className="text-[11px] text-[#777] mt-0.5">
                Free revisions until you are thrilled
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C7A66] mb-1">
                Craftsmanship
              </span>
              <span className="text-[13px] font-medium text-[#1A1A1A]">
                Detailed artisan finishing
              </span>
              <span className="text-[11px] text-[#777] mt-0.5">
                Composite ceramic on American walnut
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EAE4DD]">
          {/* Brand + Newsletter + Payments */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-5">
            <button onClick={() => onNavigate('/')} className="text-left cursor-pointer">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] uppercase block">
                MemoFigura
              </span>
              <span className="text-[10px] text-[#8C7A66] tracking-widest uppercase block mt-1">
                Turn Memories Into Something You Can Hold
              </span>
            </button>

            <p className="text-xs sm:text-sm text-[#666] max-w-sm leading-relaxed">
              We turn meaningful personal photographs into beautifully crafted, tactile 3D keepsakes you can hold, display, and pass down.
            </p>

            {/* Newsletter */}
            <div className="max-w-sm">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66] block mb-2">
                Join our newsletter
              </span>
              {subscribed ? (
                <p className="text-xs text-[#1A1A1A] bg-[#FDFCFB] border border-[#EAE4DD] rounded-xl px-4 py-3">
                  Thank you for subscribing. Watch your inbox for new designs and offers.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#8C7A66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full text-xs bg-[#FDFCFB] border border-[#EAE4DD] rounded-xl pl-9 pr-3 py-2.5 placeholder:text-[#999] focus:outline-none focus:border-[#8C7A66]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center gap-1 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-[#999] mt-2">
                No spam. Unsubscribe at any time.
              </p>
            </div>

            {/* Payment icons */}
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C7A66] block mb-2">
                Secure checkout
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {PAYMENTS.map((pay) => {
                  const Icon = 'icon' in pay ? pay.icon : null;
                  return (
                    <span
                      key={pay.label}
                      title={pay.label}
                      data-no-translate
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A] bg-[#FDFCFB] border border-[#EAE4DD] rounded-md px-2.5 py-1.5 shadow-2xs"
                    >
                      {Icon && <Icon className="w-4 h-4 text-[#8C7A66]" />}
                      <span>{'text' in pay ? pay.text : pay.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66]">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#666]">
              <li>
                <button
                  onClick={onOpenTrackOrder}
                  className="inline-flex items-center gap-1.5 text-[#1A1A1A] hover:text-[#8C7A66] font-semibold transition-colors cursor-pointer text-left"
                >
                  <PackageSearch className="w-3.5 h-3.5 text-[#8C7A66]" />
                  <span>Track Your Order</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/reviews')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/refer')}
                  className="inline-flex items-center gap-1.5 text-[#8C7A66] hover:text-[#1A1A1A] font-semibold transition-colors cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Refer &amp; Earn</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66]">
              Custom Figurines
            </h4>
            <ul className="space-y-2 text-xs text-[#666]">
              <li>
                <button onClick={() => onNavigate('/custom-3d-figurine')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Custom 3D Figurine (All)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/custom-couple-figurine')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Couple &amp; Romance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/custom-pet-figurine')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Beloved Pet Sculptures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/custom-family-figurine')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Family &amp; Generations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pet-memorial')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  Pet Memorial Tributes
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A66]">
              Policies &amp; Help
            </h4>
            <ul className="space-y-2 text-xs text-[#666]">
              <li>
                <button onClick={() => onNavigate('/photo-privacy')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8C7A66]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/shipping')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left inline-flex items-center gap-1.5">
                  <PackageCheck className="w-3.5 h-3.5 text-[#8C7A66]" />
                  <span>Shipping &amp; Delivery</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/returns')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left inline-flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#8C7A66]" />
                  <span>Returns &amp; Guarantee</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer text-left">
                  FAQ &amp; Proof Approval
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-[#777]">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p>&copy; {new Date().getFullYear()} MemoFigura. All rights reserved.</p>
            <span className="hidden sm:inline">&bull;</span>
            <button onClick={() => onNavigate('/photo-privacy')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Privacy
            </button>
            <span className="hidden sm:inline">&bull;</span>
            <button onClick={() => onNavigate('/shipping')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Shipping
            </button>
            <span className="hidden sm:inline">&bull;</span>
            <button onClick={() => onNavigate('/returns')} className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
              Guarantee
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Real currency selector */}
            <LanguageCurrencySelector variant="navbar" />

            <button
              onClick={onOpenSitemap}
              className="flex items-center gap-1.5 text-[#555] hover:text-[#1A1A1A] transition-colors cursor-pointer border border-[#EAE4DD] px-3 py-1.5 rounded-full bg-[#FDFCFB]"
            >
              <Globe className="w-3.5 h-3.5 text-[#8C7A66]" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Sitemap</span>
            </button>
          </div>
        </div>

        {/* Hand-finished note */}
        <div className="mt-6 text-center text-[11px] text-[#999]">
          <span data-no-translate>
            {currentLocale.currencyCode} ({currentLocale.currencySymbol.trim()}) &bull;
            {currentLocale.currencyCode === 'USD'
              ? '1 USD base'
              : `1 USD = ${currentLocale.exchangeRate.toFixed(4)} ${currentLocale.currencyCode}`}
          </span>
          {' '}
          &bull; Hand-finished in USA
        </div>
      </div>

      {/* Floating WhatsApp customer-service bubble */}
      <WhatsAppBubble />
    </footer>
  );
};
