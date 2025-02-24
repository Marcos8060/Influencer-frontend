import React, { useState } from "react";
import FilterDropdown from "@/app/Components/SharedComponents/FilterDropDownComponent";

const Filters = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const niches = [
    { name: "Fashion and Beauty" },
    { name: "Travel and Adventure" },
    { name: "Sports and Entertainment" },
  ];
  return (
    <div>
      <section className="md:w-5/12 w-full mx-auto space-y-4">
        <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Location"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Gender"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Followers"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Price"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Location"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Gender"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Followers"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
          <div className="w-full">
            <FilterDropdown
              options={niches}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Price"
              className="bg-primary !rounded-3xl !text-xs"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Filters;
