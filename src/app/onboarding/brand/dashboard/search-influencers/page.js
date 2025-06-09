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
  Collapse,
  Drawer
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
  UpOutlined,
  UserOutlined,
  TeamOutlined
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
  const [selectedFollowerGenders, setSelectedFollowerGenders] = useState([]);
  const [selectedFollowerAgeRanges, setSelectedFollowerAgeRanges] = useState([]);
  const [selectedFollowerCountries, setSelectedFollowerCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(['categories', 'influencer-demographics', 'follower-demographics', 'location']);
  const dispatch = useDispatch();
  const auth = useAuth();
  const pageSize = 12;
  const { influencers } = useSelector((store) => store.filterResults);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
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

    // Follower demographics filters (to be implemented with backend)
    const matchesFollowerGenders = true; // Placeholder
    const matchesFollowerAgeRanges = true; // Placeholder
    const matchesFollowerCountries = true; // Placeholder

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
      matchesFollowerGenders &&
      matchesFollowerAgeRanges &&
      matchesFollowerCountries &&
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
    setSelectedFollowerGenders([]);
    setSelectedFollowerAgeRanges([]);
    setSelectedFollowerCountries([]);
    setActiveTab("all");
  };

  return (
    <div className="w-full text-color p-4 md:p-6">
      {/* Header Section */}
      <div className="search-header mb-6">
        <Title level={2} className="mb-2">
          Discover Influencers
        </Title>
        <Text type="secondary" className="block mb-6">
          Find the perfect influencers for your brand campaigns. Filter by
          category, audience demographics, and more.
        </Text>

        {/* Search and Quick Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <Input
                placeholder="Search influencers by name, bio, category, or location..."
                prefix={<SearchOutlined />}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-col gap-4">
              {/* Influencer Quick Filters */}
              <div>
                <Text strong className="block mb-2 text-primary">Influencer Filters</Text>
                <div className="flex flex-wrap gap-3">
                  <Select
                    mode="multiple"
                    placeholder="Content Categories"
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    style={{ minWidth: '200px' }}
                    maxTagCount={2}
                    options={categories.map((category) => ({
                      value: category,
                      label: category,
                    }))}
                  />
                  <Select
                    mode="multiple"
                    placeholder="Gender"
                    value={selectedGenders}
                    onChange={setSelectedGenders}
                    style={{ minWidth: '150px' }}
                    options={genders.map((gender) => ({
                      value: gender,
                      label: gender,
                    }))}
                  />
                  <Select
                    mode="multiple"
                    placeholder="Country"
                    value={selectedCountries}
                    onChange={setSelectedCountries}
                    style={{ minWidth: '150px' }}
                    maxTagCount={1}
                    options={countries.map((country) => ({
                      value: country,
                      label: country,
                    }))}
                  />
                  <Select
                    mode="multiple"
                    placeholder="City"
                    value={selectedCities}
                    onChange={setSelectedCities}
                    style={{ minWidth: '150px' }}
                    maxTagCount={1}
                    options={cities.map((city) => ({
                      value: city,
                      label: city,
                    }))}
                  />
                  <button
                    className="bg-gradient-to-r rounded px-4 py-2 text-sm from-primary to-secondary text-white" 
                    // icon={<TeamOutlined />}
                    onClick={() => setDrawerVisible(true)}
                  >
                    Follower Demographics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Follower Demographics Drawer */}
      <Drawer
        title="Follower Demographics"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
        extra={
          <Space>
            <Button onClick={() => {
              setSelectedFollowerGenders([]);
              setSelectedFollowerAgeRanges([]);
              setSelectedFollowerCountries([]);
            }}>
              Clear
            </Button>
            <Button type="primary" onClick={() => setDrawerVisible(false)}>
              Apply
            </Button>
          </Space>
        }
      >
        <div className="mb-6">
          <Text strong className="block mb-3">Select Platform</Text>
          <Radio.Group 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button value="instagram" className="w-full flex items-center justify-center gap-2">
                <InstagramOutlined style={{ color: '#E1306C' }} />
                Instagram
              </Radio.Button>
              <Radio.Button value="tiktok" className="w-full flex items-center justify-center gap-2">
                <TikTokOutlined />
                TikTok
              </Radio.Button>
              <Radio.Button value="facebook" className="w-full flex items-center justify-center gap-2">
                <FacebookOutlined style={{ color: '#4267B2' }} />
                Facebook
              </Radio.Button>
            </Space>
          </Radio.Group>
        </div>

        <Divider />

        <div className="mb-6">
          <Title level={5} className="mb-3">Age Range</Title>
          <Checkbox.Group
            options={ageRanges}
            value={selectedFollowerAgeRanges}
            onChange={setSelectedFollowerAgeRanges}
            className="flex flex-col gap-2"
          />
        </div>

        <div className="mb-6">
          <Title level={5} className="mb-3">Gender</Title>
          <Checkbox.Group
            options={genders}
            value={selectedFollowerGenders}
            onChange={setSelectedFollowerGenders}
            className="flex flex-col gap-2"
          />
        </div>

        <div>
          <Title level={5} className="mb-3">Top Countries</Title>
          <Select
            mode="multiple"
            placeholder="Select countries"
            value={selectedFollowerCountries}
            onChange={setSelectedFollowerCountries}
            className="w-full"
            options={countries.map((country) => ({
              value: country,
              label: country,
            }))}
          />
        </div>
      </Drawer>

      {/* Results Section */}
      <div className="results-section">
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
        className="h-full overflow-hidden"
        cover={
          <div className="relative h-[70px] bg-gradient-to-r from-primary via-secondary to-primary">
            <div className="absolute inset-0 bg-black/10"></div>
            <Avatar
              size={56}
              src={influencer.profilePicture}
              className="absolute -bottom-6 left-5 border-2 border-white shadow-lg"
            />
          </div>
        }
        actions={[
          <Link
            href={`/brand/influencer-discovery/influencerProfile/${influencer.influencerId}`}
            key="view"
            className="px-4"
          >
            <Button 
              type="primary" 
              block 
              className="bg-primary hover:bg-secondary transition-colors duration-200"
            >
              View Profile
            </Button>
          </Link>,
        ]}
      >
        <div className="pt-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-4">
              <Title level={5} className="mb-1 text-color font-semibold !text-base">
                {influencer.fullName}
              </Title>
              <Text type="secondary" className="text-xs text-muted block">
                {influencer.age} years • {influencer.gender}
              </Text>
            </div>
            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <Tooltip
                  key={social.platform}
                  title={`${social.platform}: ${social.count ? `${(social.count / 1000).toFixed(1)}k followers` : 'Connected'}`}
                >
                  <div
                    className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                    <Text className="text-xs font-medium">
                      {social.count ? `${(social.count / 1000).toFixed(1)}k` : '✓'}
                    </Text>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <EnvironmentOutlined className="text-primary text-sm" />
            <Text className="text-xs text-muted font-medium">
              {influencer.city}, {influencer.country}
            </Text>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {influencer.contentCategories?.slice(0, 2).map((category) => (
              <Tag 
                key={category} 
                className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary border-primary/10 font-medium"
              >
                {category}
              </Tag>
            ))}
            {influencer.contentCategories?.length > 2 && (
              <Tag 
                className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary border-primary/10 font-medium"
              >
                +{influencer.contentCategories.length - 2}
              </Tag>
            )}
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default SearchInfluencers;