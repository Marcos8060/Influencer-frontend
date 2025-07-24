"use client";
import React, { useState } from "react";
import { Card, Tag, Button, Modal, Tooltip } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  LockOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { SiTiktok } from "react-icons/si";
import AuthGuard from "@/assets/hooks/authGuard";

// Replace this with your actual API/redux data when ready
const subscriptionData = {
  subscriptions: [
    {
      subscription_id: "sub_1RnN7BKf9rQfCgnfnWVP1u2J",
      billing_mode_type: { type: "classic" },
      cancel_at: null,
      cancel_at_period_end: false,
      canceled_at: null,
      cancellation_details: { comment: null, feedback: null, reason: null },
      collection_method: "charge_automatically",
      default_payment_method: "pm_1RnN79Kf9rQfCgnfPEn6hqZM",
      items: [
        {
          subscription_item_id: "si_SiokWYdK47pob7",
          created_at: 1753117380,
          current_period_end: 1755795780,
          current_period_start: 1753117380,
          plan_id: "price_1RluDYKf9rQfCgnfMV41knv4",
          plan_nickname: "Disovery",
          plan_amount: 0,
          plan_currency: "usd",
          plan_interval: "month",
          plan_metadata: {
            "Browse influencers": "View profiles",
            "Campaign creation": "1 saved",
            "Geographic targeting": "Basic suggestions",
          },
          plan_product_id: "prod_ShInXlB3HI05aW",
        },
      ],
    },
    {
      subscription_id: "sub_1RlukwKf9rQfCgnfEqMfDTaR",
      billing_mode_type: { type: "classic" },
      cancel_at: null,
      cancel_at_period_end: false,
      canceled_at: null,
      cancellation_details: { comment: null, feedback: null, reason: null },
      collection_method: "charge_automatically",
      default_payment_method: "pm_1RlukuKf9rQfCgnf5MQwpUtk",
      items: [
        {
          subscription_item_id: "si_ShJNcQWnAHwM9Z",
          created_at: 1752770041,
          current_period_end: 1755451819,
          current_period_start: 1752773419,
          plan_id: "price_1RluEvKf9rQfCgnfMtDvK5om",
          plan_nickname: "Nationwide plan",
          plan_amount: 8900,
          plan_currency: "usd",
          plan_interval: "month",
          plan_metadata: {
            "Advanced search filters": "true",
            Analytics: "Audience demographics",
            "Browse influencers": "true",
            "Campaign creation": "Up to 5",
            "Contact details access": "true",
            "Creator collaborations": "Up to 10",
            "Geographic targeting": "All UK creators",
            "Monthly invites": "300",
            "ROI modelling": "true",
            "UK Brand Spotlight": "true",
          },
          plan_product_id: "prod_ShInXlB3HI05aW",
        },
      ],
    },
    {
      subscription_id: "sub_1RlsOrKf9rQfCgnfI9ztk5J6",
      billing_mode_type: { type: "classic" },
      cancel_at: null,
      cancel_at_period_end: false,
      canceled_at: null,
      cancellation_details: { comment: null, feedback: null, reason: null },
      collection_method: "charge_automatically",
      default_payment_method: "pm_1RlsOpKf9rQfCgnfTtgPkBdx",
      items: [
        {
          subscription_item_id: "si_ShGwPDWZg8Bdse",
          created_at: 1752760984,
          current_period_end: 1755439383,
          current_period_start: 1752760983,
          plan_id: "price_1Rlpm5Kf9rQfCgnfxLVhtnYY",
          plan_nickname: null,
          plan_amount: 8900,
          plan_currency: "usd",
          plan_interval: "month",
          plan_metadata: {},
          plan_product_id: "prod_ShDeDkxOCeymkU",
        },
      ],
    },
    {
      subscription_id: "sub_1RlsJIKf9rQfCgnfBGyEr827",
      billing_mode_type: { type: "classic" },
      cancel_at: null,
      cancel_at_period_end: false,
      canceled_at: null,
      cancellation_details: { comment: null, feedback: null, reason: null },
      collection_method: "charge_automatically",
      default_payment_method: "pm_1RlsJGKf9rQfCgnf6Mcu4o8V",
      items: [
        {
          subscription_item_id: "si_ShGrt3esda4BbG",
          created_at: 1752760639,
          current_period_end: 1755439039,
          current_period_start: 1752760639,
          plan_id: "price_1RlnkGKf9rQfCgnfVRST5Dsa",
          plan_nickname: null,
          plan_amount: 4900,
          plan_currency: "usd",
          plan_interval: "month",
          plan_metadata: {},
          plan_product_id: "prod_ShC6hrS0GtdAbR",
        },
      ],
    },
    {
      subscription_id: "sub_1Rlo7CKf9rQfCgnfLJ48H54z",
      billing_mode_type: { type: "classic" },
      cancel_at: null,
      cancel_at_period_end: false,
      canceled_at: null,
      cancellation_details: { comment: null, feedback: null, reason: null },
      collection_method: "charge_automatically",
      default_payment_method: "pm_1Rlo7AKf9rQfCgnfZA68iQOR",
      items: [
        {
          subscription_item_id: "si_ShCWwiwlYMeZmc",
          created_at: 1752744513,
          current_period_end: 1755422913,
          current_period_start: 1752744513,
          plan_id: "price_1RlnkGKf9rQfCgnfVRST5Dsa",
          plan_nickname: null,
          plan_amount: 4900,
          plan_currency: "usd",
          plan_interval: "month",
          plan_metadata: {},
          plan_product_id: "prod_ShC6hrS0GtdAbR",
        },
      ],
    },
  ],
};

const subscriptions = subscriptionData.subscriptions.map((sub) => {
  const item = sub.items[0] || {};
  return {
    subscription_id: sub.subscription_id,
    plan_nickname: item.plan_nickname,
    plan_amount: item.plan_amount,
    plan_currency: item.plan_currency,
    plan_interval: item.plan_interval,
    plan_metadata: item.plan_metadata,
    status: sub.cancel_at_period_end ? "cancelling" : "active",
    cancel_at_period_end: sub.cancel_at_period_end,
    current_period_end: item.current_period_end,
  };
});

function formatPrice(amount, currency) {
  if (amount === 0) return "Free";
  return `${(amount / 100).toLocaleString(undefined, {
    style: "currency",
    currency: currency && currency.toUpperCase(),
  })}`;
}

function formatDateFromUnix(unix) {
  if (!unix) return "N/A";
  const date = new Date(unix * 1000);
  return date.toLocaleDateString();
}

const SettingsPage = () => {
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [downgradeModal, setDowngradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Change password state
  const [changePwd, setChangePwd] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // Social accounts state (dummy for now)
  const [socials, setSocials] = useState({
    instagram: false,
    tiktok: false,
    youtube: false,
  });
  const [socialLoading, setSocialLoading] = useState({});

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setUpgradeModal(true);
  };
  const handleDowngrade = (plan) => {
    setSelectedPlan(plan);
    setDowngradeModal(true);
  };

  const handlePwdChange = (e) => {
    setChangePwd({ ...changePwd, [e.target.name]: e.target.value });
  };
  const handlePwdSubmit = async () => {
    setPwdLoading(true);
    setTimeout(() => {
      setPwdLoading(false);
      setPwdSuccess(true);
      setChangePwd({ current: "", new: "", confirm: "" });
      setTimeout(() => setPwdSuccess(false), 2000);
    }, 1200);
  };

  const handleSocialToggle = (platform) => {
    setSocialLoading((prev) => ({ ...prev, [platform]: true }));
    setTimeout(() => {
      setSocials((prev) => ({ ...prev, [platform]: !prev[platform] }));
      setSocialLoading((prev) => ({ ...prev, [platform]: false }));
    }, 800);
  };

  // Extract unique plans for upgrade/downgrade section
  const uniquePlans = Array.from(
    new Map(
      subscriptions.map((sub) => [sub.plan_nickname || "Custom Plan", sub])
    ).values()
  );

  return (
    <AuthGuard>
      <div className="w-full py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Account & Subscription Settings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Subscriptions Section */}
          <div className="col-span-1 flex flex-col gap-6">
            <h2 className="text-xl font-bold mb-2 text-primary">
              Your Active Subscriptions
            </h2>
            {subscriptions.length === 0 && (
              <div className="text-gray-500">
                No active subscriptions found.
              </div>
            )}
            {subscriptions.map((sub) => (
              <Card
                key={sub.subscription_id}
                className="rounded-xl border border-input bg-white shadow-sm"
                bodyStyle={{ padding: 20 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-primary">
                      {sub.plan_nickname || "Custom Plan"}
                    </span>
                    <Tag color={sub.status === "active" ? "green" : "red"}>
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </Tag>
                    {sub.cancel_at_period_end && (
                      <Tag color="orange">Cancels at period end</Tag>
                    )}
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {formatPrice(sub.plan_amount, sub.plan_currency)}
                    <span className="ml-2 text-gray-500 text-base font-normal">
                      / {sub.plan_interval}
                    </span>
                  </div>
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  <strong>Next renewal:</strong>{" "}
                  {formatDateFromUnix(sub.current_period_end)}
                </div>
                <div className="mb-2">
                  <strong>Features:</strong>
                  <ul className="list-disc ml-6 mt-1 text-gray-700">
                    {sub.plan_metadata &&
                    Object.entries(sub.plan_metadata).length > 0 ? (
                      Object.entries(sub.plan_metadata).map(([key, value]) => (
                        <li key={key} className="mb-1 flex items-center gap-2">
                          <CheckCircleOutlined className="text-green-500" />
                          <span className="font-medium">{key}:</span>{" "}
                          <span>{value}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">
                        No extra features listed.
                      </li>
                    )}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
          {/* Account Management Section */}
          <div className="col-span-1 flex flex-col gap-8">
            {/* Change Password */}
            <div className="bg-white rounded-xl shadow border border-input p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                <LockOutlined /> Change Password
              </h2>
              <div className="space-y-4">
                <input
                  type="password"
                  name="current"
                  value={changePwd.current}
                  onChange={handlePwdChange}
                  placeholder="Current password"
                  className="w-full border border-input rounded px-4 py-2"
                />
                <input
                  type="password"
                  name="new"
                  value={changePwd.new}
                  onChange={handlePwdChange}
                  placeholder="New password"
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="password"
                  name="confirm"
                  value={changePwd.confirm}
                  onChange={handlePwdChange}
                  placeholder="Confirm new password"
                  className="w-full border rounded px-4 py-2"
                />
                <Button
                  type="primary"
                  loading={pwdLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  onClick={handlePwdSubmit}
                  disabled={
                    pwdLoading ||
                    !changePwd.current ||
                    !changePwd.new ||
                    changePwd.new !== changePwd.confirm
                  }
                >
                  Save Password
                </Button>
                {pwdSuccess && (
                  <div className="text-green-600 text-center mt-2">
                    Password changed successfully!
                  </div>
                )}
              </div>
            </div>
            {/* Social Accounts - Only Instagram and TikTok, Disconnect only */}
            <div className="bg-white rounded-xl shadow border border-input p-6">
              <h2 className="text-lg font-bold mb-4 text-primary">
                Social Accounts
              </h2>
              <div className="flex flex-col gap-6">
                {/* Instagram */}
                <div className="flex items-center justify-between bg-gradient-to-r from-[#E1306C]/10 to-[#F77737]/10 rounded-lg px-6 py-4">
                  <div className="flex items-center gap-3">
                    <InstagramOutlined className="text-3xl text-pink-500" />
                    <span className="text-lg font-semibold">Instagram</span>
                    {socials.instagram && <Tag color="green">Connected</Tag>}
                  </div>
                  <Button
                    type="primary"
                    danger
                    loading={socialLoading.instagram}
                    className="bg-gradient-to-r from-pink-500 to-pink-400 text-white border-none"
                    onClick={() => handleSocialToggle("instagram")}
                    disabled={!socials.instagram}
                  >
                    Disconnect
                  </Button>
                </div>
                {/* TikTok */}
                <div className="flex items-center justify-between bg-gradient-to-r from-black/10 to-gray-800/10 rounded-lg px-6 py-4">
                  <div className="flex items-center gap-3">
                    <SiTiktok className="text-3xl text-black" />
                    <span className="text-lg font-semibold">TikTok</span>
                    {socials.tiktok && <Tag color="green">Connected</Tag>}
                  </div>
                  <Button
                    type="primary"
                    danger
                    loading={socialLoading.tiktok}
                    className="bg-gradient-to-r from-black to-gray-800 text-white border-none"
                    onClick={() => handleSocialToggle("tiktok")}
                    disabled={!socials.tiktok}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- Available Plans Section --- */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4 text-primary">
            Available Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uniquePlans.map((plan) => (
              <Card
                key={plan.plan_nickname || "Custom Plan"}
                className="rounded-xl border border-input bg-white shadow-sm"
                bodyStyle={{ padding: 20 }}
              >
                <div className="flex flex-col gap-2 mb-2">
                  <span className="text-lg font-semibold text-primary">
                    {plan.plan_nickname || "Custom Plan"}
                  </span>
                  <div className="text-xl font-bold text-primary">
                    {formatPrice(plan.plan_amount, plan.plan_currency)}
                    <span className="ml-2 text-gray-500 text-base font-normal">
                      / {plan.plan_interval}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Features:</strong>
                  <ul className="list-disc ml-6 mt-1 text-gray-700">
                    {plan.plan_metadata &&
                    Object.entries(plan.plan_metadata).length > 0 ? (
                      Object.entries(plan.plan_metadata).map(([key, value]) => (
                        <li key={key} className="mb-1 flex items-center gap-2">
                          <CheckCircleOutlined className="text-green-500" />
                          <span className="font-medium">{key}:</span>{" "}
                          <span>{value}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">
                        No extra features listed.
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    icon={<ArrowUpOutlined />}
                    className="bg-gradient-to-r from-primary to-secondary text-white border-none"
                    onClick={() => handleUpgrade(plan)}
                  >
                    Upgrade
                  </Button>
                  <Button
                    icon={<ArrowDownOutlined />}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-none"
                    onClick={() => handleDowngrade(plan)}
                  >
                    Downgrade
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* Upgrade Modal */}
        <Modal
          open={upgradeModal}
          onCancel={() => setUpgradeModal(false)}
          footer={null}
          centered
          title="Upgrade Subscription"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Upgrade Plan</h2>
            <p className="mb-4">
              Upgrade from{" "}
              <strong>{selectedPlan?.plan_nickname || "Custom Plan"}</strong> to
              a higher tier. (Demo only)
            </p>
            <Button
              type="primary"
              className="bg-gradient-to-r from-primary to-secondary text-white"
              onClick={() => setUpgradeModal(false)}
            >
              Confirm Upgrade
            </Button>
          </div>
        </Modal>
        {/* Downgrade Modal */}
        <Modal
          open={downgradeModal}
          onCancel={() => setDowngradeModal(false)}
          footer={null}
          centered
          title="Downgrade Subscription"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Downgrade Plan</h2>
            <p className="mb-4">
              Downgrade from{" "}
              <strong>{selectedPlan?.plan_nickname || "Custom Plan"}</strong> to
              a lower tier. (Demo only)
            </p>
            <Button
              type="primary"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
              onClick={() => setDowngradeModal(false)}
            >
              Confirm Downgrade
            </Button>
          </div>
        </Modal>
      </div>
    </AuthGuard>
  );
};

export default SettingsPage;
