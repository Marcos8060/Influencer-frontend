"use client";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData
} from "@/redux/features/stepper/influencer-stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";


const InfluencerCollaboration = () => {
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);

  const [selectedPlatforms, setSelectedPlatforms] = useState(
    influencerData.preferredCollaborationContentFormat || []
  );
  const dispatch = useDispatch();

  const platforms = [
    "Instagram Reels",
    "Instagram Stories",
    "Instagram Post",
    "Tiktok Vidoes",
    "Facebook Post",
    "Facebook Stories",
  ];

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
        preferredCollaborationContentFormat: selectedPlatforms, // Store in Redux
      })
    );
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(9));
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center h-screen md:w-4/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center my-2">Collaboration</h1>
        <p className="text-center text-sm mb-3">
          How would you like to review your products?
        </p>
        <section className="flex items-center justify-center gap-4 mb-2">
          <div className="space-y-3 w-full">
            {platforms.map((platform) => (
              <TickBoxComponent
                key={platform}
                label={platform}
                checked={selectedPlatforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
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

export default InfluencerCollaboration;
