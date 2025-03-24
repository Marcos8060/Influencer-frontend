"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import {
  nextStep,
  setCurrentStep,
  updateFormData,
} from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import TickBoxComponent from "../../SharedComponents/TickBoxComponent";

const CampaignRequirements = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    campaignData.campaignPreferences.socialChannels || []
  );
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(updateFormData({ socialChannels: selectedPlatforms }));
    dispatch(nextStep());
  };

  useEffect(() => {
    setCurrentStep(2);
  }, []);

  const durations = ["15s", "30s", "60s"];
  const requirements = ["Yes Include their face", "No, face not needed"];
  const formats = ["Vertical", "Horizontal", "Square"];

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="bg-background p-4 flex items-center justify-center text-color">
      <div className="md:w-5/12 mx-auto space-y-4">
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Product or Service</h2>
            <small>Select the product or service you promoting</small>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="w-1/2">
              <label className="text-xs font-semibold mb-4" htmlFor="">
                Select product or service
              </label>
              <InputComponent placeholder="Select a product or service" />
            </div>
            <div className="w-1/2">
              <label className="text-xs font-semibold mb-4" htmlFor="">
                Videos per creator
              </label>
              <InputComponent type="number" placeholder="Videos per creator" />
            </div>
          </div>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Video Duration</h2>
            <small>Select the duration of video you want</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {durations.map((type) => (
              <TickBoxComponent
                key={type}
                label={type}
                checked={selectedPlatforms.includes(type)}
                onChange={() => togglePlatform(type)}
              />
            ))}
          </div>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Creator Requirements</h2>
            <small>Do you want the creator to include their face?</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {requirements.map((type) => (
              <TickBoxComponent
                key={type}
                label={type}
                checked={selectedPlatforms.includes(type)}
                onChange={() => togglePlatform(type)}
              />
            ))}
          </div>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Video Format</h2>
            <small>Select the format you want the videos to be filmed in</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {formats.map((type) => (
              <TickBoxComponent
                key={type}
                label={type}
                checked={selectedPlatforms.includes(type)}
                onChange={() => togglePlatform(type)}
              />
            ))}
          </div>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Create Brief</h2>
            <small>
              What steps does the creator need to take to succesfully create the
              content?
            </small>
          </div>
          <TextAreaComponent placeholder="Type here..." />
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Example Content</h2>
            <small>
              Add links to videos that you would like creators to use as
              inspiration
            </small>
          </div>
          <InputComponent placeholder="Video url" />
        </section>
        <ButtonComponent onClick={handleNext} label="Preview" />
      </div>
    </div>
  );
};

export default CampaignRequirements;
