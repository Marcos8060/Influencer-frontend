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
import countries from "country-list";
import { countryPhoneData } from "./countryPhoneData";

const countryData = countries.getData();

const Address = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    influencerAddressLine1: influencerData.influencerAddressLine1 || "",
    influencerAddressLine2: influencerData.influencerAddressLine2 || "",
    influencerCity: influencerData.influencerCity || "",
    influencerCountry: influencerData.influencerCountry || {
      name: "",
      code: "",
    },
    influencerZipCode: influencerData.influencerZipCode || "",
    influencerPhoneNumber: influencerData.influencerPhoneNumber || {
      code: "+1",
      number: "",
    },
  });

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);
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

  const handleNext = () => {
    const requiredFields = [
      !details.influencerAddressLine1,
      !details.influencerCity,
      !details.influencerCountry.name,
      !details.influencerZipCode,
      !details.influencerPhoneNumber.number,
    ];

    if (requiredFields.some(Boolean)) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      dispatch(
        updateFormData({
          ...details,
          influencerCountry: details.influencerCountry.name,
          influencerPhoneNumber: `${details.influencerPhoneNumber.code}${details.influencerPhoneNumber.number}`,
        })
      );
      dispatch(nextStep());
    } catch (error) {
      console.error("Dispatch error:", error);
      toast.error("Failed to save data");
    }
  };

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
                          className="w-5 h-5 mr-2"
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
                              onClick={() => {
                                setDetails({
                                  ...details,
                                  influencerCountry: {
                                    name: country.name,
                                    code: country.code,
                                  },
                                  influencerPhoneNumber: {
                                    ...details.influencerPhoneNumber,
                                    code:
                                      countryPhoneData.find(
                                        (c) => c.code === country.code
                                      )?.dial_code || "+1",
                                  },
                                });
                                setIsCountryOpen(false);
                              }}
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

                <div ref={phoneCodeDropdownRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div
                        className="flex items-center border border-input rounded-md px-2 h-10 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setIsPhoneCodeOpen(!isPhoneCodeOpen)}
                      >
                        {details.influencerCountry.code ? (
                          <>
                            <ReactCountryFlag
                              countryCode={details.influencerCountry.code}
                              svg
                              className="w-5 h-5 mr-1"
                            />
                            <span>{details.influencerPhoneNumber.code}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Code</span>
                        )}
                      </div>

                      <AnimatePresence>
                        {isPhoneCodeOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-input rounded-md shadow-lg overflow-hidden"
                          >
                            <div className="p-2 sticky top-0 bg-white border-b border-input">
                              <input
                                type="text"
                                placeholder="Search country codes..."
                                className="w-full p-2 border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                onChange={handlePhoneCodeSearch}
                                autoFocus
                              />
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {Array.isArray(filteredPhoneCodes) &&
                                filteredPhoneCodes.map((item) => (
                                  <div
                                    key={item.code}
                                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                      setDetails({
                                        ...details,
                                        influencerPhoneNumber: {
                                          ...details.influencerPhoneNumber,
                                          code: item.dial_code,
                                        },
                                        influencerCountry: {
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
                                      className="w-5 h-5 mr-2"
                                    />
                                    <span className="mr-2">
                                      {item.dial_code}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex-2">
                      <InputComponent
                        value={details.influencerPhoneNumber.number}
                        onChange={(e) => {
                          const digitsOnly = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 15);
                          setDetails({
                            ...details,
                            influencerPhoneNumber: {
                              ...details.influencerPhoneNumber,
                              number: digitsOnly,
                            },
                          });
                        }}
                        placeholder="Phone number"
                        className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6">
            {/* <CustomizedBackButton 
              onClick={() => dispatch(previousStep())} 
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            /> */}
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
