import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | Snusist',
  description: 'Snusist web sitesi kullanım şartları ve satış koşulları.',
  alternates: { canonical: 'https://snusist.com/kullanim-sartlari' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Kullanım Şartları</h1>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Yaş Sınırı</h2>
          <p>
            Sitemizde satılan ürünler nikotin içermektedir. Bu nedenle sitemizi
            kullanarak ve sipariş vererek <strong>18 yaşından büyük olduğunuzu</strong>{' '}
            beyan etmiş olursunuz. 18 yaşından küçük bireylere satış yapılmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Sipariş ve Satış</h2>
          <p>
            Sitede listelenen ürün fiyatları ve stok durumları önceden haber
            verilmeksizin değiştirilebilir. Siparişler, ödeme ve teslimat ile
            ilgili detaylar{' '}
            <a href="/sss" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sıkça Sorulan Sorular
            </a>{' '}
            sayfamızda yer almaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Sorumluluk</h2>
          <p>
            Ürünlerin kullanımı tamamen kullanıcının kendi sorumluluğundadır. Sağlık
            durumunuzla ilgili şüpheleriniz varsa ürünleri kullanmadan önce bir
            sağlık uzmanına danışmanızı öneririz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">İletişim</h2>
          <p>
            Kullanım şartlarımızla ilgili sorularınız için{' '}
            <a href="/iletisim" className="text-blue-600 hover:text-blue-700 font-semibold">
              iletişim sayfamızdan
            </a>{' '}
            bize ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </article>
  );
}
