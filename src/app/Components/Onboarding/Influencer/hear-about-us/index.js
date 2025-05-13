"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  previousStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import TickBoxComponent from "@/app/Components/SharedComponents/TickBoxComponent";
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
    "Someone recommended me",
    "Facebook or Instagram Ads",
    "Google or Bing",
    "Review on a blog, website, etc",
    "Influencer Platform blog",
    "Other",
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
        className="w-full max-w-md border border-input"
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

        {/* Options List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          {discoveryOptions.map((option) => (
            <TickBoxComponent
              key={option}
              label={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
          ))}
        </motion.div>

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