'use client'
import React from 'react'
import FindAboutUs from '@/Components/Onboarding/Brand/hear-about-us'
import BrandDetails from '@/Components/Onboarding/Brand/brand-details';
import BusinessType from '@/Components/Onboarding/Brand/business-type/index.';
import { useSelector } from 'react-redux';
import BusinessIndustry from '@/Components/Onboarding/Brand/business-industry';
import CompanyDetails from '@/Components/Onboarding/Brand/company-details';
import NumberOfInfluencers from '@/Components/Onboarding/Brand/number-of-influencers';
import GeographicalScope from '@/Components/Onboarding/Brand/geographical-scope';
import Platforms from '@/Components/Onboarding/Brand/platforms';
import DecidingFactor from '@/Components/Onboarding/Brand/deciding-factor';
import MinimumFollowers from '@/Components/Onboarding/Brand/minimum-followers';
import Gender from '@/Components/Onboarding/Brand/gender';
import Ethnicities from '@/Components/Onboarding/Brand/ethnicities';
import AgeGroups from '@/Components/Onboarding/Brand/age-groups';
import Countries from '@/Components/Onboarding/Brand/countries';
import InfluencerIndustry from '@/Components/Onboarding/Brand/influencer-industry';
import PaymentOption from '@/Components/Onboarding/Brand/payment-option';
import CampaignGoal from '@/Components/Onboarding/Brand/campaign-goal';
import Collaboration from '@/Components/Onboarding/Brand/collaboration';
import VideoType from '@/Components/Onboarding/Brand/video-type';
import Pricing from '@/Components/Onboarding/Brand/pricing';
import Terms from '@/Components/Onboarding/Brand/terms';

const BrandOnboarding = () => {
  const {currentStep} = useSelector((store) => store.stepper);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <FindAboutUs />;
      case 1:
        return <BrandDetails />;
      case 2:
        return <BusinessType />;
      case 3:
        return <BusinessIndustry />;
      case 4:
        return <CompanyDetails />;
      case 5:
        return <NumberOfInfluencers />;
      case 6:
        return <GeographicalScope />;
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
        return <Countries />;
      case 14:
        return <InfluencerIndustry />;
      case 15:
        return <PaymentOption />;
      case 16:
        return <CampaignGoal />;
      case 17:
        return <Collaboration />;
      case 18:
        return <VideoType />;
      case 19:
        return <Pricing />;
      default:
        return <Terms />;
    }
  };
  return (
    <div>
      {renderCurrentStep()}
    </div>
  )
}

export default BrandOnboarding
