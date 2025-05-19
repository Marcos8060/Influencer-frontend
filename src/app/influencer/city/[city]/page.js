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
  Tooltip,
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
  CheckOutlined,
  RocketOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import Footer from "@/app/Components/Footer";

const { Title, Text } = Typography;
const { Option } = Select;

export default function CityPage({ params }) {
  // Unwrap params promise
  const unwrappedParams = use(params);
  const cityName = unwrappedParams.city;
  const formattedCityName =
    cityName.charAt(0).toUpperCase() + cityName.slice(1);

  // State management
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
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

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockInfluencers = [
          {
            id: 1,
            name: `Sarah ${formattedCityName}`,
            handle: `@sarah${cityName.toLowerCase()}`,
            followers: "124K",
            engagement: "8.2%",
            platform: "instagram",
            categories: ["fashion", "lifestyle"],
            verified: true,
            avatar: "/images/avatar1.jpg",
            rate: "$1,200/post",
          },
          {
            id: 2,
            name: `TravelWith${formattedCityName}`,
            handle: `@travel${cityName.toLowerCase()}`,
            followers: "89K",
            engagement: "12.1%",
            platform: "youtube",
            categories: ["travel", "food"],
            verified: false,
            avatar: "/images/avatar2.jpg",
            rate: "$2,500/video",
          },
          {
            id: 3,
            name: `${formattedCityName}Foodie`,
            handle: `@${cityName.toLowerCase()}food`,
            followers: "256K",
            engagement: "5.7%",
            platform: "tiktok",
            categories: ["food"],
            verified: true,
            avatar: "/images/avatar3.jpg",
            rate: "$3,000/campaign",
          },
          {
            id: 4,
            name: `Tech${formattedCityName.charAt(0)}`,
            handle: `@tech${cityName.toLowerCase()}`,
            followers: "78K",
            engagement: "9.3%",
            platform: "twitter",
            categories: ["tech"],
            verified: false,
            avatar: "/images/avatar4.jpg",
            rate: "$800/thread",
          },
          {
            id: 5,
            name: `${formattedCityName}Fitness`,
            handle: `@fit${cityName.toLowerCase()}`,
            followers: "312K",
            engagement: "7.8%",
            platform: "instagram",
            categories: ["fitness", "lifestyle"],
            verified: true,
            avatar: "/images/avatar5.jpg",
            rate: "$1,800/post",
          },
          {
            id: 6,
            name: `Local${formattedCityName.charAt(0)}`,
            handle: `@local${cityName.toLowerCase()}`,
            followers: "45K",
            engagement: "15.2%",
            platform: "tiktok",
            categories: ["lifestyle"],
            verified: false,
            avatar: "/images/avatar6.jpg",
            rate: "$500/video",
          },
        ];

        setInfluencers(mockInfluencers);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    document.title = `${influencers?.length} Best Influencers in ${formattedCityName} in ${currentYear}`;
  }, [cityName, formattedCityName, influencers, currentYear]);

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
        return <EnvironmentOutlined />;
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
        <title>{`${influencers?.length} Best Influencers in ${formattedCityName} in ${currentYear}`}</title>
        <meta
          name="description"
          content={`Discover ${influencers?.length} of the best influencers in ${formattedCityName} to work with this year. Use Grace Belgravia to launch influencer campaigns, get high-quality UGC and grow your brand with ease.`}
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
            <EnvironmentOutlined
              style={{ color: primaryColor }}
              className="mr-2"
            />
            <Text style={{ color: primaryColor }} className="font-medium">
              Influencers in {formattedCityName}
            </Text>
          </div>
          <p
            className="text-2xl md:text-2xl lg:text-4xl mb-4 font-normal"
          >
            Explore <span className="text-primary font-bold">{influencers?.length}</span> of the best influencers in{" "}
            <span
              className="font-bold"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {formattedCityName}
            </span>{" "}
            and run powerful campaigns with Grace Belgravia. Get UGC, grow your
            reach and connect with the right audiences today
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
              <Card key={i} className="border-gray-200">
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
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col"
                  cover={
                    <div
                      className="h-48 relative"
                      style={{ background: `${primaryColor}10` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Avatar
                          size={100}
                          src={influencer.avatar}
                          className="border-4 border-white shadow-lg"
                        />
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
                `Search influencers by location (like ${formattedCityName}), follower count, platform, audience engagement and more`,
                "Group your favourite creators into buckets for quick comparisons and invites",
                "Launch campaigns in minutes - gifted, paid or affiliate collaborations",
                "Invite influencers or let them apply directly to your campaigns",
                "Approve the creators you want to work with and track content delivery",
                "See real-time performance reports powered by direct platform data",
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
                "Affordable, flexible and super easy to use",
                "Get authentic UGC for your brand's social media, ads, website and beyond",
                "Built-in contracts give you full usage rights to the content",
                `Influencers in ${formattedCityName} can discover and apply to your campaigns`,
                "Get alerts when new creators in your niche join",
                "Manage everything from your phone with our Apple and Google Play apps",
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
        <Divider className="my-16" />
        <Footer />
      </div>
    </>
  );
}
