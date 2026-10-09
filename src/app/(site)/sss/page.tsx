import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular (SSS) | Snusist',
  description:
    'Sipariş nasıl verilir, teslimat ne kadar sürer, ödeme nasıl yapılır? Snusist hakkında sıkça sorulan tüm sorular ve cevapları.',
  alternates: { canonical: 'https://snusist.com/sss' },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: 'Sipariş nasıl verilir?',
    answer:
      'Sipariş vermek için WhatsApp hattımız üzerinden bize ulaşabilirsiniz. İstediğiniz ürünün adını ve adedini belirtmeniz yeterlidir, size yardımcı oluyoruz.',
  },
  {
    question: 'Teslimat ne kadar sürer?',
    answer:
      'İstanbul içinde moto kurye ile aynı gün, genellikle saatler içinde teslimat sağlıyoruz. İstanbul dışına kargo ile gönderim yapıyoruz; yakın illere 1-2 iş günü içinde ulaşıyor.',
  },
  {
    question: 'İstanbul içi teslimat ücreti ne kadar?',
    answer:
      'Moto kurye teslimat ücreti sipariş detayına (bölge, sipariş adedi vb.) göre değişiklik gösterebilir. Güncel ücret bilgisini WhatsApp üzerinden öğrenebilirsiniz.',
  },
  {
    question: 'Kargom nasıl takip edilir?',
    answer:
      'Siparişiniz kargoya verildiğinde, kargo takip kodu SMS ile cep telefonunuza gönderilir.',
  },
  {
    question: 'Ödeme yöntemleri nelerdir?',
    answer:
      'Nakit veya havale/EFT ile ödeme kabul ediyoruz. Şu an için kredi kartı ile ödeme seçeneğimiz bulunmamaktadır. İstanbul içi moto kurye ile gönderimlerde kapıda ödeme imkanı sunuyoruz. Şehir dışına kargo ile gönderimlerde ise ödeme önceden alınır ve siparişiniz aynı gün kargoya verilir.',
  },
  {
    question: 'Ürün iade edebilir miyim?',
    answer:
      'Açılmış/kullanılmış ürünlerde (beğenmeme, tat tercihi gibi nedenlerle) iade kabul edemiyoruz. Ancak kargodan kaynaklanan hasarlı/kırık kutu gibi istisnai durumlarda müşterilerimize destek oluyoruz. Detaylar için iade politikamızı inceleyebilirsiniz.',
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 className="text-4xl font-bold mb-8">Sıkça Sorulan Sorular</h1>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question} className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{faq.question}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-gray-600">
        Sorunuzun cevabını bulamadınız mı?{' '}
        <a href="/iletisim" className="text-blue-600 hover:text-blue-700 font-semibold">
          İletişim sayfamızdan
        </a>{' '}
        bize ulaşabilirsiniz.
      </p>
    </article>
  );
}
