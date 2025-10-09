
export default function FeatureHighlights() {
  const features = [
    { icon: '🚚', title: 'Hızlı Teslimat', desc: 'Aynı gün teslimat', bg: 'bg-blue-100' },
    { icon: '💯', title: 'Orijinal Ürünler', desc: '%100 Orijinal', bg: 'bg-green-100' },
    { icon: '🎯', title: 'En Uygun Fiyat', desc: 'Fiyat garantisi', bg: 'bg-red-100' },
    { icon: '⚡', title: 'Yeni Ürünler', desc: 'Güncel stok', bg: 'bg-yellow-100' },
  ];

  return (
<div className="bg-white py-12 shadow-[20px_20px_20px_-25px_rgba(0,0,0,0.3)] relative z-10">
<div className="max-w-5xl mx-auto px-4">
        {/* Kartları saran kutu */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <div className={`${f.bg} p-3 rounded-full text-2xl`}>
                    <span>{f.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">{f.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
