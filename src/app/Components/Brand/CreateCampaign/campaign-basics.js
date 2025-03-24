"use client";
import React,{ useState,useEffect } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import DateFieldComponent from "../../SharedComponents/DateFieldComponent";
import CampaignProfileImageModal from "./campaignImageModal";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import {
  nextStep,
  updateFormData,
} from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";

const CampaignBasics = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    title: campaignData.title || "",
    description: campaignData.description || "",
    startDate: campaignData.startDate || null,
    endDate: campaignData.endDate || null,
    coverImageUrl: campaignData.coverImageUrl || "",
  });

  const handleNext = () => {
    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  useEffect(() => {}, [
    dispatch,
    campaignData.title,
    campaignData.description,
    campaignData.startDate,
    campaignData.endDate,
    campaignData.coverImageUrl,
  ]);

  return (
    <div className="bg-background px-4 h-screen flex items-center justify-center text-color">
      <div className="md:w-5/12 mx-auto space-y-4">
        <section className="bg-white rounded shadow p-4">
          <h2 className="mb-4 font-bold">Campaign Basics</h2>
          <section className="space-y-2">
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">
                Campaign Title
              </label>
              <InputComponent
                value={details.title}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    title: e.target.value,
                  })
                }
                placeholder="E.g New Product Launch..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">
                Campaign Description
              </label>
              <TextAreaComponent
                value={details.description}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    description: e.target.value,
                  })
                }
                placeholder="Type here..."
              />
            </div>
          </section>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Campaign Timeframe</h2>
            <small>
              When is the campaign expected to be up and running? You do not
              need to set an end date
            </small>
          </div>
          <section className="flex items-center gap-4 justify-between w-full">
            <div className="w-1/2">
              <DateFieldComponent
                value={details.startDate}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    startDate: e.target.value,
                  })
                }
                placeholder="Start Date"
              />
            </div>
            <div className="w-1/2">
              <DateFieldComponent
                value={details.endDate}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    endDate: e.target.value,
                  })
                }
                placeholder="End Date"
              />
            </div>
          </section>
        </section>
        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Campaign Cover Image</h2>
            <small>
              We recommend a square image with dimensions around 500px by 500px
            </small>
          </div>
          <CampaignProfileImageModal />
        </section>
        <ButtonComponent onClick={handleNext} label="Next" />
      </div>
    </div>
  );
};

export default CampaignBasics;
