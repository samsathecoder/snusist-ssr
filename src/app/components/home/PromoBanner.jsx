'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '../../data/products';

export default function PromoBanner() {
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOrderClick = () => {
    if (selectedProduct) {
      const message = `Merhaba, ${selectedProduct} ürünü hakkında sipariş vermek istiyorum.`;
      const url = `https://wa.me/905464205366?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  return (
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">

        {/* Sosyal Medya Alanı */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">📷 Bizi Instagram’da Takip Edin</h3>
          <a
            href="https://instagram.com/snuss.istanbul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm bg-white text-zinc-800 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
          >
            Instagram’a Git →
          </a>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">🌟 Google Yorum Bırakın</h3>
            <a
              href="https://g.page/r/CZNEdwEkrb8LEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm bg-white text-zinc-800 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Yorum Yap →
            </a>
          </div>
        </div>

        {/* Boş ya da bilgi alanı */}
        <div className="grid grid-cols-1 gap-8 text-center md:text-left">
        {/* İletişim Bölümü */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-2">İletişim</h4>
            <p className="text-sm text-gray-300">+90 546 420 53 66</p>
            <p className="text-sm text-gray-300">snusist@gmail.com</p>
          </div>

          </div>

        {/* WhatsApp Sipariş Alanı */}
        <div className="bg-white/10 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">📦 Hızlı Sipariş Ver</h3>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-white text-zinc-900"
          >
            <option value="">Bir ürün seçin</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleOrderClick}
            disabled={!selectedProduct}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition disabled:opacity-50"
          >
            WhatsApp’tan Sipariş Ver 📲
          </button>
        </div>
      </div>
  );
}
