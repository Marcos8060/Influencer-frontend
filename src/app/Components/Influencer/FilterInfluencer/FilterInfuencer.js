"use client";
import React, { useState } from "react";
import FilterDropDownComponent from "../../SharedComponents/FilterDropDownComponent";
import { fetchAllFilterResults, setResults } from "@/redux/features/influencer/filter";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonComponent from "../../SharedComponents/ButtonComponent";

const FilterInfluencer = () => {
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  const niches = [
    "Beauty and Care",
    "Business and Finance",
    "Fashion and Style",
    "Gaming",
  ];
  const countries = ["France", "United Kingdom", "Germany", "Canada"];
  const races = [
    "Asian",
    "Black / African",
    "Hispanic / Latina",
    "American Indian / Alaskan Native",
    "Native Hawaiian / Pacific Islander",
    "White",
  ];

  const handleFindInfluencers = async (e) => {
    e.preventDefault();

    const filters = {};
    if (selectedNiche) filters.niche = selectedNiche;
    if (selectedCountry) filters.country = selectedCountry;
    if (selectedRace) filters.ethnicBackground = selectedRace;

    if (Object.keys(filters).length === 0) {
      toast.error("Please select at least one filter.");
      return;
    }

    const queryString = new URLSearchParams(filters).toString();

    setLoading(true);
    try {
      const response = await dispatch(fetchAllFilterResults(auth, filters));
      if(response && response.length > 0) {
        router.push(`/brand/create-campaign/?${queryString}`);
      }else{
        toast.error('No Influencers found')
      }
    } catch (error) {
      toast.error("Failed to fetch influencers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-9/12 mx-auto mt-8 mb-16">
      <form onSubmit={handleFindInfluencers}>
        <section className="flex md:flex-row flex-col gap-4 items-center justify-between">
          <div className="w-full">
            <p className="text-xs mb-1 font-semibold">Niche</p>
            <FilterDropDownComponent
              options={niches}
              value={selectedNiche}
              onChange={setSelectedNiche}
              placeholder="Select a niche"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-xs font-semibold mb-1">Country</p>
            <FilterDropDownComponent
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select a country"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-xs font-semibold mb-1">Ethnic Background</p>
            <FilterDropDownComponent
              options={races}
              value={selectedRace}
              onChange={setSelectedRace}
              placeholder="Select ethnic background"
              className="w-full"
            />
          </div>
        </section>
        <div className="flex items-center justify-center mt-3">
          <ButtonComponent
            disabled={loading}
            type="submit"
            label={loading ? "Processing..." : "Find Influencer"}
          />
        </div>
      </form>
    </div>
  );
};

export default FilterInfluencer;
