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
  Pagination,
  Empty,
  Checkbox,
  Radio,
  Tooltip,
  Skeleton,
  Collapse,
  Drawer
} from "antd";
import {
  SearchOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  TikTokOutlined,
  MailOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import { fetchAllSearchResults, getAllInfluencers } from "@/redux/features/influencer/filter";

const { Title, Text } = Typography;

// Define categories array
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

// Define genders array
const genders = ["Male", "Female", "Non-binary"];

// Define ageRanges constant
const ageRanges = [
  { label: '18-24', value: '18-24' },
  { label: '25-34', value: '25-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55+', value: '55+' }
];

// Helper to get display name from string or object
const getDisplayName = (val) => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.name) return val.name;
  return '';
};

const SearchInfluencers = () => {
  const [filters, setFilters] = useState({
    bio: "",
    platform_verified: null,
    race: "",
    country: "",
    city: "",
    categories: [],
    age_start: null,
    age_end: null,
    gender: "",
    keywords: "",
    page_size: 20,
  });
  const [cursor, setCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const dispatch = useDispatch();
  const auth = useAuth();
  const { searchResults } = useSelector((store) => store.filterResults);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedFollowerGenders, setSelectedFollowerGenders] = useState([]);
  const [selectedFollowerAgeRanges, setSelectedFollowerAgeRanges] = useState([]);
  const [selectedFollowerCountries, setSelectedFollowerCountries] = useState([]);

  // Fetch results from backend
  const fetchResults = (customCursor = null) => {
    setLoading(true);
    const payload = {
      ...filters,
      cursor: customCursor || cursor,
      page_size: filters.page_size,
    };
    // Remove empty values
    Object.keys(payload).forEach(key => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        (Array.isArray(payload[key]) && payload[key].length === 0)
      ) {
        delete payload[key];
      }
    });
    dispatch(fetchAllSearchResults(auth, payload)).then(response => {
      const getCursorParam = (url) => {
        try {
          return url ? new URL(url).searchParams.get("cursor") : null;
        } catch (e) {
          return null;
        }
      };
    
      setNextCursor(getCursorParam(response?.next));
      setPrevCursor(getCursorParam(response?.previous));
      setCursor(customCursor || null);
      setLoading(false);
    });
    ;
  };

  // On filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCursor(null); // Reset to first page
  };

  // Fetch on filters or auth change
  useEffect(() => {
    if (auth) fetchResults();
    // eslint-disable-next-line
  }, [filters, auth]);

  // Get unique countries and cities for Selects
  const countries = Array.from(new Set(
    searchResults?.results?.map((i) => getDisplayName(i.country))
  )).filter(Boolean);
  const cities = Array.from(new Set(
    searchResults?.results?.map((i) => getDisplayName(i.city))
  )).filter(Boolean);

  // Results to display
  const results = searchResults?.results || [];

  // Render
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
                value={filters.keywords}
                onChange={(e) => handleFilterChange('keywords', e.target.value)}
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
                    value={filters.categories}
                    onChange={(val) => handleFilterChange('categories', val)}
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
                    value={filters.gender ? [filters.gender] : []}
                    onChange={(val) => handleFilterChange('gender', val[0] || "")}
                    style={{ minWidth: '150px' }}
                    options={genders.map((gender) => ({
                      value: gender,
                      label: gender,
                    }))}
                  />
                  <Select
                    mode="multiple"
                    placeholder="Country"
                    value={filters.country ? [filters.country] : []}
                    onChange={(val) => handleFilterChange('country', val[0] || "")}
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
                    value={filters.city ? [filters.city] : []}
                    onChange={(val) => handleFilterChange('city', val[0] || "")}
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
        ) : results.length > 0 ? (
          <>
            <div className="results-header mb-4">
              <Text strong>
                Showing {results.length} influencers
              </Text>
            </div>
            <Row gutter={[24, 24]}>
              {results.map((influencer) => (
                <Col xs={24} sm={12} md={8} lg={6} key={influencer.id}>
                  <InfluencerCard influencer={influencer} />
                </Col>
              ))}
            </Row>
            <div className="text-center mt-6 flex justify-center gap-4">
              <Button onClick={() => fetchResults(prevCursor)} disabled={!prevCursor}>
                Previous
              </Button>
              <Button onClick={() => fetchResults(nextCursor)} disabled={!nextCursor}>
                Next
              </Button>
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
                onClick={() => setFilters({
                  bio: "",
                  platform_verified: null,
                  race: "",
                  country: "",
                  city: "",
                  categories: [],
                  age_start: null,
                  age_end: null,
                  gender: "",
                  keywords: "",
                  page_size: 20,
                })}
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
  // Social icons based on connection flags
  const socialIcons = [
    influencer.isInstagramConnected && {
      platform: "instagram",
      icon: <InstagramOutlined style={{ color: '#E1306C', fontSize: 20 }} />,
    },
    influencer.isTiktokConnected && {
      platform: "tiktok",
      icon: <TikTokOutlined style={{ color: '#000', fontSize: 20 }} />,
    },
  ].filter(Boolean);

  // Category color mapping (customize as needed)
  const categoryColors = {
    "Beauty & Skincare": "bg-primary text-white",
    "Fashion": "bg-secondary text-white",
    "Lifestyle": "bg-yellow text-gray-900",
    // Add more as needed
  };

  // Gradient color pairs using only theme colors
  const gradients = [
    'from-primary to-secondary',
    'from-secondary to-tertiary',
    'from-primary to-yellow',
    'from-green to-primary',
    'from-tertiary to-primary',
    'from-yellow to-secondary',
    'from-red to-primary',
  ];
  // Get initials (first two letters of name)
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials(influencer.fullName);
  const gradientIdx = initials.charCodeAt(0) % gradients.length;
  const gradientClass = `bg-gradient-to-br ${gradients[gradientIdx]}`;

  return (
    <div className="bg-gradient-to-b from-background to-white rounded-2xl shadow-md flex flex-col items-center p-0 overflow-hidden transition-all duration-300 hover:shadow-lg border border-input min-h-[500px]">
      {/* Profile Image (placeholder if missing) */}
      <div className="w-full flex justify-center bg-white px-2" style={{paddingTop: '10px', paddingBottom: '0'}}>
        {influencer.profilePicture ? (
          <img
            src={influencer.profilePicture}
            alt={influencer.fullName || 'Influencer'}
            className="rounded-2xl w-full h-[220px] object-cover shadow-md border-2 border-white"
            style={{marginTop: 0, marginBottom: 0}}
          />
        ) : (
          <div
            className={`rounded-2xl w-full h-[220px] flex items-center justify-center border-2 border-white shadow-md ${gradientClass}`}
            style={{marginTop: 0, marginBottom: 0}}
          >
            <span className="text-white font-extrabold text-6xl drop-shadow-lg">
              {initials}
            </span>
          </div>
        )}
      </div>
      {/* Name */}
      <div className="w-full flex flex-col items-center mt-4 px-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-lg text-color">{influencer.fullName || 'Unknown Name'}</span>
        </div>
        {/* Age & Gender */}
        <div className="flex items-center gap-2 text-muted text-sm mb-1">
          <span>
            {influencer.influencerAge ? `${influencer.influencerAge} years` : ''}
            {influencer.influencerGender ? ` • ${influencer.influencerGender}` : ''}
          </span>
        </div>
        {/* Location */}
        <div className="flex items-center gap-2 text-muted text-sm mb-2">
          <span>{getDisplayName(influencer.city) || 'Unknown City'}, {getDisplayName(influencer.country) || 'Unknown Country'}</span>
        </div>
      </div>
      {/* Social Icons */}
      <div className="flex justify-center gap-3 mb-2">
        {socialIcons.length > 0 ? socialIcons.map((social, idx) => (
          <span key={social.platform}>{social.icon}</span>
        )) : <span className="text-muted text-xs">No social connected</span>}
      </div>
      {/* Category Tags Polished */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {influencer.contentCategories?.slice(0, 2).map((category) => (
          <span
            key={category}
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-input ${categoryColors[category] || 'bg-muted text-white'}`}
          >
            {category}
          </span>
        ))}
        {influencer.contentCategories?.length > 2 && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-input text-gray-700 border border-input shadow-sm">
            +{influencer.contentCategories.length - 2}
          </span>
        )}
      </div>
      {/* Action Buttons */}
      <div className="w-full flex justify-between items-center px-6 pb-4 gap-2">
        <Tooltip title="Chat with this influencer">
          <Link href={`/brand/chat/${influencer.id}`}>
            <Button shape="circle" icon={<MailOutlined />} className="text-primary border-primary" />
          </Link>
        </Tooltip>
        <Link href={`/brand/influencer-discovery/influencerProfile/${influencer.id}`} className="flex-1 ml-2">
          <Button block className="bg-primary text-white font-semibold border-0 hover:bg-secondary transition-colors duration-200">View Profile</Button>
        </Link>
      </div>
    </div>
  );
};

// Heart icon SVG
const HeartIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path d="M10 17.5l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.5 3.5 4 5.5 4c1.04 0 2.09.54 2.7 1.44C8.41 5.54 9.46 5 10.5 5 12.5 5 14 6.5 14 8.5c0 2.78-2.4 4.86-6.55 8.68L10 17.5z" fill="#f472b6" stroke="#f472b6" strokeWidth="1.2"/>
  </svg>
);

export default SearchInfluencers;