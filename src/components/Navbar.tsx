'use client';
import { useState, useEffect } from   'react';  
import Link from 'next/link';
import { Menu, Search, X, ShoppingBag, ChevronDown } from  'lucide-react';
import { Product } from "@/types";
type Props = { products: Product[] };

const CATEGORIES = ["Velo", "Pablo", "Cuba", "Garant", "Siberia", "Killa", "Odens","Fox","D.L.T.A"];

export default function Navbar({ products = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      if (filteredProducts.length > 0) setFilteredProducts([]);
      return;
    }

    const timeout = setTimeout(() => {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results.slice(0, 8));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, products]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center">
            {/* Logo and Menu - Left Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 flex-shrink-0 hover:opacity-80 transition">
                <img src="/images/snusist-logo.webp" alt="Snusist Logo" className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg" />
                <span className="text-sm sm:text-lg md:text-xl font-bold text-white hidden sm:inline">snusist</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/" className="px-3 py-2 text-white hover:bg-white/10 rounded-md transition">
                  Ana Sayfa
                </Link>
                
                {/* Dropdown Menu */}
                <div className="relative group">
                  <button className="px-3 py-2 text-white hover:bg-white/10 rounded-md transition flex items-center gap-1">
                    Ürünler <ChevronDown size={18} className="group-hover:rotate-180 transition" />
                  </button>
                  <div className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {CATEGORIES.map((cat) => {
                      const slug = cat.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Link
                          key={cat}
                          href={`/categories/${slug}`}
                          className="block px-4 py-3 text-white hover:bg-blue-600 first:rounded-t-lg last:rounded-b-lg transition"
                        >
                          {cat}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <Link href="/blog" className="px-3 py-2 text-white hover:bg-white/10 rounded-md transition">
                  Blog
                </Link>
              </div>
            </div>

            {/* Center Brand */}
            <div className="flex-1 flex justify-center">
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-cursive text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">snusist</span>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Desktop Search - Right Side */}
            <div className="hidden md:flex items-center space-x-4 relative">
              <div className="relative w-full max-w-xs">
                <div className="flex items-center bg-white/10 border border-white/20 px-3 py-2 rounded-lg focus-within:border-blue-400 focus-within:bg-white/20 transition">
                  <Search size={18} className="text-white/60" />
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ml-2 bg-transparent text-white placeholder-white/50 outline-none w-full text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 text-white/60 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                {filteredProducts.length > 0 && (
                  <div className="absolute top-12 left-0 right-0 bg-white shadow-xl rounded-lg z-50 max-h-64 overflow-auto border border-gray-200">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition"
                        onClick={handleLinkClick}
                      >
                        <ShoppingBag size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">{product.title}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                        <div className="ml-auto font-semibold text-gray-700">{product.price}₺</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Menüyü aç"
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 pt-16">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-900 to-slate-800 z-50 shadow-2xl">
            {/* Mobile Search */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center bg-white/10 border border-white/20 px-3 py-2 rounded-lg focus-within:border-blue-400 focus-within:bg-white/20 transition">
                <Search size={18} className="text-white/60" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 bg-transparent text-white placeholder-white/50 outline-none w-full text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 text-white/60 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Mobile Search Results */}
              {filteredProducts.length > 0 && (
                <div className="mt-3 bg-white/5 rounded-lg border border-white/10 max-h-64 overflow-auto">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="flex items-center px-4 py-3 text-white hover:bg-white/10 border-b border-white/5 last:border-b-0 transition"
                      onClick={handleLinkClick}
                    >
                      <ShoppingBag size={14} className="text-blue-400 mr-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{product.title}</div>
                        <div className="text-xs text-white/60">{product.category}</div>
                      </div>
                      <div className="ml-2 font-semibold text-blue-400 flex-shrink-0">{product.price}₺</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Links */}
            <div className="px-2 py-4 space-y-1">
              <Link
                onClick={handleLinkClick}
                href="/"
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition font-medium"
              >
                🏠 Ana Sayfa
              </Link>
              
              {/* Mobile Dropdown */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-left block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition font-medium flex items-center justify-between"
              >
                🛍️ Ürünler <ChevronDown size={18} className={`transition ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-1 bg-white/5 rounded-lg">
                  {CATEGORIES.map((cat) => {
                    const slug = cat.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={cat}
                        onClick={handleLinkClick}
                        href={`/categories/${slug}`}
                        className="block px-4 py-2 text-white hover:bg-blue-600 rounded transition text-sm"
                      >
                        • {cat}
                      </Link>
                    );
                  })}
                </div>
              )}
              
              <Link
                onClick={handleLinkClick}
                href="/blog"
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition font-medium"
              >
                📝 Blog
              </Link>
            </div>

            {/* Social Links */}
            <div className="px-2 py-4 border-t border-white/10 space-y-2">
              <a
                href="https://instagram.com/snuss.istanbul"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition text-center font-medium text-sm"
                onClick={handleLinkClick}
              >
                📸 Instagram
              </a>
              <a
                href="https://wa.me/905464205366"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center font-medium text-sm"
                onClick={handleLinkClick}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Spacing for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
