'use client'

import React from "react";
import HeroSection from "./Components/LandingPage/HeroSection";
import ProblemSolution from "./Components/LandingPage/ProblemSolution";
import BrandFeatures from "./Components/LandingPage/BrandFeatures";
import CreatorFeatures from "./Components/LandingPage/CreatorFeatures";
import FeatureHighlights from "./Components/LandingPage/FeatureHighlights";
import Audience from "./Components/LandingPage/Audience";
import Faqs from "./Components/LandingPage/Faqs";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-color to-gray">
      <HeroSection />
      <ProblemSolution />
      <BrandFeatures />
      <CreatorFeatures />
      <FeatureHighlights />
      <Audience />
      <Faqs />
      <Footer />
    </main>
  );
}
