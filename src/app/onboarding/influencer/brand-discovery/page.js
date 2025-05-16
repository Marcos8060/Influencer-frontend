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
} from "@ant-design/icons";
import { getAllBrands } from "@/redux/features/influencer/filter";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { ReactCountryFlag } from "react-country-flag";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const BrandDiscovery = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState([]);
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

  const filteredBrands = brands.filter((brand) => {
    const brandName = brand?.name ?? "";
    const brandDescription = brand?.description ?? "";
    const brandIndustry = brand?.industry ?? "";
  
    const searchTerm = searchText.toLowerCase();
  
    const matchesSearch =
      searchText === "" ||
      brandName.toLowerCase().includes(searchTerm) ||
      brandDescription.toLowerCase().includes(searchTerm) ||
      brandIndustry.toLowerCase().includes(searchTerm);
  
    const matchesIndustry =
      selectedIndustry === "" ||
      (brandIndustry &&
        brandIndustry
          .split(",")
          .some((ind) => ind.trim() === selectedIndustry));
  
    const matchesCountry =
      selectedCountry === "" ||
      (brand.countryData && brand.countryData.name === selectedCountry);
  
    const matchesTab = activeTab === "all";
  
    return matchesSearch && matchesIndustry && matchesCountry && matchesTab;
  });

  // Get unique industries and countries for filters
  const industries = Array.from(
    new Set(
      brands
        .flatMap((brand) =>
          (brand?.industry || "") // Fallback to empty string if null/undefined
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        )
        .filter(Boolean) // Additional safety check
    )
  ).filter(Boolean); // Final safety check

  const countries = Array.from(
    new Set(brands.map((brand) => brand.countryData?.name).filter(Boolean))
  );

  // Pagination logic
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedIndustry("");
    setSelectedCountry("");
    setActiveTab("all");
    setCurrentPage(1); // Also reset pagination
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
    <div
      className="brand-discovery-container"
      style={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      {/* Hero Section */}
      <div
        className="discovery-hero bg-gradient-to-r from-primary to-secondary"
        style={{
          color: "white",
          padding: "60px 24px",
          textAlign: "center",
          borderRadius: "0 0 12px 12px",
          marginBottom: "24px",
        }}
      >
        <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
          Discover Brands That Match Your Vibe
        </Title>
        <Paragraph
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Connect with premium brands looking for authentic voices like yours.
          <br />
          Filter by industry, location, and partnership opportunities.
        </Paragraph>
      </div>

      {/* Search and Filters */}
      <Card
        className="search-filters-card"
        bordered={false}
        style={{
          margin: "0 auto 24px",
          width: "calc(100% - 48px)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "24px",
        }}
      >
        <div
          className="search-container"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <Input
            placeholder="Search brands by name, description, or keywords..."
            prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ marginBottom: "16px" }}
          />

          <div className="filter-controls">
            <Space wrap>
              <Select
                placeholder="Industry"
                style={{ width: 180 }}
                value={selectedIndustry}
                onChange={setSelectedIndustry}
                allowClear
                suffixIcon={<FilterOutlined />}
              >
                {industries.map((industry) => (
                  <Option key={industry} value={industry}>
                    {industry}
                  </Option>
                ))}
              </Select>

              <Select
                placeholder="Country"
                style={{ width: 180 }}
                value={selectedCountry}
                onChange={setSelectedCountry}
                allowClear
              >
                {countries.map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>

              <Button
                type="text"
                onClick={clearFilters}
              >
                Clear all Filters
              </Button>
            </Space>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="results-container" style={{ padding: "0 24px" }}>
        {loading ? (
          <Row gutter={[24, 24]}>
            {[...Array(8)].map((_, i) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={i}>
                <Card style={{ height: "100%", borderRadius: "8px" }}>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : filteredBrands.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {paginatedBrands.map((brand) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={brand.id}>
                  <BrandCard
                    brand={brand}
                    isFavorite={favorites.includes(brand.id)}
                    onFavoriteToggle={toggleFavorite}
                    menu={menu}
                  />
                </Col>
              ))}
            </Row>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Pagination
                current={currentPage}
                total={filteredBrands.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <Card style={{ borderRadius: "12px", padding: "48px 0" }}>
            <Empty
              description={
                <span>
                  No brands found matching your criteria. Try adjusting your
                  filters.
                </span>
              }
            >
              <Button
                type="primary"
                className="bg-primary"
                onClick={clearFilters}
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

const BrandCard = ({ brand, isFavorite, onFavoriteToggle, menu }) => {
  return (
    <Card
      hoverable
      style={{
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      cover={
        <div
          style={{
            height: "120px",
            backgroundColor: "#f0f2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Avatar
            size={64}
            className="bg-gradient-to-r from-primary to-secondary"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#fff",
              border: "3px solid white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {brand?.name ? brand.name.charAt(0) : "?"}
          </Avatar>
        </div>
      }
      actions={[
        <Button className="bg-primary" type="primary" icon={<ArrowRightOutlined />}>
          Connect
        </Button>
      ]}
    >
      <div >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            {brand.name}
          </Title>
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <div style={{ marginBottom: "8px" }}>
          <Space>
            <GlobalOutlined />
            <Text ellipsis style={{ maxWidth: "180px" }}>
              {brand.website}
            </Text>
          </Space>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Space>
            <EnvironmentOutlined />
            <Text>
              {brand.city}
              {brand.state ? `, ${brand.state}` : ""}
              {brand.countryData ? `, ${brand.countryData.name}` : ""}
            </Text>
          </Space>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <Space>
            <PhoneOutlined />
            <Text>
              {brand.brandPhoneNumber?.code} {brand.brandPhoneNumber?.number}
            </Text>
          </Space>
        </div>

        {brand.preferences?.preferredInfluencerCountries && (
          <div style={{ marginTop: "12px" }}>
            <Text strong style={{ display: "block", marginBottom: "4px" }}>
              Target Countries:
            </Text>
            <Space size={[0, 8]} wrap>
              {brand.preferences.preferredInfluencerCountries.map(
                (country, index) => (
                  <span
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                        borderRadius: "2px",
                      }}
                    />
                    <Text>{country.name}</Text>
                  </span>
                )
              )}
            </Space>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BrandDiscovery;
