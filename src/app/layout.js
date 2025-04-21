import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from "./components/whatsappbutton";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Snus İstanbul | Snusist | snus Satın Al",
  description: "Snusist, İstanbul’da orijinal ve kaliteli snus ürünlerini en uygun fiyatlarla sunan lider e-ticaret platformudur. Hemen sipariş verin, aynı gün kargo fırsatını kaçırmayın!",
  keywords: [
    "snus", 
    "snus satın al", 
    "snus istanbul", 
    "nikotin poşeti", 
    "snus Türkiye", 
    "snusist"
  ],
  openGraph: {
    title: "Snusist | Snus İstanbul | snus Satın Al",
    description: "İstanbul'da en kaliteli snus ürünlerini Snusist'te bulabilirsiniz. Orijinal ürün garantisi, uygun fiyatlar ve hızlı teslimat!",
    url: "https://snusist.com",
    siteName: "Snusist",
    images: [
      {
        url: "/images/snusist-logo.png", // 👈 burada public klasöründen alır
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
    images: [      {
      url: "/images/snusist-logo.png", // 👈 burada public klasöründen alır
      width: 800,
      height: 600,
      alt: "Snusist Logo",
    },], // görsel ekle
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

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <Navbar />
    {/* 👇 JSON-LD buraya */}
    <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Snusist",
            image: "https://snusist.com/images/og-image.jpg",
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
        {children}
        <WhatsApp />

        <Footer />

      </body>
    </html>
  );
}
