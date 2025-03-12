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

const CampaignGoal = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedOption, setSelectedOption] = useState(
    formData.campaignGoal || ""
  );

  const options = [
    {
      label: "Gifted",
      description:
        "A gifted collaboration involves an influencer creating and sharing content about your brand in return for receiving a gifted product, with no financial payment involved.",
    },
    {
      label: "Affiliate",
      description:
        "The influencer earns a commission for each sale they drive to your brand. This commission can either be a percentage of the sale, typically ranging from 10% to 25%, or a fixed amount agreed upon by the brand and the influencer.",
    },
    {
      label: "Paid",
      description:
        "The influencer receives a fixed fee along with a product. This arrangement often appeals to influencers with larger audiences, higher engagement rates, premium-quality content, and the option for brands to review content before it is published",
    },
  ];

  const handleSelect = (label) => {
    setSelectedOption(label); // Store only the selected label as a string
  };

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an option.");
      return;
    }

    dispatch(updateFormData({ campaignGoal: selectedOption }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(16));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Campaign Goal</h1>
        <p className="text-center text-sm mb-3">
          On Influencer platform, there are three types of collaborations with
          creators. While we will primarily focus on the options you select
          below, you will also have additional opportunities to explore and
          experiment with.
        </p>
        <div className="space-y-4">
          {options.map((option) => (
            <CustomizedTickBoxComponent
              key={option.label}
              label={option.label}
              description={option.description}
              checked={selectedOption === option.label}
              onChange={() => handleSelect(option.label)}
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default CampaignGoal;
