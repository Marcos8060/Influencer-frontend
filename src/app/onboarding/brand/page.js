"use client";
import BrandDetails from "@/app/Components/Onboarding/Brand/brand-details";
import BusinessIndustry from "@/app/Components/Onboarding/Brand/business-industry";
import Countries from "@/app/Components/Onboarding/Brand/countries";
import FindAboutUs from "@/app/Components/Onboarding/Brand/hear-about-us";
import Platforms from "@/app/Components/Onboarding/Brand/platforms";
import SocialConnectStep from "@/app/Components/Onboarding/Brand/social-connections";
import Terms from "@/app/Components/Onboarding/Brand/terms";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiInfo, FiFileText, FiCheckCircle, FiEye } from "react-icons/fi";
import { CheckCircleFilled } from "@ant-design/icons";
import { InstagramOutlined } from "@ant-design/icons";

const BrandOnboarding = () => {
  const { currentStep } = useSelector((store) => store.stepper);
  const totalSteps = 5; // Total number of steps (0-5)

  const steps = [
    {
      name: "Brand Details",
      icon: <FiInfo className="text-xl" />,
      component: <BrandDetails />,
    },
    {
      name: "Industry",
      icon: <FiFileText className="text-xl" />,
      component: <BusinessIndustry />,
    },
    {
      name: "Countries",
      icon: <FiCheckCircle className="text-xl" />,
      component: <Countries />,
    },
    {
      name: "Platforms",
      icon: <FiEye className="text-xl" />,
      component: <Platforms />,
    },
    {
      name: "Social Connect",
      icon: <InstagramOutlined className="text-xl" />,
      component: <SocialConnectStep />,
    },
    {
      name: "About Us",
      icon: <FiFileText className="text-xl" />,
      component: <FindAboutUs />,
    },
    {
      name: "Terms",
      icon: <FiCheckCircle className="text-xl" />,
      component: <Terms />,
    },
  ];

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Progress Stepper Card */}
        <div className="mb-10 rounded-lg shadow-sm bg-white/80 backdrop-blur-md border border-primary/10 p-8">
          {/* Steps Row */}
          <div
            className="hidden sm:flex flex-row w-full overflow-x-auto min-w-0 gap-x-6 sm:gap-x-10 items-center justify-between relative z-10 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, index) => {
              // Step states
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              const isUpcoming = index > currentStep;
              const isLast = index === steps.length - 1;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center min-w-0 flex-shrink-0"
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
          {/* Mobile Progress */}
          <div className="sm:hidden flex items-center mt-4">
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
        <div className="mt-8">{steps[currentStep].component}</div>
      </div>
    </div>
  );
};

export default BrandOnboarding;
