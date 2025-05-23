"use client";
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
    minimumNumberOfFollowers: "",
    maximumNumberOfFollowers: "",
    niche: [],
    minimumEngagementRate: "",
    maximumEngagementRate: "",
    category: "",
    minimumAge: "",
    maximumAge: "",
    gender: "",
    onlyVerified: false,
    isPlatformVerified: false,
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
      minimumNumberOfFollowers: "",
      maximumNumberOfFollowers: "",
      niche: [],
      minimumEngagementRate: "",
      maximumEngagementRate: "",
      category: "",
      minimumAge: "",
      maximumAge: "",
      gender: "",
      onlyVerified: false,
      isPlatformVerified: false,
    });

    // Reset URL by removing all filters
    router.push("?", { scroll: false });
  };

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="md:w-5/12 w-full"
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
                <div className="w-full">
                  <InputComponent
                    type="number"
                    className="w-full"
                    placeholder="From"
                    value={filters.minimumNumberOfFollowers}
                    onChange={(e) =>
                      handleFilterChange(
                        "minimumNumberOfFollowers",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-full">
                  <InputComponent
                    type="number"
                    className="w-full"
                    placeholder="To"
                    value={filters.maximumNumberOfFollowers}
                    onChange={(e) =>
                      handleFilterChange(
                        "maximumNumberOfFollowers",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </section>

            {/* Engagement Rate */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Engagement Rate</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <div className="w-full">
                  <InputComponent
                    type="number"
                    className="w-full"
                    placeholder="From"
                    value={filters.minimumEngagementRate}
                    onChange={(e) =>
                      handleFilterChange(
                        "minimumEngagementRate",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-full">
                  <InputComponent
                    type="number"
                    className="w-full"
                    placeholder="To"
                    value={filters.maximumEngagementRate}
                    onChange={(e) =>
                      handleFilterChange(
                        "maximumEngagementRate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </section>

            {/* Age Range */}
            <section className="flex items-center gap-2 w-full">
              <div className="w-3/12">
                <small>Age Range</small>
              </div>
              <div className="w-9/12 flex items-center gap-2">
                <div className="w-full">
                  <InputComponent
                    type="number"
                    className="w-full"
                    placeholder="From"
                    value={filters.minimumAge}
                    onChange={(e) =>
                      handleFilterChange("minimumAge", e.target.value)
                    }
                  />
                </div>
                <div className="w-full">
                  <InputComponent
                    type="number"
                    className="w-full"
                    placeholder="To"
                    value={filters.maximumAge}
                    onChange={(e) =>
                      handleFilterChange("maximumAge", e.target.value)
                    }
                  />
                </div>
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
                <label className="text-xs">
                  <input
                    className="scale-150 cursor-pointer mx-1"
                    type="checkbox"
                    checked={filters.onlyVerified}
                    onChange={(e) =>
                      handleFilterChange("onlyVerified", e.target.checked)
                    }
                  />{" "}
                  Verified in social media
                </label>
                <label className="text-xs">
                  <input
                    type="checkbox"
                    className="scale-150 cursor-pointer mx-1"
                    checked={filters.isPlatformVerified}
                    onChange={(e) =>
                      handleFilterChange("isPlatformVerified", e.target.checked)
                    }
                  />{" "}
                  Verified in our platform
                </label>
              </div>
            </section>

            <section className="flex justify-end">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="px-4 py-3 text-xs border border-primary rounded"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
                <ButtonComponent
                  disabled={loading}
                  label={loading ? "Processing..." : "Search"}
                  onClick={handleFilterInfluencers}
                />
              </div>
            </section>
          </div>
        </form>
      </Sidebar>

      <button
        onClick={() => setVisible(true)}
        className="bg-gradient-to-r from-primary to-secondary rounded shadow-2xl text-white text-xs px-4 py-3 flex items-center gap-2"
      >
        <LuFilter /> Add Filters
      </button>
    </div>
  );
}
