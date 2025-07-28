"use client";
import React from "react";
import { useSelector } from "react-redux";
import CampaignBasics from "@/app/Components/Brand/CreateCampaign/campaign-basics";
import CampaignBrief from "@/app/Components/Brand/CreateCampaign/campaign-brief";
import CampaignPreview from "@/app/Components/Brand/CreateCampaign/campaign-preview";
import CampaignRequirements from "@/app/Components/Brand/CreateCampaign/campaign-requirements";
import AuthGuard from "@/assets/hooks/authGuard";
import { CheckCircleFilled } from "@ant-design/icons";
import { FiInfo, FiFileText, FiCheckCircle, FiEye } from "react-icons/fi";

const CreateCampaign = () => {
  const { currentStep } = useSelector((store) => store.campaign);

  const steps = [
    {
      name: "Campaign Basics",
      icon: <FiInfo className="text-xl" />,
      component: <CampaignBasics />,
    },
    {
      name: "Campaign Brief",
      icon: <FiFileText className="text-xl" />,
      component: <CampaignBrief />,
    },
    {
      name: "Campaign Requirements",
      icon: <FiCheckCircle className="text-xl" />,
      component: <CampaignRequirements />,
    },
    {
      name: "Campaign Preview",
      icon: <FiEye className="text-xl" />,
      component: <CampaignPreview />,
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Progress Stepper Card */}
          <div className="">
            {/* Steps Row */}
            <div className="flex flex-row w-full overflow-x-auto min-w-0 gap-x-6 sm:gap-x-10 items-center justify-between relative z-10">
              {steps.map((step, index) => {
                // Step states
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isUpcoming = index > currentStep;
                const isLast = index === steps.length - 1;
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center min-w-0 min-w-[110px] flex-shrink-0"
                  >
                    <div className="flex items-center space-x-2">
                      {/* Icon or Checkmark */}
                      {isLast && isActive ? (
                        <CheckCircleFilled className="text-primary text-xl" />
                      ) : isCompleted ? (
                        <span className="text-primary text-xl">
                          <CheckCircleFilled />
                        </span>
                      ) : (
                        <span
                          className={
                            isActive
                              ? "text-primary text-xl"
                              : isUpcoming
                              ? "text-gray-300 text-xl"
                              : "text-primary text-xl"
                          }
                        >
                          {step.icon}
                        </span>
                      )}
                      {/* Step Label */}
                      <span
                        className={
                          (isActive
                            ? `font-bold text-primary text-base drop-shadow-sm`
                            : isCompleted
                            ? `text-primary text-base`
                            : `text-gray-300 text-base`) +
                          " text-center w-full block"
                        }
                      >
                        {step.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Progress Bar */}
            <div className="relative mt-6 h-1 w-full min-w-0 sm:mx-0 mx-2">
              {/* Gray background */}
              <div className="absolute top-0 left-0 w-full h-1 rounded-full bg-input" />
              {/* Colored progress */}
              <div
                className="absolute top-0 left-0 h-1 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  minWidth: 0,
                }}
              />
            </div>
          </div>
          {/* Current Step Content */}
          <div className="mt-8">{steps[currentStep].component}</div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default CreateCampaign;
