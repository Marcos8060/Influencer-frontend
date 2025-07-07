"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  previousStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import { FaUserFriends, FaFacebook, FaGoogle, FaBlog, FaNewspaper, FaQuestionCircle } from "react-icons/fa";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { Card, Typography, Space } from "antd";
import { motion } from "framer-motion";
import { CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const FindAboutUs = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );

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
      toast.error("Please select an option");
      return;
    }
    dispatch(updateFormData({ platformIntroductionSource: selectedOption }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(4));
    setSelectedOption(influencerData.platformIntroductionSource || "");
  }, [influencerData.platformIntroductionSource]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-[80vh] px-4"
    >
      <Card
        className="w-full max-w-xl border border-input"
        bordered={false}
        bodyStyle={{ padding: 24 }}
      >
        {/* Header Section */}
        <Space direction="vertical" size="middle" className="w-full mb-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Title level={3} className="mb-0">
              How Did You Find Us?
            </Title>
            <Text type="secondary">
              Your answer helps us improve our marketing strategies
            </Text>
          </motion.div>
        </Space>

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

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between gap-3 pt-4"
        >
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())}
            className="w-full sm:w-auto"
          />
          <ButtonComponent
            onClick={handleNext}
            label="Continue"
            disabled={!selectedOption}
            type={!selectedOption ? 'default' : 'primary'}
            className="w-full sm:w-auto"
          />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default FindAboutUs;