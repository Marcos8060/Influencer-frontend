"use client";
import { useAuth } from "@/assets/hooks/use-auth";
import {
  getTiktokProfile,
  getTiktokResponse,
} from "@/redux/features/socials";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import {
  FiGrid,
  FiPlay,
  FiLayers,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import InsightsDrawer from "@/app/brand/campaign-report/insight-drawer";
import {
  getAllPostInsights,
  getAllPosts,
  getApprovedCampaigns,
} from "@/redux/features/stepper/campaign-stepper";
import PostToCampaignDialog from "./postToCampaignModal";
import { IoIosRefresh } from "react-icons/io";

const TiktokProfile = () => {
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { tiktokProfile } = useSelector((store) => store.socials);
  const [isTiktokConnected, setIsTiktokConnected] = useState(false);
  const { posts } = useSelector((store) => store.campaign);
  const [activeTab, setActiveTab] = useState("VIDEOS");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const auth = useAuth();

  const profileInfo = posts[1];

  const handleSubmit = async (id) => {
    try {
      const payload = {
        metrics: "likes,comments,shares,views,engagement",
        post_id: id,
        user_id: "40678282-c173-4788-89c9-14ea5596651e",
      };
      await dispatch(getAllPostInsights(auth, payload));
    } catch (error) {
      console.log(error);
    }
  };

  const userId = "40678282-c173-4788-89c9-14ea5596651e";

  const handleRefresh = async () => {
    try {
      setLoadingPosts(true);
      await dispatch(getAllPosts(auth, userId));
    } catch (error) {
      toast.error("Failed to refresh posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingPosts(true);
        await dispatch(getAllPosts(auth, userId));
      } catch (error) {
        // Optional: handle error here
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchData();
  }, [auth, userId, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getApprovedCampaigns(auth));
      } catch (error) {
        // Optional: handle error here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth, dispatch]);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev < selectedPost.mediaUrls.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev > 0 ? prev - 1 : selectedPost.mediaUrls.length - 1
    );
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setCurrentVideoIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  // Group posts by type
  const categorizedPosts = {
    VIDEOS: posts.filter((post) => post.mediaType === "VIDEO"),
    PHOTOS: posts.filter((post) => post.mediaType === "IMAGE"),
  };

  const handleTiktokLogin = async () => {
    try {
      const response = await dispatch(getTiktokResponse(auth));
      const authUrl = response.message;
      // Redirect user to TikTok's authorization page
      const url = `https://www.tiktok.com/auth/authorize?client_key=YOUR_CLIENT_KEY&response_type=code&scope=user.info.basic,video.list&redirect_uri=${encodeURIComponent("https://yourdomain.com/auth/tiktok-callback")}&state=YOUR_STATE`;
      window.location.href = url;
    } catch (error) {
      console.error("TikTok auth failed:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getTiktokProfile(auth));
      if (response.statusCode === 404) {
        setIsTiktokConnected(false);
      } else {
        setIsTiktokConnected(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchProfile();
    }
  }, [auth]);

  return (
    <>
      {loading ? (
        <Skeleton
          baseColor="#E6E7EB"
          highlightColor="#f0f0f0"
          count={4}
          height={100}
        />
      ) : (
        <>
          {isTiktokConnected ? (
            <section className="flex flex-col text-color">
              <div className="bg-white shadow-sm rounded-xl p-4">
                <section className="md:flex justify-between">
                  <div className="flex gap-4">
                    <a href={`https://tiktok.com/@${tiktokProfile?.username}`} target="_blank">
                      <img
                        className="h-20 w-20 mx-auto object-cover rounded-full"
                        src={tiktokProfile?.profilePictureUrl}
                        alt=""
                      />
                    </a>
                    <div className="space-y-3">
                      <section className="flex items-center gap-2">
                        <p className="font-bold text-xl">
                          {tiktokProfile?.displayName}
                        </p>
                        {tiktokProfile?.isVerified && (
                          <MdVerifiedUser className="text-link" />
                        )}
                      </section>
                      <section>
                        <p>@{tiktokProfile?.username}</p>
                      </section>
                      <section className="flex items-center gap-6">
                        <p className="font-light">
                          <span className="font-bold">
                            {tiktokProfile?.followingCount}
                          </span>{" "}
                          Following
                        </p>
                        <p className="font-light">
                          <span className="font-bold">
                            {tiktokProfile?.followerCount}
                          </span>{" "}
                          Followers
                        </p>
                        <p className="font-light">
                          <span className="font-bold">
                            {tiktokProfile?.videoCount}
                          </span>{" "}
                          Videos
                        </p>
                      </section>
                      <section>
                        <p className="italic font-light text-sm">
                          {tiktokProfile?.bio}
                        </p>
                      </section>
                    </div>
                  </div>
                  <div className=" text-color">
                    <button
                      onClick={handleTiktokLogin}
                      className="bg-gradient-to-r from-primary to-secondary border-rounded-xl text-xs text-white px-4 py-2 rounded"
                    >
                      Reconnect Account
                    </button>
                  </div>
                </section>
              </div>
            </section>
          ) : (
            <section className="flex items-center justify-center h-[50vh] text-color border border-dashed  border-primary rounded-xl">
              <button
                onClick={handleTiktokLogin}
                className="bg-gradient-to-r from-primary to-secondary text-xs text-white px-4 py-2 rounded"
              >
                Connect My Account
              </button>
            </section>
          )}
        </>
      )}

      {loadingPosts ? (
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
          <div className="relative flex flex-col md:flex-row items-center mt-8 mb-4 px-4 w-full">
            {/* Centered Tabs */}
            <div className="flex space-x-4 border-b border-input mx-auto">
              <button
                onClick={() => setActiveTab("VIDEOS")}
                className={`px-4 py-2 ${
                  activeTab === "VIDEOS"
                    ? "border-b-2 border-primary font-medium"
                    : "text-gray-500"
                }`}
              >
                <FiPlay className="inline mr-1" /> Videos
              </button>
              <button
                onClick={() => setActiveTab("PHOTOS")}
                className={`px-4 py-2 ${
                  activeTab === "PHOTOS"
                    ? "border-b-2 border-primary font-medium"
                    : "text-gray-500"
                }`}
              >
                <FiGrid className="inline mr-1" /> Photos
              </button>
            </div>

            {/* Refresh Icon at Far Right */}
            <div className="absolute right-8 cursor-pointer">
              <IoIosRefresh onClick={handleRefresh} className="text-xl" />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 px-4 justify-center">
            {categorizedPosts[activeTab]?.map((post, index) => (
              <div
                key={post.id}
                className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] cursor-pointer group rounded-lg overflow-hidden"
                onClick={() => openPost(post)}
              >
                {/* Show thumbnail */}
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={post?.thumbnailUrl || post?.mediaUrls[0]}
                  alt={`Post ${index + 1}`}
                />

                {/* Show play icon for videos */}
                {post?.mediaType === "VIDEO" && (
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
                      {post?.likeCount}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute bottom-2 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PostToCampaignDialog post={post} />
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
                {/* Video Player */}
                <div className="flex items-center">
                  {selectedPost.mediaUrls.length > 1 && (
                    <button
                      onClick={handlePrevVideo}
                      className="absolute left-4 z-10 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50"
                    >
                      <FiChevronLeft className="h-6 w-6" />
                    </button>
                  )}

                  <div className="w-full">
                    {selectedPost?.mediaType === "VIDEO" ? (
                      <video
                        controls
                        autoPlay
                        className="w-full max-h-[50vh] object-contain"
                        src={selectedPost?.mediaUrls[currentVideoIndex]}
                      />
                    ) : (
                      <img
                        className="w-full max-h-[50vh] object-contain rounded"
                        src={selectedPost?.mediaUrls[currentVideoIndex]}
                        alt={`Post content ${currentVideoIndex + 1}`}
                      />
                    )}
                  </div>

                  {selectedPost.mediaUrls.length > 1 && (
                    <button
                      onClick={handleNextVideo}
                      className="absolute right-4 z-10 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50"
                    >
                      <FiChevronRight className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {/* Video indicators */}
                {selectedPost.mediaUrls.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {selectedPost?.mediaUrls.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentVideoIndex(idx)}
                        className={`w-2 h-2 rounded-full ${
                          idx === currentVideoIndex ? "bg-white" : "bg-gray-500"
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
                        src={profileInfo?.profilePictureUrl}
                        alt={profileInfo?.ownerName}
                      />
                      <span className="font-semibold">
                        {profileInfo?.ownerName}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(selectedPost?.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-2 text-sm">
                    {selectedPost?.caption || "No caption"}
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
                        {selectedPost?.likeCount}
                      </span>
                      <a
                        href={selectedPost?.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link text-sm hover:underline"
                      >
                        View on TikTok
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
    </>
  );
};

export default TiktokProfile;