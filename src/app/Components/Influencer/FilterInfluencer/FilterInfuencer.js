"use client";
import React, { useState } from "react";
import FilterDropDownComponent from "../../SharedComponents/FilterDropDownComponent";

const FilterInfuencer = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const niches = [
    { name: "Fashion and Beauty" },
    { name: "Travel and Adventure" },
    { name: "Sports and Entertainment" },
  ];
  const platforms = [
    { name: "Instagram" },
    { name: "Tiktok" },
    { name: "Facebook" },
  ];
  const countries = [
    { name: "Australia" },
    { name: "Canada" },
    { name: "United Kingdom" },
  ];
  return (
    <div className="md:px-12 w-9/12 mx-auto mt-8 mb-16">
      <form>
        <section className="flex gap-4 items-center justify-between">
          <div className="w-full">
            <p className="text-xs mb-1 font-semibold">Niche</p>
            <FilterDropDownComponent
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select a niche"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-xs font-semibold mb-1">Platform</p>
            <FilterDropDownComponent
              options={platforms}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select platform"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-xs font-semibold mb-1">Country</p>
            <FilterDropDownComponent
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select country"
              className="w-full"
            />
          </div>
        </section>
        <div className="flex items-center justify-center mt-3">
          <button className="bg-primary text-white rounded-md text-sm px-4 py-3">
            Find Influencers
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterInfuencer;
