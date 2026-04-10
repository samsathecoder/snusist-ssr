import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';
import '@/globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <head>
        <title>404 - Sayfa Bulunamadı</title>
        <style>{`body { background: #0f172a !important; color: white !important; }`}</style>
      </head>
      <body className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/snusist-logo.webp"
            alt="Snusist Logo"
            className="w-20 h-20 rounded-xl shadow-2xl"
          />
        </div>

        {/* 404 Error Code */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            404
          </h1>
          <p className="text-xl font-semibold text-white/80">Oops!</p>
        </div>

        {/* Alert Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-red-300 mb-2">
            <AlertCircle size={20} />
            <span className="font-semibold">Sayfa Bulunamadı</span>
          </div>
          <p className="text-white/70 text-sm">
            Aradığınız sayfa mevcut değil veya silinmiş olabilir.
          </p>
        </div>

        {/* Description */}
        <p className="text-white/60 mb-8 leading-relaxed">
          Endişe etmeyin! Ana sayfaya dönüp ürün ve kategorilerimize göz atabilirsiniz.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home size={18} />
            Ana Sayfaya Dön
          </Link>

          {/* Browse Products */}
          <Link
            href="/categories/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all border border-white/20 hover:border-white/40"
          >
            🛍️ Ürünlere Gözat
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-3">Sorun yaşamaya devam mı ediyorsunuz?</p>
          <Link
            href="https://instagram.com/snuss.istanbul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
          >
            Instagram üzerinden bizimle iletişime geçin →
          </Link>
        </div>

        {/* Error Code Display */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <code className="text-xs text-white/40 bg-black/30 px-3 py-2 rounded font-mono block">
            Error Code: 404 Not Found
          </code>
        </div>
        </div>
      </body>
    </html>
  );
}
