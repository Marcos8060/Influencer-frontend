"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftOutlined,
  ShoppingOutlined,
  TeamOutlined,
  HistoryOutlined,
  EyeOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
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
import { getAllCampaignDetails } from "@/redux/features/stepper/campaign-stepper";
import toast from "react-hot-toast";
import { approveCampaignApplication } from "@/redux/services/campaign";
import ChristmasAnimation from "@/app/Components/SharedComponents/ChristmasAnimation";

const { Title, Text, Paragraph } = Typography;

const CampaignReport = () => {
  const { campaignDetails } = useSelector((store) => store.campaign);
  const [showAnimation, setShowAnimation] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const [processingActions, setProcessingActions] = useState({});

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

  const approveApplication = async (influencerId) => {
    // Set processing state for this influencer
    setProcessingActions(prev => ({
      ...prev,
      [influencerId]: { approving: true, rejecting: false }
    }));

    const payload = {
      campaignId: id,
      influencerId: influencerId,
      status: "approved",
    };
    
    try {
      const res = await approveCampaignApplication(auth, payload);
      if (res.status === 404) {
        toast.error(res.response.data.errorMessage[0]);
      } else {
        toast.success("Approval Successful");
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 6000);
        
        // Update local state to reflect the approved status
        // This will update the UI without needing to refetch data
        await getCampaignDetails();
      }
    } catch (error) {
      toast.error("Failed to approve influencer");
    } finally {
      // Reset processing state
      setProcessingActions(prev => ({
        ...prev,
        [influencerId]: { approving: false, rejecting: false }
      }));
    }
  };

  const rejectApplication = async (influencerId) => {
    // Set processing state for this influencer
    setProcessingActions(prev => ({
      ...prev,
      [influencerId]: { approving: false, rejecting: true }
    }));

    const payload = {
      campaignId: id,
      influencerId: influencerId,
      status: "rejected",
    };
    
    try {
      // Assuming there's a similar API call for rejection
      // If not, you'd need to implement it in your services
      // This is a placeholder for the API call
      // const res = await rejectCampaignApplication(auth, payload);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.error("Influencer rejected");
      
      // Update local state to reflect the rejected status
      // This will update the UI without needing to refetch data
      await getCampaignDetails();
    } catch (error) {
      toast.error("Failed to reject influencer");
    } finally {
      // Reset processing state
      setProcessingActions(prev => ({
        ...prev,
        [influencerId]: { approving: false, rejecting: false }
      }));
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
      icon: <TeamOutlined style={{ fontSize: 24 }} />,
      status: "pending",
      suffix: "Pending Approval",
    },
    {
      title: "Influencer Posts",
      value: 18,
      icon: <HistoryOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      status: "success",
      suffix: "Total Offers",
    },
    {
      title: "Total Reach",
      value: 12,
      icon: <ShoppingOutlined style={{ fontSize: 24 }} />,
      status: "warning",
      suffix: "Approaching Deadlines",
    },
    {
      title: "Average Likes",
      value: "12%",
      icon: <TeamOutlined style={{ fontSize: 24 }} />,
      status: "active",
      suffix: "Average Engagement",
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
      responsive: ["md"], // Hide on mobile
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        let color = "";
        if (status === "approved") {
          color = "green";
        } else if (status === "rejected") {
          color = "red";
        } else {
          color = "gold";
        }
        return (
          <Tag color={color} style={{ textTransform: "capitalize" }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Profile",
      key: "profile",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() =>
            router.push(
              `/brand/campaign-report/${id}/influencer-profile/${record.influencerId}`
            )
          }
        >
          View
        </Button>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 200,
    //   render: (_, record) => {
    //     const processing = processingActions[record.influencerId] || { approving: false, rejecting: false };
        
    //     if (record.status === "pending") {
    //       return (
    //         <Space>
    //           <Button
    //             type="text"
    //             icon={<CheckOutlined />}
    //             onClick={() => approveApplication(record.influencerId)}
    //             style={{ color: "#52c41a" }}
    //             loading={processing.approving}
    //             disabled={processing.rejecting}
    //           >
    //             Approve
    //           </Button>
    //           <Button
    //             type="text"
    //             danger
    //             icon={<CloseOutlined />}
    //             onClick={() => rejectApplication(record.influencerId)}
    //             loading={processing.rejecting}
    //             disabled={processing.approving}
    //           >
    //             Reject
    //           </Button>
    //         </Space>
    //       );
    //     } else {
    //       return (
    //         <Button disabled>
    //           {record.status === "approved" ? (
    //             <Space>
    //               <CheckCircleFilled style={{ color: "#52c41a" }} />
    //               Approved
    //             </Space>
    //           ) : (
    //             <Space>
    //               <CloseCircleFilled style={{ color: "#ff4d4f" }} />
    //               Rejected
    //             </Space>
    //           )}
    //         </Button>
    //       );
    //     }
    //   },
    // },
  ];

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      {showAnimation && <ChristmasAnimation />}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: 24 }}>
        {/* Header */}
        <Space style={{ marginBottom: 24 }}>
          <Link href="/brand/view-campaigns">
            <Button type="text" icon={<ArrowLeftOutlined />}>
              Back to Campaigns
            </Button>
          </Link>
        </Space>

        {/* Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                  suffix={
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {stat.suffix}
                    </Text>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {loading ? (
          <Card>
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        ) : (
          <Card
            title={<Title level={4}>Campaign Details</Title>}
            style={{ marginBottom: 24 }}
            bodyStyle={{ padding: 0 }}
          >
            {/* Campaign Main Info */}
            <div style={{ padding: 24 }}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Image
                    src={campaignDetails.coverImage}
                    alt={campaignDetails.title}
                    style={{ borderRadius: 8 }}
                    preview={false}
                  />
                </Col>
                <Col xs={24} md={16}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Title level={3} style={{ margin: 0 }}>
                        {campaignDetails.title}
                      </Title>
                      <Badge status="success" text="Active" />
                    </Space>
                    <Paragraph>{campaignDetails.description}</Paragraph>
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
                      >
                        View Example Video
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: 0 }} />

            {/* Products */}
            <div style={{ padding: 24 }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Featured Products
              </Title>
              {Array.isArray(campaignDetails.products) &&
              campaignDetails.products.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {campaignDetails.products.map((product) => (
                    <Col xs={24} sm={12} md={8} key={product.id}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={product.name}
                            src={product.productImages[0]?.url}
                            style={{ height: 200, objectFit: "cover" }}
                          />
                        }
                      >
                        <Card.Meta
                          title={product.name}
                          description={
                            <Space direction="vertical">
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                style={{ margin: 0 }}
                              >
                                {product.description}
                              </Paragraph>
                              <Text strong>${product.price}</Text>
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
            </div>

            <Divider style={{ margin: 0 }} />

            {/* Brief */}
            <div style={{ padding: 24 }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Campaign Brief
              </Title>
              <Card>
                <Descriptions column={1} title={campaignDetails.briefTitle}>
                  <Descriptions.Item>
                    {campaignDetails.briefDescription}
                  </Descriptions.Item>
                </Descriptions>

                <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                  <Col xs={24} md={12}>
                    <Title level={5}>Content Requirements</Title>
                    <List
                      size="small"
                      dataSource={campaignDetails.preferences?.videoStyle || []}
                      renderItem={(item) => (
                        <List.Item>
                          <CheckOutlined
                            style={{ color: "#52c41a", marginRight: 8 }}
                          />
                          {item}
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Title level={5}>Technical Specs</Title>
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
                  </Col>
                </Row>
              </Card>
            </div>

            <Divider style={{ margin: 0 }} />

            {/* Collaborators */}
            <div style={{ padding: 24 }}>
              <Space
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Collaboration Requests
                </Title>
              </Space>

              {campaignDetails.collaborators?.length > 0 ? (
                <Table
                  columns={columns}
                  dataSource={campaignDetails.collaborators}
                  rowKey="influencerId"
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: "max-content" }}
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Space direction="vertical">
                      <Text>No collaboration requests</Text>
                      <Text type="secondary">
                        Get started by inviting influencers to your campaign
                      </Text>
                    </Space>
                  }
                >
                  <button className="bg-primary text-white px-4 py-2 text-sm font-light">
                    Invite Influencers
                  </button>
                </Empty>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CampaignReport;