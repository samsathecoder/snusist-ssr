// app/page.tsx
import React from "react";
import HeroSection from "./components/home/HeroSection";
import FeatureBanner from "./components/home/FeatureHighlights";
import CategoriesSection from "./components/home/CategoryShowcase";
import PromoBanner from "./components/home/PromoBanner";
import VeloProduct from "./components/home/VeloProducts";
import RandomProductCarousel from "./components/home/RandomProductCarousel";
const HomePage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />

      <VeloProduct />
      <RandomProductCarousel/>
      <FeatureBanner />
      <CategoriesSection />
    </main>
  );
};

export default HomePage;
