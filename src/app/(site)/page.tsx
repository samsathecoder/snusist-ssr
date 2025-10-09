// app/page.tsx
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeatureBanner from "@/components/home/FeatureHighlights";
import CategoriesSection from "@/components/home/CategoryShowcase";
import VeloProduct from "@/components/home/VeloProducts";
import RandomProductCarousel from "@/components/home/RandomProductCarousel";
import { setProductsCache } from "@/lib/cache";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";


export default async function HomePage() {
    await connectDB();
  const allProductsFromDB = await Product.find({}).lean().exec();


const allProducts = allProductsFromDB.map(product => ({
      ...product,
      _id: product._id?.toString() || "", 
  
}));
  setProductsCache(allProducts); // tip uyumlu

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

