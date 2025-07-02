"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, nextStep, previousStep, updateFormData } from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Platforms = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.stepper.formData);
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    formData.preferredSocialMediaPlatforms || []
  );

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  const platforms = [
    { name: "Instagram", icon: <FaInstagram className="text-pink-600" /> },
    { name: "TikTok", icon: <FaTiktok className="text-black" /> },
    { name: "Facebook", icon: <FaFacebook className="text-blue-600" /> },
    { name: "YouTube", icon: <FaYoutube className="text-red" /> },
    { name: "X(Twitter)", icon: <FaXTwitter className="text-blue-400" /> },
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
      toast.error("Please select at least one platform");
      return;
    }

    dispatch(
      updateFormData({
        preferredSocialMediaPlatforms: selectedPlatforms,
      })
    );
    dispatch(nextStep());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-input p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Social Media Platforms
          </h1>
          <p className="text-gray-500">
            Select platforms where you want to collaborate with influencers
          </p>
        </div>

        {/* Platform Selection */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-2 text-sm border border-input rounded-lg cursor-pointer transition-colors ${
                  selectedPlatforms.includes(platform.name)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => togglePlatform(platform.name)}
              >
                <div className="flex items-center">
                  <div className="text-xl mr-3">
                    {platform.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-medium ${
                      selectedPlatforms.includes(platform.name)
                        ? 'text-primary'
                        : 'text-gray-800'
                    }`}>
                      {platform.name}
                    </h3>
                  </div>
                  <div className={`w-5 h-5 rounded border border-input flex items-center justify-center ${
                    selectedPlatforms.includes(platform.name)
                      ? 'bg-primary border-primary'
                      : 'bg-white border-gray-300'
                  }`}>
                    {selectedPlatforms.includes(platform.name) && (
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
        {selectedPlatforms.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Platforms ({selectedPlatforms.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.map(platform => {
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

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-input">
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())} 
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          />
          <ButtonComponent 
            onClick={handleNext}
            label="Continue"
            disabled={selectedPlatforms.length === 0}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              selectedPlatforms.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark'
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Platforms;