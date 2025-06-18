"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  ShoppingOutlined,
  TeamOutlined,
  HistoryOutlined,
  EyeOutlined,
  FilePdfOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Card,
  Statistic,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Avatar,
  Space,
  Divider,
  Typography,
  Skeleton,
  Empty,
  Image,
  List,
  Descriptions,
  Badge,
} from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import { getAllCampaignDetails, getAllCampaignReport } from "@/redux/features/stepper/campaign-stepper";
import toast from "react-hot-toast";

const { Title, Text, Paragraph } = Typography;

const CampaignDetails = () => {
  const { campaignDetails } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  const getCampaignDetails = async () => {
    try {
      setLoading(true);
      await dispatch(getAllCampaignDetails(auth, id));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      getCampaignDetails();
    }
  }, [auth]);

  const stats = [
    {
      title: "No. of Applicants",
      value: campaignDetails.collaborators?.length || 0,
      icon: <TeamOutlined className="text-blue-500" />,
      suffix: "Pending Approval",
    },
    {
      title: "Influencer Posts",
      value: 18,
      icon: <HistoryOutlined className="text-green-500" />,
      suffix: "Total Offers",
    },
    {
      title: "Total Reach",
      value: "1.2M",
      icon: <ShoppingOutlined className="text-purple-500" />,
      suffix: "Total Reach",
    },
    {
      title: "Engagement Rate",
      value: "12%",
      icon: <TeamOutlined className="text-orange-500" />,
      suffix: "Avg Engagement",
    },
  ];

  const columns = [
    {
      title: "Influencer",
      dataIndex: "influencerName",
      key: "influencerName",
      render: (text, record) => (
        <Space>
          <Avatar src={record.profilePhoto} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary">
              @{text.toLowerCase().replace(/\s+/g, "")}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Country",
      dataIndex: "influencerCountry",
      key: "country",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const statusMap = {
          approved: { color: "green", text: "Approved" },
          rejected: { color: "red", text: "Rejected" },
          pending: { color: "gold", text: "Pending" },
        };
        return (
          <Tag color={statusMap[status]?.color || "default"}>
            {statusMap[status]?.text || status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() =>
            router.push(
              `/brand/campaign-report/${id}/influencer-profile/${record.influencerId}`
            )
          }
          className="text-primary"
        >
          View Profile
        </Button>
      ),
    },
  ];

  const exportMenu = [
    {
      key: "1",
      label: "Download PDF Report",
      icon: <FilePdfOutlined />,
    },
    {
      key: "2",
      label: "Export as CSV",
      icon: <FilePdfOutlined />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with back button and report button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Link href="/brand/view-campaigns">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="flex items-center hover:text-primary"
              >
                Back to Campaigns
              </Button>
            </Link>
            <Divider type="vertical" className="mx-4" />
            <Title level={4} className="m-0">
              Campaign Details
            </Title>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/brand/campaign-report/report?id=${id}`}
              className="bg-primary text-white rounded-lg text-sm px-6 py-2 hover:bg-primary-dark transition-colors duration-200 flex items-center gap-2"
            >
              <EyeOutlined />
              View Full Report
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.isArray(stats) &&
            stats.map((stat, index) => (
              <Card
                key={index}
                className="shadow-sm hover:shadow-md transition-all border-0"
                bodyStyle={{ padding: "20px" }}
              >
                <Statistic
                  title={
                    <span className="text-gray-600 font-medium">
                      {stat.title}
                    </span>
                  }
                  value={stat.value}
                  prefix={stat.icon}
                  valueStyle={{
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                  suffix={
                    <span className="text-gray-500 text-xs block mt-1">
                      {stat.suffix}
                    </span>
                  }
                />
              </Card>
            ))}
        </div>

        {loading ? (
          <Card>
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Campaign Overview */}
            <Card
              title={
                <span className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingOutlined className="text-primary" />
                  Campaign Overview
                </span>
              }
              className="shadow-sm border-0"
              bodyStyle={{ padding: "24px" }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Image
                    src={campaignDetails.coverImage}
                    alt={campaignDetails.title}
                    className="rounded-lg"
                    preview={false}
                  />
                </Col>
                <Col xs={24} md={16}>
                  <Space direction="vertical" className="w-full">
                    <div className="flex justify-between items-start">
                      <Title level={3} className="m-0">
                        {campaignDetails.title}
                      </Title>
                      <Badge status="success" text="Active" />
                    </div>
                    <Paragraph className="text-gray-600">
                      {campaignDetails.description}
                    </Paragraph>
                    <Descriptions column={2}>
                      <Descriptions.Item label="Start Date">
                        {new Date(
                          campaignDetails.startDate
                        ).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="End Date">
                        {new Date(campaignDetails.endDate).toLocaleDateString()}
                      </Descriptions.Item>
                    </Descriptions>
                    {campaignDetails.exampleVideoUrl && (
                      <Button
                        type="link"
                        href={campaignDetails.exampleVideoUrl}
                        target="_blank"
                        icon={<EyeOutlined />}
                        className="text-primary pl-0"
                      >
                        View Example Video
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Products Section */}
            <Card
              title={
                <span className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingOutlined className="text-primary" />
                  Featured Products
                </span>
              }
              className="shadow-sm border-0"
              bodyStyle={{ padding: "24px" }}
            >
              {campaignDetails.products?.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {Array.isArray(campaignDetails.products) &&
                    campaignDetails.products.map((product) => (
                      <Col xs={24} sm={12} md={8} key={product.id}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={product.name}
                              src={product.productImages[0]?.url}
                              className="h-48 object-cover"
                            />
                          }
                          className="h-full"
                        >
                          <Card.Meta
                            title={product.name}
                            description={
                              <Space direction="vertical">
                                <Paragraph
                                  ellipsis={{ rows: 2 }}
                                  className="m-0 text-gray-600"
                                >
                                  {product.description}
                                </Paragraph>
                                <Text strong className="text-lg">
                                  ${product.price}
                                </Text>
                              </Space>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                </Row>
              ) : (
                <Empty description="No products added to this campaign" />
              )}
            </Card>

            {/* Campaign Brief */}
            <Card
              title={
                <span className="text-lg font-semibold flex items-center gap-2">
                  <FilePdfOutlined className="text-primary" />
                  Campaign Brief
                </span>
              }
              className="shadow-sm border-0"
              bodyStyle={{ padding: "24px" }}
            >
              <Descriptions column={1} title={campaignDetails.briefTitle}>
                <Descriptions.Item>
                  {campaignDetails.briefDescription}
                </Descriptions.Item>
              </Descriptions>

              <Row gutter={[24, 24]} className="mt-6">
                <Col xs={24} md={12}>
                  <Card title="Content Requirements" className="shadow-none">
                    <List
                      size="small"
                      dataSource={campaignDetails.preferences?.videoStyle || []}
                      renderItem={(item) => (
                        <List.Item>
                          <CheckOutlined className="text-green-500 mr-2" />
                          {item}
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="Technical Specs" className="shadow-none">
                    <Descriptions column={1}>
                      <Descriptions.Item label="Format">
                        {campaignDetails.preferences?.videoFormat || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Duration">
                        {campaignDetails.preferences?.videoDuration || "N/A"}s
                      </Descriptions.Item>
                      <Descriptions.Item label="Deliverables">
                        {campaignDetails.preferences?.videosPerCreator || "N/A"}{" "}
                        videos
                      </Descriptions.Item>
                      <Descriptions.Item label="Channels">
                        {campaignDetails.preferences?.socialChannels?.join(
                          ", "
                        ) || "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </Card>

            {/* Collaborators */}
            <Card
              title={
                <span className="text-lg font-semibold flex items-center gap-2">
                  <TeamOutlined className="text-primary" />
                  Collaboration Requests
                </span>
              }
              extra={
                <button
                  className="text-primary text-md hover:underline font-semibold"
                  
                >
                  Invite Applicants
                </button>
              }
              className="shadow-sm border-0"
              bodyStyle={{ padding: "24px" }}
            >
              {campaignDetails.collaborators?.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={campaignDetails.collaborators}
                  rowKey="influencerId"
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: "max-content" }}
                  className="ant-table-striped"
                />
              ) : (
                <Empty
                  description={
                    <span className="text-gray-500">
                      No collaboration requests yet
                    </span>
                  }
                />
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
