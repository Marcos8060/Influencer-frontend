"use client";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TikTokOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import SocialMediaTabs from "@/app/Components/Influencer/profile/socialMediaTabs";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import SuccessButtonComponent from "@/app/Components/SharedComponents/SuccessButtonComponent";
import { getInfluencerProfile } from "@/redux/features/socials";
import { useAuth } from "@/assets/hooks/use-auth";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const InfluencerProfilePage = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { posts } = useSelector((store) => store.campaign);
  const { influencerProfile } = useSelector((store) => store.socials);
  const dispatch = useDispatch();
  const auth = useAuth();

  const fetchInfluencerProfile = async () => {
    // const page = 'campaignCollaborator'
    try {
      setLoading(true);
      await dispatch(getInfluencerProfile(auth));
    } catch (error) {
      // Optional: handle error here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencerProfile();
  }, []);

  const handleEdit = () => {
    if (influencerProfile) {
      form.setFieldsValue({
        ...influencerProfile,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      // Simulate API update
      setTimeout(() => {
        setInfluencerData((prev) => ({
          ...prev,
          ...values,
        }));
        setLoading(false);
        setIsEditing(false);
        message.success("Profile updated successfully!");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList];

    // Limit to 1 file
    newFileList = newFileList.slice(-1);

    // Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      form.setFieldsValue({
        profilePicture: info.file.response.url,
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    fileList,
    onChange: handleUploadChange,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage;
    },
  };

  if (loading && !influencerProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!influencerProfile) {
    return <div>No data found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing ? (
        <Card
          title="Edit Profile"
          extra={
            <Space>
              <button
                type="button"
                className="border border-primary rounded px-6 py-3 text-xs text-color"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <SuccessButtonComponent
                onClick={handleSave}
                type="submit"
                label={
                  loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Save Changes
                      <CheckCircleFilled className="ml-2" />
                    </span>
                  )
                }
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium bg-green/80 text-white transition-all`}
              />
            </Space>
          }
          className="mb-6"
        >
          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Profile Picture" name="profilePicture">
                  <Upload
                    {...uploadProps}
                    listType="picture-card"
                    showUploadList={false}
                  >
                    {fileList.length >= 1 ? null : (
                      <Avatar
                        size={128}
                        src={
                          form.getFieldValue("profilePicture") ||
                          influencerProfile.profilePicture
                        }
                        className="cursor-pointer"
                      />
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[
                    { required: true, message: "Please input your full name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Age"
                  name="age"
                  rules={[
                    { required: true, message: "Please input your age" },
                    { type: "number", message: "Age must be a number" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Bio"
                  name="bio"
                  rules={[{ required: true, message: "Please input your bio" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Phone" name="phoneNumber">
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Address Line 1" name="addressLine1">
                  <Input prefix={<EnvironmentOutlined />} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Address Line 2" name="addressLine2">
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="City" name="city">
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Country" name="country">
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Zip Code" name="zipCode">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Content Categories"
                  name="contentCategories"
                  rules={[
                    {
                      required: true,
                      message: "Please select at least one category",
                    },
                  ]}
                >
                  <Select mode="multiple" placeholder="Select categories">
                    <Option value="Technology">Technology</Option>
                    <Option value="Fitness">Fitness</Option>
                    <Option value="Travel">Travel</Option>
                    <Option value="Fashion">Fashion</Option>
                    <Option value="Food">Food</Option>
                    <Option value="Lifestyle">Lifestyle</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Keywords" name="keywords">
                  <Select mode="tags" placeholder="Add keywords">
                    {influencerProfile.keywords.map((keyword) => (
                      <Option key={keyword} value={keyword}>
                        {keyword}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Available for Collaboration"
                  name="isAvailableForCollaboration"
                >
                  <Select>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar size={160} src={influencerProfile.profilePicture} />
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  className="mt-4"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Title level={2} className="mb-0">
                      {influencerProfile.fullName}
                    </Title>
                    <Text type="secondary">
                      {influencerProfile.age} years • {influencerProfile.gender}
                    </Text>
                  </div>

                  <Tag
                    color={
                      influencerProfile.isAvailableForCollaboration
                        ? "green"
                        : "red"
                    }
                  >
                    {influencerProfile.isAvailableForCollaboration ? (
                      <Space>
                        <CheckCircleOutlined /> Available for Collabs
                      </Space>
                    ) : (
                      <Space>
                        <CloseCircleOutlined /> Not Available
                      </Space>
                    )}
                  </Tag>
                </div>

                <Paragraph className="mt-4">{influencerProfile.bio}</Paragraph>

                <Divider />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text strong>Contact Information</Text>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center">
                        <MailOutlined className="mr-2" />
                        <Text>{influencerProfile.email}</Text>
                      </div>
                      <div className="flex items-center">
                        <PhoneOutlined className="mr-2" />
                        <Text>{influencerProfile.phoneNumber}</Text>
                      </div>
                      <div className="flex items-center">
                        <EnvironmentOutlined className="mr-2" />
                        <Text>
                          {influencerProfile.addressLine1},{" "}
                          {influencerProfile.addressLine2}
                          <br />
                          {influencerProfile.city}, {influencerProfile.country}{" "}
                          {influencerProfile.zipCode}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Text strong>Content Categories</Text>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {influencerProfile?.contentCategories?.map((category) => (
                        <Tag key={category} color="blue">
                          {category}
                        </Tag>
                      ))}
                    </div>

                    <Text strong className="mt-4 block">
                      Keywords
                    </Text>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {influencerProfile?.keywords?.map((keyword) => (
                        <Tag key={keyword}>{keyword}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Row gutter={16} className="mb-6">
            <Col xs={24} md={8}>
              <Card title="Social Media Stats">
                <Space direction="vertical" size="large" className="w-full">
                  <div className="flex items-center">
                    <Avatar
                      size={64}
                      src={posts[0]?.profilePictureUrl}
                      className="mr-4"
                    />
                    <div>
                      <Text strong>@{influencerProfile.instagramUsername}</Text>
                      <div className="flex items-center">
                        {influencerProfile.isInstagramConnected ? (
                          <CheckCircleOutlined className="text-green-500 mr-1" />
                        ) : (
                          <CloseCircleOutlined className="text-red-500 mr-1" />
                        )}
                        <Text type="secondary">Instagram</Text>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Statistic
                      title="Followers"
                      value={influencerProfile.instagramFollowersCount}
                      className="text-center"
                    />
                    <Statistic
                      title="Posts"
                      value={27}
                      className="text-center"
                    />
                    <Statistic
                      title="Engagement"
                      value="4.2%"
                      className="text-center"
                    />
                  </div>
                  <Divider />

                  <div className="flex items-center">
                    <Avatar
                      size={64}
                      src={influencerProfile.tiktokAvatarUrl}
                      className="mr-4"
                    />
                    <div>
                      <Text strong>@{influencerProfile.tiktokUsername}</Text>
                      <div className="flex items-center">
                        {influencerProfile.isTiktokConnected ? (
                          <CheckCircleOutlined className="text-green-500 mr-1" />
                        ) : (
                          <CloseCircleOutlined className="text-red-500 mr-1" />
                        )}
                        <Text type="secondary">TikTok</Text>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Statistic
                      title="Followers"
                      value={influencerProfile.tiktokFollowerCount}
                      className="text-center"
                    />
                    <Statistic
                      title="Videos"
                      value={1}
                      className="text-center"
                    />
                    <Statistic
                      title="Likes"
                      value={3}
                      className="text-center"
                    />
                  </div>
                  <Divider />

                  <div className="flex items-center">
                    <Avatar
                      size={64}
                      icon={<FacebookOutlined />}
                      className="mr-4 bg-blue-500"
                    />
                    <div>
                      <Text strong>Facebook</Text>
                      <div className="flex items-center">
                        {influencerProfile.isFacebookAccountConnected ? (
                          <CheckCircleOutlined className="text-green-500 mr-1" />
                        ) : (
                          <CloseCircleOutlined className="text-red-500 mr-1" />
                        )}
                        <Text type="secondary">Connected</Text>
                      </div>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
            <SocialMediaTabs />
          </Row>
        </>
      )}
    </div>
  );
};

export default InfluencerProfilePage;
