import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Sparkles, 
  Calendar,
  Truck,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';
import { analytics } from '../services/analytics';
import { useLocale } from '../context/LocaleContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const { currentLocale, formatPrice } = useLocale();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(currentLocale.country);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedId = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    setTimeout(() => {
      analytics.purchase(generatedId, total, items);
      setLoading(false);
      setStep('success');
    }, 800);
  };

  const handleFinish = () => {
    onOrderComplete();
    onClose();
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-[#E8E2D9] max-w-2xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-[#1C1917] rounded-full transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="p-6 sm:p-8 bg-[#FAF8F5] border-b border-[#E8E2D9]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B4513] uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure Concierge Checkout</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                Order Your Custom Keepsake
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                Total: <strong className="font-serif text-[#1C1917] text-base">{formatPrice(total)}</strong> • Includes free insured shipping & proof revisions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Contact Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Email Address for Digital Proof Approval *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                />
                <p className="text-[11px] text-[#78716C] mt-1">
                  Your 360° 3D sculpt render proof will be sent here within 3–5 business days.
                </p>
              </div>

              {/* Shipping Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                  Shipping Destination
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Full Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>European Union</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#78716C] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="742 Evergreen Terrace"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Springfield"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Postal / Zip Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="97477"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method simulation */}
              <div className="space-y-2 pt-2 border-t border-[#F3EFEA]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1C1917]">Payment Method</span>
                  <span className="text-[11px] text-emerald-700 font-medium">SSL Encrypted</span>
                </div>
                <div className="bg-[#FAF8F5] rounded-xl p-3 border border-[#E8E2D9] flex items-center justify-between text-xs text-[#57534E]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#8B4513]" />
                    <span>Card / Apple Pay / Google Pay simulated</span>
                  </div>
                  <span className="text-stone-400">Demo Mode Active</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1C1917] hover:bg-[#292524] text-white rounded-full font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Securing order...</span>
                  ) : (
                    <>
                      <span>Complete Order ({formatPrice(total)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#78716C] mt-3">
                  Remember: your card is authorized, and crafting only begins once you approve your digital 3D proof.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-1">
                Order Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1C1917]">
                Thank You, {fullName || 'Valued Customer'}!
              </h2>
              <p className="text-sm text-[#78716C] mt-1">
                Order Reference: <strong className="text-[#1C1917] font-mono">{orderId}</strong>
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D9] text-left max-w-lg mx-auto space-y-4">
              <h4 className="font-serif font-bold text-[#1C1917] text-sm">
                What Happens Next:
              </h4>

              <div className="space-y-3 text-xs text-[#57534E]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#1C1917] block">Artisan Sculpt Modeling (3–5 days)</strong>
                    Our 3D artist is reviewing your photo and sculpting facial volume and proportions.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8B4513] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#1C1917] block">Digital Proof Approval to {email}</strong>
                    You will receive interactive 360° renders to inspect. You have full approval control.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-300 text-stone-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#1C1917] block">Physical Curing & Walnut Base Assembly</strong>
                    Once approved, your piece is cured, hand-detailed, and shipped with tracking to {city || 'your address'}.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="px-8 py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white rounded-full font-medium text-sm transition-all shadow-sm cursor-pointer"
              >
                Return to Gallery & Explore
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
