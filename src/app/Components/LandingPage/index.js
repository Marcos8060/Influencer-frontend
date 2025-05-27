"use client";
import React from "react";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import Achievements from "./Achievements";
import Highlights from "./Highlights";
import Testimonials from "./Testimonials";
import Faqs from "./Faqs";
import Footer from "../Footer";

const LandingPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <Achievements />
      <Highlights />
      <Testimonials />
      <Faqs />
      <Footer />
    </div>
  );
};

export default LandingPage;
