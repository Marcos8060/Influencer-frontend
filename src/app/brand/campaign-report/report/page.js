"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Progress,
  Avatar,
  Divider,
  Tabs,
  Button,
  Tag,
  Tooltip,
  Dropdown,
  Menu,
  Skeleton,
} from "antd";
import {
  UserOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  MoreOutlined,
  EyeOutlined,
  HeartFilled,
  MessageFilled,
  ShareAltOutlined,
  StarFilled,
  DeleteOutlined,
  LineChartOutlined,
  DollarOutlined,
  FireFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Calendar,
  Filter,
  Download,
  Share2,
  ChevronDown,
  Clock,
  Target,
  Award,
  Zap,
  RefreshCw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCampaignCollaboratorPosts,
  getAllCampaignDetails,
  getAllCampaignPosts,
  getAllCampaignReport,
} from "@/redux/features/stepper/campaign-stepper";
import { useAuth } from "@/assets/hooks/use-auth";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const CampaignReporting = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [isClient, setIsClient] = useState(false);
  const {
    campaignDetails,
    campaignReport,
    campaignPosts,
    campaignCollaboratorPosts,
  } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const campaignId = searchParams?.get("id");
  const auth = useAuth();

  // Ensure component only runs on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Safety check for required dependencies
  if (typeof window === "undefined") {
    return null;
  }

  const getCampaignDetails = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignDetails(auth, campaignId));
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCampaignReport = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignReport(auth, campaignId));
    } catch (error) {
      console.error("Error fetching campaign report:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCampaignPosts = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignPosts(auth, campaignId));
    } catch (error) {
      console.error("Error fetching campaign posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCampaignCollaboratorPosts = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignCollaboratorPosts(auth, campaignId));
    } catch (error) {
      console.error("Error fetching campaign collaborator posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && campaignId && isClient) {
      getCampaignDetails();
      getCampaignReport();
      getCampaignPosts();
      getCampaignCollaboratorPosts();
    }
  }, [auth, campaignId, isClient]);

  // Show loading state if not client-side yet
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Loading campaign report...</p>
        </div>
      </div>
    );
  }

  // Show error state if no campaign ID
  if (!campaignId) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-gray-300 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Campaign Not Found
          </h2>
          <p className="text-gray-500">
            Please provide a valid campaign ID in the URL.
          </p>
        </div>
      </div>
    );
  }

  // Mock data - replace with your actual data
  const campaignStats = [
    {
      title: "Total Engagement",
      value: `${
        (campaignReport?.totalLikes || 0) +
        (campaignReport?.totalComments || 0) +
        (campaignReport?.totalShares || 0)
      }`,
      change: `${campaignReport?.engagementRate || 0}%`,
      icon: <Users className="text-primary" />,
      progress:
        (((campaignReport?.totalLikes || 0) +
          (campaignReport?.totalComments || 0) +
          (campaignReport?.totalShares || 0)) /
          1000) *
          100 || 0,
      description: "Total interactions across all platforms",
      color: "primary",
      details: [
        { label: "Likes", value: campaignReport?.totalLikes || 0 },
        { label: "Comments", value: campaignReport?.totalComments || 0 },
        { label: "Shares", value: campaignReport?.totalShares || 0 },
      ],
    },
    {
      title: "Content Performance",
      value: `${campaignReport?.totalPosts || 0}`,
      change: `${campaignReport?.averageLikesPerPost || 0} avg likes`,
      icon: <FireFilled className="text-orange-500" />,
      progress: ((campaignReport?.totalPosts || 0) / 10) * 100,
      description: "Total posts created for this campaign",
      color: "orange",
      details: [
        {
          label: "Avg Views/Post",
          value: campaignReport?.averageViewsPerPost || 0,
        },
        {
          label: "Avg Likes/Post",
          value: campaignReport?.averageLikesPerPost || 0,
        },
        {
          label: "Avg Comments/Post",
          value: campaignReport?.averageCommentsPerPost || 0,
        },
        {
          label: "Avg Shares/Post",
          value: campaignReport?.averageSharesPerPost || 0,
        },
      ],
    },
    {
      title: "Platform Reach",
      value: `${Object.keys(campaignReport?.platformBreakdown || {}).length}`,
      change: `${
        campaignReport?.platformBreakdown?.Instagram?.totalViews || 0
      } views`,
      icon: <InstagramOutlined className="text-pink-500" />,
      progress:
        ((campaignReport?.platformBreakdown?.Instagram?.totalViews || 0) /
          1000) *
        100,
      description: "Active platforms and their performance",
      color: "pink",
      details: campaignReport?.platformBreakdown
        ? Object.entries(campaignReport.platformBreakdown).map(
            ([platform, data]) => ({
              label: platform,
              value: `${data.totalPosts} posts, ${data.totalLikes} likes`,
            })
          )
        : [],
    },
    {
      title: "Influencer Network",
      value: `${campaignReport?.totalInfluencers || 0}`,
      change: `${campaignReport?.topInfluencers?.length || 0} top performers`,
      icon: <StarFilled className="text-yellow-500" />,
      progress: ((campaignReport?.totalInfluencers || 0) / 10) * 100,
      description: "Active influencers in the campaign",
      color: "yellow",
      details:
        campaignReport?.topInfluencers?.map((influencer) => ({
          label: "Influencer",
          value: `${influencer.totalViews} views`,
        })) || [],
    },
  ];

  const topMedia = [
    {
      id: 1,
      image: "https://picsum.photos/id/20/800/1200",
      platform: "instagram",
      likes: "245K",
      engagementRate: "12.4%",
      user: {
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        username: "@emilycreative",
      },
    },
    {
      id: 2,
      image: "https://picsum.photos/id/21/800/1200",
      platform: "tiktok",
      likes: "1.2M",
      engagementRate: "18.7%",
      user: {
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        username: "@davidfunny",
      },
    },
    {
      id: 3,
      image: "https://picsum.photos/id/22/800/1200",
      platform: "instagram",
      likes: "189K",
      engagementRate: "9.8%",
      user: {
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        username: "@lifestylejane",
      },
    },
    {
      id: 4,
      image: "https://picsum.photos/id/23/800/1200",
      platform: "tiktok",
      likes: "876K",
      engagementRate: "15.2%",
      user: {
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        username: "@techguru",
      },
    },
  ];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <InstagramOutlined className="text-pink-600 text-lg" />;
      case "youtube":
        return <YoutubeOutlined className="text-red-600 text-lg" />;
      case "tiktok":
        return <TikTokOutlined className="text-black text-lg" />;
      default:
        return <InstagramOutlined className="text-lg" />;
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "approved":
        return (
          <Tag color="green" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Approved
          </Tag>
        );
      case "pending":
        return (
          <Tag color="orange" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            Pending
          </Tag>
        );
      case "rejected":
        return (
          <Tag color="red" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            Rejected
          </Tag>
        );
      default:
        return (
          <Tag color="default" className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            Unknown
          </Tag>
        );
    }
  };

  const getConnectionStatus = (isInstagramConnected, isTiktokConnected) => {
    const platforms = [];
    if (isInstagramConnected) platforms.push("Instagram");
    if (isTiktokConnected) platforms.push("TikTok");

    if (platforms.length === 0) {
      return (
        <Tag color="red" className="text-xs">
          No platforms connected
        </Tag>
      );
    }

    return (
      <div className="flex gap-1">
        {platforms.map((platform) => (
          <Tag key={platform} color="green" className="text-xs">
            {platform}
          </Tag>
        ))}
      </div>
    );
  };

  const menuItems = [
    {
      key: "1",
      label: "View Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Message Influencer",
      icon: <MessageFilled />,
    },
    {
      key: "3",
      label: "Performance Analytics",
      icon: <LineChartOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Remove from Campaign",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menu = <Menu items={menuItems} />;

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await getCampaignReport();
      await getCampaignPosts();
      await getCampaignCollaboratorPosts();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div {...fadeIn} className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]  p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-color to-secondary text-transparent bg-clip-text">
                  {campaignDetails?.title || "Campaign Report"}
                </h1>
              </div>
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>
                    {campaignDetails?.startDate || "N/A"} -{" "}
                    {campaignDetails?.endDate || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span>
                    {Array.isArray(campaignCollaboratorPosts)
                      ? campaignCollaboratorPosts.length
                      : 0}{" "}
                    Influencers
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Go Back to Campaign Details Button */}
              <Link href={`/brand/campaign-report/${campaignId}`}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  className="flex items-center hover:text-primary"
                >
                  Back to Campaign Details
                </Button>
              </Link>
              <Tooltip title="Refresh data">
                <Button
                  icon={
                    <RefreshCw
                      size={16}
                      className={loading ? "animate-spin" : ""}
                    />
                  }
                  onClick={handleRefresh}
                  disabled={loading}
                  className="border-input hover:border-primary/50 hover:text-primary transition-all"
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Performance Stats Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Campaign Performance Stats
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading
            ? // Skeleton loaders for stats grid
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card
                    className="rounded-2xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full"
                    bodyStyle={{
                      padding: "24px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-3 flex-1">
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 120 }}
                        />
                        <div className="flex items-baseline gap-2">
                          <Skeleton.Input
                            active
                            size="large"
                            style={{ width: 80 }}
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 60 }}
                          />
                        </div>
                      </div>
                      <Skeleton.Avatar active size={48} shape="square" />
                    </div>
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "100%" }}
                      className="mb-2"
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "80%" }}
                      className="mb-4"
                    />

                    {/* Skeleton for detailed metrics */}
                    <div className="space-y-2 mt-auto pt-4 border-t border-input">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 60 }}
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 40 }}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))
            : campaignStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card
                    className="rounded-2xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full"
                    bodyStyle={{
                      padding: "24px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <span className="text-sm text-gray-500 font-medium">
                          {stat.title}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-bold">{stat.value}</h3>
                          <span className="text-xs font-medium text-green-500 flex items-center">
                            {stat.icon} {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                        {stat.icon}
                      </div>
                    </div>
                    <Progress
                      percent={stat.progress}
                      strokeColor={{
                        "0%": "#3680A1",
                        "100%": "#5373d4",
                      }}
                      showInfo={false}
                      size={[null, 4]}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500 mb-4">
                      {stat.description}
                    </p>

                    {/* Detailed Metrics */}
                    <div className="space-y-2 mt-auto pt-4 border-t border-input">
                      {stat.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-500">{detail.label}</span>
                          <span className="font-medium">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
        </div>

        {/* Platform Metrics */}
        <Card
          className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold">Platform Performance</h2>
            <p className="text-gray-500">Detailed metrics by platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? // Skeleton loaders for platform metrics
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-input"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton.Avatar active size={48} shape="square" />
                      <div className="flex-1">
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 100 }}
                          className="mb-2"
                        />
                        <Skeleton.Input
                          active
                          size="small"
                          style={{ width: 80 }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 50 }}
                            className="mb-2"
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 60 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : campaignReport?.platformBreakdown &&
                Object.entries(campaignReport.platformBreakdown).map(
                  ([platform, data]) => (
                    <div
                      key={platform}
                      className="bg-white rounded-xl p-6 border border-input"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-primary/10`}>
                          {platform === "Instagram" ? (
                            <InstagramOutlined className="text-primary text-xl" />
                          ) : platform === "TikTok" ? (
                            <TikTokOutlined className="text-primary text-xl" />
                          ) : platform === "YouTube" ? (
                            <YoutubeOutlined className="text-primary text-xl" />
                          ) : (
                            <InstagramOutlined className="text-primary text-xl" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{platform}</h3>
                          <p className="text-sm text-gray-500">
                            {data?.totalPosts || 0} posts
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Likes</div>
                          <div className="text-lg font-bold">
                            {data?.totalLikes || 0}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Comments</div>
                          <div className="text-lg font-bold">
                            {data?.totalComments || 0}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Shares</div>
                          <div className="text-lg font-bold">
                            {data?.totalShares || 0}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Views</div>
                          <div className="text-lg font-bold">
                            {data?.totalViews || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
          </div>
        </Card>

        {/* Top Posts Section */}
        <Card
          className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Campaign Posts</h2>
              <p className="text-gray-500">
                Content created by influencers for this campaign
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? // Skeleton loaders for campaign posts
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-input h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Skeleton.Avatar active size={40} />
                        <div>
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 100 }}
                            className="mb-1"
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 80 }}
                          />
                        </div>
                      </div>
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 60 }}
                      />
                    </div>

                    <div className="mb-4">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: "100%" }}
                        className="mb-2"
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: "80%" }}
                        className="mb-2"
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 60 }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center mb-4">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded-lg">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 40 }}
                            className="mb-1"
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 30 }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-input">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 80 }}
                      />
                    </div>
                  </motion.div>
                ))
              : Array.isArray(campaignPosts) &&
                campaignPosts?.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-input hover:shadow-md transition-all h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={post.ownerProfilePicture}
                          size={40}
                          className="rounded-lg"
                        />
                        <div>
                          <div className="font-medium">{post.ownerName}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(post.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Tag color="blue" className="flex items-center gap-1">
                        {post.platformName}
                      </Tag>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                        {post.caption}
                      </p>
                      {post.mediaProductType && (
                        <Tag color="purple" className="text-xs">
                          {post.mediaProductType}
                        </Tag>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center mb-4">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-sm text-gray-500">Likes</div>
                        <div className="font-semibold">{post.likeCount}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-sm text-gray-500">Comments</div>
                        <div className="font-semibold">{post.commentCount}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-sm text-gray-500">Shares</div>
                        <div className="font-semibold">{post.shareCount}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-input">
                      <Button
                        type="link"
                        href={post.permalink}
                        target="_blank"
                        className="text-primary hover:text-primary-dark p-0"
                      >
                        View Post
                      </Button>
                    </div>
                  </motion.div>
                ))}
          </div>
        </Card>

        {/* Top Performing Media - Instagram Reels Style */}
        <Card
          className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-8 border-b border-input">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">Top Performing Content</h2>
                <p className="text-gray-500">
                  Highest engagement reels from your campaign
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {topMedia.map((media, index) => (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group snap-start"
                >
                  <div className="relative w-[280px] aspect-[9/16] rounded-3xl overflow-hidden border-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 bg-black">
                    <img
                      src={media.image}
                      alt="Media content"
                      className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Reels-style overlay - always visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30">
                      {/* Top section - Username and platform */}
                      <div className="absolute top-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar
                              size={32}
                              src={media.user.avatar}
                              className="border-2 border-white ring-2 ring-primary/30"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">
                                  {media.user.username}
                                </span>
                                <div className="h-1 w-1 rounded-full bg-white/50" />
                                <Button
                                  size="small"
                                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-3 py-0 h-6 flex items-center rounded-full"
                                >
                                  Follow
                                </Button>
                              </div>
                              <span className="text-xs text-white/80">
                                2h ago
                              </span>
                            </div>
                          </div>
                          <Tag className="flex items-center gap-1 bg-white/10 text-white border-0 rounded-full">
                            {getPlatformIcon(media.platform)}
                          </Tag>
                        </div>
                      </div>

                      {/* Right side engagement buttons */}
                      <div className="absolute right-4 bottom-20 flex flex-col gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<HeartFilled className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 hover:text-pink-500 transition-colors rounded-full"
                          />
                          <span className="text-white text-xs font-medium">
                            {media.likes}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<MessageFilled className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full"
                          />
                          <span className="text-white text-xs font-medium">
                            1.2K
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<Share2 className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full"
                          />
                          <span className="text-white text-xs font-medium">
                            Share
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<MoreOutlined className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full"
                          />
                        </div>
                      </div>

                      {/* Bottom section - Description and music */}
                      <div className="absolute bottom-4 left-4 right-20">
                        <div className="space-y-2">
                          <div className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                            <TrendingUp size={14} />
                            <span className="font-medium">
                              {media.engagementRate} Engagement
                            </span>
                          </div>
                          <p className="text-white text-sm line-clamp-2">
                            Check out our latest summer collection! 🌞
                            #FashionCampaign #SummerVibes
                          </p>
                          <div className="flex items-center gap-2 text-white/80">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 animate-pulse" />
                            <span className="text-xs">
                              Original Audio - Summer Beats
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rank indicator */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-br-2xl flex items-center justify-center">
                      <span className="text-white font-bold">{media.id}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Influencers Section */}
        <Card
          className="rounded-xl border border-input shadow-sm"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-6 border-b border-input">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">Influencer Performance</h2>
                <p className="text-gray-500">
                  Track metrics and content from your campaign influencers
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* <Button icon={<Filter size={16} />}>Filters</Button> */}
                {/* <Button
                  type="primary"
                  icon={<Users size={16} />}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Add Influencers
                </Button> */}
              </div>
            </div>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="px-6"
            items={[
              {
                key: "1",
                label: "All Influencers",
                children: (
                  <div className="space-y-6 py-4">
                    {loading
                      ? Array(3)
                          .fill(null)
                          .map((_, i) => (
                            <div key={i} className="border rounded-xl p-6">
                              <Skeleton avatar paragraph={{ rows: 4 }} active />
                            </div>
                          ))
                      : Array.isArray(campaignCollaboratorPosts) &&
                        campaignCollaboratorPosts?.map((collaborator) => (
                          <motion.div
                            key={collaborator.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border border-input rounded-xl p-6 hover:shadow-md transition-all bg-white"
                          >
                            <div className="flex flex-col lg:flex-row gap-8">
                              {/* Influencer Info */}
                              <div className="flex-1">
                                <div className="flex items-start gap-4">
                                  <Avatar
                                    size={80}
                                    src={
                                      collaborator.profilePhoto ||
                                      "https://randomuser.me/api/portraits/lego/1.jpg"
                                    }
                                    className="rounded-xl"
                                    icon={
                                      !collaborator.profilePhoto && (
                                        <UserOutlined />
                                      )
                                    }
                                  />
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="text-lg font-semibold">
                                          {collaborator.influencerName}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                          ID:{" "}
                                          {collaborator.influencerId.slice(
                                            0,
                                            8
                                          )}
                                          ...
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                          {getConnectionStatus(
                                            collaborator.isInstagramConnected,
                                            collaborator.isTiktokConnected
                                          )}
                                          {getStatusTag(collaborator.status)}
                                        </div>
                                      </div>
                                      <Dropdown
                                        menu={menu}
                                        placement="bottomRight"
                                      >
                                        <Button
                                          type="text"
                                          icon={<MoreOutlined />}
                                          className="hover:bg-gray-100"
                                        />
                                      </Dropdown>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                      <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                          <Users size={16} />
                                          <span className="text-sm font-medium">
                                            Posts
                                          </span>
                                        </div>
                                        <p className="text-xl font-bold">
                                          {collaborator.posts?.length || 0}
                                        </p>
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                          <Zap size={16} />
                                          <span className="text-sm font-medium">
                                            Total Engagement
                                          </span>
                                        </div>
                                        <p className="text-xl font-bold">
                                          {collaborator.report
                                            ? collaborator.report.totalLikes +
                                              collaborator.report
                                                .totalComments +
                                              collaborator.report.totalShares
                                            : 0}
                                        </p>
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                          <Award size={16} />
                                          <span className="text-sm font-medium">
                                            Completion
                                          </span>
                                        </div>
                                        <div className="space-y-2">
                                          <Progress
                                            percent={
                                              collaborator.submissionCompletionPercentage
                                            }
                                            strokeColor={{
                                              "0%": "#3680A1",
                                              "100%": "#5373d4",
                                            }}
                                            showInfo={false}
                                            size="small"
                                          />
                                          <p className="text-sm font-semibold">
                                            {
                                              collaborator.submissionCompletionPercentage
                                            }
                                            %
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Additional Metrics */}
                                    {collaborator.report && (
                                      <div className="grid grid-cols-4 gap-3 mt-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                          <div className="text-xs text-blue-600 font-medium">
                                            Likes
                                          </div>
                                          <div className="text-lg font-bold text-blue-700">
                                            {collaborator.report.totalLikes}
                                          </div>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                          <div className="text-xs text-green-600 font-medium">
                                            Comments
                                          </div>
                                          <div className="text-lg font-bold text-green-700">
                                            {collaborator.report.totalComments}
                                          </div>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                          <div className="text-xs text-purple-600 font-medium">
                                            Shares
                                          </div>
                                          <div className="text-lg font-bold text-purple-700">
                                            {collaborator.report.totalShares}
                                          </div>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-lg">
                                          <div className="text-xs text-orange-600 font-medium">
                                            Views
                                          </div>
                                          <div className="text-lg font-bold text-orange-700">
                                            {collaborator.report.totalViews}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Recent Content */}
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-semibold">
                                    Recent Content
                                  </h4>
                                  {/* <Button
                                    type="link"
                                    className="text-primary hover:text-primary-dark"
                                  >
                                    View All
                                  </Button> */}
                                </div>

                                {collaborator.posts &&
                                collaborator.posts.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-4">
                                    {collaborator.posts
                                      .slice(0, 4)
                                      .map((post) => (
                                        <div
                                          key={post.id}
                                          className="relative group rounded-xl overflow-hidden border border-input"
                                        >
                                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                            {post.mediaProductType ===
                                            "FEED" ? (
                                              <div className="text-center p-4">
                                                <InstagramOutlined className="text-2xl text-pink-500 mb-2" />
                                                <p className="text-xs text-gray-500">
                                                  Feed Post
                                                </p>
                                              </div>
                                            ) : (
                                              <div className="text-center p-4">
                                                <YoutubeOutlined className="text-2xl text-red-500 mb-2" />
                                                <p className="text-xs text-gray-500">
                                                  Video Content
                                                </p>
                                              </div>
                                            )}
                                          </div>

                                          <div className="p-3">
                                            <div className="flex justify-between text-gray-600 text-xs mb-2">
                                              <span className="flex items-center gap-1">
                                                <HeartFilled className="text-red-500" />{" "}
                                                {post.likeCount}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <MessageFilled className="text-blue-500" />{" "}
                                                {post.commentCount}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <Share2
                                                  size={12}
                                                  className="text-green-500"
                                                />{" "}
                                                {post.shareCount}
                                              </span>
                                            </div>

                                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                              {post.caption}
                                            </p>

                                            <div className="flex justify-between items-center">
                                              <Tag
                                                color="blue"
                                                className="text-xs"
                                              >
                                                {post.platformName}
                                              </Tag>
                                              <span className="text-xs text-gray-400">
                                                {new Date(
                                                  post.timestamp
                                                ).toLocaleDateString()}
                                              </span>
                                            </div>
                                          </div>

                                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                              <Button
                                                type="primary"
                                                size="small"
                                                href={post.permalink}
                                                target="_blank"
                                                className="w-full"
                                              >
                                                View Post
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-8 border-2 border-dashed border-input rounded-xl">
                                    <UserOutlined className="text-4xl text-gray-300 mb-2" />
                                    <p className="text-gray-500">
                                      No posts yet
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {collaborator.status === "pending"
                                        ? "Waiting for content submission"
                                        : "No content available"}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                  </div>
                ),
              },
              {
                key: "2",
                label: "Top Performing",
                children: (
                  <div className="p-6">
                    {Array.isArray(campaignCollaboratorPosts) &&
                    campaignCollaboratorPosts?.filter(
                      (c) => c.report && c.posts && c.posts.length > 0
                    ).length > 0 ? (
                      <div className="space-y-4">
                        {Array.isArray(campaignCollaboratorPosts) &&
                          campaignCollaboratorPosts
                            .filter(
                              (c) => c.report && c.posts && c.posts.length > 0
                            )
                            .sort((a, b) => {
                              const aEngagement =
                                a.report.totalLikes +
                                a.report.totalComments +
                                a.report.totalShares;
                              const bEngagement =
                                b.report.totalLikes +
                                b.report.totalComments +
                                b.report.totalShares;
                              return bEngagement - aEngagement;
                            })
                            .slice(0, 3)
                            .map((collaborator, index) => (
                              <div
                                key={collaborator.id}
                                className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow/30"
                              >
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                                <Avatar
                                  src={collaborator.profilePhoto}
                                  size={48}
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold">
                                    {collaborator.influencerName}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {collaborator.report.totalLikes +
                                      collaborator.report.totalComments +
                                      collaborator.report.totalShares}{" "}
                                    total engagement
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-yellow-600">
                                    {collaborator.posts.length} posts
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {collaborator.report.engagementRate}%
                                    engagement rate
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <StarFilled className="text-4xl text-gray-300 mb-2" />
                        <p className="text-gray-500">No top performers yet</p>
                        <p className="text-sm text-gray-400">
                          Content needs to be submitted and approved
                        </p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: "3",
                label: "Pending Review",
                children: (
                  <div className="p-6">
                    {Array.isArray(campaignCollaboratorPosts) &&
                    campaignCollaboratorPosts?.filter(
                      (c) => c.status === "pending"
                    ).length > 0 ? (
                      <div className="space-y-4">
                        {Array.isArray(campaignCollaboratorPosts) &&
                          campaignCollaboratorPosts
                            .filter((c) => c.status === "pending")
                            .map((collaborator) => (
                              <div
                                key={collaborator.id}
                                className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200"
                              >
                                <Avatar
                                  src={collaborator.profilePhoto}
                                  size={48}
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold">
                                    {collaborator.influencerName}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Waiting for content submission
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Progress
                                      percent={
                                        collaborator.submissionCompletionPercentage
                                      }
                                      size="small"
                                      strokeColor="#f97316"
                                      showInfo={false}
                                      style={{ width: 100 }}
                                    />
                                    <span className="text-xs text-orange-600">
                                      {
                                        collaborator.submissionCompletionPercentage
                                      }
                                      % complete
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Tag color="orange">Pending</Tag>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                      collaborator.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <Clock className="text-4xl text-gray-300 mb-2" />
                        </div>
                        <p className="text-gray-500">No pending reviews</p>
                        <p className="text-sm text-gray-400">
                          All content has been reviewed
                        </p>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </motion.div>
  );
};

export default dynamic(() => Promise.resolve(CampaignReporting), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-500">Loading campaign report...</p>
      </div>
    </div>
  ),
});
