"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";

const Gender = () => {
  const dispatch = useDispatch();
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);

  // Store a single string, not an array
  const [selectedGender, setSelectedGender] = useState(influencerData.gender || "");

  const genders = ["Any", "Male", "Female", "Other"];

  const selectGender = (gender) => {
    setSelectedGender(gender); // Directly update the string
  };

  const handleNext = () => {
    if (!selectedGender) {
      toast.error("Please select a gender.");
      return;
    }

    dispatch(updateFormData({ gender: selectedGender })); // Store as a string
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Gender</h1>
        <p className="text-center text-sm mb-3">
          How do you describe your Identity?
        </p>
        <div className="space-y-4 w-full">
          {genders.map((option) => (
            <TickBoxComponent
              key={option}
              label={option}
              checked={selectedGender === option}
              onChange={() => selectGender(option)} // Select only one
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Gender;
