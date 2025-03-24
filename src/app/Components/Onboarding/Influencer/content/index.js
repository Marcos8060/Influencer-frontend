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

const InfluencerContent = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const [selectedCategory, setSelectedCategory] = useState(
    influencerData.contentCategories || []
  );
  const dispatch = useDispatch();

  const races = [
    "Beauty and Care",
    "Business and Finance",
    "Fashion and Style",
    "Gaming",
  ];

  const handleNext = () => {
    if (selectedCategory.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    dispatch(updateFormData({ contentCategories: selectedCategory }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(4));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          What type of content do you produce?
        </h1>
        <p className="text-center text-sm mb-3">
          Choose up to three categories that best describes your content.
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
            options={races.map((item) => ({ label: item, value: item }))}
            optionLabel="label"
            optionValue="value"
            placeholder="Select Category"
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

export default InfluencerContent;
