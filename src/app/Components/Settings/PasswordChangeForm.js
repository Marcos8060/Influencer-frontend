import React from "react";
import { Card, Form, Input, Button } from "antd";

const PasswordChangeForm = ({ 
  form, 
  userEmail, 
  loading, 
  onPasswordChange 
}) => {
  return (
    <Card bordered={false} className="shadow-md">
      <Form
        form={form}
        layout="vertical"
        onFinish={onPasswordChange}
        requiredMark={false}
        size="middle"
      >
        <Form.Item
          label="Email"
          name="email"
          initialValue={userEmail}
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue("newPassword") === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
        <Form.Item className="mb-0">
          <button
            htmlType="submit"
            loading={loading}
            className="w-full bg-gradient-to-br text-sm from-primary to-secondary text-white py-2 px-3 rounded"
          >
            Change Password
          </button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PasswordChangeForm; 