import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

export const FiguroMarqueeRibbon: React.FC = () => {
  const items = [
    { icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />, text: 'FLASH SALE: Up to 50% Off This Week' },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: 'Free 3D Digital Preview Proof (Unlimited Revisions)' },
    { icon: <Truck className="w-3.5 h-3.5 text-sky-400" />, text: 'Express Tracked Shipping to USA, UK, EU, CA & AU' },
    { icon: <RefreshCw className="w-3.5 h-3.5 text-rose-400" />, text: '100% Money Back Guarantee Before Printing' },
    { icon: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />, text: '4.9/5 Rating from 4,800+ Happy Customers' },
  ];

  return (
    <div className="w-full bg-[#1A1A1A] text-[#FDFCFB] overflow-hidden py-2.5 border-b border-black/20 select-none">
      <div className="flex animate-marquee whitespace-nowrap gap-10 text-[12px] font-medium tracking-wider uppercase">
        {/* Double array for seamless loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-white/90">
            {item.icon}
            <span>{item.text}</span>
            <span className="text-white/30 ml-8">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
