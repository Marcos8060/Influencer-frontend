"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData
} from "@/redux/features/stepper/influencer-stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import MultiInputComponent from "@/app/Components/SharedComponents/MultiInputComponent";
import { motion } from "framer-motion";

const Topics = () => {
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);
  const [selectedTopics, setSelectedTopics] = useState(
    influencerData.influencerTopics || []
  );
  const dispatch = useDispatch();

  const handleNext = () => {
    if (selectedTopics.length === 0) {
      toast.error("Please enter at least one topic");
      return;
    }
    dispatch(updateFormData({ influencerTopics: selectedTopics }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center h-[70vh] px-4 text-color"
    >
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-input p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Your Content Topics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm"
          >
            Add keywords that best represent your content niche and expertise.
          </motion.p>
        </div>

        {/* Topics Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics <span className="text-red-500">*</span>
          </label>
          <MultiInputComponent
            value={selectedTopics}
            onChange={setSelectedTopics}
            placeholder="e.g. Fashion, Travel, Tech..."
            className="w-full border border-input text-xs rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <p className="mt-1 text-xs text-gray-500">
            Press Enter or comma to add topics. Minimum 1 required.
          </p>
        </motion.div>

        {/* Selected Topics Preview */}
        {selectedTopics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Your Topics ({selectedTopics.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map((topic, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between gap-3 pt-4"
        >
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())}
            className="w-full sm:w-auto px-4 py-2 border border-input rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          />
          <ButtonComponent
            onClick={handleNext}
            label="Continue"
            disabled={selectedTopics.length === 0}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg shadow-sm ${
              selectedTopics.length === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white'
            }`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Topics;