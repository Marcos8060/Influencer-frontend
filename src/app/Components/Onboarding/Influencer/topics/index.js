"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData
} from "@/redux/features/stepper/influencer-stepper";
import MultiSelectCheckBox from "@/app/Components/SharedComponents/MultiSelectCheckBox";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";

const Topics = () => {
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);
  const [selectedTopics, setSelectedTopics] = useState(
    influencerData.influencerTopics || []
  );
  const dispatch = useDispatch();

 
  const topics = ["Entertainment", "Food","Fitness", "Design"];

  const handleNext = () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    dispatch(
      updateFormData({ influencerTopics: selectedTopics })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(7));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Topics</h1>
        <p className="text-center text-sm mb-3">
          Select the keywords that best describe you and your creator account.
        </p>
        <div className="my-4">
        <MultiSelectCheckBox
            value={selectedTopics}
            onChange={(e) => setSelectedTopics(e.value)}
            options={topics.map((item) => ({ label: item, value: item }))}
            optionLabel="label"
            placeholder="Select a topic"
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

export default Topics;
