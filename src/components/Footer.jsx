'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import PromoBanner from './home/PromoBanner';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-bl from-cyan-800 via-blue-950 to-cyan-800 text-white pt-16 ">
      <PromoBanner />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         
       
        </div>

        {/* Alt copyright alanı */}
        <div className="text-center text-gray-400 mt-8 pt-4 border-t border-gray-700">
          <p className="text-sm leading-tight m-0 p-0">&copy; 2025 snusist. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
