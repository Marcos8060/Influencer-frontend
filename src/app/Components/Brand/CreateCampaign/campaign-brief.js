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
import { FiFileText, FiShare2, FiFilm } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa";

const CampaignBrief = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();

  // State to manage form inputs
  const [details, setDetails] = useState({
    briefTitle: campaignData.briefTitle || "",
    briefDescription: campaignData.briefDescription || "",
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
      toast.error("Please complete all required fields");
      return;
    }

    const updatedData = {
      ...campaignData,
      briefTitle: details.briefTitle.trim(),
      briefDescription: details.briefDescription.trim(),
      campaignPreferences: {
        ...campaignData.campaignPreferences,
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
    { name: "Instagram Posts", icon: <FaInstagram className="text-pink-600" /> },
    { name: "Tiktok Posts", icon: <FaTiktok className="text-black" /> },
    { name: "Facebook Posts", icon: <FaFacebook className="text-blue-600" /> },
    { name: "X Posts", icon: <FaTwitter className="text-blue-400" /> },
  ];

  const videoType = [
    { name: "Up to the creator", icon: "🎨" },
    { name: "Testimonials", icon: "🗣️" },
    { name: "Unboxing", icon: "📦" },
    { name: "How To", icon: "🛠️" },
  ];

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

  const descriptionLength = details.briefDescription.length || 0;

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 flex items-center justify-center text-color">
      <div className="max-w-3xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Brief</h1>
        </div>

        {/* Campaign Brief Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <FiFileText className="text-blue-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Campaign Brief</h2>
              <p className="text-gray-500 text-sm">Describe your campaign goals and requirements</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Title <span className="text-red-500">*</span>
              </label>
              <InputComponent
                value={details.briefTitle}
                onChange={(e) => setDetails({ ...details, briefTitle: e.target.value })}
                placeholder="E.g. Summer Product Launch Campaign"
                className="w-full px-4 py-2 text-sm border border-input rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <p className="mt-1 text-xs text-gray-500">Keep it clear and concise</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description <span className="text-red-500">*</span>
              </label>
              <TextAreaComponent
                value={details.briefDescription}
                onChange={(e) => setDetails({ ...details, briefDescription: e.target.value })}
                placeholder="What are you looking to receive from content creators/influencers. Be as detailed as possible...."
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
              />
              {details.briefDescription && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      descriptionLength < 30 ? "bg-red" :
                      descriptionLength < 60 ? "bg-yellow" : "bg-green"
                    }`}
                    style={{ width: `${Math.min(descriptionLength, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {descriptionLength < 30 ? "Too brief" :
                   descriptionLength < 60 ? "Good start" : "Excellent description"}
                </p>
              </div>
            )}
              <p className="mt-1 text-xs text-gray-500">Be as detailed as possible to guide creators</p>
            </div>
          </div>
        </section>

        {/* Social Channels Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-2 rounded-full mr-4">
              <FiShare2 className="text-purple-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Social Channels</h2>
              <p className="text-gray-500 text-sm">Where should creators post this content?</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-2 text-sm border border-input rounded-lg cursor-pointer transition-colors ${
                    details.campaignPreferences.socialChannels.includes(platform.name)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => togglePlatform(platform.name)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {platform.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className={`font-medium ${
                        details.campaignPreferences.socialChannels.includes(platform.name)
                          ? 'text-primary'
                          : 'text-gray-800'
                      }`}>
                        {platform.name}
                      </h3>
                    </div>
                    <div className={`w-5 h-5 rounded border border-input flex items-center justify-center ${
                      details.campaignPreferences.socialChannels.includes(platform.name)
                        ? 'bg-primary border-primary'
                        : 'bg-white border-input'
                    }`}>
                      {details.campaignPreferences.socialChannels.includes(platform.name) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Selected Platforms */}
          {details.campaignPreferences.socialChannels.length > 0 && (
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Selected Platforms ({details.campaignPreferences.socialChannels.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.campaignPreferences.socialChannels.map(platform => {
                  const platformInfo = platforms.find(p => p.name === platform);
                  return (
                    <div 
                      key={platform} 
                      className="flex items-center bg-primary/10 px-3 py-1 rounded-full"
                    >
                      <span className="text-primary font-medium text-xs">{platform}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlatform(platform);
                        }}
                        className="ml-2 text-primary/70 hover:text-primary"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Video Style Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-6">
          <div className="flex items-center mb-6">
            <div className="bg-amber-100 p-2 rounded-full mr-4">
              <FiFilm className="text-amber-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Video Style</h2>
              <p className="text-gray-500 text-sm">What type of content are you looking for?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videoType.map((type) => (
              <div 
                key={type.name}
                onClick={() => toggleVideoStyle(type.name)}
                className={`p-2 text-sm border border-input rounded-lg cursor-pointer transition-all ${
                  details.campaignPreferences.videoStyle.includes(type.name)
                    ? "border-primary bg-primary/10"
                    : "border-input hover:border-primary hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{type.icon}</span>
                  <span className="font-medium text-gray-800">{type.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Buttons */}
        <footer className="flex justify-between">
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())}
            className="px-6 py-3 border border-input text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
          />
          <ButtonComponent 
            onClick={handleNext} 
            label="Continue" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            disabled={
              !details.briefTitle || 
              !details.briefDescription || 
              details.campaignPreferences.socialChannels.length === 0 || 
              details.campaignPreferences.videoStyle.length === 0
            }
          />
        </footer>
      </div>
    </div>
  );
};

export default CampaignBrief;