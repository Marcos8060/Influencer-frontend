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
import { format } from 'date-fns';

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
  const today = format(new Date(), 'MMMM d, yyyy');

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
    dispatch(setCurrentStep(6));
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
            Grace Belgravia Influencer Platform<br />
            Influencer Terms and Conditions
          </Title>
          <Text type="secondary">
            Effective Date: {today}<br />
            Governing Law: England and Wales<br />
            Company: LOXA HOLDINGS LTD<br />
            Registered Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ<br />
            Correspondence Address: Office 7, Siddeley House, 50 Canbury Park Rd, Kingston upon Thames, KT2 6LX<br />
            Website: <a href="https://gracebelgravia.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://gracebelgravia.com/</a><br />
            Email: <a href="mailto:info@gracebelgravia.com" className="text-primary underline">info@gracebelgravia.com</a>
          </Text>
        </Space>
        <Divider />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-h-[60vh] overflow-y-auto pr-4"
        >
          {[
            {
              title: "1. Introduction",
              content: `These Terms and Conditions (\"Terms\") govern your use of the Grace Belgravia influencer platform as an Influencer (\"you\", \"your\"). By registering an account and using the services provided by LOXA HOLDINGS LTD (\"we\", \"us\", \"our\"), you agree to be bound by these Terms. If you do not agree, you may not use the platform.`
            },
            {
              title: "2. Eligibility and Registration",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>You must be at least 18 years old and capable of entering into legally binding agreements.</li>
                  <li>You agree to provide accurate, complete, and up-to-date information upon registration.</li>
                  <li>You may only create one account per person. Duplicate, impersonated or fraudulent accounts are strictly prohibited.</li>
                  <li>We reserve the right to verify your identity and refuse or terminate access at our sole discretion.</li>
                </ul>
              )
            },
            {
              title: "3. Use of the Platform",
              content: (
                <>
                  <div className="mb-1">You may use the platform to:</div>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Connect your social media profiles</li>
                    <li>Apply for live brand campaigns</li>
                    <li>Communicate with brands via direct messaging</li>
                    <li>Submit campaign content by tagging posts or uploading proof</li>
                    <li>Track campaign status and history</li>
                  </ul>
                  <div className="mt-2 mb-1">You agree not to:</div>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Misrepresent your identity, audience, or engagement</li>
                    <li>Use fake followers, engagement pods, or bots</li>
                    <li>Engage in harassment, spam, or deceptive behaviour</li>
                    <li>Circumvent the platform for off-platform transactions</li>
                  </ul>
                </>
              )
            },
            {
              title: "4. Campaign Participation",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>Campaign participation is voluntary. Once accepted, you must meet all agreed requirements, including content format, deadline, and usage rights.</li>
                  <li>You must disclose sponsored content in compliance with ASA and applicable advertising regulations.</li>
                  <li>You may only use gifted products for content creation if this has been explicitly agreed.</li>
                  <li>You must not delete or alter sponsored content during the agreed campaign period.</li>
                  <li>You are responsible for the originality of submitted content and must not infringe third-party rights.</li>
                </ul>
              )
            },
            {
              title: "5. Payments and Rewards",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>Compensation terms will be specified per campaign. These may include payments, gifted products, commissions, or exposure.</li>
                  <li>Influencers are responsible for declaring any earnings or rewards for tax purposes.</li>
                  <li>Where applicable, we may process payments on behalf of brands, but we do not act as guarantor.</li>
                  <li>Failure to meet deliverables may result in non-payment and account penalties.</li>
                </ul>
              )
            },
            {
              title: "6. Platform Conduct and Integrity",
              content: (
                <>
                  <div className="mb-1">You must act professionally, respectfully, and in good faith toward brands and other users.</div>
                  <div className="mb-1">Prohibited conduct includes:</div>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Abusive or discriminatory language</li>
                    <li>Sharing misleading performance data</li>
                    <li>Using unauthorised or stolen content</li>
                    <li>Attempting to manipulate engagement or campaign eligibility</li>
                  </ul>
                  <div className="mt-2">We reserve the right to suspend or terminate accounts that violate these standards.</div>
                </>
              )
            },
            {
              title: "7. Content and Intellectual Property",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>All content created for and submitted as part of a paid or gifted collaboration shall be deemed "work for hire" and, unless otherwise agreed in writing, shall become the exclusive property of the brand upon submission.</li>
                  <li>You hereby assign all intellectual property rights in such content to the brand, including rights to use, reproduce, edit, distribute, and publish across all media channels.</li>
                  <li>You agree not to reuse, resell, or modify submitted content for other purposes without the brand’s prior written consent.</li>
                  <li>The platform may use campaign content for promotional and illustrative purposes.</li>
                  <li>You grant LOXA HOLDINGS LTD a royalty-free, worldwide, perpetual licence to display any campaign content submitted or tagged through the platform on its website, marketing materials, investor communications, and social media for the purposes of promoting the platform.</li>
                </ul>
              )
            },
            {
              title: "8. Disclaimers and Limitation of Liability",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>We do not guarantee campaign selection or success.</li>
                  <li>We are not responsible for brand conduct, campaign delays, or disputes.</li>
                  <li>You use the platform at your own risk. We do not warrant uninterrupted or error-free functionality.</li>
                  <li>To the maximum extent permitted by law, we disclaim liability for indirect, incidental, or consequential damages.</li>
                </ul>
              )
            },
            {
              title: "9. Termination and Suspension",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>We may suspend or terminate your account if you:</li>
                  <ul className="list-disc ml-8 space-y-1">
                    <li>Violate these Terms</li>
                    <li>Submit fraudulent or misleading content</li>
                    <li>Abuse platform features or users</li>
                  </ul>
                  <li>You may request account closure at any time via your account settings.</li>
                </ul>
              )
            },
            {
              title: "10. Governing Law and Dispute Resolution",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>These Terms shall be governed by the laws of England and Wales.</li>
                  <li>Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</li>
                  <li>Users are encouraged to resolve disputes directly or through informal mediation where appropriate.</li>
                </ul>
              )
            },
            {
              title: "11. Amendments",
              content: (
                <ul className="list-disc ml-6 space-y-1">
                  <li>We may revise these Terms from time to time. Continued use of the platform constitutes acceptance of any updated Terms.</li>
                  <li>You will be notified of significant changes via email or platform notification.</li>
                </ul>
              )
            },
            {
              title: "Contact",
              content: (
                <span>For questions or concerns regarding these Terms, contact us at <a href="mailto:info@gracebelgravia.com" className="text-primary underline">info@gracebelgravia.com</a>.</span>
              )
            }
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
              <Text className="text-gray-700 block">{term.content}</Text>
              {index < 11 && <Divider className="my-4" />}
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
