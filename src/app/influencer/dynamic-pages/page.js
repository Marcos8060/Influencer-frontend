"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Input,
  Select,
  Divider,
  Space,
  Tag,
  Avatar,
} from "antd";
import {
  EnvironmentOutlined,
  GlobalOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  SearchOutlined,
  FireOutlined,
  StarOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  UserOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import Link from "next/link";

const { Title, Text } = Typography;
const { Option } = Select;

export default function InfluencerDynamicPages() {
  const [searchType, setSearchType] = useState("city");
  const [searchValue, setSearchValue] = useState("");

  // Enhanced data with additional metrics
  const popularCities = [
    {
      name: "London",
      count: 1243,
      image: "/images/london.jpg",
    },
    { name: "New York", count: 982, image: "/images/nyc.jpg" },
    { name: "Paris", count: 756, image: "/images/paris.jpg" },
    { name: "Tokyo", count: 643, image: "/images/tokyo.jpg" },
    { name: "Dubai", count: 587, image: "/images/dubai.jpg" },
    {
      name: "Los Angeles",
      count: 532,
      image: "/images/la.jpg",
    },
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
      icon: <GlobalOutlined />,
      color: "#1DA1F2",
    },
    { name: "Twitch", count: 980, icon: <GlobalOutlined />, color: "#9146FF" },
  ];

  const stats = [
    { value: "50K+", label: "Influencers" },
    { value: "120+", label: "Countries" },
    { value: "300+", label: "Cities" },
    { value: "5M+", label: "Audience Reach" },
  ];

  return (
    <>
      <Head>
        <title>Discover Influencers | Grace Belgravia</title>
        <meta
          name="description"
          content="Find the perfect influencers across cities, countries and platforms for your marketing campaigns"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        body {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .gradient-text {
          background: linear-gradient(90deg, #3680a1 0%, #5373d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .gradient-bg {
          background: linear-gradient(90deg, #3680a1 0%, #5373d4 100%);
        }
        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .platform-icon {
          transition: all 0.3s ease;
        }
        .platform-card:hover .platform-icon {
          transform: scale(1.1);
        }
      `}</style>

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

            <div className="max-w-2xl mx-auto bg-white p-1 rounded-xl shadow-lg">
              <Space.Compact className="w-full">
                <Select
                  defaultValue="city"
                  className="!h-14 !border-0 !w-[180px] !rounded-l-xl"
                  onChange={setSearchType}
                  suffixIcon={<SearchOutlined className="text-gray-400" />}
                >
                  <Option value="city">
                    <EnvironmentOutlined className="mr-2" /> City
                  </Option>
                  <Option value="country">
                    <GlobalOutlined className="mr-2" /> Country
                  </Option>
                  <Option value="platform">
                    <InstagramOutlined className="mr-2" /> Platform
                  </Option>
                </Select>
                <Input
                  size="large"
                  className="!h-14 !border-0 !text-base focus:!ring-0"
                  placeholder={
                    searchType === "city"
                      ? "Search cities..."
                      : searchType === "country"
                      ? "Search countries..."
                      : "Search platforms..."
                  }
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Link href={`/${searchType}/${searchValue || "all"}`} passHref>
                  <Button
                    type="primary"
                    size="large"
                    className="!h-14 !px-8 !flex items-center !rounded-r-xl bg-primary"
                    icon={<SearchOutlined />}
                  >
                    Search
                  </Button>
                </Link>
              </Space.Compact>
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
                className="text-center p-6 bg-gray-50 rounded-xl"
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
        {/* Cities Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <EnvironmentOutlined className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Popular Cities
                </h2>
              </div>
              <p className="text-gray-500">
                Top locations with highest influencer density
              </p>
            </div>
            {/* <Link href="/cities">
              <Button
                type="link"
                className="!flex items-center !p-0 !text-blue-600 hover:!text-blue-800"
              >
                View all cities <ArrowRightOutlined className="ml-2" />
              </Button>
            </Link> */}
          </div>

          <Row gutter={[24, 24]}>
            {popularCities.map((city) => (
              <Col xs={24} sm={12} md={8} lg={6} key={city.name}>
                <Link href={`city/${city.name.toLowerCase()}`} passHref>
                  <Card
                    hoverable
                    className="!rounded-2xl !border !border-gray-200 !shadow-sm card-hover-effect transition-all h-full !overflow-hidden"
                    cover={
                      <div className="h-48 bg-gray-100 relative overflow-hidden">
                        {/* Replace with actual image */}
                        <div className="absolute inset-0">
                          <img
                            src={city.image}
                            alt={city.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-30"></div>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-xl font-bold text-white">
                            {city.name}
                          </h3>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 mb-1">Creators</p>
                        <p className="font-semibold text-gray-900">
                          {city.count.toLocaleString()}+
                        </p>
                      </div>
                      <Button
                        type="text"
                        className="!text-blue-600 !flex items-center !p-0"
                        icon={<ArrowRightOutlined />}
                      />
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

        <Divider className="!my-16 !border-gray-200" />

        {/* Countries Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center mr-3">
                  <GlobalOutlined className="text-green-600 text-lg" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Top Countries
                </h2>
              </div>
              <p className="text-gray-500">
                Find influencers by geographic region
              </p>
            </div>
            {/* <Link href="/countries">
              <Button
                type="link"
                className="!flex items-center !p-0 !text-blue-600 hover:!text-blue-800"
              >
                View all countries <ArrowRightOutlined className="ml-2" />
              </Button>
            </Link> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {countries.map((country) => (
              <Link
                href={`country/${country.name.toLowerCase()}`}
                key={country.name}
                className="group"
              >
                <div className="border border-input rounded-xl p-6 text-center hover:border-blue-300 transition-all h-full flex flex-col items-center bg-white hover:bg-gray-50">
                  <div className="text-3xl mb-3">{country.flag}</div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {country.count.toLocaleString()} creators
                  </p>
                  {country.popular && (
                    <Tag
                      className="!mt-auto"
                      color="green"
                      icon={<StarOutlined />}
                    >
                      Popular
                    </Tag>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Divider className="!my-16 !border-gray-200" />

        {/* Platforms Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <UserOutlined className="text-purple-600 text-lg" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Social Platforms
                </h2>
              </div>
              <p className="text-gray-500">
                Find creators by their primary platform
              </p>
            </div>
            {/* <Link href="/platforms">
              <Button
                type="link"
                className="!flex items-center !p-0 !text-blue-600 hover:!text-blue-800"
              >
                View all platforms <ArrowRightOutlined className="ml-2" />
              </Button>
            </Link> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {platforms.map((platform) => (
              <Link
                href={`platform/${platform.name.toLowerCase()}`}
                key={platform.name}
                className="platform-card"
              >
                <div className="border border-input rounded-xl p-6 hover:shadow-md transition-all h-full flex flex-col items-center text-center bg-white">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 platform-icon"
                    style={{
                      backgroundColor: `${platform.color}20`,
                      color: platform.color,
                    }}
                  >
                    {React.cloneElement(platform.icon, {
                      className: "text-2xl",
                    })}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {platform.count.toLocaleString()} creators
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url('/images/pattern.svg')" }}
          ></div>
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to launch your campaign?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of brands finding perfect influencers on Grace
              Belgravia
            </p>
            <Space>
              <Button
                type="primary"
                size="large"
                className="!h-12 !px-8 !bg-white !text-blue-600 hover:!bg-gray-100 !font-semibold !border-0 !rounded-xl"
                icon={<CheckOutlined />}
              >
                Get Started
              </Button>
              <Button
                size="large"
                className="!h-12 !px-8 !bg-transparent hover:!bg-white hover:!bg-opacity-10 !text-white !font-semibold !border-white !border-2 !rounded-xl"
              >
                Book a Demo
              </Button>
            </Space>
          </div>
        </section>
      </div>
    </>
  );
}
