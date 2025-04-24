"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, previousStep, updateFormData } from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHandshake } from "react-icons/fa";
import { brandOnboarding } from "@/redux/services/auth/brand/onboarding";

const Terms = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error("Please agree to the terms to continue");
      return;
    }

    dispatch(updateFormData({ agreedToTerms: true, finishedOnboarding: true }));
    setLoading(true);
    
    try {
      const updatedFormData = { 
        ...formData, 
        agreedToTerms: true,
        finishedOnboarding: true 
      };
      const response = await brandOnboarding(auth, updatedFormData);
      
      if (response.status === 200) {
        toast.success("Onboarding completed successfully!");
        router.push('/onboarding/brand/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "An error occurred during onboarding");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(5));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const terms = [
    {
      title: "Content Creation",
      description: "You agree to produce and share social media content that accurately represents the brand's products or services."
    },
    {
      title: "Provided Materials",
      description: "The brand will supply the necessary product samples or other materials required for content creation."
    },
    {
      title: "Approval Process",
      description: "The brand reserves the right to review and approve the content prior to its publication."
    },
    {
      title: "Disclosure Compliance",
      description: "You agree to disclose your partnership with the brand in compliance with applicable advertising regulations."
    },
    {
      title: "Usage Rights",
      description: "The brand retains the right to use the content you create for marketing and promotional purposes, including on social media, websites, and other online platforms. You grant the brand a perpetual, non-exclusive, royalty-free license to use the content for these purposes."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-input p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <FaHandshake className="text-indigo-600 text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Collaboration Agreement
          </h1>
          <p className="text-gray-500">
            To collaborate with brands on our platform, please review and agree to the following terms
          </p>
        </div>

        {/* Terms List */}
        <div className="mb-8 space-y-6">
          {terms.map((term, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 mt-1 mr-4 text-green-500">
                <FaCheckCircle />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{term.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{term.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agreement Checkbox */}
        <div className="mb-8 flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agree-terms" className="font-medium text-gray-700 cursor-pointer">
              I agree to these terms and conditions
            </label>
            <p className="text-gray-500 mt-1">
              You must read and accept the terms to continue with brand collaborations
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className={`flex justify-between pt-6 border-t border-input transition-all duration-300 ${
          isScrolled ? 'fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-10' : ''
        }`}>
          <CustomizedBackButton 
            onClick={() => dispatch(previousStep())}
            className="px-6 py-3 border border-input rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          />
          <ButtonComponent 
            onClick={handleSubmit}
            label={loading ? "Finalizing..." : "Agree & Continue"}
            disabled={loading || !agreed}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              loading || !agreed
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;