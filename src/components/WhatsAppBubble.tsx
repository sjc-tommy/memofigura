import React from 'react';

/** 客服 WhatsApp 悬浮气泡。号码优先读 .env 里的 VITE_WHATSAPP_NUMBER（国际格式，无 + 无空格）。 */
const FALLBACK_WHATSAPP_NUMBER = '85200000000';
const WHATSAPP_NUMBER = String(
  import.meta.env.VITE_WHATSAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER
).replace(/\D/g, '');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi MemoFigura! I have a question about my order.'
)}`;

export const WhatsAppBubble: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2"
    >
      <span className="hidden sm:inline-flex items-center text-xs font-semibold text-white bg-[#1A1A1A]/90 px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        Chat with us
      </span>
      <span className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5B] shadow-xl flex items-center justify-center transition-transform group-hover:scale-105">
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" aria-hidden="true">
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.72 12.72 0 0 0 16.004 3.2zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.55 10.55 0 0 1-1.62-5.63c0-5.85 4.76-10.6 10.61-10.6 2.83 0 5.5 1.1 7.5 3.11a10.53 10.53 0 0 1 3.1 7.51c0 5.85-4.75 10.6-10.6 10.6zm5.82-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.44 5.46 4.82.76.33 1.36.52 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </span>
    </a>
  );
};
