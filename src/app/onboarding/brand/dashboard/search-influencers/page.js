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
  List,
  Pagination,
  Empty,
  Slider,
  Checkbox,
  Radio,
  Rate,
  Badge,
  Tooltip,
  DatePicker,
  Skeleton,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  StarFilled,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  TikTokOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  WomanOutlined,
  ManOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchInfluencers = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxFollowers, setMaxFollowers] = useState(10000000);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const pageSize = 12;
  const { influencers, filterResults } = useSelector(
    (store) => store.filterResults
  );

  console.log("INFLUENCERS ", influencers);

  // Mock data - in a real app, this would come from an API
  const mockInfluencers = [
    {
      id: 6,
      fullName: "Jarib Lad-Wetshi Mardo",
      email: "mardocheejarib64@gmail.com",
      phoneNumber: "+2547890765432",
      gender: "Non-binary",
      age: null,
      dob: "2027-01-31",
      accountStatus: "Active",
      dateJoined: "2025-04-04T13:48:25.145107Z",
      emailVerified: true,
      accountVerified: false,
      addressLine1: "123 Cherry Blossom Street",
      addressLine2: "Apt 456",
      isInstagramAccountConnected: true,
      isTwitterAccountConnected: false,
      isFacebookAccountConnected: true,
      isTiktokAccountConnected: true,
      profilePicture:
        "http://res.cloudinary.com/dqjnaukdk/image/upload/v1744714739/40678282-c173-4788-89c9-14ea5596651e/profilePicture/z3eq9bxpseznawpkbpr3.jpg",
      userId: "40678282-c173-4788-89c9-14ea5596651e",
      brandsWorkedWith: null,
      bio: "I am a tech influencer who is geeky about Machine Learning and Artificial Intelligence and exploration with Large Language Models",
      ethnicBackground: ["Asian"],
      country: "Kenya",
      city: "Nairobi",
      zipCode: "94107",
      contentCategories: ["Technology", "Fitness", "Travel"],
      preferredCollaborationContentFormat: ["Live", "Stories", "Reels"],
      categories: null,
      tags: "['Tech Reviews', 'Fitness Routines', 'Travel Destinations']",
      overallRate: "5.0",
      totalRates: 0,
      finishedOnboarding: true,
      languages: null,
      location: null,
      influencerId: "f0ed2743-e79e-4ec9-b79e-c9c291082641",
      igAccessToken: null,
      igWithFacebookAccessToken: null,
      igFacebookActivePageName: null,
      igBusinessAccount: null,
      igUserId: null,
      igUsername: null,
      igBio: null,
      igFollowersCount: null,
      igFollowsCount: null,
      igHasProfilePicture: null,
      igMediaCount: null,
      igMedias: null,
      igName: null,
      igWebsite: null,
      igShoppingProductTagEligibility: null,
      igProfilePictureUrl: null,
      igProfileLink: null,
      igIsPublished: null,
      tkAccessToken: null,
      tkUserId: null,
      tkProfilePictureUrl: null,
      tkName: null,
      tkBio: null,
      tkProfileLink: null,
      tkIsVerified: null,
      tkUsername: null,
      tkFollowersCount: null,
      tkFollowsCount: null,
      tkLikesCount: null,
      tkVideosCount: null,
      twId: null,
      twBio: null,
      twCreatedAt: null,
      twLocation: null,
      twName: null,
      twProfileBannerUrl: null,
      twProfileImageUrl: null,
      twProtected: null,
      twPublicMetrics: null,
      twUrl: null,
      twUsername: null,
      twVerified: null,
      fbUserId: null,
      fbAccessToken: null,
    },
  ];

  // Available filters
  const categories = [
    "Adult & 18+",
    "Apparel & Fashion",
    "Arts & Culture",
    "Beauty & Skincare",
    "Business & Finance",
    "Crypto & Web3",
    "Dating & Relationships",
    "Education & Learning",
    "E-commerce & Startups",
    "Entertainment & Pop Culture",
    "Fitness & Sports",
    "Food & Drink",
    "Gaming & Esports",
    "Health & Wellness",
    "Home & Lifestyle",
    "Lifestyle & Self-Development",
    "Luxury & Aspirational Living",
    "Men's Interests",
    "Music & Audio",
    "Other / Miscellaneous",
    "Parenting & Family",
    "Pets & Animals",
    "Photography & Visual Media",
    "Politics & Society",
    "Spirituality & Mindfulness",
    "Sustainability & Green Living",
    "Tech & Gadgets",
    "Toys, Crafts & Hobbies",
    "Travel & Leisure",
    "Vegan & Plant-Based",
    "Women's Interests",
  ];

  const genders = ["Male", "Female", "Non-binary"];
  const countries = Array.from(new Set(mockInfluencers.map((i) => i.country)));

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter influencers based on search criteria
  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    const matchesSearch =
      influencer.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchText.toLowerCase()) ||
      influencer.contentCategories?.some((cat) =>
        cat.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      influencer.city.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategories =
      selectedCategories.length === 0 ||
      (influencer.contentCategories &&
        influencer.contentCategories.some((cat) =>
          selectedCategories.includes(cat)
        ));

    const matchesGenders =
      selectedGenders.length === 0 ||
      selectedGenders.includes(influencer.gender);

    const matchesCountries =
      selectedCountries.length === 0 ||
      selectedCountries.includes(influencer.country);

    const matchesFollowers =
      (influencer.igFollowersCount || 0) >= minFollowers &&
      (influencer.igFollowersCount || 0) <= maxFollowers;

    const matchesRating = parseFloat(influencer.overallRate) >= minRating;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "verified" && influencer.accountStatus === "Verified") ||
      (activeTab === "instagram" && influencer.igUsername) ||
      (activeTab === "tiktok" && influencer.tkUsername);

    return (
      matchesSearch &&
      matchesCategories &&
      matchesGenders &&
      matchesCountries &&
      matchesFollowers &&
      matchesRating &&
      matchesTab
    );
  });

  // Pagination logic
  const paginatedInfluencers = filteredInfluencers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const clearFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedCountries([]);
    setMinFollowers(0);
    setMaxFollowers(10000000);
    setMinRating(0);
    setActiveTab("all");
  };

  return (
    <div
      className="influencer-search-container"
      style={{ padding: "24px", maxWidth: "1600px", margin: "0 auto" }}
    >
      {/* Header Section */}
      <div className="search-header" style={{ marginBottom: "32px" }}>
        <Title level={2} style={{ marginBottom: "8px" }}>
          Discover Influencers
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", marginBottom: "24px" }}
        >
          Find the perfect influencers for your brand campaigns. Filter by
          category, audience, and more.
        </Text>

        {/* Search Bar */}
        <Input
          placeholder="Search influencers by name, bio, or category..."
          prefix={<SearchOutlined />}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ maxWidth: "800px", marginBottom: "24px" }}
        />

        {/* Tabs */}
        <div className="influencer-tabs" style={{ marginBottom: "24px" }}>
          <Radio.Group
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">All Influencers</Radio.Button>
            <Radio.Button value="instagram">Instagram</Radio.Button>
            <Radio.Button value="tiktok">TikTok</Radio.Button>
            <Radio.Button value="verified">Verified</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className="search-content" style={{ display: "flex", gap: "24px" }}>
        {/* Filters Sidebar */}
        <div
          className="filters-sidebar"
          style={{ width: "280px", flexShrink: 0 }}
        >
          <Card
            title={
              <Space>
                <FilterOutlined />
                <span>Filters</span>
              </Space>
            }
            extra={
              <Button type="text" size="small" onClick={clearFilters}>
                Clear all
              </Button>
            }
            style={{ marginBottom: "24px" }}
          >
            <div className="filter-section" style={{ marginBottom: "24px" }}>
              <Title level={5} style={{ marginBottom: "12px" }}>
                Categories
              </Title>
              <Checkbox.Group
                options={categories}
                value={selectedCategories}
                onChange={setSelectedCategories}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              />
            </div>

            <div className="filter-section" style={{ marginBottom: "24px" }}>
              <Title level={5} style={{ marginBottom: "12px" }}>
                Gender
              </Title>
              <Checkbox.Group
                options={genders}
                value={selectedGenders}
                onChange={setSelectedGenders}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              />
            </div>

            <div className="filter-section" style={{ marginBottom: "24px" }}>
              <Title level={5} style={{ marginBottom: "12px" }}>
                Location
              </Title>
              <Select
                mode="multiple"
                placeholder="Select countries"
                value={selectedCountries}
                onChange={setSelectedCountries}
                style={{ width: "100%" }}
                options={countries.map((country) => ({
                  value: country,
                  label: country,
                }))}
              />
            </div>

            <div className="filter-section" style={{ marginBottom: "24px" }}>
              <Title level={5} style={{ marginBottom: "12px" }}>
                Instagram Followers
              </Title>
              <Slider
                range
                min={0}
                max={1000000}
                step={10000}
                value={[minFollowers, maxFollowers]}
                onChange={(value) => {
                  setMinFollowers(value[0]);
                  setMaxFollowers(value[1]);
                }}
                tipFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">
                  {(minFollowers / 1000).toFixed(0)}k
                </Text>
                <Text type="secondary">
                  {(maxFollowers / 1000).toFixed(0)}k
                </Text>
              </div>
            </div>

            <div className="filter-section">
              <Title level={5} style={{ marginBottom: "12px" }}>
                Minimum Rating
              </Title>
              <Rate
                allowHalf
                value={minRating}
                onChange={setMinRating}
                style={{ color: "#faad14" }}
              />
              <Text
                type="secondary"
                style={{ display: "block", marginTop: "8px" }}
              >
                {minRating > 0 ? `${minRating}+ stars` : "Any rating"}
              </Text>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="results-section" style={{ flex: 1 }}>
          {loading ? (
            <Row gutter={[24, 24]}>
              {[...Array(6)].map((_, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card style={{ height: "100%" }}>
                    <Skeleton active avatar paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : filteredInfluencers.length > 0 ? (
            <>
              <div className="results-header" style={{ marginBottom: "16px" }}>
                <Text strong>
                  Showing {filteredInfluencers.length} influencers
                </Text>
              </div>

              <Row gutter={[24, 24]}>
                {paginatedInfluencers.map((influencer) => (
                  <Col xs={24} sm={12} lg={8} key={influencer.id}>
                    <InfluencerCard influencer={influencer} />
                  </Col>
                ))}
              </Row>

              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Pagination
                  current={currentPage}
                  total={filteredInfluencers.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            </>
          ) : (
            <Card>
              <Empty
                description={
                  <span>
                    No influencers found matching your criteria. Try adjusting
                    your filters.
                  </span>
                }
              >
                <Button type="primary" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </Empty>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Influencer Card Component
const InfluencerCard = ({ influencer }) => {
  const socialIcons = [
    {
      platform: "instagram",
      icon: <InstagramOutlined />,
      username: influencer.igUsername,
      count: influencer.igFollowersCount,
    },
    {
      platform: "tiktok",
      icon: <TikTokOutlined />,
      username: influencer.tkUsername,
      count: influencer.tkFollowersCount,
    },
    {
      platform: "twitter",
      icon: <TwitterOutlined />,
      username: influencer.twUsername,
      count: influencer.twFollowersCount,
    },
    {
      platform: "facebook",
      icon: <FacebookOutlined />,
      username: influencer.fbUserId ? "Connected" : null,
    },
  ].filter((social) => social.username);

  return (
    <Badge.Ribbon
      text="Verified"
      color="green"
      style={{
        display: influencer.accountStatus === "Verified" ? "block" : "none",
      }}
    >
      <Card
        hoverable
        className="h-full rounded-md p-2"
        cover={
          <div
            className="flex items-center justify-center relative h-[60px] bg-[#f0f2f5]"
          >
            <Avatar
              size={80}
              src={influencer.profilePicture}
              style={{
                border: "3px solid #fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                position: "absolute",
                bottom: "-40px",
                left: "24px",
              }}
            />
          </div>
        }
        actions={[
          <button className="bg-primary text-sm" type="primary" block>
            View Profile
          </button>,
        ]}
      >
        <div style={{ paddingTop: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              {influencer.fullName}
            </Title>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <Space size={[0, 8]} wrap>
              {influencer.contentCategories?.map((category) => (
                <Tag key={category} color="blue">
                  {category}
                </Tag>
              ))}
            </Space>
          </div>

          <Divider style={{ margin: "12px 0" }} />

          <div style={{ marginBottom: "8px" }}>
            <Space>
              {influencer.gender === "Female" ? (
                <WomanOutlined />
              ) : (
                <ManOutlined />
              )}
              <Text>{influencer.gender}</Text>
              <Text type="secondary">•</Text>
              <EnvironmentOutlined />
              <Text>
                {influencer.city}, {influencer.country}
              </Text>
            </Space>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <Space>
              <MailOutlined />
              <Text>{influencer.email}</Text>
            </Space>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <Space>
              <PhoneOutlined />
              <Text>{influencer.phoneNumber}</Text>
            </Space>
          </div>

          <Divider style={{ margin: "12px 0" }} />
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default SearchInfluencers;
