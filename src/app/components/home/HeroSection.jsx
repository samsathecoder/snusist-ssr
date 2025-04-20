import '../../css/marquee.css';

export default function HeroSection() {
  return (
<div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      
      {/* Marquee en üste yerleştirildi */}
      <div className="mt-16
      marquee-container z-30">
        <p className="marquee-text">
          🚀 İstanbul içi aynı gün kargo | 💳 Kapıda ödeme imkanı | ⚡ Aynı gün teslimat hizmeti | 📦 10 adet ve üzeri alımlarda ücretsiz kargo 
        </p>
      </div>

 
      <div className= "mt-12 absolute inset-0 flex items-center bg-gradient-to-b from-transparent via-black/50 to-black/70 z-10">
        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col md:flex-row items-center justify-between">
          
          <div className="w-full md:w-1/2 text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              Snus Istanbul | Snus Store | Snus Market | snus 
            </h1>
            <p className="text-base md:text-xl opacity-90 drop-shadow-md">
              Türkiye'nin en büyük snus mağazası 🌟 Premium kalite, uygun fiyat!
            </p>
          </div>
          <div className="hidden md:block w-full md:w-1/3 mt-8 md:mt-0">
  <div className=" flex justify-center items-center h-64">
    <img
      src="/images/snusist-logo.png"
      alt="snusist-logo"
      className="max-h-full max-w-full object-fit"
    />
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
