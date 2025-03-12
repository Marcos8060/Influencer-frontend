"use client";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
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

const Ethnicities = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedRaces, setSelectedRaces] = useState(formData.preferredInfluencerEthnicities || []);
  const dispatch = useDispatch();

  const races = [
    { name: "Asian" },
    { name: "Black / African" },
    { name: "Hispanic / Latina" },
    { name: "American Indian / Alaskan Native" },
    { name: "Native Hawaian / Pacific Islander" },
    { name: "White" },
    { name: "Other" },
  ];

  const handleNext = () => {
    if(selectedRaces.length === 0) {
      toast.error('Please select at least one option')
      return;
    }
    dispatch(updateFormData({ preferredInfluencerEthnicities: selectedRaces }))
    dispatch(nextStep());
  }

  useEffect(() => {
    dispatch(setCurrentStep(11));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Ethnicities</h1>
        <p className="text-center text-sm mb-3">
          What influencer ethnicities are you aiming to target?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedRaces}
            onChange={(e) => setSelectedRaces(e.value)}
            options={races}
            optionLabel="name"
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

export default Ethnicities;
