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
        return <FindAboutUs />;
      case 1:
        return <Gender />;
      case 2:
        return <DateOfBirth />;
      case 3:
        return <EthnicBackground />;
      case 4:
        return <InfluencerContent />;
      case 5:
        return <PreferredCompanies />;
      case 6:
        return <PreferredBrandTypes />;
      case 7:
        return <Topics />;
      case 8:
        return <Address />;
      case 9:
        return <InfluencerCollaboration />;
      case 10:
        return <LeadTime />;
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
