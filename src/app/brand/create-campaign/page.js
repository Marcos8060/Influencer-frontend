"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CampaignBasics from "@/app/Components/Brand/CreateCampaign/campaign-basics";
import CampaignBrief from "@/app/Components/Brand/CreateCampaign/campaign-brief";
import CampaignPreview from "@/app/Components/Brand/CreateCampaign/campaign-preview";
import CampaignRequirements from "@/app/Components/Brand/CreateCampaign/campaign-requirements";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import {
  EditOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  EyeOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const CreateCampaign = () => {
  const { currentStep } = useSelector((store) => store.campaign);
  const isAuthorized = useProtectedRoute();

  if (!isAuthorized) return null;

  const steps = [
    { name: "Basics", icon: <EditOutlined />, component: <CampaignBasics /> },
    { name: "Brief", icon: <FileTextOutlined />, component: <CampaignBrief /> },
    { name: "Requirements", icon: <CheckSquareOutlined />, component: <CampaignRequirements  /> },
    { name: "Preview", icon: <EyeOutlined />, component: <CampaignPreview /> },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Progress Bar */}
      <div className="mb-4">
        {/* Stepper */}
        <div className="hidden sm:flex flex-col items-center mb-4">
          <div className="flex w-full items-center justify-between relative">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-300
                      ${index < currentStep
                        ? "bg-primary text-white border-primary"
                        : index === currentStep
                        ? "border-4 border-gray-400 bg-white text-primary shadow-lg"
                        : "bg-gray-200 text-gray-400 border-gray-200"}
                      border-4 w-10 h-10 text-xl relative z-10`}
                  >
                    {index < currentStep ? (
                      <CheckCircleFilled className="text-white text-2xl" />
                    ) : index === currentStep ? (
                      step.icon
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm text-center ${
                      index === currentStep
                        ? "font-bold text-primary"
                        : index < currentStep
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-all duration-300 rounded-full
                      ${index < currentStep
                        ? "bg-primary"
                        : "bg-gray-300"}
                    `}
                    style={{ minWidth: 0, marginLeft: "-20px", marginRight: "-20px" }}
                  />
                )}
              </React.Fragment>
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
