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
import { FaCheck, FaYoutube, FaLink } from "react-icons/fa";
import { FiSmartphone, FiClock, FiUser, FiFilm } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CampaignRequirements = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    products: campaignData.products || [],
    services: campaignData.services || [],
    exampleVideoUrl: campaignData.exampleVideoUrl || "",
    campaignPreferences: {
      videosPerCreator: campaignData.campaignPreferences?.videosPerCreator || "",
      videoDuration: campaignData.campaignPreferences?.videoDuration || "",
      showFace: campaignData.campaignPreferences?.showFace ?? true,
      videoFormat: campaignData.campaignPreferences?.videoFormat || "vertical",
      videoStyle: campaignData.campaignPreferences?.videoStyle || [],
      socialChannels: campaignData.campaignPreferences?.socialChannels || [],
      collaborationType: campaignData.campaignPreferences?.collaborationType || [],
      campaignObjective: campaignData.campaignPreferences?.campaignObjective || "",
      contentLanguages: campaignData.campaignPreferences?.contentLanguages || "en,es,fr",
    },
  });

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  const handleNext = () => {
    if (!details.campaignPreferences.videosPerCreator || 
        !details.campaignPreferences.videoDuration || 
        details.campaignPreferences.socialChannels.length === 0 || 
        !details.exampleVideoUrl) {
      toast.error("Please complete all required fields");
      return;
    }

    const uniqueProductIds = [...new Set([...campaignData.products, ...selectedProducts])];

    const updatedData = {
      ...campaignData,
      ...details,
      products: uniqueProductIds,
      exampleVideoUrl: details.exampleVideoUrl?.trim() || "",
      campaignPreferences: {
        ...campaignData.campaignPreferences,
        ...details.campaignPreferences,
      },
    };

    dispatch(updateFormData(updatedData));
    dispatch(nextStep());
  };

  const durations = [
    { value: 15, label: "15 seconds" },
    { value: 30, label: "30 seconds" },
    { value: 60, label: "60 seconds" }
  ];

  const requirements = [
    { value: true, label: "Yes, include their face" },
    { value: false, label: "No, face not needed" }
  ];

  const formats = [
    { value: "vertical", label: "Vertical (9:16)", icon: <FiSmartphone className="text-lg" /> },
    { value: "horizontal", label: "Horizontal (16:9)", icon: <FiFilm className="text-lg" /> },
    { value: "square", label: "Square (1:1)", icon: <div className="w-4 h-4 border border-gray-400"></div> }
  ];

  const toggleVideoDuration = (duration) => {
    setDetails(prev => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoDuration: prev.campaignPreferences.videoDuration === duration ? "" : duration,
      },
    }));
  };

  const toggleShowFace = (requirement) => {
    setDetails(prev => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        showFace: requirement,
      },
    }));
  };

  const toggleVideoFormat = (format) => {
    setDetails(prev => ({
      ...prev,
      campaignPreferences: {
        ...prev.campaignPreferences,
        videoFormat: format,
      },
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 flex items-center justify-center text-gray-800 text-color">
      <div className="max-w-3xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Requirements</h1>
        </div>

        {/* Product or Service Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-4">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <FaCheck className="text-green-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Product or Service</h2>
              <p className="text-gray-500 text-sm">Select the product or service you're promoting</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {selectedProducts.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-600">
                      <FaCheck className="mr-2" />
                      <span className="text-sm font-medium">
                        {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                    <ProductServiceDrawer
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                      buttonLabel="Add another"
                      buttonClass="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select product or service</label>
                  <ProductServiceDrawer
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttonLabel="Select Products"
                    buttonClass="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Videos per creator <span className="text-red-500">*</span>
              </label>
              <InputComponent
                type="number"
                min="1"
                value={details.campaignPreferences.videosPerCreator}
                onChange={(e) => setDetails({
                  ...details,
                  campaignPreferences: {
                    ...details.campaignPreferences,
                    videosPerCreator: parseInt(e.target.value) || "",
                  },
                })}
                placeholder="e.g. 3"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <p className="mt-1 text-xs text-gray-500">Number of videos expected from each creator</p>
            </div>
          </div>
        </section>

        {/* Video Duration Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-4">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <FiClock className="text-blue-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Video Duration</h2>
              <p className="text-gray-500 text-sm">Select the duration of the video <span className="text-red-500">*</span></p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {durations.map((duration) => (
              <motion.div
                key={duration.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                  details.campaignPreferences.videoDuration === duration.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleVideoDuration(duration.value)}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-normal ${
                    details.campaignPreferences.videoDuration === duration.value
                      ? 'text-primary text-sm'
                      : 'text-sm'
                  }`}>
                    {duration.label}
                  </span>
                  {details.campaignPreferences.videoDuration === duration.value && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Creator Requirements Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-4">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-2 rounded-full mr-4">
              <FiUser className="text-purple-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Creator Requirements</h2>
              <p className="text-gray-500 text-sm">Do you want the creator to include their face? <span className="text-red-500">*</span></p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {requirements.map((req) => (
              <motion.div
                key={req.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                  details.campaignPreferences.showFace === req.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleShowFace(req.value)}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-normal ${
                    details.campaignPreferences.showFace === req.value
                      ? 'text-primary text-sm'
                      : 'text-sm'
                  }`}>
                    {req.label}
                  </span>
                  {details.campaignPreferences.showFace === req.value && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Video Format Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-4">
          <div className="flex items-center mb-6">
            <div className="bg-amber-100 p-2 rounded-full mr-4">
              <FiFilm className="text-amber-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Video Format</h2>
              <p className="text-gray-500 text-sm">Select the format for the videos <span className="text-red-500">*</span></p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {formats.map((format) => (
              <motion.div
                key={format.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                  details.campaignPreferences.videoFormat === format.value
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleVideoFormat(format.value)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-xl mb-2">
                    {format.icon}
                  </div>
                  <span className={`font-normal ${
                    details.campaignPreferences.videoFormat === format.value
                      ? 'text-primary text-sm'
                      : 'text-sm'
                  }`}>
                    {format.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Example Content Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-4">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <FaYoutube className="text-red-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Example Content</h2>
              <p className="text-gray-500 text-sm">Add links to videos for creator inspiration <span className="text-red-500">*</span></p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLink className="text-gray-400" />
            </div>
            <InputComponent
              value={details.exampleVideoUrl}
              onChange={(e) => setDetails({ ...details, exampleVideoUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=example"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">YouTube, TikTok, or Instagram links work best</p>
        </section>

        {/* Navigation Buttons */}
        <footer className="flex justify-between ">
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
          />
          <ButtonComponent 
            onClick={handleNext} 
            label="Continue to Preview" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            disabled={
              !details.campaignPreferences.videosPerCreator || 
              !details.campaignPreferences.videoDuration || 
              !details.exampleVideoUrl
            }
          />
        </footer>
      </div>
    </div>
  );
};

export default CampaignRequirements;