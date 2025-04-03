"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import MultiSelectCheckBox from "@/app/Components/SharedComponents/MultiSelectCheckBox";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";

const PreferredCompanies = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const [selectedCompanies, setSelectedCompanies] = useState(
    influencerData.preferredCompaniesType || []
  );
  const dispatch = useDispatch();

  const races = [
    "E-Commerce",
    "In Person services",
    "Market Place",
    "Digital Services",
    "Other",
  ];

  const handleNext = () => {
    if (selectedCompanies.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    dispatch(updateFormData({ preferredCompaniesType: selectedCompanies }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(6));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          Preferred Companies
        </h1>
        <p className="text-center text-sm mb-3">
          What type of Companies do you prefer to work with?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedCompanies}
            onChange={(e) => setSelectedCompanies(e.value)}
            options={races.map((item) => ({ label: item, value: item }))}
            optionLabel="label"
            placeholder="Select Company"
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

export default PreferredCompanies;
