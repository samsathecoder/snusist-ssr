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

      <div className="max-w-5xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image
            src={productImage}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg shadow"
            priority
            unoptimized
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-700 mb-2">{product.price}₺</p>

            <div className="flex justify-center mt-4">
              <Link
                href={`https://wa.me/905464205366?text=Merhaba, ${product.title} ürününü sipariş vermek istiyorum.`}
                target="_blank"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-base px-4 py-2 rounded-md transition shadow-md"
              >
                <FaWhatsapp size={24} />
                <span>Sipariş ver</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tablar */}
        <div className="mt-12">
          <div className="flex gap-4 border-b border-gray-300">
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

        {/* Benzer ürünler */}
        <CategoryProductsCarousel
          allProducts={allProducts}
          currentCategory={product.category}
          currentSlug={product.slug}
        />
      </div>
    </>
  );
}
