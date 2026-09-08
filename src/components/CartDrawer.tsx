import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Eye } from 'lucide-react';
import { CartItem } from '../types';
import { analytics } from '../services/analytics';
import { useLocale } from '../context/LocaleContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const { formatPrice } = useLocale();
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    analytics.beginCheckout(subtotal, items.length);
    onProceedCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8E2D9] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8B4513]" />
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                Your Keepsake Box ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-[#1C1917] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#78716C] mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Your keepsake box is empty
                </h3>
                <p className="text-xs text-[#78716C] mt-1 max-w-xs mx-auto">
                  Upload a photo to start crafting a custom 3D sculpture of someone you love.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8E2D9] space-y-3"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.photoPreviewUrl}
                      alt="Source photo"
                      className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D9] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-[#1C1917] text-sm truncate">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-[#8B4513] font-medium mt-0.5">
                        {item.sizeName} ({item.sizeHeight})
                      </p>
                      <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                        {item.baseName}
                      </p>
                      {item.customEngraving && (
                        <p className="text-[11px] text-stone-700 italic mt-0.5 truncate">
                          "{item.customEngraving}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                    <span className="text-[#78716C]">Qty: {item.quantity}</span>
                    <span className="font-serif font-bold text-sm text-[#1C1917]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}

            {/* Proof Reassurance */}
            {items.length > 0 && (
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70 text-xs text-[#57534E] flex items-start gap-2">
                <Eye className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
                <span>
                  Reminder: You will receive 360° digital proofs by email within 3–5 days to review & approve prior to crafting.
                </span>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D9] bg-[#FAF8F5] space-y-4">
              <div className="space-y-1.5 text-xs text-[#57534E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-sm text-[#1C1917]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Courier Shipping</span>
                  <span className="text-emerald-700 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>3D Digital Proof & Revisions</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E2D9] flex justify-between items-baseline">
                <span className="font-serif font-bold text-base text-[#1C1917]">Total</span>
                <span className="font-serif text-2xl font-bold text-[#1C1917]">${subtotal}</span>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-[#1C1917] hover:bg-[#292524] text-white rounded-full font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#78716C]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit SSL encrypted • Satisfaction guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
