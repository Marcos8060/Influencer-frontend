"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Row,
  Col,
  Tag,
  Divider,
  Statistic,
  List,
  Button,
  Tabs,
  Badge,
  Space,
  Typography,
  Skeleton,
} from "antd";
import {
  CheckOutlined,
  UserOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  TagOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  StarOutlined,
  LikeOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkOutlined,
  BookOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getInfluencerDiscoveryProfile } from "@/redux/features/socials";
import { usePathname } from "next/navigation";
import { useAuth } from "@/assets/hooks/use-auth";
import InstagramMetricsFilter from "@/app/Components/InstagramMetrics";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function InfluencerProfile() {
  const [loading, setLoading] = useState(false);
  const { discoveryProfile } = useSelector((store) => store.socials);
  console.log("PROFILE ", discoveryProfile);
  const dispatch = useDispatch();
  const auth = useAuth();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const influencerId = segments[segments.length - 1];

  const fetchInfluencerProfile = async () => {
    const page = "campaignCollaborator";
    try {
      setLoading(true);
      await dispatch(getInfluencerDiscoveryProfile(auth, influencerId));
    } catch (error) {
      // Optional: handle error here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencerProfile();
  }, []);

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Space style={{ marginBottom: 24 }}>
        <Link href={`/onboarding/brand/dashboard/search-influencers`}>
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Back to Influencers
          </Button>
        </Link>
      </Space>
      {/* Hero Section */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 15 }} />
      ) : (
        <>
          <Card
            className="relative overflow-hidden mb-6 border-none"
            bodyStyle={{ padding: 0 }}
          >
            <div className="h-56 w-full bg-gradient-to-r from-primary to-secondary relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6 z-10">
                <Badge
                  count={
                    discoveryProfile.platformVerified ? (
                      <CheckOutlined className="text-white" />
                    ) : (
                      0
                    )
                  }
                  offset={[-20, 80]}
                  className="avatar-badge"
                >
                  <Avatar
                    src={
                      <Image
                        src={
                          discoveryProfile?.profilePicture ||
                          discoveryProfile.instagramProfilePictureUrl
                        }
                        alt="Profile"
                        width={150}
                        height={150}
                      />
                    }
                    size={150}
                    className="border-4 border-white shadow-lg"
                  />
                </Badge>
                <div className="text-white">
                  <h1 className="text-white text-3xl font-semibold mb-2">
                    {discoveryProfile.fullName}
                  </h1>
                  <Paragraph className="text-md text-xs text-white/90 mb-6">
                    {discoveryProfile.bio?.slice(0, 300)}
                    {discoveryProfile.bio?.length > 300 && "..."}
                  </Paragraph>
                  <Space size="large">
                    <Statistic
                      title={
                        <span className="custom-statistic-title">
                          Followers
                        </span>
                      }
                      value={formatNumber(
                        discoveryProfile.instagram?.followersCount
                      )}
                      className="text-white"
                      valueStyle={{ color: "white", fontSize: "20px" }}
                      titleStyle={{ color: "#FFFFFF" }}
                    />
                    <Statistic
                      title={
                        <span className="custom-statistic-title">
                          Following
                        </span>
                      }
                      value={formatNumber(
                        discoveryProfile.instagram?.followsCount
                      )}
                      className="text-white"
                      valueStyle={{ color: "white", fontSize: "20px" }}
                    />
                    <Statistic
                      title={
                        <span className="custom-statistic-title">Posts</span>
                      }
                      value={formatNumber(
                        discoveryProfile.instagram?.mediaCount
                      )}
                      className="text-white"
                      valueStyle={{ color: "white", fontSize: "20px" }}
                    />
                  </Space>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <Row gutter={[16, 16]}>
            {/* Left Column */}
            <Col xs={24} lg={16}>
              {/* About Section */}
              <Card title="About" className="mb-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Space>
                      <Avatar
                        icon={<UserOutlined />}
                        className="bg-gray-100 text-gray-600"
                      />
                      <div>
                        <Text type="secondary">Age</Text>
                        <div className="font-medium">
                          {discoveryProfile.age}
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      <Avatar
                        icon={<EnvironmentOutlined />}
                        className="bg-gray-100 text-gray-600"
                      />
                      <div>
                        <Text type="secondary">Location</Text>
                        <div className="font-medium">
                          {discoveryProfile.city}, {discoveryProfile.country}
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      <Avatar
                        icon={<GlobalOutlined />}
                        className="bg-gray-100 text-gray-600"
                      />
                      <div>
                        <Text type="secondary">Languages</Text>
                        <div className="font-medium">
                          {discoveryProfile.languages?.join(", ") ||
                            "Not specified"}
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      <Avatar
                        icon={<TagOutlined />}
                        className="bg-gray-100 text-gray-600"
                      />
                      <div>
                        <Text type="secondary">Categories</Text>
                        <div className="font-medium">
                          <Space size={[0, 8]} wrap>
                            {discoveryProfile.contentCategories?.map(
                              (cat, i) => (
                                <Tag key={i} color="blue">
                                  {cat}
                                </Tag>
                              )
                            )}
                          </Space>
                        </div>
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Card>

              {/* Social Connections */}
              <Card title="Social Connections" className="mb-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Card
                      className={`border-l-4 ${
                        discoveryProfile.isInstagramConnected
                          ? "border-pink-500"
                          : "border-gray-300"
                      }`}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <Space>
                        <Avatar
                          icon={<InstagramOutlined />}
                          className={
                            discoveryProfile.isInstagramConnected
                              ? "bg-pink-100 text-pink-600"
                              : "bg-gray-200 text-gray-400"
                          }
                        />
                        <div>
                          <Text strong>Instagram</Text>
                          <div>
                            {discoveryProfile.isInstagramConnected ? (
                              <Text type="secondary">
                                @{discoveryProfile.instagramUsername}
                              </Text>
                            ) : (
                              <Text type="secondary">Not connected</Text>
                            )}
                          </div>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Card
                      className={`border-l-4 ${
                        discoveryProfile.isTiktokConnected
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <Space>
                        <Avatar
                          icon={<FaTiktok />}
                          className={
                            discoveryProfile.isTiktokConnected
                              ? "bg-black flex items-center justify-center text-white"
                              : "bg-gray-200 flex items-center justify-center text-gray-400"
                          }
                        />
                        <div>
                          <Text strong>TikTok</Text>
                          <div>
                            {discoveryProfile.isTiktokConnected ? (
                              <Text type="secondary">
                                @{discoveryProfile.tiktokUsername}
                              </Text>
                            ) : (
                              <Text type="secondary">Not connected</Text>
                            )}
                          </div>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  {/* <Col xs={24} sm={12}>
                    <Card
                      className={`border-l-4 ${
                        discoveryProfile.isFacebookAccountConnected
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <Space>
                        <Avatar
                          icon={<FacebookOutlined />}
                          className={
                            discoveryProfile.isFacebookAccountConnected
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-200 text-gray-400"
                          }
                        />
                        <div>
                          <Text strong>Facebook</Text>
                          <div>
                            <Text type="secondary">
                              {discoveryProfile.isFacebookAccountConnected
                                ? "Connected"
                                : "Not connected"}
                            </Text>
                          </div>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Card
                      className={`border-l-4 ${
                        discoveryProfile.isTwitterAccountConnected
                          ? "border-blue-400"
                          : "border-gray-300"
                      }`}
                      bodyStyle={{ padding: "12px" }}
                    >
                      <Space>
                        <Avatar
                          icon={<FaXTwitter />}
                          className={
                            discoveryProfile.isTwitterAccountConnected
                              ? "bg-primary flex items-center justify-center text-blue-400"
                              : "bg-gray-200 flex items-center justify-center text-gray-400"
                          }
                        />
                        <div>
                          <Text strong>X</Text>
                          <div>
                            <Text type="secondary">
                              {discoveryProfile.isTwitterAccountConnected
                                ? "Connected"
                                : "Not connected"}
                            </Text>
                          </div>
                        </div>
                      </Space>
                    </Card>
                  </Col> */}
                </Row>
              </Card>

              {/* Bucket List */}
              {discoveryProfile.bucketList?.length > 0 && (
                <Card title="Bucket Lists" className="mb-4">
                  <Space size={[8, 8]} wrap>
                    {discoveryProfile.bucketList.map((bucket) => (
                      <Tag
                        key={bucket.bucketList_Id}
                        icon={<BookOutlined />}
                        color="purple"
                      >
                        {bucket.bucketList_Name}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              )}

              {/* Social Feeds */}
              <Tabs defaultActiveKey="instagram" className="mb-4">
                <TabPane
                  tab={
                    <span>
                      <InstagramOutlined />
                      Instagram Metrics
                    </span>
                  }
                  key="instagram"
                >
                  <div>
                    <InstagramMetricsFilter {...{ discoveryProfile }} />
                  </div>
                </TabPane>
                {discoveryProfile.isTiktokConnected && (
                  <TabPane
                    tab={
                      <span>
                        <FaTiktok />
                        TikTok Metrics
                      </span>
                    }
                    key="tiktok"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      Tiktok Metrics
                    </div>
                  </TabPane>
                )}
              </Tabs>
            </Col>

            {/* Right Column */}
            <Col xs={24} lg={8}>
              {/* Engagement Stats */}
              <Card title="Engagement Stats" className="mb-4">
                <Row gutter={[16, 16]}>
                  {/* <Col xs={12}>
                    <Card bodyStyle={{ padding: "12px" }}>
                      <Statistic
                        title="Overall Rating"
                        value={discoveryProfile.overallRate}
                        suffix="/ 5.0"
                        prefix={<StarOutlined className="text-yellow-500" />}
                      />
                    </Card>
                  </Col> */}
                  <Col xs={24}>
                    <Card bodyStyle={{ padding: "12px" }}>
                      <div className="flex items-center justify-between w-full">
                        <Statistic
                          title="TikTok Followers"
                          value={formatNumber(
                            discoveryProfile.tiktok?.followerCount
                          )}
                          prefix={<LikeOutlined className="text-green-500" />}
                        />
                        <Statistic
                          title="Instagram Followers"
                          value={formatNumber(
                            discoveryProfile.instagram?.followersCount
                          )}
                          prefix={<LikeOutlined className="text-pink-500" />}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24}>
                    <Card bodyStyle={{ padding: "12px" }}>
                      <div className="flex items-center justify-between w-full">
                        <Statistic
                          title="TikTok Videos"
                          value={formatNumber(
                            discoveryProfile.tiktok?.videoCount
                          )}
                          prefix={
                            <VideoCameraOutlined className="text-purple-500" />
                          }
                        />
                        <Statistic
                          title="Instagram Videos"
                          value={formatNumber(
                            discoveryProfile.instagram?.mediaCount
                          )}
                          prefix={
                            <VideoCameraOutlined className="text-purple-500" />
                          }
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>

              {/* Keywords */}
              {discoveryProfile.keywords?.length > 0 && (
                <Card title="Content Keywords" className="mb-4">
                  <Space size={[0, 8]} wrap>
                    {discoveryProfile.keywords.map((keyword, index) => (
                      <Tag key={index} color="geekblue">
                        {keyword}
                      </Tag>
                    ))}
                  </Space>
                </Card>
              )}

              {/* Collaboration Status */}
              <Card title="Collaboration Status" className="mb-4">
                <Space direction="vertical">
                  <Space>
                    <Badge
                      status={
                        discoveryProfile.isAvailableForCollaboration
                          ? "success"
                          : "error"
                      }
                      text={
                        <Text strong>
                          {discoveryProfile.isAvailableForCollaboration
                            ? "Available"
                            : "Not Available"}
                        </Text>
                      }
                    />
                  </Space>
                  <Text type="secondary">
                    {discoveryProfile.isAvailableForCollaboration
                      ? "This influencer is open for collaborations"
                      : "This influencer is not currently available for collaborations"}
                  </Text>
                </Space>
              </Card>

              {/* Contact Information */}
              <Card title="Contact Information">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      icon: <MailOutlined />,
                      content: discoveryProfile.email,
                      link: `mailto:${discoveryProfile.email}`,
                    },
                    {
                      icon: <PhoneOutlined />,
                      content: discoveryProfile.phoneNumber,
                      link: `tel:${discoveryProfile.phoneNumber}`,
                    },
                    ...(discoveryProfile.website
                      ? [
                          {
                            icon: <LinkOutlined />,
                            content: discoveryProfile.website,
                            link: discoveryProfile.website,
                          },
                        ]
                      : []),
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.icon}
                        title={
                          item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.content}
                            </a>
                          ) : (
                            item.content
                          )
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
