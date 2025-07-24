"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, nextStep, previousStep, updateFormData } from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import toast from "react-hot-toast";
import { Select } from "antd";
import { motion } from "framer-motion";
import { contentCategories } from "@/assets/utils/categories";
import { industries } from "@/assets/utils/categories";

const BusinessIndustry = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();

  const businessTypes = [
    {
      label: "E-Commerce",
      description: "Your business sells products online and delivers across the country",
      icon: "🛒"
    },
    {
      label: "In Person Services",
      description: "Your business offers services or products that necessitate an in-person presence",
      icon: "🏢"
    },
    {
      label: "Digital Services",
      description: "Your business provides services that don't require in-person attendance",
      icon: "💻"
    },
    {
      label: "Software",
      description: "Your business sells software e.g. photo editing tools, digital photo book",
      icon: "📊"
    },
  ];

  useEffect(() => {
    dispatch(setCurrentStep(1));
    if (Array.isArray(formData.businessIndustry)) {
      const matched = industries.filter((opt) =>
        formData.businessIndustry.includes(opt.name)
      );
      setSelectedOptions(matched);
    }
    if (formData.businessType) {
      setSelectedOption(formData.businessType);
    }
  }, [dispatch, formData.businessIndustry, formData.businessType]);

  const handleNext = () => {
    if (!selectedOptions.length) {
      toast.error("Please select at least one industry");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select a business type");
      return;
    }

    dispatch(
      updateFormData({
        businessIndustry: selectedOptions.map((opt) => opt.name),
        businessType: selectedOption
      })
    );
    dispatch(nextStep());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-xl border border-input p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Business Classification
          </h1>
          <p className="text-gray-500">
            Help us understand your business better by selecting relevant industries and type
          </p>
        </div>

        {/* Industries Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Which industries match your business?
          </h2>
         <Select
           mode="multiple"
           allowClear
           showSearch
           placeholder="Search and select industries..."
           value={selectedOptions.map(opt => opt.name)}
           onChange={values => {
             setSelectedOptions(
               industries.filter(opt => values.includes(opt.name))
             );
           }}
           className="w-full"
           optionLabelProp="label"
           maxTagCount={4}
           filterOption={(input, option) =>
             option.children.toLowerCase().includes(input.toLowerCase())
           }
         >
           {industries.map((industry) => (
             <Select.Option key={industry.name} value={industry.name} label={industry.name}>
               <span className="mr-2 text-lg">{industry.icon}</span>
               {industry.name}
             </Select.Option>
           ))}
         </Select>
        </div>

        {/* Business Type Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            What type of business do you run?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessTypes.map((type) => (
              <motion.div
                key={type.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border border-input rounded-lg cursor-pointer transition-colors ${
                  selectedOption === type.label
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => setSelectedOption(type.label)}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${
                    selectedOption === type.label 
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="text-xl">{type.icon}</span>
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      selectedOption === type.label 
                        ? 'text-primary'
                        : 'text-gray-800'
                    }`}>
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium rounded-lg shadow-sm"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessIndustry;