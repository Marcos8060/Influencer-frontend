"use client";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Navbar from "../../Navbar";
import { IoIosArrowForward } from "react-icons/io";

const InfluencerHeroSection = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "Fashion and Style", code: "NY" },
    { name: "Health and Wellness", code: "RM" },
    { name: "Food and Drinks", code: "LDN" },
    { name: "Lifestyle", code: "IST" },
    { name: "Family", code: "PRS" },
  ];
  return (
    <>
      <Navbar />
      <section className="md:w-1/2 mx-auto text-center flex flex-col items-center justify-center space-y-8 md:px-12 px-2 my-8">
        <h1 className="md:text-5xl text-4xl font-bold text-center">
          Influencer Platform Influencers.
        </h1>
        <div className="w-8/12 mx-auto space-y-4">
          <p>Find the right influencers for your brand</p>
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Choose an influencer"
            className="border-2 border-background w-full md:w-14rem text-left"
          />
          <div className="flex items-center justify-center">
            <button className="bg-primary hover:scale-105 border transition duration-700 shadow-xl text-white px-4 py-3 text-sm flex gap-2 items-center justify-center">
              Find Influencers
              <IoIosArrowForward className="text-white" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfluencerHeroSection;
