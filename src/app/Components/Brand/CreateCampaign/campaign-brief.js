"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import {
  nextStep,
  previousStep,
  setCurrentStep,
  updateFormData,
} from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import TickBoxComponent from "../../SharedComponents/TickBoxComponent";
import CustomizedBackButton from "../../SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";

const CampaignBrief = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();

  // State to manage form inputs
  const [details, setDetails] = useState({
    briefTitle: campaignData.briefTitle || null,
    briefDescription: campaignData.briefDescription || null,
    campaignPreferences: {
      socialChannels: campaignData.campaignPreferences?.socialChannels || [],
      videoStyle: campaignData.campaignPreferences?.videoStyle || [],
    },
  });

  const handleNext = () => {

    if (
      !details.briefTitle ||
      !details.briefDescription ||
      details.campaignPreferences.socialChannels.length === 0 ||
      details.campaignPreferences.videoStyle.length === 0
    ) {
      toast.error("Please fill out all required fields");
      return;
    }

    const updatedData = {
      ...campaignData,
      briefTitle: details.briefTitle,
      briefDescription: details.briefDescription,
      campaignPreferences: {
        ...campaignData.campaignPreferences, // Preserve existing values
        socialChannels: details.campaignPreferences.socialChannels,
        videoStyle: details.campaignPreferences.videoStyle,
      },
    };

    dispatch(updateFormData(updatedData));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const platforms = [
    "Instagram Posts",
    "Tiktok Posts",
    "Facebook Posts",
    "X Posts",
  ];

  const videoType = ["Up to the creator", "Testimonials", "Unboxing", "How To"];

  // Toggle function for social platforms
  const togglePlatform = (platform) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        socialChannels: prev.campaignPreferences.socialChannels.includes(platform)
          ? prev.campaignPreferences.socialChannels.filter((p) => p !== platform)
          : [...prev.campaignPreferences.socialChannels, platform],
      },
    }));
  };

  // Toggle function for video types
  const toggleVideoStyle = (type) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoStyle: prev.campaignPreferences.videoStyle.includes(type)
          ? prev.campaignPreferences.videoStyle.filter((t) => t !== type)
          : [...prev.campaignPreferences.videoStyle, type],
      },
    }));
  };

  return (
    <div className="bg-background px-4 py-8 flex items-center justify-center text-color">
      <div className="md:w-8/12 w-full mx-auto space-y-4">
        {/* Campaign Brief */}
        <section className="bg-white rounded shadow p-4">
          <h2 className="mb-4 font-bold">Campaign Brief</h2>
          <section className="space-y-2">
            <div>
              <label className="text-xs font-semibold mb-4">Give your Brief a title</label><span className="text-red">*</span>
              <InputComponent
                value={details.briefTitle}
                onChange={(e) =>
                  setDetails({ ...details, briefTitle: e.target.value })
                }
                placeholder="E.g New Product Launch..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-4">Brief Description</label><span className="text-red">*</span>
              <TextAreaComponent
                value={details.briefDescription}
                onChange={(e) =>
                  setDetails({ ...details, briefDescription: e.target.value })
                }
                placeholder="Type here..."
              />
            </div>
          </section>
        </section>

        {/* Select Social Channel */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Select a Social Channel</h2>
            <small>On which social channel(s) should the creator post?</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {platforms.map((platform) => (
              <TickBoxComponent
                key={platform}
                label={platform}
                checked={details.campaignPreferences.socialChannels.includes(platform)}
                onChange={() => togglePlatform(platform)}
              />
            ))}
          </div>
        </section>

        {/* Select Video Type */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">What type of video?</h2>
            <small>Choose the style of video you want</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {videoType.map((type) => (
              <TickBoxComponent
                key={type}
                label={type}
                checked={details.campaignPreferences.videoStyle.includes(type)}
                onChange={() => toggleVideoStyle(type)}
              />
            ))}
          </div>
        </section>

        {/* Navigation Buttons */}
        <footer className="flex items-center justify-center gap-4">
          <div className="w-1/2">
            <CustomizedBackButton onClick={() => dispatch(previousStep())} />
          </div>
          <div className="w-1/2">
            <ButtonComponent onClick={handleNext} label="Next" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CampaignBrief;
