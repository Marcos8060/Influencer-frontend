"use client";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
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

const MinimumFollowers = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const options = ["Above 1,000 followers", "Need at least 3,000 followers", "Only over 5,000 followers"];


  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ preferredInfluencerMinimumFollowers: selectedOption }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(9));
    setSelectedOption(formData.preferredInfluencerMinimumFollowers || "");
  }, [dispatch,formData.preferredInfluencerMinimumFollowers]);
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">
          Minimum Followers
        </h1>
        <p className="text-center text-sm mb-3">
          What is the most important factor when deciding which influencer to
          collabotate with?
        </p>
        <div className="space-y-4">
          {options.map((option) => (
            <TickBoxComponent
              key={option}
              label={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default MinimumFollowers;
