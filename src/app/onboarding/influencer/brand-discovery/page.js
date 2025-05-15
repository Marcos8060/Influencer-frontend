'use client'
import React, { useState, useEffect } from 'react';
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
  Tabs
} from 'antd';
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
  ArrowRightOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const BrandDiscovery = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const pageSize = 8;

  // Mock data - in a real app, this would come from an API
  const mockBrands = [
    {
      id: "1",
      name: "EcoFashion",
      website: "ecofashion.com",
      city: "Portland",
      state: "Oregon",
      country: "United States",
      description: "Sustainable fashion brand creating eco-friendly clothing with organic materials and ethical production practices.",
      businessType: "E-commerce",
      industry: ["Fashion", "Sustainability"],
      logoColor: "#52c41a",
      partnership: true,
      rating: 4.8,
      featured: true
    },
    {
      id: "2",
      name: "TechGadgets",
      website: "techgadgets.io",
      city: "San Francisco",
      state: "California",
      country: "United States",
      description: "Innovative tech accessories for the modern lifestyle. We create products that blend design and functionality.",
      businessType: "Manufacturer",
      industry: ["Technology", "Electronics"],
      logoColor: "#1890ff",
      partnership: false,
      rating: 4.5
    },
    {
      id: "3",
      name: "GreenEats",
      website: "greeneats.com",
      city: "Berlin",
      state: "",
      country: "Germany",
      description: "Plant-based meal kits delivered to your door. Chef-designed recipes with locally sourced ingredients.",
      businessType: "Subscription",
      industry: ["Food & Beverage", "Health"],
      logoColor: "#722ed1",
      partnership: true,
      rating: 4.9,
      featured: true
    },
    {
      id: "4",
      name: "Adventure Gear",
      website: "adventuregear.co",
      city: "Vancouver",
      state: "British Columbia",
      country: "Canada",
      description: "High-quality outdoor equipment for your next adventure. Designed by explorers, for explorers.",
      businessType: "Retail",
      industry: ["Outdoor", "Sports"],
      logoColor: "#fa8c16",
      partnership: false,
      rating: 4.7
    },
    {
      id: "5",
      name: "BeautyBloom",
      website: "beautybloom.com",
      city: "Paris",
      state: "",
      country: "France",
      description: "Cruelty-free cosmetics with natural ingredients. Luxury beauty that's kind to your skin and the planet.",
      businessType: "E-commerce",
      industry: ["Beauty", "Skincare"],
      logoColor: "#eb2f96",
      partnership: true,
      rating: 4.6
    },
    {
      id: "6",
      name: "HomeHaven",
      website: "homehaven.design",
      city: "Copenhagen",
      state: "",
      country: "Denmark",
      description: "Scandinavian-inspired home decor and furniture. Minimalist design with maximum functionality.",
      businessType: "Retail",
      industry: ["Home Decor", "Interior Design"],
      logoColor: "#13c2c2",
      partnership: false,
      rating: 4.4
    },
    {
      id: "7",
      name: "FitFuel",
      website: "fitfuel.com",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      description: "Performance nutrition for athletes and fitness enthusiasts. Science-backed formulas for optimal results.",
      businessType: "E-commerce",
      industry: ["Health", "Fitness"],
      logoColor: "#f5222d",
      partnership: true,
      rating: 4.9,
      featured: true
    },
    {
      id: "8",
      name: "PetPals",
      website: "petpals.co",
      city: "Austin",
      state: "Texas",
      country: "United States",
      description: "Premium pet products for your furry friends. Because they deserve the best.",
      businessType: "E-commerce",
      industry: ["Pets", "Animals"],
      logoColor: "#faad14",
      partnership: false,
      rating: 4.3
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter brands based on search criteria
  const filteredBrands = mockBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchText.toLowerCase()) || 
                         brand.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesIndustry = !selectedIndustry || brand.industry.includes(selectedIndustry);
    const matchesCountry = !selectedCountry || brand.country === selectedCountry;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'featured' && brand.featured) || 
                      (activeTab === 'partnership' && brand.partnership) ||
                      (activeTab === 'favorites' && favorites.includes(brand.id));
    
    return matchesSearch && matchesIndustry && matchesCountry && matchesTab;
  });

  // Get unique industries and countries for filters
  const industries = Array.from(new Set(mockBrands.flatMap(brand => brand.industry)));
  const countries = Array.from(new Set(mockBrands.map(brand => brand.country)));

  // Pagination logic
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<ShareAltOutlined />}>Share</Menu.Item>
      <Menu.Item key="2" icon={<StarFilled />}>Add to list</Menu.Item>
      <Menu.Item key="3">Report</Menu.Item>
    </Menu>
  );

  return (
    <div className="brand-discovery-container">
      {/* Hero Section */}
      <div className="discovery-hero bg-gradient-to-r from-primary to-secondary">
        <Title level={1} className="hero-title">Discover Brands That Match Your Vibe</Title>
        <Paragraph className="hero-subtitle">
          Connect with premium brands looking for authentic voices like yours. 
          <br />Filter by industry, location, and partnership opportunities.
        </Paragraph>
      </div>

      {/* Search and Filters */}
      <Card className="search-filters-card" bordered={false}>
        <div className="search-container">
          <Input
            placeholder="Search brands by name, description, or keywords..."
            prefix={<SearchOutlined style={{ color: '#8c8c8c' }} />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="search-input"
          />
          
          <div className="filter-controls">
            <Space wrap>
              <Select
                placeholder="Industry"
                style={{ width: 180 }}
                onChange={setSelectedIndustry}
                allowClear
                className="filter-select"
                suffixIcon={<FilterOutlined />}
              >
                {industries.map(industry => (
                  <Option key={industry} value={industry}>{industry}</Option>
                ))}
              </Select>
              
              <Select
                placeholder="Country"
                style={{ width: 180 }}
                onChange={setSelectedCountry}
                allowClear
                className="filter-select"
              >
                {countries.map(country => (
                  <Option key={country} value={country}>{country}</Option>
                ))}
              </Select>
              
              <Button 
                type="text" 
                onClick={() => {
                  setSearchText('');
                  setSelectedIndustry(undefined);
                  setSelectedCountry(undefined);
                }}
                className="clear-filters-btn"
              >
                Clear all
              </Button>
            </Space>
          </div>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="discovery-tabs"
        >
          <TabPane tab="All Brands" key="all" />
          <TabPane tab="Featured" key="featured" />
          <TabPane tab="Partnerships" key="partnership" />
          <TabPane tab="Favorites" key="favorites" />
        </Tabs>
      </Card>
      
      {/* Results */}
      <div className="results-container">
        {loading ? (
          <Row gutter={[24, 24]}>
            {[...Array(8)].map((_, i) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={i}>
                <Card className="brand-card">
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : filteredBrands.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {paginatedBrands.map(brand => (
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
            
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                total={filteredBrands.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                className="brand-pagination"
              />
            </div>
          </>
        ) : (
          <Card className="empty-state-card">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="empty-description">
                  No brands found matching your criteria. Try adjusting your filters.
                </span>
              }
            >
              <Button 
                type="primary" 
                onClick={() => {
                  setSearchText('');
                  setSelectedIndustry(undefined);
                  setSelectedCountry(undefined);
                  setActiveTab('all');
                }}
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

// Brand Card Component
const BrandCard = ({ brand, isFavorite, onFavoriteToggle, menu }) => {
  return (
    <Badge.Ribbon 
      text="Featured" 
      color="gold"
      style={{ display: brand.featured ? 'block' : 'none' }}
    >
      <Card
        hoverable
        className="brand-card"
        cover={
          <div 
            className="brand-cover" 
            style={{ backgroundColor: brand.logicColor || '#f0f2f5' }}
          >
            <div className="brand-logo">
              <Avatar 
                size={64} 
                style={{ 
                  backgroundColor: brand.logoColor,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                {brand.name.charAt(0)}
              </Avatar>
            </div>
          </div>
        }
        actions={[
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <Button 
              type="text" 
              icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />} 
              onClick={() => onFavoriteToggle(brand.id)}
            />
          </Tooltip>,
          <Button 
            type="primary" 
            className="connect-btn bg-primary"
            icon={<ArrowRightOutlined />}
          >
            Connect
          </Button>,
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        ]}
      >
        {/* <div className="brand-rating">
          {brand.rating && (
            <span className="rating">
              <StarFilled style={{ color: '#faad14' }} /> {brand.rating}
            </span>
          )}
          {brand.partnership && (
            <Tag color="blue" className="partnership-tag">Partnership Available</Tag>
          )}
        </div> */}
        
        <Card.Meta
          title={<span className="brand-name">{brand.name}</span>}
          description={
            <>
              <Paragraph ellipsis={{ rows: 2 }} className="brand-description">
                {brand.description}
              </Paragraph>
              
              <div className="brand-industries">
                {brand.industry.map(ind => (
                  <Tag key={ind} className="industry-tag">{ind}</Tag>
                ))}
              </div>
              
              <Divider className="brand-divider" />
              
              <div className="brand-meta">
                <div className="meta-item">
                  <GlobalOutlined className="meta-icon" />
                  <Text ellipsis className="meta-text">
                    {brand.website}
                  </Text>
                </div>
                
                <div className="meta-item">
                  <EnvironmentOutlined className="meta-icon" />
                  <Text ellipsis className="meta-text">
                    {brand.city}{brand.state ? `, ${brand.state}` : ''}, {brand.country}
                  </Text>
                </div>
              </div>
            </>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
};

export default BrandDiscovery;