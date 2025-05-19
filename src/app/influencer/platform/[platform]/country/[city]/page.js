'use client'
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Avatar,
  Button,
  Input,
  Select,
  Tag,
  Divider,
  Space,
  Skeleton,
  Badge,
  Tooltip,
  List,
  Collapse
} from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  TwitterOutlined,
  StarOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  LinkOutlined,
  TeamOutlined,
  CheckOutlined,
  RocketOutlined,
  BulbOutlined,
  EnvironmentOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import Head from 'next/head';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const InfluencerPlatformCityCountry = ({ params }) => {
  const [platform, setPlatform] = useState('instagram');
  const [city, setCity] = useState('london');
  const [country, setCountry] = useState('uk');
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [followerRange, setFollowerRange] = useState([0, 1000000]);
  const currentYear = new Date().getFullYear();

  // Color scheme
  const primaryColor = '#3680A1';
  const secondaryColor = '#5373d4';
  const platformColor = {
    instagram: '#E1306C',
    youtube: '#FF0000',
    tiktok: '#000000',
    twitter: '#1DA1F2'
  }[platform] || primaryColor;

  // Format names
  const formattedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  const formattedCountry = country.toUpperCase();

  // Categories data
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'tech', name: 'Technology' },
    { id: 'food', name: 'Food' },
    { id: 'travel', name: 'Travel' },
  ];

  // Follower ranges
  const followerRanges = [
    { label: "Nano (1K-10K)", value: [1000, 10000] },
    { label: "Micro (10K-50K)", value: [10000, 50000] },
    { label: "Mid (50K-100K)", value: [50000, 100000] },
    { label: "Macro (100K-500K)", value: [100000, 500000] },
    { label: "Mega (500K+)", value: [500000, 10000000] },
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockInfluencers = [
          {
            id: 1,
            name: `${formattedCity} ${formattedPlatform} Star`,
            handle: `@${city}${platform}star`,
            followers: "124K",
            engagement: "8.2%",
            platform: platform,
            categories: ["fashion", "beauty"],
            verified: true,
            trending: true,
            avatar: "/images/avatar1.jpg",
            rate: "$1,200/post",
            location: `${formattedCity}, ${formattedCountry}`
          },
          {
            id: 2,
            name: `${formattedPlatform} ${formattedCity} Explorer`,
            handle: `@${platform}${city}explorer`,
            followers: "89K",
            engagement: "12.1%",
            platform: platform,
            categories: ["travel", "food"],
            verified: false,
            trending: true,
            avatar: "/images/avatar2.jpg",
            rate: "$2,500/video",
            location: `${formattedCity}, ${formattedCountry}`
          },
          // Add more mock data as needed
        ];

        setInfluencers(mockInfluencers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [platform, city, country]);

  const getPlatformIcon = () => {
    switch (platform) {
      case "instagram": return <InstagramOutlined />;
      case "youtube": return <YoutubeOutlined />;
      case "tiktok": return <TikTokOutlined />;
      case "twitter": return <TwitterOutlined />;
      default: return null;
    }
  };

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         influencer.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || influencer.categories.includes(activeCategory);
    
    // Convert follower string to number
    const followerCount = parseFloat(influencer.followers.replace('K', '')) * 1000;
    const matchesFollowers = followerCount >= followerRange[0] && followerCount <= followerRange[1];

    return matchesSearch && matchesCategory && matchesFollowers;
  });

  return (
    <>
      <Head>
        <title>{influencers.length} Best {formattedPlatform} Influencers in {formattedCity}, {formattedCountry} in {currentYear}</title>
        <meta 
          name="description" 
          content={`Work with ${influencers.length} top ${formattedPlatform} influencers in ${formattedCity}, ${formattedCountry}. Use Grace Belgravia to run campaigns and get high-quality content that boosts your brand.`} 
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full mb-4"
            style={{ 
              background: `${platformColor}20`, 
              border: `1px solid ${platformColor}30` 
            }}
          >
            {getPlatformIcon()}
            <EnvironmentOutlined className="ml-2" style={{ color: platformColor }} />
            <GlobalOutlined className="ml-1" style={{ color: platformColor }} />
            <Text style={{ color: platformColor }} className="font-medium ml-2">
              {formattedPlatform} • {formattedCity} • {formattedCountry}
            </Text>
          </div>
          
          <Title level={1} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Find <span style={{ color: platformColor }}>{formattedPlatform}</span> Creators in{' '}
            <span style={{ color: primaryColor }}>{formattedCity}</span>,{' '}
            <span style={{ color: secondaryColor }}>{formattedCountry}</span> Who Know How to Deliver
          </Title>
          
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            Looking to reach your audience on {formattedPlatform} in {formattedCity}, {formattedCountry}? Grace Belgravia is your one-stop shop to find influencers who live and breathe content – and know how to get real results. Whether it's fashion, beauty, wellness, tech or something niche, we've got creators ready to collaborate on campaigns that fit your brand.
          </Paragraph>
          
          <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
            You can create gifted, paid or affiliate campaigns and use our filters to find creators based on their follower count, content style, engagement levels and more. Run everything from your laptop or our mobile app, and start turning scrolls into sales with UGC that actually performs.
          </Paragraph>
        </div>

        {/* Filters Section */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              size="large"
              placeholder={`Search ${formattedPlatform} influencers in ${formattedCity}...`}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
            <Select
              size="large"
              defaultValue="all"
              className="w-full md:w-64"
              onChange={setActiveCategory}
              suffixIcon={<FilterOutlined />}
            >
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Select
              size="large"
              defaultValue={[0, 1000000]}
              className="w-full md:w-64"
              onChange={setFollowerRange}
              options={followerRanges}
              suffixIcon={<TeamOutlined />}
            />
          </div>
        </div>

        {/* Influencers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-gray-200">
                <Skeleton active avatar paragraph={{ rows: 4 }} />
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInfluencers.map(influencer => (
                <Card
                  key={influencer.id}
                  hoverable
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col"
                  cover={
                    <div className="h-48 relative" style={{ background: `${platformColor}10` }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Badge 
                          count={influencer.trending ? "TRENDING" : null} 
                          color="orange" 
                          offset={[-20, 10]}
                          style={{ fontWeight: 600 }}
                        >
                          <Avatar
                            size={100}
                            src={influencer.avatar}
                            className="border-4 border-white shadow-lg"
                          />
                        </Badge>
                      </div>
                    </div>
                  }
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <Title level={4} className="!mb-0 !mr-2">
                        {influencer.name}
                      </Title>
                      {influencer.verified && (
                        <Tooltip title="Verified Influencer">
                          <StarOutlined style={{ color: platformColor }} />
                        </Tooltip>
                      )}
                    </div>
                    
                    <Text type="secondary" className="block mb-3">
                      {influencer.handle} • {influencer.followers} followers
                    </Text>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Tag 
                        icon={getPlatformIcon()} 
                        color={platformColor}
                        className="!m-0"
                      >
                        {formattedPlatform}
                      </Tag>
                      <Tag color="geekblue">{influencer.engagement} engagement</Tag>
                      <Tag color="blue">{influencer.location}</Tag>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {influencer.categories.map((category, i) => (
                        <Tag key={i} color="blue">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Tag>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <Text strong>Rate:</Text> {influencer.rate}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      type="primary" 
                      block
                      style={{ background: platformColor, borderColor: platformColor }}
                      icon={<LinkOutlined />}
                    >
                      View Profile
                    </Button>
                    <Button 
                      block
                      icon={<MailOutlined />}
                      style={{ color: platformColor, borderColor: platformColor }}
                    >
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredInfluencers.length === 0 && (
              <div className="text-center py-16">
                <Title level={4} className="mb-4">
                  No {formattedPlatform} influencers found in {formattedCity} matching your criteria
                </Title>
                <Button 
                  type="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                    setFollowerRange([0, 1000000]);
                  }}
                  style={{ background: platformColor, borderColor: platformColor }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Bottom Content Section */}
        <Divider className="my-16" />
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <Title level={2} className="flex items-center mb-6">
              <RocketOutlined className="mr-3" style={{ color: platformColor }} />
              How It Works
            </Title>
            
            <List
              itemLayout="horizontal"
              dataSource={[
                `Filter ${formattedPlatform} influencers in ${formattedCity}, ${formattedCountry} by audience type, content quality and follower data`,
                "Organise influencers into buckets to streamline campaign invites",
                "Set up a campaign in minutes - include your brief, goals and offer type",
                "Invite influencers directly or accept applications",
                "Approve who you want to work with and monitor progress",
                `Track results pulled directly from ${formattedPlatform}`
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckOutlined style={{ color: primaryColor }} />}
                    description={item}
                  />
                </List.Item>
              )}
            />
          </div>
          
          <div>
            <Title level={2} className="flex items-center mb-6">
              <BulbOutlined className="mr-3" style={{ color: secondaryColor }} />
              Why Choose Grace Belgravia
            </Title>
            
            <List
              itemLayout="horizontal"
              dataSource={[
                `Work with talented ${formattedPlatform} creators based in ${formattedCity}, ${formattedCountry}`,
                "Flexible campaigns for any brand size or budget",
                "Capture and reuse high-quality UGC across your marketing channels",
                "Built-in contracts ensure full content rights",
                "Influencers can discover and apply to your campaigns",
                `Be the first to know when new creators join in ${formattedCity}`,
                "Stay in control on desktop or mobile with our iOS and Android apps"
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckOutlined style={{ color: secondaryColor }} />}
                    description={item}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl p-8 md:p-12 text-center text-white" 
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}>
          <Title level={2} className="!text-white !mb-4">
            Ready to Launch Your {formattedPlatform} Campaign in {formattedCity}?
          </Title>
          <Text className="text-blue-100 block mb-8 max-w-2xl mx-auto">
            Our team will help you find the perfect influencers and create a campaign that delivers real results.
          </Text>
          <Space>
            <Button 
              type="primary" 
              size="large" 
              className="!bg-white !font-semibold"
              style={{ color: primaryColor }}
            >
              Get Started
            </Button>
            <Button 
              size="large" 
              className="!bg-transparent !border-white !text-white hover:!bg-white hover:!bg-opacity-10"
            >
              Speak to an Expert
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default InfluencerPlatformCityCountry;