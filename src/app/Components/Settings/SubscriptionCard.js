import React from "react";
import { Card, Tag, Button, Divider } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const SubscriptionCard = ({
  subscription,
  plan,
  onSwitchPlan,
  isHistory = false,
  getPlanMetadata,
  getPlanFeaturesCount,
  formatPrice,
  formatDate,
}) => {
  if (!subscription || !plan) return null;

  return (
    <Card
      key={subscription.subscription_id}
      title={
        <div className="flex justify-between items-center">
          <span className={isHistory ? "text-sm font-medium" : ""}>
            {plan.plan_nickname || "Subscription"}
          </span>
          <Tag
            color={subscription.canceled_at ? "red" : "green"}
            icon={subscription.canceled_at ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
            size={isHistory ? "small" : "default"}
          >
            {subscription.canceled_at ? "Canceled" : "Active"}
          </Tag>
        </div>
      }
      bordered={false}
      className={`shadow-md mb-4 ${isHistory ? "shadow-sm bg-gray-50" : ""}`}
      size={isHistory ? "small" : "default"}
      extra={
        !isHistory && (
          <button
            onClick={onSwitchPlan}
            className="bg-gradient-to-br text-xs from-primary to-secondary text-white rounded px-2 py-1 flex items-center gap-1"
          >
            <ReloadOutlined />
            Switch Plan
          </button>
        )
      }
    >
      <div className={isHistory ? "space-y-2" : "space-y-3"}>
        <div className="flex justify-between items-center">
          <span className={`font-medium ${isHistory ? "text-sm" : "text-lg font-semibold"}`}>
            {formatPrice(plan.plan_amount, plan.plan_currency)}
          </span>
          <span className={`text-gray-500 ${isHistory ? "text-xs" : ""}`}>
            / {plan.plan_interval}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600" style={{ fontSize: isHistory ? "12px" : "14px" }}>
          <CalendarOutlined />
          <span>
            {isHistory
              ? subscription.canceled_at
                ? `Canceled: ${formatDate(subscription.canceled_at)}`
                : `Created: ${formatDate(plan.created_at)}`
              : `Renews: ${formatDate(plan.current_period_end)}`}
          </span>
        </div>

        {!isHistory && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCardOutlined />
            <span>Auto-pay</span>
          </div>
        )}

        {!isHistory && <Divider className="my-3" />}

        {!isHistory ? (
          <div>
            <span className="font-medium text-gray-700 text-sm">Features:</span>
            <div className="mt-2 grid grid-cols-1 gap-1">
              {(() => {
                const metadata = getPlanMetadata(plan);
                const features = Object.entries(metadata).slice(0, 6);
                return features.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span className="font-medium">{k}:</span>
                    <span>{v}</span>
                  </div>
                ));
              })()}
              {getPlanFeaturesCount(plan) > 6 && (
                <div className="text-xs text-blue-600 mt-1">
                  +{getPlanFeaturesCount(plan) - 6} more features
                </div>
              )}
            </div>
          </div>
        ) : (
          getPlanFeaturesCount(plan) > 0 && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Features:</span>{" "}
              {getPlanFeaturesCount(plan)} features
            </div>
          )
        )}
      </div>
    </Card>
  );
};

export default SubscriptionCard; 