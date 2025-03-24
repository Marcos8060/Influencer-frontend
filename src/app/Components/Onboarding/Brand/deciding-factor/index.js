"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper";
import CustomizedTickBoxComponent from "@/app/Components/SharedComponents/CustomizedTickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast"; // Don't forget to import toast!

const DecidingFactor = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedOptions, setSelectedOptions] = useState(
    formData.mostImportantCollaborationFactor || []
  );

  const options = [
    {
      label: "Quality of Content",
      description: "For me, the quality of content is the key factor",
    },
    {
      label: "Engagement Rate",
      description: "For me, the engagement rate is the key factor",
    },
    {
      label: "Quality of the Comments",
      description: "For me, the quality of the comments is the key factor",
    },
    {
      label: "Followers",
      description: "For me, the number of followers is the key factor",
    },
  ];

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((item) => item.label === option.label);
      return exists
        ? prev.filter((item) => item.label !== option.label)
        : [...prev, option]; // Store the entire object { label, description }
    });
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one option.");
      return;
    }

    dispatch(
      updateFormData({
        mostImportantCollaborationFactor: selectedOptions,
      })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(8));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Deciding Factor</h1>
        <p className="text-center text-sm mb-3">
          What is the most important factor when deciding which influencer to
          collaborate with?
        </p>
        <div className="space-y-4">
          {options.map((option) => (
            <CustomizedTickBoxComponent
              key={option.label}
              label={option.label}
              description={option.description}
              checked={selectedOptions.some((item) => item.label === option.label)}
              onChange={() => toggleOption(option)}
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default DecidingFactor;
