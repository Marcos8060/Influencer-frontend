"use client";
import AgeGroups from "@/app/Components/Onboarding/Brand/age-groups";
import BrandDetails from "@/app/Components/Onboarding/Brand/brand-details";
import BusinessIndustry from "@/app/Components/Onboarding/Brand/business-industry";
import BusinessType from "@/app/Components/Onboarding/Brand/business-type/index.";
import CampaignGoal from "@/app/Components/Onboarding/Brand/campaign-goal";
import Collaboration from "@/app/Components/Onboarding/Brand/collaboration";
import CompanyDetails from "@/app/Components/Onboarding/Brand/company-details";
import Countries from "@/app/Components/Onboarding/Brand/countries";
import DecidingFactor from "@/app/Components/Onboarding/Brand/deciding-factor";
import Ethnicities from "@/app/Components/Onboarding/Brand/ethnicities";
import Gender from "@/app/Components/Onboarding/Brand/gender";
import GeographicalScope from "@/app/Components/Onboarding/Brand/geographical-scope";
import FindAboutUs from "@/app/Components/Onboarding/Brand/hear-about-us";
import InfluencerIndustry from "@/app/Components/Onboarding/Brand/influencer-industry";
import MinimumFollowers from "@/app/Components/Onboarding/Brand/minimum-followers";
import NumberOfInfluencers from "@/app/Components/Onboarding/Brand/number-of-influencers";
import PaymentOption from "@/app/Components/Onboarding/Brand/payment-option";
import Platforms from "@/app/Components/Onboarding/Brand/platforms";
import Pricing from "@/app/Components/Onboarding/Brand/pricing";
import Terms from "@/app/Components/Onboarding/Brand/terms";
import VideoType from "@/app/Components/Onboarding/Brand/video-type";
import React from "react";
import { useSelector } from "react-redux";

const BrandOnboarding = () => {
  const { currentStep } = useSelector((store) => store.stepper);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BrandDetails />;
      case 1:
        return <BusinessIndustry />;
      case 2:
        return <BusinessType />;
      case 3:
        return <CompanyDetails />;
        case 4:
        return <InfluencerIndustry />;
      case 5:
        return <Countries />;
      case 6:
        return <NumberOfInfluencers />;
      case 7:
        return <Platforms />;
      case 8:
        return <DecidingFactor />;
      case 9:
        return <MinimumFollowers />;
      case 10:
        return <Gender />;
      case 11:
        return <Ethnicities />;
      case 12:
        return <AgeGroups />;
      case 13:
        return <PaymentOption />;
      case 14:
        return <CampaignGoal />;
      case 15:
        return <Collaboration />;
      case 16:
        return <VideoType />;
      case 17:
        return <Pricing />;
      case 18:
        return <FindAboutUs />;
      // case 19:
      //   return <GeographicalScope />;
      default:
        return <Terms />;
    }
  };
  return <div>{renderCurrentStep()}</div>;
};

export default BrandOnboarding;
