"use client";
import React,{ useEffect} from "react";
import {
  getInstagramResponse,
  getTiktokResponse,
} from "@/redux/features/socials";
import { SiTiktok } from "react-icons/si";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { InstagramOutlined } from "@ant-design/icons";
import {
  setCurrentStep,
  nextStep,
  previousStep,
} from "@/redux/features/stepper";
import CustomizedBackButton from "@/app/Components/SharedComponents/CustomizedBackComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";

const BrandSocialConnectStep = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [connecting, setConnecting] = React.useState({
    instagram: false,
    tiktok: false,
  });

  const handleInstagramConnect = async () => {
    try {
      setConnecting((prev) => ({ ...prev, instagram: true }));
      const response = await dispatch(getInstagramResponse(auth));
      const url =
        `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1252453379876445&redirect_uri=${encodeURIComponent('https://influencer-frontend-nu.vercel.app/auth/instagram-brand-onboarding-callback-uri')}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
      window.location.href = url;
    } catch (error) {
      toast.error("Instagram connection failed");
    } finally {
      setConnecting((prev) => ({ ...prev, instagram: false }));
    }
  };

  const handleTiktokConnect = async () => {
    try {
      setConnecting((prev) => ({ ...prev, tiktok: true }));
      const response = await dispatch(getTiktokResponse(auth));
      window.location.href = response.message;
    } catch (error) {
      toast.error("TikTok connection failed");
    } finally {
      setConnecting((prev) => ({ ...prev, tiktok: false }));
    }
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  useEffect(() => {
    dispatch(setCurrentStep(4));
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Your Social Media
        </h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Connect your brand's social media accounts to unlock advanced
          analytics and campaign features. You can skip this step and connect
          later, but we recommend connecting now for the best experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
          <button
            onClick={handleInstagramConnect}
            disabled={connecting.instagram}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#F77737] text-white font-semibold text-sm shadow hover:from-[#C13584] hover:to-[#F56040] transition-all disabled:opacity-60"
          >
            <InstagramOutlined className="text-2xl" />
            {connecting.instagram ? "Connecting..." : "Connect Instagram"}
          </button>
          <button
            onClick={handleTiktokConnect}
            disabled={connecting.tiktok}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white font-semibold text-sm shadow hover:from-gray-900 hover:to-black transition-all disabled:opacity-60"
          >
            <SiTiktok className="text-2xl" />
            {connecting.tiktok ? "Connecting..." : "Connect TikTok"}
          </button>
        </div>
        <div className="mt-4 text-gray-400 text-xs text-center max-w-xs">
          We will never post or access your data without your permission. You
          can disconnect at any time in your account settings.
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
          className="px-6 py-3 rounded-lg font-medium text-white"
        />
      </div>
    </>
  );
};

export default BrandSocialConnectStep;
