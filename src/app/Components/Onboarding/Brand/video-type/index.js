"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  previousStep,
} from "@/redux/features/stepper";
import CustomizedTickBoxComponent from "@/app/Components/SharedComponents/CustomizedTickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

const VideoType = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedOptions, setSelectedOptions] = useState(
    formData.preferredVideoType || []
  );
  const dispatch = useDispatch();

  const options = [
    {
      label: "Up to the creator",
      description: "Our creators will send you their most creative takes",
    },
    {
      label: "Testimonials",
      description: "our creators will send you their testimonial reviews",
    },
    {
      label: "Unboxing",
      description: "For me, the quality of the comments is the key factor",
    },
    {
      label: "How To",
      description: "Creators will record themselves explaining how your products work",
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
        preferredVideoType: selectedOptions,
      })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(16));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Video Type</h1>
        <p className="text-center text-sm mb-3">
          Which type of videos do you want?
        </p>
        <div className="space-y-2">
          {options.map((option) => (
            <CustomizedTickBoxComponent
              key={option.label}
              label={option.label}
              description={option.description}
              checked={selectedOptions.some(
                (item) => item.label === option.label
              )}
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

export default VideoType;
