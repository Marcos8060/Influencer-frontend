"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import InputComponent from "../../SharedComponents/InputComponent";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchAllFilterResults } from "@/redux/features/influencer/filter";
import { useAuth } from "@/assets/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import ExistingProducts from "./ExistingProducts";

export default function ProductServiceDrawer() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
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

  return (
    <>
      <div className="card flex justify-content-center text-color">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="md:w-5/12 w-full"
        >
          <section className="border-b border-b-input w-full flex items-center justify-center">
            <div className="flex items-center gap-8">
              <div
                className={`${
                  currentTab === 1
                    ? "text-primary p-2 font-semibold border-b-2 border-primary text-sm"
                    : "text-sm"
                } cursor-pointer flex gap-2 items-center`}
                onClick={() => setCurrentTab(1)}
              >
                <p>Add New</p>
              </div>
              <div
                className={`${
                  currentTab === 2
                    ? "text-primary p-2 font-semibold border-b-2 border-primary text-sm"
                    : "text-sm"
                } cursor-pointer flex items-center gap-2`}
                onClick={() => setCurrentTab(2)}
              >
                <p>Select Existing</p>
              </div>
            </div>
          </section>
          {currentTab === 1 && (
            <form className="my-4">
              <div className="space-y-4">
                {/* NAME */}
                <section className="">
                  <label className="text-xs font-semibold" htmlFor="">
                    Product/Service Name
                  </label>
                  <InputComponent
                    className="w-full"
                    placeholder="name"
                    value={filters.country}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                  />
                </section>
                {/* DESCRIPTION */}
                <section className="">
                  <label className="text-xs font-semibold" htmlFor="">
                    Product/Service Description
                  </label>
                  <TextAreaComponent
                    className="w-full"
                    placeholder="description"
                    value={filters.country}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                  />
                </section>
                {/* WEBSITE */}
                <section className="">
                  <label className="text-xs font-semibold" htmlFor="">
                    Website
                  </label>
                  <InputComponent
                    className="w-full"
                    placeholder="website"
                    value={filters.country}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                  />
                </section>
                {/* ACCESS INSTRUCTIONS */}
                <section className="">
                  <label className="text-xs font-semibold" htmlFor="">
                    Access Instructions
                  </label>
                  <TextAreaComponent
                    className="w-full"
                    placeholder="instructions"
                    value={filters.country}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                  />
                </section>
                <section className="flex justify-end">
                  <div className="flex items-center gap-4">
                    <ButtonComponent
                      disabled={loading}
                      label={loading ? "Processing..." : "Save New Product"}
                      onClick={handleFilterInfluencers}
                    />
                  </div>
                </section>
              </div>
            </form>
          )}
          {currentTab === 2 && <ExistingProducts />}
        </Sidebar>
        <button
          onClick={() => setVisible(true)}
          className="border-2 border-primary rounded text-xs px-4 py-2"
        >
          Select a product or service
        </button>
      </div>
    </>
  );
}
