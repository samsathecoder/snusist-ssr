import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | Snusist',
  description:
    "Snusist, Türkiye'ye yurtdışından orijinal snus ürünleri sağlayan, en uygun fiyat garantisi ve hızlı teslimatla hizmet veren bir snus mağazasıdır.",
  alternates: { canonical: 'https://snusist.com/hakkimizda' },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Hakkımızda</h1>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
        <p>
          Snusist, Türkiye&apos;ye yurtdışından <strong>orijinal snus</strong> ürünleri
          sağlayan bir mağazadır. Velo, Pablo, Cuba, Garant, Siberia, Killa, Odens,
          White Fox ve D.L.T.A gibi tanınmış markaları doğrudan tedarik ederek
          müşterilerimize ulaştırıyoruz.
        </p>
        <p>
          Amacımız, Türkiye&apos;deki snus kullanıcılarının ihtiyaçlarını en hızlı ve
          en uygun şekilde karşılamaktır. Bu doğrultuda tüm ürünlerimizde{' '}
          <strong>en uygun fiyat garantisi</strong> veriyor, İstanbul içinde aynı gün
          moto kurye teslimatı, İstanbul dışında ise hızlı kargo ile gönderim
          sağlıyoruz.
        </p>
        <p>
          Snusist olarak önceliğimiz; orijinal ürün garantisi, hızlı ve güvenilir
          teslimat ve müşteri memnuniyetidir. Sorularınız veya siparişleriniz için{' '}
          <a href="/iletisim" className="text-blue-600 hover:text-blue-700 font-semibold">
            iletişim sayfamızdan
          </a>{' '}
          bize ulaşabilirsiniz.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">
          Neden Snusist?
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>%100 orijinal ürün garantisi</li>
          <li>İstanbul içi aynı gün moto kurye teslimatı</li>
          <li>İstanbul dışına hızlı kargo ile gönderim</li>
          <li>En uygun fiyat garantisi</li>
          <li>WhatsApp üzerinden kolay sipariş ve destek</li>
        </ul>
      </div>
    </article>
  );
}
