"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  previousStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { influencerOnboarding } from "@/redux/services/influencer/onboarding";
import { Card, Typography, Checkbox, Divider, Space } from "antd";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const InfluencerTerms = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error("Please agree to the terms to continue");
      return;
    }
  
    dispatch(updateFormData({ agreedToTerms: true }));
    dispatch(updateFormData({ finishedOnboarding: true }));
    setLoading(true);
  
    try {
      // Clean empty strings to null
      const cleanedData = Object.fromEntries(
        Object.entries({
          ...influencerData,
          agreedToTerms: true,
          finishedOnboarding: true,
        }).map(([key, value]) => [key, value === "" ? null : value])
      );
  
      if (auth) {
        const response = await influencerOnboarding(auth, cleanedData);
  
        if (response.status === 200) {
          toast.success("Onboarding completed successfully!");
          router.push("/onboarding/influencer/dashboard");
        } else {
          toast.error(response.errorMessage[0]);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage?.[0] || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    dispatch(setCurrentStep(5));
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-screen px-4"
    >
      <Card
        className="w-full max-w-2xl border border-input"
        bordered={false}
        bodyStyle={{ padding: 24 }}
      >
        {/* Header Section */}
        <Space
          direction="vertical"
          size="middle"
          className="w-full mb-6 text-center"
        >
          <Title level={3} className="mb-0">
            Terms of Collaboration
          </Title>
          <Text type="secondary">
            To collaborate with brands on our platform, please review and agree
            to the following terms
          </Text>
        </Space>

        {/* Terms Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-h-[60vh] overflow-y-auto pr-4"
        >
          {[
            {
              title: "1. Content Creation",
              content:
                "You agree to produce and share social media content that accurately represents the brand's products or services.",
            },
            {
              title: "2. Provided Materials",
              content:
                "The brand will supply the necessary product samples or other materials required for content creation.",
            },
            {
              title: "3. Approval Process",
              content:
                "The brand reserves the right to review and approve the content prior to its publication.",
            },
            {
              title: "4. Disclosure Compliance",
              content:
                "You agree to disclose your partnership with the brand in compliance with applicable advertising regulations.",
            },
            {
              title: "5. Usage Rights",
              content:
                "The brand retains the right to use the content you create for marketing and promotional purposes, including on social media, websites, and other online platforms. You grant the brand a perpetual, non-exclusive, royalty-free license to use the content for these purposes.",
            },
          ].map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="mb-6"
            >
              <Text strong className="block mb-2 text-base">
                {term.title}
              </Text>
              <Text className="text-gray-700">{term.content}</Text>
              {index < 4 && <Divider className="my-4" />}
            </motion.div>
          ))}
        </motion.div>

        {/* Agreement Checkbox */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-full"
          >
            <Text className="ml-2">
              I have read and agree to all the terms and conditions above
            </Text>
          </Checkbox>
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
            className="w-full sm:w-auto"
          />
          <ButtonComponent
            onClick={handleSubmit}
            label={loading ? "Submitting..." : "Agree & Continue"}
            icon={loading ? <LoadingOutlined /> : null}
            disabled={loading || !agreed}
            type={!agreed || loading ? "default" : "primary"}
            className="w-full sm:w-auto"
          />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default InfluencerTerms;
