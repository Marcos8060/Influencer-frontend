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

const EthnicBackground = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const [selectedRaces, setSelectedRaces] = useState(
    influencerData.ethnicBackground || []
  );
  const dispatch = useDispatch();

  const races = [
    "Asian",
    "Black / African",
    "Hispanic / Latina",
    "American Indian / Alaskan Native",
    "Native Hawaian / Pacific Islander",
    "White",
    "Other",
  ];

  const handleNext = () => {
    if (selectedRaces.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    dispatch(updateFormData({ ethnicBackground: selectedRaces }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Ethnicity</h1>
        <p className="text-center text-sm mb-3">
          What is your ethnic background?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedRaces}
            onChange={(e) => setSelectedRaces(e.value)}
            options={races.map((item) => ({ label: item, value: item }))}
            optionLabel="label"
            placeholder="Select Ethicity"
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

export default EthnicBackground;
