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
  Slider,
  Checkbox,
  Radio,
  Rate,
  Badge,
  Tooltip,
  Skeleton,
  Collapse
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  TikTokOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  WomanOutlined,
  ManOutlined,
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { getAllInfluencers } from "@/redux/features/influencer/filter";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const SearchInfluencers = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(['categories', 'demographics', 'location']);
  const dispatch = useDispatch();
  const auth = useAuth();
  const pageSize = 12;
  const { influencers } = useSelector((store) => store.filterResults);
  console.log(influencers)

  // Age ranges for filtering
  const ageRanges = [
    { label: '18-24', value: '18-24' },
    { label: '25-34', value: '25-34' },
    { label: '35-44', value: '35-44' },
    { label: '45-54', value: '45-54' },
    { label: '55+', value: '55+' }
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

  // Show only first 5 categories initially
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);

  const genders = ["Male", "Female", "Non-binary"];
  const countries = Array.from(new Set(influencers.map((i) => i.country)));

  // Get unique cities from influencers
  const cities = Array.from(new Set(influencers.map((i) => i.city))).filter(Boolean);

  useEffect(() => {
    if (auth) {
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
  }, [auth, dispatch]);

  // Filter influencers based on search criteria
  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      influencer.contentCategories?.some((cat) =>
        cat.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      influencer.city.toLowerCase().includes(searchText.toLowerCase()) ||
      influencer.bio?.toLowerCase().includes(searchText.toLowerCase());

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

    const matchesCities =
      selectedCities.length === 0 ||
      selectedCities.includes(influencer.city);

    const matchesAgeRanges =
      selectedAgeRanges.length === 0 ||
      selectedAgeRanges.some(range => {
        const [min, max] = range.split('-').map(Number);
        return influencer.age >= min && influencer.age <= (max || 100);
      });

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
      matchesCities &&
      matchesAgeRanges &&
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
    setSelectedCities([]);
    setSelectedAgeRanges([]);
    setActiveTab("all");
  };

  return (
    <div className="w-full text-color p-4 md:p-6">
      {/* Header Section */}
      <div className="search-header mb-8">
        <Title level={2} className="mb-2">
          Discover Influencers
        </Title>
        <Text type="secondary" className="block mb-6">
          Find the perfect influencers for your brand campaigns. Filter by
          category, audience demographics, and more.
        </Text>

        {/* Search Bar */}
        <div className="max-w-3xl">
          <Input
            placeholder="Search influencers by name, bio, category, or location..."
            prefix={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="mb-6"
          />
        </div>
      </div>

      <div className="search-content flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="filters-sidebar w-full lg:w-80 flex-shrink-0">
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
            className="mb-6"
          >
            <Collapse
              activeKey={expandedFilters}
              onChange={setExpandedFilters}
              ghost
              className="filter-collapse"
            >
              {/* Categories Section */}
              <Panel header="Categories" key="categories">
                <Checkbox.Group
                  options={visibleCategories}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  className="flex flex-col gap-2"
                />
                {categories.length > 5 && (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="pl-0 mt-2"
                    icon={showAllCategories ? <UpOutlined /> : <DownOutlined />}
                  >
                    {showAllCategories ? "Show less" : "Show more"}
                  </Button>
                )}
              </Panel>

              {/* Demographics Section */}
              <Panel header="Demographics" key="demographics">
                <div className="mb-4">
                  <Title level={5} className="mb-2">Age Range</Title>
                  <Checkbox.Group
                    options={ageRanges}
                    value={selectedAgeRanges}
                    onChange={setSelectedAgeRanges}
                    className="flex flex-col gap-2"
                  />
                </div>
                <div>
                  <Title level={5} className="mb-2">Gender</Title>
                  <Checkbox.Group
                    options={genders}
                    value={selectedGenders}
                    onChange={setSelectedGenders}
                    className="flex flex-col gap-2"
                  />
                </div>
              </Panel>

              {/* Location Section */}
              <Panel header="Location" key="location">
                <div className="mb-4">
                  <Title level={5} className="mb-2">Country</Title>
                  <Select
                    mode="multiple"
                    placeholder="Select countries"
                    value={selectedCountries}
                    onChange={setSelectedCountries}
                    className="w-full"
                    options={countries.map((country) => ({
                      value: country,
                      label: country,
                    }))}
                  />
                </div>
                <div>
                  <Title level={5} className="mb-2">City</Title>
                  <Select
                    mode="multiple"
                    placeholder="Select cities"
                    value={selectedCities}
                    onChange={setSelectedCities}
                    className="w-full"
                    options={cities.map((city) => ({
                      value: city,
                      label: city,
                    }))}
                  />
                </div>
              </Panel>
            </Collapse>
          </Card>
        </div>

        {/* Results Section */}
        <div className="results-section flex-1">
          {loading ? (
            <Row gutter={[24, 24]}>
              {[...Array(6)].map((_, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                  <Card className="h-full">
                    <Skeleton active avatar paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : filteredInfluencers.length > 0 ? (
            <>
              <div className="results-header mb-4">
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

              <div className="text-center mt-6">
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
                <Button
                  type="primary"
                  onClick={clearFilters}
                  className="mt-4"
                >
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
      color: "#E1306C",
    },
    {
      platform: "tiktok",
      icon: <TikTokOutlined />,
      username: influencer.tkUsername,
      count: influencer.tkFollowersCount,
      color: "#000000",
    },
    {
      platform: "twitter",
      icon: <TwitterOutlined />,
      username: influencer.twUsername,
      count: influencer.twFollowersCount,
      color: "#1DA1F2",
    },
    {
      platform: "facebook",
      icon: <FacebookOutlined />,
      username: influencer.fbUserId ? "Connected" : null,
      color: "#4267B2",
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
        className="h-full"
        cover={
          <div className="relative h-[120px] bg-gradient-to-r from-primary to-secondary">
            <Avatar
              size={80}
              src={influencer.profilePicture}
              className="absolute -bottom-10 left-6 border-4 border-white shadow-lg"
            />
          </div>
        }
        actions={[
          <Link
            href={`/brand/influencer-discovery/influencerProfile/${influencer.influencerId}`}
            key="view"
          >
            <Button type="primary" block>
              View Profile
            </Button>
          </Link>,
        ]}
      >
        <div className="pt-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Title level={4} className="mb-1">{influencer.fullName}</Title>
              <Text type="secondary" className="block">
                {influencer.age} years • {influencer.gender}
              </Text>
            </div>
          </div>

          <Paragraph ellipsis={{ rows: 2 }} className="mb-4">
            {influencer.bio}
          </Paragraph>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <EnvironmentOutlined />
              <Text>{influencer.city}, {influencer.country}</Text>
            </div>
            <div className="flex items-center gap-2">
              <MailOutlined />
              <Text>{influencer.email}</Text>
            </div>
          </div>

          <div className="border-t pt-4">
            <Title level={5} className="mb-2">Social Media</Title>
            <div className="flex flex-wrap gap-4">
              {socialIcons.map((social) => (
                <Tooltip
                  key={social.platform}
                  title={`${social.platform}: ${social.count ? `${(social.count / 1000).toFixed(1)}k followers` : 'Connected'}`}
                >
                  <div
                    className="flex items-center gap-1"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                    <Text>{social.count ? `${(social.count / 1000).toFixed(1)}k` : '✓'}</Text>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Title level={5} className="mb-2">Categories</Title>
            <div className="flex flex-wrap gap-2">
              {influencer.contentCategories?.map((category) => (
                <Tag key={category} color="blue">
                  {category}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default SearchInfluencers;