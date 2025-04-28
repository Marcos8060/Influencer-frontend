"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Avatar,
  Tag,
  Space,
  Typography,
  Card,
  Empty,
  Skeleton,
  Checkbox,
  Pagination,
  Tooltip,
  Badge,
} from "antd";
import {
  EyeOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UserOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/assets/hooks/use-auth";
import { getAllInfluencers } from "@/redux/features/influencer/filter";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddToBucketListModal from "./add-to-bucket-modal";
import FiltersDrawer from "./filters-drawer";
import AddToCampaignModal from "./add-to-campaign-modal";

const { Text, Title } = Typography;

const AllInfluencers = () => {
  const { influencers, filterResults } = useSelector(
    (store) => store.filterResults
  );
  const { bucketList } = useSelector((store) => store.bucket);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const auth = useAuth();

  const displayedInfluencers =
    filterResults.length > 0 ? filterResults : influencers;
  const totalItems = displayedInfluencers?.length || 0;

  // influencers in buckets
  const influencersInBuckets = new Set(
    bucketList.flatMap((bucket) =>
      Array.isArray(bucket.influencers)
        ? bucket.influencers.map((inf) => inf.id)
        : []
    )
  );

  const handleCheckboxChange = (influencer, checked) => {
    setSelectedInfluencers((prev) =>
      checked
        ? [...prev, influencer]
        : prev.filter((item) => item.id !== influencer.id)
    );
  };

  const handleViewProfile = (data) => {
    router.push(`/brand/influencer-discovery/influencerProfile/${data.influencerId}`);
  };

  useEffect(() => {
    if (auth && influencers.length === 0) {
      setLoading(true);
      dispatch(getAllInfluencers(auth))
        .then((response) => {
          if (response.error) {
            throw new Error(response.error.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth, dispatch, influencers.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterResults]);

  const columns = [
    {
      title: "Influencer",
      dataIndex: "fullName",
      key: "name",
      render: (text, record) => (
        <Space>
          <Checkbox
            checked={selectedInfluencers.some((item) => item.id === record.id)}
            onChange={(e) => handleCheckboxChange(record, e.target.checked)}
          />
          <Avatar
            size="large"
            src={record.profilePicture}
            icon={<UserOutlined />}
          />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>{record.country}</Text>
          <Text type="secondary">{record.city}</Text>
        </Space>
      ),
    },
    {
      title: "Ethnicity",
      dataIndex: "ethnicBackground",
      key: "ethnicity",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    {
      title: "Profile",
      key: "profile",
      align: "center",
      render: (_, record) => (
        <Tooltip title="View profile">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewProfile(record)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) =>
        influencersInBuckets.has(record.influencerId) ? (
          <Tag color="green" icon={<CheckOutlined />}>
            In Bucket
          </Tag>
        ) : (
          <AddToBucketListModal data={record} />
        ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedInfluencers.map((item) => item.id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedInfluencers(selectedRows);
    },
  };

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          Influencer Discovery
        </Title>
      }
      extra={<FiltersDrawer />}
      styles={{ body: { padding: 0 } }} // Updated to use styles.body instead of bodyStyle
    >
      <div style={{ padding: 24 }}>
        <section className="flex items-center gap-2">
          <div>
            {selectedInfluencers.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <AddToBucketListModal data={selectedInfluencers} />
              </div>
            )}
          </div>
          <div>
            {selectedInfluencers.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <AddToCampaignModal data={selectedInfluencers} />
              </div>
            )}
          </div>
        </section>

        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            {totalItems > 0 ? (
              <>
                <Table
                  columns={columns}
                  dataSource={displayedInfluencers}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: "max-content" }} // This enables horizontal scroll
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                />
                <div style={{ marginTop: 24, textAlign: "right" }}>
                  <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} influencers`
                    }
                  />
                </div>
              </>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Space direction="vertical">
                    <Text>No influencers available</Text>
                    <Text type="secondary">Try adjusting your filters</Text>
                  </Space>
                }
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Explore Influencers
                </Button>
              </Empty>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default AllInfluencers;
