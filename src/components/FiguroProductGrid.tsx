import React, { useState } from 'react';
import { Star, Sparkles, ArrowRight, Eye, Check, ShieldCheck, Heart } from 'lucide-react';
import { FiguroProduct, CartItem } from '../types';
import { FIGURO_PRODUCTS } from '../data/mockData';
import { useLocale } from '../context/LocaleContext';
import { FiguroQuickViewModal } from './FiguroQuickViewModal';

interface FiguroProductGridProps {
  onSelectProduct?: (product: FiguroProduct) => void;
  onAddToCart?: (item: CartItem) => void;
  onNavigateToCustomize?: () => void;
}

export const FiguroProductGrid: React.FC<FiguroProductGridProps> = ({
  onAddToCart,
  onNavigateToCustomize,
}) => {
  const { formatPrice } = useLocale();
  const [activeFilter, setActiveFilter] = useState<'all' | 'portraits' | 'pets' | 'viral' | 'accessories'>('all');
  const [selectedProduct, setSelectedProduct] = useState<FiguroProduct | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProducts = FIGURO_PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'portraits') return ['single', 'couple', 'family', 'bust'].includes(product.category);
    if (activeFilter === 'pets') return product.category === 'pet';
    if (activeFilter === 'viral') return ['levitating', 'keychain'].includes(product.category);
    if (activeFilter === 'accessories') return product.category === 'accessory';
    return true;
  });

  const handleOpenQuickView = (product: FiguroProduct) => {
    setSelectedProduct(product);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#EAE4DD]" id="figuro-catalog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4DD]/60 text-[#8C7A66] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Official Collections
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
            Turn Any Photo Into A 3D Keepsake
          </h2>
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#666] leading-relaxed">
            Choose your format below. We sculpt each model by hand, send you a 3D digital proof for approval, and only print once you are 100% satisfied.
          </p>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#666] border border-[#EAE4DD] hover:border-[#8C7A66]'
              }`}
            >
              All Products ({FIGURO_PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('portraits')}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === 'portraits'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#666] border border-[#EAE4DD] hover:border-[#8C7A66]'
              }`}
            >
              Portraits & Couples
            </button>
            <button
              onClick={() => setActiveFilter('pets')}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === 'pets'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#666] border border-[#EAE4DD] hover:border-[#8C7A66]'
              }`}
            >
              Pet Keepsakes
            </button>
            <button
              onClick={() => setActiveFilter('viral')}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === 'viral'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#666] border border-[#EAE4DD] hover:border-[#8C7A66]'
              }`}
            >
              Floating & Keychain
            </button>
            <button
              onClick={() => setActiveFilter('accessories')}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === 'accessories'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white text-[#666] border border-[#EAE4DD] hover:border-[#8C7A66]'
              }`}
            >
              Cases & Stands
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isHovered = hoveredId === product.id;
            const displayImg = isHovered && product.secondaryImageUrl ? product.secondaryImageUrl : product.imageUrl;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#EAE4DD] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div>
                  {/* Top Image Container */}
                  <div className="relative aspect-4/3 sm:aspect-square w-full bg-[#F5F1EE] overflow-hidden">
                    <img
                      src={displayImg}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A1A1A]/90 text-white backdrop-blur-xs shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                      <button
                        type="button"
                        onClick={() => handleOpenQuickView(product)}
                        className="px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#1A1A1A] text-[12px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-transform transform active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8C7A66]" />
                        <span>Quick Customize</span>
                      </button>
                    </div>

                    {/* Save percentage pill */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-1.5 text-[12px]">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-[#1A1A1A]">{product.rating}</span>
                      <span className="text-[#888]">({product.reviewCount})</span>
                    </div>

                    {/* Product Title */}
                    <h3 
                      onClick={() => handleOpenQuickView(product)}
                      className="font-serif text-[17px] font-normal text-[#1A1A1A] line-clamp-1 group-hover:text-[#8C7A66] transition-colors cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    {/* Features Snippet */}
                    <p className="text-[12px] text-[#666] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-xl font-bold text-[#1A1A1A]">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-[#999] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleOpenQuickView(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333] text-white text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group-hover:shadow-md"
                  >
                    <span>Customize & Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guaranteed Proof Banner beneath products */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-[#EAE4DD] shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#EAE4DD]">
            <div className="flex flex-col items-center p-2">
              <span className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7A66] mb-2 font-bold text-base">
                1
              </span>
              <h4 className="font-semibold text-sm text-[#1A1A1A]">Send Your Favorite Photo</h4>
              <p className="text-xs text-[#666] mt-1">Upload on checkout or email it later. We inspect image clarity for free.</p>
            </div>
            <div className="flex flex-col items-center p-2 sm:px-6">
              <span className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7A66] mb-2 font-bold text-base">
                2
              </span>
              <h4 className="font-semibold text-sm text-[#1A1A1A]">Approve Your 3D Proof</h4>
              <p className="text-xs text-[#666] mt-1">Unlimited free revisions. We never start 3D printing without your consent.</p>
            </div>
            <div className="flex flex-col items-center p-2 sm:pl-6">
              <span className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#8C7A66] mb-2 font-bold text-base">
                3
              </span>
              <h4 className="font-semibold text-sm text-[#1A1A1A]">8K DLP Hand-Finished</h4>
              <p className="text-xs text-[#666] mt-1">Hand-painted and delivered safely in custom laser-cut shockproof foam.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Quick View Customization Modal */}
      <FiguroQuickViewModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(item) => {
          if (onAddToCart) onAddToCart(item);
        }}
      />
    </section>
  );
};
