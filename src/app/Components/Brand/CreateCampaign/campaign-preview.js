import React from 'react'
import ButtonComponent from '../../SharedComponents/ButtonComponent'
import { createCampaign } from '@/redux/services/campaign'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useAuth } from '@/assets/hooks/use-auth'
const CampaignPreview = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const auth = useAuth();

  const addCampaign = async() => {
    try {
      const response = await createCampaign(auth, campaignData)
      console.log(response);
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <ButtonComponent onClick={addCampaign} label="Submit" />
    </div>
  )
}

export default CampaignPreview
