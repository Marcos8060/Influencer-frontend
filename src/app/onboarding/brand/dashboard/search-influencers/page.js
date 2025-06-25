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
  console.log("USERS ",searchResults)
  const [selectedFollowerGenders, setSelectedFollowerGenders] = useState([]);
  const [selectedFollowerAgeRanges, setSelectedFollowerAgeRanges] = useState(
    []
  );
  const [selectedFollowerCountries, setSelectedFollowerCountries] = useState(
    []
  );
  const [bucketModalData, setBucketModalData] = useState(null);
  const [campaignModalData, setCampaignModalData] = useState(null);

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

  useEffect(() => {
    if (auth) {
      dispatch(fetchAllBuckets(auth));
      dispatch(fetchAllBrandCampaigns(auth));
    }
  }, [auth]);

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
                <Text strong className="block mb-2 text-primary">
                  Influencer Filters
                </Text>
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
        width={450}
        extra={
          <Space>
            <Button
              onClick={() => {
                setSelectedFollowerGenders([]);
                setSelectedFollowerAgeRanges([]);
                setSelectedFollowerCountries([]);
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
                setDrawerVisible(false);
              }}
            >
              Apply
            </Button>
          </Space>
        }
      >
        <div className="mb-6">
          <Text strong className="block mb-3">
            Select Platform
          </Text>
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
          <Title level={5} className="mb-3">
            Follower Age Range
          </Title>
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
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
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
          <Title level={5} className="mb-3">
            Follower Gender
          </Title>
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
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
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
          <Title level={5} className="mb-3">
            Top Follower Countries
          </Title>
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
                    onChange={(e) => {
                      if (!selectedPlatform) {
                        toast.error("Please select a platform first");
                        return;
                      }
                      const percentage = e.target.value;
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
              <Text strong>Showing {results.length} influencers</Text>
            </div>
            <Row gutter={[24, 24]}>
              {results.map((influencer) => (
                <Col xs={24} sm={12} md={12} lg={8} key={influencer.id}>
                  <InfluencerCard
                    influencer={influencer}
                    onAddToBucket={() => setBucketModalData([influencer])}
                    onAddToCampaign={() => setCampaignModalData([influencer])}
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
