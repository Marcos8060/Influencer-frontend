import React from "react";
import { Row, Col } from "antd";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionHistory = ({
  customerSubscriptions,
  getPlanMetadata,
  getPlanFeaturesCount,
  formatPrice,
  formatDate,
}) => {
  if (!customerSubscriptions || customerSubscriptions.length <= 1) {
    return null;
  }

  const historicalSubscriptions = customerSubscriptions.slice(1);

  return (
    <div className="mt-8">
      <h2 className="text-lg sm:text-xl font-medium mb-4">
        Subscription History
      </h2>
      <Row gutter={[16, 16]}>
        {historicalSubscriptions.map((sub, idx) => {
          const plan = sub.items?.[0];
          if (!plan) return null;

          return (
            <Col xs={24} sm={12} md={8} key={sub.subscription_id}>
              <SubscriptionCard
                subscription={sub}
                plan={plan}
                isHistory={true}
                getPlanMetadata={getPlanMetadata}
                getPlanFeaturesCount={getPlanFeaturesCount}
                formatPrice={formatPrice}
                formatDate={formatDate}
              />
            </Col>
          );
        }).filter(Boolean)}
      </Row>
    </div>
  );
};

export default SubscriptionHistory; 