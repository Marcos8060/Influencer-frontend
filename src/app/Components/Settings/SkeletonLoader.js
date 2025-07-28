import React from "react";
import { Card, Skeleton, Divider } from "antd";

const SubscriptionSkeleton = () => (
  <div className="space-y-4">
    <Skeleton.Input
      active
      size="large"
      style={{ width: "60%", height: 24 }}
      className="mb-4"
    />
    <Card bordered={false} className="shadow-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton.Input
            active
            size="small"
            style={{ width: "40%" }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: "15%" }}
          />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton.Input
            active
            size="small"
            style={{ width: "30%" }}
          />
          <Skeleton.Input
            active
            size="small"
            style={{ width: "20%" }}
          />
        </div>
        <Divider className="my-3" />
        <div>
          <Skeleton.Input
            active
            size="small"
            style={{ width: "25%" }}
            className="mb-2"
          />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: "35%" }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: "20%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const PasswordFormSkeleton = () => (
  <Card bordered={false} className="shadow-md">
    <div className="space-y-4">
      <Skeleton.Input
        active
        size="small"
        style={{ width: "100%" }}
      />
      <Skeleton.Input
        active
        size="small"
        style={{ width: "100%" }}
      />
      <Skeleton.Input
        active
        size="small"
        style={{ width: "100%" }}
      />
      <Skeleton.Input
        active
        size="small"
        style={{ width: "100%" }}
      />
    </div>
  </Card>
);

export { SubscriptionSkeleton, PasswordFormSkeleton }; 