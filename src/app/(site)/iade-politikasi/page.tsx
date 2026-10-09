import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İade Politikası | Snusist',
  description:
    'Snusist iade ve değişim politikası: hangi durumlarda iade kabul edildiğini öğrenin.',
  alternates: { canonical: 'https://snusist.com/iade-politikasi' },
  robots: { index: true, follow: true },
};

export default function ReturnPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">İade Politikası</h1>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
        <p>
          Ürünlerimiz tüketime yönelik, açıldıktan sonra tekrar satılamayacak
          nitelikte ürünlerdir. Bu nedenle; beğenmeme, tat tercihi uymama veya
          benzeri kişisel sebeplerle <strong>açılmış/kullanılmış ürünlerde iade
          kabul edilmemektedir.</strong>
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3 text-gray-900">
          İstisnai Durumlar
        </h2>
        <p>
          Aşağıdaki gibi kargo veya üretim kaynaklı istisnai durumlarda
          müşterilerimize destek oluyoruz:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Kargo sırasında hasar görmüş paketler</li>
          <li>Kırık veya açılmış kutu ile teslim edilen ürünler</li>
          <li>Yanlış ürün gönderimi</li>
        </ul>
        <p>
          Bu durumlarda, ürünü teslim aldığınızda paketin fotoğrafını çekerek en
          kısa sürede WhatsApp hattımızdan bize ulaşmanız yeterlidir. Talebiniz
          değerlendirilip size en uygun çözüm (değişim veya iade) sağlanır.
        </p>

        <p className="text-sm text-gray-500 pt-4 border-t">
          Bildirimleriniz için{' '}
          <a href="/iletisim" className="text-blue-600 hover:text-blue-700 font-semibold">
            iletişim sayfamızdan
          </a>{' '}
          bize ulaşabilirsiniz.
        </p>
      </div>
    </article>
  );
}
