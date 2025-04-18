"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
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
import ProductServiceDrawer from "./ProductServiceDrawer";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";

const CampaignRequirements = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    products: campaignData.products || [],
    services: campaignData.services || [],
    exampleVideoUrl: campaignData.exampleVideoUrl || null,
    campaignPreferences: {
      videosPerCreator:
        campaignData.campaignPreferences?.videosPerCreator || null,
      videoDuration: campaignData.campaignPreferences?.videoDuration || null,
      showFace: campaignData.campaignPreferences?.showFace ?? true,
      videoFormat: campaignData.campaignPreferences?.videoFormat || "Vertical",
      videoStyle: campaignData.campaignPreferences?.videoStyle || [],
      socialChannels: campaignData.campaignPreferences?.socialChannels || [],
      collaborationType:
        campaignData.campaignPreferences?.collaborationType || [],
      campaignObjective:
        campaignData.campaignPreferences?.campaignObjective || null,
      contentLanguages:
        campaignData.campaignPreferences?.contentLanguages || "en,es,fr",
    },
  });

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  const handleNext = () => {

    if(!details.campaignPreferences.videosPerCreator || !details.campaignPreferences.videoDuration || details.campaignPreferences.socialChannels.length === 0 ||  !details.exampleVideoUrl){
      toast.error('Please provide all required fields')
      return 
    }
    // Combine existing and new product IDs, then remove duplicates using Set
    const uniqueProductIds = [
      ...new Set([...campaignData.products, ...selectedProducts]),
    ];

    const updatedData = {
      ...campaignData, // Keep existing campaign data
      ...details, // Merge with details (if any)
      products: uniqueProductIds, // Ensures no duplicate IDs
      exampleVideoUrl: details.exampleVideoUrl?.trim() || null,
      campaignPreferences: {
        ...campaignData.campaignPreferences, // Keep existing preferences
        ...details.campaignPreferences, // Merge with new preferences
      },
    };

    dispatch(updateFormData(updatedData));
    dispatch(nextStep());
  };

  const durations = [15, 30, 60];
  const requirements = ["Yes Include their face", "No, face not needed"];
  const formats = ["vertical", "horizontal", "square"];

  const toggleVideoDuration = (duration) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoDuration:
          prev.campaignPreferences.videoDuration === duration ? "" : duration,
      },
    }));
  };

  const toggleShowFace = (requirement) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        showFace: requirement === "Yes Include their face",
      },
    }));
  };

  const toggleVideoFormat = (format) => {
    setDetails((prev) => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoFormat: format,
      },
    }));
  };

  return (
    <div className="bg-background px-4 py-8 flex items-center justify-center text-color">
      <div className="md:w-8/12 w-full mx-auto space-y-4">
        {/* Product or Service Selection */}
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Product or Service</h2>
            <small>Select the product or service you are promoting</small>
          </div>
          <div className="md:flex items-center gap-4 justify-between md:space-y-0 space-y-4">
            <div className="md:w-1/2 w-full">
              {selectedProducts.length > 0 ? (
                <section className="md:flex items-center justify-between">
                  <div className="text-green flex items-center md:gap-1">
                    <div>
                      <p className="text-sm font-light ">
                        <span className="font-bold">
                          {selectedProducts?.length}
                        </span>{" "}
                        product(s) selected
                      </p>
                    </div>
                    <div>
                      <FaCheck />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-4">
                      Add another product
                    </label>
                    <ProductServiceDrawer
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                    />
                  </div>
                </section>
              ) : (
                <>
                  <label className="text-xs font-semibold mb-4">
                    Select product or service
                  </label>
                  <ProductServiceDrawer
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                </>
              )}
            </div>
            <div className="md:w-1/2 w-full">
              <label className="text-xs font-semibold mb-4">
                Videos per creator
              </label> <span className="text-red">*</span>
              <InputComponent
                type="number"
                value={details.campaignPreferences.videosPerCreator}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    campaignPreferences: {
                      ...details.campaignPreferences,
                      videosPerCreator: parseInt(e.target.value),
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
            <small>Select the duration of the video</small><span className="text-red">*</span>
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
            <small>Do you want the creator to include their face?</small><span className="text-red">*</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {requirements.map((requirement) => (
              <TickBoxComponent
                key={requirement}
                label={requirement}
                checked={
                  (requirement === "Yes Include their face" &&
                    details.campaignPreferences.showFace) ||
                  (requirement === "No, face not needed" &&
                    !details.campaignPreferences.showFace)
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
            <small>Select the format you want the videos to be filmed in</small><span className="text-red">*</span>
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
            <small>
              Add links to videos that you would like creators to use as
              inspiration
            </small><span className="text-red">*</span>
          </div>
          <InputComponent
            value={details.exampleVideoUrl}
            onChange={(e) =>
              setDetails({ ...details, exampleVideoUrl: e.target.value })
            }
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
