"use client";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Progress,
  Tag,
  Tooltip,
  Avatar,
  Space,
  Rate,
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
} from "@ant-design/icons";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/redux/features/stepper/campaign-stepper";
import { getInfluencerProfileByBrand } from "@/redux/features/socials";
import { usePathname } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { approveCampaignApplication } from "@/redux/services/campaign";
import { motion } from "framer-motion";
import { set } from "date-fns";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
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
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [collaboratorStatus, setCollaboratorStatus] = useState(undefined);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const campaignIdsegment = pathname?.split("/").filter(Boolean);
  const campaignId = campaignIdsegment?.[2];
  const influencerId = segments[segments.length - 1];

  const dispatch = useDispatch();
  const auth = useAuth();
  const userId = "40678282-c173-4788-89c9-14ea5596651e";

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
    // const page = 'campaignCollaborator'
    try {
      setLoading(true);
      await dispatch(getInfluencerProfileByBrand(auth, influencerId,campaignId));
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
      setLoadApproval(true);
      const res = await approveCampaignApplication(auth, payload);
      if (res.status === 404) {
        toast.error(res.response.data.errorMessage[0]);
      } else {
        toast.success("Approval Successful");
        setApproved(true);
        setCollaboratorStatus("approved");
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 6000);
      }
    } catch (error) {
    } finally {
      setLoadApproval(false);
    }
  };

  const rejectApplication = async () => {
    const payload = {
      campaignId: campaignId,
      influencerId: influencerId,
      status: "rejected",
    };
    try {
      setLoadRejection(true);
      const res = await approveCampaignApplication(auth, payload);
      if (res.status === 404) {
        toast.error(res.response.data.errorMessage[0]);
      } else {
        toast.success("Rejection Successful");
        setRejected(true);
        setCollaboratorStatus("rejected");
      }
    } catch (error) {
    } finally {
      setLoadRejection(false);
    }
  };

  useEffect(() => {
    if (brandInfluencerProfile?.collaborator?.status) {
      setCollaboratorStatus(brandInfluencerProfile.collaborator.status);
    }
  }, [brandInfluencerProfile]);

  useEffect(() => {
    fetchData();
    fetchInfluencerProfile();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 text-color">
      {showAnimation && <ChristmasAnimation />}
      {/* Profile Header */}
      <Space style={{ marginBottom: 24 }}>
          <Link href={`/brand/campaign-report/${campaignId}`}>
            <Button type="text" icon={<ArrowLeftOutlined />}>
              Back to Campaigns Details
            </Button>
          </Link>
        </Space>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {brandInfluencerProfile.fullName}
                  <span className="text-gray-500 text-xl ml-2">
                    ({brandInfluencerProfile.age})
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Tag color="geekblue" className="flex items-center gap-1">
                    <GlobalOutlined /> {brandInfluencerProfile.country}
                  </Tag>
                  {brandInfluencerProfile.ethnicBackground?.map((ethnicity) => (
                    <Tag key={ethnicity} color="purple">
                      {ethnicity}
                    </Tag>
                  ))}
                  <Tag color="gold">{brandInfluencerProfile.gender}</Tag>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-md mb-4">
              {brandInfluencerProfile.bio}
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              {brandInfluencerProfile.contentCategories?.map((category) => (
                <Tag key={category} color="blue">
                  {category}
                </Tag>
              ))}
              {brandInfluencerProfile.keywords?.map((keyword) => (
                <Tag key={keyword} color="cyan">
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
                  />
                </Tooltip>
              )}
              {brandInfluencerProfile.isFacebookAccountConnected && (
                <Button
                  shape="circle"
                  icon={<FacebookOutlined />}
                  size="large"
                />
              )}
              {brandInfluencerProfile.isTwitterAccountConnected && (
                <Button
                  shape="circle"
                  icon={<TwitterOutlined />}
                  size="large"
                />
              )}
              {brandInfluencerProfile.isTiktokConnected && (
                <Tooltip title={`@${brandInfluencerProfile.tiktokUsername}`}>
                  <Button
                    shape="circle"
                    icon={<TikTokOutlined />}
                    size="large"
                  />
                </Tooltip>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3">{/* Social media icons */}</div>

              {/* Add this approve/reject section */}
              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <SuccessButtonComponent
                    onClick={approveApplication}
                    type="submit"
                    label={
                      loadApproval ? (
                        <span className="flex items-center justify-center">
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
                          Approving...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          {approved ? "Approved" : "Approve"}{" "}
                          <CheckCircleFilled className="ml-2" />
                        </span>
                      )
                    }
                    disabled={collaboratorStatus === 'approved' || approved}
                    className={`w-full py-3 px-4 rounded-lg font-medium bg-green/80 text-white transition-all`}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <ErrorButtonComponent
                    onClick={rejectApplication}
                    type="submit"
                    label={
                      loadRejection ? (
                        <span className="flex items-center justify-center">
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
                          Rejecting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          {rejected ? "Rejected" : "Reject"}{" "}
                          <CloseCircleFilled className="ml-2" />
                        </span>
                      )
                    }
                    disabled={collaboratorStatus === 'rejected' || rejected}
                    className={`w-full py-3 px-4 rounded-lg font-medium bg-red/80 text-white transition-all`}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Divider />

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
          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <InstagramOutlined className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Instagram</h3>
                <p className="text-2xl font-bold">
                  {brandInfluencerProfile.instagramFollowersCount?.toLocaleString() ||
                    "N/A"}
                  <span className="text-gray-500 text-sm ml-1">followers</span>
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>
                    {brandInfluencerProfile.instagramMediaCount} posts
                  </span>
                  <span>
                    {brandInfluencerProfile.instagramFollowsCount} following
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <TikTokOutlined className="text-pink-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">TikTok</h3>
                <p className="text-2xl font-bold">
                  {brandInfluencerProfile.tiktokFollowerCount?.toLocaleString() ||
                    "N/A"}
                  <span className="text-gray-500 text-sm ml-1">followers</span>
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{brandInfluencerProfile.tiktokVideoCount} videos</span>
                  <span>
                    {brandInfluencerProfile.tiktokFollowingCount} following
                  </span>
                  <span>{brandInfluencerProfile.tiktokLikesCount} likes</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircleFilled className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-gray-500 font-medium">Engagement</h3>
                <p className="text-2xl font-bold">
                  5.0
                  <span className="text-gray-500 text-sm ml-1">rating</span>
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{brandInfluencerProfile.totalRates} reviews</span>
                  <Tag
                    color={
                      brandInfluencerProfile.isAvailableForCollaboration
                        ? "green"
                        : "red"
                    }
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
      {/* Stats Overview */}

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
          <Card title="About" className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <p className="text-gray-700">
                {brandInfluencerProfile.instagramBiography ||
                  brandInfluencerProfile.bio}
              </p>
              <Divider className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MailOutlined className="text-gray-500" />
                  <span>{brandInfluencerProfile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneOutlined className="text-gray-500" />
                  <span>{brandInfluencerProfile.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <EnvironmentOutlined className="text-gray-500" />
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
            className="hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-medium">Primary Platform:</span>
                <Tag color="blue">
                  {brandInfluencerProfile.platformIntroductionSource}
                </Tag>
              </div>

              <Divider className="my-4" />

              <div>
                <h4 className="font-medium mb-2">TikTok Bio:</h4>
                <p className="text-gray-700 whitespace-pre-line">
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
          className="mb-8 hover:shadow-lg transition-shadow"
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
                    // Use a working placeholder image URL
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
                className="text-primary hover:underline"
              >
                View on Instagram →
              </a>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default InfluencerProfile;
