"use client";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import MultiSelectCheckBox from "@/app/Components/SharedComponents/MultiSelectCheckBox";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";

const InfluencerIndustry = () => {
  const formData = useSelector((store) => store.stepper.formData);
    const [selectedIndustries,setSelectedIndustries] = useState(formData.preferredInfluencerCategories || []);
  const dispatch = useDispatch();

  const industries = [
    { name: "Beauty and Care" },
    { name: "Business and Finance" },
    { name: "Fashion and Style" },
    { name: "Gaming" },
  ];

  const handleNext = () => {
    if (selectedIndustries.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    dispatch(
      updateFormData({ preferredInfluencerCategories: selectedIndustries })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(14));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Influencers</h1>
        <p className="text-center text-sm mb-3">
          What type of creators would you like to collaborate with?
        </p>
        <div className="my-4">
          <MultiSelectCheckBox
            value={selectedIndustries}
            onChange={(e) => setSelectedIndustries(e.value)} 
            options={industries}
            optionLabel="name"
            placeholder="Select Industry"
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

export default InfluencerIndustry;
