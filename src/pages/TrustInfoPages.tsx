import React, { useState } from 'react';
import {
  Truck,
  RotateCcw,
  Heart,
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Package,
  Clock,
  ArrowRight,
  Camera,
  PenTool,
  Sparkles,
  Building2,
  ListChecks,
  HandHeart,
  Quote,
  AlertCircle,
  Info
} from 'lucide-react';
import { PageRoute } from '../types';
import { useLocale } from '../context/LocaleContext';

interface TrustPageProps {
  type: 'shipping' | 'returns' | 'about' | 'contact';
  onNavigate: (route: PageRoute) => void;
}

export const TrustInfoPages: React.FC<TrustPageProps> = ({ type, onNavigate }) => {
  const { formatPrice } = useLocale();

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', country: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SHIPPING PAGE */}
        {type === 'shipping' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
                Careful Delivery
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
                Insured Packaging & Shipping
              </h1>
              <p className="mt-4 text-base text-[#57534E]">
                How we protect your delicate keepsake during physical crafting and door-to-door transit.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <Clock className="w-6 h-6 text-[#8B4513] mb-3" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">3–5 Business Days</h3>
                  <p className="text-xs text-[#78716C] mt-1">Digital 3D modeling and initial render proof</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <Package className="w-6 h-6 text-[#8B4513] mb-3" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">7–10 Business Days</h3>
                  <p className="text-xs text-[#78716C] mt-1">Physical curing, surface detailing & mounting</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <Truck className="w-6 h-6 text-[#8B4513] mb-3" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">3–5 Business Days</h3>
                  <p className="text-xs text-[#78716C] mt-1">Insured tracked courier to US, CA, UK, EU, AU</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#F3EFEA] text-sm text-[#57534E] leading-relaxed">
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">
                  Custom Protective Packaging
                </h3>
                <p>
                  Every MemoFigura sculpture is set inside a high-density, custom-molded EVA suspension cocoon that isolates the figurine from external shocks, drops, and pressure changes during transit.
                </p>
                <p>
                  We guarantee zero-breakage delivery. In the rare event of transit damage, we recast and express ship a replacement at absolutely zero cost to you.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RETURNS & PROOF GUARANTEE PAGE */}
        {type === 'returns' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
                Our Guarantee
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
                Digital Proof Approval & Returns Policy
              </h1>
              <p className="mt-4 text-base text-[#57534E]">
                Why we offer a 100% digital proof approval guarantee before physical casting begins.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] space-y-6">
              <div className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                  The 100% Proof Sign-Off Guarantee
                </h2>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Because bespoke sculptures are personalized to individual photos, physical returns after fabrication are environmentally and practically irreversible. To eliminate any customer risk, <strong>we put all control in your hands prior to physical fabrication.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-serif font-bold text-sm text-[#1C1917]">Unlimited Revisions</h3>
                  <p className="text-xs text-[#78716C] mt-1">
                    Ask to adjust jawline, smile, hairstyle, or clothing folds until you are completely thrilled with the likeness.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <RotateCcw className="w-5 h-5 text-emerald-600 mb-2" />
                  <h3 className="font-serif font-bold text-sm text-[#1C1917]">Proof Cancellation Option</h3>
                  <p className="text-xs text-[#78716C] mt-1">
                    If at the digital proof stage we cannot achieve the likeness you expect from the photo, you may cancel for a full refund minus a modest <span data-no-translate>{formatPrice(25)}</span> modeling labor fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT US PAGE */}
        {type === 'about' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
                About Us
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
                About MemoFigura
              </h1>
              <p className="mt-4 text-base text-[#57534E]">
                MemoFigura turns meaningful photographs into custom 3D keepsakes made to stay close.
              </p>
            </div>

            {/* Our Story */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] space-y-5 text-sm text-[#57534E] leading-relaxed">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#8B4513]" />
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">Our Story</h2>
              </div>
              <p>
                We believe the moments that matter deserve more than a place in a camera roll. A person, a pet, a family story, or a quiet everyday memory can become something tangible: a small figurine designed to be displayed, gifted, and treasured.
              </p>
              <p>
                Each piece begins with the photos and story you provide. Our process combines thoughtful design, careful modeling, and hands-on production to capture the details that make someone feel familiar. Because every piece is made individually, each figurine has its own character.
              </p>
            </div>

            {/* Guiding idea */}
            <div className="rounded-3xl border border-[#E8E2D9] bg-[#F3EEE9] p-8 sm:p-12 text-center">
              <Quote className="w-6 h-6 text-[#8B4513] mx-auto mb-4" />
              <p className="font-serif text-lg sm:text-2xl text-[#1C1917] leading-snug max-w-2xl mx-auto">
                MemoFigura is built around a simple idea: make memories easier to hold onto.
              </p>
            </div>

            {/* How each piece comes together */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  How Each Piece Comes Together
                </h2>
                <p className="mt-3 text-sm text-[#57534E]">
                  Thoughtful design, careful modeling, and hands-on production — in that order.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9]">
                  <Camera className="w-6 h-6 text-[#8B4513] mb-3" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">Your Photos &amp; Story</h3>
                  <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                    Every commission starts with the photographs you send and the story behind them. The more context you share, the more familiar the finished piece feels.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9]">
                  <PenTool className="w-6 h-6 text-[#8B4513] mb-3" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">Design &amp; Modeling</h3>
                  <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                    We model the details that make someone recognizable — posture, expression, clothing folds, and the small traits that belong only to them.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9]">
                  <HandHeart className="w-6 h-6 text-[#8B4513] mb-3" />
                  <h3 className="font-serif font-bold text-base text-[#1C1917]">Hands-On Production</h3>
                  <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                    Each figurine is produced, finished, and quality-checked individually. Because every piece is made one at a time, each one has its own character.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo care */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#8B4513]" />
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">How We Handle Your Photos</h2>
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                We take care with the photos you send and use them only as needed to review, design, produce, quality-check, support, and deliver your order. We do not use customer photos for public marketing without separate permission.
              </p>
              <button
                onClick={() => onNavigate('/photo-privacy')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                Read the Photo Privacy Policy
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Company + thank you */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] p-6">
                <Building2 className="w-5 h-5 text-[#8B4513] mb-3" />
                <h3 className="font-serif font-bold text-base text-[#1C1917]">
                  A Real Company Behind Every Piece
                </h3>
                <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                  MemoFigura is operated by Hong Kong yislove Co., Limited, with a registered office in Mong Kok, Kowloon, Hong Kong and an approved return address for every order.
                </p>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Company &amp; Contact Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] p-6">
                <Sparkles className="w-5 h-5 text-[#8B4513] mb-3" />
                <h3 className="font-serif font-bold text-base text-[#1C1917]">Thank You</h3>
                <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                  Thank you for trusting MemoFigura with a story that matters to you. We treat every one of them as something worth keeping close.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT US PAGE */}
        {type === 'contact' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
                Customer Service
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
                Contact Us
              </h1>
              <p className="mt-4 text-base text-[#57534E]">
                We are here to help with questions about your MemoFigura order, photos, production, shipping, or product quality.
              </p>
              <p className="mt-3 text-[11px] text-[#A8A29E]">Last updated: September 5, 2026</p>
            </div>

            {/* Customer service + registered office */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6">
                <Mail className="w-5 h-5 text-[#8B4513] mb-3" />
                <h3 className="font-serif font-bold text-base text-[#1C1917]">Customer Service</h3>
                <a
                  href="mailto:service@memofigura.com"
                  className="block mt-2 text-sm text-[#8B4513] hover:text-[#1C1917] transition-colors break-all"
                >
                  service@memofigura.com
                </a>
                <p className="text-xs text-[#78716C] mt-3 leading-relaxed">
                  Use the contact form on this page or email us directly. We will review your message and reply as soon as reasonably possible.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6">
                <MapPin className="w-5 h-5 text-[#8B4513] mb-3" />
                <h3 className="font-serif font-bold text-base text-[#1C1917]">
                  Registered Office &amp; Approved Return Address
                </h3>
                <div className="mt-2 text-xs text-[#57534E] leading-relaxed">
                  <p className="font-semibold text-[#1C1917]">Hong Kong yislove Co., Limited</p>
                  <p className="mt-1">RM03, 24/F, HO KING COMM CTR,</p>
                  <p>2-16 FAYUEN ST, MONG KOK,</p>
                  <p>KOWLOON, HONG KONG</p>
                </div>
                <p className="text-[11px] text-[#78716C] mt-3">
                  MemoFigura is operated by Hong Kong yislove Co., Limited.
                </p>
              </div>
            </div>

            {/* What to prepare */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] space-y-6">
              <div className="flex items-center gap-3">
                <ListChecks className="w-5 h-5 text-[#8B4513]" />
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                  Before Contacting Us About an Order
                </h2>
              </div>

              <p className="text-sm text-[#57534E]">Please prepare:</p>

              <ul className="space-y-2.5 text-sm text-[#57534E]">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>your order number;</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>the email address used at checkout;</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>the destination country;</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>a short description of your question; and</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                  <span>clear photos or screenshots when reporting a product or shipping issue.</span>
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <Info className="w-5 h-5 text-[#8B4513] mb-2" />
                  <h3 className="font-serif font-bold text-sm text-[#1C1917]">Custom Product Questions</h3>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    Tell us what you would like the figurine to represent and whether your photos are ready for review.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                  <AlertCircle className="w-5 h-5 text-[#8B4513] mb-2" />
                  <h3 className="font-serif font-bold text-sm text-[#1C1917]">
                    Quality, Damage &amp; Delivery Problems
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    Keep the product and packaging until we have reviewed the case. For quality issues or incorrect orders, contact us within 7 calendar days after delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-xs">
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">Order Number (optional)</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="e.g. MF-10293"
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">Destination Country</label>
                      <input
                        type="text"
                        value={contactForm.country}
                        onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                        placeholder="e.g. Germany"
                        className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">Your Question</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your photos, what the figurine should represent, or your question..."
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-4 text-xs text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white rounded-xl font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Send Message
                  </button>

                  <p className="text-[11px] text-[#A8A29E] leading-relaxed">
                    Please do not send payment card numbers, passwords, or other sensitive payment information in a message.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">Message Received</h3>
                  <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                    Thank you, {contactForm.name}. We will review your message and reply to {contactForm.email} as soon as reasonably possible.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="text-xs font-semibold text-[#8B4513] hover:text-[#1C1917] transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[#F3EFEA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#78716C]">
                <div>
                  <strong className="text-[#1C1917] block">Customer Service Email:</strong>
                  <span>service@memofigura.com</span>
                </div>
                <div>
                  <strong className="text-[#1C1917] block">Operated By:</strong>
                  <span>Hong Kong yislove Co., Limited</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universal Back to Customizer CTA */}
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
