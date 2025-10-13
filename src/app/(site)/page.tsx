// app/page.tsx
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeatureBanner from "@/components/home/FeatureHighlights";
import CategoriesSection from "@/components/home/CategoryShowcase";
import VeloProduct from "@/components/home/VeloProducts";
import RandomProductCarousel from "@/components/home/RandomProductCarousel";
import { getProductsCache, setProductsCache, isProductsCacheFilled } from "@/lib/cache";
import Product from "@/models/Product";
import connectDB from "@/lib/mongoose";


export default async function HomePage() {
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
  } else {
  }
  return (
    
    <main className="min-h-screen bg-gray-50">
      
      <HeroSection />

      <VeloProduct products={allProducts} />
<RandomProductCarousel products={allProducts} />
      <FeatureBanner />
      <CategoriesSection />
    </main>
  );
};

