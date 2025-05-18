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
  Row,
  Col,
  List,
  Steps,
} from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  TwitterOutlined,
  StarOutlined,
  FireOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  DashboardOutlined,
  RocketOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

export default function PlatformPage({ params }) {
  // Unwrap params promise
  const unwrappedParams = use(params);
  const platformName = unwrappedParams.platform;
  const formattedPlatformName =
    platformName.charAt(0).toUpperCase() + platformName.slice(1);
  const cityName = "London"; // Dynamic in real implementation
  const countryName = "UK"; // Dynamic in real implementation
  const currentYear = new Date().getFullYear();

  // State management
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [followerRange, setFollowerRange] = useState([0, 1000000]);

  // Color scheme
  const primaryColor = "#3680A1";
  const secondaryColor = "#5373d4";
  const platformColor =
    {
      instagram: "#3680A1",
      youtube: "#FF0000",
      tiktok: "#000000",
      twitter: "#1DA1F2",
    }[platformName] || primaryColor;

  // Categories data
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "fashion", name: "Fashion" },
    { id: "beauty", name: "Beauty" },
    { id: "wellness", name: "Wellness" },
    { id: "tech", name: "Technology" },
    { id: "food", name: "Food" },
    { id: "travel", name: "Travel" },
  ];

  // Follower ranges
  const followerRanges = [
    { label: "Nano (1K-10K)", value: [1000, 10000] },
    { label: "Micro (10K-50K)", value: [10000, 50000] },
    { label: "Mid (50K-100K)", value: [50000, 100000] },
    { label: "Macro (100K-500K)", value: [100000, 500000] },
    { label: "Mega (500K+)", value: [500000, 10000000] },
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
            name: `${formattedPlatformName} Star`,
            handle: `@${platformName.toLowerCase()}star`,
            followers: "520K",
            engagement: "9.5%",
            platform: platformName,
            categories: ["fashion", "beauty"],
            verified: true,
            trending: true,
            avatar: "/images/avatar-platform1.jpg",
            rate: "$2,500/post",
            location: `${cityName}, ${countryName}`,
          },
          {
            id: 2,
            name: `${formattedPlatformName} Explorer`,
            handle: `@${platformName.toLowerCase()}explorer`,
            followers: "380K",
            engagement: "11.2%",
            platform: platformName,
            categories: ["travel"],
            verified: true,
            trending: false,
            avatar: "/images/avatar-platform2.jpg",
            rate: "$4,000/video",
            location: `${cityName}, ${countryName}`,
          },
          {
            id: 3,
            name: `${formattedPlatformName} Eats`,
            handle: `@${platformName.toLowerCase()}eats`,
            followers: "890K",
            engagement: "6.8%",
            platform: platformName,
            categories: ["food"],
            verified: false,
            trending: true,
            avatar: "/images/avatar-platform3.jpg",
            rate: "$3,500/campaign",
            location: `${cityName}, ${countryName}`,
          },
          {
            id: 4,
            name: `Tech${formattedPlatformName}`,
            handle: `@tech${platformName.toLowerCase()}`,
            followers: "210K",
            engagement: "8.9%",
            platform: platformName,
            categories: ["tech"],
            verified: false,
            trending: false,
            avatar: "/images/avatar-platform4.jpg",
            rate: "$1,200/thread",
            location: `${cityName}, ${countryName}`,
          },
          {
            id: 5,
            name: `${formattedPlatformName} Wellness`,
            handle: `@${platformName.toLowerCase()}wellness`,
            followers: "450K",
            engagement: "7.2%",
            platform: platformName,
            categories: ["wellness"],
            verified: true,
            trending: true,
            avatar: "/images/avatar-platform5.jpg",
            rate: "$2,800/post",
            location: `${cityName}, ${countryName}`,
          },
          {
            id: 6,
            name: `Real${formattedPlatformName}`,
            handle: `@real${platformName.toLowerCase()}`,
            followers: "320K",
            engagement: "14.5%",
            platform: platformName,
            categories: ["lifestyle"],
            verified: false,
            trending: false,
            avatar: "/images/avatar-platform6.jpg",
            rate: "$1,800/video",
            location: `${cityName}, ${countryName}`,
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
  }, [platformName, formattedPlatformName, cityName, countryName]);

  const getPlatformIcon = () => {
    switch (platformName) {
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

  // Helper function to convert follower count to numerical value
  const getFollowerCount = (followerStr) => {
    if (!followerStr) return 0;

    // Remove any commas first
    const cleanStr = followerStr.replace(/,/g, "");

    // Check if the string contains K or M
    if (cleanStr.endsWith("K")) {
      return parseFloat(cleanStr.replace("K", "")) * 1000;
    } else if (cleanStr.endsWith("M")) {
      return parseFloat(cleanStr.replace("M", "")) * 1000000;
    } else {
      return parseFloat(cleanStr);
    }
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      influencer.categories.includes(activeCategory);

    // Convert follower string to number (handling both 'K' and full numbers)
    const followerCount = influencer.followers.includes("K")
      ? parseFloat(influencer.followers.replace("K", "")) * 1000
      : parseInt(influencer.followers);

    const matchesFollowers =
      followerCount >= followerRange[0] && followerCount <= followerRange[1];

    return matchesSearch && matchesCategory && matchesFollowers;
  });

  return (
    <>
      <Head>
        <title>
          {influencers.length}+ Best {formattedPlatformName} Influencers in{" "}
          {cityName}, {countryName} in {currentYear}
        </title>
        <meta
          name="description"
          content={`Work with ${influencers.length} top ${formattedPlatformName} influencers in ${cityName}, ${countryName}. Use Grace Belgravia to run campaigns and get high-quality content that boosts your brand.`}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4"
            style={{
              background: `${platformColor}20`,
              border: `1px solid ${platformColor}30`,
            }}
          >
            {getPlatformIcon()}
            <Text style={{ color: platformColor }} className="font-medium ml-2">
              {formattedPlatformName} Creators
            </Text>
          </div>
          <Title
            level={1}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Find {formattedPlatformName} Creators in{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {cityName}, {countryName}
            </span>
          </Title>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            Who know how to deliver real results for your brand
          </Text>
        </div>

        {/* Top Content Section */}
        <div className="mb-16 bg-white p-8 rounded-xl shadow-sm border border-input">
          <div className="max-w-4xl mx-auto text-center">
            <Title level={2} className="!mb-6 !text-gray-900">
              Looking to reach your audience on {formattedPlatformName} in{" "}
              {cityName}, {countryName}?
            </Title>
            <Text className="text-lg text-gray-600 mb-8 block">
              Grace Belgravia is your one-stop shop to find influencers who live
              and breathe content – and know how to get real results. Whether
              it's fashion, beauty, wellness, tech or something niche, we've got
              creators ready to collaborate on campaigns that fit your brand.
            </Text>
            <Text className="text-lg text-gray-600 block">
              You can create gifted, paid or affiliate campaigns and use our
              filters to find creators based on their follower count, content
              style, engagement levels and more. Run everything from your laptop
              or our mobile app, and start turning scrolls into sales with UGC
              that actually performs.
            </Text>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-input">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              size="large"
              placeholder={`Search ${formattedPlatformName} influencers...`}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
            <Select
              size="large"
              defaultValue="all"
              className="w-full md:w-64"
              onChange={setActiveCategory}
              suffixIcon={<FilterOutlined />}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Select
              size="large"
              defaultValue={[0, 1000000]}
              className="w-full md:w-64"
              onChange={(value) => {
                // Ensure value is an array before setting it as followerRange
                if (Array.isArray(value)) {
                  setFollowerRange(value);
                } else {
                  // If a non-array value is received, use default range
                  console.warn(
                    "Received non-array follower range value:",
                    value
                  );
                  setFollowerRange([0, 1000000]);
                }
              }}
              suffixIcon={<TeamOutlined />}
              options={followerRanges}
            />
          </div>
        </div>

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
                      style={{ background: `${platformColor}10` }}
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
                          <StarOutlined style={{ color: platformColor }} />
                        </Tooltip>
                      )}
                    </div>

                    <Text type="secondary" className="block mb-3">
                      {influencer.handle} • {influencer.followers} followers
                    </Text>

                    <div className="flex items-center gap-2 mb-3">
                      <Tag
                        icon={getPlatformIcon()}
                        color={platformColor}
                        className="!m-0"
                      >
                        {formattedPlatformName}
                      </Tag>
                      <Tag color="geekblue">
                        {influencer.engagement} engagement
                      </Tag>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {influencer.categories.map((category, i) => (
                        <Tag key={i} color="blue">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Tag>
                      ))}
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
                        background: platformColor,
                        borderColor: platformColor,
                      }}
                      icon={<LinkOutlined />}
                    >
                      View Profile
                    </Button>
                    <Button
                      block
                      icon={<MailOutlined />}
                      style={{
                        color: platformColor,
                        borderColor: platformColor,
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
                  No {formattedPlatformName} influencers found matching your
                  criteria
                </Title>
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                    setFollowerRange([0, 1000000]);
                  }}
                  style={{
                    background: platformColor,
                    borderColor: platformColor,
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* How It Works Section */}
        <Divider className="my-16" />
        <div className="mb-16">
          <Title level={2} className="text-center mb-12">
            <RocketOutlined className="mr-2" style={{ color: platformColor }} />
            How It Works
          </Title>

          <Steps direction="vertical" current={1} className="max-w-3xl mx-auto">
            <Step
              title="Find the right influencers"
              description={
                <Text type="secondary">
                  Filter {formattedPlatformName} influencers in {cityName},{" "}
                  {countryName} by audience type, content quality and follower
                  data
                </Text>
              }
              icon={<SearchOutlined style={{ color: platformColor }} />}
            />
            <Step
              title="Organize your selections"
              description={
                <Text type="secondary">
                  Organize influencers into buckets to streamline campaign
                  invites
                </Text>
              }
              icon={<DashboardOutlined style={{ color: platformColor }} />}
            />
            <Step
              title="Set up your campaign"
              description={
                <Text type="secondary">
                  Set up a campaign in minutes - include your brief, goals and
                  offer type
                </Text>
              }
              icon={<CheckCircleOutlined style={{ color: platformColor }} />}
            />
            <Step
              title="Connect with creators"
              description={
                <Text type="secondary">
                  Invite influencers directly or accept applications
                </Text>
              }
              icon={<TeamOutlined style={{ color: platformColor }} />}
            />
            <Step
              title="Launch and monitor"
              description={
                <Text type="secondary">
                  Approve who you want to work with and monitor progress
                </Text>
              }
              icon={<DollarOutlined style={{ color: platformColor }} />}
            />
          </Steps>
        </div>

        {/* CTA Section */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          <Title level={2} className="!text-white !mb-4">
            Ready to Boost Your {formattedPlatformName} Presence?
          </Title>
          <Text className="text-blue-100 block mb-8 max-w-2xl mx-auto">
            Start collaborating with top {formattedPlatformName} creators in{" "}
            {cityName}, {countryName} today
          </Text>
          <Space>
            <Button
              type="primary"
              size="large"
              className="!bg-white !font-semibold"
              style={{ color: primaryColor }}
            >
              Launch Campaign
            </Button>
            <Button
              size="large"
              className="!bg-transparent !border-white !text-white hover:!bg-white hover:!bg-opacity-10"
            >
              Book Strategy Call
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
}
