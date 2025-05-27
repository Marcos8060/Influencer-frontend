"use client";
import React, { useState } from "react";
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

// Removed deprecated TabPane import
// Fix: Import Meta directly from Card
const { Meta } = Card;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const CampaignReporting = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Custom colors from your theme
  const primaryColor = "#3680A1";
  const secondaryColor = "#5373d4";

  // Mock data - replace with your actual data
  const campaignStats = [
    {
      title: "Total Reach",
      value: "1.2M",
      change: "+12%",
      icon: <ArrowUpOutlined className="text-green-500" />,
      progress: 72,
      description: "Audience reached across all platforms",
    },
    {
      title: "Engagement Rate",
      value: "8.5%",
      change: "+3.2%",
      icon: <LineChartOutlined className="text-purple-500" />,
      progress: 85,
      description: "Likes, comments & shares per impression",
    },
    {
      title: "Content Pieces",
      value: "248",
      change: "+48",
      icon: <FireFilled className="text-orange-500" />,
      progress: 65,
      description: "Posts created for this campaign",
    },
    {
      title: "Estimated ROI",
      value: "4.8x",
      change: "+1.2x",
      icon: <DollarOutlined className="text-green-600" />,
      progress: 48,
      description: "Return on investment estimate",
    },
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
      key: '1', 
      label: 'View Profile',
      icon: <UserOutlined /> 
    },
    { 
      key: '2', 
      label: 'Message Influencer',
      icon: <MessageFilled /> 
    },
    { 
      key: '3', 
      label: 'Performance Analytics',
      icon: <LineChartOutlined /> 
    },
    { 
      type: 'divider' 
    },
    { 
      key: '4', 
      label: 'Remove from Campaign',
      icon: <DeleteOutlined />,
      danger: true 
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
        <div className="bg-white rounded-2xl shadow-sm border border-input p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-color to-secondary text-transparent bg-clip-text">
              Summer Collection Campaign
            </h1>
                <Tag color="green" className="flex items-center gap-1">
                  <Clock size={14} /> Active
                </Tag>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Jun 15 - Aug 15, 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{influencers.length} Influencers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={16} />
                  <span>Beauty & Fashion</span>
                </div>
              </div>
          </div>

            <div className="flex flex-wrap items-center gap-3">
              <Dropdown
                menu={{
                  items: periodOptions.map(option => ({
                    key: option.value,
                    label: option.label,
                  })),
                  onClick: ({ key }) => setSelectedPeriod(key),
                }}
              >
                <Button className="flex items-center gap-2">
                  {periodOptions.find(o => o.value === selectedPeriod)?.label}
                  <ChevronDown size={16} />
                </Button>
              </Dropdown>

              <Button
                icon={<Download size={16} />}
                className="flex items-center gap-2"
              >
                Export Report
              </Button>

            <Button
              type="primary"
                icon={<BarChart3 size={16} />}
                className="bg-primary hover:bg-primary-dark flex items-center gap-2"
            >
              Advanced Analytics
              </Button>

              <Tooltip title="Refresh data">
                <Button
                  icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
                  onClick={handleRefresh}
                  disabled={loading}
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
            >
              <Card
                className="rounded-xl border border-input hover:shadow-lg transition-all duration-300"
                bodyStyle={{ padding: "24px" }}
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
                  <div className={`p-2 rounded-lg bg-${stat.color || 'primary'}/10`}>
                    {stat.icon}
                  </div>
                </div>
                <Progress
                  percent={stat.progress}
                  strokeColor={{
                    '0%': '#3680A1',
                    '100%': '#5373d4',
                  }}
                  showInfo={false}
                  strokeWidth={4}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">{stat.description}</p>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* Influencers Section */}
        <Card
          className="rounded-xl border border-input shadow-sm mb-8"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-6 border-b border-input">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">Influencer Performance</h2>
                <p className="text-gray-500">Track metrics and content from your campaign influencers</p>
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
                    {loading ? (
                      Array(3).fill(null).map((_, i) => (
                        <div key={i} className="border rounded-xl p-6">
                          <Skeleton avatar paragraph={{ rows: 4 }} active />
                        </div>
                      ))
                    ) : (
                      influencers.map((influencer) => (
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
                                    <Dropdown menu={menu} placement="bottomRight">
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
                                            '0%': '#3680A1',
                                            '100%': '#5373d4',
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
                                <h4 className="font-semibold">Recent Content</h4>
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
                      ))
                    )}
                    </div>
                  ),
                },
                {
                  key: "2",
                label: "Top Performing",
                children: <div className="p-6">Top performing content here</div>,
              },
              {
                key: "3",
                label: "Pending Review",
                children: <div className="p-6">Content pending review here</div>,
                },
              ]}
            />
        </Card>

        {/* Top Performing Media - Instagram Reels Style */}
        <Card
          className="rounded-xl border border-input shadow-sm"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-6 border-b border-input">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
                <h2 className="text-xl font-bold">Top Performing Content</h2>
                <p className="text-gray-500">Highest engagement reels from your campaign</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  icon={<Filter size={16} />}
                  className="flex items-center gap-2"
                >
                  Filter
                </Button>
                <Button
                  type="primary"
                  icon={<Download size={16} />}
                  className="bg-primary hover:bg-primary-dark flex items-center gap-2"
                >
                  Export Media
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {topMedia.map((media, index) => (
                <motion.div
                key={media.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group snap-start"
              >
                  <div className="relative w-[280px] aspect-[9/16] rounded-2xl overflow-hidden border border-input shadow-sm hover:shadow-lg transition-all duration-300 bg-black">
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
                                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-3 py-0 h-6 flex items-center"
                                >
                                  Follow
                                </Button>
                              </div>
                              <span className="text-xs text-white/80">2h ago</span>
                            </div>
                          </div>
                          <Tag
                            className="flex items-center gap-1 bg-white/10 text-white border-0"
                      >
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
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 hover:text-pink-500 transition-colors"
                          />
                          <span className="text-white text-xs font-medium">{media.likes}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<MessageFilled className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 transition-colors"
                          />
                          <span className="text-white text-xs font-medium">1.2K</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<Share2 className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 transition-colors"
                          />
                          <span className="text-white text-xs font-medium">Share</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<MoreOutlined className="text-xl" />}
                            className="flex items-center justify-center w-12 h-12 bg-white/10 text-white hover:bg-white/20 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Bottom section - Description and music */}
                      <div className="absolute bottom-4 left-4 right-20">
                        <div className="space-y-2">
                          <div className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                            <TrendingUp size={14} />
                            <span className="font-medium">{media.engagementRate} Engagement</span>
                          </div>
                          <p className="text-white text-sm line-clamp-2">
                            Check out our latest summer collection! 🌞 #FashionCampaign #SummerVibes
                          </p>
                          <div className="flex items-center gap-2 text-white/80">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 animate-pulse" />
                            <span className="text-xs">Original Audio - Summer Beats</span>
                    </div>
                  </div>
                </div>
                  </div>

                    {/* Rank indicator */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-br-xl flex items-center justify-center">
                      <span className="text-white font-bold">{media.id}</span>
                </div>
                  </div>
                </motion.div>
              ))}
              </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default CampaignReporting;