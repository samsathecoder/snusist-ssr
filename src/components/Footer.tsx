'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import PromoBanner from './home/PromoBanner';
import { Product } from '@/types';

interface FooterProps {
  allProducts: Product[];
}

export default function Footer({ allProducts }: FooterProps) {
  return (
    <footer className="bg-gradient-to-bl from-cyan-800 via-blue-950 to-cyan-800 text-white pt-16 ">
<PromoBanner allProducts={allProducts} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Snusist</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Türkiye&apos;nin snus mağazası. Orijinal ürün garantisi ve hızlı
              teslimat ile hizmetinizdeyiz.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Kurumsal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/hakkimizda" className="hover:text-white transition">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition">İletişim</Link></li>
              <li><Link href="/sss" className="hover:text-white transition">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Yasal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/gizlilik-politikasi" className="hover:text-white transition">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-sartlari" className="hover:text-white transition">Kullanım Şartları</Link></li>
              <li><Link href="/iade-politikasi" className="hover:text-white transition">İade Politikası</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="https://wa.me/905464205366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  WhatsApp: +90 546 420 53 66
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/snuss.istanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Instagram: @snuss.istanbul
                </a>
              </li>
              <li>İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        {/* Alt copyright alanı */}
        <div className="text-center text-gray-400 mt-8 pt-4 border-t border-gray-700">
          <p className="text-sm leading-tight m-0 p-0">&copy; 2025 snusist. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
