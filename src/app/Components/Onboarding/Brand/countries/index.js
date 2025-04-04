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

const Countries = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedCountries, setSelectedCountries] = useState(
    formData.preferredInfluencerCountries || []
  );
  const dispatch = useDispatch();

  const getFlagEmoji = (countryCode) => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  };
  const countries = [
    { name: "Kenya", code: "KE", flag: getFlagEmoji("KE") },
    { name: "United States", code: "US", flag: getFlagEmoji("US") },
    { name: "India", code: "IN", flag: getFlagEmoji("IN") },
    { name: "France", code: "FR", flag: getFlagEmoji("FR") },
    { name: "Australia", code: "AU", flag: getFlagEmoji("AU") },
    { name: "Brazil", code: "BR", flag: getFlagEmoji("BR") },
    { name: "China", code: "CN", flag: getFlagEmoji("CN") },
    { name: "Egypt", code: "EG", flag: getFlagEmoji("EG") },
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
    dispatch(setCurrentStep(5));
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
            optionLabel={(option) => `${option.flag} ${option.name}`}
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
