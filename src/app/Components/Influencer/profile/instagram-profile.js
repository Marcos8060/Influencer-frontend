"use client";
import { useAuth } from "@/assets/hooks/use-auth";
import {
  getInstagramProfile,
  getInstagramResponse,
  getTiktokProfile,
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
  getAllCampaigns,
  getAllPostInsights,
  getAllPosts,
} from "@/redux/features/stepper/campaign-stepper";
import PostToCampaignDialog from "./postToCampaignModal";
import { IoIosRefresh } from "react-icons/io";

const InstagramProfile = () => {
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { instagramProfile } = useSelector((store) => store.socials);
  const [isInstagramConnected, setisInstagramConnected] = useState(false);
  const { posts } = useSelector((store) => store.campaign);
  const [activeTab, setActiveTab] = useState("FEED");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const auth = useAuth();

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
        await dispatch(getAllCampaigns(auth));
      } catch (error) {
        // Optional: handle error here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth, dispatch]);

  useEffect(() => {
    dispatch(getAllCampaigns(auth))
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

  // Group posts by type
  const categorizedPosts = {
    FEED: posts.filter((post) => post.mediaProductType === "FEED"),
    REELS: posts.filter((post) => post.mediaProductType === "REELS"),
    CAROUSEL: posts.filter((post) => post.mediaType === "CAROUSEL_ALBUM"),
  };

  const handleInstagramLogin = async () => {
    try {
      const response = await dispatch(getInstagramResponse(auth));
      const authUrl = response.message;
      // Redirect user to TikTok's authorization page
      const url =
        "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1252453379876445&redirect_uri=https://influencer-frontend-nu.vercel.app/auth/instagram-callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";
      window.location.href = url;
    } catch (error) {
      console.error("Instagram auth failed:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getInstagramProfile(auth));
      if (response.statusCode === 404) {
        setisInstagramConnected(false);
      } else {
        setisInstagramConnected(true);
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
  }, []);
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
          {isInstagramConnected ? (
            <section className="flex flex-col items-center justify-center text-color">
              <div className="bg-white shadow-sm rounded-xl p-4">
                <section className="md:flex gap-6 justify-between">
                  <a href={instagramProfile?.profileDeepLink} target="_blank">
                    <img
                      className="h-26 w-26 mx-auto object-cover rounded-full"
                      src={instagramProfile?.profilePictureUrl}
                      alt=""
                    />
                  </a>
                  <div className="space-y-3">
                    <section className="flex items-center gap-2">
                      <p className="font-bold text-xl">
                        {instagramProfile?.name}
                      </p>
                      {instagramProfile?.isVerified && (
                        <MdVerifiedUser className="text-link" />
                      )}
                    </section>
                    <section>
                      <p>{instagramProfile?.username}</p>
                    </section>
                    <section className="flex items-center gap-6">
                      <p className="font-light">
                        <span className="font-bold">
                          {instagramProfile?.followsCount}
                        </span>{" "}
                        Following
                      </p>
                      <p className="font-light">
                        <span className="font-bold">
                          {instagramProfile?.followersCount}
                        </span>{" "}
                        Followers
                      </p>
                      <p className="font-light">
                        <span className="font-bold">
                          {instagramProfile?.mediaCount}
                        </span>{" "}
                        Posts
                      </p>
                    </section>
                    <section>
                      <p className="italic font-light text-sm">
                        {instagramProfile?.biography}
                      </p>
                    </section>
                  </div>
                  <div className=" text-color">
                    <button
                      onClick={handleInstagramLogin}
                      className="bg-gradient-to-r from-primary to-secondary border-rounded-xl text-xs text-white px-4 py-2 rounded"
                    >
                      Reconnect
                    </button>
                  </div>
                </section>
              </div>
            </section>
          ) : (
            <section className="flex items-center justify-center h-[50vh] text-color border border-dashed  border-primary rounded-xl">
              <button
                onClick={handleInstagramLogin}
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
                {/* Show first image as thumbnail */}
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={post?.mediaUrls[0]}
                  alt={`Post ${index + 1}`}
                />

                {/* Show overlay for multi-image posts */}
                {post?.mediaUrls?.length > 1 && (
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
                {/* Carousel */}
                <div className="flex items-center">
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 z-10 bg-white bg-opacity-30 rounded-full p-2 text-white hover:bg-opacity-50"
                  >
                    <FiChevronLeft className="h-6 w-6" />
                  </button>

                  <div className="w-full">
                    {selectedPost?.mediaType === "VIDEO" ? (
                      <video
                        controls
                        autoPlay
                        className="w-full max-h-[50vh] object-contain"
                        src={selectedPost?.mediaUrls[currentImageIndex]}
                      />
                    ) : (
                      <img
                        className="w-full max-h-[50vh] object-contain rounded"
                        src={selectedPost?.mediaUrls[currentImageIndex]}
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
                    {selectedPost?.mediaUrls.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full ${
                          idx === currentImageIndex ? "bg-white" : "bg-gray-500"
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
    </>
  );
};

export default InstagramProfile;
