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

const InfluencerTerms = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  console.log(auth);
  const handleSubmit = async () => {
    dispatch(updateFormData({ agreedToTerms: true }));
    dispatch(updateFormData({ finishedOnboarding: true }));
    setLoading(true);
    try {
      const updatedFormData = {
        ...influencerData,
        agreedToTerms: true,
        finishedOnboarding: true,
      };
      if (auth) {
        const response = await influencerOnboarding(auth, updatedFormData);
        if (response.status === 200) {
          setLoading(false);
          router.push("/onboarding/influencer/dashboard");
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(11));
  }, [dispatch]);
  return (
    <section className="flex items-center justify-center h-screen md:w-5/12 mx-auto px-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center my-2">Agree Terms</h1>
        <p className="mb-4 text-sm">
          To collaborate with brands on the platform, agree with the following
        </p>
        <section className="w-full space-y-2">
          <div>
            <h2 className="text-sm font-bold">1. Content Creation</h2>
            <p className="text-sm">
              You agree to produce and share social media content that
              accurately represents the brand's products or services.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold">2. Provided Materials</h2>
            <p className="text-sm">
              The brand will supply the necessary product samples or other
              materials required for content creation
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold">3. Approval</h2>
            <p className="text-sm">
              Process The brand reserves the right to review and approve the
              content prior to its publication.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold">4. Disclosure Compliance</h2>
            <p className="text-sm">
              You agree to disclose your partnership with the brand in
              compliance with applicable advertising regulations.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold">5. Usage Rights</h2>
            <p className="text-sm">
              The brand retains the right to use the content you create for
              marketing and promotional purposes, including on social media,
              websites, and other online platforms. You grant the brand a
              perpetual, non-exclusive, royalty-free license to use the content
              for these purposes.
            </p>
          </div>
          <ButtonComponent
            disabled={loading}
            onClick={handleSubmit}
            label={loading ? "Submitting..." : "Agree"}
          />
          <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        </section>
      </div>
    </section>
  );
};

export default InfluencerTerms;
