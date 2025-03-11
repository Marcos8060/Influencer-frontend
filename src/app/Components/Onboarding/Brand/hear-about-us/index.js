"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import BackComponent from "@/app/Components/SharedComponents/BackComponent";
import toast from "react-hot-toast";

const FindAboutUs = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);

  useEffect(() => {
    dispatch(setCurrentStep(0));
    setSelectedOption(formData.platformIntroductionSource || "");
  }, [dispatch, formData.businessType]);

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ platformIntroductionSource: selectedOption }));
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
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
          {/* <BackComponent href="/auth/register/otp" /> */}
        </div>
      </div>
    </section>
  );
};

export default FindAboutUs;
