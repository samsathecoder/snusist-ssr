import type { Metadata } from 'next';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'İletişim | Snusist',
  description:
    'Snusist ile WhatsApp veya Instagram üzerinden iletişime geçin. Sipariş, soru ve destek talepleriniz için buradayız.',
  alternates: { canonical: 'https://snusist.com/iletisim' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">İletişim</h1>

      <p className="text-gray-700 leading-relaxed mb-8">
        Sipariş vermek, ürünler hakkında soru sormak veya destek almak için bize
        WhatsApp üzerinden ulaşabilirsiniz. En hızlı dönüş yapabileceğimiz kanal
        WhatsApp hattımızdır.
      </p>

      <div className="space-y-4">
        <a
          href="https://wa.me/905464205366"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl transition shadow-lg w-full md:w-auto"
        >
          <FaWhatsapp size={24} />
          <span className="font-semibold">WhatsApp: +90 546 420 53 66</span>
        </a>

        <a
          href="https://www.instagram.com/snuss.istanbul"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-4 rounded-2xl transition shadow-lg w-full md:w-auto"
        >
          <FaInstagram size={24} />
          <span className="font-semibold">Instagram: @snuss.istanbul</span>
        </a>
      </div>

      <div className="mt-10 text-gray-600">
        <p>
          <strong>E-posta:</strong> snusist@gmail.com
        </p>
        <p className="mt-1">
          <strong>Adres:</strong> İstanbul, Türkiye
        </p>
      </div>
    </article>
  );
}
