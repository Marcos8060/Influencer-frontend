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
import { FiExternalLink } from "react-icons/fi";
import { BsStars, BsCalendarDate } from "react-icons/bs";
import {
  MdOutlineSlowMotionVideo,
  MdOutlineFormatShapes,
} from "react-icons/md";
import { RiVideoUploadLine } from "react-icons/ri";
import Link from "next/link";

const CampaignPreview = () => {
  const { campaignData } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  const addCampaign = async () => {
    let response;
    try {
      setLoading(true);
      response = await createCampaign(auth, campaignData);
      if (response.status === 200) {
        toast.success("Campaign launched successfully!");
        dispatch(resetCampaignData());
        setSuccess(true);
      } else {
        toast.error(
          response.response?.data.errorMessage?.[0] ||
            "Failed to create campaign."
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errorMessage?.[0] ||
        "Something went wrong while creating the campaign.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getVideoStyleIcon = (style) => {
    switch (style.toLowerCase()) {
      case "how to":
        return "🎓";
      case "up to the creator":
        return "🎨";
      default:
        return "🎥";
    }
  };

  return (
    <div className="bg-background text-color min-h-[60vh] px-4 py-8 flex items-center justify-center text-gray-800">
      {success ? (
        <div className="flex items-center justify-center min-h-[50vh] text-color">
          <section className="bg-white rounded-md shadow p-8 max-w-md w-full text-center transform transition-all hover:scale-[1.01] duration-300">
            <div className="space-y-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br bg-green animate-pulse">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Campaign Live! ✨
              </h2>
              <p className="text-gray-600">
                Your Summer Skin Glow campaign is now active and ready for
                creators!
              </p>
              <div className="pt-6">
                <Link
                  href="/brand/view-campaigns"
                  className="inline-flex items-center justify-center text-sm px-8 py-3 border border-transparent font-light rounded-full shadow-lg text-white bg-green hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  View Campaign Dashboard
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="max-w-6xl mx-auto text-color">
            {/* Premium Beauty Campaign Card */}
            <section className="bg-white rounded-xl shadow overflow-hidden mb-10 transform transition-all hover:shadow-xl duration-300">
              {/* Luxury Gradient Header */}
              <div className="relative bg-gradient-to-r from-primary to-secondary px-10 py-6 text-center">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm"></div>
                </div>
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                    {campaignData.title}
                  </h1>
                  <p className="mt-5 text-white/90 max-w-2xl mx-auto leading-relaxed">
                    {campaignData.description}
                  </p>
                </div>
              </div>

              {/* Hero Cover Image */}
              <div className="px-10 pt-10">
                <div className="rounded-xl overflow-hidden border-[6px] border-white shadow relative group">
                  <img
                    className="w-full h-60 md:h-60 object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
                    src={campaignData.coverImage?.url}
                    alt="Summer Skin Glow Campaign"
                    onError={(e) => {
                      e.target.src = "/placeholder-beauty.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Campaign Details Sections */}
              <div className="divide-y divide-input">
                {/* Timeline Section */}
                <div className="px-10 py-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-4">
                      <BsCalendarDate className="text-primary text-xl" />
                    </div>
                    <h3 className=" font-semibold text-gray-900">
                      Campaign Timeline
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        label: "Start Date",
                        value: formatDate(campaignData.startDate),
                        icon: "📅",
                      },
                      {
                        label: "End Date",
                        value: formatDate(campaignData.endDate),
                        icon: "⏳",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      >
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {item.label}
                        </p>
                        <p className=" font-semibold text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Requirements */}
                <div className="px-10 py-4">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-4">
                      <MdOutlineSlowMotionVideo className="text-primary text-xl" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Content Specifications
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        label: "Videos Per Creator",
                        value:
                          campaignData.campaignPreferences.videosPerCreator,
                        icon: (
                          <RiVideoUploadLine className="text-2xl text-primary" />
                        ),
                      },
                      {
                        label: "Video Duration",
                        value: `${campaignData.campaignPreferences.videoDuration}s`,
                        icon: (
                          <MdOutlineSlowMotionVideo className="text-2xl text-primary" />
                        ),
                      },
                      {
                        label: "Video Format",
                        value: campaignData.campaignPreferences.videoFormat,
                        icon: (
                          <MdOutlineFormatShapes className="text-2xl text-primary" />
                        ),
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                      >
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                            {item.icon}
                          </div>
                          <h4 className="text-gray-900 text-sm">
                            {item.label}
                          </h4>
                        </div>
                        <p className="text-md text-center font-semibold text-primary">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Example Video */}
                  <div className="mt-8 bg-white p-6 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-4">
                        <RiVideoUploadLine className="text-primary text-xl" />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Example Video Reference
                      </h4>
                    </div>
                    <a
                      href={campaignData.exampleVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
                    >
                      <span className="truncate max-w-md">
                        {campaignData.exampleVideoUrl}
                      </span>
                      <FiExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Creative Brief */}
                <div className="px-10 py-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-4">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Creative Direction
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-4 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Brief Title
                      </h4>
                      <p className="text-lg font-bold text-primary">
                        {campaignData.briefTitle}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Detailed Brief
                      </h4>
                      <p className="text-gray-700 font-light leading-relaxed whitespace-pre-line">
                        {campaignData.briefDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Creator Preferences */}
                <div className="px-10 py-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-4">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Creator Preferences
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Show Face
                      </h4>
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                          campaignData.showFace
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        
                        {campaignData.campaignPreferences.showFace
                          ? "Yes, show face"
                          : "No face required"}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Social Channels
                      </h4>
                      <ul className="space-y-3">
                        {campaignData.campaignPreferences.socialChannels.map(
                          (item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="flex-shrink-0 h-6 w-6 text-primary">
                                <IoMdCheckmark className="" />
                              </div>
                              <span className="ml-3 text-gray-900 text-sm">
                                {item}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="md:col-span-2 bg-white p-4 rounded-xl border border-input shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Preferred Video Styles
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {campaignData.campaignPreferences.videoStyle.map(
                          (item, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                              <span className="mr-2">
                                {getVideoStyleIcon(item)}
                              </span>
                              {item}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex items-center justify-between px-4">
              <CustomizedBackButton
                onClick={() => dispatch(previousStep())}
                className="px-8 py-3.5 text-gray-700 hover:bg-gray-50 rounded-full border border-gray-200 transition-all duration-300 hover:-translate-x-1"
              >
                Back to Edit
              </CustomizedBackButton>
              <ButtonComponent
                disabled={loading}
                onClick={addCampaign}
                className="px-12 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {"Launching Campaign..."}
                  </span>
                ) : (
                  <>
                    <span className="mr-2">{"🚀"}</span>
                    {"Launch Campaign"}
                  </>
                )}
              </ButtonComponent>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignPreview;
