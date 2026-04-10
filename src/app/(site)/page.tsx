// app/page.tsx
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeatureBanner from "@/components/home/FeatureHighlights";
import CategoriesSection from "@/components/home/CategoryShowcase";
import VeloProduct from "@/components/home/VeloProducts";
import RandomProductCarousel from "@/components/home/RandomProductCarousel";
import { getProducts } from "@/lib/products";

export const revalidate = 3600; // 1 saat ISR

export default async function HomePage() {
  // Local JSON'dan ürünleri al
  const allProducts = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <VeloProduct products={allProducts} />
      <RandomProductCarousel products={allProducts} />
      <FeatureBanner />
      <CategoriesSection />
    </main>
  );
}


