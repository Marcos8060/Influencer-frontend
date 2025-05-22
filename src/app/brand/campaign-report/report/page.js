import React from "react";
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

// Removed deprecated TabPane import
// Fix: Import Meta directly from Card
const { Meta } = Card;

const CampaignReporting = () => {
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Summer Collection Campaign
            </h1>
            <p className="text-gray-500">
              Track your campaign performance and influencer metrics
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button
              type="primary"
              className="bg-[#3680A1] hover:bg-[#2a6a85] border-none flex items-center"
              icon={<LineChartOutlined />}
            >
              Advanced Analytics
            </Button>
            <Dropdown menu={{ items: menuItems }}  placement="bottomRight">
              <Button icon={<MoreOutlined />} className="flex items-center">
                Actions
              </Button>
            </Dropdown>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {campaignStats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-sm rounded-xl border-0 hover:shadow-md transition-all"
              bodyStyle={{ padding: "20px" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-semibold mt-1 mb-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center text-sm text-green-500">
                    {stat.icon}
                    <span className="ml-1">{stat.change}</span>
                    <span className="text-gray-400 ml-2">vs last week</span>
                  </div>
                </div>
                <Tooltip title={stat.description}>
                  <div className="bg-blue-50 p-2 rounded-full cursor-help">
                    <EyeOutlined className="text-[#5373d4]" />
                  </div>
                </Tooltip>
              </div>
              <div className="mt-4">
                <Progress
                  percent={stat.progress}
                  strokeColor={secondaryColor}
                  showInfo={false}
                  size="small"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Progress</span>
                  <span>{stat.progress}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Influencers Section */}
        <Card
          className="shadow-sm rounded-xl border-0 mb-8"
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-xl">
                  Influencers Performance
                </h3>
                <p className="text-gray-500">
                  Detailed metrics for each influencer in this campaign
                </p>
              </div>
              <Button type="text" className="text-[#5373d4] font-medium">
                View All Influencers
              </Button>
            </div>

            <Tabs
              defaultActiveKey="1"
              tabBarExtraContent={
                <div className="flex space-x-2">
                  <Button>Filter</Button>
                  <Button
                    type="primary"
                    className="bg-[#5373d4] hover:bg-[#4565b5] border-none"
                  >
                    Add Influencers
                  </Button>
                </div>
              }
              items={[
                {
                  key: "1",
                  label: "All Influencers",
                  children: (
                    <div className="space-y-6">
                      {influencers.map((influencer) => (
                        <div
                          key={influencer.id}
                          className="border border-input rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Influencer Info */}
                            <div className="flex-1">
                              <div className="flex items-start space-x-4">
                                <Avatar size={72} src={influencer.avatar} />
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-lg">
                                        {influencer.name}
                                      </h4>
                                      <p className="text-gray-500">
                                        {influencer.username}
                                      </p>
                                    </div>
                                    {getTierTag(influencer.tier)}
                                  </div>

                                  <div className="flex items-center mt-2">
                                    {getPlatformIcon(influencer.platform)}
                                    <span className="ml-2 text-sm capitalize">
                                      {influencer.platform}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-gray-500 text-xs font-medium">
                                        Reach
                                      </p>
                                      <p className="font-semibold text-lg">
                                        {influencer.reach}
                                      </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-gray-500 text-xs font-medium">
                                        Engagement
                                      </p>
                                      <p className="font-semibold text-lg">
                                        {influencer.engagement}
                                      </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-gray-500 text-xs font-medium">
                                        Completion
                                      </p>
                                      <Progress
                                        percent={influencer.completion}
                                        strokeColor={
                                          influencer.completion > 90
                                            ? secondaryColor
                                            : primaryColor
                                        }
                                        showInfo={false}
                                        size="small"
                                      />
                                      <p className="font-semibold text-sm mt-1">
                                        {influencer.completion}%
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Influencer Posts */}
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-4">
                                <h5 className="font-medium text-gray-800">
                                  Recent Content
                                </h5>
                                <Button
                                  type="text"
                                  size="small"
                                  className="text-[#5373d4]"
                                >
                                  View All
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {influencer.posts.map((post) => (
                                  <Card
                                    key={post.id}
                                    hoverable
                                    cover={
                                      <div className="relative h-40 overflow-hidden">
                                        <img
                                          alt="post"
                                          src={post.image}
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                          <div className="flex justify-between text-white text-xs">
                                            <span className="flex items-center">
                                              <HeartFilled className="mr-1" />{" "}
                                              {post.likes}
                                            </span>
                                            <span className="flex items-center">
                                              <MessageFilled className="mr-1" />{" "}
                                              {post.comments}
                                            </span>
                                            <span className="flex items-center">
                                              <ShareAltOutlined className="mr-1" />{" "}
                                              {post.shares}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    }
                                    bodyStyle={{ padding: "12px" }}
                                  >
                                    {/* Fix: Replace Meta with direct JSX */}
                                    <div>
                                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Engagement Rate</span>
                                        <span className="font-medium text-green-500">
                                          {post.engagementRate}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-400">
                                        {post.date}
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: "Top Performers",
                  children: (
                    <div className="text-center py-12">
                      <img
                        src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                        alt="No data"
                        className="h-40 mx-auto mb-4"
                      />
                      <h4 className="text-lg font-medium text-gray-600">
                        No top performers data yet
                      </h4>
                      <p className="text-gray-400">
                        Top performing influencers will appear here
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Card>

        {/* Top Performing Media */}
        <Card
          className="shadow-sm rounded-xl border-0"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-xl">Top Performing Content</h3>
              <p className="text-gray-500">
                Highest engagement posts from this campaign
              </p>
            </div>
            <Button type="text" className="text-[#5373d4] font-medium">
              View All Media
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMedia.map((media) => (
              <div
                key={media.id}
                className="relative group rounded-xl overflow-hidden border border-input hover:border-[#5373d4] transition-all"
              >
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src={media.image}
                    alt="Media"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                      <Tag
                        color="white"
                        className="font-medium shadow-sm flex items-center"
                      >
                        {getPlatformIcon(media.platform)}
                        <span className="ml-1">{media.platform}</span>
                      </Tag>
                    </div>
                    <div>
                      <div className="bg-white/90 rounded-lg p-2 mb-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">
                            Engagement
                          </span>
                          <span className="text-xs font-bold text-green-600">
                            {media.engagementRate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar
                          size="small"
                          src={media.user.avatar}
                          className="mr-2 border border-white"
                        />
                        <span className="text-white text-sm font-medium">
                          {media.user.username}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-sm">
                  <div className="flex items-center justify-center w-6 h-6 bg-[#5373d4] rounded-full text-white text-xs font-bold">
                    {media.id}
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
                    <HeartFilled className="mr-1" />
                    <span>{media.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CampaignReporting;