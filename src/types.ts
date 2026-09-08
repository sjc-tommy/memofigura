export type PageRoute = 
  | '/'
  | '/custom-3d-figurine'
  | '/custom-pet-figurine'
  | '/custom-couple-figurine'
  | '/custom-family-figurine'
  | '/gifts'
  | '/wedding-gifts'
  | '/anniversary-gifts'
  | '/birthday-gifts'
  | '/pet-memorial'
  | '/how-it-works'
  | '/gallery'
  | '/reviews'
  | '/faq'
  | '/about'
  | '/photo-privacy'
  | '/shipping'
  | '/returns'
  | '/contact'
  | '/refer'
  | '/blog'
  | '/cart';

export type FigurineCategory = 
  | 'single' 
  | 'couple' 
  | 'family' 
  | 'pet' 
  | 'memorial' 
  | 'levitating' 
  | 'keychain' 
  | 'bust' 
  | 'accessory';

export interface FiguroProduct {
  id: string;
  handle: string;
  title: string;
  category: FigurineCategory;
  price: number;
  originalPrice: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  beforePhotoUrl?: string;
  description: string;
  features: string[];
  dimensions: string;
  isCustomPhoto: boolean;
}

export interface FigurineOption {
  id: string;
  name: string;
  category: FigurineCategory;
  basePrice: number;
  description: string;
  recommendedPhotoTip: string;
  popularOccasions: string[];
}

export type FigurineSize = {
  id: string;
  name: string;
  heightCm: number;
  heightInches: number;
  priceDelta: number;
  tag?: string;
  idealFor: string;
};

export interface CustomizationState {
  category: FigurineCategory;
  sizeId: string;
  finish: 'matte-fine' | 'artisan-patina';
  baseType: 'natural-walnut' | 'ebony-black' | 'none';
  customEngraving: string;
  specialInstructions: string;
  photoFile: File | null;
  photoPreviewUrl: string | null;
  subjectCount: number;
  includeGiftBox: boolean;
}

export interface CartItem {
  id: string;
  productName: string;
  category: FigurineCategory;
  sizeName: string;
  sizeHeight: string;
  finish: string;
  baseName: string;
  customEngraving: string;
  specialInstructions: string;
  photoPreviewUrl: string;
  price: number;
  quantity: number;
  addedAt: number;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: FigurineCategory;
  occasion: string;
  photoUrl: string;
  sculptUrl: string;
  figurineUrl: string;
  customerQuote: string;
  customerName: string;
  location: string;
  story: string;
  date: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  category: FigurineCategory;
  title: string;
  comment: string;
  photoUrl?: string;
  figurineUrl?: string;
  occasion: string;
  /** 买家所属国家（评论卡片底部署名用） */
  country: string;
  /** 国家旗帜 emoji，跟随 country 一起展示 */
  countryFlag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'photos' | 'design' | 'craft' | 'shipping' | 'privacy';
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage?: string;
  imageUrl?: string;
  content: string[];
  tags: string[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  joinedDate: string;
  ordersCount: number;
}

export type OrderStage = 
  | 'order_received' 
  | 'sculpting' 
  | 'proof_ready' 
  | 'production' 
  | 'shipped' 
  | 'delivered';

export interface TrackedOrder {
  orderNumber: string;
  date: string;
  customerEmail: string;
  customerName: string;
  itemsSummary: string;
  totalAmount: number;
  currency: string;
  status: OrderStage;
  statusLabel: string;
  statusDescription: string;
  proofUrl?: string;
  proofApproved?: boolean;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  shippingAddress?: string;
  photoUrl?: string;
}

export interface LocaleOption {
  code: string;
  country: string;
  flag: string;
  language: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number;
  /** 语种编号，对应 cn.apihz.cn 翻译接口的 ytype/etype（1=英语） */
  translationType: number;
}
