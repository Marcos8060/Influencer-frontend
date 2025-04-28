// "use client";
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const InfluencersProfile = () => {
//   const [loading,setLoading] = useState(false);
//   const { discoveryProfile } = useSelector(( store ) => store.socials);

//   const fetchInfluencerProfile = async () => {
//     // const page = 'campaignCollaborator'
//     try {
//       setLoading(true);
//       await dispatch(
//         getInfluencerProfileByBrand(auth, influencerId, campaignId)
//       );
//     } catch (error) {
//       // Optional: handle error here
//     } finally {
//       setLoading(false);
//     }
//   };

//   return <div>Welcome to Influencers Profile Section</div>;
// };

// export default InfluencersProfile;

"use client";
import { useState } from "react";
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
  PictureOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function InfluencerProfile() {
  const [profile, setProfile] = useState({
    id: "f0ed2743-e79e-4ec9-b79e-c9c291082641",
    age: 32,
    gender: "Male",
    bio: "I am a tech influencer who is geeky about Machine Learning and Artificial Intelligence and exploration with Large Language Models",
    platformVerified: false,
    ethnicBackground: ["Asian"],
    ethnicDescription: null,
    addressLine1: "123 Cherry Blossom Street",
    addressLine2: "Apt 456",
    city: "Nairobi",
    country: "Kenya",
    zipCode: "94107",
    phoneNumber: "415-555-7890",
    website: null,
    brandsWorkedWith: null,
    isAvailableForCollaboration: false,
    isInstagramConnected: true,
    isTwitterAccountConnected: false,
    isFacebookAccountConnected: true,
    isTiktokConnected: true,
    languages: null,
    profileCompletionPercentage: "0.00",
    contentCategories: ["Technology", "Fitness", "Travel"],
    categories: null,
    overallRate: "5.0",
    totalRates: 0,
    platformIntroductionSource: "Instagram",
    agreedToTerms: true,
    finishedOnboarding: true,
    createdAt: "2025-04-04T13:48:27.129955Z",
    updatedAt: null,
    keywords: ["Tech Reviews", "Fitness Routines", "Travel Destinations"],
    userId: "40678282-c173-4788-89c9-14ea5596651e",
    influencerId: "f0ed2743-e79e-4ec9-b79e-c9c291082641",
    fullName: "Jarib Mardo",
    email: "mardocheejarib64@gmail.com",
    profilePicture:
      "http://res.cloudinary.com/dqjnaukdk/image/upload/v1744714739/40678282-c173-4788-89c9-14ea5596651e/profilePicture/z3eq9bxpseznawpkbpr3.jpg",
    instagramUsername: "je_suis_jarib",
    instagramBiography:
      "💻 Full-Stack Developer • Debugging My Life Since 2015 ☕ ⚡ Python | JavaScript | React | existential keyboard",
    instagramFollowersCount: 516,
    instagramFollowsCount: 777,
    instagramMediaCount: 27,
    instagramProfilePictureUrl:
      "https://scontent-sof1-2.cdninstagram.com/v/t51.2885-19/355866354_281061937657923_4052581550370811305_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=bf7eb4&_nc_ohc=2sL93gCHN20Q7kNvwFxO7rK&_nc_oc=AdkB2SfVAjsoIQHTH4M0HX-Xma2LDksE_Xy7GYcXkA_I9ddtoPziBrm1sbjHZr3Pnic&_nc_zt=24&_nc_ht=scontent-sof1-2.cdninstagram.com&edm=AP4hL3IEAAAA&oh=00_AfECcqQ8iKabfd40BvaX6WOgKpJd5mq5OLZgr4b3mX_dbA&oe=68100120",
    instagramMediaIds: [
      "18337519363120349",
      "17915062727093742",
      "18165062257024736",
      "18144191191028344",
      "17876671501554393",
    ],
    tiktokUsername: "ladwetshi",
    tiktokDisplayName: "Jarib Lad-Wetshi",
    tiktokBioDescription:
      "Hello 👋 \nI'm curious about everything worth being curious about✅",
    tiktokProfileDeepLink: "https://vm.tiktok.com/ZMB7RGwka/",
    tiktokIsVerified: false,
    tiktokFollowerCount: 35,
    tiktokFollowingCount: 206,
    tiktokLikesCount: 3,
    tiktokVideoCount: 1,
    tiktokAvatarUrl:
      "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/570a2ee013dc624cbde4a66f3c283c55~tplv-tiktokx-cropcenter:168:168.jpeg?dr=14577&refresh_token=8c5251aa&x-expires=1745733600&x-signature=roV%2Bs6doWEMUezXYwUuaCNGxxbk%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=8aecc5ac&idc=maliva",
    bucketList: [
      {
        bucketList_Id: "b398454e-0585-4151-9739-7e4391f6f2c8",
        bucketList_Name: "Test bucket",
      },
      {
        bucketList_Id: "f047179c-931c-484b-ad71-547423746af7",
        bucketList_Name: "Basil the Cat",
      },
    ],
  });

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Space style={{ marginBottom: 24 }}>
        <Link href={`/brand/influencer-discovery`}>
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Back to Influencers
          </Button>
        </Link>
      </Space>
      {/* Hero Section */}
      <Card
        className="relative overflow-hidden mb-6 border-none"
        bodyStyle={{ padding: 0 }}
      >
        <div className="h-80 w-full bg-gradient-to-r from-primary to-secondary relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6 z-10">
            <Badge
              count={
                profile.platformVerified ? (
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
                    src={profile.profilePicture}
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
                {profile.fullName}
              </h1>
              <Paragraph className="text-lg text-white/90 mb-6">
                {profile.bio}
              </Paragraph>
              <Space size="large">
                <Statistic
                  title="Followers"
                  value={formatNumber(profile.instagramFollowersCount)}
                  className="text-white"
                  valueStyle={{ color: "white", fontSize: "20px" }}
                />
                <Statistic
                  title="Following"
                  value={formatNumber(profile.instagramFollowsCount)}
                  className="text-white"
                  valueStyle={{ color: "white", fontSize: "20px" }}
                />
                <Statistic
                  title="Posts"
                  value={formatNumber(profile.instagramMediaCount)}
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
                    <div className="font-medium">{profile.age}</div>
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
                      {profile.city}, {profile.country}
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
                      {profile.languages?.join(", ") || "Not specified"}
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
                        {profile.contentCategories?.map((cat, i) => (
                          <Tag key={i} color="blue">
                            {cat}
                          </Tag>
                        ))}
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
                    profile.isInstagramConnected
                      ? "border-pink-500"
                      : "border-gray-300"
                  }`}
                  bodyStyle={{ padding: "12px" }}
                >
                  <Space>
                    <Avatar
                      icon={<InstagramOutlined />}
                      className={
                        profile.isInstagramConnected
                          ? "bg-pink-100 text-pink-600"
                          : "bg-gray-200 text-gray-400"
                      }
                    />
                    <div>
                      <Text strong>Instagram</Text>
                      <div>
                        {profile.isInstagramConnected ? (
                          <Text type="secondary">
                            @{profile.instagramUsername}
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
                    profile.isTiktokConnected
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  bodyStyle={{ padding: "12px" }}
                >
                  <Space>
                    <Avatar
                      icon={<FaTiktok />}
                      className={
                        profile.isTiktokConnected
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-400"
                      }
                    />
                    <div>
                      <Text strong>TikTok</Text>
                      <div>
                        {profile.isTiktokConnected ? (
                          <Text type="secondary">
                            @{profile.tiktokUsername}
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
                    profile.isFacebookAccountConnected
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  bodyStyle={{ padding: "12px" }}
                >
                  <Space>
                    <Avatar
                      icon={<FacebookOutlined />}
                      className={
                        profile.isFacebookAccountConnected
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-400"
                      }
                    />
                    <div>
                      <Text strong>Facebook</Text>
                      <div>
                        <Text type="secondary">
                          {profile.isFacebookAccountConnected
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
                    profile.isTwitterAccountConnected
                      ? "border-blue-400"
                      : "border-gray-300"
                  }`}
                  bodyStyle={{ padding: "12px" }}
                >
                  <Space>
                    <Avatar
                      icon={<TwitterOutlined />}
                      className={
                        profile.isTwitterAccountConnected
                          ? "bg-blue-100 text-blue-400"
                          : "bg-gray-200 text-gray-400"
                      }
                    />
                    <div>
                      <Text strong>Twitter</Text>
                      <div>
                        <Text type="secondary">
                          {profile.isTwitterAccountConnected
                            ? "Connected"
                            : "Not connected"}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Bucket List */}
          {profile.bucketList?.length > 0 && (
            <Card title="Bucket Lists" className="mb-4">
              <Space size={[8, 8]} wrap>
                {profile.bucketList.map((bucket) => (
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
            {profile.isInstagramConnected && (
              <TabPane
                tab={
                  <span>
                    <InstagramOutlined />
                    Instagram
                  </span>
                }
                key="instagram"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {profile.instagramMediaIds
                    ?.slice(0, 6)
                    .map((mediaId, index) => (
                      <Card
                        key={index}
                        bodyStyle={{ padding: 0, height: "120px" }}
                        className="flex items-center justify-center"
                      >
                        <PictureOutlined className="text-2xl text-gray-400" />
                      </Card>
                    ))}
                </div>
              </TabPane>
            )}
            {profile.isTiktokConnected && (
              <TabPane
                tab={
                  <span>
                    <FaTiktok />
                    TikTok
                  </span>
                }
                key="tiktok"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {Array.from({
                    length: Math.min(profile.tiktokVideoCount, 6),
                  }).map((_, index) => (
                    <Card
                      key={index}
                      bodyStyle={{ padding: 0, height: "120px" }}
                      className="flex items-center justify-center"
                    >
                      <VideoCameraOutlined className="text-2xl text-gray-400" />
                    </Card>
                  ))}
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
              <Col xs={12}>
                <Card bodyStyle={{ padding: "12px" }}>
                  <Statistic
                    title="Overall Rating"
                    value={profile.overallRate}
                    suffix="/ 5.0"
                    prefix={<StarOutlined className="text-yellow-500" />}
                  />
                </Card>
              </Col>
              <Col xs={12}>
                <Card bodyStyle={{ padding: "12px" }}>
                  <Statistic
                    title="TikTok Likes"
                    value={formatNumber(profile.tiktokLikesCount)}
                    prefix={<LikeOutlined className="text-green-500" />}
                  />
                </Card>
              </Col>
              <Col xs={12}>
                <Card bodyStyle={{ padding: "12px" }}>
                  <Statistic
                    title="TikTok Videos"
                    value={formatNumber(profile.tiktokVideoCount)}
                    prefix={<VideoCameraOutlined className="text-purple-500" />}
                  />
                </Card>
              </Col>
              <Col xs={12}>
                <Card bodyStyle={{ padding: "12px" }}>
                  <Statistic
                    title="TikTok Followers"
                    value={formatNumber(profile.tiktokFollowerCount)}
                    prefix={<TeamOutlined className="text-blue-500" />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Keywords */}
          {profile.keywords?.length > 0 && (
            <Card title="Content Keywords" className="mb-4">
              <Space size={[0, 8]} wrap>
                {profile.keywords.map((keyword, index) => (
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
                    profile.isAvailableForCollaboration ? "success" : "error"
                  }
                  text={
                    <Text strong>
                      {profile.isAvailableForCollaboration
                        ? "Available"
                        : "Not Available"}
                    </Text>
                  }
                />
              </Space>
              <Text type="secondary">
                {profile.isAvailableForCollaboration
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
                  content: profile.email,
                  link: `mailto:${profile.email}`,
                },
                {
                  icon: <PhoneOutlined />,
                  content: profile.phoneNumber,
                  link: `tel:${profile.phoneNumber}`,
                },
                ...(profile.website
                  ? [
                      {
                        icon: <LinkOutlined />,
                        content: profile.website,
                        link: profile.website,
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
    </div>
  );
}
