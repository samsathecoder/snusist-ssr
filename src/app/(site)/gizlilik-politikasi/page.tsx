import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Snusist',
  description:
    'Snusist gizlilik politikası: veri güvenliği, ödeme güvenliği ve gizli teslimat uygulamalarımız hakkında bilgi alın.',
  alternates: { canonical: 'https://snusist.com/gizlilik-politikasi' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Veri Güvenliği</h2>
          <p>
            Sitemiz üzerindeki tüm hareketleriniz 256-bit SSL şifreleme ile korunur.
            Kişisel verileriniz, siteye girdiğiniz andan siparişiniz tamamlanana
            kadar uçtan uca şifrelenir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Gizlilik Garantisi</h2>
          <p>
            Üçüncü şahıslarla veri paylaşımı yapmıyoruz. İletişim, adres ve sipariş
            bilgileriniz asla reklam ağları veya dış kurumlarla paylaşılmaz, satılmaz
            veya kiralanmaz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Ödeme Güvenliği</h2>
          <p>
            Sunucularımızda hiçbir kredi kartı veya ödeme bilgisi saklanmaz. Nakit ve
            havale/EFT ile yapılan tüm ödeme işlemleriniz doğrudan bankanızın güvenli
            sistemleri üzerinden gerçekleştirilir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Gizli Teslimat</h2>
          <p>
            Bilgileriniz sadece lojistik amaçlı kullanılır. Paketinizin kapınıza
            kadar %100 gizli paketleme ile ulaşmasını sağlayarak, gizliliğinizi
            teslimat anında da koruyoruz.
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-4 border-t">
          Sorularınız için{' '}
          <a href="/iletisim" className="text-blue-600 hover:text-blue-700 font-semibold">
            iletişim sayfamızdan
          </a>{' '}
          bize ulaşabilirsiniz.
        </p>
      </div>
    </article>
  );
}
