





'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import Product, { IProduct } from "@/models/Product"; 
import Image from 'next/image';
type Props = { products: IProduct[] };

export default function Navbar({ products = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

 useEffect(() => {
  
   // 3 harften azsa filtreleme yapma
   if (searchQuery.trim().length < 3) {
     if (filteredProducts.length > 0) setFilteredProducts([]);
     return;
   }

   // 300ms debounce: her tuş vuruşunda hemen değil, 300ms sonra filtrele
   const timeout = setTimeout(() => {
     const results = products.filter((product) =>
       product.title.toLowerCase().includes(searchQuery.toLowerCase())
     );
     setFilteredProducts(results); 
   }, 300);

   return () => clearTimeout(timeout);
 }, [searchQuery, products, filteredProducts.length]);

  return (
    <>
      {/* Navbar */}
   <nav className="bg-white shadow-md fixed w-full z-50"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          {/* Logo + Ana Sayfa Link */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
            width={14}
            height={14}
            src="/images/snusist-logo.webp" alt="Logo" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">snusist</span>
          </Link>

          {/* Mobilde ortadaki snusist */}
          <div className="text-xl font-bold text-gray-900 sm:hidden text-center flex-1">
            <Link href="/">snusist</Link>
          </div>

          {/* Menü Linkleri (Desktop) */}
          <div className="hidden sm:flex space-x-6 items-center relative">
            <Link href="/" className="text-gray-800 hover:text-blue-600">Ana Sayfa</Link>
            <Link href="/categories/" className="text-gray-800 hover:text-blue-600">Ürünler</Link>
            <Link href="/blog" className="text-gray-800 hover:text-blue-600">Blog</Link>

            {/* Arama Kutusu */}
            <div className="relative">
              <div className="flex items-center border px-2 py-1 rounded">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 text-sm outline-none w-40"
                />
              </div>

              {/* Arama Sonuçları */}
              {filteredProducts.length > 0 && (
                <div className="absolute top-12 left-0 w-64 bg-white shadow-lg border rounded z-50 max-h-60 overflow-auto">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/${product.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setSearchQuery('')}
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menü (Mobil) */}
          <button
            aria-label="Açılır menüyü aç"
            className="sm:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-16 left-0 right-0 bg-white z-50 shadow-lg sm:hidden p-4 space-y-4">
            {/* Arama kutusu */}
            <div className="flex items-center space-x-2 border px-3 py-2 rounded">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none text-sm text-gray-700"
              />
            </div>

            {/* Arama Sonuçları */}
            {filteredProducts.length > 0 && (
              <div className="bg-gray-100 rounded shadow-inner max-h-60 overflow-auto">
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => {
                      setSearchQuery('');
                      setIsOpen(false);
                    }}
                  >
                    {product.title}
                  </Link>
                ))}
              </div>
            )}

            <Link onClick={() => setIsOpen(false)} href="/" className="block text-gray-800 hover:text-blue-600">Ana Sayfa</Link>
            <Link onClick={() => setIsOpen(false)} href="/categories/" className="block text-gray-800 hover:text-blue-600">Ürünler</Link>
            <Link onClick={() => setIsOpen(false)} href="/blog" className="block text-gray-800 hover:text-blue-600">Blog</Link>

            <hr className="my-4 border-gray-300" />
            <a
              href="https://instagram.com/snuss.istanbul"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-pink-500 hover:text-pink-600 font-semibold"
            >
              📸 Bizi Instagram&apos;da Takip Et
            </a>
          </div>
        </div>
      )}
    </>
  );
}
