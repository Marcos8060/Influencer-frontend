"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import TextAreaComponent from "@/app/Components/SharedComponents/TextAreaComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { ReactCountryFlag } from "react-country-flag";
import countries from "country-list";
import { countryPhoneData } from "./countryPhoneData";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from '@/app/layout';
import { Select } from "antd";

const countryData = countries.getData();

const BrandDetails = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();
  const { location } = useLocation();
  const [details, setDetails] = useState({
    brandWebsite: formData.brandWebsite || "",
    legalCompanyName: formData.legalCompanyName || "",
    country: formData.country || { name: "", code: "" },
    phoneNumber: formData.phoneNumber || { code: "", number: "" },
    state: formData.state || "",
    city: formData.city || "",
    address: formData.address || "",
    zipCode: formData.zipCode || "",
    brandName: formData.brandName || "",
    brandDescription: formData.brandDescription || "",
  });
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [filteredPhoneCodes, setFilteredPhoneCodes] =
    useState(countryPhoneData);

  const countryDropdownRef = useRef(null);
  const phoneCodeDropdownRef = useRef(null);

  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
      if (
        phoneCodeDropdownRef.current &&
        !phoneCodeDropdownRef.current.contains(event.target)
      ) {
        setIsPhoneCodeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Only auto-fill if location is available, not already filled, and fields are empty
    if (
      location &&
      !hasAutoFilled &&
      !details.address &&
      !details.city &&
      !details.country.name &&
      !details.zipCode
    ) {
      setDetails((prev) => ({
        ...prev,
        address: location.addressLine1 || "",
        city: location.city || "",
        country: {
          name: location.country || "",
          code: location.countryCode || "",
        },
        zipCode: location.zipCode || "",
      }));
      setHasAutoFilled(true);
    }
  }, [location, hasAutoFilled, details]);

  const handleCountrySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredCountries(
      countryData.filter((country) =>
        country.name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const handlePhoneCodeSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredPhoneCodes(
      countryPhoneData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.code.toLowerCase().includes(searchTerm) ||
          item.dial_code.toLowerCase().includes(searchTerm)
      )
    );
  };

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
          city:
            location.address.city ||
            location.address.town ||
            location.address.village ||
            location.address.county ||
            prev.city,
          state:
            location.address.state || location.address.region || prev.state,
          address: location.address.road
            ? `${location.address.road}${
                location.address.house_number
                  ? " " + location.address.house_number
                  : ""
              }`
            : prev.address,
          zipCode: location.address.postcode || prev.zipCode,
        }));

        // Show success message only if we actually got data
        if (
          location.address.city ||
          location.address.town ||
          location.address.state
        ) {
          toast.success("Location details auto-filled");
        }
      } else {
        toast(
          "Couldn't auto-fill all location details. Please enter manually.",
          {
            icon: "ℹ️",
          }
        );
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Could not auto-fill location details");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleCountrySelect = async (country) => {
    const phoneData = countryPhoneData.find(
      (item) => item.code === country.code
    );

    setIsLoadingLocation(true);
    toast.loading("Detecting location details...", { id: "location-loading" });

    setDetails({
      ...details,
      country: { name: country.name, code: country.code },
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

    const missingFields = [];
    if (!details.brandWebsite || details.brandWebsite === "https://") missingFields.push("Website");
    if (!details.legalCompanyName) missingFields.push("Legal Company Name");
    if (!details.brandName) missingFields.push("Brand Name");
    if (!details.country.name) missingFields.push("Country");
    if (!details.state) missingFields.push("State");
    if (!details.city) missingFields.push("City");
    if (!details.address) missingFields.push("Address");
    if (!details.zipCode) missingFields.push("Zip Code");
    if (!details.brandDescription) missingFields.push("Brand Description");
    if (!details.phoneNumber.code) missingFields.push("Phone Country Code");

    if (missingFields.length > 0) {
      toast.error(`Please fill: ${missingFields.join(", ")}`);
      return;
    }

    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  const descriptionLength = details.brandDescription?.length || 0;

  // CountryCodeDropdown for phone number
  const CountryCodeDropdown = ({ value, onChange }) => (
    <Select
      showSearch
      value={value}
      onChange={onChange}
      style={{ width: 100, height: 40 }}
      optionFilterProp="label"
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      dropdownStyle={{ zIndex: 2000 }}
      size="large"
      className="h-12"
    >
      {countryPhoneData.map((country) => (
        <Select.Option
          key={`${country.code}-${country.dial_code}`}
          value={country.dial_code}
          label={`${country.name} ${country.dial_code}`}
        >
          <span role="img" aria-label={country.code} style={{ marginRight: 8 }}>
            <img
              src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
              alt={country.code}
              style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover", display: "inline-block", marginRight: 6 }}
            />
          </span>
          {country.name} {country.dial_code}
        </Select.Option>
      ))}
    </Select>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-xl border border-input p-6 sm:p-8"
      >
        {/* Form Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tell Us About Your Brand
          </h1>
          <p className="text-gray-500">
            Help us create the perfect influencer matches for you
          </p>
        </div>

        <form className="space-y-6">
          {/* Brand Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-input">
              Brand Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.brandWebsite}
                  onChange={(e) => {
                    const url = e.target.value;
                    setDetails({ ...details, brandWebsite: url });
                  }}
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Legal Company Name <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.legalCompanyName}
                  onChange={(e) =>
                    setDetails({ ...details, legalCompanyName: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.brandName}
                  onChange={(e) =>
                    setDetails({ ...details, brandName: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Company Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-input">
              Company Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Select */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <div
                  className="flex items-center border border-input text-sm rounded-md px-3 py-2 h-10 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                >
                  {details.country.name ? (
                    <>
                      <ReactCountryFlag
                        countryCode={details.country.code}
                        svg
                        className="w-5 h-5 mr-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                      <span>{details.country.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select country</span>
                  )}
                </div>

                <AnimatePresence>
                  {isCountryOpen && (
                    <motion.div
                      ref={countryDropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 w-full mt-1 bg-white border border-input rounded-md shadow-lg overflow-hidden"
                    >
                      <div className="p-2 sticky top-0 bg-white border-b border-input">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          className="w-full p-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          onChange={handleCountrySearch}
                          autoFocus
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <div
                            key={country.code}
                            className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleCountrySelect(country)}
                          >
                            <ReactCountryFlag
                              countryCode={country.code}
                              svg
                              className="w-5 h-5 mr-2"
                            />
                            <span>{country.name}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                  {isLoadingLocation && (
                    <span className="ml-2 text-xs text-gray-500">
                      (Auto-detecting...)
                    </span>
                  )}
                </label>
                <InputComponent
                  value={details.state}
                  onChange={(e) =>
                    setDetails({ ...details, state: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.city}
                  onChange={(e) =>
                    setDetails({ ...details, city: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <CountryCodeDropdown
                    value={details.phoneNumber.code}
                    className="h-10"
                    onChange={(val) => setDetails({
                      ...details,
                      phoneNumber: {
                        ...details.phoneNumber,
                        code: val,
                      },
                    })}
                  />
                  <InputComponent
                    value={details.phoneNumber.number}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 15);
                      setDetails({
                        ...details,
                        phoneNumber: {
                          ...details.phoneNumber,
                          number: digitsOnly,
                        },
                      });
                    }}
                    placeholder="Phone number"
                    className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-10"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.zipCode}
                  onChange={(e) =>
                    setDetails({ ...details, zipCode: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Brand Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What does your brand offer? (Please keep it brief){" "}
              <span className="text-red-500">*</span>
            </label>
            <TextAreaComponent
              value={details.brandDescription}
              onChange={(e) =>
                setDetails({ ...details, brandDescription: e.target.value })
              }
              className="w-full min-h-[120px] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />

            {details.brandDescription && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      descriptionLength < 30
                        ? "bg-red"
                        : descriptionLength < 60
                        ? "bg-yellow"
                        : "bg-green"
                    }`}
                    style={{ width: `${Math.min(descriptionLength, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {descriptionLength < 30
                    ? "Too brief"
                    : descriptionLength < 60
                    ? "Good start"
                    : "Excellent description"}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <ButtonComponent
              onClick={handleNext}
              label="Continue"
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium rounded-lg shadow-sm"
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BrandDetails;
