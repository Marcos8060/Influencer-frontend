"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { Card, Typography, InputNumber, Space } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const LeadTime = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const dispatch = useDispatch();
  const [leadTime, setLeadTime] = useState(
    influencerData.preferredLeadTimeForProjectDays || null
  );

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  const handleNext = () => {
    if (!leadTime || leadTime <= 0) {
      toast.error("Please enter a valid number of days");
      return;
    }
    dispatch(updateFormData({ preferredLeadTimeForProjectDays: leadTime }));
    dispatch(nextStep());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-[70vh] px-4"
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
              Project Lead Time
            </Title>
            <Text type="secondary">
              How long do you typically need from receiving a product to creating content?
            </Text>
          </motion.div>
        </Space>

        {/* Lead Time Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Text strong className="block mb-3">
            Days Required <Text type="danger">*</Text>
          </Text>
          <InputNumber
            min={1}
            max={365}
            value={leadTime}
            onChange={(value) => setLeadTime(value)}
            placeholder="Enter number of days"
            className="w-full"
            size="large"
          />
          <Text type="secondary" className="text-xs mt-1 block">
            Typical range: 1-30 days for most influencers
          </Text>
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
            disabled={!leadTime || leadTime <= 0}
            type={(!leadTime || leadTime <= 0) ? 'default' : 'primary'}
            className="w-full sm:w-auto"
          />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default LeadTime;