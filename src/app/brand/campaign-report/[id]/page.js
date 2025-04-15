"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostInsights,
  getAllPosts,
} from "@/redux/features/stepper/campaign-stepper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "@/assets/hooks/use-auth";
import {
  FiGrid,
  FiPlay,
  FiLayers,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import InsightsDrawer from "../insight-drawer";

const CampaignReport = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { posts } = useSelector((store) => store.campaign);
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("FEED");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // Group posts by type
  const categorizedPosts = {
    FEED: posts.filter((post) => post.mediaProductType === "FEED"),
    REELS: posts.filter((post) => post.mediaProductType === "REELS"),
    CAROUSEL: posts.filter((post) => post.mediaType === "CAROUSEL_ALBUM"),
  };

  const profileInfo = posts[1];

  const handleSubmit = async (id) => {
    try {
      const payload = {
        metrics:
          "comments, follows, likes, profile_activity, profile_visits, reach, saved, shares, total_interactions, views",
        post_id: id,
        user_id: "40678282-c173-4788-89c9-14ea5596651e",
      };
      await dispatch(getAllPostInsights(auth, payload));
    } catch (error) {
      console.log(error);
    }
  };

  const userId = "40678282-c173-4788-89c9-14ea5596651e";

  useEffect(() => {
    dispatch(getAllPosts(auth, userId))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [auth]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < selectedPost.mediaUrls.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : selectedPost.mediaUrls.length - 1
    );
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <div className="bg-background">
      <section className=" text-link w-full mx-auto rounded p-4 flex gap-2 items-center">
        <HiOutlineArrowNarrowLeft />
        <Link
          href="/brand/influencer-discovery"
          className="font-semibold text-sm"
        >
          Back to Influencer Discovery
        </Link>
      </section>
      <section className="p-4 text-color space-y-8 mb-8">
        <div className="w-full mx-auto space-y-4">
          <section className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Active Influencers</p>
                <FaUsersViewfinder className="text-xl" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">23</p>
                <small className="text-secondary text-xs font-semibold">
                  Awaiting Approval
                </small>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Influencer Posts</p>
                <MdWorkHistory className="text-xl text-green" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">18</p>
                <small className="text-green text-xs font-semibold">
                  Total Offers
                </small>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Total Reach</p>
                <AiOutlineShopping className="text-xl" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">12</p>
                <small className="text-secondary text-xs font-semibold">
                  Approaching Deadlines
                </small>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-color shadow-lg text-center space-y-4">
              <div className="flex gap-2 items-center justify-between">
                <p className="font-light">Average Likes</p>
                <FaUsersBetweenLines className="text-xl" />
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-2xl">12%</p>
                <small className="text-primary text-xs font-semibold">
                  Average Engagement
                </small>
              </div>
            </div>
          </section>

          {loading ? (
            <section className="grid grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 16 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  baseColor="#D1D5DB"
                  highlightColor="#f0f0f0"
                  height={100}
                />
              ))}
            </section>
          ) : (
            <section className="">
              <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-4 px-4">
                <div className="flex items-center space-x-2 mb-6 md:mb-0">
                  <img
                    className="w-16 h-16 rounded-full object-cover border border-input"
                    src={profileInfo.profilePictureUrl}
                    alt={profileInfo.ownerName}
                  />
                  <div>
                    <h1 className="font-semibold">{profileInfo.ownerName}</h1>
                  </div>
                </div>

                {/* Media Type Tabs */}
                <div className="flex space-x-4 border-b border-input w-full md:w-auto">
                  <button
                    onClick={() => setActiveTab("FEED")}
                    className={`px-4 py-2 ${
                      activeTab === "FEED"
                        ? "border-b-2 border-primary font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    <FiGrid className="inline mr-1" /> Posts
                  </button>
                  <button
                    onClick={() => setActiveTab("REELS")}
                    className={`px-4 py-2 ${
                      activeTab === "REELS"
                        ? "border-b-2 border-primary font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    <FiPlay className="inline mr-1" /> Reels
                  </button>
                  <button
                    onClick={() => setActiveTab("CAROUSEL")}
                    className={`px-4 py-2 ${
                      activeTab === "CAROUSEL"
                        ? "border-b-2 border-primary font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    <FiLayers className="inline mr-1" /> Albums
                  </button>
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-3 gap-1 md:gap-4 px-4">
                {categorizedPosts[activeTab]?.map((post, index) => (
                  <div
                    key={post.id}
                    className="relative aspect-square cursor-pointer group"
                    onClick={() => openPost(post)}
                  >
                    {/* Show first image as thumbnail */}
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={post.mediaUrls[0]}
                      alt={`Post ${index + 1}`}
                    />

                    {/* Show overlay for multi-image posts */}
                    {post.mediaUrls.length > 1 && (
                      <div className="absolute top-2 right-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Show play icon for videos */}
                    {post.mediaType === "VIDEO" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiPlay className="h-8 w-8 text-white" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 flex space-x-4">
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {post.likeCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Modal */}
              {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-85 z-50 flex items-center justify-center p-4">
                  <button
                    onClick={closePost}
                    className="absolute top-4 right-4 text-white text-2xl"
                  >
                    <FiX className="h-8 w-8" />
                  </button>

                  <div className="relative max-w-4xl w-full max-h-screen">
                    {/* Carousel */}
                    <div className="flex items-center">
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 z-10 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50"
                      >
                        <FiChevronLeft className="h-6 w-6" />
                      </button>

                      <div className="w-full">
                        {selectedPost.mediaType === "VIDEO" ? (
                          <video
                            controls
                            autoPlay
                            className="w-full max-h-[50vh] object-contain"
                            src={selectedPost.mediaUrls[currentImageIndex]}
                          />
                        ) : (
                          <img
                            className="w-full max-h-[50vh] object-contain rounded"
                            src={selectedPost.mediaUrls[currentImageIndex]}
                            alt={`Post content ${currentImageIndex + 1}`}
                          />
                        )}
                      </div>

                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 z-10 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50"
                      >
                        <FiChevronRight className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Image indicators */}
                    {selectedPost.mediaUrls.length > 1 && (
                      <div className="flex justify-center mt-4 space-x-2">
                        {selectedPost.mediaUrls.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentImageIndex
                                ? "bg-white"
                                : "bg-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Post info */}
                    <div className="bg-white p-4 mt-4 rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={profileInfo.profilePictureUrl}
                            alt={profileInfo.ownerName}
                          />
                          <span className="font-semibold">
                            {profileInfo.ownerName}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {new Date(
                            selectedPost.timestamp
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="mt-2 text-sm">
                        {selectedPost.caption || "No caption"}
                      </p>

                      <section className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            {selectedPost.likeCount}
                          </span>
                          <a
                            href={selectedPost.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link text-sm hover:underline"
                          >
                            View on Instagram
                          </a>
                        </div>
                        <div>
                          <InsightsDrawer
                            handleSubmit={handleSubmit}
                            selectedPost={selectedPost}
                            loading={loading}
                          />
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        <section className="w-full mx-auto overflow-hidden">
          <h1 className="text-xl font-semibold my-2">Best Perfoming Media</h1>
          <div className="grid md:grid-cols-6 grid-cols-3 gap-3">
            <div className="">
              <img className="" src="/images/report.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report1.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report2.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report3.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report4.png" alt="" />
            </div>
            <div className="">
              <img className="" src="/images/report4.png" alt="" />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default CampaignReport;
