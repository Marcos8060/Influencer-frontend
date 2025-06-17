'use client'
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Tag,
  Tooltip,
  Avatar,
  Space,
} from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  TikTokOutlined,
  CheckCircleFilled,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CloseCircleFilled,
  ArrowLeftOutlined,
  MessageOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  updateCollaboratorStatus,
} from "@/redux/features/stepper/campaign-stepper";
import { getInfluencerProfileByBrand } from "@/redux/features/socials";
import { usePathname, useRouter } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { approveCampaignApplication } from "@/redux/services/campaign";
import { motion } from "framer-motion";
import SuccessButtonComponent from "@/app/Components/SharedComponents/SuccessButtonComponent";
import toast from "react-hot-toast";
import ChristmasAnimation from "@/app/Components/SharedComponents/ChristmasAnimation";
import ErrorButtonComponent from "@/app/Components/SharedComponents/ErrorButtonComponent";
import Link from "next/link";

const InfluencerProfile = () => {
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const { posts } = useSelector((store) => store.campaign);
  const { brandInfluencerProfile } = useSelector((store) => store.socials);
  const [loadApproval, setLoadApproval] = useState(false);
  const [loadRejection, setLoadRejection] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [buttonState, setButtonState] = useState({
    approveDisabled: false,
    rejectDisabled: false,
    approveLoading: false,
    rejectLoading: false
  });
  const pathname = usePathname();
  const segments = pathname.split("/");
  const campaignIdsegment = pathname?.split("/").filter(Boolean);
  const campaignId = campaignIdsegment?.[2];
  const influencerId = segments[segments.length - 1];

  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();
  const userId = "40678282-c173-4788-89c9-14ea5596651e";

  const collaboratorStatus = brandInfluencerProfile?.collaborator?.status;

  useEffect(() => {
    if (collaboratorStatus === "approved") {
      setButtonState(prev => ({
        ...prev,
        approveDisabled: true,
        rejectDisabled: false
      }));
    } else if (collaboratorStatus === "rejected") {
      setButtonState(prev => ({
        ...prev,
        approveDisabled: false,
        rejectDisabled: true
      }));
    } else {
      setButtonState(prev => ({
        ...prev,
        approveDisabled: false,
        rejectDisabled: false
      }));
    }
  }, [collaboratorStatus]);

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

  const fetchInfluencerProfile = async () => {
    try {
      setLoading(true);
      await dispatch(
        getInfluencerProfileByBrand(auth, influencerId, campaignId)
      );
    } catch (error) {
      // Optional: handle error here
    } finally {
      setLoading(false);
    }
  };

  const approveApplication = async () => {
    const payload = {
      campaignId: campaignId,
      influencerId: influencerId,
      status: "approved",
    };
    try {
      setButtonState(prev => ({
        ...prev,
        approveLoading: true
      }));
      const res = await approveCampaignApplication(auth, payload);
      if (res.status === 404) {
        toast.error(res.response.data.errorMessage[0]);
      } else {
        toast.success("Application approved successfully");
        setButtonState(prev => ({
          ...prev,
          approveDisabled: true,
          rejectDisabled: false,
          approveLoading: false
        }));
        
        dispatch(
          updateCollaboratorStatus({
            influencerId,
            campaignId,
            status: "approved",
          })
        );
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
      }
    } catch (error) {} finally {
      setButtonState(prev => ({
        ...prev,
        approveLoading: false
      }));
    }
  };

  const rejectApplication = async () => {
    const payload = {
      campaignId: campaignId,
      influencerId: influencerId,
      status: "rejected",
    };
    try {
      setButtonState(prev => ({
        ...prev,
        rejectLoading: true
      }));
      const res = await approveCampaignApplication(auth, payload);
      if (res.status === 404) {
        toast.error(res.response.data.errorMessage[0]);
      } else {
        toast.success("Application rejected successfully");
        setButtonState(prev => ({
          ...prev,
          approveDisabled: false,
          rejectDisabled: true,
          rejectLoading: false
        }));
        
        dispatch(
          updateCollaboratorStatus({
            influencerId,
            campaignId,
            status: "rejected",
          })
        );
      }
    } catch (error) {} finally {
      setButtonState(prev => ({
        ...prev,
        rejectLoading: false
      }));
    }
  };

  const handleStartChat = () => {
    const userId = brandInfluencerProfile?.userId;
    const fullName = encodeURIComponent(brandInfluencerProfile?.fullName || "");

    router.push(
      `/onboarding/brand/chat-box?userId=${userId}&fullName=${fullName}`
    );
  };

  useEffect(() => {
    fetchData();
    fetchInfluencerProfile();
  }, []);

  return (
    <div className="mx-auto p-4 md:p-8 text-color">
      {showAnimation && <ChristmasAnimation />}
      
      {/* Navigation Header with Chat Button */}
      <div className="flex items-center justify-between mb-8">
        <Link href={`/brand/campaign-report/${campaignId}`}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            className="hover:bg-gray-50 transition-colors text-gray-600"
          >
            Back to Campaign Details
          </Button>
        </Link>
        
        {/* Prominent Chat Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm"
            onClick={handleStartChat}
          >
            <MessageOutlined />
            Start Conversation
          </button>
        </motion.div>
      </div>

      {loading ? (
        <section className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              baseColor="#D1D5DB"
              highlightColor="#f0f0f0"
              height={100}
            />
          ))}
        </section>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Profile Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Avatar
                size={160}
                src={brandInfluencerProfile.profilePicture}
                className="border-4 border-white shadow-xl"
              />
              {brandInfluencerProfile.platformVerified && (
                <Badge
                  className="absolute -bottom-2 -right-2"
                  count={
                    <CheckCircleFilled className="text-blue-500 text-2xl" />
                  }
                />
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {brandInfluencerProfile.fullName}
                  <span className="text-gray-500 text-xl ml-2">
                    ({brandInfluencerProfile.age})
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag color="geekblue" className="flex items-center gap-1 px-3 py-1">
                    <GlobalOutlined /> {brandInfluencerProfile.country}
                  </Tag>
                  {brandInfluencerProfile.ethnicBackground?.map((ethnicity) => (
                    <Tag key={ethnicity} color="purple" className="px-3 py-1">
                      {ethnicity}
                    </Tag>
                  ))}
                  <Tag color="gold" className="px-3 py-1">{brandInfluencerProfile.gender}</Tag>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 md:mt-0">
                {/* Approve Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={approveApplication}
                    disabled={buttonState.approveDisabled || buttonState.approveLoading || buttonState.rejectLoading}
                    className={`
                      px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm
                      ${buttonState.approveDisabled 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : buttonState.approveLoading
                          ? 'border border-input text-gray-600 cursor-wait'
                          : 'text-green bg-white'
                      }
                    `}
                  >
                    {buttonState.approveLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {buttonState.approveDisabled ? 'Approved' : 'Approve'}
                        <CheckCircleFilled className={buttonState.approveDisabled ? 'text-green' : 'text-green'} />
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Reject Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={rejectApplication}
                    disabled={buttonState.rejectDisabled || buttonState.rejectLoading || buttonState.approveLoading}
                    className={`
                      px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm
                      ${buttonState.rejectDisabled 
                        ? 'bg-gray-200 text-red cursor-not-allowed' 
                        : buttonState.rejectLoading
                          ? 'bg-white text-gray-600 cursor-wait'
                          : 'text-red bg-white'
                      }
                    `}
                  >
                    {buttonState.rejectLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <div className="flex items-center gap-1">
                        {buttonState.rejectDisabled ? 'Rejected' : 'Reject'}
                        <CloseCircleFilled className={buttonState.rejectDisabled ? 'text-red' : 'text-red'} />
                      </div>
                    )}
                  </button>
                </motion.div>
              </div>
            </div>

            <p className="text-gray-700 text-md mb-6 leading-relaxed">
              {brandInfluencerProfile.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {brandInfluencerProfile.contentCategories?.map((category) => (
                <Tag key={category} color="blue" className="px-3 py-1">
                  {category}
                </Tag>
              ))}
              {brandInfluencerProfile.keywords?.map((keyword) => (
                <Tag key={keyword} color="cyan" className="px-3 py-1">
                  {keyword}
                </Tag>
              ))}
            </div>

            <div className="flex gap-3">
              {brandInfluencerProfile.isInstagramConnected && (
                <Tooltip title={`@${brandInfluencerProfile.instagramUsername}`}>
                  <Button
                    shape="circle"
                    icon={<InstagramOutlined />}
                    size="large"
                    className="hover:bg-pink-50 transition-colors"
                  />
                </Tooltip>
              )}
              {brandInfluencerProfile.isFacebookAccountConnected && (
                <Button
                  shape="circle"
                  icon={<FacebookOutlined />}
                  size="large"
                  className="hover:bg-blue-50 transition-colors"
                />
              )}
              {brandInfluencerProfile.isTwitterAccountConnected && (
                <Button
                  shape="circle"
                  icon={<TwitterOutlined />}
                  size="large"
                  className="hover:bg-sky-50 transition-colors"
                />
              )}
              {brandInfluencerProfile.isTiktokConnected && (
                <Tooltip title={`@${brandInfluencerProfile.tiktokUsername}`}>
                  <Button
                    shape="circle"
                    icon={<TikTokOutlined />}
                    size="large"
                    className="hover:bg-gray-50 transition-colors"
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}

      <Divider className="my-8" />

      {/* Stats Cards */}
      {loading ? (
        <section className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              baseColor="#D1D5DB"
              highlightColor="#f0f0f0"
              height={100}
            />
          ))}
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow border-0">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                <InstagramOutlined className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Instagram</h3>
                <p className="text-2xl font-bold">
                  {brandInfluencerProfile.instagram?.followersCount?.toLocaleString() ||
                    "N/A"}
                  <span className="text-gray-500 text-sm ml-1">followers</span>
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>
                    {brandInfluencerProfile.instagram.mediaCount} posts
                  </span>
                  <span>
                    {brandInfluencerProfile.instagram.followsCount} following
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                <TikTokOutlined className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">TikTok</h3>
                <p className="text-2xl font-bold">
                  {brandInfluencerProfile.tiktok.followerCount?.toLocaleString() ||
                    "N/A"}
                  <span className="text-gray-500 text-sm ml-1">followers</span>
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{brandInfluencerProfile.tiktok.videoCount} videos</span>
                  <span>
                    {brandInfluencerProfile.tiktok.followingCount} following
                  </span>
                  <span>{brandInfluencerProfile.tiktok.likesCount} likes</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
                <CheckCircleFilled className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Engagement</h3>
                <p className="text-2xl font-bold">
                  {brandInfluencerProfile?.overallRate}
                  <span className="text-gray-500 text-sm ml-1">rating</span>
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  {/* <span>{brandInfluencerProfile.totalRates} reviews</span> */}
                  <Tag
                    color={
                      brandInfluencerProfile.isAvailableForCollaboration
                        ? "green"
                        : "red"
                    }
                    className="px-2"
                  >
                    {brandInfluencerProfile.isAvailableForCollaboration
                      ? "Available"
                      : "Not Available"}
                  </Tag>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bio and Contact Section */}
      {loading ? (
        <section className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              baseColor="#D1D5DB"
              highlightColor="#f0f0f0"
              height={100}
            />
          ))}
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card title="About" className="hover:shadow-lg transition-shadow border-0">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {brandInfluencerProfile.instagramBiography ||
                  brandInfluencerProfile.bio}
              </p>
              <Divider className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <MailOutlined className="text-gray-400" />
                  <span>{brandInfluencerProfile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <PhoneOutlined className="text-gray-400" />
                  <span>{brandInfluencerProfile.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <EnvironmentOutlined className="text-gray-400" />
                  <span>
                    {brandInfluencerProfile.addressLine1},{" "}
                    {brandInfluencerProfile.addressLine2 &&
                      `${brandInfluencerProfile.addressLine2}, `}
                    {brandInfluencerProfile.city},{" "}
                    {brandInfluencerProfile.country}{" "}
                    {brandInfluencerProfile.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Platform Introduction"
            className="hover:shadow-lg transition-shadow border-0"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">Primary Platform:</span>
                <Tag color="blue" className="px-3 py-1">
                  {brandInfluencerProfile.platformIntroductionSource}
                </Tag>
              </div>

              <Divider className="my-4" />

              <div>
                <h4 className="font-medium mb-2 text-gray-700">TikTok Bio:</h4>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {brandInfluencerProfile.tiktokBioDescription ||
                    "No bio available"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Media Highlights Section */}
      {loadingPosts ? (
        <section className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              baseColor="#D1D5DB"
              highlightColor="#f0f0f0"
              height={100}
            />
          ))}
        </section>
      ) : (
        <Card
          title="Media Highlights"
          className="mb-8 hover:shadow-lg transition-shadow border-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {posts?.[0]?.mediaUrls?.slice(0, 5).map((url, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden group relative"
              >
                <img
                  src={url}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" dy=".5em" text-anchor="middle" x="150" y="150"%3EImage Not Available%3C/text%3E%3C/svg%3E';
                    e.currentTarget.className =
                      "w-full h-full object-contain bg-gray-100";
                  }}
                />
              </div>
            ))}
          </div>

          {posts?.[0]?.permalink && (
            <div className="mt-4 text-center">
              <a
                href={posts[0].permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                View on Instagram
                <ArrowRightOutlined className="text-sm" />
              </a>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default InfluencerProfile;