"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, nextStep, previousStep, updateFormData } from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUserFriends, FaFacebook, FaGoogle, FaBlog, FaNewspaper, FaQuestionCircle } from "react-icons/fa";

const FindAboutUs = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.stepper.formData);
  const [selectedOption, setSelectedOption] = useState(formData.platformIntroductionSource || "");

  useEffect(() => {
    dispatch(setCurrentStep(4));
  }, [dispatch]);

  const discoveryOptions = [
    { 
      label: "Someone recommended me", 
      icon: <FaUserFriends className="text-indigo-500" />,
      description: "A friend, colleague, or acquaintance told you about us"
    },
    { 
      label: "Facebook or Instagram Ads", 
      icon: <FaFacebook className="text-blue-600" />,
      description: "You saw one of our social media advertisements"
    },
    { 
      label: "Google or Bing", 
      icon: <FaGoogle className="text-blue-500" />,
      description: "You found us through a search engine"
    },
    { 
      label: "Review on a blog, website, etc", 
      icon: <FaBlog className="text-green-500" />,
      description: "You read about us on an external publication"
    },
    { 
      label: "Influencer Platform blog", 
      icon: <FaNewspaper className="text-purple-500" />,
      description: "You discovered us through our own content"
    },
    { 
      label: "Other", 
      icon: <FaQuestionCircle className="text-gray-500" />,
      description: "Another way not listed here"
    },
  ];

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select how you discovered us");
      return;
    }
    dispatch(updateFormData({ platformIntroductionSource: selectedOption }));
    dispatch(nextStep());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-input p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            How Did You Discover Us?
          </h1>
          <p className="text-gray-500">
            Your feedback helps us improve our marketing strategies
          </p>
        </div>

        {/* Discovery Options */}
        <div className="mb-8 space-y-3">
          {discoveryOptions.map((option) => (
            <motion.div
              key={option.label}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`p-2 text-sm border border-input rounded-lg cursor-pointer transition-colors ${
                selectedOption === option.label
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => setSelectedOption(option.label)}
            >
              <div className="flex items-start">
                <div className="text-lg mr-4 mt-1">
                  {option.icon}
                </div>
                <div className="flex-grow">
                  <h3 className={`font-medium ${
                    selectedOption === option.label
                      ? 'text-primary'
                      : 'text-gray-800'
                  }`}>
                    {option.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {option.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedOption === option.label
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-300'
                }`}>
                  {selectedOption === option.label && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-input">
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())} 
            className="px-6 py-3 border border-input rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          />
          <ButtonComponent 
            onClick={handleNext}
            label="Continue"
            disabled={!selectedOption}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              !selectedOption
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark'
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FindAboutUs;