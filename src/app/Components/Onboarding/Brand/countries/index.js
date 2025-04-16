"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import MultiSelectCheckBox from "@/app/Components/SharedComponents/MultiSelectCheckBox";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

// Import SVG flags or use a flag library
import { ReactCountryFlag } from "react-country-flag";

const Countries = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedCountries, setSelectedCountries] = useState(
    formData.preferredInfluencerCountries || []
  );
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
  ];

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

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Countries</h1>
        <p className="text-center text-sm mb-3">
          Which country should the influencer be based in?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedCountries}
            onChange={(e) => setSelectedCountries(e.value)}
            options={countries}
            optionLabel={(option) => (
              <div className="flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={option.code}
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                  }}
                  title={option.code}
                />
                <span>{option.name}</span>
              </div>
            )}
            placeholder="Select Countries"
          />
        </div>
        <div className="mt-2 space-y-2">
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Countries;