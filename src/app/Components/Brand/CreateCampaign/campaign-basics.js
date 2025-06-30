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
import { FiCalendar, FiInfo, FiImage } from "react-icons/fi";

// Function to convert stored date strings to Date objects
const parseDate = (dateString) => (dateString ? new Date(dateString) : null);

// Function to format Date objects into "YYYY-MM-DD" strings
const formatDate = (date) => {
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const CampaignBasics = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();

  // Initialize state with parsed date objects
  const [details, setDetails] = useState({
    title: campaignData.title || "",
    description: campaignData.description || "",
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
    if (!details.startDate || !details.title || !details.description) {
      toast.error('Please fill out all required fields');
      return;
    }
    // Only check endDate if provided
    if (details.endDate && details.startDate > details.endDate) {
      toast.error('End date must be after start date');
      return;
    }
    
    dispatch(
      updateFormData({
        ...details,
        title: details.title?.trim() || "",
        description: details.description?.trim() || "",
        startDate: details.startDate ? formatDate(details.startDate) : null,
        endDate: details.endDate ? formatDate(details.endDate) : null,
      })
    );
    dispatch(nextStep());
  };

  const descriptionLength = details.description.length || 0;

  return (
    <div className="bg-background text-color min-h-[60vh] px-4 py-8 flex items-center justify-center text-gray-800">
      <div className="max-w-3xl w-full mx-auto space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
        </div>

        {/* Campaign Basics Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <FiInfo className="text-blue-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Campaign Basics</h2>
              <p className="text-gray-500 text-sm">Tell us about your campaign</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                Campaign Title <span className="text-red-500">*</span>
              </label>
              <InputComponent
                value={details.title}
                onChange={(e) => setDetails({ ...details, title: e.target.value })}
                placeholder="E.g. New Product Launch Campaign"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                id="title"
              />
              <p className="mt-1 text-xs text-gray-500">Keep it concise but descriptive</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                Campaign Description <span className="text-red-500">*</span>
              </label>
              <TextAreaComponent
                value={details.description}
                onChange={(e) => setDetails({ ...details, description: e.target.value })}
                placeholder="Describe the purpose and goals of your campaign..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                id="description"
              />
              {details.description && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      descriptionLength < 30 ? "bg-red" :
                      descriptionLength < 60 ? "bg-yellow" : "bg-green"
                    }`}
                    style={{ width: `${Math.min(descriptionLength, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {descriptionLength < 30 ? "Too brief" :
                   descriptionLength < 60 ? "Good start" : "Excellent description"}
                </p>
              </div>
            )}
              <p className="mt-1 text-xs text-gray-500">What makes this campaign special?</p>
            </div>
          </div>
        </section>

        {/* Timeframe Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-2 rounded-full mr-4">
              <FiCalendar className="text-purple-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Campaign Timeframe</h2>
              <p className="text-gray-500 text-sm">When will your campaign run?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DateFieldComponent
                value={details.startDate}
                minDate={today}
                onChange={(date) => handleDateChange("startDate", date)}
                placeholder="Select start date"
                className="w-full px-4 py-2 border border-input rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                id="startDate"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">
                End Date <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <DateFieldComponent
                value={details.endDate}
                minDate={details.startDate || today}
                onChange={(date) => handleDateChange("endDate", date)}
                placeholder="Select end date"
                className="w-full px-4 py-2 border border-input text-sm rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                id="endDate"
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {details.startDate && details.endDate
              ? `Campaign will run for ${Math.ceil((details.endDate - details.startDate) / (1000 * 60 * 60 * 24))} days`
              : details.startDate && !details.endDate
              ? "No end date (runs indefinitely)"
              : "Select a start date to see duration"}
          </p>
        </section>

        {/* Cover Image Section */}
        <section className="bg-white rounded-xl shadow-sm border border-input p-6">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-2 rounded-full mr-4">
              <FiImage className="text-amber-600 text-lg" />
            </div>
            <div>
              <h2 className="text-md font-semibold text-gray-900">Campaign Cover Image</h2>
              <p className="text-gray-500 text-sm">Add a visual identity to your campaign</p>
            </div>
          </div>
          
          <div className="text-center">
            <CampaignProfileImageModal setDetails={setDetails} />
            <p className="mt-3 text-sm text-gray-500">Recommended size: 1200x600px (JPG or PNG)</p>
          </div>
        </section>

        {/* Footer with Next Button */}
        <footer className="flex justify-end">
          <ButtonComponent 
            onClick={handleNext} 
            label="Continue" 
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            disabled={!details.title || !details.description || !details.startDate}
          />
        </footer>
      </div>
    </div>
  );
};

export default CampaignBasics;