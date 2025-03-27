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
import DropdownComponent from "../../SharedComponents/DropDownComponent";
import ProductServiceDrawer from "./ProductServiceDrawer";

const CampaignRequirements = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [selectedOption,setSelectedOption] = useState('')
  // State management
  const [details, setDetails] = useState({
    products: campaignData.products || [],
    services: campaignData.services || [],
    campaignPreferences: {
      videosPerCreator: campaignData.campaignPreferences?.videosPerCreator || "",
      videoDuration: campaignData.campaignPreferences?.videoDuration || "",
      showFace: campaignData.campaignPreferences?.showFace || true,
      videoFormat: campaignData.campaignPreferences?.videoFormat || "Vertical",
    },
    exampleVideoUrl: campaignData.exampleVideoUrl || "",
  });

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  const handleNext = () => {
    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  const durations = ["15s", "30s", "60s"];
  const requirements = ["Yes Include their face", "No, face not needed"];
  const formats = ["Vertical", "Horizontal", "Square"];

  // Update state for video duration
  const toggleVideoDuration = (duration) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoDuration: prev.campaignPreferences.videoDuration === duration ? "" : duration,
      },
    }));
  };

  // Update state for creator face requirement
  const toggleShowFace = (requirement) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        showFace: requirement === "Yes Include their face",
      },
    }));
  };

  // Update state for video format
  const toggleVideoFormat = (format) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoFormat: format,
      },
    }));
  };

  const options = ['product', 'service']

  console.log("I AM SELECTED ",selectedOption)

  return (
    <div className="bg-background px-4 py-8 flex items-center justify-center text-color">
      <div className="md:w-5/12 w-full mx-auto space-y-4">
        {/* Product or Service Selection */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Product or Service</h2>
            <small>Select the product or service you are promoting</small>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="w-1/2">
              <label className="text-xs font-semibold mb-4">Select product or service</label>
              <ProductServiceDrawer />
            </div>
            <div className="w-1/2">
              <label className="text-xs font-semibold mb-4">Videos per creator</label>
              <InputComponent
                type="number"
                value={details.campaignPreferences.videosPerCreator}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    campaignPreferences: {
                      ...details.campaignPreferences,
                      videosPerCreator: e.target.value,
                    },
                  })
                }
                placeholder="Videos per creator"
              />
            </div>
          </div>
        </section>

        {/* Video Duration Selection */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Video Duration</h2>
            <small>Select the duration of the video</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {durations.map((duration) => (
              <TickBoxComponent
                key={duration}
                label={duration}
                checked={details.campaignPreferences.videoDuration === duration}
                onChange={() => toggleVideoDuration(duration)}
              />
            ))}
          </div>
        </section>

        {/* Creator Face Requirement */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Creator Requirements</h2>
            <small>Do you want the creator to include their face?</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {requirements.map((requirement) => (
              <TickBoxComponent
                key={requirement}
                label={requirement}
                checked={
                  (requirement === "Yes Include their face" && details.campaignPreferences.showFace) ||
                  (requirement === "No, face not needed" && !details.campaignPreferences.showFace)
                }
                onChange={() => toggleShowFace(requirement)}
              />
            ))}
          </div>
        </section>

        {/* Video Format Selection */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Video Format</h2>
            <small>Select the format you want the videos to be filmed in</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {formats.map((format) => (
              <TickBoxComponent
                key={format}
                label={format}
                checked={details.campaignPreferences.videoFormat === format}
                onChange={() => toggleVideoFormat(format)}
              />
            ))}
          </div>
        </section>

        {/* Example Video URL */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Example Content</h2>
            <small>Add links to videos that you would like creators to use as inspiration</small>
          </div>
          <InputComponent
            value={details.exampleVideoUrl}
            onChange={(e) => setDetails({ ...details, exampleVideoUrl: e.target.value })}
            placeholder="Video URL"
          />
        </section>

        {/* Navigation Buttons */}
        <footer className="flex items-center justify-center gap-4">
          <div className="w-1/2">
            <CustomizedBackButton onClick={() => dispatch(previousStep())} />
          </div>
          <div className="w-1/2">
            <ButtonComponent onClick={handleNext} label="Preview" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CampaignRequirements;
