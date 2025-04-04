import React, { useState, useEffect } from "react";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { createCampaign } from "@/redux/services/campaign";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import {
  previousStep,
  resetCampaignData,
} from "@/redux/features/stepper/campaign-stepper";
import CustomizedBackButton from "../../SharedComponents/CustomizedBackComponent";
import { setCurrentStep } from "@/redux/features/stepper/campaign-stepper";
import { IoMdCheckmark } from "react-icons/io";

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
        dispatch(resetCampaignData());
        setSuccess(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);
  return (
    <div className="bg-background py-8 px-4">
      {success ? (
        <div className="flex items-center justify-center h-[50vh]">
          <section className="bg-white rounded-lg shadow-sm p-4 md:w-5/12 w-full flex items-center justify-center">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-green text-center">
                🎉 Campaign Created Successfully!
              </h2>
              <p className="font-light text-sm text-center leading-6">
                Your campaign is now live and ready for influencers to engage.
                You can track its performance in your dashboard.
              </p>
            </div>
          </section>
        </div>
      ) : (
        <>
          <section className="bg-white border-t-8 border-secondary mb-2 p-6 space-y-6  text-color text-sm md:w-8/12 w-full mx-auto">
            <div className="space-y-4 border-b border-input">
              <h1 className="font-light text-3xl text-center">
                {campaignData.title}
              </h1>
              <img
                className="rounded h-[30vh] w-full object-cover"
                src={campaignData.coverImage?.url}
                alt=""
              />
              <p className="font-semibold text-center">
                {campaignData.description}
              </p>
            </div>
            <section className=" border-b border-input py-4">
              <div className="space-y-4">
                <section className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <p className="font-thin">Start Date:</p>
                    <p className="font-semibold">{campaignData.startDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-thin">End Date:</p>
                    <p className="font-semibold">{campaignData.endDate}</p>
                  </div>
                </section>

                <div className="flex gap-2">
                  <p className="font-thin">Video URL:</p>
                  <a
                    className="font-semibold text-link"
                    target="_blank"
                    href={campaignData.exampleVideoUrl}
                  >
                    {campaignData.exampleVideoUrl}
                  </a>
                </div>
                <section className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <p className="font-thin">Videos Per Creator:</p>
                    <p className="font-semibold">
                      {campaignData.campaignPreferences.videosPerCreator}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-thin">Video Duration:</p>
                    <p className="font-semibold">
                      {campaignData.campaignPreferences.videoDuration}s
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-thin">Video Format:</p>
                    <p className="font-semibold">
                      {campaignData.campaignPreferences.videoFormat}
                    </p>
                  </div>
                </section>
              </div>
            </section>
            <section className=" border-b border-input py-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <p className="font-thin w-2/12">Brief Title:</p>
                  <p className="font-semibold">{campaignData.briefTitle}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-thin w-2/12">Brief Description:</p>
                  <p className="font-semibold">
                    {campaignData.briefDescription}
                  </p>
                </div>
              </div>
            </section>
            <section className=" border-b border-input py-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <p className="font-thin w-2/12">Show Face:</p>
                  <p className="font-semibold">{campaignData.showFace}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-thin w-2/12">Social Channels:</p>
                  <p className="">
                    {campaignData.campaignPreferences.socialChannels.map(
                      (item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <IoMdCheckmark />
                          <li className="list-none font-semibold">{item}</li>
                        </div>
                      )
                    )}
                  </p>
                </div>
              </div>
            </section>
            <section className=" border-b border-input py-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <p className="font-thin w-2/12">Video Style:</p>
                  <p className="font-light">
                    {campaignData.campaignPreferences.videoStyle.map(
                      (item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <IoMdCheckmark />
                          <li className="list-none font-semibold">{item}</li>
                        </div>
                      )
                    )}
                  </p>
                </div>
              </div>
            </section>
          </section>
          <div className="w-8/12 mx-auto flex items-center justify-between">
            <CustomizedBackButton onClick={() => dispatch(previousStep())} />
            <ButtonComponent
              disabled={loading}
              onClick={addCampaign}
              label={`${loading ? "Processing" : "Create Campaign"}`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignPreview;
