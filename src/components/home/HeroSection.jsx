import Link from 'next/link';
import '@/css/marquee.css';

export default function HeroSection() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="marquee-container">
        <p className="marquee-text">
          🚀 İstanbul içi aynı gün kargo | 💳 Kapıda ödeme imkanı | ⚡ Aynı gün teslimat hizmeti | 📦 10 adet ve üzeri alımlarda ücretsiz kargo
        </p>
      </div>

      <div className="relative">
        {/* Görsel lg+ 3:1 oranında; çok geniş ekranlarda yükseklik sınırlanır, alttaki "snusist" yazısı korunsun diye alttan hizalanır */}
        <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-[500px] lg:h-auto lg:aspect-[3/1] lg:max-h-[680px] overflow-hidden">
          <picture>
            {/* Telefon: dikey (4:5) Velo görseli */}
            <source
              media="(max-width: 639px)"
              srcSet="/images/velo-hero-mobile-640.webp 640w, /images/velo-hero-mobile-1080.webp 1080w"
              sizes="100vw"
              type="image/webp"
            />
            <source
              srcSet="/images/velo-banner-480.webp 480w, /images/velo-banner-800.webp 800w, /images/velo-banner-1024.webp 1024w, /images/velo-banner.webp 3240w"
              sizes="100vw"
              type="image/webp"
            />
            <img
              src="/images/velo-banner-1024.webp"
              alt="Velo snus ürünleri ve Snusist logosu"
              className="absolute inset-0 w-full h-full object-cover object-center sm:object-bottom"
              width="1024"
              height="341"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          {/* Masaüstü: sol üstten koyulaşan katman metni okunaklı yapar, alttaki logo parlak kalır */}
          <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(2,6,23,1)_0%,rgba(2,6,23,0.65)_35%,transparent_65%)]" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-slate-950/50 to-transparent" />
          {/* Mobil: üstten koyu geçiş, metin okunur; alttaki logo açık kalır */}
          <div className="lg:hidden absolute inset-x-0 top-0 h-[60%] sm:h-[75%] bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        {/* Tek metin bloğu (tek H1), her ekranda görselin üstünde */}
        <div className="absolute inset-x-0 top-0">
          <div className="max-w-7xl mx-auto px-4 pt-6 lg:pl-10 xl:pl-16 xl:pt-10">
            <div className="max-w-3xl">
              <span className="inline-block mb-3 text-xs md:text-sm font-semibold bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                🏍️ İstanbul içi aynı gün moto kurye
              </span>
              <h1 className="text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold leading-tight mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
                Türkiye&apos;nin Snus Mağazası:{' '}
                <span className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
                  Snusist
                </span>
              </h1>
              <p className="lg:hidden xl:block text-base xl:text-lg text-white/85 mb-5 drop-shadow-md">
                Velo, Pablo, Cuba ve daha fazlası. Orijinal ürün, gizli paketleme, aynı gün teslimat.
              </p>
              <div className="flex flex-wrap gap-3 lg:mt-4 xl:mt-0">
                <Link
                  href="/categories/velo"
                  className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg hover:bg-slate-100 transition"
                >
                  Velo Ürünlerini İncele
                </Link>
                <a
                  href="https://wa.me/905464205366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
                >
                  WhatsApp&apos;tan Sipariş
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
