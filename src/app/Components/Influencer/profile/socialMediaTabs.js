import React from "react";
import { Card, Tabs, Badge, Typography, Col } from "antd";

const { Text } = Typography;
import { InstagramOutlined, TikTokOutlined } from "@ant-design/icons";
import InstagramProfile from "./instagram-profile";
import TiktokProfile from "./tiktok-profile";

const { TabPane } = Tabs;

const SocialMediaTabs = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "instagram",
      label: (
        <span className="flex items-center gap-2">
          <InstagramOutlined style={{ fontSize: "18px" }} />
          <span>Instagram</span>
          {/* <Badge count={6} style={{ backgroundColor: "#ff3b5c" }} /> */}
        </span>
      ),
      children: (
        <>
          <InstagramProfile />
        </>
      ),
    },
    {
      key: "tiktok",
      label: (
        <span className="flex items-center gap-2">
          <TikTokOutlined style={{ fontSize: "18px" }} />
          <span>TikTok</span>
          {/* <Badge count={6} style={{ backgroundColor: "#25F4EE" }} /> */}
        </span>
      ),
      children: (
        <>
          <TiktokProfile />
        </>
      ),
    },
  ];

  return (
    <Col xs={24} md={16}>
      <Card title="Recent Content">
        <Tabs defaultActiveKey="instagram" items={items} onChange={onChange} />
      </Card>
    </Col>
  );
};

export default SocialMediaTabs;
