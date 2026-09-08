import React, { useState, useRef } from 'react';
import { 
  X, 
  Star, 
  Upload, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Eye,
  Info,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { FiguroProduct, FigurineSize, CartItem } from '../types';
import { FIGURINE_SIZES } from '../data/mockData';
import { useLocale } from '../context/LocaleContext';

interface FiguroQuickViewModalProps {
  product: FiguroProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const FiguroQuickViewModal: React.FC<FiguroQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const { formatPrice } = useLocale();

  const [selectedSize, setSelectedSize] = useState<FigurineSize>(FIGURINE_SIZES[2] || FIGURINE_SIZES[0]); // 15cm
  const [selectedFinish, setSelectedFinish] = useState<'full-color' | 'mono-marble'>('full-color');
  const [withEngravedBase, setWithEngravedBase] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [withDisplayCase, setWithDisplayCase] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when product changes
  React.useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
      setShowBeforeAfter(false);
      setPhotoPreview(null);
      setPhotoName(null);
      setAddedNotice(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Calculate dynamic price
  const basePrice = product.price;
  const sizeDelta = product.isCustomPhoto ? selectedSize.priceDelta : 0;
  const finishDelta = selectedFinish === 'full-color' ? 0 : -15; // mono discount
  const baseDelta = withEngravedBase ? 25 : 0;
  const caseDelta = withDisplayCase ? 39 : 0;
  const unitPrice = Math.max(29, basePrice + sizeDelta + finishDelta + baseDelta + caseDelta);
  const totalPrice = unitPrice * quantity;

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const item: CartItem = {
      id: `figuro-${product.id}-${Date.now()}`,
      productName: product.title,
      category: product.category,
      sizeName: selectedSize.name,
      sizeHeight: `${selectedSize.heightCm}cm / ${selectedSize.heightInches}"`,
      finish: selectedFinish === 'full-color' ? 'Full-Color Artisan Hand Painted' : 'Classic White Marble Mono',
      baseName: withEngravedBase ? 'Engraved American Walnut Base' : 'Standard Flush Base',
      customEngraving: engravingText.trim(),
      specialInstructions: withDisplayCase ? 'Includes UV-Acrylic LED Spotlight Display Box' : '',
      photoPreviewUrl: photoPreview || product.imageUrl,
      price: unitPrice,
      quantity,
      addedAt: Date.now(),
    };

    onAddToCart(item);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#EAE4DD] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery & Before/After */}
          <div className="p-6 sm:p-8 bg-[#F8F6F3] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE4DD]">
            <div>
              {/* Badge & Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#1A1A1A] text-white">
                  {product.badge || 'Figuro Original'}
                </span>
                <div className="flex items-center gap-1 text-[13px] text-[#1A1A1A]">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-[#888]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Main Image Display */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#EAE4DD] shadow-inner">
                {showBeforeAfter && product.beforePhotoUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={product.beforePhotoUrl}
                      alt="Original Reference"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-black/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      Original Reference Photo
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={photoPreview || activeImage}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    {photoPreview && (
                      <span className="absolute bottom-3 left-3 bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Check className="w-3 h-3" /> Your Uploaded Photo
                      </span>
                    )}
                  </div>
                )}

                {/* Before/After Toggle if photo exists */}
                {product.beforePhotoUrl && !photoPreview && (
                  <button
                    type="button"
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    className="absolute top-3 left-3 bg-white/95 hover:bg-white text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8C7A66]" />
                    <span>{showBeforeAfter ? 'View 3D Figurine' : 'View Original Photo'}</span>
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveImage(product.imageUrl);
                    setShowBeforeAfter(false);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === product.imageUrl && !showBeforeAfter
                      ? 'border-[#1A1A1A]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.imageUrl} alt="View 1" className="w-full h-full object-cover" />
                </button>

                {product.secondaryImageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveImage(product.secondaryImageUrl!);
                      setShowBeforeAfter(false);
                    }}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === product.secondaryImageUrl && !showBeforeAfter
                        ? 'border-[#1A1A1A]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.secondaryImageUrl} alt="View 2" className="w-full h-full object-cover" />
                  </button>
                )}

                {product.beforePhotoUrl && (
                  <button
                    type="button"
                    onClick={() => setShowBeforeAfter(true)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      showBeforeAfter
                        ? 'border-[#8C7A66]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.beforePhotoUrl} alt="Photo" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="mt-4 pt-4 border-t border-[#EAE4DD] space-y-2 text-[12px] text-[#666]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free 3D digital proof before production</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% money-back guarantee if not satisfied</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tracked worldwide delivery with protective custom foam</span>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Title & Pricing */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light">
                {product.title}
              </h2>
              <p className="text-[13px] text-[#666] mt-1 line-clamp-2">
                {product.description}
              </p>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-[#EAE4DD]">
                <span className="text-3xl font-bold text-[#1A1A1A]">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-lg text-[#999] line-through">
                  {formatPrice(product.originalPrice * quantity)}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
                  SAVE 40%
                </span>
              </div>

              {/* 1. Photo Upload (if custom product) */}
              {product.isCustomPhoto && (
                <div className="mt-5">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                    Step 1: Upload Your Photo <span className="text-rose-500">*</span>
                  </label>
                  
                  {photoPreview ? (
                    <div className="flex items-center justify-between p-3 bg-[#F4FBF7] border border-emerald-300 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={photoPreview} alt="Uploaded preview" className="w-12 h-12 rounded-lg object-cover border" />
                        <div>
                          <p className="text-[13px] font-semibold text-emerald-900 truncate max-w-[170px]">
                            {photoName || 'Photo Attached'}
                          </p>
                          <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Ready for 3D sculpting
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPreview(null);
                          setPhotoName(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="text-[#999] hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#D1C7BD] hover:border-[#8C7A66] rounded-xl p-4 text-center cursor-pointer transition-colors bg-[#FAF8F5]"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Upload className="w-6 h-6 text-[#8C7A66] mx-auto mb-1.5" />
                      <p className="text-[13px] font-bold text-[#1A1A1A]">
                        Click or drag photo here
                      </p>
                      <p className="text-[11px] text-[#777] mt-0.5">
                        High resolution portrait, candid, or full body
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Size Selector */}
              {product.isCustomPhoto && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Step 2: Choose Figurine Size
                    </label>
                    <span className="text-[11px] text-[#8C7A66] font-medium">
                      Height: {selectedSize.heightCm}cm / {selectedSize.heightInches}"
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {FIGURINE_SIZES.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedSize.id === size.id
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm'
                            : 'border-[#EAE4DD] bg-white text-[#1A1A1A] hover:border-[#8C7A66]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-bold">{size.heightCm}cm</span>
                          {size.tag && (
                            <span className={`text-[9px] px-1 py-0.5 rounded ${
                              selectedSize.id === size.id ? 'bg-white/20 text-white' : 'bg-[#EAE4DD] text-[#666]'
                            }`}>
                              {size.tag.split(' ')[0]}
                            </span>
                          )}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${
                          selectedSize.id === size.id ? 'text-white/80' : 'text-[#777]'
                        }`}>
                          {size.priceDelta === 0 ? 'Standard' : size.priceDelta > 0 ? `+${formatPrice(size.priceDelta)}` : `${formatPrice(size.priceDelta)}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Finish / Painting Style */}
              {product.isCustomPhoto && (
                <div className="mt-5">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                    Color & Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFinish('full-color')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedFinish === 'full-color'
                          ? 'border-[#8C7A66] bg-[#FAF8F5] ring-1 ring-[#8C7A66]'
                          : 'border-[#EAE4DD] bg-white hover:border-[#CCC]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-[#1A1A1A]">🎨 Full-Color Hand Painted</span>
                        {selectedFinish === 'full-color' && <Check className="w-3.5 h-3.5 text-[#8C7A66]" />}
                      </div>
                      <p className="text-[11px] text-[#666] mt-0.5">True-to-life skin tones & clothes</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFinish('mono-marble')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedFinish === 'mono-marble'
                          ? 'border-[#8C7A66] bg-[#FAF8F5] ring-1 ring-[#8C7A66]'
                          : 'border-[#EAE4DD] bg-white hover:border-[#CCC]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-[#1A1A1A]">🏛️ Classical Marble Mono</span>
                        {selectedFinish === 'mono-marble' && <Check className="w-3.5 h-3.5 text-[#8C7A66]" />}
                      </div>
                      <p className="text-[11px] text-[#666] mt-0.5">Museum white carved aesthetic</p>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Optional Add-ons */}
              <div className="mt-5 space-y-2.5">
                <label className="block text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Recommended Add-Ons
                </label>

                {/* Walnut Base */}
                <div className={`p-3 rounded-xl border transition-all ${
                  withEngravedBase ? 'border-[#8C7A66] bg-[#FAF8F5]' : 'border-[#EAE4DD] bg-white'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={withEngravedBase}
                        onChange={(e) => setWithEngravedBase(e.target.checked)}
                        className="w-4 h-4 accent-[#1A1A1A] rounded"
                      />
                      <div>
                        <span className="text-[13px] font-semibold text-[#1A1A1A]">
                          Engraved Solid Walnut Base
                        </span>
                        <p className="text-[11px] text-[#777]">Natural hardwood plinth with brass custom plaque</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-[#1A1A1A]">+{formatPrice(25)}</span>
                  </label>

                  {withEngravedBase && (
                    <div className="mt-2 pt-2 border-t border-[#EAE4DD]">
                      <input
                        type="text"
                        placeholder="Custom engraving (e.g. 'Emma & Julian • 06.24.2026')"
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        maxLength={40}
                        className="w-full text-[12px] px-3 py-1.5 border border-[#D1C7BD] rounded-lg focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  )}
                </div>

                {/* Display Case */}
                <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  withDisplayCase ? 'border-[#8C7A66] bg-[#FAF8F5]' : 'border-[#EAE4DD] bg-white'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={withDisplayCase}
                      onChange={(e) => setWithDisplayCase(e.target.checked)}
                      className="w-4 h-4 accent-[#1A1A1A] rounded"
                    />
                    <div>
                      <span className="text-[13px] font-semibold text-[#1A1A1A]">
                        Dust-Proof Case with LED Spotlight
                      </span>
                      <p className="text-[11px] text-[#777]">Ultra-clear acrylic showcase with overhead warm LED</p>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-[#1A1A1A]">+{formatPrice(39)}</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#EAE4DD]">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D1C7BD] rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-sm font-semibold text-[#555] hover:bg-[#F5F1EE] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#1A1A1A]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-sm font-semibold text-[#555] hover:bg-[#F5F1EE] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={addedNotice}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedNotice 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#1A1A1A] text-white hover:bg-[#333] shadow-md'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Cart!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Cart • {formatPrice(totalPrice)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#888]">
                <span>⚡ Estimated Dispatch: 7-10 Business Days</span>
                <span>🔒 Secure 256-Bit Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
