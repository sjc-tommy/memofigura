import React from 'react';
import { X, Globe, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

interface SitemapUrl {
  loc: PageRoute;
  changefreq: string;
  priority: string;
  title: string;
  category: 'Core' | 'Product Landing Pages' | 'Occasions & Gifts' | 'Trust & Guarantees' | 'Editorial';
}

const SITEMAP_URLS: SitemapUrl[] = [
  { loc: '/', changefreq: 'weekly', priority: '1.0', title: 'Homepage', category: 'Core' },
  { loc: '/custom-3d-figurine', changefreq: 'weekly', priority: '0.9', title: 'Custom 3D Figurine (Flagship)', category: 'Core' },
  { loc: '/how-it-works', changefreq: 'monthly', priority: '0.8', title: 'How It Works', category: 'Core' },
  { loc: '/gallery', changefreq: 'weekly', priority: '0.8', title: 'Customer Transformation Gallery', category: 'Core' },
  { loc: '/reviews', changefreq: 'weekly', priority: '0.8', title: 'Customer Reviews & Stories', category: 'Core' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.7', title: 'Frequently Asked Questions', category: 'Core' },
  
  { loc: '/custom-pet-figurine', changefreq: 'weekly', priority: '0.85', title: 'Custom Pet Figurines (Dogs & Cats)', category: 'Product Landing Pages' },
  { loc: '/custom-couple-figurine', changefreq: 'weekly', priority: '0.85', title: 'Custom Couple & Romance Figurines', category: 'Product Landing Pages' },
  { loc: '/custom-family-figurine', changefreq: 'weekly', priority: '0.85', title: 'Custom Family & Generational Figurines', category: 'Product Landing Pages' },

  { loc: '/gifts', changefreq: 'weekly', priority: '0.8', title: 'Personalized Photo Gifts Hub', category: 'Occasions & Gifts' },
  { loc: '/wedding-gifts', changefreq: 'monthly', priority: '0.75', title: 'Wedding Day Keepsakes & Toppers', category: 'Occasions & Gifts' },
  { loc: '/anniversary-gifts', changefreq: 'monthly', priority: '0.75', title: 'Meaningful Anniversary Keepsakes', category: 'Occasions & Gifts' },
  { loc: '/birthday-gifts', changefreq: 'monthly', priority: '0.75', title: 'Milestone Birthday Keepsakes', category: 'Occasions & Gifts' },
  { loc: '/pet-memorial', changefreq: 'monthly', priority: '0.75', title: 'Rainbow Bridge Pet Memorials', category: 'Occasions & Gifts' },

  { loc: '/photo-privacy', changefreq: 'monthly', priority: '0.7', title: 'Photo Privacy & Security Policy', category: 'Trust & Guarantees' },
  { loc: '/shipping', changefreq: 'monthly', priority: '0.6', title: 'Insured Shipping & Packaging', category: 'Trust & Guarantees' },
  { loc: '/returns', changefreq: 'monthly', priority: '0.6', title: 'Digital Proof Approval & Returns', category: 'Trust & Guarantees' },
  { loc: '/about', changefreq: 'monthly', priority: '0.6', title: 'Our Brand Philosophy & Story', category: 'Trust & Guarantees' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6', title: 'Design Concierge Contact', category: 'Trust & Guarantees' },
  { loc: '/refer', changefreq: 'monthly', priority: '0.6', title: 'Refer & Earn Keepsake Credit', category: 'Trust & Guarantees' },

  { loc: '/blog', changefreq: 'weekly', priority: '0.7', title: 'Journal & Gift Guides', category: 'Editorial' },
];

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const categories = Array.from(new Set(SITEMAP_URLS.map((u) => u.category)));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-[#E8E2D9] max-w-3xl w-full shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#8B4513]" />
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                Google SEO Sitemap & URL Architecture
              </h2>
              <p className="text-xs text-[#78716C]">
                Clean, indexable canonical URLs with structured JSON-LD per page
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#1C1917] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* URL List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {categories.map((cat) => (
            <div key={cat} className="space-y-2">
              <h3 className="text-xs font-bold text-[#8B4513] uppercase tracking-wider">
                {cat}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SITEMAP_URLS.filter((u) => u.category === cat).map((item) => (
                  <button
                    key={item.loc}
                    onClick={() => {
                      onNavigate(item.loc);
                      onClose();
                    }}
                    className="text-left p-3 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] hover:border-[#8B4513] transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-xs text-[#1C1917] group-hover:text-[#8B4513]">
                        {item.title}
                      </p>
                      <p className="font-mono text-[10px] text-[#78716C] mt-0.5">
                        https://memofigura.com{item.loc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">
                      P:{item.priority}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D9] text-center text-xs text-[#78716C]">
          <span>Full XML Sitemap format available at </span>
          <code className="bg-stone-200 px-1.5 py-0.5 rounded text-[11px] text-stone-800">
            https://memofigura.com/sitemap.xml
          </code>
        </div>

      </div>
    </div>
  );
};
