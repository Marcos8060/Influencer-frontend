import React from "react";
import { Card, Button } from "antd";
import {
  RocketOutlined,
  GiftOutlined,
  StarOutlined,
  CrownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const NoPlanFallback = ({ onChoosePlan }) => {
  return (
    <Card
      className="shadow-md mb-4 border-dashed border-2 border-gray-300 bg-gradient-to-r from-blue-50 to-purple-50"
      bordered={false}
    >
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <RocketOutlined className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Choose a plan to unlock the full potential of our influencer
            marketing platform. Start discovering and collaborating with
            influencers today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <GiftOutlined className="text-2xl text-green-500 mb-2" />
            <h4 className="font-medium text-gray-800">Free Discovery</h4>
            <p className="text-sm text-gray-600">
              Browse influencers and view profiles
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <StarOutlined className="text-2xl text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-800">Premium Features</h4>
            <p className="text-sm text-gray-600">
              Advanced analytics and campaign tools
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <CrownOutlined className="text-2xl text-purple-500 mb-2" />
            <h4 className="font-medium text-gray-800">Global Reach</h4>
            <p className="text-sm text-gray-600">
              Access to worldwide influencer network
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="primary"
            size="large"
            onClick={onChoosePlan}
            icon={<RocketOutlined />}
            className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700"
          >
            Choose Your Plan
          </Button>
          <Button
            size="large"
            onClick={onChoosePlan}
            icon={<InfoCircleOutlined />}
          >
            View All Plans
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <InfoCircleOutlined />
            <span className="font-medium">
              New users get 14 days free trial on any paid plan!
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NoPlanFallback; 