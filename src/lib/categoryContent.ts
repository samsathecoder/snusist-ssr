export type CategoryFaqItem = { question: string; answer: string };

export type CategoryDetail = {
  longText: string;
  faq: CategoryFaqItem[];
};

// Pilot: şu an sadece "velo" dolu. Sonuçlar GSC'de doğrulanınca diğer kategorilere de eklenecek.
export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  velo: {
    longText:
      "Velo, İsveç kökenli bir nikotin poşeti markasıdır ve dünya çapında en çok tercih edilen tütünsüz snus alternatiflerinden biridir. Klasik tütün içeren snus ürünlerinin aksine, Velo tamamen tütünsüz beyaz porsiyon yapısıyla üretilir; bu sayede dişlerde renk değişikliği veya leke oluşturmaz, kullanım sonrasında ağızda ağır bir tütün kokusu bırakmaz. Velo'nun sunduğu nikotin seviyeleri genellikle 6 mg ile 14 mg arasında değişir, bu da onu hem yeni başlayanlar hem de dengeli, kontrollü bir nikotin deneyimi arayan kullanıcılar için uygun bir seçenek haline getirir. Marka, peppermint, spearmint, çeşitli meyve aromaları (çilek, karpuz, mango, nar) ve soğutucu (cooling) etkili seçenekler olmak üzere oldukça geniş bir aroma yelpazesi sunar. Slim ve Mini formatları sayesinde dudak altında rahatsızlık vermeden, günlük kullanıma uygun ince bir yapıya sahiptir.\n\nSnusist üzerinden satın aldığınız tüm Velo ürünleri orijinal ve yurtdışından doğrudan tedarik edilen stoklardan gelir; taklit veya kurumuş ürün riski taşımazsınız. İstanbul içinde moto kurye ile aynı gün, genellikle saatler içinde teslimat sağlıyoruz; İstanbul dışına ise hızlı kargo ile 1-2 gün içinde ulaştırıyoruz. Paketleme tamamen gizli ve discreet şekilde yapılır, kargo içeriği dışarıdan anlaşılmaz.\n\nVelo'nun hafif ve dengeli nikotin profili, özellikle snus veya nikotin poşetlerine yeni başlayanlar için ideal bir giriş noktası sağlar. Daha güçlü bir deneyim arıyorsanız Pablo veya Siberia gibi diğer markalarımıza da göz atabilirsiniz.",
    faq: [
      {
        question: "Velo snus tütün içerir mi?",
        answer:
          "Hayır, Velo tamamen tütünsüz bir nikotin poşetidir (beyaz porsiyon). İçeriğinde tütün yaprağı bulunmaz.",
      },
      {
        question: "Velo kaç mg nikotin içerir?",
        answer:
          "Velo ürünlerinin çoğu 6 mg ile 14 mg arasında nikotin içerir, bu da onu hafif ve dengeli bir seçenek yapar.",
      },
      {
        question: "Velo ürünleri orijinal mi?",
        answer:
          "Evet, Snusist'teki tüm Velo ürünleri yurtdışından doğrudan tedarik edilen orijinal stoklardır.",
      },
      {
        question: "Velo siparişim ne zaman elime ulaşır?",
        answer:
          "İstanbul içinde moto kurye ile aynı gün, genellikle saatler içinde; İstanbul dışına kargo ile 1-2 gün içinde teslim ediyoruz.",
      },
    ],
  },
};
