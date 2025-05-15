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
import { Checkbox, Divider } from "antd";

const Topics = () => {
  const influencerData = useSelector((store) => store.influencerStepper.influencerData);
  const [influencerTopics, setTopics] = useState(influencerData.influencerTopics || []);
  const [categories, setCategories] = useState(influencerData.contentCategories || []);
  const dispatch = useDispatch();

  const contentCategories = [
    "Adult & 18+",
    "Apparel & Fashion",
    "Arts & Culture",
    "Beauty & Skincare",
    "Business & Finance",
    "Crypto & Web3",
    "Dating & Relationships",
    "Education & Learning",
    "E-commerce & Startups",
    "Entertainment & Pop Culture",
    "Fitness & Sports",
    "Food & Drink",
    "Gaming & Esports",
    "Health & Wellness",
    "Home & Lifestyle",
    "Lifestyle & Self-Development",
    "Luxury & Aspirational Living",
    "Men's Interests",
    "Music & Audio",
    "Other / Miscellaneous",
    "Parenting & Family",
    "Pets & Animals",
    "Photography & Visual Media",
    "Politics & Society",
    "Spirituality & Mindfulness",
    "Sustainability & Green Living",
    "Tech & Gadgets",
    "Toys, Crafts & Hobbies",
    "Travel & Leisure",
    "Vegan & Plant-Based",
    "Women's Interests"
  ];

  const handleNext = () => {
    if (influencerTopics.length === 0 && categories.length === 0) {
      toast.error("Please add at least one topic or select one category");
      return;
    }
    
    dispatch(updateFormData({ 
      influencerTopics,
      contentCategories: categories 
    }));
    dispatch(nextStep());
  };

  const handleCategoryChange = (category) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-[70vh] mt-4 px-4 text-color"
    >
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-input p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Your Content Focus
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm"
          >
            Help brands understand your content by adding influencerTopics and selecting categories
          </motion.p>
        </div>

        {/* Topics Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specific Topics
          </label>
          <MultiInputComponent
            value={influencerTopics}
            onChange={setTopics}
            placeholder="e.g. Sustainable fashion, VR gaming, Keto recipes..."
            className="w-full border border-input text-xs rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <p className="mt-1 text-xs text-gray-500">
            Press Enter or comma to add specific Topics. These help brands find exact matches.
          </p>
          
          {influencerTopics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <div className="flex flex-wrap gap-2">
                {influencerTopics.map((topic, index) => (
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
        </motion.div>

        <Divider className="my-6" />

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Content Categories
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {contentCategories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <Checkbox
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-full"
                >
                  <span className="text-sm">{category}</span>
                </Checkbox>
              </motion.div>
            ))}
          </div>
          
          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Selected Categories ({categories.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.span
                    key={category}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
                  >
                    {category}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between gap-3 pt-4"
        >
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())}
            className="w-full sm:w-auto px-4 py-2 border border-input rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          />
          <ButtonComponent
            onClick={handleNext}
            label="Continue"
            disabled={influencerTopics.length === 0 && categories.length === 0}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg shadow-sm ${
              influencerTopics.length === 0 && categories.length === 0
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