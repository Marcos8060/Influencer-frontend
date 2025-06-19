"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Tag, Space, Form, message, theme } from "antd";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBuckets,
  fetchExcludedBuckets,
} from "@/redux/features/bucket-list";
import BucketListDialog from "../../Brand/BucketList/bucket-list-dialog";
import toast from "react-hot-toast";
import { moveToBucket } from "@/redux/services/influencer/bucket";

const { useToken } = theme;

export default function AddToBucketListModal({ data, open, onClose }) {
  const { token } = useToken();
  const [form] = Form.useForm();
  const { bucketList } = useSelector((store) => store.bucket);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  // Only display buckets which the influencer has not been added
  const excludedBuckets = bucketList.filter(bucket =>
    !bucket.influencers.some(influencer => influencer.id === data[0]?.influencerId)
  );

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
        toast.success("Added to bucket successfully");
        dispatch(fetchAllBuckets(auth));
        form.resetFields();
      } else {
        toast.error(response.errorMessage[0] || "Something went wrong");
      }
    } catch (error) {
      message.error(
        error.response?.data?.errorMessage?.[0] || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add to Bucket"
      open={open}
      onCancel={() => {
        form.resetFields();
        if (onClose) onClose();
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
          label="Select Bucket"
          rules={[{ required: true, message: "Please select a bucket" }]}
        >
          <Select
            // ref={selectRef}
            placeholder="Select a bucket"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.title?.toLowerCase().includes(input.toLowerCase())
            }
            options={excludedBuckets.map((bucket) => ({
              value: bucket.id,
              label: (
                <Space>
                  <span>{bucket.name}</span>
                  <Tag color="blue">{bucket.influencers.length} Influencers Admitted</Tag>
                </Space>
              ),
              title: bucket.name, // <-- added title field for searching
            }))}
          />
        </Form.Item>

        <div className="flex justify-between items-center mt-6">
          <BucketListDialog />

          <Space>
            <button
              className="bg-primary text-white font-light px-4 py-3 text-xs rounded-sm"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to Bucket"}
            </button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}
