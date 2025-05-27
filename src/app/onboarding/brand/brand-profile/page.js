"use client";
import React, { useState, useEffect } from 'react';
import {
  Card,
  Avatar,
  Button,
  Tabs,
  Tag,
  Table,
  Tooltip,
  Badge,
  message,
  Progress,
  Space,
  Statistic,
  Spin,
  Collapse,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  Switch,
  InputNumber,
} from 'antd';
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Video,
  Package,
  Target,
  Plus,
  Edit,
  Trash2,
  Upload as UploadIcon,
  Play,
  Pause,
  Save,
  X,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube } from "react-icons/fa";
import Image from 'next/image';
import dayjs from 'dayjs';

const { Panel } = Collapse;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const BrandProfile = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [loading, setLoading] = useState(true);
  const [brandData, setBrandData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm] = Form.useForm();
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    fetchBrandData();
  }, []);

  // CRUD Operations
  const fetchBrandData = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await fetch('/api/brand/profile');
      const data = await response.json();
      setBrandData(data);
    } catch (error) {
      message.error('Failed to load brand profile');
      // Using mock data as fallback
      setBrandData(mockBrandData);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (values) => {
    try {
      setUploading(true);
      const { dateRange, ...rest } = values;
      
      const formData = {
        ...rest,
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
      };

      // Replace with actual API call
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create campaign');

      message.success('Campaign created successfully');
      fetchBrandData();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create campaign');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateCampaign = async (values) => {
    try {
      setUploading(true);
      const { dateRange, ...rest } = values;
      
      const formData = {
        ...rest,
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
      };

      // Replace with actual API call
      const response = await fetch(`/api/campaigns/${editingCampaign.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update campaign');

      message.success('Campaign updated successfully');
      fetchBrandData();
      setIsModalVisible(false);
      setEditingCampaign(null);
      form.resetFields();
    } catch (error) {
      message.error('Failed to update campaign');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      Modal.confirm({
        title: 'Are you sure you want to delete this campaign?',
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          // Replace with actual API call
          const response = await fetch(`/api/campaigns/${campaignId}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete campaign');

          message.success('Campaign deleted successfully');
          fetchBrandData(); // Refresh data
        },
      });
    } catch (error) {
      message.error('Failed to delete campaign');
    }
  };

  const handlePauseCampaign = async (campaignId, isPaused) => {
    try {
      // Replace with actual API call
      const response = await fetch(`/api/campaigns/${campaignId}/pause`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPaused }),
      });

      if (!response.ok) throw new Error('Failed to update campaign status');

      message.success(`Campaign ${isPaused ? 'paused' : 'resumed'} successfully`);
      fetchBrandData(); // Refresh data
    } catch (error) {
      message.error(`Failed to ${isPaused ? 'pause' : 'resume'} campaign`);
    }
  };

  // Brand CRUD Operations
  const handleUpdateBrandProfile = async (values) => {
    try {
      const formData = new FormData();
      
      // Append text fields
      Object.keys(values).forEach(key => {
        if (key !== 'logo') {
          formData.append(key, values[key]);
        }
      });

      // Append logo if changed
      if (values.logo && values.logo[0]?.originFileObj) {
        formData.append('logo', values.logo[0].originFileObj);
      }

      // Replace with actual API call
      const response = await fetch('/api/brand/profile', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedData = await response.json();
      setBrandData(updatedData);
      message.success('Profile updated successfully');
      setIsEditingProfile(false);
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleDeleteBrand = async () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this brand profile?',
      content: 'This action cannot be undone. All campaigns and data will be permanently deleted.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // Replace with actual API call
          const response = await fetch('/api/brand/profile', {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete profile');

          message.success('Profile deleted successfully');
          // Redirect to home or login page
          window.location.href = '/';
        } catch (error) {
          message.error('Failed to delete profile');
        }
      },
    });
  };

  const handleEditProfile = () => {
    profileForm.setFieldsValue({
      name: brandData.name,
      industry: brandData.industry,
      location: brandData.location,
      website: brandData.website,
      description: brandData.description || '',
    });
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    profileForm.resetFields();
  };

  // UI Components
  const showModal = (campaign = null) => {
    if (campaign) {
      setEditingCampaign(campaign);
      form.setFieldsValue({
        ...campaign,
        dateRange: [dayjs(campaign.startDate), dayjs(campaign.endDate)],
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingCampaign(null);
    form.resetFields();
  };

  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={record.coverImageUrl || '/placeholder.jpg'}
              alt={text}
              fill
              className="rounded-lg object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">{text}</div>
            <div className="text-gray-500 text-sm truncate">{record.briefTitle}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Social Channels',
      key: 'socialChannels',
      width: '15%',
      render: (_, record) => (
        <Space size="small" wrap>
          {record?.preferences?.socialChannels?.map((channel, index) => {
            const icons = {
              'Instagram Posts': <FaInstagram className="text-pink-500" />,
              'Tiktok Posts': <FaTiktok className="text-black" />,
              'Facebook Posts': <FaFacebookF className="text-blue-600" />,
            };
            return (
              <Tooltip key={index} title={channel}>
                {icons[channel]}
              </Tooltip>
            );
          })}
        </Space>
      ),
    },
    {
      title: 'Products',
      key: 'products',
      width: '20%',
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          {record.products.map((product, index) => (
            <Tooltip key={index} title={product.description}>
              <Tag color="blue" className="truncate max-w-[120px]">{product.name}</Tag>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      width: '15%',
      render: (_, record) => (
        <div className="text-sm whitespace-nowrap">
          <div>{new Date(record.startDate).toLocaleDateString()}</div>
          <div className="text-gray-500">to</div>
          <div>{new Date(record.endDate).toLocaleDateString()}</div>
        </div>
      ),
    },
    {
      title: 'Collaborators',
      key: 'collaborators',
      width: '15%',
      render: (_, record) => (
        <div className="min-w-0">
          <Tooltip title={`${record.collaborators.filter(c => c.status === 'approved').length} approved out of ${record.numberOfInfluencers} required`}>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium whitespace-nowrap">
                {record.numberOfInfluencers} Required
              </div>
              <Progress 
                percent={(record.collaborators.filter(c => c.status === 'approved').length / record.numberOfInfluencers) * 100} 
                size="small"
                format={() => `${record.collaborators.filter(c => c.status === 'approved').length}`}
                className="w-full"
              />
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '10%',
      render: (_, record) => {
        const colors = {
          'Finished': 'blue',
          'Active': 'green',
          'Paused': 'gold',
          'Draft': 'default',
        };
        return (
          <Tag color={colors[record.status]} className="whitespace-nowrap">
            {record.isPaused ? 'Paused' : record.status}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => showModal(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDeleteCampaign(record.id)}
          />
          <Button
            type="text"
            icon={record.isPaused ? <Play size={16} /> : <Pause size={16} />}
            onClick={() => handlePauseCampaign(record.id, !record.isPaused)}
          />
        </Space>
      ),
    },
  ];

  const renderPreferences = (preferences) => (
    <Collapse ghost className="bg-gray-50 rounded-lg">
      <Panel header="Campaign Preferences" key="1">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Video Style:</span>
            <div className="flex gap-2">
              {preferences.videoStyle.map((style, index) => (
                <Tag key={index}>{style}</Tag>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Videos Per Creator:</span>
            <span>{preferences.videosPerCreator}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Video Duration:</span>
            <span>{preferences.videoDuration}s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Video Format:</span>
            <Tag>{preferences.videoFormat}</Tag>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Show Face:</span>
            <span>{preferences.showFace ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Languages:</span>
            <div className="flex gap-2">
              {preferences.contentLanguages.split(',').map((lang, index) => (
                <Tag key={index}>{lang.toUpperCase()}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );

  const renderCampaignForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={editingCampaign ? handleUpdateCampaign : handleCreateCampaign}
    >
      <Form.Item
        name="title"
        label="Campaign Title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="briefTitle"
        label="Brief Title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="briefDescription"
        label="Brief Description"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="Campaign Duration"
        rules={[{ required: true }]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item
        name={['preferences', 'videoStyle']}
        label="Video Styles"
        rules={[{ required: true }]}
      >
        <Select mode="multiple">
          <Select.Option value="Testimonials">Testimonials</Select.Option>
          <Select.Option value="How To">How To</Select.Option>
          <Select.Option value="Unboxing">Unboxing</Select.Option>
          <Select.Option value="Up to the creator">Up to the creator</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={['preferences', 'socialChannels']}
        label="Social Channels"
        rules={[{ required: true }]}
      >
        <Select mode="multiple">
          <Select.Option value="Instagram Posts">Instagram Posts</Select.Option>
          <Select.Option value="Tiktok Posts">TikTok Posts</Select.Option>
          <Select.Option value="Facebook Posts">Facebook Posts</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={['preferences', 'videosPerCreator']}
        label="Videos Per Creator"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        name={['preferences', 'videoDuration']}
        label="Video Duration (seconds)"
        rules={[{ required: true }]}
      >
        <InputNumber min={15} />
      </Form.Item>

      <Form.Item
        name={['preferences', 'showFace']}
        label="Show Face Required"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name={['preferences', 'videoFormat']}
        label="Video Format"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="square">Square</Select.Option>
          <Select.Option value="vertical">Vertical</Select.Option>
          <Select.Option value="horizontal">Horizontal</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="coverImage"
        label="Cover Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        }}
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          beforeUpload={() => false}
        >
          <div>
            <UploadIcon size={20} />
            <div className="mt-2">Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </Form>
  );

  const tabItems = [
    {
      key: 'active',
      label: 'Active Campaigns',
      children: (
        <Table 
          columns={campaignColumns} 
          dataSource={brandData?.campaigns?.filter(c => !c.isPaused && c.status !== 'Finished')}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => renderPreferences(record.preferences),
          }}
        />
      ),
    },
    {
      key: 'completed',
      label: 'Completed Campaigns',
      children: (
        <Table 
          columns={campaignColumns} 
          dataSource={brandData?.campaigns?.filter(c => c.status === 'Finished')}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => renderPreferences(record.preferences),
          }}
        />
      ),
    },
  ];

  const StatCard = ({ icon: Icon, title, value, trend, color = 'blue', details }) => {
    const [showDetails, setShowDetails] = useState(false);

    const gradients = {
      blue: 'from-blue-50 to-white hover:from-blue-100',
      green: 'from-green-50 to-white hover:from-green-100',
      purple: 'from-purple-50 to-white hover:from-purple-100',
      orange: 'from-orange-50 to-white hover:from-orange-100'
    };

    const iconColors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100'
    };

    const trendColors = {
      increase: 'text-green-600 bg-green-50',
      decrease: 'text-red-600 bg-red-50',
      neutral: 'text-gray-600 bg-gray-50'
    };

    return (
      <div 
        className="group cursor-pointer transform transition-all duration-300 hover:scale-102"
        onClick={() => setShowDetails(!showDetails)}
      >
        <Card 
          className={`relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br ${gradients[color]}`}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 transform rotate-45 translate-x-6 -translate-y-6">
                <Icon size={128} />
              </div>
            </div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${iconColors[color]}`}>
                <Icon size={20} />
              </div>
              {trend && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendColors[trend.type]}`}>
                  {trend.type === 'increase' ? '↑' : trend.type === 'decrease' ? '↓' : '•'} {trend.value}%
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {trend && (
                  <span className="text-sm text-gray-500">
                    vs last month
                  </span>
                )}
              </div>
            </div>

            {/* Details Section */}
            {details && (
              <div className={`mt-4 pt-4 border-t border-input transition-all duration-300 ${showDetails ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                <div className="space-y-3">
                  {details.map((detail, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{detail.label}</span>
                      <span className="font-medium text-gray-900">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interaction Hint */}
            {details && (
              <div className="absolute bottom-2 right-2 text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="text-xs">{!showDetails && 'Click to expand'}</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };

  // Profile Section Component
  const renderProfileSection = () => {
    if (isEditingProfile) {
      return (
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleUpdateBrandProfile}
          className="w-full max-w-2xl"
        >
          <div className="flex items-start gap-6">
            <Form.Item
              name="logo"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e?.fileList || [];
              }}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
              >
                {brandData.logo ? (
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={brandData.logo}
                      alt="Brand Logo"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <UploadIcon size={24} />
                    <span className="mt-2">Upload</span>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  label="Brand Name"
                  rules={[{ required: true, message: 'Please enter brand name' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="industry"
                  label="Industry"
                  rules={[{ required: true, message: 'Please select industry' }]}
                >
                  <Select>
                    <Select.Option value="Fashion">Fashion</Select.Option>
                    <Select.Option value="Technology">Technology</Select.Option>
                    <Select.Option value="Beauty">Beauty</Select.Option>
                    <Select.Option value="Food & Beverage">Food & Beverage</Select.Option>
                    <Select.Option value="Sports & Fitness">Sports & Fitness</Select.Option>
                    <Select.Option value="Health & Wellness">Health & Wellness</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true, message: 'Please enter location' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="website"
                  label="Website"
                  rules={[
                    { required: true, message: 'Please enter website' },
                    { type: 'url', message: 'Please enter a valid URL' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <div className="flex justify-end gap-3">
                <Button onClick={handleCancelEdit} icon={<X size={16} />}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<Save size={16} />}
                  className="bg-primary hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </Form>
      );
    }

    return (
      <div className="flex items-start gap-6">
        <div className="relative">
          <Avatar
            size={100}
            src={brandData.logo}
            className="border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <CheckCircle size={14} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{brandData.name}</h1>
              <Badge 
                status="success" 
                text={<span className="text-sm font-medium">Verified</span>} 
                className="relative top-[1px]"
              />
            </div>
            <div className="flex gap-3">
              <Button
                icon={<Edit size={16} />}
                onClick={handleEditProfile}
                className="border-primary text-primary hover:bg-blue-50"
              >
                Edit Profile
              </Button>
              {/* <Button
                icon={<Trash2 size={16} />}
                danger
                onClick={handleDeleteBrand}
              >
                Delete Profile
              </Button> */}
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-600 mt-3">
            <span className="flex items-center gap-2">
              <Building2 size={16} />
              {brandData.industry}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {brandData.location}
            </span>
            <a 
              href={`https://${brandData.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <Globe size={16} />
              {brandData.website}
            </a>
          </div>
          {brandData.description && (
            <p className="mt-4 text-gray-600">{brandData.description}</p>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white shadow-md rounded">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="mb-8">
          {renderProfileSection()}
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-t border-b border-input py-4">
          <StatCard
            icon={Calendar}
            title="Total Campaigns"
            value={brandData.stats.totalCampaigns}
            trend={{ type: 'increase', value: 12 }}
            color="blue"
            details={[
              { label: 'Active', value: brandData.stats.activeCampaigns },
              { label: 'Completed', value: brandData.stats.totalCampaigns - brandData.stats.activeCampaigns },
              { label: 'Success Rate', value: '87%' }
            ]}
          />
          <StatCard
            icon={Clock}
            title="Active Campaigns"
            value={brandData.stats.activeCampaigns}
            trend={{ type: 'increase', value: 8 }}
            color="green"
            details={[
              { label: 'In Progress', value: Math.floor(brandData.stats.activeCampaigns * 0.7) },
              { label: 'Pending Start', value: Math.floor(brandData.stats.activeCampaigns * 0.3) },
              { label: 'Avg. Duration', value: '45 days' }
            ]}
          />
          <StatCard
            icon={Package}
            title="Total Products"
            value={brandData.stats.totalProducts}
            trend={{ type: 'decrease', value: 3 }}
            color="purple"
            details={[
              { label: 'Featured', value: Math.floor(brandData.stats.totalProducts * 0.2) },
              { label: 'Categories', value: '5' },
              { label: 'Avg. Price', value: '$89.99' }
            ]}
          />
          <StatCard
            icon={Users}
            title="Total Collaborators"
            value={brandData.stats.totalCollaborators}
            trend={{ type: 'increase', value: 15 }}
            color="orange"
            details={[
              { label: 'Active', value: Math.floor(brandData.stats.totalCollaborators * 0.6) },
              { label: 'Top Performers', value: Math.floor(brandData.stats.totalCollaborators * 0.1) },
              { label: 'Avg. Engagement', value: '8.2%' }
            ]}
          />
        </div>

        {/* Tabs */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
        />

        {/* Campaign Modal */}
        <Modal
          title={editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={uploading}
              onClick={() => form.submit()}
              className="bg-primary"
            >
              {editingCampaign ? 'Update' : 'Create'}
            </Button>,
          ]}
          width={720}
        >
          {renderCampaignForm()}
        </Modal>
      </div>
    </div>
  );
};

const mockBrandData = {
  name: 'Nike Sportswear',
  logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=200&h=200',
  industry: 'Sports & Fitness',
  location: 'Portland, Oregon',
  website: 'www.nike.com',
  description: 'Leading innovator in athletic footwear, apparel, and sports equipment. Committed to inspiring and bringing innovation to every athlete in the world.',
  stats: {
    totalCampaigns: 24,
    activeCampaigns: 8,
    totalProducts: 45,
    totalCollaborators: 156,
  },
  campaigns: [
    {
      id: "4271353b-47dd-4067-96da-4305493bb66b",
      status: "Finished",
      preferences: {
        id: "25b1c94c-1f06-4120-acea-b9c00d4c0b30",
        videoStyle: [
          "Testimonials",
          "How To",
          "Up to the creator",
          "Unboxing"
        ],
        videosPerCreator: 4,
        videoDuration: 60,
        showFace: true,
        videoFormat: "square",
        socialChannels: [
          "Facebook Posts",
          "Tiktok Posts"
        ],
        collaborationType: [],
        campaignObjective: "",
        contentLanguages: "en,es,fr"
      },
      products: [
        {
          id: "fa9d0beb-31e8-4127-9147-02982a9491c8",
          name: "Basil the Cat",
          description: "30 Jewellery Influencers to Collaborate with in 2025",
          price: "12.00",
          productImages: [
            {
              url: "http://res.cloudinary.com/dqjnaukdk/image/upload/v1744723502/1cdbd0a3-03d8-4cda-bdbb-d7dde1eb4ab4/products/rminxumlvvdjuss31alf.jpg"
            }
          ]
        }
      ],
      numberOfInfluencers: 3,
      coverImageUrl: "http://res.cloudinary.com/dqjnaukdk/image/upload/v1745578358/1cdbd0a3-03d8-4cda-bdbb-d7dde1eb4ab4/campaignCoverPhoto/muyav41qnzhsfvaec0s4.jpg",
      title: "Summer Skin Glow Campaign",
      briefTitle: "Promote Our Glow Kit!",
      briefDescription: "We're seeking vibrant creators to showcase our Summer Glow Kit across social platforms.",
      startDate: "2025-04-25",
      endDate: "2025-05-15",
      isPaused: false,
      collaborators: [
        {
          id: "7d015e2f-dd35-4879-b4b6-ee1d9efdde29",
          status: "approved"
        },
        {
          id: "de3c04a4-f124-4888-bed8-57decb951878",
          status: "approved"
        }
      ]
    }
  ]
};

export default BrandProfile;
