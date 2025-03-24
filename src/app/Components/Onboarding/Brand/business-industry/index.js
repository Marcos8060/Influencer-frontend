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

const BusinessIndustry = () => {
  const [selectedOption,setSelectedOption] = useState("")
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const options = [
    "Beauty and Care",
    "Electronics",
    "Fashion and Apparel",
    "Sports and Fitness",
    "Pets",
    "Skincare",
    "Health & Wellness",
    "Consumer Goods",
    "Essentials",
    "Fintech",
    "Food & Beverages",
    "Travel",
    "Manufacturing",
    "Service",
  ];

  useEffect(() => {
    dispatch(setCurrentStep(3));
    setSelectedOption(formData.businessIndustry || "")
  }, [dispatch, formData.businessIndustry]);

  const handleNext = () => {
    if(!selectedOption){
      toast.error('Please select an option');
      return;
    }
    dispatch(updateFormData({ businessIndustry: selectedOption }));
    dispatch(nextStep());
  }

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 w-full mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">
          Business Industry
        </h1>
        <p className="text-center text-sm mb-3">
          Which products does your business primarily offer for sale? Please
          choose the industry that best matches your business
        </p>
        <section className="mb-2 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
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

export default BusinessIndustry;
