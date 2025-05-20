"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Select,
  Divider,
  Space,
  Tag,
  Tabs,
  Steps,
} from "antd";
import {
  EnvironmentOutlined,
  GlobalOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  TwitterOutlined,
  SearchOutlined,
  StarOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  UserOutlined,
  CheckOutlined,
  FilterOutlined,
  TeamOutlined,
  BulbOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/app/Components/Footer";

const { Title, Text } = Typography;
const { Option } = Select;

export default function InfluencerHomePage() {
  const [searchType, setSearchType] = useState("city");
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("cities");

  // Color scheme
  const primaryColor = "#3680A1";
  const secondaryColor = "#5373d4";
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
  };

  // Data
  const popularCities = [
    { name: "London", count: 1243, image: "/images/london.jpg" },
    { name: "New York", count: 982, image: "/images/nyc.jpg" },
    { name: "Paris", count: 756, image: "/images/paris.jpg" },
    { name: "Tokyo", count: 643, image: "/images/tokyo.jpg" },
    { name: "Dubai", count: 587, image: "/images/dubai.jpg" },
    { name: "Los Angeles", count: 532, image: "/images/la.jpg" },
  ];

  const countries = [
    { name: "UK", count: 2450, popular: true, flag: "🇬🇧" },
    { name: "USA", count: 3860, popular: true, flag: "🇺🇸" },
    { name: "France", count: 1320, popular: false, flag: "🇫🇷" },
    { name: "Japan", count: 980, popular: true, flag: "🇯🇵" },
    { name: "UAE", count: 760, popular: false, flag: "🇦🇪" },
    { name: "Germany", count: 1120, popular: true, flag: "🇩🇪" },
  ];

  const platforms = [
    {
      name: "Instagram",
      count: 5230,
      icon: <InstagramOutlined />,
      color: "#E1306C",
    },
    {
      name: "YouTube",
      count: 2870,
      icon: <YoutubeOutlined />,
      color: "#FF0000",
    },
    { name: "TikTok", count: 3420, icon: <TikTokOutlined />, color: "#000000" },
    {
      name: "Twitter",
      count: 1560,
      icon: <TwitterOutlined />,
      color: "#1DA1F2",
    },
    { name: "Twitch", count: 980, icon: <GlobalOutlined />, color: "#9146FF" },
  ];

  const businessCategories = [
    { name: "Fashion", count: 3200, icon: "👗" },
    { name: "Beauty", count: 2800, icon: "💄" },
    { name: "Wellness", count: 1900, icon: "🧘" },
    { name: "Technology", count: 1500, icon: "💻" },
    { name: "Food", count: 2400, icon: "🍔" },
    { name: "Travel", count: 1800, icon: "✈️" },
  ];

  const influencerTypes = [
    { name: "Nano", count: 4200, range: "1K-10K" },
    { name: "Micro", count: 3800, range: "10K-50K" },
    { name: "Mid-tier", count: 2900, range: "50K-100K" },
    { name: "Macro", count: 2100, range: "100K-500K" },
    { name: "Mega", count: 900, range: "500K+" },
  ];

  const interests = [
    { name: "Sustainable Living", count: 1800, icon: "🌱" },
    { name: "Fitness", count: 2200, icon: "💪" },
    { name: "Parenting", count: 1500, icon: "👶" },
    { name: "Gaming", count: 1900, icon: "🎮" },
    { name: "Luxury", count: 1200, icon: "💎" },
    { name: "DIY", count: 1400, icon: "🛠️" },
  ];

  const stats = [
    { value: "50K+", label: "Influencers" },
    { value: "120+", label: "Countries" },
    { value: "300+", label: "Cities" },
    { value: "5M+", label: "Audience Reach" },
  ];

  const stepsItems = [
    {
      title: "Discover",
      description: "Find influencers by location, platform, category, and more",
      icon: <SearchOutlined style={{ color: primaryColor }} />,
    },
    {
      title: "Connect",
      description: "Reach out to creators or let them apply to your campaigns",
      icon: <MailOutlined style={{ color: primaryColor }} />,
    },
    {
      title: "Collaborate",
      description: "Manage campaigns and content creation seamlessly",
      icon: <TeamOutlined style={{ color: primaryColor }} />,
    },
    {
      title: "Grow",
      description: "Track performance and scale your influencer marketing",
      icon: <ArrowRightOutlined style={{ color: primaryColor }} />,
    },
  ];

  const handleSearch = () => {
    const path = `/influencer/${searchType}/${searchValue
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    window.location.href = path;
  };

  return (
    <>
      <Head>
        <title>Discover Influencers | Grace Belgravia</title>
        <meta
          name="description"
          content="Find the perfect influencers across cities, countries, platforms, and categories for your marketing campaigns"
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <Tag
              icon={<RocketOutlined />}
              color="geekblue"
              className="mb-6 text-sm font-medium px-4 py-1 rounded-full"
            >
              TRENDING NOW
            </Tag>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Connect With <span className="gradient-text">Top Creators</span>{" "}
              Worldwide
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover authentic influencers who align with your brand values
              across 100+ cities and 50+ countries
            </p>

            {/* Advanced Search */}
            <div className="max-w-4xl mx-auto bg-white p-1 rounded-xl shadow-lg">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="!mb-0"
                tabBarExtraContent={
                  <Button
                    type="primary"
                    size="large"
                    className="!h-14 !px-8 !flex items-center !rounded-lg"
                    style={{ background: secondaryColor }}
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                }
                items={[
                  {
                    key: "cities",
                    label: (
                      <span className="flex items-center">
                        <EnvironmentOutlined className="mr-2" />
                        Cities
                      </span>
                    ),
                    children: (
                      <Space.Compact className="w-full">
                        <Input
                          size="large"
                          className="!h-14 !border-0 !text-base focus:!ring-0"
                          placeholder="Search cities..."
                          onChange={(e) => {
                            setSearchType("city");
                            setSearchValue(e.target.value);
                          }}
                          onPressEnter={handleSearch}
                        />
                      </Space.Compact>
                    ),
                  },
                  {
                    key: "countries",
                    label: (
                      <span className="flex items-center">
                        <GlobalOutlined className="mr-2" />
                        Countries
                      </span>
                    ),
                    children: (
                      <Space.Compact className="w-full">
                        <Input
                          size="large"
                          className="!h-14 !border-0 !text-base focus:!ring-0"
                          placeholder="Search countries..."
                          onChange={(e) => {
                            setSearchType("country");
                            setSearchValue(e.target.value);
                          }}
                          onPressEnter={handleSearch}
                        />
                      </Space.Compact>
                    ),
                  },
                  {
                    key: "platforms",
                    label: (
                      <span className="flex items-center">
                        <InstagramOutlined className="mr-2" />
                        Platforms
                      </span>
                    ),
                    children: (
                      <Space.Compact className="w-full">
                        <Input
                          size="large"
                          className="!h-14 !border-0 !text-base focus:!ring-0"
                          placeholder="Search platforms..."
                          onChange={(e) => {
                            setSearchType("platform");
                            setSearchValue(e.target.value);
                          }}
                          onPressEnter={handleSearch}
                        />
                      </Space.Compact>
                    ),
                  },
                  {
                    key: "advanced",
                    label: (
                      <span className="flex items-center">
                        <FilterOutlined className="mr-2" />
                        Advanced
                      </span>
                    ),
                    children: (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          size="large"
                          placeholder="Select platform"
                          className="w-full"
                          onChange={(value) =>
                            setSearchType(`platform/${value}`)
                          }
                        >
                          {platforms.map((platform) => (
                            <Option
                              key={platform.name}
                              value={platform.name.toLowerCase()}
                            >
                              {platform.name}
                            </Option>
                          ))}
                        </Select>
                        <Select
                          size="large"
                          placeholder="Select country"
                          className="w-full"
                          onChange={(value) =>
                            setSearchType(`country/${value}`)
                          }
                        >
                          {countries.map((country) => (
                            <Option
                              key={country.name}
                              value={country.name.toLowerCase()}
                            >
                              {country.name}
                            </Option>
                          ))}
                        </Select>
                        <Select
                          size="large"
                          placeholder="Select category"
                          className="w-full"
                        >
                          {businessCategories.map((category) => (
                            <Option
                              key={category.name}
                              value={category.name.toLowerCase()}
                            >
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                        <Select
                          size="large"
                          placeholder="Select influencer type"
                          className="w-full"
                        >
                          {influencerTypes.map((type) => (
                            <Option
                              key={type.name}
                              value={type.name.toLowerCase()}
                            >
                              {type.name} ({type.range})
                            </Option>
                          ))}
                        </Select>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
              >
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Discovery Sections */}
        <Tabs
          defaultActiveKey="1"
          className="mb-8"
          items={[
            {
              key: "1",
              label: (
                <span className="flex items-center">
                  <EnvironmentOutlined className="mr-2" />
                  Cities
                </span>
              ),
              children: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularCities.map((city) => (
                    <Link
                      href={`/influencer/city/${city.name.toLowerCase()}`}
                      key={city.name}
                    >
                      <Card
                        hoverable
                        className="!rounded-2xl !border !border-input !shadow-sm transition-all h-full"
                        cover={
                          <div className="h-48 relative">
                            <img
                              src={city.image}
                              alt={city.name}
                              className="w-full h-full object-cover rounded-t-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <Title level={4} className="!text-white !mb-0">
                                {city.name}
                              </Title>
                            </div>
                          </div>
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <Text className="text-gray-500">Creators</Text>
                            <Title level={5} className="!mt-1">
                              {city.count.toLocaleString()}+
                            </Title>
                          </div>
                          <Button
                            type="text"
                            icon={<ArrowRightOutlined />}
                            className="!text-blue-600"
                          />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <span className="flex items-center">
                  <GlobalOutlined className="mr-2" />
                  Countries
                </span>
              ),
              children: (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {countries.map((country) => (
                    <Link
                      href={`/influencer/country/${country.name.toLowerCase()}`}
                      key={country.name}
                    >
                      <div className="border border-input rounded-xl p-6 text-center hover:shadow-md transition-all h-full flex flex-col items-center bg-white">
                        <div className="text-3xl mb-3">{country.flag}</div>
                        <Title level={5} className="!mb-1">
                          {country.name}
                        </Title>
                        <Text className="text-gray-500 text-sm mb-3">
                          {country.count.toLocaleString()} creators
                        </Text>
                        {country.popular && (
                          <Tag
                            color="green"
                            icon={<StarOutlined />}
                            className="!mt-auto"
                          >
                            Popular
                          </Tag>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ),
            },
            {
              key: "3",
              label: (
                <span className="flex items-center">
                  <InstagramOutlined className="mr-2" />
                  Platforms
                </span>
              ),
              children: (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {platforms.map((platform) => (
                    <Link
                      href={`/influencer/platform/${platform.name.toLowerCase()}`}
                      key={platform.name}
                    >
                      <div className="border border-input rounded-xl p-6 hover:shadow-md transition-all h-full flex flex-col items-center text-center bg-white">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                          style={{
                            backgroundColor: `${platform.color}20`,
                            color: platform.color,
                          }}
                        >
                          {React.cloneElement(platform.icon, {
                            className: "text-2xl",
                          })}
                        </div>
                        <Title level={5} className="!mb-1">
                          {platform.name}
                        </Title>
                        <Text className="text-gray-500 text-sm">
                          {platform.count.toLocaleString()} creators
                        </Text>
                      </div>
                    </Link>
                  ))}
                </div>
              ),
            },
            {
              key: "4",
              label: (
                <span className="flex items-center">
                  <UserOutlined className="mr-2" />
                  Categories
                </span>
              ),
              children: (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {businessCategories.map((category) => (
                    <Link
                      href={`/influencer/category/${category.name.toLowerCase()}`}
                      key={category.name}
                    >
                      <div className="border border-input rounded-xl p-6 hover:shadow-md transition-all h-full flex flex-col items-center text-center bg-white">
                        <div className="text-3xl mb-3">{category.icon}</div>
                        <Title level={5} className="!mb-1">
                          {category.name}
                        </Title>
                        <Text className="text-gray-500 text-sm">
                          {category.count.toLocaleString()} creators
                        </Text>
                      </div>
                    </Link>
                  ))}
                </div>
              ),
            },
          ]}
        />

        {/* How It Works Section */}
        <Divider className="my-16" />
        <div className="text-center mb-12">
          <Title level={2} className="mb-4">
            <RocketOutlined className="mr-3" style={{ color: primaryColor }} />
            How Grace Belgravia Works
          </Title>
          <Text className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple steps to find and collaborate with the perfect influencers
            for your brand
          </Text>
        </div>

        <Steps current={-1} className="mb-16" items={stepsItems} />

        {/* Why Choose Us Section */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-16"
          style={{ background: `${primaryColor}10` }}
        >
          <Title level={2} className="text-center mb-8">
            <BulbOutlined className="mr-3" style={{ color: secondaryColor }} />
            Why Choose Grace Belgravia
          </Title>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-none">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <CheckOutlined style={{ color: primaryColor }} />
              </div>
              <Title level={4} className="!mb-3">
                Comprehensive Database
              </Title>
              <Text>
                Access thousands of vetted influencers across all major
                platforms and locations
              </Text>
            </Card>
            <Card className="border-0 shadow-none">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <CheckOutlined style={{ color: primaryColor }} />
              </div>
              <Title level={4} className="!mb-3">
                Advanced Filters
              </Title>
              <Text>
                Narrow down by engagement rates, audience demographics, content
                style, and more
              </Text>
            </Card>
            <Card className="border-0 shadow-none">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <CheckOutlined style={{ color: primaryColor }} />
              </div>
              <Title level={4} className="!mb-3">
                Campaign Management
              </Title>
              <Text>
                Run and track multiple campaigns from one dashboard with
                built-in analytics
              </Text>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
