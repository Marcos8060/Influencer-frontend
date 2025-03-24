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

const CampaignBrief = () => {
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
    setCurrentStep(1);
  }, []);

  const platforms = [
    "Instagram Posts",
    "Tiktok Posts",
    "Facebook Posts",
    "X Posts",
  ];

  const videoType = ["Up to the creator", "Testimonials", "Unboxing", "How To"];

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
          <h2 className="mb-4 font-bold">Campaign Brief</h2>
          <section className="space-y-2">
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">
                Give your Brief a title
              </label>
              <InputComponent
                // value={details.title}
                // onChange={(e) =>
                //   setDetails({
                //     ...details,
                //     title: e.target.value,
                //   })
                // }
                placeholder="E.g New Product Launch..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">
                Brief Description
              </label>
              <TextAreaComponent
                // value={details.description}
                // onChange={(e) =>
                //   setDetails({
                //     ...details,
                //     description: e.target.value,
                //   })
                // }
                placeholder="Type here..."
              />
            </div>
          </section>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Select a Social Channel</h2>
            <small>on which social channel(s) should the creator post</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
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
                checked={selectedPlatforms.includes(type)}
                onChange={() => togglePlatform(type)}
              />
            ))}
          </div>
        </section>
        <ButtonComponent onClick={handleNext} label="Next" />
      </div>
    </div>
  );
};

export default CampaignBrief;
