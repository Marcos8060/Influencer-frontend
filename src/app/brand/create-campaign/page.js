'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import CampaignBasics from '@/app/Components/Brand/CreateCampaign/campaign-basics';
import CampaignBrief from '@/app/Components/Brand/CreateCampaign/campaign-brief';
import CampaignPreview from '@/app/Components/Brand/CreateCampaign/campaign-preview';
import CampaignRequirements from '@/app/Components/Brand/CreateCampaign/campaign-requirements';

const CreateCampaign = () => {
  const { currentStep } = useSelector(( store ) => store.campaign);
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <CampaignBasics />;
      case 1:
        return <CampaignBrief />;
      case 2:
        return <CampaignRequirements />;
      case 3:
      default:
        return <CampaignPreview />;
    }
  };
  return (
    <div className=''>
      {renderCurrentStep()}
    </div>
  )
}

export default CreateCampaign
