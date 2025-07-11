"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, previousStep, updateFormData,resetStepper } from "@/redux/features/stepper";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHandshake } from "react-icons/fa";
import { brandOnboarding } from "@/redux/services/auth/brand/onboarding";
import { format } from 'date-fns';

const BrandTerms = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
        dispatch(resetStepper())
      }else{
        toast.error(response.errorMessage || 'User has already onboarded')
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "An error occurred during onboarding");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(6));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const terms = [
    {
      title: "1. Introduction",
      description: `These Terms and Conditions (\"Terms\") govern your use of the Grace Belgravia influencer platform as a Brand (\"you\", \"your\"). By registering an account and using the services provided by LOXA HOLDINGS LTD (\"we\", \"us\", \"our\"), you agree to be bound by these Terms. If you do not agree, you may not use the platform.`
    },
    {
      title: "2. Eligibility and Registration",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>You must be a legally registered business, organisation or individual operating in a professional capacity.</li>
          <li>You agree to provide accurate, complete, and up-to-date business information upon registration.</li>
          <li>We reserve the right to verify your identity and business status and to refuse or terminate access at our sole discretion.</li>
        </ul>
      )
    },
    {
      title: "3. Use of the Platform",
      description: (
        <>
          <div className="mb-1">You may use the platform to:</div>
          <ul className="list-disc ml-6 space-y-1">
            <li>Search and filter influencers</li>
            <li>Create campaigns and send collaboration invites</li>
            <li>Communicate with influencers via direct messaging</li>
            <li>View analytics and performance metrics</li>
          </ul>
          <div className="mt-2 mb-1">You are solely responsible for all activity under your account, including campaigns created, communications, and payments.</div>
          <div className="mb-1">You agree not to:</div>
          <ul className="list-disc ml-6 space-y-1">
            <li>Misrepresent your brand, products, or campaign intentions</li>
            <li>Solicit off-platform transactions to avoid service fees</li>
            <li>Create multiple or fake accounts</li>
            <li>Engage in abusive or deceptive behaviour</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Campaigns and Collaborations",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>Campaign terms must be clearly communicated, including deliverables, timelines, and compensation.</li>
          <li>Brands must not modify campaign requirements post-acceptance unless mutually agreed with the influencer.</li>
          <li>Product gifting must clearly state whether content creation is expected in return.</li>
          <li>You are responsible for honouring all agreed-upon compensation.</li>
          <li>Content created as part of a paid or gifted collaboration shall, unless otherwise agreed in writing, be deemed "work for hire" and shall become your exclusive property upon submission. You will own all intellectual property rights in the content and may use, reproduce, modify, distribute, or publish it at your sole discretion.</li>
        </ul>
      )
    },
    {
      title: "5. Payments and Disputes",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>You are responsible for timely and complete payment of all agreed sums.</li>
          <li>Late or withheld payments may result in platform restrictions, penalties, or account termination.</li>
          <li>In case of dispute, both parties are encouraged to communicate professionally and in good faith.</li>
          <li>The platform may assist in informal mediation but is not liable for resolving user disputes.</li>
        </ul>
      )
    },
    {
      title: "6. Platform Conduct and Abuse",
      description: (
        <>
          <div className="mb-1">You must act professionally, honestly, and respectfully toward all users.</div>
          <div className="mb-1">Prohibited conduct includes, but is not limited to:</div>
          <ul className="list-disc ml-6 space-y-1">
            <li>Harassment, hate speech, discrimination</li>
            <li>Posting defamatory, obscene, or illegal content</li>
            <li>Attempting to manipulate platform metrics</li>
          </ul>
          <div className="mt-2">We operate a zero-tolerance policy for fake accounts, spam, and fraudulent behaviour. Violations may result in immediate termination.</div>
        </>
      )
    },
    {
      title: "7. Content and Intellectual Property",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>All content created and submitted by influencers as part of a paid or gifted collaboration shall, unless otherwise agreed in writing, be considered "work for hire" and become your exclusive property.</li>
          <li>You will hold full ownership rights in such content, including rights to use, reproduce, edit, publish, and distribute across all media channels.</li>
          <li>You must not use influencer content in a defamatory or misleading context or in violation of any applicable laws.</li>
          <li>The platform retains the right to use campaign content for promotional purposes, including marketing, case studies, and investor materials.</li>
        </ul>
      )
    },
    {
      title: "8. Disclaimers and Limitation of Liability",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>We do not guarantee campaign results or influencer performance.</li>
          <li>We are not liable for any losses arising from collaborations, payment disputes, or misuse of content.</li>
          <li>Use of the platform is at your own risk. We do not warrant that the platform will be error-free or uninterrupted.</li>
          <li>To the maximum extent permitted by law, we disclaim all liability for indirect, incidental, or consequential damages.</li>
        </ul>
      )
    },
    {
      title: "9. Termination and Suspension",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>We may suspend or terminate your account if you:</li>
          <ul className="list-disc ml-8 space-y-1">
            <li>Violate these Terms</li>
            <li>Engage in abusive, deceptive, or fraudulent conduct</li>
            <li>Repeatedly fail to meet campaign obligations</li>
          </ul>
          <li>You may request account closure at any time via your account settings.</li>
        </ul>
      )
    },
    {
      title: "10. Governing Law and Dispute Resolution",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>These Terms shall be governed by the laws of England and Wales.</li>
          <li>Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</li>
          <li>Users are encouraged to seek amicable resolutions before initiating legal proceedings.</li>
        </ul>
      )
    },
    {
      title: "11. Amendments",
      description: (
        <ul className="list-disc ml-6 space-y-1">
          <li>We may update these Terms from time to time. Continued use of the platform constitutes acceptance of the revised Terms.</li>
          <li>You will be notified of material changes via email or platform notification.</li>
        </ul>
      )
    },
    {
      title: "Contact",
      description: (
        <span>For questions or concerns regarding these Terms, contact us at <a href="mailto:info@gracebelgravia.com" className="text-primary underline">info@gracebelgravia.com</a>.</span>
      )
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
            Grace Belgravia Influencer Platform<br />
            Brand Terms and Conditions
          </h1>
          <p className="text-gray-500">
            Effective Date: {today}<br />
            Governing Law: England and Wales<br />
            Company: LOXA HOLDINGS LTD<br />
            Registered Address: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ<br />
            Correspondence Address: Office 7, Siddeley House, 50 Canbury Park Rd, Kingston upon Thames, KT2 6LX<br />
            Website: <a href="https://gracebelgravia.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://gracebelgravia.com/</a><br />
            Email: <a href="mailto:info@gracebelgravia.com" className="text-primary underline">info@gracebelgravia.com</a>
          </p>
        </div>
        <div className="mb-8 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
          {terms.map((term, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-6"
            >
              <h3 className="font-semibold text-gray-800 mb-1">{term.title}</h3>
              <div className="text-sm text-gray-600">{term.description}</div>
              {index < 11 && <hr className="my-4 border-input" />}
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

export default BrandTerms;