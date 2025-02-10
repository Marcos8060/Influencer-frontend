import InfluencerHeroSection from "@/app/Components/Brand/Influencer-platform/heroSection";
import WorkTogether from "@/app/Components/Brand/Influencer-platform/work-together";
import Footer from "@/app/Components/Footer";
import React from "react";

const InfuencerPlatform = () => {
  return (
    <>
      <InfluencerHeroSection />
      <section className="flex items-center gap-4 justify-between md:px-12 px-4 my-8">
        <div className="w-1/2 text-center">
          <div className="space-y-3 mb-3">
            <h2 className="text-xl">For Brands</h2>
            <h1 className="font-semibold">Get Influential Influencers</h1>
            <p className="font-light text-sm">
              Use this section to describe your company and the products you
              offer
            </p>
          </div>
          <img
            className="rounded-3xl h-[70vh] w-8/12 mx-auto object-cover"
            src="https://images.pexels.com/photos/3253724/pexels-photo-3253724.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
        <div className="w-1/2 space-y-4">
          <div className="space-y-3">
            <h2 className="font-bold">Streamline Your Recruitment Process</h2>
            <p className="font-light text-sm">
              Tired of sifting through countless profiles only to end up with
              unqualified candidates? With Influencer Platform, your recruitment
              process becomes more efficient and effective than ever before. Our
              platform's advanced search and filtering capabilities allow you to
              pinpoint the exact talent you're looking for based on criteria
              such as skills, experience, location, and more. Whether you're
              seeking a graphic designer, a videographer, or a copywriter,
              Influencer Platform empowers you to find the perfe
            </p>
          </div>
          <div>
            <h2 className="font-bold">
              Discover Verified Creatives with Confidence
            </h2>
            <p className="font-light text-sm">
              Tired of sifting through countless profiles only to end up with
              unqualified candidates? With Influencer Platform, your recruitment
              process becomes more efficient and effective than ever before. Our
              platform's advanced search and filtering capabilities allow you to
              pinpoint the exact talent you're looking for based on criteria
              such as skills, experience, location, and more. Whether you're
              seeking a graphic designer, a videographer, or a copywriter,
              Influencer Platform empowers you to find the perfe
            </p>
          </div>
          <div>
            <h2 className="font-bold">Verified Talents, Verified Results</h2>
            <p className="font-light text-sm">
              As a Influencer seeker, your quest for exceptional talent just got
              easier—and more reliable—with Msanii. Our platform is dedicated to
              connecting you with verified creatives whose identities have been
              authenticated through rigorous checks against government data. Say
              goodbye to the uncertainty of sourcing talent online and hello to
              a curated pool of verified professionals
            </p>
          </div>
        </div>
      </section>
      <WorkTogether />
      <Footer />
    </>
  );
};

export default InfuencerPlatform;
