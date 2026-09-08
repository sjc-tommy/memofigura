import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Check, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  HelpCircle
} from 'lucide-react';
import { 
  FIGURINE_CATEGORIES, 
  FIGURINE_SIZES 
} from '../data/mockData';
import { 
  CustomizationState, 
  FigurineCategory, 
  CartItem 
} from '../types';
import { analytics } from '../services/analytics';
import { useLocale } from '../context/LocaleContext';

interface ProductCustomizerProps {
  initialCategory?: FigurineCategory;
  onAddToCart: (item: CartItem) => void;
  onInstantCheckout?: (item: CartItem) => void;
}

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  initialCategory = 'couple',
  onAddToCart,
  onInstantCheckout,
}) => {
  const { formatPrice } = useLocale();
  const [category, setCategory] = useState<FigurineCategory>(initialCategory);
  const [sizeId, setSizeId] = useState<string>(FIGURINE_SIZES[2]?.id || FIGURINE_SIZES[0]?.id || 'size-15cm');
  const [finish, setFinish] = useState<'matte-fine' | 'artisan-patina'>('matte-fine');
  const [baseType, setBaseType] = useState<'natural-walnut' | 'ebony-black' | 'none'>('natural-walnut');
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'upload' | 'options' | 'base' | 'review'>('upload');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Price calculation
  const currentCategoryData = FIGURINE_CATEGORIES.find((c) => c.category === category) || FIGURINE_CATEGORIES[0];
  const currentSizeData = FIGURINE_SIZES.find((s) => s.id === sizeId) || FIGURINE_SIZES[1];
  
  const basePrice = currentCategoryData.basePrice;
  const sizeDelta = currentSizeData.priceDelta;
  const finishDelta = finish === 'artisan-patina' ? 35 : 0;
  const baseDelta = baseType !== 'none' ? 25 : 0;
  const unitPrice = basePrice + sizeDelta + finishDelta + baseDelta;
  const totalPrice = unitPrice * quantity;

  // Handle Photo Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    analytics.uploadPhotoStarted('input_file');

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setPhotoName(file.name);
      analytics.uploadPhotoSuccess({
        sizeBytes: file.size,
        fileType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Build Cart Item
  const buildCurrentItem = (): CartItem => {
    return {
      id: `item-${Date.now()}`,
      productName: `Custom 3D ${currentCategoryData.name}`,
      category,
      sizeName: currentSizeData.name,
      sizeHeight: `${currentSizeData.heightCm}cm / ${currentSizeData.heightInches}"`,
      finish: finish === 'artisan-patina' ? 'Hand-Detailed Artisan' : 'Fine Ceramic Matte',
      baseName: baseType === 'natural-walnut' ? 'American Walnut with Brass Plaque' : baseType === 'ebony-black' ? 'Matte Ebony Base' : 'No Base',
      customEngraving: customEngraving.trim(),
      specialInstructions: specialInstructions.trim(),
      photoPreviewUrl: photoPreview || 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
      price: unitPrice,
      quantity,
      addedAt: Date.now(),
    };
  };

  const handleAdd = () => {
    const item = buildCurrentItem();
    analytics.customizationCompleted({
      category,
      size: currentSizeData.name,
      finish,
      hasEngraving: !!customEngraving.trim(),
      price: totalPrice,
    });
    analytics.addToCart({
      id: item.id,
      name: item.productName,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    });
    onAddToCart(item);
  };

  const handleBuyNow = () => {
    const item = buildCurrentItem();
    analytics.addToCart({
      id: item.id,
      name: item.productName,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    });
    if (onInstantCheckout) {
      onInstantCheckout(item);
    } else {
      onAddToCart(item);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm overflow-hidden" id="product-customizer-component">
      
      {/* Top Value Banner */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E]">
        <div className="flex items-center gap-1.5 font-medium">
          <Eye className="w-3.5 h-3.5 text-[#8B4513]" />
          <span>Includes 3D Digital Proof Approval before crafting</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#78716C]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Photos 100% Private & Protected</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-10">
        
        {/* STEP 1: Upload Photo */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                Upload Your Photo
              </h3>
            </div>
            <span className="text-xs text-[#78716C]">Any clear smartphone photo</span>
          </div>

          {!photoPreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#E8E2D9] hover:border-[#8B4513] rounded-2xl p-8 sm:p-10 text-center bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-all cursor-pointer group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="photo-file-upload-input"
              />
              <div className="w-12 h-12 rounded-full bg-white border border-[#E8E2D9] mx-auto flex items-center justify-center text-[#8B4513] group-hover:scale-110 transition-transform shadow-2xs">
                <Upload className="w-5 h-5" />
              </div>
              <p className="font-serif font-bold text-[#1C1917] text-base mt-4">
                Click to browse or drag & drop your photo here
              </p>
              <p className="text-xs text-[#78716C] mt-1 max-w-sm mx-auto">
                JPG, PNG, HEIC up to 25MB. High resolution produces the finest facial sculpt details.
              </p>
            </div>
          ) : (
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={photoPreview}
                  alt="Uploaded preview"
                  className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D9]"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Photo Uploaded Successfully</span>
                  </div>
                  <p className="text-xs text-[#57534E] mt-0.5 truncate max-w-xs sm:max-w-sm">
                    {photoName || 'Custom Photo'}
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-[#8B4513] hover:underline mt-1 font-medium cursor-pointer"
                  >
                    Change photo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <button
                onClick={handleRemovePhoto}
                className="p-2 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                title="Remove photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Photo Quality Tips Bar */}
          <div className="mt-3 bg-stone-50 rounded-xl p-3 border border-stone-200/80 flex items-start gap-2.5 text-xs text-[#57534E]">
            <Info className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#1C1917]">Photo Tip: </strong>
              Natural lighting where facial eyes and contours are clear produces astonishing results. If unsure, you can upload now; our sculptors review every photo before modeling.
            </div>
          </div>
        </div>

        {/* STEP 2: Subject & Category */}
        <div className="border-t border-[#F3EFEA] pt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
              Select Subject Format
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FIGURINE_CATEGORIES.map((cat) => {
              const isSelected = category === cat.category;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.category);
                    analytics.customizationStarted(cat.category);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#8B4513] bg-[#FAF8F5] ring-2 ring-[#8B4513]/20 shadow-2xs'
                      : 'border-[#E8E2D9] bg-white hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-[#78716C] mt-1 block line-clamp-2">
                      {cat.id === 'couple' && '2 people standing'}
                      {cat.id === 'single' && '1 person standing'}
                      {cat.id === 'pet' && 'Dog, cat or pet'}
                      {cat.id === 'halfbody' && 'Desk half-body bust'}
                      {cat.id === 'family' && '3+ people group'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#8B4513] mt-3 block">
                    From ${cat.basePrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Size & Scale */}
        <div className="border-t border-[#F3EFEA] pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                Choose Figurine Height
              </h3>
            </div>
            <span className="text-xs text-[#78716C]">Measured from base to crown</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FIGURINE_SIZES.map((size) => {
              const isSelected = sizeId === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setSizeId(size.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-[#8B4513] bg-[#FAF8F5] ring-2 ring-[#8B4513]/20 shadow-2xs'
                      : 'border-[#E8E2D9] bg-white hover:bg-[#FAF8F5]'
                  }`}
                >
                  {size.tag && (
                    <span className="absolute -top-2.5 right-3 bg-[#8B4513] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {size.tag}
                    </span>
                  )}
                  <div>
                    <span className="text-sm font-bold text-[#1C1917] block">
                      {size.name}
                    </span>
                    <span className="text-xs font-semibold text-[#8B4513] mt-0.5 block">
                      {size.heightCm} cm ({size.heightInches} inches)
                    </span>
                    <p className="text-[11px] text-[#78716C] mt-2 leading-normal">
                      {size.idealFor}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E8E2D9]/60 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      {size.priceDelta === 0 ? 'Standard' : `+$${size.priceDelta}`}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#8B4513]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Base & Custom Engraving */}
        <div className="border-t border-[#F3EFEA] pt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
              Base & Custom Brass Plaque
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => setBaseType('natural-walnut')}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                baseType === 'natural-walnut'
                  ? 'border-[#8B4513] bg-[#FAF8F5] ring-2 ring-[#8B4513]/20'
                  : 'border-[#E8E2D9] bg-white'
              }`}
            >
              <span className="text-xs font-bold text-[#1C1917] block">
                American Solid Walnut (+<span data-no-translate>{formatPrice(25)}</span>)
              </span>
              <span className="text-[11px] text-[#78716C] mt-1 block">
                Hand-rubbed organic oil finish with polished brass engraving plaque.
              </span>
            </button>

            <button
              onClick={() => setBaseType('ebony-black')}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                baseType === 'ebony-black'
                  ? 'border-[#8B4513] bg-[#FAF8F5] ring-2 ring-[#8B4513]/20'
                  : 'border-[#E8E2D9] bg-white'
              }`}
            >
              <span className="text-xs font-bold text-[#1C1917] block">
                Matte Ebony Wood (+<span data-no-translate>{formatPrice(25)}</span>)
              </span>
              <span className="text-[11px] text-[#78716C] mt-1 block">
                Deep black matte hardwood for ultra-contemporary spaces.
              </span>
            </button>

            <button
              onClick={() => {
                setBaseType('none');
                setCustomEngraving('');
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                baseType === 'none'
                  ? 'border-[#8B4513] bg-[#FAF8F5] ring-2 ring-[#8B4513]/20'
                  : 'border-[#E8E2D9] bg-white'
              }`}
            >
              <span className="text-xs font-bold text-[#1C1917] block">
                Freeform (No Base)
              </span>
              <span className="text-[11px] text-[#78716C] mt-1 block">
                Self-standing sculpted figurine without pedestal.
              </span>
            </button>
          </div>

          {/* Custom Brass Plaque Engraving Input */}
          {baseType !== 'none' && (
            <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8E2D9] space-y-2">
              <label htmlFor="custom-engraving-text" className="text-xs font-semibold text-[#1C1917] flex items-center justify-between">
                <span>Personalized Brass Plaque Engraving (Optional)</span>
                <span className="text-[#78716C] text-[11px]">{customEngraving.length}/45 chars</span>
              </label>
              <input
                id="custom-engraving-text"
                type="text"
                maxLength={45}
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                placeholder='e.g., "Forever & Always • 10.14.2023" or "Barnaby 2012–2024"'
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
              />
              <p className="text-[11px] text-[#78716C]">
                Laser-engraved onto solid jeweler's brass mounted on the front edge of the wooden pedestal.
              </p>
            </div>
          )}
        </div>

        {/* STEP 5: Special Sculptor Instructions */}
        <div className="border-t border-[#F3EFEA] pt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs font-bold flex items-center justify-center">
              5
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
              Special Artisan Notes
            </h3>
          </div>
          
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            rows={2}
            placeholder="e.g. Please capture Julian's jacket color accurately, or combine the pose from reference photo #2..."
            className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl p-4 text-sm text-[#1C1917] focus:outline-none focus:border-[#8B4513]"
          />
        </div>

        {/* Order Summary & Primary Conversion Bar */}
        <div className="border-t-2 border-[#1C1917] pt-8 bg-[#FAF8F5] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div>
              <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wider block">
                Total Custom Keepsake Price
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded border border-emerald-200">
                  Free Tracked Insured Shipping
                </span>
              </div>
              <p className="text-xs text-[#78716C] mt-1">
                Includes Digital Proof Approval + Solid Walnut Base + Unlimited Revisions
              </p>
            </div>

            {/* Conversion CTA buttons */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAdd}
                id="customizer-add-to-cart-btn"
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-stone-50 text-[#1C1917] border border-[#E8E2D9] font-medium text-sm rounded-full transition-all cursor-pointer shadow-2xs"
              >
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                id="customizer-checkout-btn"
                className="w-full sm:w-auto px-8 py-4 bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-sm rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create My Figurine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Reassurance Micro-copy */}
          <div className="mt-6 pt-5 border-t border-[#E8E2D9] flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-[11px] text-[#78716C]">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              3D Proof sent in 3–5 days
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              100% Approval Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Private Encrypted Photos
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
