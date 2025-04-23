"use client";
import { useAuth } from "@/assets/hooks/use-auth";
import { getAllTiktokPosts, getTiktokProfile, getTiktokResponse } from "@/redux/features/socials";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { FiGrid, FiPlay, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoIosRefresh } from "react-icons/io";
import PostToCampaignDialog from "./postToCampaignModal";

const TiktokProfile = () => {
  const [loading, setLoading] = useState(false);
  const { tiktokProfile, tiktokPosts } = useSelector((store) => store.socials);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isTiktokConnected, setIsTiktokConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("VIDEOS");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const dispatch = useDispatch();
  const auth = useAuth();

  // Map TikTok API response to component format
  const mapTikTokPosts = (posts) => {
    return posts?.map(post => ({
      id: post.id,
      mediaType: "VIDEO",
      mediaUrls: [post.embedLink || post.shareUrl],
      thumbnailUrl: post.coverImageUrl,
      permalink: post.shareUrl,
      caption: post.videoDescription || post.title || "",
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      shareCount: post.shareCount,
      viewCount: post.viewCount,
      timestamp: post.createTime,
      // Add owner info from profile
      ownerName: tiktokProfile?.displayName,
      profilePictureUrl: tiktokProfile?.avatarUrl
    })) || [];
  };

  const handleTiktokLogin = async () => {
    try {
      const response = await dispatch(getTiktokResponse(auth));
      window.location.href = response.message;
    } catch (error) {
      console.error("TikTok auth failed:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getTiktokProfile(auth));
      setIsTiktokConnected(response.statusCode !== 404);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoadingPosts(true);
      await dispatch(getAllTiktokPosts(auth));
    } catch (error) {
      console.error("Failed to refresh posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const openPost = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingPosts(true);
        await dispatch(getAllTiktokPosts(auth));
      } catch (error) {
        console.error("Error fetching TikTok posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    if (auth) {
      fetchProfile();
      fetchData();
    }
  }, [auth, dispatch]);


  const categorizedPosts = {
    VIDEOS: mapTikTokPosts(tiktokPosts),
    PHOTOS: [], // TikTok doesn't have standalone photos
  };

  return (
    <>
      {loading ? (
        <Skeleton baseColor="#E6E7EB" highlightColor="#f0f0f0" count={3} height={100} />
      ) : (
        <>
          {isTiktokConnected ? (
            <section className="flex flex-col text-color">
              <div className="bg-white shadow-sm rounded-xl p-4">
                <section className="md:flex justify-between">
                  <div className="flex gap-4">
                    <a href={`https://tiktok.com/@${tiktokProfile?.username}`} target="_blank" rel="noopener noreferrer">
                      <img
                        className="h-20 w-20 mx-auto object-cover rounded-full"
                        src={tiktokProfile?.avatarUrl}
                        alt="TikTok profile"
                      />
                    </a>
                    <div className="space-y-3">
                      <section className="flex items-center gap-2">
                        <p className="font-bold text-xl">{tiktokProfile?.displayName}</p>
                        {tiktokProfile?.isVerified && <MdVerifiedUser className="text-link" />}
                      </section>
                      <section>
                        <p>@{tiktokProfile?.username}</p>
                      </section>
                      <section className="flex items-center gap-6">
                        <p className="font-light">
                          <span className="font-bold">{tiktokProfile?.followingCount}</span> Following
                        </p>
                        <p className="font-light">
                          <span className="font-bold">{tiktokProfile?.followerCount}</span> Followers
                        </p>
                        <p className="font-light">
                          <span className="font-bold">{tiktokProfile?.likesCount}</span> Likes
                        </p>
                      </section>
                      <section>
                        <p className="italic font-light text-sm">{tiktokProfile?.bioDescription}</p>
                      </section>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleTiktokLogin}
                      className="bg-gradient-to-r from-primary to-secondary text-xs text-white px-4 py-2 rounded"
                    >
                      Reconnect Account
                    </button>
                  </div>
                </section>
              </div>
            </section>
          ) : (
            <section className="flex items-center justify-center h-[50vh] text-color border border-dashed border-primary rounded-xl">
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
            <Skeleton key={idx} baseColor="#D1D5DB" highlightColor="#f0f0f0" height={100} />
          ))}
        </section>
      ) : (
        <section>
          <div className="relative flex flex-col md:flex-row items-center mt-8 mb-4 px-4 w-full">
            <div className="flex space-x-4 border-b border-input mx-auto">
              <button
                onClick={() => setActiveTab("VIDEOS")}
                className={`px-4 py-2 ${
                  activeTab === "VIDEOS" ? "border-b-2 border-primary font-medium" : "text-gray-500"
                }`}
              >
                <FiPlay className="inline mr-1" /> Videos
              </button>
            </div>
            <div className="absolute right-8 cursor-pointer">
              <IoIosRefresh onClick={handleRefresh} className="text-xl" />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 px-4 justify-center">
            {categorizedPosts[activeTab]?.map((post, index) => (
              <div
                key={post.id}
                className="relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] cursor-pointer group rounded-lg overflow-hidden"
                onClick={() => openPost(post)}
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={post.thumbnailUrl}
                  alt={`TikTok video ${index + 1}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiPlay className="h-8 w-8 text-white" />
                </div>
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
                <div
                  className="absolute bottom-2 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PostToCampaignDialog post={post} />
                </div>
              </div>
            ))}
          </div>

          {selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-85 z-50 flex items-center justify-center p-4">
              <button onClick={closePost} className="absolute top-4 right-4 text-white text-2xl">
                <FiX className="h-8 w-8" />
              </button>

              <div className="relative max-w-4xl w-full max-h-screen">
                <div className="w-full bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={selectedPost.mediaUrls[0]}
                    className="w-full h-[50vh]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-white p-4 mt-4 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={selectedPost.profilePictureUrl}
                        alt={selectedPost.ownerName}
                      />
                      <span className="font-semibold">{selectedPost.ownerName}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(selectedPost.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-2 text-sm">{selectedPost.caption}</p>

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
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        {selectedPost.commentCount}
                      </span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        {selectedPost.shareCount}
                      </span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1 text-purple-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {selectedPost.viewCount}
                      </span>
                      <a
                        href={selectedPost.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link text-sm hover:underline"
                      >
                        View on TikTok
                      </a>
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