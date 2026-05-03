'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import CategoryProductsCarousel from '@/components/RelatedProducts';

interface ProductClientProps {
  product: {
    title: string;
    price: number;
    description: string;
    seoDescription: string;
    category: string;
    slug: string;
    coverImage?: string;
  };
  allProducts: {
    title: string;
    price: number;
    category: string;
    slug: string;
    coverImage?: string;
  }[];
}

const tabs = [
  { key: 'detay', label: 'Ürün Detayı' },
  { key: 'teslimat', label: 'Teslimat' },
  { key: 'odeme', label: 'Ödeme Yöntemleri' },
];

export default function ProductClient({ product, allProducts }: ProductClientProps) {
  const [activeTab, setActiveTab] = useState<'detay' | 'teslimat' | 'odeme'>('detay');

  // Product resim path'ini belirle - product title'ından dinamik path oluştur
  const getProductImage = () => {
    if (product.coverImage) {
      return product.coverImage;
    }
    // Eğer coverImage yoksa, product.title'ı kullanarak images klasöründen al
    // Örnek: "Velo Freezing Peppermint" -> "/images/Velo Freezing Peppermint-image.webp"
    return `/images/${encodeURIComponent(product.title)}-image.webp`;
  };

  const productImage = getProductImage();

  const tabContent: Record<string, string> = {
    detay: product.description,
    teslimat:
      'Siparişlerin havale ile ücret gönderiminde aynı gün kargoya verilir. 1-3 iş günü içerisinde elinize ulaşır. İstanbul içinde aynı gün teslimat hizmetimiz ve alırken ödeme imkanımız bulunmaktadır.',
    odeme:
      'İstanbul içi elden teslim imkanıyla Kapıda ödeme veya banka havalesi ile ödeme seçenekleri mevcuttur.',
  };

  return (
    <>

<div className="max-w-6xl mx-auto px-4  "> 
   <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">         <Image
    src={productImage}
    alt={product.title}
    width={600}
    height={600}
    className="rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
    priority
    unoptimized
  />

<div className="flex flex-col justify-center bg-gray-50 p-6 rounded-2xl shadow-sm">            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-500 text-sm mt-2 mb-4">
  {product.seoDescription}
</p>
          
<p className="text-2xl font-bold text-blue-600 mb-2">
  {product.price}₺
</p>
<div className="mt-6">              <Link
  href={`https://wa.me/905464205366?text=Merhaba, ${product.title} sipariş vermek istiyorum.`}
  target="_blank"
className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-base px-6 py-4 rounded-2xl transition shadow-lg hover:shadow-2xl active:scale-95">
  <FaWhatsapp size={22} />
  <span className="font-semibold">WhatsApp ile Sipariş Ver</span>
</Link>
            </div>
          </div>
        </div>

        {/* Tablar */}
<div className="mt-12 bg-white rounded-2xl shadow-md p-6">          <div className="flex gap-4 border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'detay' | 'teslimat' | 'odeme')}
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
<div className="mt-12">
  <h2 className="text-xl font-bold mb-4">Benzer Ürünler</h2>
        {/* Benzer ürünler */}
        <CategoryProductsCarousel
          allProducts={allProducts}
          currentCategory={product.category}
          currentSlug={product.slug}
        />
              </div>
</div>
      </div>
    </>
  );
}
