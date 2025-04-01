import React, { useState, useEffect } from "react";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { createCampaign } from "@/redux/services/campaign";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { previousStep, resetCampaignData } from "@/redux/features/stepper/campaign-stepper";
import CustomizedBackButton from "../../SharedComponents/CustomizedBackComponent";
import { setCurrentStep } from "@/redux/features/stepper/campaign-stepper";
const CampaignPreview = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const auth = useAuth();
  const addCampaign = async () => {
    try {
      setLoading(true);
      const response = await createCampaign(auth, campaignData);
      if (response.status === 200) {
        toast.success("Campaign created successfully!");
        dispatch(resetCampaignData())
        setSuccess(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);
  return (
    <div className="bg-background h-screen py-8 px-4">
      {success ? (
        <div className="flex items-center justify-center h-[50vh]">
          <section className="bg-white rounded-lg shadow-sm p-4 w-5/12 flex items-center justify-center">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-green text-center">
                🎉 Campaign Created Successfully!
              </h2>
              <p className="font-light text-sm text-center leading-6">Your campaign is now live and ready for influencers to engage. You can track its performance in your dashboard.</p>
            </div>
          </section>
        </div>
      ) : (
        <>
          <section className="bg-white mb-2 shadow rounded p-4 space-y-6  text-color text-sm md:w-8/12 w-full mx-auto">
            <div className="border-b py-2 space-y-4 border-input">
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Campaign Title:</p>
                <p className="font-light">{campaignData.title}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">
                  Campaign Description:
                </p>
                <p className="font-light">{campaignData.description}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Video URL:</p>
                <p className="font-light">{campaignData.exampleVideoUrl}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">
                  Videos Per Creator:{" "}
                </p>
                <p className="font-light">
                  {campaignData.campaignPreferences.videosPerCreator}
                </p>
              </div>
            </div>
            <div className="border-b py-2 space-y-4 border-input">
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Brief Title:</p>
                <p className="font-light">{campaignData.briefTitle}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">
                  Brief Description:
                </p>
                <p className="font-light">{campaignData.briefDescription}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Video Duration:</p>
                <p className="font-light">
                  {campaignData.campaignPreferences.videoDuration}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Video Format:</p>
                <p className="font-light">
                  {campaignData.campaignPreferences.videoFormat}
                </p>
              </div>
            </div>
            <div className="border-b border-input py-2 space-y-4">
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Start Date:</p>
                <p className="font-light">{campaignData.startDate}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">End Date:</p>
                <p className="font-light">{campaignData.endDate}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Show Face:</p>
                <p className="font-light">
                  {campaignData.campaignPreferences.showFace}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Social Channels:</p>
                <p className="font-light">
                  {campaignData.campaignPreferences.socialChannels.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Video Style:</p>
                <p className="font-light">
                  {campaignData.campaignPreferences.videoStyle.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-muted font-bold w-2/12">Show Face:</p>
                <p className="font-light">
                  {campaignData.campaignPreferences.showFace}
                </p>
              </div>
            </div>
          </section>
          <div className="w-8/12 mx-auto flex items-center justify-between">
            <CustomizedBackButton onClick={() => dispatch(previousStep())} />
            <ButtonComponent
              disabled={loading}
              onClick={addCampaign}
              label={`${loading ? "Processing" : "Submit"}`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignPreview;
