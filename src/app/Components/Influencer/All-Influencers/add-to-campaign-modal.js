"use client";
import React, { useState,useEffect } from "react";
import { Modal, Select, Tag, Space, Form, message, theme } from "antd";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";
import { moveToCampaign } from "@/redux/services/campaign";
import toast from "react-hot-toast";

const { useToken } = theme;

export default function AddToCampaignModal({ data, open, onClose }) {
  const { token } = useToken();
  const [form] = Form.useForm();
  const { brandCampaigns } = useSelector((store) => store.campaign);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  // Only display campaigns which the influencer has not been added
  const excludedCampaigns = brandCampaigns.filter(campaign =>
    !campaign.collaborators.some(influencer => influencer.influencer === data[0]?.influencerId)
  );

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const influencers = Array.isArray(data)
        ? data.map((influencer) => String(influencer.influencerId))
        : [String(data.influencerId)];

      const payload = {
        campaign: values.selectedCampaign,
        influencers,
      };

      const response = await moveToCampaign(auth, payload);
      if (response.status === 200) {
        toast.success("Added to campaign successfully");
        onClose();
        dispatch(fetchAllBrandCampaigns(auth));
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

  return (
    <Modal
      title="Add to Campaign"
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
          name="selectedCampaign"
          label="Select Campaign"
          rules={[{ required: true, message: "Please select a campaign" }]}
        >
          <Select
            // ref={selectRef}
            placeholder="Select a campaign"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.title?.toLowerCase().includes(input.toLowerCase())
            }
            options={excludedCampaigns.map((campaign) => ({
              value: campaign.id,
              label: (
                <Space>
                  <span>{campaign.title}</span>
                  <Tag color="blue">{campaign.collaborators?.length}</Tag>
                </Space>
              ),
              title: campaign.title,
            }))}
          />
        </Form.Item>

        <div className="flex justify-between items-center mt-6">
          <Space>
            <button
              className="bg-gradient-to-r from-primary to-secondary rounded text-white font-light px-4 py-3 text-xs"
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
  );
}
