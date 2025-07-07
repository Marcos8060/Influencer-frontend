"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ReactCountryFlag } from "react-country-flag";
import { countryPhoneData } from "@/app/Components/Onboarding/Brand/brand-details/countryPhoneData";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import countries from "country-list";
import { useLocation } from '@/app/layout';

const countryData = countries.getData();

const Address = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const dispatch = useDispatch();
  const { location } = useLocation();
  const [details, setDetails] = useState({
    influencerAddressLine1: influencerData.influencerAddressLine1 || "",
    influencerAddressLine2: influencerData.influencerAddressLine2 || "",
    influencerCity: influencerData.influencerCity || "",
    influencerCountry: influencerData.influencerCountry || { name: "", code: "" },
    influencerZipCode: influencerData.influencerZipCode || "",
    gender: influencerData.gender || "",
    dateOfBirth: influencerData.dateOfBirth || "",
    influencerPhoneNumber: influencerData.influencerPhoneNumber || {
      code: "",
      number: "",
    },
  });
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const countryDropdownRef = useRef(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Only auto-fill if location is available, not already filled, and fields are empty
    if (
      location &&
      !hasAutoFilled &&
      !details.influencerAddressLine1 &&
      !details.influencerCity &&
      !details.influencerCountry.name &&
      !details.influencerZipCode
    ) {
      setDetails((prev) => ({
        ...prev,
        influencerAddressLine1: location.addressLine1 || "",
        influencerAddressLine2: location.addressLine2 || "",
        influencerCity: location.city || "",
        influencerCountry: {
          name: location.country || "",
          code: location.countryCode || "",
        },
        influencerZipCode: location.zipCode || "",
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

  const fetchLocationData = async (countryCode) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?country=${countryCode}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        setDetails((prev) => ({
          ...prev,
          influencerCity: result.city || prev.influencerCity,
          influencerZipCode: result.postcode || prev.influencerZipCode,
        }));
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
      influencerCountry: { name: country.name, code: country.code },
      influencerPhoneNumber: {
        ...details.influencerPhoneNumber,
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

  const handleNext = () => {
    const requiredFields = [
      !details.influencerAddressLine1,
      !details.influencerCity,
      !details.influencerCountry.name,
      !details.influencerZipCode,
      !details.influencerPhoneNumber.number,
      !details.gender,
      !details.dateOfBirth,
    ];

    if (requiredFields.some(Boolean)) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Normalize influencerPhoneNumber to only have code and number
    let normalizedPhone = details.influencerPhoneNumber;
    if (typeof normalizedPhone !== 'object' || Array.isArray(normalizedPhone) || !('code' in normalizedPhone) || !('number' in normalizedPhone)) {
      normalizedPhone = { code: '', number: '' };
    } else {
      normalizedPhone = {
        code: normalizedPhone.code,
        number: normalizedPhone.number,
      };
    }

    try {
      dispatch(
        updateFormData({
          ...details,
          influencerPhoneNumber: normalizedPhone
        })
      );
      dispatch(nextStep());
    } catch (error) {
      console.error("Dispatch error:", error);
      toast.error("Failed to save data");
    }
  };

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
            Your Address Details
          </h1>
          <p className="text-gray-500">
            Your details will not be publicly available except for Brands with
            whom you work with. Otherwise, the city and country will be used for
            matching purposes.
          </p>
        </div>

        <div className="space-y-6">
          {/* Address Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-input">
              Address Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.influencerAddressLine1}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      influencerAddressLine1: e.target.value,
                    })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Street address, P.O. box, company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <InputComponent
                  value={details.influencerAddressLine2}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      influencerAddressLine2: e.target.value,
                    })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <InputComponent
                    value={details.influencerCity}
                    onChange={(e) =>
                      setDetails({ ...details, influencerCity: e.target.value })
                    }
                    className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="City or town"
                  />
                </div>

                {/* Country Select */}
                <div className="relative" ref={countryDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="flex items-center border border-input text-sm rounded-md px-3 py-2 h-10 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                  >
                    {details.influencerCountry.name ? (
                      <>
                        <ReactCountryFlag
                          countryCode={details.influencerCountry.code}
                          svg
                          className="w-5 h-5 mr-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <span>{details.influencerCountry.name}</span>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal/Zip Code <span className="text-red-500">*</span>
                  </label>
                  <InputComponent
                    value={details.influencerZipCode}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        influencerZipCode: e.target.value,
                      })
                    }
                    className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Postal code or ZIP code"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <CountryCodeDropdown
                      value={details.influencerPhoneNumber.code}
                      className="h-10"
                      onChange={(val) => setDetails({
                        ...details,
                        influencerPhoneNumber: {
                          ...details.influencerPhoneNumber,
                          code: val,
                        },
                      })}
                    />
                    <InputComponent
                      value={details.influencerPhoneNumber.number}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 15);
                        setDetails({
                          ...details,
                          influencerPhoneNumber: {
                            ...details.influencerPhoneNumber,
                            number: digitsOnly,
                          },
                        });
                      }}
                      placeholder="Phone number"
                      className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-10"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Select gender"
                    className="w-full"
                    value={details.gender || undefined}
                    onChange={(value) => setDetails({ ...details, gender: value })}
                  >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Of Birth <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    className="w-full"
                    placeholder="Select date of birth"
                    value={details.dateOfBirth ? dayjs(details.dateOfBirth) : null}
                    onChange={(date, dateString) => {
                      setDetails({ ...details, dateOfBirth: dateString });
                    }}
                    format="YYYY-MM-DD"
                    disabledDate={(current) => {
                      // Disable future dates
                      return current && current > dayjs().endOf('day');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <ButtonComponent
              onClick={handleNext}
              label="Continue"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium rounded-lg shadow-sm"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Address;
