"use client";
import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  Card,
  Row,
  Col,
  Tag,
  Button,
  Space,
  Typography,
  Divider,
  Avatar,
  Pagination,
  Empty,
  Skeleton,
  Badge,
  Tooltip,
  Dropdown,
  Menu,
  Tabs,
  Rate,
  Spin,
} from "antd";
import {
  SearchOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  StarFilled,
  FilterOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  MoreOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
  InboxOutlined,
  TeamOutlined,
  DollarOutlined,
  TrophyOutlined,
  MessageOutlined,
  ShopOutlined,
  CarOutlined,
  SkinOutlined,
  BulbOutlined,
  RocketOutlined,
  GiftOutlined,
  HomeOutlined,
  CoffeeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { getAllBrands } from "@/redux/features/influencer/filter";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { ReactCountryFlag } from "react-country-flag";
import { motion } from "framer-motion";
import { country_names } from "@/app/Components/country-names";
import AuthGuard from "@/assets/hooks/authGuard";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Map industry/category names to icons
const industryIcons = {
  "E-Commerce": <ShopOutlined />,
  Automotive: <CarOutlined />,
  "Beauty & Personal Care": <SkinOutlined />,
  "Arts, Crafts & Creativity": <BulbOutlined />,
  Technology: <RocketOutlined />,
  Health: <HeartOutlined />,
  Gifts: <GiftOutlined />,
  Home: <HomeOutlined />,
  "Food & Beverage": <CoffeeOutlined />,
  // fallback
  default: <AppstoreOutlined />,
};

const BrandCard = ({ brand, isFavorite, onFavoriteToggle, menu }) => (
  <motion.div {...fadeIn} className="h-full">
    <Card
      hoverable
      className="brand-card transform transition-all duration-300 h-full flex flex-col border border-input bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg"
      bodyStyle={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.5rem",
        padding: 18,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start space-x-3 mb-2">
          <Avatar
            size={64}
            src={brand.logo}
            className="flex-shrink-0 border-2 border-white shadow"
          >
            {brand.name?.[0]?.toUpperCase()}
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Title level={4} className="m-0 truncate text-indigo-900">
                {brand.name}
              </Title>
              {brand.verified && (
                <Tooltip title="Verified Brand">
                  <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold ml-1">
                    Verified
                  </span>
                </Tooltip>
              )}
            </div>
            {brand.businessType && (
              <Text className="block text-xs text-gray-500 mb-1">
                {brand.businessType}
              </Text>
            )}
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-blue-600 hover:underline truncate"
              >
                {brand.website}
              </a>
            )}
          </div>
        </div>
        <Divider className="my-2" style={{ margin: "8px 0" }} />
        <div className="grid grid-cols-2 gap-3">
          {brand.address && (
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-input">
              <EnvironmentOutlined className="text-purple-500" />
              <Text className="text-sm">{brand.address}</Text>
            </div>
          )}
          {brand.city && (
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-input">
              <GlobalOutlined className="text-indigo-500" />
              <Text className="text-sm">{brand.city}</Text>
            </div>
          )}
          {brand.countryData?.name && (
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-input">
              <GlobalOutlined className="text-indigo-500" />
              <Text className="text-sm">{brand.countryData.name}</Text>
            </div>
          )}
        </div>
        {/* Preferences Section */}
        {brand.preferences && (
          <div className="mt-3">
            {Array.isArray(brand.preferences.preferredSocialMediaPlatforms) &&
              brand.preferences.preferredSocialMediaPlatforms.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {brand.preferences.preferredSocialMediaPlatforms.map(
                    (platform, idx) => (
                      <Tag
                        key={platform + idx}
                        color="purple"
                        className="rounded-full text-xs"
                      >
                        {platform}
                      </Tag>
                    )
                  )}
                </div>
              )}
          </div>
        )}
        <Divider className="my-2" style={{ margin: "8px 0" }} />
        {/* --- Card Actions: View Campaigns & DM Brand --- */}
        <div className="flex flex-col gap-2 mt-2">
          {brand.campaignCount > 0 && (
            <Button
              type="primary"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow"
              icon={<ArrowRightOutlined />}
              onClick={() => {
                /* TODO: Open brand campaigns modal or navigate to campaigns page */
              }}
            >
              View {brand.campaignCount} Campaign
              {brand.campaignCount > 1 ? "s" : ""}
            </Button>
          )}
          <Button
            type="default"
            className="w-full rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 shadow flex items-center justify-center"
            icon={<MessageOutlined />}
            onClick={() => {
              /* TODO: Open DM modal or chat with brand */
            }}
          >
            DM Brand
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

const BrandDiscovery = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(undefined);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [selectedPrefInfluencerCountry, setSelectedPrefInfluencerCountry] =
    useState(undefined);
  const [selectedPlatform, setSelectedPlatform] = useState(undefined);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [sortDateJoined, setSortDateJoined] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dateJoinedRange, setDateJoinedRange] = useState("all");
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.filterResults);
  const auth = useAuth();
  const pageSize = 8;

  useEffect(() => {
    if (auth) {
      setLoading(true);
      dispatch(getAllBrands(auth))
        .then((response) => {
          if (response.error) {
            throw new Error(response.error.message);
          }
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, dispatch]);

  // Get unique platforms for filter
  const platforms = Array.from(
    new Set(
      brands
        .flatMap(
          (brand) => brand.preferences?.preferredSocialMediaPlatforms || []
        )
        .filter(Boolean)
    )
  );

  // Get unique cities for filter (optional)
  const cities = Array.from(
    new Set(brands.map((brand) => brand.city).filter(Boolean))
  );

  // Helper to check if a date is within a range
  function isWithinRange(dateStr, range) {
    if (range === "all") return true;
    const now = new Date();
    const date = new Date(dateStr);
    if (range === "7d") {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return date >= weekAgo;
    }
    if (range === "30d") {
      const monthAgo = new Date(now);
      monthAgo.setDate(now.getDate() - 30);
      return date >= monthAgo;
    }
    if (range === "90d") {
      const ninetyAgo = new Date(now);
      ninetyAgo.setDate(now.getDate() - 90);
      return date >= ninetyAgo;
    }
    if (range === "1y") {
      const yearAgo = new Date(now);
      yearAgo.setFullYear(now.getFullYear() - 1);
      return date >= yearAgo;
    }
    return true;
  }

  // Filtering logic
  const filteredBrands = brands.filter((brand) => {
    const brandName = brand?.name ?? "";
    const businessType = brand?.businessType ?? "";
    const searchTerm = searchText.toLowerCase();
    const matchesSearch =
      searchText === "" ||
      brandName.toLowerCase().includes(searchTerm) ||
      businessType.toLowerCase().includes(searchTerm);
    const brandIndustry =
      typeof brand?.industry === "string" ? brand.industry : "";
    const matchesIndustry =
      selectedIndustry === undefined ||
      (brandIndustry &&
        brandIndustry
          .split(",")
          .some((ind) => ind.trim() === selectedIndustry));
    const matchesCountry =
      selectedCountry === undefined ||
      (brand.countryData && brand.countryData.name === selectedCountry);
    const matchesPrefInfluencerCountry =
      selectedPrefInfluencerCountry === undefined ||
      (brand.preferences &&
        Array.isArray(brand.preferences.preferredInfluencerCountries) &&
        brand.preferences.preferredInfluencerCountries.some(
          (c) => c.name === selectedPrefInfluencerCountry
        ));
    const matchesPlatform =
      selectedPlatform === undefined ||
      (brand.preferences &&
        Array.isArray(brand.preferences.preferredSocialMediaPlatforms) &&
        brand.preferences.preferredSocialMediaPlatforms.includes(
          selectedPlatform
        ));
    const matchesCity =
      selectedCity === undefined || brand.city === selectedCity;
    const matchesDateRange = isWithinRange(brand.dateJoined, dateJoinedRange);
    return (
      matchesSearch &&
      matchesIndustry &&
      matchesCountry &&
      matchesPrefInfluencerCountry &&
      matchesPlatform &&
      matchesCity &&
      matchesDateRange
    );
  });

  // Sort by date joined
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    if (sortDateJoined === "newest") {
      return new Date(b.dateJoined) - new Date(a.dateJoined);
    } else {
      return new Date(a.dateJoined) - new Date(b.dateJoined);
    }
  });

  const paginatedBrands = sortedBrands.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const clearFilters = () => {
    setSearchText("");
    setSelectedIndustry(undefined);
    setSelectedCountry(undefined);
    setSelectedPrefInfluencerCountry(undefined);
    setSelectedPlatform(undefined);
    setSelectedCity(undefined);
    setSortDateJoined("newest");
    setCurrentPage(1);
    setDateJoinedRange("all");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<ShareAltOutlined />}>
        Share
      </Menu.Item>
      <Menu.Item key="2" icon={<StarFilled />}>
        Add to list
      </Menu.Item>
    </Menu>
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white p-4">
        {/* Search and Filters Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-lg border border-input p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Space direction="vertical" className="w-full">
              <Input
                size="large"
                placeholder="Search brands by name..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="mb-4"
              />

              <div className="flex flex-wrap gap-4 items-center">
                <div style={{ minWidth: 200 }}>
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Select Industry
                  </div>
                  <Select
                    size="large"
                    placeholder="Select Industry"
                    style={{ minWidth: 200 }}
                    value={selectedIndustry}
                    onChange={setSelectedIndustry}
                    allowClear
                    showSearch
                    filterOption={(input, option) => {
                      let label = "";
                      if (Array.isArray(option?.children)) {
                        label =
                          option.children.find(
                            (child) => typeof child === "string"
                          ) || "";
                      } else if (typeof option?.children === "string") {
                        label = option.children;
                      }
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {Array.from(
                      new Set(
                        brands
                          .flatMap((brand) =>
                            (typeof brand?.industry === "string"
                              ? brand.industry
                              : ""
                            )
                              .split(",")
                              .map((i) => i.trim())
                              .filter(Boolean)
                          )
                          .filter(Boolean)
                      )
                    ).map((industry) => (
                      <Option key={industry} value={industry}>
                        {industryIcons[industry] || industryIcons["default"]}
                        <span style={{ marginLeft: 8 }}>{industry}</span>
                      </Option>
                    ))}
                  </Select>
                </div>

                <div style={{ minWidth: 200 }}>
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Brand Country
                  </div>
                  <Select
                    size="large"
                    placeholder="Select Country"
                    style={{ width: "100%" }}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    allowClear
                    showSearch
                    filterOption={(input, option) => {
                      let label = "";
                      if (Array.isArray(option?.children)) {
                        label =
                          option.children.find(
                            (child) => typeof child === "string"
                          ) || "";
                      } else if (typeof option?.children === "string") {
                        label = option.children;
                      }
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {country_names.map((country) => (
                      <Option key={country.name} value={country.name}>
                        {country.code && (
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{ marginRight: 8 }}
                          />
                        )}
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div style={{ minWidth: 220 }}>
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Preferred Influencer Country
                  </div>
                  <Select
                    size="large"
                    placeholder="Preferred Influencer Country"
                    style={{ width: "100%" }}
                    value={selectedPrefInfluencerCountry}
                    onChange={setSelectedPrefInfluencerCountry}
                    allowClear
                    showSearch
                    filterOption={(input, option) => {
                      let label = "";
                      if (Array.isArray(option?.children)) {
                        label =
                          option.children.find(
                            (child) => typeof child === "string"
                          ) || "";
                      } else if (typeof option?.children === "string") {
                        label = option.children;
                      }
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {country_names.map((country) => (
                      <Option key={country.name} value={country.name}>
                        {country.code && (
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{ marginRight: 8 }}
                          />
                        )}
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Preferred Social Media Platform Filter */}
                <div style={{ minWidth: 200 }}>
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Preferred Social Media Platform
                  </div>
                  <Select
                    size="large"
                    placeholder="Select Platform"
                    style={{ width: "100%" }}
                    value={selectedPlatform}
                    onChange={setSelectedPlatform}
                    allowClear
                  >
                    {platforms.map((platform) => (
                      <Option key={platform} value={platform}>
                        {platform}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* City Filter (optional) */}
                {/*
              <div style={{ minWidth: 200 }}>
                <div className="mb-1 text-xs text-gray-500 font-medium">
                  City
                </div>
                <Select
                  size="large"
                  placeholder="Select City"
                  style={{ width: "100%" }}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  allowClear
                >
                  {cities.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </div>
              */}

                {/* Sort by Date Joined */}
                <div style={{ minWidth: 200 }}>
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Sort by Date Joined
                  </div>
                  <Select
                    size="large"
                    value={sortDateJoined}
                    onChange={setSortDateJoined}
                    style={{ width: "100%" }}
                  >
                    <Option value="newest">Latest Brands</Option>
                    <Option value="oldest">Oldest First</Option>
                  </Select>
                </div>

                {/* Date Joined Range Filter */}
                <div style={{ minWidth: 200 }}>
                  <div className="mb-1 text-xs text-gray-500 font-medium">
                    Date Joined Range
                  </div>
                  <Select
                    size="large"
                    value={dateJoinedRange}
                    onChange={setDateJoinedRange}
                    style={{ width: "100%" }}
                  >
                    <Option value="all">All time</Option>
                    <Option value="7d">Last 7 days</Option>
                    <Option value="30d">Last 30 days</Option>
                    <Option value="90d">Last 90 days</Option>
                    <Option value="1y">Within the Last year</Option>
                  </Select>
                </div>

                <Button
                  type="default"
                  onClick={clearFilters}
                  icon={<FilterOutlined />}
                >
                  Clear Filters
                </Button>
              </div>

              {/* Active Filters Section */}
              <div className="flex flex-wrap gap-2 mt-4">
                {searchText && (
                  <Tag
                    closable
                    onClose={() => setSearchText("")}
                    color="blue"
                    className="flex items-center"
                  >
                    Search: {searchText}
                  </Tag>
                )}
                {selectedIndustry && (
                  <Tag
                    closable
                    onClose={() => setSelectedIndustry(undefined)}
                    color="purple"
                    className="flex items-center"
                  >
                    Industry: {selectedIndustry}
                  </Tag>
                )}
                {selectedCountry && (
                  <Tag
                    closable
                    onClose={() => setSelectedCountry(undefined)}
                    color="geekblue"
                    className="flex items-center"
                  >
                    Country: {selectedCountry}
                  </Tag>
                )}
                {selectedPrefInfluencerCountry && (
                  <Tag
                    closable
                    onClose={() => setSelectedPrefInfluencerCountry(undefined)}
                    color="cyan"
                    className="flex items-center"
                  >
                    Preferred Influencer Country:{" "}
                    {selectedPrefInfluencerCountry}
                  </Tag>
                )}
                {selectedPlatform && (
                  <Tag
                    closable
                    onClose={() => setSelectedPlatform(undefined)}
                    color="magenta"
                    className="flex items-center"
                  >
                    Platform: {selectedPlatform}
                  </Tag>
                )}
                {selectedCity && (
                  <Tag
                    closable
                    onClose={() => setSelectedCity(undefined)}
                    color="volcano"
                    className="flex items-center"
                  >
                    City: {selectedCity}
                  </Tag>
                )}
                {sortDateJoined !== "newest" && (
                  <Tag
                    closable
                    onClose={() => setSortDateJoined("newest")}
                    color="gold"
                    className="flex items-center"
                  >
                    Sort: Oldest First
                  </Tag>
                )}
                {dateJoinedRange !== "all" && (
                  <Tag
                    closable
                    onClose={() => setDateJoinedRange("all")}
                    color="lime"
                    className="flex items-center"
                  >
                    Date Joined:{" "}
                    {dateJoinedRange === "7d"
                      ? "Last 7 days"
                      : dateJoinedRange === "30d"
                      ? "Last 30 days"
                      : dateJoinedRange === "90d"
                      ? "Last 90 days"
                      : dateJoinedRange === "1y"
                      ? "Last year"
                      : ""}
                  </Tag>
                )}
              </div>
            </Space>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="text-center py-20">
              <Spin size="large" />
            </div>
          ) : paginatedBrands.length > 0 ? (
            <>
              <Row gutter={[24, 24]}>
                {paginatedBrands.map((brand) => (
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} key={brand.id}>
                    <BrandCard
                      brand={brand}
                      isFavorite={false}
                      onFavoriteToggle={() => {}}
                      menu={menu}
                    />
                  </Col>
                ))}
              </Row>

              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={filteredBrands.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            </>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Text className="text-gray-500">
                  No brands found matching your criteria
                </Text>
              }
            >
              <Button type="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Empty>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default BrandDiscovery;
