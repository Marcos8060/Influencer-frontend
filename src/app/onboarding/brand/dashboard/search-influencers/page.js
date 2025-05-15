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
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { getAllInfluencers } from "@/redux/features/influencer/filter";

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
  const dispatch = useDispatch();
  const auth = useAuth();
  const pageSize = 12;
  const { influencers } = useSelector(
    (store) => store.filterResults
  );

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
  const countries = Array.from(new Set(influencers.map((i) => i.country)));

  useEffect(() => {
    if (auth && influencers.length === 0) {
      setLoading(true);
      dispatch(getAllInfluencers(auth))
        .then((response) => {
          if (response.error) {
            throw new Error(response.error.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, dispatch, influencers.length]);

  // Filter influencers based on search criteria
  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      // influencer.bio.toLowerCase().includes(searchText.toLowerCase()) ||
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
    <div className="w-full text-color">
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
      </div>

      <div className="search-content" style={{ display: "flex", gap: "24px" }}>
        {/* Filters Sidebar */}
        <div
          className="filters-sidebar"
          style={{ width: "240px", flexShrink: 0 }}
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

              <Row gutter={[20, 20]}>
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
          <div className="flex items-center justify-center relative h-[55px] bg-[#f0f2f5]">
            <Avatar
              size={60}
              src={influencer.profilePicture}
              style={{
                border: "3px solid #fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                position: "absolute",
                bottom: "-10px",
                left: "24px",
              }}
            />
          </div>
        }
        actions={[
          <Link
            href={`/brand/influencer-discovery/influencerProfile/${influencer.influencerId}`}
          >
            <button
              className="bg-primary text-xs text-white rounded-sm px-4 py-2 w-full"
              type="primary"
              block
            >
              View Profile
            </button>
          </Link>,
        ]}
      >
        <div>
          <p className="text-lg font-semibold ">{influencer.fullName}</p>
          <div className="border-b border-input my-2"></div>

          <div>
            <Space className="grid grid-cols-1">
              <div className="flex gap-2">
                {influencer.gender === "Female" ? (
                  <WomanOutlined />
                ) : (
                  <ManOutlined />
                )}
                <Text>{influencer.gender}</Text>
              </div>

              <div className="flex gap-2">
                <EnvironmentOutlined />
                <Text>
                  {influencer.city}, {influencer.country}
                </Text>
              </div>
            </Space>
          </div>

          <div>
            <Space>
              <PhoneOutlined />
              <Text>{influencer.phoneNumber}</Text>
            </Space>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default SearchInfluencers;
