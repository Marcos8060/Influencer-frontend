"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  previousStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";

const FindAboutUs = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ platformIntroductionSource: selectedOption }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(10));
    setSelectedOption(influencerData.platformIntroductionSource || "");
  }, [influencerData.platformIntroductionSource]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">
          How did you find out about us?
        </h1>
        <p className="text-center text-sm mb-3">
          We would love to hear how you discovered us as it will help enhance
          our marketting strategies.
        </p>
        <div className="space-y-4">
          {[
            "Someone recommended me",
            "Facebook or Instagram Ads",
            "Google or Bing",
            "Review on a blog, website, etc",
            "Influencer Platform blog",
            "Other",
          ].map((option) => (
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

export default FindAboutUs;
