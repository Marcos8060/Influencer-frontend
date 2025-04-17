"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import TextAreaComponent from "@/app/Components/SharedComponents/TextAreaComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { ReactCountryFlag } from "react-country-flag";
import countries from "country-list";
import { countryPhoneData } from "./countryPhoneData";

// Get all countries with their codes and names
const countryData = countries.getData();

const BrandDetails = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    brandWebsite: formData.brandWebsite || null,
    legalCompanyName: formData.legalCompanyName || null,
    country: formData.country || { name: "", code: "" },
    phoneNumber: formData.phoneNumber || { code: "+1", number: "" },
    state: formData.state || null,
    city: formData.city || null,
    address: formData.address || null,
    zipCode: formData.zipCode || null,
    brandName: formData.brandName || null,
    brandDescription: formData.brandDescription || null,
  });

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [filteredPhoneCodes, setFilteredPhoneCodes] =
    useState(countryPhoneData);

  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, [dispatch]);

  const countryDropdownRef = useRef(null);
  const phoneCodeDropdownRef = useRef(null);

  // ------close country and phone number dropdowns when you click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target) &&
        // Also check if the click wasn't on the country select input itself
        !event.target.closest(".country-select-container")
      ) {
        setIsCountryOpen(false);
      }

      if (
        phoneCodeDropdownRef.current &&
        !phoneCodeDropdownRef.current.contains(event.target) &&
        // Also check if the click wasn't on the phone code select itself
        !event.target.closest(".phone-code-select-container")
      ) {
        setIsPhoneCodeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = countryData.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  const handlePhoneCodeSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = countryPhoneData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.code.toLowerCase().includes(searchTerm) ||
        item.dial_code.toLowerCase().includes(searchTerm)
    );
    setFilteredPhoneCodes(filtered);
  };

  // Function to fetch location data based on country
  const fetchLocationData = async (countryCode) => {
    setIsLoadingLocation(true);
    try {
      // First try with more specific query
      let response = await fetch(
        `https://nominatim.openstreetmap.org/search?country=${countryCode}&format=json&addressdetails=1&limit=1&accept-language=en`
      );
      let data = await response.json();

      // If no results, try a more general query
      if (!data || data.length === 0) {
        response = await fetch(
          `https://nominatim.openstreetmap.org/search?country=${countryCode}&format=json&featuretype=settlement&limit=1&accept-language=en`
        );
        data = await response.json();
      }

      if (data && data.length > 0) {
        const location = data[0];
        setDetails((prev) => ({
          ...prev,
          city: location.address.city || 
               location.address.town || 
               location.address.village || 
               location.address.county ||
               prev.city,
          state: location.address.state || 
                 location.address.region || 
                 prev.state,
          address: location.address.road
            ? `${location.address.road}${
                location.address.house_number ? ' ' + location.address.house_number : ''
              }`
            : prev.address,
          zipCode: location.address.postcode || prev.zipCode,
        }));
        
        // Show success message only if we actually got data
        if (location.address.city || location.address.town || location.address.state) {
          toast.success("Location details auto-filled");
        }
      } else {
        toast("Couldn't auto-fill all location details. Please enter manually.", {
          icon: "ℹ️",
        });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Could not auto-fill location details");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleCountrySelect = async (country) => {
    const phoneData = countryPhoneData.find(item => item.code === country.code);
    
    // Show loading immediately
    setIsLoadingLocation(true);
    toast.loading("Detecting location details...", { id: "location-loading" });
    
    setDetails({
      ...details,
      country: {
        name: country.name,
        code: country.code,
      },
      phoneNumber: {
        ...details.phoneNumber,
        code: phoneData?.dial_code || "+1",
      },
    });
    setIsCountryOpen(false);
    
    try {
      await fetchLocationData(country.code);
    } finally {
      toast.dismiss("location-loading");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    const requiredFields = [
      "brandWebsite",
      "legalCompanyName",
      "brandName",
      "country",
      "state",
      "city",
      "address",
      "zipCode",
      "brandDescription",
    ];

    const emptyFields = requiredFields.filter((field) => {
      const value = details[field];

      if (typeof value === "string") {
        return value.trim() === "";
      }

      if (typeof value === "object") {
        if (field === "country") {
          return !value || !value.name || !value.code;
        }
        if (field === "phoneNumber") {
          return (
            !value || !value.code || !value.number || value.number.trim() === ""
          );
        }
        return !value;
      }

      return !value;
    });

    if (emptyFields.length > 0) {
      toast.error("Please fill out all required fields.");
      return;
    }

    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  const descriptionLength = details.brandDescription?.length || 0;

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <section className="mb-2">
          <h1 className="text-2xl font-bold text-center my-2">
            Lets Get to Know Your Brand
          </h1>
          <p className="text-center text-sm mb-3">
            Help us create the perfect influencer matches for you.
          </p>
        </section>
        <form className="space-y-6 mb-2 mt-4">
          <section>
            <h3 className="font-bold text-xl mb-2">Brand Information</h3>
            <div>
              <label className="text-xs" htmlFor="website">
                Website <span className="text-red">*</span>
              </label>
              <InputComponent
                value={details.brandWebsite || "https://"}
                required
                onChange={(e) => {
                  let url = e.target.value;
                  if (!url.startsWith("https://")) {
                    if (url === "https:/") {
                      url = "https://";
                    } else if (!url.startsWith("http://")) {
                      url = `https://${url.replace(/^https?:\/\//, "")}`;
                    }
                  }
                  setDetails({ ...details, brandWebsite: url });
                }}
                onFocus={(e) => {
                  if (e.target.value === "https://") {
                    e.target.setSelectionRange(8, 8);
                  }
                }}
                placeholder="https://example.com"
              />
            </div>
            <section className="flex gap-4 justify-between mt-2">
              <div className="w-full">
                <label className="text-xs" htmlFor="brandname">
                  Legal Company Name <span className="text-red">*</span>
                </label>
                <InputComponent
                  value={details.legalCompanyName}
                  onChange={(e) =>
                    setDetails({ ...details, legalCompanyName: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="brandname">
                  Brand Name <span className="text-red">*</span>
                </label>
                <InputComponent
                  value={details.brandName}
                  onChange={(e) =>
                    setDetails({ ...details, brandName: e.target.value })
                  }
                />
              </div>
            </section>
          </section>
          <section>
            <h3 className="font-bold text-xl mb-2">Company Details</h3>
            <section className="flex gap-4 justify-between">
              <div className="w-full relative">
                <label className="text-xs" htmlFor="country">
                  Country <span className="text-red">*</span>
                </label>
                <div
                  className="flex items-center border border-input text-sm rounded-md p-2 h-10 cursor-pointer"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                >
                  {details.country.name ? (
                    <>
                      <ReactCountryFlag
                        countryCode={details.country.code}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "8px",
                        }}
                      />
                      <span>{details.country.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select a country</span>
                  )}
                </div>
                {isCountryOpen && (
                  <div
                    ref={countryDropdownRef}
                    className="absolute z-10 w-full mt-1 bg-white border border-input rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    <div className="p-2 sticky top-0 bg-white">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        className="w-full p-2 border border-input rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        onChange={handleCountrySearch}
                        autoFocus
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleCountrySelect({
                            name: country.name,
                            code: country.code,
                          })
                        }
                      >
                        <ReactCountryFlag
                          countryCode={country.code}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                            marginRight: "8px",
                          }}
                        />
                        <span>{country.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="state">
                  State <span className="text-red">*</span>
                  {isLoadingLocation && (
                    <span className="ml-2 text-xs text-gray-400">
                      (Auto-detecting...)
                    </span>
                  )}
                </label>
                <InputComponent
                  value={details.state}
                  onChange={(e) =>
                    setDetails({ ...details, state: e.target.value })
                  }
                />
              </div>
            </section>
            <section className="flex gap-4 justify-between my-2">
              <div className="w-full">
                <label className="text-xs" htmlFor="city">
                  City <span className="text-red">*</span>
                </label>
                <InputComponent
                  value={details.city}
                  onChange={(e) =>
                    setDetails({ ...details, city: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="phone">
                  Phone <span className="text-red">*</span>
                </label>
                <div className="flex gap-1">
                  <div className="relative w-1/3">
                    <div
                      className="flex items-center border border-input text-sm rounded-md pl-1 h-10 cursor-pointer"
                      onClick={() => setIsPhoneCodeOpen(!isPhoneCodeOpen)}
                    >
                      {details.phoneNumber.code ? (
                        <>
                          <ReactCountryFlag
                            countryCode={details.country.code}
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                              marginRight: "4px",
                            }}
                          />
                          <span>{details.phoneNumber.code}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Code</span>
                      )}
                    </div>
                    {isPhoneCodeOpen && (
                      <div
                        ref={phoneCodeDropdownRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-input rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        <div className="p-2 sticky top-0 bg-white">
                          <input
                            type="text"
                            placeholder="Search country codes..."
                            className="w-full p-2 border border-input rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            onChange={handlePhoneCodeSearch}
                            autoFocus
                          />
                        </div>
                        {filteredPhoneCodes.map((item) => (
                          <div
                            key={item.code}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDetails({
                                ...details,
                                phoneNumber: {
                                  ...details.phoneNumber,
                                  code: item.dial_code,
                                },
                                country: {
                                  name: item.name,
                                  code: item.code,
                                },
                              });
                              setIsPhoneCodeOpen(false);
                            }}
                          >
                            <ReactCountryFlag
                              countryCode={item.code}
                              svg
                              style={{
                                width: "1.2em",
                                height: "1.2em",
                                marginRight: "4px",
                              }}
                            />
                            <span className="mr-2">{item.dial_code}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-2/3">
                    <InputComponent
                      value={details.phoneNumber.number}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          phoneNumber: {
                            ...details.phoneNumber,
                            number: e.target.value,
                          },
                        })
                      }
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="flex gap-4 justify-between my-2">
              <div className="w-full">
                <label className="text-xs" htmlFor="address">
                  Address <span className="text-red">*</span>
                </label>
                <InputComponent
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-xs" htmlFor="zipCode">
                  Zip code <span className="text-red">*</span>
                </label>
                <InputComponent
                  value={details.zipCode}
                  onChange={(e) =>
                    setDetails({ ...details, zipCode: e.target.value })
                  }
                />
              </div>
            </section>

            <div className="my-2">
              <label className="text-xs" htmlFor="brand">
                What does your brand offer please keep it brief.{" "}
                <span className="text-red">*</span>
              </label>
              <TextAreaComponent
                value={details.brandDescription}
                onChange={(e) =>
                  setDetails({ ...details, brandDescription: e.target.value })
                }
              />
              {details.brandDescription && (
                <div className="">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ease-in-out ${
                        descriptionLength < 30
                          ? "bg-red"
                          : descriptionLength < 60
                          ? "bg-yellow"
                          : "bg-green"
                      }`}
                      style={{
                        width: `${Math.min(
                          (descriptionLength / 100) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray">
                    {descriptionLength < 30
                      ? "Too little information"
                      : descriptionLength < 60
                      ? "Almost there..."
                      : "Perfect! 💯"}
                  </p>
                </div>
              )}
            </div>
            <ButtonComponent onClick={handleNext} label="Next" />
          </section>
        </form>
      </div>
    </section>
  );
};

export default BrandDetails;
