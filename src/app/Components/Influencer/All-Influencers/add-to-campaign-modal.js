"use client";
import React, { useState } from "react";
import { Modal, Button, Select, Tag, Space, Form, message, theme } from "antd";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { moveToBucket } from "@/redux/services/influencer/bucket";
import { fetchAllBuckets } from "@/redux/features/bucket-list";

const { useToken } = theme;

export default function AddToCampaignModal({ data }) {
  const { token } = useToken();
  const [form] = Form.useForm();
  const { bucketList } = useSelector((store) => store.bucket);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  // Create a ref with the new React 19 pattern
  const selectRef = React.useRef(null);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const influencerIds = Array.isArray(data)
        ? data.map((influencer) => String(influencer.influencerId))
        : [String(data.influencerId)];

      const payload = {
        toBrandBucketList: values.selectedBucket,
        influencerIds,
      };

      const response = await moveToBucket(auth, payload);
      if (response.status === 200) {
        message.success("Added to bucket successfully");
        dispatch(fetchAllBuckets(auth));
        setOpen(false);
        form.resetFields();
      } else {
        message.error(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      message.error(
        error.response?.data?.errorMessage?.[0] || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    if (Array.isArray(data) && data.length === 0) {
      message.warning("No influencers selected");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        className="bg-primary text-white font-light px-4 py-2 text-xs rounded-sm"
        onClick={handleOpen}
      >
        Add To Campaign
      </button>

      <Modal
        title="Add to Campaign"
        open={open}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        footer={null}
        centered
        width={400}
        styles={{
          header: {
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            marginBottom: token.marginSM,
          },
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="selectedBucket"
            label="Select Campaign"
            rules={[{ required: true, message: "Please select a campaign" }]}
          >
            <Select
              ref={selectRef}
              placeholder="Select a campaign"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.title?.toLowerCase().includes(input.toLowerCase())
              }
              options={bucketList.map((bucket) => ({
                value: bucket.id,
                label: (
                  <Space>
                    <span>{bucket.name}</span>
                    <Tag color="blue">{bucket.influencers.length}</Tag>
                  </Space>
                ),
                title: bucket.name, // <-- added title field for searching
              }))}
            />
          </Form.Item>

          <div className="flex justify-between items-center mt-6">
            <Space>
              <button
                className="bg-primary text-white font-light px-4 py-3 text-xs rounded-sm"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Campaign"}
              </button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
}
