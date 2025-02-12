import React from "react";
import InfluencerHeroSection from "../Components/Influencer/Influencer-platform/heroSection";
import Slider from "../Components/Influencer/Influencer-platform/slider";
import ForCreators from "../Components/Influencer/Influencer-platform/forCreators";
import Partners from "../Components/Influencer/Influencer-platform/partners";
import SuccessStories from "../Components/Influencer/Influencer-platform/successStories";
import Footer from "../Components/Footer";

const InfluencerPage = () => {
  return (
    <>
      <InfluencerHeroSection />
      <Slider />
      <ForCreators />
      <Partners />
      <SuccessStories />
      <Footer />
    </>
  );
};

export default InfluencerPage;
