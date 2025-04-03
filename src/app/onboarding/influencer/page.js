'use client'
import React from 'react'
import Gender from '@/app/Components/Onboarding/Influencer/gender';
import FindAboutUs from '@/app/Components/Onboarding/Influencer/hear-about-us';
import { useSelector } from 'react-redux';
import DateOfBirth from '@/app/Components/Onboarding/Influencer/dob';
import EthnicBackground from '@/app/Components/Onboarding/Influencer/ethnic-background';
import InfluencerContent from '@/app/Components/Onboarding/Influencer/content';
import PreferredCompanies from '@/app/Components/Onboarding/Influencer/preferredCompanies';
import Topics from '@/app/Components/Onboarding/Influencer/topics';
import Address from '@/app/Components/Onboarding/Influencer/address';
import InfluencerCollaboration from '@/app/Components/Onboarding/Influencer/collaboration';
import LeadTime from '@/app/Components/Onboarding/Influencer/lead-time';
import InfluencerTerms from '@/app/Components/Onboarding/Influencer/influencer-terms';
import PreferredBrandTypes from '@/app/Components/Onboarding/Influencer/preferredBrandTypes';


const InfluencerOnboarding = () => {
  const {currentStep} = useSelector((store) => store.influencerStepper);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <InfluencerContent />;
      case 1:
        return <Topics />;
      case 2:
        return <Address />;
      case 3:
        return <DateOfBirth />;
      case 4:
        return <Gender />;
      case 5:
        return <EthnicBackground />;
      case 6:
        return <PreferredCompanies />;
      case 7:
        return <PreferredBrandTypes />;
      case 8:
        return <InfluencerCollaboration />;
      case 9:
        return <LeadTime />;
      case 10:
        return <FindAboutUs />;
      case 11:
      default:
        return <InfluencerTerms />;
    }
  };
  return (
    <div>
      {renderCurrentStep()}
    </div>
  )
}

export default InfluencerOnboarding
