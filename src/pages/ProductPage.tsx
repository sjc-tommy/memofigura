import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Ruler, 
  Eye, 
  Clock, 
  Truck, 
  RotateCcw,
  Star,
  Info,
  ArrowRight
} from 'lucide-react';
import { ProductCustomizer } from '../components/ProductCustomizer';
import { FaqAccordion } from '../components/FaqAccordion';
import { CartItem, FigurineCategory } from '../types';
import { FIGURINE_SIZES } from '../data/mockData';

interface ProductPageProps {
  initialCategory?: FigurineCategory;
  onAddToCart: (item: CartItem) => void;
  onInstantCheckout: (item: CartItem) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  initialCategory = 'couple',
  onAddToCart,
  onInstantCheckout,
}) => {
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=85',
      label: 'Finished Figurine on Solid Walnut Base',
    },
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=85',
      label: 'Original Couple Photograph Reference',
    },
    {
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=85',
      label: 'Digital 3D Sculpt Proof Preview (Sent for Sign-off)',
    },
    {
      url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85',
      label: 'Pet Figurine Artisan Texture Detail',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb for Google SEO schema */}
        <nav className="flex items-center space-x-2 text-xs text-[#78716C] mb-6">
          <a href="/" className="hover:text-[#1C1917]">Home</a>
          <span>/</span>
          <span className="text-[#1C1917] font-medium">Custom 3D Figurine From Photo</span>
        </nav>

        {/* Product Page Header & Conversion Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Product Visuals & Likeness showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-white border border-[#E8E2D9] shadow-sm relative">
              <img
                src={galleryImages[activeGalleryImage].url}
                alt={galleryImages[activeGalleryImage].label}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/65 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-xl font-medium truncate">
                {galleryImages[activeGalleryImage].label}
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-4 gap-2.5">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeGalleryImage === idx
                      ? 'border-[#8B4513] ring-2 ring-[#8B4513]/20'
                      : 'border-[#E8E2D9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Quick Guarantee Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B4513]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>The MemoFigura Promise</span>
              </div>
              <ul className="space-y-2 text-xs text-[#57534E]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interactive 3D proof sent to your email before production</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Free revisions until you are completely thrilled with the likeness</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Solid American walnut wood base with engraved brass plaque</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Photos remain strictly confidential and never used for ads</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Customizer & Order Builder (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Review score */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1C1917]">4.95</span>
                <span className="text-xs text-[#78716C]">(128 Verified Keepsake Proofs)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
                Custom 3D Figurine From Photo
              </h1>

              <p className="text-sm sm:text-base text-[#57534E] mt-3 leading-relaxed">
                Transform any candid or portrait photo into an heirloom-grade physical 3D sculpture. Includes digital 3D proof review, solid walnut base, and unlimited adjustments.
              </p>
            </div>

            {/* Customizer Core Component */}
            <ProductCustomizer
              initialCategory={initialCategory}
              onAddToCart={onAddToCart}
              onInstantCheckout={onInstantCheckout}
            />

          </div>

        </div>

        {/* Detailed Explanation Sections */}
        <div className="border-t border-[#E8E2D9] pt-16 space-y-16">
          
          {/* Section: What You Get */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9]">
            <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
              Comprehensive Package
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-6">
              What You Get with Every MemoFigura Keepsake
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#8B4513] mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-[#1C1917] text-base mb-1.5">
                  1. Digital 3D Proof & Approval
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Inspect your custom 3D model from all angles before it touches physical materials. Free adjustments included.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#8B4513] mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-[#1C1917] text-base mb-1.5">
                  2. Fine Tactile Ceramic Curing
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Sculpted with dense composite resin giving a weighted, satisfying stone-like feel that does not feel like plastic.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#8B4513] mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-[#1C1917] text-base mb-1.5">
                  3. American Walnut & Brass Base
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Hand-rubbed organic walnut pedestal mounted with an engraved solid jeweler's brass plaque of your custom inscription.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Photo Requirements & Guidelines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold text-[#8B4513] uppercase tracking-widest block mb-2">
                Photo Selection Guide
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-4">
                What Makes an Ideal Photo?
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                You do not need professional studio photography. Everyday phone photos frequently contain the richest emotional soul.
              </p>

              <div className="space-y-3.5 text-xs text-[#57534E]">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E8E2D9]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block">Clear Facial Features:</strong>
                    Natural daylight or warm indoor lighting without harsh flash glares or severe backlighting.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E8E2D9]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block">Posture & Angle:</strong>
                    Frontal or slight three-quarter view showing head, shoulders, and body position clearly.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E8E2D9]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block">Separate Photos Can Combine:</strong>
                    If you have two separate photos of a couple, friends, or pets, our sculptors can compose them together.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] space-y-6">
              <h3 className="font-serif font-bold text-xl text-[#1C1917]">
                Production & Delivery Timelines
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center font-serif font-bold text-xs shrink-0 text-[#8B4513]">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">Digital 3D Proofing (3–5 Business Days)</h4>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      Our sculptors construct the 3D CAD mesh from your photograph and email high-res preview renders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center font-serif font-bold text-xs shrink-0 text-[#8B4513]">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">Physical Crafting & Detailing (7–10 Business Days)</h4>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      Upon your sign-off, the piece is cured, hand-detailed, sealed, and mounted on its custom walnut base.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center font-serif font-bold text-xs shrink-0 text-[#8B4513]">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917]">Insured Courier Delivery (3–5 Business Days)</h4>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      Packed in custom foam suspension within a gift box. Tracking number sent upon dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product FAQ */}
          <FaqAccordion />

        </div>

      </div>
    </div>
  );
};
