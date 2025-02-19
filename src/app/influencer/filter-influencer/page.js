import FilterInfuencer from "@/app/Components/Influencer/FilterInfluencer/FilterInfuencer";
import FilterInfluencerHeroSection from "@/app/Components/Influencer/FilterInfluencer/Hero";
import Navbar from "@/app/Components/Navbar";
import React from "react";

const FilterInfluencers = () => {
  return (
    <>
      <Navbar />
      <FilterInfluencerHeroSection />
      <FilterInfuencer />
    </>
  );
};

export default FilterInfluencers;
