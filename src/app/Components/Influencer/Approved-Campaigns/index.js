"use client";
import React, { useState, useEffect } from "react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { getApprovedCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { 
  FaBoxOpen, 
  FaCalendarAlt, 
  FaClock, 
  FaVideo, 
  FaUsers, 
  FaEye,
  FaPlay,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaCheckCircle,
  FaExternalLinkAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa6";


const ApprovedCampaignsTable = () => {
  const { approvedCampaigns } = useSelector((store) => store.campaign);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(approvedCampaigns?.length / itemsPerPage);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = Array.isArray(approvedCampaigns) &&
    approvedCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const getCampaigns = async () => {
    try {
      setLoading(true);
      await dispatch(getApprovedCampaigns(auth));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      getCampaigns();
    }
  }, [auth]);

  const handleViewProfile = (data) => {
    localStorage.setItem("influencerData", JSON.stringify(data));
    router.push(`/brand/campaign-report/${data.brandId}`);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Instagram Posts":
        return <FaInstagram className="text-pink-500" />;
      case "Tiktok Posts":
        return <FaTiktok className="text-black" />;
      case "YouTube Videos":
        return <FaYoutube className="text-red-500" />;
      default:
        return <FaInstagram />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={300} className="rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {currentData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentData.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Campaign Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={campaign.coverImageUrl}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-campaign.jpg";
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <FaCheckCircle className="text-green-600" />
                          Approved
                        </span>
                      </div>
                      {campaign.exampleVideoUrl && (
                        <div className="absolute bottom-3 left-3">
                          <a
                            href={campaign.exampleVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <FaPlay className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Campaign Content */}
                    <div className="p-4 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 mb-2">
                          {campaign.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {campaign.description}
                        </p>
                      </div>

                      {/* Campaign Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <FaVideo className="text-primary text-sm" />
                            <span className="text-xs font-medium">Videos</span>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {campaign.preferences?.videosPerCreator || 0}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <FaUsers className="text-primary text-sm" />
                            <span className="text-xs font-medium">Influencers</span>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {campaign.numberOfInfluencers || 0}
                          </p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <FaCalendarAlt className="text-primary text-sm" />
                          <span className="text-xs font-medium">Timeline</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Start:</span>
                            <span className="font-medium">{formatDate(campaign.startDate)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">End:</span>
                            <span className="font-medium">{formatDate(campaign.endDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Platforms */}
                      {campaign.preferences?.socialChannels && campaign.preferences.socialChannels.length > 0 && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <FaInstagram className="text-primary text-sm" />
                            <span className="text-xs font-medium">Platforms</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {campaign.preferences.socialChannels.slice(0, 3).map((channel, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs">
                                {getPlatformIcon(channel)}
                                <span className="text-gray-700">{channel.split(' ')[0]}</span>
                              </div>
                            ))}
                            {campaign.preferences.socialChannels.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{campaign.preferences.socialChannels.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProfile(campaign)}
                          className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <FaEye />
                          View Profile
                        </button>
                        {campaign.exampleVideoUrl && (
                          <a
                            href={campaign.exampleVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiArrowLongLeft />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === index + 1
                            ? "bg-primary text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <HiArrowLongRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[60vh] flex flex-col items-center justify-center text-center"
            >
              <FaTrophy className="text-8xl text-gray mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Approved Campaigns
              </h3>
              <p className="text-gray-500 max-w-md">
                You don't have any approved campaigns yet. Keep applying to campaigns and you'll see them here once approved!
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ApprovedCampaignsTable;
