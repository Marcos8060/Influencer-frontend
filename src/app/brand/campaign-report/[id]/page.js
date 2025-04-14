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
import { FiGrid, FiPlay, FiLayers } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const CampaignReport = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { posts } = useSelector((store) => store.campaign);
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState("FEED");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Group posts by type
  const categorizedPosts = {
    FEED: posts.filter((post) => post.mediaProductType === "FEED"),
    REELS: posts.filter((post) => post.mediaProductType === "REELS"),
    CAROUSEL: posts.filter((post) => post.mediaType === "CAROUSEL_ALBUM"),
  };

  const profileInfo = posts[0];

  const handleSubmit = async () => {
    try {
      const response = await dispatch(getAllPostInsights());
      console.log(response);
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

  const handleNext = () => {
    setCurrentCarouselIndex((prev) =>
      prev < categorizedPosts[activeTab].length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentCarouselIndex((prev) =>
      prev > 0 ? prev - 1 : categorizedPosts[activeTab].length - 1
    );
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
            <Skeleton
              baseColor="#c0c0c0"
              highlightColor="#f0f0f0"
              count={3}
              height={100}
            />
          ) : (
            <section>
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={profileInfo?.profilePictureUrl}
                    alt={profileInfo?.ownerName}
                  />
                  <div>
                    <h2 className="font-bold text-lg">
                      {profileInfo?.ownerName}
                    </h2>
                    <p className="text-sm text-gray-500">Nairobi, Kenya</p>
                  </div>
                </div>

                {/* Media Type Tabs */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("FEED")}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                      activeTab === "FEED"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    <FiGrid />
                    <span>Posts</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("REELS")}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                      activeTab === "REELS"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    <FiPlay />
                    <span>Reels</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("CAROUSEL")}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                      activeTab === "CAROUSEL"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    <FiLayers />
                    <span>Albums</span>
                  </button>
                </div>
              </div>
              <div className="relative">
                {categorizedPosts[activeTab].length > 0 ? (
                  <>
                    {/* Carousel Navigation */}
                    {categorizedPosts[activeTab].length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                        >
                          &lt;
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                        >
                          &gt;
                        </button>
                      </>
                    )}

                    {/* Current Media Item */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="p-4 border-b">
                        <p className="font-semibold">
                          {categorizedPosts[activeTab][currentCarouselIndex]
                            .caption || "No caption"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(
                            categorizedPosts[activeTab][
                              currentCarouselIndex
                            ].timestamp
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Media Content */}
                      <div className="relative">
                        {categorizedPosts[activeTab][currentCarouselIndex]
                          .mediaType === "VIDEO" ? (
                          <video
                            controls
                            className="w-full h-auto max-h-96 object-contain bg-black"
                            src={
                              categorizedPosts[activeTab][currentCarouselIndex]
                                .mediaUrls[0]
                            }
                          />
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                            {categorizedPosts[activeTab][
                              currentCarouselIndex
                            ].mediaUrls.map((media, idx) => (
                              <div key={idx} className="relative aspect-square">
                                <img
                                  className="w-full h-full object-cover rounded"
                                  src={media}
                                  alt={`Media ${idx + 1}`}
                                />
                                {categorizedPosts[activeTab][
                                  currentCarouselIndex
                                ].mediaUrls.length > 1 && (
                                  <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                    {idx + 1}/
                                    {
                                      categorizedPosts[activeTab][
                                        currentCarouselIndex
                                      ].mediaUrls.length
                                    }
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Media Info */}
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <FaHeart className="text-gray-600" />
                            <span>
                              {
                                categorizedPosts[activeTab][
                                  currentCarouselIndex
                                ].likeCount
                              }
                            </span>
                          </span>
                          <a
                            href={
                              categorizedPosts[activeTab][currentCarouselIndex]
                                .permalink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm"
                          >
                            View on Instagram
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-4 space-x-2">
                      {categorizedPosts[activeTab].map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentCarouselIndex(idx)}
                          className={`w-2 h-2 rounded-full ${
                            idx === currentCarouselIndex
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No {activeTab.toLowerCase()} found
                  </div>
                )}
              </div>
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
