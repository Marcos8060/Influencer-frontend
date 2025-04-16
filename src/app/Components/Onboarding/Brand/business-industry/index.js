"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { updateFormData } from "@/redux/features/stepper";
import toast from "react-hot-toast";
import MultiSelectDropdown from "@/app/Components/SharedComponents/MultiSelectDropdown";
import CustomizedTickBoxComponent from "@/app/Components/SharedComponents/CustomizedTickBoxComponent";

const BusinessIndustry = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const options = [
    { name: "Arts, Crafts & Creativity" },
    { name: "Automotive, Transport & EVs" },
    { name: "Beauty & Personal Care" },
    { name: "Business, Finance & Career" },
    { name: "Dating, Relationships & Adult Interests" },
    { name: "Entrepreneurship & E-commerce" },
    { name: "Fashion & Apparel" },
    { name: "Fitness & Sports" },
    { name: "Food, Cooking & Dining" },
    { name: "Gaming & Esports" },
    { name: "Health & Wellness" },
    { name: "Home, Garden & DIY" },
    { name: "Luxury & High-End Lifestyle" },
    { name: "Parenting & Family" },
    { name: "Photography, Videography & Media" },
    { name: "Social Issues & Advocacy" },
    { name: "Sustainability & Eco-Friendly Living" },
    { name: "Technology & Gadgets" },
    { name: "Travel & Experiences" },
    { name: "Lifestyle & Personal Development" },
  ];

  const types = [
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
    dispatch(setCurrentStep(1));
    if (Array.isArray(formData.businessIndustry)) {
      const matched = options.filter((opt) =>
        formData.businessIndustry.includes(opt.name)
      );
      setSelectedOptions(matched);
    }
    if (formData.businessType) {
      setSelectedOption(formData.businessType);
    }
  }, [dispatch, formData.businessIndustry,formData.businessType]);

  const handleNext = () => {
    if (!selectedOptions.length) {
      toast.error("Please select at least one industry");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select a business type");
      return;
    }

    dispatch(
      updateFormData({
        businessIndustry: selectedOptions.map((opt) => opt.name),
        businessType: selectedOption
      })
    );
    dispatch(nextStep());
  };

  return (
    <section className="flex flex-col items-center justify-center h-[110vh] md:w-4/12 w-full space-y-8 mx-auto px-4 text-color">
      <div >
        <h1 className="text-2xl font-bold my-2">
          Business Classification
        </h1>
        <p className="text-sm mb-3">
          Which products does your business primarily offer for sale? Please
          choose the industries that best match your business.
        </p>
        <section className="mb-2 ">
          <MultiSelectDropdown
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            optionLabel="name"
            placeholder="Select Industries"
            className="w-full"
          />
        </section>
      </div>
      <div className="">
        <p className="text-sm mb-3">
          What type of business do you run? Do you sell products, services or
          software? Is it online or in person?
        </p>
        <section className="mb-2 space-y-2">
        {types.map((option) => (
            <CustomizedTickBoxComponent
              key={option.label}
              label={option.label}
              description={option.description}
              checked={selectedOption === option.label}
              onChange={() => setSelectedOption(option.label)}
            />
          ))}
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
