"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CampaignBasics from "@/app/Components/Brand/CreateCampaign/campaign-basics";
import CampaignBrief from "@/app/Components/Brand/CreateCampaign/campaign-brief";
import CampaignPreview from "@/app/Components/Brand/CreateCampaign/campaign-preview";
import CampaignRequirements from "@/app/Components/Brand/CreateCampaign/campaign-requirements";
import { useProtectedRoute } from "@/assets/hooks/authGuard";

const CreateCampaign = () => {
  const { currentStep } = useSelector((store) => store.campaign);
  const isAuthorized = useProtectedRoute();

  if (!isAuthorized) return null;

  const steps = [
    { name: "Basics", component: <CampaignBasics /> },
    { name: "Brief", component: <CampaignBrief /> },
    { name: "Requirements", component: <CampaignRequirements /> },
    { name: "Preview", component: <CampaignPreview /> },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Progress Bar */}
      <div className="mb-4">
        {/* Step Names */}
        <div className="hidden sm:flex justify-between mb-4">
          {steps.slice(0, -1).map((step, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${
                index <= currentStep
                  ? "text-primary font-semibold"
                  : "text-color"
              }`}
            >
              {step.name}
            </div>
          ))}
        </div>

        {/* Desktop Progress Bar */}
        <div className="hidden sm:block relative">
          <div className="absolute top-0 left-0 h-1 w-full bg-gray-200 rounded-full"></div>
          <motion.div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <div className="flex justify-between absolute top-0 left-0 w-full -mt-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-5 w-5 rounded-full border text-color border-input flex items-center justify-center ${
                  index <= currentStep
                    ? "border-primary bg-white"
                    : index === currentStep + 1
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-100"
                }`}
              >
                {index < currentStep ? (
                  <svg
                    className="h-3 w-3 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span
                    className={`text-xs font-bold ${
                      index <= currentStep ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary rounded-full h-2"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="ml-4 text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="">{steps[currentStep].component}</div>
    </div>
  );
};

export default CreateCampaign;
