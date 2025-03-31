"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

const AgeGroups = () => {
  const formData = useSelector((state) => state.stepper.formData);
  const [selectedAge, setSelectedAge] = useState(
    formData.preferredInfluencerAgeGroups || []
  );
  const dispatch = useDispatch();

  const options = ["Any", "18-24", "25-34","35-44", "45+", ];

  const toggleAge = (age) => {
    setSelectedAge((prev) =>
      prev.includes(age) ? prev.filter((p) => p !== age) : [...prev, age]
    );
  };

  const handleNext = () => {
    if (selectedAge.length === 0) {
      toast.error("Please select at least one option.");
      return;
    }

    dispatch(
      updateFormData({
        preferredInfluencerAgeGroups: selectedAge,
      })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(12));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Age Groups</h1>
        <p className="text-center text-sm mb-3">
          What influencer age group(s) are you targeting?
        </p>
        <div className="flex items-center justify-center gap-4 w-full mb-4 text-center">
          {options.map((option) => (
            <TickBoxComponent
              key={option}
              label={option}
              checked={selectedAge.includes(option)}
              onChange={() => toggleAge(option)}
            />
          ))}
        </div>
        <div>
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default AgeGroups;
