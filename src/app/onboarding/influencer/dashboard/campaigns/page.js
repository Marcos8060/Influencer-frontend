"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { IoMdCheckmark } from "react-icons/io";
import { useAuth } from "@/assets/hooks/use-auth";
import { applyCampaign } from "@/redux/services/campaign";
import toast from "react-hot-toast";
import { FaUsersBetweenLines, FaBoxOpen } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { MdCampaign } from "react-icons/md";
import AppliedCampaignsTable from "@/app/Components/Influencer/Applied-Campaigns";
import ApprovedCampaignsTable from "@/app/Components/Influencer/Approved-Campaigns";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import { motion, AnimatePresence } from "framer-motion";

const Campaigns = () => {
  const { allCampaigns } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);

  const isAuthorized = useProtectedRoute();

  useEffect(() => {
    if (auth) {
      fetchAllCampaigns();
    }
  }, [auth]);

  useEffect(() => {
    if (!selectedCampaign && allCampaigns.length > 0) {
      setSelectedCampaign(allCampaigns[0]);
    }
  }, [allCampaigns]);

  const fetchAllCampaigns = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaigns(auth));
    } catch (error) {
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (id) => {
    try {
      setApplyLoading(true);
      const response = await applyCampaign(auth, id);
      if (response.status === 200) {
        toast.success("Application sent successfully");
        setApplied(true);
        fetchAllCampaigns();
      } else {
        toast.error(response.response.data.errorMessage[0]);
      }
    } catch (error) {
      toast.error("Application failed");
    } finally {
      setApplyLoading(false);
    }
  };

  const renderTab = (tabId, Icon, label) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setCurrentTab(tabId)}
      className={`cursor-pointer flex items-center gap-3 px-6 py-3 rounded-t-lg transition-all ${
        currentTab === tabId
          ? "bg-white text-primary font-semibold shadow-sm"
          : "text-gray-500 hover:text-primary hover:bg-gray-50"
      }`}
    >
      <Icon className="text-xl" />
      <span className="text-sm md:text-base">{label}</span>
    </motion.div>
  );

  if (!isAuthorized) return null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto text-color">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-color to-secondary text-transparent bg-clip-text">Campaign Dashboard</h1>
        <p className="text-gray-500 mt-2">
          {currentTab === 1
            ? "Browse and apply to available campaigns"
            : currentTab === 2
            ? "View your applied campaigns"
            : "View your approved campaigns"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex border-b border-input space-x-1">
          {renderTab(1, FaUsersBetweenLines, "All Campaigns")}
          {renderTab(2, AiOutlineShopping, "Applied Campaigns")}
          {renderTab(3, MdCampaign, "Approved Campaigns")}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {currentTab === 1 && (
            <>
              {allCampaigns.length === 0 && !loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[60vh] flex flex-col items-center justify-center text-center text-gray-400 space-y-4"
                >
                  <FaBoxOpen className="text-7xl opacity-60" />
                  <p className="text-lg font-light">No Active Campaigns at the Moment</p>
                  <p className="text-sm max-w-md">
                    Check back later or explore other sections of the platform.
                  </p>
                </motion.div>
              ) : (
                <div className="md:flex gap-6">
                  {/* Campaign List */}
                  <div className="md:w-5/12 space-y-3 overflow-auto max-h-[80vh] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {loading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={100} className="rounded-xl mb-3" />
                      ))
                    ) : (
                      allCampaigns.map((campaign) => (
                        <motion.div
                          key={campaign.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setApplied(false);
                          }}
                          className={`cursor-pointer p-4 rounded-xl shadow-sm transition-all border ${
                            selectedCampaign?.id === campaign.id
                              ? "border-2 border-primary bg-gradient-to-r from-primary/5 to-white"
                              : "border-input hover:border-primary/30 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-primary font-bold line-clamp-1">
                                {campaign.title}
                              </h2>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                {campaign.subTitle}
                              </p>
                              <p className="text-xs mt-2 text-gray-600 line-clamp-2">
                                {campaign.briefTitle}
                              </p>
                            </div>
                            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full whitespace-nowrap">
                              {campaign.preferences.videosPerCreator} videos
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Campaign Details */}
                  <div className="md:w-7/12 mt-6 md:mt-0 space-y-6">
                    {applied ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[60vh] flex items-center justify-center bg-white rounded-xl shadow-sm p-6 text-center border border-input"
                      >
                        <div className="space-y-4 max-w-md mx-auto">
                          <div className="relative">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                className="w-12 h-12 text-green-500"
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
                          </div>
                          <h2 className="text-2xl font-semibold text-gray-800">
                            Application Sent!
                          </h2>
                          <p className="text-gray-500">
                            Your application is now pending approval. You'll receive a notification
                            once it's reviewed.
                          </p>
                          <button
                            onClick={() => setApplied(false)}
                            className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Back to Campaign
                          </button>
                        </div>
                      </motion.div>
                    ) : selectedCampaign ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl shadow-sm p-6 space-y-6 border border-input"
                      >
                        <div className="space-y-2">
                          <h1 className="text-2xl font-bold text-gray-800 text-center">
                            {selectedCampaign.title}
                          </h1>
                          <p className="text-gray-500 text-center text-sm">
                            {selectedCampaign.subTitle}
                          </p>
                        </div>

                        <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
                          <img
                            src={selectedCampaign.coverImageUrl}
                            alt="Campaign cover"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-4">
                            <div className="flex space-x-2">
                              <div className="bg-primary text-white text-xs px-2 py-1 rounded">
                                {selectedCampaign.preferences.videosPerCreator} videos
                              </div>
                              <div className="bg-white text-primary text-xs px-2 py-1 rounded">
                                {selectedCampaign.preferences.videoDuration}s duration
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Campaign Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                              {selectedCampaign.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Timeline</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between font-light">
                                  <span className="text-gray-500">Start Date:</span>
                                  <span className="font-medium text-sm">
                                    {selectedCampaign.startDate}
                                  </span>
                                </div>
                                <div className="flex justify-between font-light">
                                  <span className="text-gray-500">End Date:</span>
                                  <span className="font-medium text-sm">{selectedCampaign.endDate}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Requirements</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between font-light">
                                  <span className="text-gray-500">Show Face:</span>
                                  <span className="font-medium text-sm">
                                    {selectedCampaign.showFace ? "Required" : "Not Required"}
                                  </span>
                                </div>
                                <div className="flex justify-between font-light">
                                  <span className="text-gray-500">Format:</span>
                                  <span className="font-medium text-sm">
                                    {selectedCampaign.preferences.videoFormat}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-2">Example Video</h4>
                            <a
                              href={selectedCampaign.exampleVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-dark underline text-sm flex items-center"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Watch example video
                            </a>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-2">Social Channels</h4>
                              <ul className="space-y-2">
                                {Array.isArray(selectedCampaign.preferences?.socialChannels) && selectedCampaign.preferences?.socialChannels.map(
                                  (channel, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                      <IoMdCheckmark className="text-green-500" /> {channel}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-2">Video Style</h4>
                              <ul className="space-y-2">
                                {Array.isArray(selectedCampaign.preferences.videoStyle) && selectedCampaign.preferences.videoStyle.map((style, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-gray-600"
                                  >
                                    <IoMdCheckmark className="text-green-500" /> {style}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleApply(selectedCampaign.id)}
                            disabled={applyLoading}
                            className={`px-6 py-3 rounded-sm font-medium text-white transition-all ${
                              applyLoading
                                ? "bg-primary/70 cursor-not-allowed"
                                : "bg-primary text-sm hover:bg-primary-dark shadow-md"
                            }`}
                          >
                            {applyLoading ? (
                              <div className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Processing...
                              </div>
                            ) : (
                              "Apply to Campaign"
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <Skeleton height={400} className="rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {currentTab === 2 && <AppliedCampaignsTable />}
          {currentTab === 3 && <ApprovedCampaignsTable />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Campaigns;