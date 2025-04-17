"use client";
import React, { useState } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import DateFieldComponent from "../../SharedComponents/DateFieldComponent";
import CampaignProfileImageModal from "./campaignCoverImage";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { nextStep, updateFormData } from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Function to convert stored date strings to Date objects
const parseDate = (dateString) => (dateString ? new Date(dateString) : null);

// Function to format Date objects into "YYYY-MM-DD" strings
const formatDate = (date) => {
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const CampaignBasics = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();

  // Initialize state with parsed date objects
  const [details, setDetails] = useState({
    title: campaignData.title || null,
    description: campaignData.description || null,
    startDate: parseDate(campaignData.startDate),
    endDate: parseDate(campaignData.endDate),
    coverImage: campaignData.coverImage || null,
  });

  // Handle DateField changes and update state
  const handleDateChange = (field, date) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: date, // Store as Date object in state
    }));
  };

  // Handle form submission and persist data in Redux
  const handleNext = () => {

    if(!details.startDate || !details.title || !details.description || !details.endDate){
      toast.error('Please fill out the required fields')
      return
    }
    dispatch(
      updateFormData({
        ...details,
        title: details.title?.trim() || null,
        description: details.description?.trim() || null,
        startDate: details.startDate ? formatDate(details.startDate) : null,
        endDate: details.endDate ? formatDate(details.endDate) : null,
      })
    );
    dispatch(nextStep());
  };

  return (
    <div className="bg-background px-4 py-8 flex items-center justify-center text-color">
      <div className="md:w-8/12 w-full mx-auto space-y-4">
        <section className="bg-white rounded shadow p-4">
          <h2 className="mb-4 font-bold">Campaign Basics</h2>
          <section className="space-y-2">
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">Campaign Title</label> <span className="text-red">*</span>
              <InputComponent
                value={details.title}
                onChange={(e) =>
                  setDetails({ ...details, title: e.target.value })
                }
                placeholder="E.g New Product Launch..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">Campaign Description</label> <span className="text-red">*</span>
              <TextAreaComponent
                value={details.description}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
                placeholder="Type here..."
              />
            </div>
          </section>
        </section>

        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-bold">Campaign Timeframe</h2>
            <small>When is the campaign expected to be up and running? You do not need to set an end date</small>
          </div>
          <section className="flex items-center gap-4 justify-between w-full">
            <div className="w-1/2">
            <label className="text-xs font-semibold mb-4" htmlFor="">Start Date</label> <span className="text-red">*</span>
              <DateFieldComponent
                value={details.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                placeholder="Start Date"
              />
            </div>
            <div className="w-1/2">
            <label className="text-xs font-semibold mb-4" htmlFor="">End Date</label> <span className="text-red">*</span>
              <DateFieldComponent
                value={details.endDate}
                onChange={(date) => handleDateChange("endDate", date)}
                placeholder="End Date"
              />
            </div>
          </section>
        </section>

        <section className="bg-white rounded shadow p-4">
          <div className="mb-4">
            <h2 className="font-semibold text-sm text-center">Campaign Cover Image</h2>
          </div>
          <CampaignProfileImageModal setDetails={setDetails} />
        </section>

        <footer className="flex items-center gap-4 justify-end">
          
          <div className="w-1/2">
            <ButtonComponent onClick={handleNext} label="Next" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CampaignBasics;
