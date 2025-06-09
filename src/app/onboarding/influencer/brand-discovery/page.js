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
} from "@ant-design/icons";
import { getAllBrands } from "@/redux/features/influencer/filter";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { ReactCountryFlag } from "react-country-flag";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const BrandCard = ({ brand, isFavorite, onFavoriteToggle, menu }) => (
  <motion.div {...fadeIn} className="h-full">
    <Card
      hoverable
      className="brand-card transform transition-all duration-300 hover:shadow-xl h-full flex flex-col"
      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      actions={[
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <Button
            type="text"
            icon={isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
            onClick={() => onFavoriteToggle(brand.id)}
          />
        </Tooltip>,
        <Tooltip title="Contact brand">
          <Button type="text" icon={<PhoneOutlined />} />
        </Tooltip>,
        <Dropdown menu={menu} placement="bottomRight">
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ]}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start space-x-4">
          <Avatar
            size={64}
            src={brand.logo}
            className="flex-shrink-0"
          >
            {brand.name?.[0]?.toUpperCase()}
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between">
              <Title level={4} className="m-0 truncate">
                {brand.name}
              </Title>
              {brand.verified && (
                <Tooltip title="Verified Brand">
                  <Badge status="success" />
                </Tooltip>
              )}
            </div>
            
            <Space className="mt-2" wrap>
              {brand.industry?.split(',').map((industry, index) => (
                <Tag key={index} color="blue" className="rounded-full">
                  {industry.trim()}
                </Tag>
              ))}
            </Space>
          </div>
        </div>

        <Paragraph className="mt-4 text-gray-600 line-clamp-2 flex-grow">
          {brand.description}
        </Paragraph>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <TeamOutlined className="text-blue-500" />
            <Text className="text-sm">{brand.teamSize || 'Team size N/A'}</Text>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <DollarOutlined className="text-green-500" />
            <Text className="text-sm">{brand.budget || 'Budget N/A'}</Text>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <TrophyOutlined className="text-yellow-500" />
            <Text className="text-sm">{brand.campaignCount || '0'} Campaigns</Text>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <GlobalOutlined className="text-purple-500" />
            <Text className="text-sm">{brand.countryData?.name || 'Location N/A'}</Text>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const BrandDiscovery = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(undefined);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
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
      selectedIndustry === undefined ||
      (brandIndustry &&
        brandIndustry
          .split(",")
          .some((ind) => ind.trim() === selectedIndustry));
  
    const matchesCountry =
      selectedCountry === undefined ||
      (brand.countryData && brand.countryData.name === selectedCountry);
  
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "favorites" && favorites.includes(brand.id));
  
    return matchesSearch && matchesIndustry && matchesCountry && matchesTab;
  });

  // Get unique industries and countries for filters
  const industries = Array.from(
    new Set(
      brands
        .flatMap((brand) =>
          (brand?.industry || "")
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        )
        .filter(Boolean)
    )
  ).filter(Boolean);

  const countries = Array.from(
    new Set(brands.map((brand) => brand.countryData?.name).filter(Boolean))
  );

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
    setSelectedIndustry(undefined);
    setSelectedCountry(undefined);
    setActiveTab("all");
    setCurrentPage(1);
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
    <div className="min-h-screen bg-white p-4">
      {/* Hero Section */}
      

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
              placeholder="Search brands by name, industry, or keywords..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="mb-4"
            />
            
            <div className="flex flex-wrap gap-4 items-center">
              <Select
                size="large"
                placeholder="Select Industry"
                style={{ minWidth: 200 }}
                value={selectedIndustry}
                onChange={setSelectedIndustry}
                allowClear
              >
                {industries.map((industry) => (
                  <Option key={industry} value={industry}>
                    {industry}
                  </Option>
                ))}
              </Select>

              <Select
                size="large"
                placeholder="Select Country"
                style={{ minWidth: 200 }}
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
                type="default"
                onClick={clearFilters}
                icon={<FilterOutlined />}
              >
                Clear Filters
              </Button>
            </div>
          </Space>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-8"
          items={[
            {
              key: "all",
              label: (
                <span>
                  <GlobalOutlined /> All Brands
                </span>
              ),
            },
            {
              key: "favorites",
              label: (
                <span>
                  <HeartOutlined /> Favorites ({favorites.length})
                </span>
              ),
            },
          ]}
        />

        {loading ? (
          <div className="text-center py-20">
            <Spin size="large" />
          </div>
        ) : paginatedBrands.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {paginatedBrands.map((brand) => (
                <Col xs={24} sm={24} md={12} lg={12} xl={12} key={brand.id}>
                  <BrandCard
                    brand={brand}
                    isFavorite={favorites.includes(brand.id)}
                    onFavoriteToggle={toggleFavorite}
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
  );
};

export default BrandDiscovery;
