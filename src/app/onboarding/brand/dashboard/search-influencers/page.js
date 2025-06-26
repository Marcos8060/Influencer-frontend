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
  Drawer,
} from "antd";
import {
  SearchOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  TikTokOutlined,
  MailOutlined,
  TeamOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useAuth } from "@/assets/hooks/use-auth";
import toast from "react-hot-toast";
import {
  fetchAllSearchResults,
  getAllInfluencers,
} from "@/redux/features/influencer/filter";
import { country_names } from "@/app/Components/country-names";
import InfluencerCard from "@/app/Components/Influencer/All-Influencers/InfluencerCard";
import AddToBucketListModal from "@/app/Components/Influencer/All-Influencers/add-to-bucket-modal";
import AddToCampaignModal from "@/app/Components/Influencer/All-Influencers/add-to-campaign-modal";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";

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
const genders = ["Male", "Female"];

// Define gender mapping for backend
const genderMapping = {
  Male: "M",
  Female: "F",
};

// Define ageRanges constant
const ageRanges = [
  { label: "18-24", value: "18-24" },
  { label: "25-34", value: "25-34" },
  { label: "35-44", value: "35-44" },
  { label: "45-54", value: "45-54" },
  { label: "55+", value: "55+" },
];

// Helper to get display name from string or object
const getDisplayName = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.name) return val.name;
  return "";
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
    // Add new follower demographics filters with empty defaults
    social_media_followers_age: null,
    social_media_followers_age_percentage: null,
    social_media_followers_city: null,
    social_media_followers_city_percentage: null,
    social_media_followers_country: null,
    social_media_followers_country_percentage: null,
    social_media_followers_gender: null,
    social_media_followers_gender_percentage: null,
    social_media_platform_name: null,
    // Add campaign and bucket filtering
    selectedCampaign: null,
    selectedBucket: null,
    hideInCampaign: false,
    hideInBucket: false,
  });
  const [cursor, setCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const dispatch = useDispatch();
  const auth = useAuth();
  const { searchResults } = useSelector((store) => store.filterResults);
  const [selectedFollowerGenders, setSelectedFollowerGenders] = useState([]);
  const [selectedFollowerAgeRanges, setSelectedFollowerAgeRanges] = useState(
    []
  );
  const [selectedFollowerCountries, setSelectedFollowerCountries] = useState(
    []
  );
  const [selectedFollowerCities, setSelectedFollowerCities] = useState(
    []
  );
  const [bucketModalData, setBucketModalData] = useState(null);
  const [campaignModalData, setCampaignModalData] = useState(null);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  // Get bucket list and campaigns for status checking
  const { bucketList } = useSelector((store) => store.bucket);
  const { brandCampaigns } = useSelector((store) => store.campaign);

  // Fetch results from backend
  const fetchResults = (customCursor = null) => {
    setLoading(true);
    const payload = {
      ...filters,
      cursor: customCursor || cursor,
      page_size: filters.page_size,
    };
    // Remove empty values and null values
    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === "" ||
        payload[key] === null ||
        (Array.isArray(payload[key]) && payload[key].length === 0) ||
        (typeof payload[key] === "object" &&
          payload[key] !== null &&
          Object.keys(payload[key]).length === 0)
      ) {
        delete payload[key];
      }
    });
    // Map fullName to full_name for backend, remove keywords and fullName
    if (payload.fullName) {
      payload.full_name = payload.fullName;
      delete payload.fullName;
      delete payload.keywords;
    }
    dispatch(fetchAllSearchResults(auth, payload)).then((response) => {
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
  };

  // On filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCursor(null); // Reset to first page
  };

  // Fetch on filters or auth change
  useEffect(() => {
    if (auth) fetchResults();
    // eslint-disable-next-line
  }, [filters, auth]);

  // Get unique countries and cities for Selects
  const availableCountries = Array.from(
    new Set(searchResults?.results?.map((i) => getDisplayName(i.country)))
  ).filter(Boolean);
  const cities = Array.from(
    new Set(searchResults?.results?.map((i) => getDisplayName(i.city)))
  ).filter(Boolean);

  // Results to display
  const results = searchResults?.results || [];

  // Filter results based on campaign/bucket selections
  const filteredResults = results.filter((influencer) => {
    // Only apply hide options, do not restrict to selected campaign/bucket
    // Hide influencers in any campaign if hideInCampaign is true and no specific campaign is selected
    if (filters.hideInCampaign && !filters.selectedCampaign) {
      const isInAnyCampaign = brandCampaigns.some(campaign =>
        campaign.collaborators.some(collab => collab.influencer === influencer.influencerId)
      );
      if (isInAnyCampaign) return false;
    }

    // Hide influencers in any bucket if hideInBucket is true and no specific bucket is selected
    if (filters.hideInBucket && !filters.selectedBucket) {
      const isInAnyBucket = bucketList.some(bucket =>
        bucket.influencers.some(inf => inf.id === influencer.influencerId)
      );
      if (isInAnyBucket) return false;
    }

    // If hideInCampaign is true and a specific campaign is selected, hide those in that campaign
    if (filters.hideInCampaign && filters.selectedCampaign) {
      const selectedCampaign = brandCampaigns.find(c => c.id === filters.selectedCampaign);
      const isInSelectedCampaign = selectedCampaign?.collaborators?.some(
        collab => collab.influencer === influencer.influencerId
      );
      if (isInSelectedCampaign) return false;
    }

    // If hideInBucket is true and a specific bucket is selected, hide those in that bucket
    if (filters.hideInBucket && filters.selectedBucket) {
      const selectedBucket = bucketList.find(b => b.id === filters.selectedBucket);
      const isInSelectedBucket = selectedBucket?.influencers?.some(
        inf => inf.id === influencer.influencerId
      );
      if (isInSelectedBucket) return false;
    }

    return true;
  });

  useEffect(() => {
    if (auth) {
      dispatch(fetchAllBuckets(auth));
      dispatch(fetchAllBrandCampaigns(auth));
    }
  }, [auth]);

  // Handle influencer selection
  const handleInfluencerSelect = (influencerId, isSelected) => {
    if (isSelected) {
      setSelectedInfluencers((prev) => [...prev, influencerId]);
    } else {
      setSelectedInfluencers((prev) =>
        prev.filter((id) => id !== influencerId)
      );
    }
  };

  // Handle bulk actions
  const handleBulkAddToBucket = () => {
    const selectedInfluencerData = filteredResults.filter((influencer) =>
      selectedInfluencers.includes(influencer.influencerId)
    );
    setBucketModalData(selectedInfluencerData);
  };

  const handleBulkAddToCampaign = () => {
    const selectedInfluencerData = filteredResults.filter((influencer) =>
      selectedInfluencers.includes(influencer.influencerId)
    );
    setCampaignModalData(selectedInfluencerData);
  };

  // Clear selections when filters change
  useEffect(() => {
    setSelectedInfluencers([]);
    setShowBulkActions(false);
  }, [filters]);

  // Show bulk actions when influencers are selected
  useEffect(() => {
    setShowBulkActions(selectedInfluencers.length > 0);
  }, [selectedInfluencers]);
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
                placeholder="Search influencers by name..."
                prefix={<SearchOutlined />}
                size="large"
                value={filters.fullName || ""}
                onChange={(e) => handleFilterChange("fullName", e.target.value)}
                allowClear
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-col gap-4">
              {/* Influencer Quick Filters */}
              <div>
                <Tooltip title="Filter influencers based on their personal characteristics like content categories, gender, location, and age">
                  <Text strong className="block mb-2 text-primary cursor-help">
                    Influencer Filters
                  </Text>
                </Tooltip>
                <div className="flex flex-wrap gap-3">
                  <Select
                    mode="multiple"
                    placeholder="Content Categories"
                    value={filters.categories}
                    onChange={(val) => handleFilterChange("categories", val)}
                    style={{ minWidth: "200px" }}
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
                    onChange={(val) =>
                      handleFilterChange("gender", val[0] || "")
                    }
                    style={{ minWidth: "150px" }}
                    options={genders.map((gender) => ({
                      value: gender,
                      label: gender,
                    }))}
                  />
                  <Select
                    mode="multiple"
                    placeholder="Country"
                    value={filters.country ? [filters.country] : []}
                    onChange={(val) =>
                      handleFilterChange("country", val[0] || "")
                    }
                    style={{ minWidth: "150px" }}
                    maxTagCount={1}
                    options={availableCountries.map((country) => ({
                      value: country,
                      label: country,
                    }))}
                  />
                  <Select
                    mode="multiple"
                    placeholder="City"
                    value={filters.city ? [filters.city] : []}
                    onChange={(val) => handleFilterChange("city", val[0] || "")}
                    style={{ minWidth: "150px" }}
                    maxTagCount={1}
                    options={cities.map((city) => ({
                      value: city,
                      label: city,
                    }))}
                  />
                  <Tooltip title="Filter influencers based on their audience demographics - the age, gender, and location of their followers on social media platforms">
                    <button
                      className="bg-gradient-to-r rounded px-4 py-2 text-sm from-primary to-secondary text-white cursor-help"
                      // icon={<TeamOutlined />}
                      onClick={() => setDrawerVisible(true)}
                    >
                      Follower Demographics
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* Campaign & Bucket Filters */}
              <div>
                <Tooltip title="Filter and organize influencers by specific campaigns or buckets to manage your influencer discovery process">
                  <Text strong className="block mb-2 text-primary cursor-help">
                    Campaign & Bucket Organization
                  </Text>
                </Tooltip>
                <div className="flex flex-wrap gap-3 items-center">
                  <Select
                    placeholder="Filter by Campaign"
                    value={filters.selectedCampaign}
                    onChange={(val) => handleFilterChange("selectedCampaign", val)}
                    style={{ minWidth: "200px" }}
                    allowClear
                    options={brandCampaigns.map((campaign) => ({
                      value: campaign.id,
                      label: campaign.title,
                    }))}
                  />
                  <Select
                    placeholder="Filter by Bucket"
                    value={filters.selectedBucket}
                    onChange={(val) => handleFilterChange("selectedBucket", val)}
                    style={{ minWidth: "200px" }}
                    allowClear
                    options={bucketList.map((bucket) => ({
                      value: bucket.id,
                      label: bucket.name,
                    }))}
                  />
                  <Checkbox
                    checked={filters.hideInCampaign}
                    onChange={(e) => handleFilterChange("hideInCampaign", e.target.checked)}
                  >
                    Hide influencers in campaigns
                  </Checkbox>
                  <Checkbox
                    checked={filters.hideInBucket}
                    onChange={(e) => handleFilterChange("hideInBucket", e.target.checked)}
                  >
                    Hide influencers in buckets
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Filters Display */}
      {Object.keys(filters).some((key) => {
        const value = filters[key];
        return (
          (value && typeof value === "string" && value !== "") ||
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "boolean" && value === true) ||
          (typeof value === "object" &&
            value !== null &&
            Object.keys(value).length > 0)
        );
      }) && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <section className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Text strong className="text-primary">
                Active Filters:
              </Text>
              <div className="flex flex-wrap gap-2">
                {/* Search term */}
                {filters.fullName && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("fullName", "")}
                    className="flex items-center gap-1"
                    color="blue"
                  >
                    Search: {filters.fullName}
                  </Tag>
                )}

                {/* Categories */}
                {filters.categories &&
                  filters.categories.length > 0 &&
                  filters.categories.map((category, index) => (
                    <Tag
                      key={`category-${index}`}
                      closable
                      onClose={() => {
                        const newCategories = filters.categories.filter(
                          (_, i) => i !== index
                        );
                        handleFilterChange("categories", newCategories);
                      }}
                      className="flex items-center gap-1"
                      color="purple"
                    >
                      {category}
                    </Tag>
                  ))}

                {/* Gender */}
                {filters.gender && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("gender", "")}
                    className="flex items-center gap-1"
                    color="green"
                  >
                    Gender: {filters.gender}
                  </Tag>
                )}

                {/* Country */}
                {filters.country && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("country", "")}
                    className="flex items-center gap-1"
                    color="orange"
                  >
                    Country: {filters.country}
                  </Tag>
                )}

                {/* City */}
                {filters.city && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("city", "")}
                    className="flex items-center gap-1"
                    color="cyan"
                  >
                    City: {filters.city}
                  </Tag>
                )}

                {/* Social Media Platform */}
                {filters.social_media_platform_name && (
                  <Tag
                    closable
                    onClose={() => {
                      handleFilterChange("social_media_platform_name", null);
                      setSelectedPlatform(null);
                    }}
                    className="flex items-center gap-1"
                    color="magenta"
                  >
                    Platform: {filters.social_media_platform_name}
                  </Tag>
                )}

                {/* Campaign Filter */}
                {filters.selectedCampaign && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("selectedCampaign", null)}
                    className="flex items-center gap-1"
                    color="lime"
                  >
                    Campaign: {brandCampaigns.find(c => c.id === filters.selectedCampaign)?.title}
                  </Tag>
                )}
                
                {/* Bucket Filter */}
                {filters.selectedBucket && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("selectedBucket", null)}
                    className="flex items-center gap-1"
                    color="gold"
                  >
                    Bucket: {bucketList.find(b => b.id === filters.selectedBucket)?.name}
                  </Tag>
                )}
                
                {/* Hide Options */}
                {filters.hideInCampaign && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("hideInCampaign", false)}
                    className="flex items-center gap-1"
                    color="red"
                  >
                    Hide Campaign Influencers
                  </Tag>
                )}
                
                {filters.hideInBucket && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("hideInBucket", false)}
                    className="flex items-center gap-1"
                    color="red"
                  >
                    Hide Bucket Influencers
                  </Tag>
                )}

                {/* Follower Demographics */}
                {filters.social_media_followers_gender && (
                  <Tag
                    closable
                    onClose={() => {
                      handleFilterChange("social_media_followers_gender", null);
                      handleFilterChange(
                        "social_media_followers_gender_percentage",
                        null
                      );
                      setSelectedFollowerGenders([]);
                    }}
                    className="flex items-center gap-1"
                    color="red"
                  >
                    Follower Gender:{" "}
                    {filters.social_media_followers_gender_percentage}%
                  </Tag>
                )}

                {filters.social_media_followers_age && (
                  <Tag
                    closable
                    onClose={() => {
                      handleFilterChange("social_media_followers_age", null);
                      handleFilterChange(
                        "social_media_followers_age_percentage",
                        null
                      );
                      setSelectedFollowerAgeRanges([]);
                    }}
                    className="flex items-center gap-1"
                    color="volcano"
                  >
                    Follower Age: {filters.social_media_followers_age} (
                    {filters.social_media_followers_age_percentage}%)
                  </Tag>
                )}

                {filters.social_media_followers_country && (
                  <Tag
                    closable
                    onClose={() => {
                      handleFilterChange(
                        "social_media_followers_country",
                        null
                      );
                      handleFilterChange(
                        "social_media_followers_country_percentage",
                        null
                      );
                      setSelectedFollowerCountries(null);
                    }}
                    className="flex items-center gap-1"
                    color="geekblue"
                  >
                    Follower Country: {filters.social_media_followers_country} (
                    {filters.social_media_followers_country_percentage}%)
                  </Tag>
                )}

                {filters.social_media_followers_city && (
                  <Tag
                    closable
                    onClose={() => {
                      handleFilterChange(
                        "social_media_followers_city",
                        null
                      );
                      handleFilterChange(
                        "social_media_followers_city_percentage",
                        null
                      );
                      setSelectedFollowerCities(null);
                    }}
                    className="flex items-center gap-1"
                    color="blue"
                  >
                    Follower City: {filters.social_media_followers_city} (
                    {filters.social_media_followers_city_percentage}%)
                  </Tag>
                )}
              </div>
            </div>
            <Button
              size="small"
              onClick={() => {
                setFilters({
                  bio: "",
                  platform_verified: null,
                  race: "",
                  country: "",
                  city: "",
                  categories: [],
                  age_start: null,
                  age_end: null,
                  gender: "",
                  fullName: "",
                  page_size: 20,
                  social_media_followers_age: null,
                  social_media_followers_age_percentage: null,
                  social_media_followers_city: null,
                  social_media_followers_city_percentage: null,
                  social_media_followers_country: null,
                  social_media_followers_country_percentage: null,
                  social_media_followers_gender: null,
                  social_media_followers_gender_percentage: null,
                  social_media_platform_name: null,
                  selectedCampaign: null,
                  selectedBucket: null,
                  hideInCampaign: false,
                  hideInBucket: false,
                });
                setSelectedFollowerCities([]);
              }}
              className="text-xs"
            >
              Clear All
            </Button>
          </section>
        </div>
      )}

      {/* Follower Demographics Drawer */}
      <Drawer
        title="Follower Demographics"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={450}
        extra={
          <Space>
            <Button
              onClick={() => {
                setSelectedFollowerGenders([]);
                setSelectedFollowerAgeRanges([]);
                setSelectedFollowerCountries([]);
                setSelectedFollowerCities([]);
                setSelectedPlatform(null);
                // Reset follower demographics filters to null
                handleFilterChange("social_media_followers_gender", null);
                handleFilterChange(
                  "social_media_followers_gender_percentage",
                  null
                );
                handleFilterChange("social_media_followers_age", null);
                handleFilterChange(
                  "social_media_followers_age_percentage",
                  null
                );
                handleFilterChange("social_media_followers_country", null);
                handleFilterChange(
                  "social_media_followers_country_percentage",
                  null
                );
                handleFilterChange("social_media_followers_city", null);
                handleFilterChange(
                  "social_media_followers_city_percentage",
                  null
                );
                handleFilterChange("social_media_platform_name", null);
              }}
            >
              Clear
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (!selectedPlatform) {
                  toast.error("Please select a platform first");
                  return;
                }

                // Validate that if a filter is selected, its percentage is also set
                if (
                  selectedFollowerAgeRanges.length > 0 &&
                  !filters.social_media_followers_age_percentage
                ) {
                  toast.error(
                    "Please enter a percentage for the selected age range"
                  );
                  return;
                }
                if (
                  selectedFollowerGenders.length > 0 &&
                  !filters.social_media_followers_gender_percentage
                ) {
                  toast.error(
                    "Please enter a percentage for the selected gender"
                  );
                  return;
                }
                if (
                  selectedFollowerCountries &&
                  !filters.social_media_followers_country_percentage
                ) {
                  toast.error(
                    "Please enter a percentage for the selected country"
                  );
                  return;
                }
                if (
                  selectedFollowerCities &&
                  !filters.social_media_followers_city_percentage
                ) {
                  toast.error(
                    "Please enter a percentage for the selected city"
                  );
                  return;
                }

                // Always set the platform first
                handleFilterChange(
                  "social_media_platform_name",
                  selectedPlatform
                );

                // Then set other filters if they exist
                if (selectedFollowerGenders.length > 0) {
                  const selectedGender = selectedFollowerGenders[0];
                  handleFilterChange(
                    "social_media_followers_gender",
                    genderMapping[selectedGender]
                  );
                }
                if (selectedFollowerAgeRanges.length > 0) {
                  handleFilterChange(
                    "social_media_followers_age",
                    selectedFollowerAgeRanges[0]
                  );
                }
                if (selectedFollowerCountries) {
                  handleFilterChange(
                    "social_media_followers_country",
                    selectedFollowerCountries
                  );
                }
                if (selectedFollowerCities) {
                  handleFilterChange(
                    "social_media_followers_city",
                    selectedFollowerCities
                  );
                }
                setDrawerVisible(false);
              }}
            >
              Apply
            </Button>
          </Space>
        }
      >
        <div className="mb-6">
          <Tooltip title="Select the social media platform to filter followers by (Instagram, TikTok, or Facebook)">
            <Title level={5} className="mb-3 cursor-help">
              Select Platform
            </Title>
          </Tooltip>
          <Radio.Group
            value={selectedPlatform}
            onChange={(e) => {
              const platform = e.target.value;
              setSelectedPlatform(platform);
              // Set the platform immediately when selected
              handleFilterChange("social_media_platform_name", platform);
              // Reset other filters when platform changes
              setSelectedFollowerGenders([]);
              setSelectedFollowerAgeRanges([]);
              setSelectedFollowerCountries([]);
              setSelectedFollowerCities([]);
              handleFilterChange("social_media_followers_gender", null);
              handleFilterChange(
                "social_media_followers_gender_percentage",
                null
              );
              handleFilterChange("social_media_followers_age", null);
              handleFilterChange("social_media_followers_age_percentage", null);
              handleFilterChange("social_media_followers_country", null);
              handleFilterChange(
                "social_media_followers_country_percentage",
                null
              );
              handleFilterChange("social_media_followers_city", null);
              handleFilterChange(
                "social_media_followers_city_percentage",
                null
              );
            }}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button
                value="instagram"
                className="w-full flex items-center justify-center gap-2"
              >
                <InstagramOutlined style={{ color: "#E1306C" }} />
                Instagram
              </Radio.Button>
              <Radio.Button
                value="tiktok"
                className="w-full flex items-center justify-center gap-2"
              >
                <TikTokOutlined />
                TikTok
              </Radio.Button>
              <Radio.Button
                value="facebook"
                className="w-full flex items-center justify-center gap-2"
              >
                <FacebookOutlined style={{ color: "#4267B2" }} />
                Facebook
              </Radio.Button>
            </Space>
          </Radio.Group>
        </div>

        <Divider />

        <div className="mb-6">
          <Tooltip title="Filter influencers whose followers fall within specific age ranges with the specified percentage">
            <Title level={5} className="mb-3 cursor-help">
              Follower Age Range
            </Title>
          </Tooltip>
          <Text type="secondary" className="block mb-3 text-sm">
            Select an age range and specify the percentage of followers in that
            range
          </Text>
          <div className="space-y-4">
            {ageRanges.map((range) => (
              <div
                key={range.value}
                className="flex items-center justify-between"
              >
                <Checkbox
                  checked={selectedFollowerAgeRanges.includes(range.value)}
                  onChange={(e) => {
                    if (!selectedPlatform) {
                      toast.error("Please select a platform first");
                      return;
                    }
                    const newRanges = e.target.checked ? [range.value] : [];
                    setSelectedFollowerAgeRanges(newRanges);
                    if (e.target.checked) {
                      handleFilterChange(
                        "social_media_followers_age",
                        range.value
                      );
                    } else {
                      handleFilterChange("social_media_followers_age", null);
                      handleFilterChange(
                        "social_media_followers_age_percentage",
                        null
                      );
                    }
                  }}
                  disabled={!selectedPlatform}
                >
                  {range.label}
                </Checkbox>
                <Tooltip title="Enter the minimum percentage of followers in this age range">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="%"
                    style={{ width: "100px" }}
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter, and navigation keys
                      if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
                        return;
                      }
                      // Allow: numbers and decimal point
                      if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 190) {
                        // Check if adding this digit would exceed 100
                        const currentValue = e.target.value;
                        const newValue = currentValue + e.key;
                        if (parseFloat(newValue) > 100) {
                          e.preventDefault();
                        }
                        return;
                      }
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
                      const numValue = parseFloat(percentage);
                      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                        return; // Simply ignore invalid values
                      }
                      handleFilterChange(
                        "social_media_followers_age_percentage",
                        percentage
                      );
                    }}
                    disabled={
                      !selectedPlatform ||
                      !selectedFollowerAgeRanges.includes(range.value)
                    }
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Tooltip title="Filter influencers whose followers are predominantly of a specific gender with the specified percentage">
            <Title level={5} className="mb-3 cursor-help">
              Follower Gender
            </Title>
          </Tooltip>
          <Text type="secondary" className="block mb-3 text-sm">
            Select a gender and specify the percentage of followers of that
            gender
          </Text>
          <div className="space-y-4">
            {genders.map((gender) => (
              <div key={gender} className="flex items-center justify-between">
                <Checkbox
                  checked={selectedFollowerGenders.includes(gender)}
                  onChange={(e) => {
                    if (!selectedPlatform) {
                      toast.error("Please select a platform first");
                      return;
                    }
                    const newGenders = e.target.checked ? [gender] : [];
                    setSelectedFollowerGenders(newGenders);
                    if (e.target.checked) {
                      handleFilterChange(
                        "social_media_followers_gender",
                        genderMapping[gender]
                      );
                    } else {
                      handleFilterChange("social_media_followers_gender", null);
                      handleFilterChange(
                        "social_media_followers_gender_percentage",
                        null
                      );
                    }
                  }}
                  disabled={!selectedPlatform}
                >
                  {gender}
                </Checkbox>
                <Tooltip title="Enter the minimum percentage of followers of this gender">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="%"
                    style={{ width: "100px" }}
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter, and navigation keys
                      if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
                        return;
                      }
                      // Allow: numbers and decimal point
                      if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 190) {
                        // Check if adding this digit would exceed 100
                        const currentValue = e.target.value;
                        const newValue = currentValue + e.key;
                        if (parseFloat(newValue) > 100) {
                          e.preventDefault();
                        }
                        return;
                      }
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
                      const numValue = parseFloat(percentage);
                      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                        return; // Simply ignore invalid values
                      }
                      handleFilterChange(
                        "social_media_followers_gender_percentage",
                        percentage
                      );
                    }}
                    disabled={
                      !selectedPlatform ||
                      !selectedFollowerGenders.includes(gender)
                    }
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Tooltip title="Filter influencers whose followers are predominantly from specific countries with the specified percentage">
            <Title level={5} className="mb-3 cursor-help">
              Top Follower Countries
            </Title>
          </Tooltip>
          <Text type="secondary" className="block mb-3 text-sm">
            Select a country and specify the percentage of followers from that
            country
          </Text>
          <div className="space-y-4">
            <Select
              showSearch
              placeholder="Search and select a country"
              value={selectedFollowerCountries}
              onChange={(value) => {
                if (!selectedPlatform) {
                  toast.error("Please select a platform first");
                  return;
                }
                setSelectedFollowerCountries(value);
                if (value) {
                  handleFilterChange("social_media_followers_country", value);
                } else {
                  handleFilterChange("social_media_followers_country", null);
                  handleFilterChange(
                    "social_media_followers_country_percentage",
                    null
                  );
                }
              }}
              className="w-full mb-4"
              options={country_names.map((country) => ({
                value: country.name,
                label: country.name,
              }))}
              disabled={!selectedPlatform}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
            {selectedFollowerCountries && (
              <div className="flex items-center justify-between gap-4">
                <Text className="flex-1">{selectedFollowerCountries}</Text>
                <Tooltip title="Enter the minimum percentage of followers from this country">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="%"
                    style={{ width: "100px" }}
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter, and navigation keys
                      if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
                        return;
                      }
                      // Allow: numbers and decimal point
                      if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 190) {
                        // Check if adding this digit would exceed 100
                        const currentValue = e.target.value;
                        const newValue = currentValue + e.key;
                        if (parseFloat(newValue) > 100) {
                          e.preventDefault();
                        }
                        return;
                      }
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
                      const numValue = parseFloat(percentage);
                      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                        return; // Simply ignore invalid values
                      }
                      handleFilterChange(
                        "social_media_followers_country_percentage",
                        percentage
                      );
                    }}
                    disabled={!selectedPlatform}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </div>

        <Divider />

        <div>
          <Tooltip title="Filter influencers whose followers are predominantly from specific cities with the specified percentage - especially useful for local businesses">
            <Title level={5} className="mb-3 cursor-help">
              Top Follower Cities
            </Title>
          </Tooltip>
          <Text type="secondary" className="block mb-3 text-sm">
            Select a city and specify the percentage of followers from that
            city. Perfect for local business campaigns.
          </Text>
          <div className="space-y-4">
            <Select
              showSearch
              placeholder="Search and select a city"
              value={selectedFollowerCities}
              onChange={(value) => {
                if (!selectedPlatform) {
                  toast.error("Please select a platform first");
                  return;
                }
                setSelectedFollowerCities(value);
                if (value) {
                  handleFilterChange("social_media_followers_city", value);
                } else {
                  handleFilterChange("social_media_followers_city", null);
                  handleFilterChange(
                    "social_media_followers_city_percentage",
                    null
                  );
                }
              }}
              className="w-full mb-4"
              options={cities.map((city) => ({
                value: city,
                label: city,
              }))}
              disabled={!selectedPlatform}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
            {selectedFollowerCities && (
              <div className="flex items-center justify-between gap-4">
                <Text className="flex-1">{selectedFollowerCities}</Text>
                <Tooltip title="Enter the minimum percentage of followers from this city">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="%"
                    style={{ width: "100px" }}
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter, and navigation keys
                      if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
                        return;
                      }
                      // Allow: numbers and decimal point
                      if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 190) {
                        // Check if adding this digit would exceed 100
                        const currentValue = e.target.value;
                        const newValue = currentValue + e.key;
                        if (parseFloat(newValue) > 100) {
                          e.preventDefault();
                        }
                        return;
                      }
                      e.preventDefault();
                    }}
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
                      const numValue = parseFloat(percentage);
                      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                        return; // Simply ignore invalid values
                      }
                      handleFilterChange(
                        "social_media_followers_city_percentage",
                        percentage
                      );
                    }}
                    disabled={!selectedPlatform}
                  />
                </Tooltip>
              </div>
            )}
          </div>
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
              <div className="flex justify-between items-center">
                <Text strong>Showing {filteredResults.length} influencers</Text>
                <div className="flex items-center gap-4">
                  {/* Select All Checkbox */}
                  {filteredResults.length > 0 && (
                    <Checkbox
                      indeterminate={
                        selectedInfluencers.length > 0 &&
                        selectedInfluencers.length < filteredResults.length
                      }
                      checked={
                        filteredResults.length > 0 &&
                        selectedInfluencers.length === filteredResults.length
                      }
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedInfluencers(filteredResults.map(i => i.influencerId));
                        } else {
                          setSelectedInfluencers([]);
                        }
                      }}
                    >
                      Select All
                    </Checkbox>
                  )}
                  {showBulkActions && (
                    <div className="flex gap-2">
                      <Button
                        className="bg-gradient-to-r from-primary to-secondary"
                        type="primary"
                        size="small"
                        onClick={handleBulkAddToBucket}
                        icon={<TeamOutlined />}
                      >
                        Add {selectedInfluencers.length} to Bucket
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-secondary to-primary"
                        type="primary"
                        size="small"
                        onClick={handleBulkAddToCampaign}
                        icon={<ShoppingOutlined />}
                      >
                        Add {selectedInfluencers.length} to Campaign
                      </Button>
                      <Button
                        size="small"
                        onClick={() => setSelectedInfluencers([])}
                      >
                        Clear Selection
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Row gutter={[24, 24]}>
              {filteredResults.map((influencer) => (
                <Col xs={24} sm={12} md={12} lg={8} key={influencer.id}>
                  <InfluencerCard
                    influencer={influencer}
                    onAddToBucket={() => setBucketModalData([influencer])}
                    onAddToCampaign={() => setCampaignModalData([influencer])}
                    isSelected={selectedInfluencers.includes(
                      influencer.influencerId
                    )}
                    onSelect={handleInfluencerSelect}
                    showCheckbox={true}
                    bucketList={bucketList}
                    brandCampaigns={brandCampaigns}
                  />
                </Col>
              ))}
            </Row>
            <div className="text-center mt-6 flex justify-center gap-4">
              <Button
                onClick={() => fetchResults(prevCursor)}
                disabled={!prevCursor}
              >
                Previous
              </Button>
              <Button
                onClick={() => fetchResults(nextCursor)}
                disabled={!nextCursor}
              >
                Next
              </Button>
            </div>
            {/* Modals for add to bucket/campaign */}
            <AddToBucketListModal
              data={bucketModalData || []}
              open={!!bucketModalData}
              onClose={() => setBucketModalData(null)}
            />
            <AddToCampaignModal
              data={campaignModalData || []}
              open={!!campaignModalData}
              onClose={() => setCampaignModalData(null)}
            />
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
                onClick={() =>
                  setFilters({
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
                  })
                }
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

export default SearchInfluencers;
