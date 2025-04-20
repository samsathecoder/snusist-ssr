'use client';

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { products } from '../../data/products'; 
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const tabs = [
  { key: 'detay', label: 'Ürün Detayı' },
  { key: 'teslimat', label: 'Teslimat' },
  { key: 'odeme', label: 'Ödeme Yöntemleri' },
];

export default function ProductPage() {
  const { slug } = useParams();
  const productId = slug?.split('-')[0];
  const product = products.find((p) => p.id.toString() === productId);

  const [activeTab, setActiveTab] = useState('detay');

  if (!product) return notFound();

  const tabContent = {
    detay: product.description,
    teslimat: 'Siparişlerin havale ile ücret gönderiminde aynı gün kargoya verilir. 1-3 iş günü içerisinde elinize ulaşır. İstanbul içinde aynı gün teslimat hizmetimiz ve alırken ödeme imkanımız bulunmaktadır.',
    odeme: 'İstanbul içi elden teslim imkanıyla Kapıda ödeme veya  banka havalesi ile ödeme seçenekleri mevcuttur.',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={`/images/${product.name}-image.jpg`}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-2">{product.price}₺</p>
          <div className="flex justify-center mt-4">
  <Link
    href={`https://wa.me/905464205366?text=Merhaba, ${product.name} ürününü sipariş vermek istiyorum.`}
    target="_blank"
    className="flex items-center gap-2 bg-green-600 min-w-50 hover:bg-green-700 text-white text-base px-4 py-2 rounded-md transition shadow-md"
  >
    <FaWhatsapp size={24} />
    <span>Sipariş ver</span>
  </Link>
</div>
        </div>
      </div>

      {/* Tabbar */}
      <div className="mt-12">
        <div className="flex gap-4 border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 font-semibold transition border-b-2 ${
                activeTab === tab.key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-700 text-base leading-relaxed">
          {activeTab === 'detay' ? (
            <div dangerouslySetInnerHTML={{ __html: tabContent[activeTab] }} />
          ) : (
            <p>{tabContent[activeTab]}</p>
          )}
        </div>
      </div>
    </div>
  );
}
