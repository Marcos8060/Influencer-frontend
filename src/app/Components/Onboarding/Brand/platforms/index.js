"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, nextStep, previousStep, updateFormData } from "@/redux/features/stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";

const Platforms = () => {
  const dispatch = useDispatch();
  
  // Get existing selected platforms from Redux store
  const formData = useSelector((state) => state.stepper.formData);

  const [selectedPlatforms, setSelectedPlatforms] = useState(
    formData.preferredSocialMediaPlatforms || []
  );

  useEffect(() => {
    dispatch(setCurrentStep(7));
  }, [dispatch]);

  const platforms = ["Instagram", "TikTok", "Facebook", "YouTube", "Twitter"];

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleNext = () => {
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform.");
      return;
    }

    dispatch(
      updateFormData({
        preferredSocialMediaPlatforms: selectedPlatforms, // Store in Redux
      })
    );
    dispatch(nextStep());
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4 text-color">
      <div>
        <h1 className="text-3xl font-bold text-center my-2">Platforms</h1>
        <p className="text-center text-sm mb-3">
          We can connect you with influencers on these platforms, allowing you
          to collaborate on one, multiple, or all of them.
        </p>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <TickBoxComponent
              key={platform}
              label={platform}
              checked={selectedPlatforms.includes(platform)}
              onChange={() => togglePlatform(platform)}
            />
          ))}
          <ButtonComponent onClick={handleNext} label="Next" />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </div>
      </div>
    </section>
  );
};

export default Platforms;
