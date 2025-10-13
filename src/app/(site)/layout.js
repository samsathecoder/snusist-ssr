import { Inter, Roboto_Mono } from "next/font/google";
import React from "react";

import "@/globals.css";
import Script from "next/script";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsApp from "@/components/whatsappbutton";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { getProductsCache, setProductsCache, isProductsCacheFilled } from "@/lib/cache";

// Load fonts using the preload strategy to improve LCP
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});


export const metadata = {
    title: "Snus | Snus İstanbul | Snus Turkey | Snus Satın Al",
  description: "İstanbul’da orijinal ve kaliteli snus ürünlerini en uygun fiyatlarla sizlere sunuyoruz. Hemen sipariş verin, kapınıza getirelim!",
  keywords: [
    "snus", 
    "snus satın al", 
    "snus istanbul", 
    "snus Türkiye", 
    "snusist"
  ],
  openGraph: {
    title: "Snus | Snus İstanbul | Snus Turkey | Snus Satın Al",
    description: "İstanbul'da en kaliteli snus ürünlerini Snusist'te bulabilirsiniz. Orijinal ürün garantisi, uygun fiyatlar ve hızlı teslimat!",
    url: "https://snusist.com",
    siteName: "Snusist",
    images: [
      {
        url: "https://snusist.com/images/snusist-logo.webp",
        width: 800,
        height: 600,
        alt: "Snusist Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snusist | Snus İstanbul",
    description: "Türkiye'nin en güvenilir snus tedarikçisi. Sipariş ver, hızlı kargoyla kapına gelsin!",
    images: [
      {
        url: "https://snusist.com/images/snusist-logo.webp",
        width: 800,
        height: 600,
        alt: "Snusist Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://snusist.com/",
  },
};
export default async function RootLayout({ children }) {
  await connectDB(); // DB bağlan

  // Cache'i kontrol et
  let allProducts = getProductsCache();
  if (!allProducts || allProducts.length === 0) {
    const allProductsFromDB = await Product.find({}).lean().exec(); // ✅ await ile çöz
    allProducts = allProductsFromDB.map((p) => ({
      ...p,
      _id: p._id?.toString() || "",
    }));
    setProductsCache(allProducts);
    console.log("✅ Cache dolduruldu, ürün sayısı:", allProducts.length);
  } else {
    console.log("♻️ Cache kullanıldı, ürün sayısı:", allProducts.length);
  }
  return(
    <html lang="tr">
      <head>
 
        
        {/* Defer Google Tag Manager script to improve performance */}
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1L5Z5DKKRB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1L5Z5DKKRB');
          `}
        </Script>
        {/* Async Google Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="5++2hjj3KkIgS9hHlB7RPA"
          async
        ></script>

        {/* Other metadata */}
   
      </head>
 

      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
    
      <Navbar products={allProducts || []} />
-
       
        {/* JSON-LD structured data */}
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Snusist",
            image: "https://snusist.com/images/snusist-logo.webp",
            "@id": "https://snusist.com",
            url: "https://snusist.com",
            telephone: "+90 546 420 53 66",
            address: {
              "@type": "PostalAddress",
              addressLocality: "İstanbul",
              addressCountry: "TR",
            },
            sameAs: [
              "https://www.instagram.com/snuss.istanbul"
            ],
          })}
        </Script>

        {/* Main content */}
        {children}

        {/* WhatsApp button */}
        <WhatsApp />

        {/* Footer */}
<Footer allProducts={allProducts} />
      </body>
    </html>
  );
}
