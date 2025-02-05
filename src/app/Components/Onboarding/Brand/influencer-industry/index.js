"use client";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import MultiSelectCheckBox from "@/app/Components/SharedComponents/MultiSelectCheckBox";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";


const InfluencerIndustry = () => {
    const [selectedIndustries,setSelectedIndustries] = useState([]);
  const dispatch = useDispatch();

  const industries = [
    { name: "Beauty and Care" },
    { name: "Business and Finance" },
    { name: "Fashion and Style" },
    { name: "Gaming" },
  ];

  useEffect(() => {
    dispatch(setCurrentStep(14));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen w-4/12 mx-auto">
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
          <ButtonComponent onClick={() => dispatch(nextStep())} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default InfluencerIndustry;
