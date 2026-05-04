import '@/css/marquee.css';

export default function HeroSection() {
  return (
<div className="relative h-[300px] md:h-[400px]  bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      
      {/* Marquee en üste yerleştirildi */}
      <div  className="absolute top-0 left-0 right-0 h-10  bg-black/80 text-white flex items-center justify-center overflow-hidden
      marquee-container">
        <p className="marquee-text">
          🚀 İstanbul içi aynı gün kargo | 💳 Kapıda ödeme imkanı | ⚡ Aynı gün teslimat hizmeti | 📦 10 adet ve üzeri alımlarda ücretsiz kargo 
        </p>
      </div>

 
      <div className= "mt-6 absolute inset-0 flex items-center bg-gradient-to-b from-transparent via-black/50 to-black/70 z-10">
        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col md:flex-row items-center justify-between">
          
          <div className="w-full md:w-1/2 text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              Snus | Velo Snus | Snus Market | Snus İstanbul
            </h1>
            <p className="text-base md:text-xl opacity-90 drop-shadow-md">
              Türkiye'nin snus mağazası 🌟 Premium kalite, 🏍️ hızlı teslimat!
            </p>
          </div>
          <div className="hidden md:block w-full md:w-1/3 mt-8 md:mt-0">
  <div className=" flex justify-center items-center mt-6 h-64">
    <img 
     loading="lazy" 
      src="/images/snusist-logo.webp"
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
