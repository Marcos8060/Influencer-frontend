"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import { Select } from "antd";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { Card, Typography, Space, Tag } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const PreferredCompanies = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const [selectedCompanies, setSelectedCompanies] = useState(
    influencerData.preferredCompaniesType || []
  );
  const dispatch = useDispatch();

  const companyTypes = [
    "E-Commerce",
    "In Person services",
    "Market Place",
    "Digital Services",
    "Other",
  ];

  const handleNext = () => {
    if (selectedCompanies.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    dispatch(updateFormData({ preferredCompaniesType: selectedCompanies }));
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center h-[70vh] px-4"
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
              Preferred Companies
            </Title>
            <Text type="secondary">
              What type of companies do you prefer to work with?
            </Text>
          </motion.div>
        </Space>

        {/* Company Type Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Text strong className="block mb-3">
            Company Types <Text type="danger">*</Text>
          </Text>
         <Select
           mode="multiple"
           allowClear
           showSearch
           placeholder="Select company types..."
           value={selectedCompanies}
           onChange={setSelectedCompanies}
           className="w-full"
           optionFilterProp="children"
           maxTagCount={3}
           filterOption={(input, option) =>
             option.children.toLowerCase().includes(input.toLowerCase())
           }
         >
           {companyTypes.map((type) => (
             <Select.Option key={type} value={type}>
               {type}
             </Select.Option>
           ))}
         </Select>
        </motion.div>

        {/* Selected Companies Preview */}
        {selectedCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6"
          >
            <Text strong className="block mb-2">
              Your Selections ({selectedCompanies.length})
            </Text>
            <Space size={[4, 8]} wrap>
              {selectedCompanies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <Tag color="blue" className="m-0">
                    {company}
                  </Tag>
                </motion.div>
              ))}
            </Space>
          </motion.div>
        )}

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
            disabled={selectedCompanies.length === 0}
            type={selectedCompanies.length === 0 ? 'default' : 'primary'}
            className="w-full sm:w-auto"
          />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default PreferredCompanies;