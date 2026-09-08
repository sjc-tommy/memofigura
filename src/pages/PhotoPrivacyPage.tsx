import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Trash2, 
  Server, 
  CheckCircle2, 
  FileText,
  Mail,
  ArrowRight
} from 'lucide-react';
import { PageRoute } from '../types';

interface PhotoPrivacyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PhotoPrivacyPage: React.FC<PhotoPrivacyPageProps> = ({ onNavigate }) => {
  const [deletionEmail, setDeletionEmail] = useState('');
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const handleRequestDeletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletionEmail) return;
    setDeletionSuccess(true);
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict Privacy & Integrity Guarantee</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            How MemoFigura Protects Your Photos
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            Your photos are not commercial assets; they are your most intimate life moments. We treat them with strict confidentiality, rigorous encryption, and uncompromising respect.
          </p>
        </div>

        {/* 5 Core Pillars */}
        <div className="space-y-8">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                1. Sole Use for Order Fulfillment
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Your uploaded images are accessed exclusively by the assigned digital 3D sculptor, master caster, and quality assurance lead directly involved in modeling, reviewing, curing, and packaging your bespoke piece. They are never ingested into public training datasets or commercial repositories.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <EyeOff className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                2. Zero Public Marketing Without Explicit Consent
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                We strictly never feature your source photos, work-in-progress digital proofs, or completed keepsakes on our website, social media channels, or advertisements unless you specifically opt-in via a separate signed authorization form following delivery. Privacy is our default.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                3. 256-Bit Encrypted Storage & Transit
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                From the instant your photograph leaves your browser, it is encrypted via TLS 1.3 protocol and saved onto isolated AES-256 encrypted drives with strict role-based access restrictions. No external third parties have access to your personal files.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                4. Permanent Deletion on Request
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                By default, raw photographic files are held for 30 days post-delivery in case you wish to order duplicate casts for relatives, after which they are automatically queued for deletion. You may also request immediate, irreversible deletion at any point.
              </p>
            </div>
          </div>

        </div>

        {/* Immediate Photo Purge Request Form */}
        <div className="mt-12 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-xs">
          <div className="max-w-md mx-auto text-center space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              Request Immediate Photo Purge
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Enter the email address associated with your order to immediately schedule permanent removal of all source photo uploads and 3D wireframe mesh assets.
            </p>

            {!deletionSuccess ? (
              <form onSubmit={handleRequestDeletion} className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={deletionEmail}
                  onChange={(e) => setDeletionEmail(e.target.value)}
                  placeholder="Order email (e.g. name@example.com)"
                  className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  Submit Purge Request
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Purge request submitted for {deletionEmail}. Verification sent.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('/custom-3d-figurine')}
            className="px-8 py-4 bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-sm rounded-full transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ready to Create Your Figurine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
