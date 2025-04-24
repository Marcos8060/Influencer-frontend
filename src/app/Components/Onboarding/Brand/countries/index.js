"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, nextStep, previousStep, updateFormData } from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { ReactCountryFlag } from "react-country-flag";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const Countries = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedCountries, setSelectedCountries] = useState(
    formData.preferredInfluencerCountries || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const countries = [
    { name: "Kenya", code: "KE" },
    { name: "United States", code: "US" },
    { name: "India", code: "IN" },
    { name: "France", code: "FR" },
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "United Kingdom", code: "GB" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "Japan", code: "JP" },
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (selectedCountries.length === 0) {
      toast.error("Please select at least one country");
      return;
    }
    dispatch(
      updateFormData({ preferredInfluencerCountries: selectedCountries })
    );
    dispatch(nextStep());
  };

  const toggleCountry = (country) => {
    setSelectedCountries(prev =>
      prev.some(c => c.code === country.code)
        ? prev.filter(c => c.code !== country.code)
        : [...prev, country]
    );
  };

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-input p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Influencer Location Preferences
          </h1>
          <p className="text-gray-500">
            Select countries where you'd like your influencers to be based
          </p>
        </div>

        {/* Country Selection */}
        <div className="mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1">
            {filteredCountries.map((country) => (
              <motion.div
                key={country.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-2 border border-input rounded-lg cursor-pointer transition-colors flex items-center ${
                  selectedCountries.some(c => c.code === country.code)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => toggleCountry(country)}
              >
                <div className="flex-shrink-0 mr-3">
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: '1.8em',
                      height: '1.8em',
                    }}
                    className="rounded-sm"
                  />
                </div>
                <span className="font-medium text-sm text-gray-800">{country.name}</span>
                <div className="ml-auto">
                  <div className={`w-5 h-5 rounded border border-input flex items-center justify-center ${
                    selectedCountries.some(c => c.code === country.code)
                      ? 'bg-primary border-primary'
                      : 'bg-white border-gray-300'
                  }`}>
                    {selectedCountries.some(c => c.code === country.code) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Countries */}
        {selectedCountries.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Countries ({selectedCountries.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map(country => (
                <div 
                  key={country.code} 
                  className="flex items-center bg-primary/10 px-3 py-1 rounded-full"
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: '1em',
                      height: '1em',
                    }}
                    className="mr-1"
                  />
                  <span className="text-xs text-primary font-medium">{country.name}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCountry(country);
                    }}
                    className="ml-2 text-primary/70 hover:text-primary"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-input">
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())} 
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          />
          <ButtonComponent 
            onClick={handleNext}
            label="Continue"
            disabled={selectedCountries.length === 0}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              selectedCountries.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark'
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Countries;