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

const BusinessType = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const options = [
    {
      label: "E-Commerce",
      description:
        "Your business sells products online and delivers across the country",
    },
    {
      label: "In Person Services",
      description: `Your business offers services or products that necessitate an in-person presence, such as
            hotels, Airbnbs, gyms, beauty salons, or large furniture items.`,
    },
    {
      label: "Digital Services",
      description:
        "Your business provides services that don't require in-person attendance, such as online yoga classes and virtual training courses",
    },
    {
      label: "Software",
      description:
        "Your business sells software e.g. photo editing tools, digital photo book",
    },
  ];

  useEffect(() => {
    dispatch(setCurrentStep(2));
    setSelectedOption(formData.businessType || "")

  }, [dispatch]);

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ businessType: selectedOption }));
    dispatch(nextStep());
  };
  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Business Type</h1>
        <p className="text-center text-sm mb-3">
          What type of business do you run? Do you sell products, services or
          software? Is it online or in person?
        </p>
        <div className="space-y-4">
          {options.map((option) => (
            <CustomizedTickBoxComponent
              key={option.label}
              label={option.label}
              description={option.description}
              checked={selectedOption === option.label}
              onChange={() => setSelectedOption(option.label)}
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default BusinessType;
