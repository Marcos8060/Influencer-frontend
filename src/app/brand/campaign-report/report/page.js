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
  Empty,
  Skeleton,
} from "antd";
import {
  ArrowUpOutlined,
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
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
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
import { getAllCampaignReport } from "@/redux/features/stepper/campaign-stepper";
import { useAuth } from "@/assets/hooks/use-auth";

// Removed deprecated TabPane import
// Fix: Import Meta directly from Card
const { Meta } = Card;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const CampaignReporting = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const { campaignDetails,campaignReport } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const auth = useAuth();

  console.log("CAMPAIGN_DETAILS ",campaignDetails)
  console.log("CAMPAIGN_REPORT ",campaignReport)

  const getCampaignReport = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignReport(auth, campaignDetails?.id));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && campaignDetails?.id) {
      getCampaignReport();
    }
  }, [useAuth]);

  // Mock data - replace with your actual data
  const campaignStats = [
    {
      title: "Total Engagement",
      value: `${campaignReport?.totalLikes + campaignReport?.totalComments + campaignReport?.totalShares || 0}`,
      change: `${campaignReport?.engagementRate || 0}%`,
      icon: <Users className="text-primary" />,
      progress: ((campaignReport?.totalLikes + campaignReport?.totalComments + campaignReport?.totalShares) / 1000) * 100 || 0,
      description: "Total interactions across all platforms",
      color: "primary",
      details: [
        { label: "Likes", value: campaignReport?.totalLikes || 0 },
        { label: "Comments", value: campaignReport?.totalComments || 0 },
        { label: "Shares", value: campaignReport?.totalShares || 0 }
      ]
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
        { label: "Avg Views/Post", value: campaignReport?.averageViewsPerPost || 0 },
        { label: "Avg Likes/Post", value: campaignReport?.averageLikesPerPost || 0 },
        { label: "Avg Comments/Post", value: campaignReport?.averageCommentsPerPost || 0 },
        { label: "Avg Shares/Post", value: campaignReport?.averageSharesPerPost || 0 }
      ]
    },
    {
      title: "Platform Reach",
      value: `${Object.keys(campaignReport?.platformBreakdown || {}).length}`,
      change: `${campaignReport?.platformBreakdown?.Instagram?.totalViews || 0} views`,
      icon: <InstagramOutlined className="text-pink-500" />,
      progress: ((campaignReport?.platformBreakdown?.Instagram?.totalViews || 0) / 1000) * 100,
      description: "Active platforms and their performance",
      color: "pink",
      details: campaignReport?.platformBreakdown ? Object.entries(campaignReport.platformBreakdown).map(([platform, data]) => ({
        label: platform,
        value: `${data.totalPosts} posts, ${data.totalLikes} likes`
      })) : []
    },
    {
      title: "Influencer Network",
      value: `${campaignReport?.totalInfluencers || 0}`,
      change: `${campaignReport?.topInfluencers?.length || 0} top performers`,
      icon: <StarFilled className="text-yellow-500" />,
      progress: ((campaignReport?.totalInfluencers || 0) / 10) * 100,
      description: "Active influencers in the campaign",
      color: "yellow",
      details: campaignReport?.topInfluencers?.map(influencer => ({
        label: "Influencer",
        value: `${influencer.totalViews} views`
      })) || []
    }
  ];

  const influencers = [
    {
      id: 1,
      name: "Alex Johnson",
      username: "@alexjohnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      platform: "instagram",
      reach: "450K",
      engagement: "9.2%",
      completion: 92,
      tier: "premium",
      posts: [
        {
          id: 1,
          image: "https://picsum.photos/id/10/800/800",
          likes: "45K",
          comments: "1.2K",
          shares: "850",
          engagementRate: "8.7%",
          date: "2 days ago",
        },
        {
          id: 2,
          image: "https://picsum.photos/id/11/800/800",
          likes: "38K",
          comments: "980",
          shares: "720",
          engagementRate: "7.2%",
          date: "5 days ago",
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Miller",
      username: "@sarahmiller",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      platform: "tiktok",
      reach: "780K",
      engagement: "12.5%",
      completion: 100,
      tier: "elite",
      posts: [
        {
          id: 1,
          image: "https://picsum.photos/id/12/800/800",
          likes: "120K",
          comments: "4.5K",
          shares: "12K",
          engagementRate: "14.2%",
          date: "1 day ago",
        },
        {
          id: 2,
          image: "https://picsum.photos/id/13/800/800",
          likes: "98K",
          comments: "3.2K",
          shares: "9.8K",
          engagementRate: "11.8%",
          date: "3 days ago",
        },
      ],
    },
    {
      id: 3,
      name: "James Wilson",
      username: "@jameswilson",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      platform: "youtube",
      reach: "1.2M",
      engagement: "6.8%",
      completion: 78,
      tier: "standard",
      posts: [
        {
          id: 1,
          image: "https://picsum.photos/id/14/800/800",
          likes: "210K",
          comments: "8.2K",
          shares: "15K",
          engagementRate: "6.5%",
          date: "4 days ago",
        },
      ],
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

  const getTierTag = (tier) => {
    switch (tier) {
      case "elite":
        return (
          <Tag color="gold" className="flex items-center">
            <StarFilled className="mr-1" /> Elite
          </Tag>
        );
      case "premium":
        return (
          <Tag color="blue" className="flex items-center">
            <StarFilled className="mr-1" /> Premium
          </Tag>
        );
      default:
        return <Tag color="default">Standard</Tag>;
    }
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
    // Simulate data refresh
    setTimeout(() => setLoading(false), 1500);
  };

  const periodOptions = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 3 months", value: "3m" },
    { label: "Custom range", value: "custom" },
  ];

  return (
    <motion.div {...fadeIn} className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]  p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-color to-secondary text-transparent bg-clip-text">
                  {campaignDetails?.title}
                </h1>
                <Tag
                  color="green"
                  className="flex items-center gap-1 rounded-full px-3 py-1"
                >
                  <Clock size={14} /> Active
                </Tag>
              </div>
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>{campaignDetails?.startDate} - {campaignDetails?.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span>{influencers.length} Influencers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  <span>Beauty & Fashion</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Dropdown
                menu={{
                  items: periodOptions.map((option) => ({
                    key: option.value,
                    label: option.label,
                  })),
                  onClick: ({ key }) => setSelectedPeriod(key),
                }}
              >
                <Button className="flex items-center gap-2 border-input hover:border-primary/50 hover:text-primary transition-all">
                  {periodOptions.find((o) => o.value === selectedPeriod)?.label}
                  <ChevronDown size={16} />
                </Button>
              </Dropdown>

              <Button
                icon={<Download size={16} />}
                className="flex items-center gap-2 border-input hover:border-primary/50 hover:text-primary transition-all"
              >
                Export Report
              </Button>

              <Button
                type="primary"
                icon={<BarChart3 size={16} />}
                className="bg-primary hover:bg-primary-dark flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Advanced Analytics
              </Button>

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {campaignStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                className="rounded-2xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full"
                bodyStyle={{ padding: "24px", height: "100%", display: "flex", flexDirection: "column" }}
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
                  strokeWidth={4}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500 mb-4">{stat.description}</p>
                
                {/* Detailed Metrics */}
                <div className="space-y-2 mt-auto pt-4 border-t border-input">
                  {stat.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{detail.label}</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Top Posts Section */}
        <Card
          className="rounded-3xl border-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Top Performing Posts</h2>
              <p className="text-gray-500">Best performing content from your campaign</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaignReport?.topPosts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-input hover:shadow-md transition-all h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-500">Post #{index + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{post.likeCount} likes</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{post.commentCount} comments</span>
                    </div>
                  </div>
                  <Tag color="blue" className="flex items-center gap-1">
                    <InstagramOutlined /> Instagram
                  </Tag>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <div className="text-sm text-gray-500">Views</div>
                    <div className="font-semibold">{post.viewCount}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <div className="text-sm text-gray-500">Shares</div>
                    <div className="font-semibold">{post.shareCount}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <div className="text-sm text-gray-500">Engagement</div>
                    <div className="font-semibold">
                      {((post.likeCount + post.commentCount + post.shareCount) / (post.viewCount || 1) * 100).toFixed(1)}%
                    </div>
                  </div>
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
                <Button icon={<Filter size={16} />}>Filters</Button>
                <Button
                  type="primary"
                  icon={<Users size={16} />}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Add Influencers
                </Button>
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
                      : influencers.map((influencer) => (
                          <motion.div
                            key={influencer.id}
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
                                    src={influencer.avatar}
                                    className="rounded-xl"
                                  />
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="text-lg font-semibold">
                                          {influencer.name}
                                        </h3>
                                        <p className="text-gray-500">
                                          {influencer.username}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                          {getPlatformIcon(influencer.platform)}
                                          <span className="text-sm capitalize">
                                            {influencer.platform}
                                          </span>
                                          {getTierTag(influencer.tier)}
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
                                            Reach
                                          </span>
                                        </div>
                                        <p className="text-xl font-bold">
                                          {influencer.reach}
                                        </p>
                                      </div>
                                      <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                          <Zap size={16} />
                                          <span className="text-sm font-medium">
                                            Engagement
                                          </span>
                                        </div>
                                        <p className="text-xl font-bold">
                                          {influencer.engagement}
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
                                            percent={influencer.completion}
                                            strokeColor={{
                                              "0%": "#3680A1",
                                              "100%": "#5373d4",
                                            }}
                                            showInfo={false}
                                            size="small"
                                          />
                                          <p className="text-sm font-semibold">
                                            {influencer.completion}%
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Recent Content */}
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-semibold">
                                    Recent Content
                                  </h4>
                                  <Button
                                    type="link"
                                    className="text-primary hover:text-primary-dark"
                                  >
                                    View All
                                  </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  {influencer.posts.map((post) => (
                                    <div
                                      key={post.id}
                                      className="relative group rounded-xl overflow-hidden"
                                    >
                                      <img
                                        src={post.image}
                                        alt=""
                                        className="w-full h-48 object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                          <div className="flex justify-between text-white text-sm">
                                            <span className="flex items-center gap-1">
                                              <HeartFilled /> {post.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                              <MessageFilled /> {post.comments}
                                            </span>
                                            <span className="flex items-center gap-1">
                                              <Share2 size={14} /> {post.shares}
                                            </span>
                                          </div>
                                          <p className="text-white text-xs mt-2">
                                            {post.date}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
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
                  <div className="p-6">Top performing content here</div>
                ),
              },
              {
                key: "3",
                label: "Pending Review",
                children: (
                  <div className="p-6">Content pending review here</div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </motion.div>
  );
};

export default CampaignReporting;
