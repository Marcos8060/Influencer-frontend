import Footer from "@/app/Components/Footer";
import FilterInfuencer from "@/app/Components/Influencer/FilterInfluencer/FilterInfuencer";
import FilterInfluencerHeroSection from "@/app/Components/Influencer/FilterInfluencer/Hero";
import InfluencerArchives from "@/app/Components/Influencer/FilterInfluencer/InfluencerArchives";
import Navbar from "@/app/Components/Navbar";
import React from "react";

const FilterInfluencers = () => {
  return (
    <>
      <Navbar />
      <FilterInfluencerHeroSection />
      <InfluencerArchives />
      <Footer />
    </>
  );
};

export default FilterInfluencers;
