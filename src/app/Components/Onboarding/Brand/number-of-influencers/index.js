"use client";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

const NumberOfInfluencers = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const options = ["1-10", "10-20", "20-30", "40-50","50+"];

  useEffect(() => {
    dispatch(setCurrentStep(6));
    setSelectedOption(formData.monthlyNumberOfInfluencers || "")
  }, [dispatch, formData.monthlyNumberOfInfluencers]);
  
  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ monthlyNumberOfInfluencers: selectedOption }));
    dispatch(nextStep());
  }
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">
          Desired Number of influencers (Monthly)
        </h1>
        <p className="text-center text-sm mb-3">
          How many influencers are you looking to collaborate with?
        </p>
        <section className="flex items-center justify-center gap-4 mb-2">
          <div className="space-y-3 w-full">
            {options.map((option) => (
              <TickBoxComponent
                key={option}
                label={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
            ))}
          </div>
        </section>
        <div className="mt-2 space-y-2">
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default NumberOfInfluencers;
