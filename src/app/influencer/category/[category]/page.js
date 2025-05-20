"use client";
import { useState, useEffect, use } from "react";
import {
  Typography,
  Card,
  Avatar,
  Button,
  Input,
  Select,
  Tag,
  Divider,
  Space,
  Skeleton,
  Badge,
  Tooltip,
  List,
  Tabs,
  Collapse,
} from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  TwitterOutlined,
  StarOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  LinkOutlined,
  CheckOutlined,
  RocketOutlined,
  BulbOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/app/Components/Footer";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

export default function CategoryPage({ params }) {
  // Unwrap params promise
  const unwrappedParams = use(params);
  const categoryName = unwrappedParams.category;
  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() +
    categoryName.slice(1).replace(/-/g, " ");
  const currentYear = new Date().getFullYear();

  // State management
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePlatform, setActivePlatform] = useState("all");
  const [followerRange, setFollowerRange] = useState([0, 1000000]);
  const [activeTab, setActiveTab] = useState("influencers");

  // Color scheme
  const primaryColor = "#3680A1";
  const secondaryColor = "#5373d4";
  const categoryColor =
    {
      fashion: "#3680A1",
    }[categoryName] || primaryColor;

  // Platforms data
  const platforms = [
    { id: "all", name: "All Platforms", icon: <GlobalOutlined /> },
    { id: "instagram", name: "Instagram", icon: <InstagramOutlined /> },
    { id: "youtube", name: "YouTube", icon: <YoutubeOutlined /> },
    { id: "tiktok", name: "TikTok", icon: <TikTokOutlined /> },
    { id: "twitter", name: "Twitter", icon: <TwitterOutlined /> },
  ];

  // Follower ranges
  const followerRanges = [
    { label: "Nano (1K-10K)", value: [1000, 10000] },
    { label: "Micro (10K-50K)", value: [10000, 50000] },
    { label: "Mid (50K-100K)", value: [50000, 100000] },
    { label: "Macro (100K-500K)", value: [100000, 500000] },
    { label: "Mega (500K+)", value: [500000, 10000000] },
  ];

  // Category statistics
  const categoryStats = [
    { value: "15K+", label: "Creators" },
    { value: "120+", label: "Countries" },
    { value: "8.2%", label: "Avg. Engagement" },
    { value: "$1.2M", label: "Paid Last Month" },
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockInfluencers = [
          {
            id: 1,
            name: `${formattedCategoryName} Star`,
            handle: `@${categoryName.toLowerCase()}star`,
            followers: "520K",
            engagement: "9.5%",
            platform: "instagram",
            categories: [categoryName],
            verified: true,
            trending: true,
            avatar: "/images/avatar-platform1.jpg",
            rate: "$2,500/post",
            location: "London, UK",
          },
          {
            id: 2,
            name: `${formattedCategoryName} Explorer`,
            handle: `@${categoryName.toLowerCase()}explorer`,
            followers: "380K",
            engagement: "11.2%",
            platform: "youtube",
            categories: [categoryName],
            verified: true,
            trending: false,
            avatar: "/images/avatar-platform2.jpg",
            rate: "$4,000/video",
            location: "New York, USA",
          },
          {
            id: 3,
            name: `${formattedCategoryName} Enthusiast`,
            handle: `@${categoryName.toLowerCase()}lover`,
            followers: "890K",
            engagement: "6.8%",
            platform: "tiktok",
            categories: [categoryName],
            verified: false,
            trending: true,
            avatar: "/images/avatar-platform3.jpg",
            rate: "$3,500/campaign",
            location: "Paris, France",
          },
          {
            id: 4,
            name: `Tech ${formattedCategoryName}`,
            handle: `@tech${categoryName.toLowerCase()}`,
            followers: "210K",
            engagement: "8.9%",
            platform: "twitter",
            categories: [categoryName],
            verified: false,
            trending: false,
            avatar: "/images/avatar-platform4.jpg",
            rate: "$1,200/thread",
            location: "Tokyo, Japan",
          },
          {
            id: 5,
            name: `${formattedCategoryName} Wellness`,
            handle: `@${categoryName.toLowerCase()}wellness`,
            followers: "450K",
            engagement: "7.2%",
            platform: "instagram",
            categories: [categoryName],
            verified: true,
            trending: true,
            avatar: "/images/avatar-platform5.jpg",
            rate: "$2,800/post",
            location: "Sydney, Australia",
          },
          {
            id: 6,
            name: `Real ${formattedCategoryName}`,
            handle: `@real${categoryName.toLowerCase()}`,
            followers: "320K",
            engagement: "14.5%",
            platform: "youtube",
            categories: [categoryName],
            verified: false,
            trending: false,
            avatar: "/images/avatar-platform6.jpg",
            rate: "$1,800/video",
            location: "Toronto, Canada",
          },
        ];

        setInfluencers(mockInfluencers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    document.title = `${influencers?.length} Best ${formattedCategoryName} Influencers | Grace Belgravia ${currentYear}`;
  }, [categoryName, formattedCategoryName, influencers]);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <InstagramOutlined />;
      case "youtube":
        return <YoutubeOutlined />;
      case "tiktok":
        return <TikTokOutlined />;
      case "twitter":
        return <TwitterOutlined />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform) => {
    return (
      {
        instagram: "#3680A1",
      }[platform] || primaryColor
    );
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform =
      activePlatform === "all" || influencer.platform === activePlatform;

    // Convert follower string to number
    const followerCount = influencer.followers.includes("K")
      ? parseFloat(influencer.followers.replace("K", "")) * 1000
      : parseInt(influencer.followers);

    const matchesFollowers =
      followerCount >= followerRange?.[0] && followerCount <= followerRange[1];

    return matchesSearch && matchesPlatform && matchesFollowers;
  });

  return (
    <>
      <Head>
        <title>
          Best {formattedCategoryName} Influencers in {currentYear} | Grace
          Belgravia
        </title>
        <meta
          name="description"
          content={`Discover top ${formattedCategoryName} influencers across all social platforms. Find creators perfect for your brand collaborations in the ${formattedCategoryName} niche.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4"
            style={{
              background: `${categoryColor}20`,
              border: `1px solid ${categoryColor}30`,
            }}
          >
            <span style={{ color: categoryColor }} className="font-medium">
              {formattedCategoryName}
            </span>
          </div>
          <Title
            level={1}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
          >
            Top{" "}
            <span style={{ color: categoryColor }}>
              {formattedCategoryName}
            </span>{" "}
            Influencers Worldwide
          </Title>
          <Text className="text-lg text-gray-600 mb-6 block text-center max-w-3xl mx-auto">
            Discover the most engaging {formattedCategoryName.toLowerCase()}{" "}
            creators across Instagram, YouTube, TikTok and Twitter. Perfect for
            brand collaborations, sponsored content, and ambassador programs.
          </Text>
        </div>

        

        {/* Tabs Section */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-8"
          tabBarExtraContent={
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                size="large"
                placeholder={`Search ${formattedCategoryName} influencers...`}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
              <Select
                size="large"
                defaultValue="all"
                className="w-full md:w-48"
                onChange={setActivePlatform}
                suffixIcon={<FilterOutlined />}
              >
                {platforms.map((platform) => (
                  <Option key={platform.id} value={platform.id}>
                    <div className="flex items-center">
                      {platform.icon}
                      <span className="ml-2">{platform.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
              {/* <Select
                size="large"
                defaultValue={[0, 1000000]}
                className="w-full md:w-48"
                onChange={setFollowerRange}
                suffixIcon={<TeamOutlined />}
                options={followerRanges}
              /> */}
            </div>
          }
        >
          <TabPane tab="Influencers" key="influencers">
            {/* Influencers Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-input">
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInfluencers.map((influencer) => (
                    <Card
                      key={influencer.id}
                      hoverable
                      className="border border-input rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col"
                      cover={
                        <div
                          className="h-48 relative"
                          style={{
                            background: `${getPlatformColor(
                              influencer.platform
                            )}10`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Badge
                              count={influencer.trending ? "TRENDING" : null}
                              color="orange"
                              offset={[-20, 10]}
                              style={{ fontWeight: 600 }}
                            >
                              <Avatar
                                size={100}
                                src={influencer.avatar}
                                className="border-4 border-white shadow-lg"
                              />
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Tag color="blue">{influencer.location}</Tag>
                          </div>
                        </div>
                      }
                    >
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <Title level={4} className="!mb-0 !mr-2">
                            {influencer.name}
                          </Title>
                          {influencer.verified && (
                            <Tooltip title="Verified Influencer">
                              <StarOutlined
                                style={{
                                  color: getPlatformColor(influencer.platform),
                                }}
                              />
                            </Tooltip>
                          )}
                        </div>

                        <Text type="secondary" className="block mb-3">
                          {influencer.handle} • {influencer.followers} followers
                        </Text>

                        <div className="flex items-center gap-2 mb-3">
                          <Tag
                            icon={getPlatformIcon(influencer.platform)}
                            color={getPlatformColor(influencer.platform)}
                            className="!m-0"
                          >
                            {influencer.platform.charAt(0).toUpperCase() +
                              influencer.platform.slice(1)}
                          </Tag>
                          <Tag color="geekblue">
                            {influencer.engagement} engagement
                          </Tag>
                        </div>

                        <div className="mb-4">
                          <Text strong>Rate:</Text> {influencer.rate}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Button
                          type="primary"
                          block
                          style={{
                            background: getPlatformColor(influencer.platform),
                            borderColor: getPlatformColor(influencer.platform),
                          }}
                          icon={<LinkOutlined />}
                        >
                          View Profile
                        </Button>
                        <Button
                          block
                          icon={<MailOutlined />}
                          style={{
                            color: getPlatformColor(influencer.platform),
                            borderColor: getPlatformColor(influencer.platform),
                          }}
                        >
                          Contact
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {filteredInfluencers.length === 0 && (
                  <div className="text-center py-16">
                    <Title level={4} className="mb-4">
                      No {formattedCategoryName} influencers found matching your
                      criteria
                    </Title>
                    <Button
                      type="primary"
                      onClick={() => {
                        setSearchTerm("");
                        setActivePlatform("all");
                        setFollowerRange([0, 1000000]);
                      }}
                      style={{
                        background: categoryColor,
                        borderColor: categoryColor,
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabPane>

          <TabPane tab="Trends" key="trends">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-input">
              <Title
                level={3}
                className="mb-6"
                style={{ color: categoryColor }}
              >
                {formattedCategoryName} Influencer Marketing Trends
              </Title>

              <Collapse accordion className="bg-transparent">
                <Panel
                  header={`What's working in ${formattedCategoryName} influencer marketing?`}
                  key="1"
                >
                  <List
                    dataSource={[
                      `Authentic UGC performs 3x better than traditional ads in the ${formattedCategoryName} space`,
                      `Micro-influencers (10K-50K followers) drive 60% higher engagement for ${formattedCategoryName} brands`,
                      `Video content generates 2x more conversions than static posts`,
                      `Long-term partnerships (3+ months) yield 40% better ROI`,
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <CheckOutlined style={{ color: categoryColor }} />
                          }
                          description={item}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel
                  header={`Best practices for ${formattedCategoryName} campaigns`}
                  key="2"
                >
                  <List
                    dataSource={[
                      `Focus on storytelling rather than direct selling`,
                      `Leverage seasonal trends in the ${formattedCategoryName} industry`,
                      `Use a mix of platform-specific content formats`,
                      `Provide clear creative guidelines but allow influencer creativity`,
                      `Track both engagement metrics and conversion rates`,
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <CheckOutlined style={{ color: categoryColor }} />
                          }
                          description={item}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </div>
          </TabPane>

          <TabPane tab="Case Studies" key="case-studies">
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                hoverable
                className="border border-input rounded-xl overflow-hidden"
                cover={
                  <div
                    className="h-48"
                    style={{ background: `${categoryColor}20` }}
                  />
                }
              >
                <Title level={4} className="!mb-2">
                  Luxury {formattedCategoryName} Brand 3x ROI
                </Title>
                <Text type="secondary" className="block mb-3">
                  How a premium brand scaled their DTC sales through
                  nano-influencers
                </Text>
                <Button
                  type="primary"
                  style={{
                    background: categoryColor,
                    borderColor: categoryColor,
                  }}
                >
                  Read Case Study
                </Button>
              </Card>

              <Card
                hoverable
                className="border border-input rounded-xl overflow-hidden"
                cover={
                  <div
                    className="h-48"
                    style={{ background: `${categoryColor}20` }}
                  />
                }
              >
                <Title level={4} className="!mb-2">
                  {formattedCategoryName} Startup Goes Viral
                </Title>
                <Text type="secondary" className="block mb-3">
                  TikTok strategy that generated 2M+ views in 30 days
                </Text>
                <Button
                  type="primary"
                  style={{
                    background: categoryColor,
                    borderColor: categoryColor,
                  }}
                >
                  Read Case Study
                </Button>
              </Card>
            </div>
          </TabPane>
        </Tabs>

        {/* Why Choose Section */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-16"
          style={{ background: `${categoryColor}10` }}
        >
          <Title level={2} className="text-center mb-8">
            <BulbOutlined className="mr-3" style={{ color: categoryColor }} />
            Why Work With {formattedCategoryName} Influencers?
          </Title>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-none">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: `${categoryColor}20` }}
              >
                <CheckOutlined style={{ color: categoryColor }} />
              </div>
              <Title level={4} className="!mb-3">
                Targeted Reach
              </Title>
              <Text>
                {formattedCategoryName} influencers have highly engaged
                audiences already interested in your niche.
              </Text>
            </Card>
            <Card className="border-0 shadow-none">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: `${categoryColor}20` }}
              >
                <CheckOutlined style={{ color: categoryColor }} />
              </div>
              <Title level={4} className="!mb-3">
                Authentic Content
              </Title>
              <Text>
                Get genuine product showcases from trusted voices in the{" "}
                {formattedCategoryName} community.
              </Text>
            </Card>
            <Card className="border-0 shadow-none">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: `${categoryColor}20` }}
              >
                <CheckOutlined style={{ color: categoryColor }} />
              </div>
              <Title level={4} className="!mb-3">
                Higher Conversions
              </Title>
              <Text>
                {formattedCategoryName} influencer recommendations drive 3-5x
                higher conversion rates than ads.
              </Text>
            </Card>
          </div>
        </div>
        <Divider className="my-16" />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="mb-16">
            <Title level={2} className="text-center mb-12">
              <RocketOutlined
                className="mr-2"
                style={{ color: primaryColor }}
              />
              How It Works
            </Title>

            <List
              itemLayout="horizontal"
              dataSource={[
                `Filter influencers by location ([City], [Country]), niche (${categoryName}), follower size, engagement and more`,
                "Add your favourites to buckets to keep things organised",
                "Launch campaigns with clear briefs and collaboration types (gifted, paid, affiliate)",
                "Invite influencers or let them apply to your campaign",
                "Approve partners and track all content delivery",
                `Review real results directly from social media platforms`,
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckOutlined style={{ color: primaryColor }} />}
                    description={item}
                  />
                </List.Item>
              )}
            />
          </div>
          <div>
            <Title level={2} className="flex items-center mb-6">
              <BulbOutlined className="mr-3" style={{ color: primaryColor }} />
              Why Choose Grace Belgravia
            </Title>

            <List
              itemLayout="horizontal"
              dataSource={[
                `Target influencers with real audiences in the ${categoryName} niche`,
                `Run cost-effective campaigns in [City], [Country]`,
                "Get UGC that’s perfect for organic posts, paid ads and beyond",
                "All content rights are yours with built-in contracts",
                "Influencers can discover and apply to your campaigns directly",
                `Be notified when new ${categoryName} creators join in [City]`,
                "Use our iOS and Android apps to stay in control from anywhere",
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckOutlined style={{ color: primaryColor }} />}
                    description={item}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
