"use client";
import React, { useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import { createBucketList } from "@/redux/services/auth/brand/bucketList";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { MdAdd } from "react-icons/md";

export default function BucketListDialog() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const auth = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (auth) {
        await createBucketList(auth, values);
        toast.success("Bucket List created successfully");
        setVisible(false);
        dispatch(fetchAllBuckets(auth));
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.response?.data?.errorMessage?.[0] || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        type="default"
        icon={<MdAdd className="text-md" />}
        className="flex items-center gap-1 border border-primary rounded text-xs px-4 py-3"
        onClick={() => setVisible(true)}
      >
        Create New Bucket
      </Button>
      <Modal
        title="Create Bucket List"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        width={400}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-2"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Name" size="large" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Description..." rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 w-full rounded"
            >
              {loading ? "Processing..." : "Create New List"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
