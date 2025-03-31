import React, { useState } from "react";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { createCampaign } from "@/redux/services/campaign";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { previousStep } from "@/redux/features/stepper/campaign-stepper";
import CustomizedBackButton from "../../SharedComponents/CustomizedBackComponent";
const CampaignPreview = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const auth = useAuth();

  const addCampaign = async () => {
    try {
      setLoading(true);
      const response = await createCampaign(auth, campaignData);
      if (response.status === 200) {
        toast.success("Campaign created successfully!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="bg-background h-screen py-8 px-4">
      <section className="bg-white mb-2 shadow rounded p-4 space-y-6  text-color text-sm md:w-8/12 w-full mx-auto">
        <div className="border-b py-2 border-input">
          <div className="flex gap-4">
            <p>Campaign Title:</p>
            <p className="font-light">{campaignData.title}</p>
          </div>
          <div className="flex gap-4">
            <p>Campaign Description:</p>
            <p className="font-light">{campaignData.description}</p>
          </div>
          <div className="flex gap-4">
            <p>Video URL:</p>
            <p className="font-light">{campaignData.exampleVideoUrl}</p>
          </div>
          <div className="flex gap-4">
            <p>Videos Per Creator: </p>
            <p className="font-light">{campaignData.campaignPreferences.videosPerCreator}</p>
          </div>
        </div>
        <div className="border-b py-2 border-input">
          <div className="flex gap-4">
            <p>Brief Title:</p>
            <p className="font-light">{campaignData.briefTitle}</p>
          </div>
          <div className="flex gap-4">
            <p>Brief Description:</p>
            <p className="font-light">{campaignData.briefDescription}</p>
          </div>
          <div className="flex gap-4">
            <p>Video Duration:</p>
            <p className="font-light">{campaignData.campaignPreferences.videoDuration}</p>
          </div>
          <div className="flex gap-4">
            <p>Video Format:</p>
            <p className="font-light">{campaignData.campaignPreferences.videoFormat}</p>
          </div>
        </div>
        <div className="">
          <div className="flex gap-4">
            <p>Start Date:</p>
            <p className="font-light">{campaignData.startDate}</p>
          </div>
          <div className="flex gap-4">
            <p>End Date:</p>
            <p className="font-light">{campaignData.endDate}</p>
          </div>
          <div className="flex gap-4">
            <p>Show Face:</p>
            <p className="font-light">{campaignData.campaignPreferences.showFace}</p>
          </div>
        </div>
      </section>
      <div className="w-4/12 mx-auto flex items-center justify-between">
        <CustomizedBackButton onClick={() => dispatch(previousStep())} />
        <ButtonComponent disabled={loading} onClick={addCampaign} label={`${loading ? 'Processing' : 'Submit'}`} />
      </div>
    </div>
  );
};

export default CampaignPreview;
