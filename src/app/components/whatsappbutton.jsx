'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/905464205366"
      className="fixed bottom-6 right-6 z-50"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp İletişim"
    >
      <div className="relative group">
        {/* Nabız animasyonu */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-70 blur-md animate-ping" />

        {/* Asıl ikon alanı */}
        <div className="relative z-10 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-all transform group-hover:scale-110">
          <FaWhatsapp size={28} />
        </div>
      </div>
    </a>
  );
}
