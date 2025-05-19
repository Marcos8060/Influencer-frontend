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
} from "antd";
import {
  EnvironmentOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  TwitterOutlined,
  StarOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  LinkOutlined,
  GlobalOutlined,
  FlagOutlined,
  CheckOutlined,
  RocketOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";

const { Title, Text } = Typography;
const { Option } = Select;

export default function CountryPage({ params }) {
  // Unwrap params promise
  const unwrappedParams = use(params);
  const countryName = unwrappedParams.country;
  const formattedCountryName =
    countryName.charAt(0).toUpperCase() + countryName.slice(1);

  // State management
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [countryData, setCountryData] = useState(null);
  const currentYear = new Date().getFullYear();

  // Color scheme
  const primaryColor = "#3680A1";
  const secondaryColor = "#5373d4";
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
  };

  // Categories data
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "fashion", name: "Fashion" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "travel", name: "Travel" },
    { id: "food", name: "Food" },
    { id: "tech", name: "Technology" },
    { id: "fitness", name: "Fitness" },
  ];

  // Country flag emoji mapping
  const countryFlags = {
    usa: "🇺🇸",
    uk: "🇬🇧",
    france: "🇫🇷",
    germany: "🇩🇪",
    japan: "🇯🇵",
    uae: "🇦🇪",
    australia: "🇦🇺",
    canada: "🇨🇦",
  };

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock country data
        const mockCountryData = {
          totalInfluencers: 2450,
          topCities: ["London", "Manchester", "Birmingham"],
          popularPlatforms: ["Instagram", "YouTube", "TikTok"],
        };
        setCountryData(mockCountryData);

        const mockInfluencers = [
          {
            id: 1,
            name: `Top ${formattedCountryName} Creator`,
            handle: `@bestof${countryName.toLowerCase()}`,
            followers: "520K",
            engagement: "9.5%",
            platform: "instagram",
            categories: ["fashion", "lifestyle"],
            verified: true,
            trending: true,
            avatar: "/images/avatar-country1.jpg",
            rate: "$2,500/post",
            city: "London",
          },
          {
            id: 2,
            name: `${formattedCountryName} Travel Guide`,
            handle: `@travel${countryName.toLowerCase()}`,
            followers: "380K",
            engagement: "11.2%",
            platform: "youtube",
            categories: ["travel"],
            verified: true,
            trending: false,
            avatar: "/images/avatar-country2.jpg",
            rate: "$4,000/video",
            city: "Manchester",
          },
          {
            id: 3,
            name: `${formattedCountryName} Eats`,
            handle: `@food${countryName.toLowerCase()}`,
            followers: "890K",
            engagement: "6.8%",
            platform: "tiktok",
            categories: ["food"],
            verified: false,
            trending: true,
            avatar: "/images/avatar-country3.jpg",
            rate: "$3,500/campaign",
            city: "Birmingham",
          },
          {
            id: 4,
            name: `Tech${formattedCountryName}`,
            handle: `@tech${countryName.toLowerCase()}`,
            followers: "210K",
            engagement: "8.9%",
            platform: "twitter",
            categories: ["tech"],
            verified: false,
            trending: false,
            avatar: "/images/avatar-country4.jpg",
            rate: "$1,200/thread",
            city: "London",
          },
          {
            id: 5,
            name: `${formattedCountryName} Fitness`,
            handle: `@fit${countryName.toLowerCase()}`,
            followers: "450K",
            engagement: "7.2%",
            platform: "instagram",
            categories: ["fitness"],
            verified: true,
            trending: true,
            avatar: "/images/avatar-country5.jpg",
            rate: "$2,800/post",
            city: "Manchester",
          },
          {
            id: 6,
            name: `Real${formattedCountryName}`,
            handle: `@real${countryName.toLowerCase()}`,
            followers: "320K",
            engagement: "14.5%",
            platform: "tiktok",
            categories: ["lifestyle"],
            verified: false,
            trending: false,
            avatar: "/images/avatar-country6.jpg",
            rate: "$1,800/video",
            city: "Birmingham",
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
    document.title = `${influencers?.length} Best Influencers in ${formattedCountryName} in ${currentYear}`;
  }, [countryName, formattedCountryName, influencers?.length, currentYear]);

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
        return <GlobalOutlined />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "instagram":
        return "#E1306C";
      case "youtube":
        return "#FF0000";
      case "tiktok":
        return "#000000";
      case "twitter":
        return "#1DA1F2";
      default:
        return primaryColor;
    }
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform =
      platformFilter === "all" || influencer.platform === platformFilter;
    const matchesCategory =
      activeCategory === "all" ||
      influencer.categories.includes(activeCategory);
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>{`${influencers?.length} Best Influencers in ${formattedCountryName} in ${currentYear}`}</title>
        <meta
          name="description"
          content={`Explore ${influencers?.length} of the best influencers in ${formattedCountryName} and run powerful campaigns with Grace Belgravia. Get UGC, grow your reach and connect with the right audiences today.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4"
            style={{
              background: `${primaryColor}20`,
              border: `1px solid ${primaryColor}30`,
            }}
          >
            <FlagOutlined style={{ color: primaryColor }} className="mr-2" />
            <Text style={{ color: primaryColor }} className="font-medium">
              {countryFlags[countryName.toLowerCase()] || "🌐"}{" "}
              {formattedCountryName}
            </Text>
          </div>
          <Title
            level={1}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Find the Best Influencers in{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {formattedCountryName}
            </span>{" "}
            for Your Campaigns
          </Title>
          <p className=" text-gray-600 max-w-2xl mx-auto">
            Looking to grow your brand in {formattedCountryName}? Grace
            Belgravia gives you instant access to some of the best influencers
            in the country. Whether you're a small business, an e-commerce brand
            or a growing startup, you'll find creators here who match your vibe
            and help you get real results.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From paid partnerships to gifted and affiliate campaigns, it’s all
            quick and easy to set up. You can filter by audience type, social
            platform, influencer location and more. Use our mobile apps to keep
            things moving wherever you are. If you’re serious about scaling in
            <span className="text-primary">{formattedCountryName}</span>, this is where it starts.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-input">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              size="large"
              placeholder="Search influencers..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
            <Select
              size="large"
              defaultValue="all"
              className="w-full md:w-64"
              onChange={setPlatformFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Platforms</Option>
              <Option value="instagram">
                <InstagramOutlined className="mr-2" /> Instagram
              </Option>
              <Option value="youtube">
                <YoutubeOutlined className="mr-2" /> YouTube
              </Option>
              <Option value="tiktok">
                <TikTokOutlined className="mr-2" /> TikTok
              </Option>
              <Option value="twitter">
                <TwitterOutlined className="mr-2" /> Twitter
              </Option>
            </Select>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                type={activeCategory === category.id ? "primary" : "default"}
                size="middle"
                onClick={() => setActiveCategory(category.id)}
                style={
                  activeCategory === category.id
                    ? {
                        background: primaryColor,
                        borderColor: primaryColor,
                      }
                    : {}
                }
              >
                {category.name}
              </Button>
            ))}
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
                      style={{ background: `${primaryColor}10` }}
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
                        <Tag color="blue">{influencer.city}</Tag>
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
                          <StarOutlined style={{ color: primaryColor }} />
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
                        background: primaryColor,
                        borderColor: primaryColor,
                      }}
                      icon={<LinkOutlined />}
                    >
                      View Profile
                    </Button>
                    <Button
                      block
                      icon={<MailOutlined />}
                      style={{ color: primaryColor, borderColor: primaryColor }}
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
                  No influencers found matching your criteria
                </Title>
                <Button
                  type="primary"
                  onClick={() => {
                    setSearchTerm("");
                    setPlatformFilter("all");
                    setActiveCategory("all");
                  }}
                  style={{
                    background: primaryColor,
                    borderColor: primaryColor,
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        )}

        <Divider className="my-16" />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <Title level={2} className="flex items-center mb-6">
              <RocketOutlined
                className="mr-3"
                style={{ color: primaryColor }}
              />
              How It Works
            </Title>

            <List
              itemLayout="horizontal"
              dataSource={[
                `Discover influencers by audience demographics, platform, location (like ${formattedCountryName}) and follower size`,
                "Save and sort influencers into buckets for easier campaign planning",
                "Create and launch campaigns in minutes - choose paid, gifted or affiliate",
                "Send invites to influencers or receive applications through the platform",
                "Approve collaborations and track their performance in real time",
                "Access accurate reporting pulled straight from social platforms",
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
                "Simple, affordable influencer marketing for all business sizes",
                `Find creators who speak to your ideal audience in ${formattedCountryName}`,
                "Get reusable UGC for ads, email, social and beyond",
                "Enjoy full content usage rights with built-in contracts",
                "Let influencers discover your brand and apply to work with you",
                `Stay in the loop when new creators from ${formattedCountryName} join`,
                "Run and track your campaigns from anywhere with our mobile apps",
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

        {/* CTA Section */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center text-white"
          style={gradientStyle}
        >
          <Title level={2} className="!text-white !mb-4">
            Need Country-Specific Campaigns?
          </Title>
          <Text className="text-blue-100 block mb-8 max-w-2xl mx-auto">
            Our regional experts can help you build effective influencer
            campaigns tailored to {formattedCountryName}'s market
          </Text>
          <Space>
            <Button
              type="primary"
              size="large"
              className="!bg-white !font-semibold"
              style={{ color: primaryColor }}
            >
              Get Country Report
            </Button>
            <Button
              size="large"
              className="!bg-transparent !border-white !text-white hover:!bg-white hover:!bg-opacity-10"
            >
              Speak to Regional Expert
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
}
