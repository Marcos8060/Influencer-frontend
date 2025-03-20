'use client'
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { LuFilter } from "react-icons/lu";
import InputComponent from "../../SharedComponents/InputComponent";
import FilterDropdown from "../../SharedComponents/FilterDropDownComponent";
import MultiSelectCheckBox from "../../SharedComponents/MultiSelectCheckBox";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchAllFilterResults } from "@/redux/features/influencer/filter";
import { useAuth } from "@/assets/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation"; // Import Next.js navigation tools
import ButtonComponent from "../../SharedComponents/ButtonComponent";

export default function FiltersDrawer() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    race: [],
    followersFrom: "",
    followersTo: "",
    niche: [],
    engagementRateFrom: "",
    engagementRateTo: "",
    category: "",
    ageFrom: "",
    ageTo: "",
    gender: "",
    onlyVerified: false,
    platformVerified: false,
  });

  const genders = ["Male", "Female", "Other"];
  const niches = [
    "Beauty and Care",
    "Business and Finance",
    "Fashion and Style",
    "Gaming",
  ];
  const races = [
    "Asian",
    "Black / African",
    "Hispanic / Latina",
    "American Indian / Alaskan Native",
    "Native Hawaiian / Pacific Islander",
    "White",
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterInfluencers = async (e) => {
    e.preventDefault();

    const isFiltersEmpty = Object.values(filters).every(
      (value) =>
        value === "" || 
        (Array.isArray(value) && value.length === 0) || 
        value === false
    );
    
    if (isFiltersEmpty) {
      toast.error("Please select at least one filter.");
      return;
    }

    // Preserve existing query parameters
    const existingParams = new URLSearchParams(searchParams.toString());

    // Update query parameters with new filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key] !== "" && filters[key].length !== 0) {
        existingParams.set(
          key,
          Array.isArray(filters[key]) ? filters[key].join(",") : filters[key]
        );
      } else {
        existingParams.delete(key); // Remove empty filters from URL
      }
    });

    // Update URL without reloading the page
    router.push(`?${existingParams.toString()}`, { scroll: false });
    setLoading(true);
    try {
      const response = await dispatch(fetchAllFilterResults(auth, filters));
      if (response && response.length > 0) {
        toast.success("Operations completed successfully");
      } else {
        toast.error("No Influencers found.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      country: "",
      city: "",
      race: [],
      followersFrom: "",
      followersTo: "",
      niche: [],
      engagementRateFrom: "",
      engagementRateTo: "",
      category: "",
      ageFrom: "",
      ageTo: "",
      gender: "",
      onlyVerified: false,
      platformVerified: false,
    });
  
    // Reset URL by removing all filters
    router.push("?", { scroll: false });
  };

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="md:w-1/3 w-full"
      >
        <form className="my-4">
          <div className="space-y-8">
            {/* Location */}
            <section className="flex items-center gap-2">
              <div className="w-3/12">
                <small>Location</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent
                  className="w-full"
                  placeholder="Country"
                  value={filters.country}
                  onChange={(e) =>
                    handleFilterChange("country", e.target.value)
                  }
                />
                <InputComponent
                  className="w-full"
                  placeholder="City"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                />
              </div>
            </section>

            {/* Race */}
            <section className="flex items-center gap-2">
              <div className="w-3/12">
                <small>Race</small>
              </div>
              <div className="w-9/12">
                <MultiSelectCheckBox
                  value={filters.race}
                  onChange={(e) => handleFilterChange("race", e.value)}
                  options={races.map((item) => ({ name: item, value: item }))}
                  optionLabel="name"
                  placeholder="Select Race"
                />
              </div>
            </section>

            {/* Followers */}
            <section className="flex items-center gap-2">
              <div className="w-3/12">
                <small>Followers</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="From"
                  value={filters.followersFrom}
                  onChange={(e) =>
                    handleFilterChange("followersFrom", e.target.value)
                  }
                />
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="To"
                  value={filters.followersTo}
                  onChange={(e) =>
                    handleFilterChange("followersTo", e.target.value)
                  }
                />
              </div>
            </section>

            {/* Niche */}
            <section className="flex items-center gap-2">
              <div className="w-3/12">
                <small>Niche</small>
              </div>
              <div className="w-9/12">
                <MultiSelectCheckBox
                  value={filters.niche}
                  onChange={(e) => handleFilterChange("niche", e.value)}
                  options={niches.map((item) => ({ name: item, value: item }))}
                  optionLabel="name"
                  placeholder="Select Niche"
                />
              </div>
            </section>

            {/* Engagement Rate */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Engagement Rate</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="From"
                  value={filters.engagementRateFrom}
                  onChange={(e) =>
                    handleFilterChange("engagementRateFrom", e.target.value)
                  }
                />
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="To"
                  value={filters.engagementRateTo}
                  onChange={(e) =>
                    handleFilterChange("engagementRateTo", e.target.value)
                  }
                />
              </div>
            </section>

            {/* Category */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Category</small>
              </div>
              <div className="w-9/12">
                <FilterDropdown
                  className="w-full"
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                />
              </div>
            </section>

            {/* Age Range */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Age Range</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="From"
                  value={filters.ageFrom}
                  onChange={(e) =>
                    handleFilterChange("ageFrom", e.target.value)
                  }
                />
                <InputComponent
                  type="number"
                  className="w-full"
                  placeholder="To"
                  value={filters.ageTo}
                  onChange={(e) => handleFilterChange("ageTo", e.target.value)}
                />
              </div>
            </section>

            {/* Gender */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Gender</small>
              </div>
              <div className="w-9/12">
                <FilterDropdown
                  options={genders.map((g) => ({ label: g, value: g }))}
                  value={filters.gender}
                  onChange={(value) => handleFilterChange("gender", value)}
                  placeholder="Select Gender"
                  className="w-full"
                />
              </div>
            </section>

            {/* More Filters */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>More Filters</small>
              </div>
              <div className="w-9/12 flex items-center justify-between gap-2">
                <label className="text-sm">
                  <input
                    className="scale-150 cursor-pointer"
                    type="checkbox"
                    checked={filters.onlyVerified}
                    onChange={(e) =>
                      handleFilterChange("onlyVerified", e.target.checked)
                    }
                  />{" "}
                  Only Verified
                </label>
                <label className="text-sm">
                  <input
                    type="checkbox"
                    className="scale-150 cursor-pointer"
                    checked={filters.platformVerified}
                    onChange={(e) =>
                      handleFilterChange("platformVerified", e.target.checked)
                    }
                  />{" "}
                  Platform Verified
                </label>
              </div>
            </section>

            <section className="flex justify-end">
              <div className="flex items-center gap-4">
              <button type="button" className="px-4 py-3 text-sm border border-primary rounded-3xl" onClick={handleClearFilters} >Clear Filters</button>
              <ButtonComponent disabled={loading} label={loading ? 'Processing...' : 'Search'} onClick={handleFilterInfluencers} />
              </div>
            </section>
          </div>
        </form>
      </Sidebar>

      <button
        onClick={() => setVisible(true)}
        className="bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-2xl text-white text-xs px-4 py-3 flex items-center gap-2"
      >
        <LuFilter /> Add Filters
      </button>
    </div>
  );
}
