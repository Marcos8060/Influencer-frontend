'use client'
import { useRouter } from 'next/router';
import { Row, Col, Card, Typography, List, Button, Space, Divider } from 'antd';
import { SearchOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';
import Head from 'next/head';

const { Title, Paragraph, Text } = Typography;

const DynamicInfluencerPage = () => {
  const router = useRouter();
  const { type, location } = router.query;
  
  // Dynamic data based on route
  const pageData = {
    city: {
      title: `Best Influencers in ${location}`,
      metaTitle: `[Number] Best Influencers in ${location} in ${new Date().getFullYear()}`,
      metaDescription: `Discover [Number] of the best influencers in ${location} to work with this year. Use Grace Belgravia to launch influencer campaigns, get high-quality UGC and grow your brand with ease.`
    },
    country: {
      title: `Top Influencers in ${location}`,
      metaTitle: `Best ${location} Influencers in ${new Date().getFullYear()}`,
      metaDescription: `Find the top influencers across ${location} for your marketing campaigns. Authentic creators ready to collaborate.`
    },
    platform: {
      title: `${location} Influencer Specialists`,
      metaTitle: `Professional ${location} Influencers | Grace Belgravia`,
      metaDescription: `Work with dedicated ${location} influencers who know how to create high-performing content.`
    }
  };

  const currentData = pageData[type] || pageData.city;

  return (
    <>
      <Head>
        <title>{currentData.metaTitle}</title>
        <meta name="description" content={currentData.metaDescription} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <Title level={1} className="text-4xl font-bold mb-4">
                Meet the Best Influencers in {location} for Your Brand
              </Title>
              <Paragraph className="text-lg text-gray-700">
                Want to get your brand buzzing in {location}? We've got you covered. Grace Belgravia helps you connect with talented local influencers who know how to create content that grabs attention and gets results.
              </Paragraph>
              <Paragraph>
                Whether you're after beautiful UGC for your social channels or want to build awareness in a specific area, our platform makes it easy and fun.
              </Paragraph>
              <Space size="large" className="mt-6">
                <Button type="primary" size="large">Browse Influencers</Button>
                <Button size="large">How It Works</Button>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <img 
                src={`/images/${type}-hero.jpg`} 
                alt={`Influencers in ${location}`}
                className="rounded-lg shadow-xl"
              />
            </Col>
          </Row>
        </section>

        {/* Influencer Grid */}
        <section className="mb-16">
          <Title level={2} className="text-3xl font-bold mb-8 text-center">
            Top Influencers in {location}
          </Title>
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="influencer"
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
                    />
                  }
                >
                  <Card.Meta
                    title={`Influencer ${item}`}
                    description={`${Math.floor(Math.random() * 100) + 10}K followers`}
                  />
                  <div className="mt-4">
                    <Button block>View Profile</Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <Title level={2} className="text-3xl font-bold mb-6 text-center">
            <RocketOutlined className="mr-2" /> How It Works
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  `Search influencers by location (like ${location}), follower count, platform, audience engagement and more`,
                  'Group your favourite creators into buckets for quick comparisons and invites',
                  'Launch campaigns in minutes - gifted, paid or affiliate collaborations',
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<SearchOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                      description={<Text>{item}</Text>}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  'Invite influencers or let them apply directly to your campaigns',
                  'Approve the creators you want to work with and track content delivery',
                  'See real-time performance reports powered by direct platform data',
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<TeamOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                      description={<Text>{item}</Text>}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <div className="text-center mt-8">
            <Button type="primary" size="large">Start Your Campaign</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default DynamicInfluencerPage;