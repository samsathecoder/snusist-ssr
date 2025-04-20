// app/page.tsx
import React from "react";
import HeroSection from "./components/home/HeroSection";
import FeatureBanner from "./components/home/FeatureHighlights";
import CategoriesSection from "./components/home/CategoryShowcase";
import PromoBanner from "./components/home/PromoBanner";
import VeloProduct from "./components/home/VeloProducts";
const HomePage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />

      <VeloProduct />
      <FeatureBanner />
      <CategoriesSection />
    </main>
  );
};

export default HomePage;
