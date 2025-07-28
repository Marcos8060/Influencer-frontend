"use client";
import React, { useState, useEffect } from "react";
import { Card, Tag, Button, Form, Input, message, Row, Col, Divider, Modal, Radio, Badge, Spin } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  CrownOutlined,
  StarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import AuthGuard from "@/assets/hooks/authGuard";

// MOCK: Replace with real data fetch
const mockSubscriptions = [
  {
    subscription_id: "sub_1RnNfVKf9rQfCgnfyhTRMaa6",
    items: [
      {
        plan_nickname: "Local plan",
        plan_amount: 4900,
        plan_currency: "usd",
        plan_interval: "month",
        plan_metadata: {
          "Advanced search filters": "true",
          "Analytics": "Basic reach & views",
          "Browse influencers": "true",
          "Campaign creation": "Up to 3",
          "Contact details access": "true",
          "Creator collaborations": "Up to 5",
          "Geographic targeting": "Region/City only",
          "Monthly invites": "150"
        },
        current_period_end: 1755797908,
      },
    ],
    cancel_at_period_end: false,
    canceled_at: null,
    collection_method: "charge_automatically",
    default_payment_method: "pm_1RnNfTKf9rQfCgnff6Pe0TdD",
  },
];

// MOCK: Backend response structure
const mockBackendResponse = [
  {
    "id": "prod_ShInXlB3HI05aW",
    "object": "product",
    "active": true,
    "attributes": [],
    "created": 1752767875,
    "default_price": null,
    "description": "Access to our influencer marketing platform with different tier capabilities",
    "images": [],
    "livemode": false,
    "marketing_features": [],
    "metadata": {},
    "name": "Grace Belgravia Subscription",
    "package_dimensions": null,
    "shippable": false,
    "statement_descriptor": null,
    "tax_code": null,
    "type": "service",
    "unit_label": null,
    "updated": 1752767875,
    "url": null,
    "prices": [
      {
        "id": "price_1RluFKKf9rQfCgnflY4bYxKh",
        "object": "price",
        "active": true,
        "billing_scheme": "per_unit",
        "created": 1752768082,
        "currency": "usd",
        "custom_unit_amount": null,
        "livemode": false,
        "lookup_key": null,
        "metadata": {
          "Advanced search filters": "true",
          "Analytics": "Engagement heatmaps",
          "Browse influencers": "true",
          "Campaign creation": "Up to 7",
          "Contact details access": "true",
          "Creator collaborations": "Up to 15",
          "Early feature access": "true",
          "Geographic targeting": "Basic suggestions",
          "Language & geo filters": "true",
          "Monthly invites": "600",
          "ROI modelling": "true",
          "UK Brand Spotlight": "true"
        },
        "nickname": "Global plan",
        "product": "prod_ShInXlB3HI05aW",
        "recurring": {
          "interval": "month",
          "interval_count": 1,
          "meter": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "tax_behavior": "unspecified",
        "tiers_mode": null,
        "transform_quantity": null,
        "type": "recurring",
        "unit_amount": 14900,
        "unit_amount_decimal": "14900"
      },
      {
        "id": "price_1RluEvKf9rQfCgnfMtDvK5om",
        "object": "price",
        "active": true,
        "billing_scheme": "per_unit",
        "created": 1752768057,
        "currency": "usd",
        "custom_unit_amount": null,
        "livemode": false,
        "lookup_key": null,
        "metadata": {
          "Advanced search filters": "true",
          "Analytics": "Audience demographics",
          "Browse influencers": "true",
          "Campaign creation": "Up to 5",
          "Contact details access": "true",
          "Creator collaborations": "Up to 10",
          "Geographic targeting": "All UK creators",
          "Monthly invites": "300",
          "ROI modelling": "true",
          "UK Brand Spotlight": "true"
        },
        "nickname": "Nationwide plan",
        "product": "prod_ShInXlB3HI05aW",
        "recurring": {
          "interval": "month",
          "interval_count": 1,
          "meter": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "tax_behavior": "unspecified",
        "tiers_mode": null,
        "transform_quantity": null,
        "type": "recurring",
        "unit_amount": 8900,
        "unit_amount_decimal": "8900"
      },
      {
        "id": "price_1RluESKf9rQfCgnfWMFyH9f7",
        "object": "price",
        "active": true,
        "billing_scheme": "per_unit",
        "created": 1752768028,
        "currency": "usd",
        "custom_unit_amount": null,
        "livemode": false,
        "lookup_key": null,
        "metadata": {
          "Advanced search filters": "true",
          "Analytics": "Basic reach & views",
          "Browse influencers": "true",
          "Campaign creation": "Up to 3",
          "Contact details access": "true",
          "Creator collaborations": "Up to 5",
          "Geographic targeting": "Region/City only",
          "Monthly invites": "150"
        },
        "nickname": "Local plan",
        "product": "prod_ShInXlB3HI05aW",
        "recurring": {
          "interval": "month",
          "interval_count": 1,
          "meter": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "tax_behavior": "unspecified",
        "tiers_mode": null,
        "transform_quantity": null,
        "type": "recurring",
        "unit_amount": 4900,
        "unit_amount_decimal": "4900"
      },
      {
        "id": "price_1RluDYKf9rQfCgnfMV41knv4",
        "object": "price",
        "active": true,
        "billing_scheme": "per_unit",
        "created": 1752767972,
        "currency": "usd",
        "custom_unit_amount": null,
        "livemode": false,
        "lookup_key": null,
        "metadata": {
          "Browse influencers": "View profiles",
          "Campaign creation": "1 saved",
          "Geographic targeting": "Basic suggestions"
        },
        "nickname": "Discovery",
        "product": "prod_ShInXlB3HI05aW",
        "recurring": {
          "interval": "month",
          "interval_count": 1,
          "meter": null,
          "trial_period_days": null,
          "usage_type": "licensed"
        },
        "tax_behavior": "unspecified",
        "tiers_mode": null,
        "transform_quantity": null,
        "type": "recurring",
        "unit_amount": 0,
        "unit_amount_decimal": "0"
      }
    ]
  }
];

const formatPrice = (amount, currency) => {
  return `${(amount / 100).toLocaleString(undefined, { style: 'currency', currency: currency.toUpperCase() })}`;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const getTierColor = (plan) => {
  // Determine tier based on price and features
  if (plan.unit_amount >= 14900) return 'purple'; // Global
  if (plan.unit_amount >= 8900) return 'blue';    // Nationwide
  if (plan.unit_amount >= 4900) return 'green';   // Local
  return 'default'; // Discovery (free)
};

const getTierIcon = (plan) => {
  if (plan.unit_amount >= 14900) return <CrownOutlined />;
  if (plan.unit_amount >= 8900) return <StarOutlined />;
  return <CheckCircleOutlined />;
};

const getTierName = (plan) => {
  if (plan.unit_amount >= 14900) return 'Premium';
  if (plan.unit_amount >= 8900) return 'Pro';
  if (plan.unit_amount >= 4900) return 'Basic';
  return 'Free';
};

const SettingsPage = () => {
  const userEmail = "user@email.com";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [switchingPlan, setSwitchingPlan] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Get current plan
  const currentPlan = mockSubscriptions[0]?.items[0];
  const currentPlanId = "price_1RluESKf9rQfCgnfWMFyH9f7"; // Mock current plan ID
  let isCurrentPlan;

  // Fetch available plans from backend
  const fetchAvailablePlans = async () => {
    setLoadingPlans(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/payment-service/fetch-payment-plans');
      // const data = await response.json();
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = mockBackendResponse;
      
      // Extract prices from the first product (assuming single product)
      const plans = data[0]?.prices || [];
      setAvailablePlans(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      message.error('Failed to load available plans');
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    fetchAvailablePlans();
  }, []);

  const handlePasswordChange = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Password changed successfully");
      form.resetFields(["newPassword", "confirmPassword"]);
    }, 1200);
  };

  const handlePlanSwitch = async () => {
    if (!selectedPlan) return;
    
    setSwitchingPlan(true);
    try {
      // TODO: Call API to switch plan
      // const response = await fetch('/api/payment-service/switch-plan', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priceId: selectedPlan.id })
      // });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success(`Successfully switched to ${selectedPlan.nickname}`);
      setPlanModalVisible(false);
      setSelectedPlan(null);
      
      // TODO: Refresh user's subscription data
      // await refreshUserSubscriptions();
      
    } catch (error) {
      console.error('Error switching plan:', error);
      message.error('Failed to switch plan. Please try again.');
    } finally {
      setSwitchingPlan(false);
    }
  };

  const isUpgrade = (selectedPlan) => {
    if (!selectedPlan || !currentPlan) return false;
    return selectedPlan.unit_amount > currentPlan.plan_amount;
  };

  const isDowngrade = (selectedPlan) => {
    if (!selectedPlan || !currentPlan) return false;
    return selectedPlan.unit_amount < currentPlan.plan_amount;
  };

  const getPriceDifference = (selectedPlan) => {
    if (!selectedPlan || !currentPlan) return 0;
    return selectedPlan.unit_amount - currentPlan.plan_amount;
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Account Settings</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Subscriptions */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-4">Your Subscriptions</h2>
            
            {mockSubscriptions.map((sub, idx) => {
              const plan = sub.items[0];
              return (
                <Card
                  key={sub.subscription_id}
                  title={
                    <div className="flex justify-between items-center">
                      <span>{plan.plan_nickname || "Subscription"}</span>
                      {sub.canceled_at ? (
                        <Tag color="red" icon={<CloseCircleOutlined />}>Canceled</Tag>
                      ) : (
                        <Tag color="green" icon={<CheckCircleOutlined />}>Active</Tag>
                      )}
                    </div>
                  }
                  bordered={false}
                  className="shadow-md mb-4"
                  extra={
                    <Button 
                      type="primary" 
                      size="small"
                      onClick={() => setPlanModalVisible(true)}
                      icon={<ReloadOutlined />}
                    >
                      Switch Plan
                    </Button>
                  }
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {formatPrice(plan.plan_amount, plan.plan_currency)}
                      </span>
                      <span className="text-gray-500">/ {plan.plan_interval}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarOutlined />
                      <span>Renews: {formatDate(plan.current_period_end)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCardOutlined />
                      <span>Auto-pay</span>
                    </div>
                    
                    <Divider className="my-3" />
                    
                    <div>
                      <span className="font-medium text-gray-700 text-sm">Features:</span>
                      <div className="mt-2 grid grid-cols-1 gap-1">
                        {plan.plan_metadata &&
                          Object.entries(plan.plan_metadata).slice(0, 6).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-xs text-gray-600">
                              <span className="font-medium">{k}:</span>
                              <span>{v}</span>
                            </div>
                          ))}
                        {Object.keys(plan.plan_metadata).length > 6 && (
                          <div className="text-xs text-blue-600 mt-1">
                            +{Object.keys(plan.plan_metadata).length - 6} more features
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right Column - Change Password */}
          <div>
            <h2 className="text-lg sm:text-xl font-medium mb-4">Change Password</h2>
            <Card bordered={false} className="shadow-md">
              <Form
                form={form}
                layout="vertical"
                onFinish={handlePasswordChange}
                requiredMark={false}
                size="middle"
              >
                <Form.Item label="Email" name="email" initialValue={userEmail} rules={[{ required: true }]}>
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: "Please enter your new password" }]}
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
                    { required: true, message: "Please confirm your new password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match"));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>
                <Form.Item className="mb-0">
                  <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>

        {/* Plan Switching Modal */}
        <Modal
          title="Switch Your Plan"
          open={planModalVisible}
          onCancel={() => {
            setPlanModalVisible(false);
            setSelectedPlan(null);
          }}
          footer={null}
          width={900}
          className="plan-switching-modal"
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Choose a plan that best fits your needs. You can upgrade or downgrade at any time.
            </p>
            
            {/* Current Plan Badge */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircleOutlined className="text-blue-600" />
                <span className="font-medium text-blue-800">Current Plan: {currentPlan?.plan_nickname}</span>
              </div>
            </div>
          </div>

          {loadingPlans ? (
            <div className="text-center py-8">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Loading available plans...</p>
            </div>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {availablePlans.map((plan) => {
                  isCurrentPlan = plan.id === currentPlanId;
                  const isSelected = selectedPlan?.id === plan.id;
                  
                  return (
                    <Col xs={24} sm={12} lg={6} key={plan.id}>
                      <Card
                        className={`h-full cursor-pointer transition-all ${
                          isSelected 
                            ? 'ring-2 ring-blue-500 shadow-lg' 
                            : 'hover:shadow-md'
                        } ${isCurrentPlan ? 'border-blue-300 bg-blue-50' : ''}`}
                        onClick={() => !isCurrentPlan && setSelectedPlan(plan)}
                      >
                        <div className="text-center">
                          <div className="mb-3">
                            <Tag 
                              color={getTierColor(plan)} 
                              icon={getTierIcon(plan)}
                              className="text-sm font-medium"
                            >
                              {plan.nickname}
                            </Tag>
                            <div className="mt-1">
                              <Tag color="default" className="text-xs">
                                {getTierName(plan)}
                              </Tag>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <span className="text-2xl font-bold">
                              {formatPrice(plan.unit_amount, plan.currency)}
                            </span>
                            <span className="text-gray-500">/month</span>
                          </div>

                          {isCurrentPlan && (
                            <Badge 
                              status="processing" 
                              text="Current Plan" 
                              className="mb-3"
                            />
                          )}

                          <div className="text-left">
                            <h4 className="font-medium text-gray-800 mb-2">Key Features:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {Object.entries(plan.metadata).slice(0, 4).map(([key, value]) => (
                                <li key={key} className="flex items-start gap-2">
                                  <CheckCircleOutlined className="text-green-500 text-xs mt-0.5 flex-shrink-0" />
                                  <span className="text-xs">{key}: {value}</span>
                                </li>
                              ))}
                              {Object.keys(plan.metadata).length > 4 && (
                                <li className="text-xs text-blue-600">
                                  +{Object.keys(plan.metadata).length - 4} more features
                                </li>
                              )}
                            </ul>
                          </div>

                          {!isCurrentPlan && (
                            <Button
                              type={isSelected ? "primary" : "default"}
                              className="w-full mt-4"
                              disabled={!isSelected}
                            >
                              {isSelected ? (
                                isUpgrade(plan) ? "Upgrade" : "Downgrade"
                              ) : (
                                "Select Plan"
                              )}
                            </Button>
                          )}
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              {selectedPlan && !isCurrentPlan && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">
                        Switch to {selectedPlan.nickname}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {isUpgrade(selectedPlan) 
                          ? `You'll be charged ${formatPrice(getPriceDifference(selectedPlan), selectedPlan.currency)} immediately`
                          : "Changes will take effect at your next billing cycle"
                        }
                      </p>
                    </div>
                    <Button
                      type="primary"
                      loading={switchingPlan}
                      onClick={handlePlanSwitch}
                      className="ml-4"
                    >
                      {isUpgrade(selectedPlan) ? "Upgrade Now" : "Downgrade"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal>
      </div>
    </AuthGuard>
  );
};

export default SettingsPage;
