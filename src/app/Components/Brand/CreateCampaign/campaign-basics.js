"use client";
import React, { useState } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import DateFieldComponent from "../../SharedComponents/DateFieldComponent";
import CampaignProfileImageModal from "./campaignImageModal";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { nextStep, updateFormData } from "@/redux/features/stepper/campaign-stepper";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

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
    title: campaignData.title || "",
    description: campaignData.description || "",
    startDate: parseDate(campaignData.startDate),
    endDate: parseDate(campaignData.endDate),
    coverImageUrl: campaignData.coverImageUrl || "",
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
    dispatch(
      updateFormData({
        ...details,
        startDate: details.startDate ? formatDate(details.startDate) : null,
        endDate: details.endDate ? formatDate(details.endDate) : null,
      })
    );
    dispatch(nextStep());
  };

  return (
    <div className="bg-background px-4 h-screen flex items-center justify-center text-color">
      <div className="md:w-5/12 w-full mx-auto space-y-4">
        <section className="bg-white rounded shadow p-4">
          <h2 className="mb-4 font-bold">Campaign Basics</h2>
          <section className="space-y-2">
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">Campaign Title</label>
              <InputComponent
                value={details.title}
                onChange={(e) =>
                  setDetails({ ...details, title: e.target.value })
                }
                placeholder="E.g New Product Launch..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-4" htmlFor="">Campaign Description</label>
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
              <DateFieldComponent
                value={details.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                placeholder="Start Date"
              />
            </div>
            <div className="w-1/2">
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
            <h2 className="font-bold">Campaign Cover Image</h2>
            <small>We recommend a square image with dimensions around 500px by 500px</small>
          </div>
          <CampaignProfileImageModal details={details} />
        </section>

        <footer className="flex items-center gap-4 justify-center">
          <div className="w-1/2">
            <button className="border border-primary rounded px-8 py-3 text-xs w-full text-color">
              <Link href="/onboarding/brand/dashboard">Back to Dashboard</Link>
            </button>
          </div>
          <div className="w-1/2">
            <ButtonComponent onClick={handleNext} label="Next" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CampaignBasics;
