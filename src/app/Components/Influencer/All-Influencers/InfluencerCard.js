import React from "react";
import { Button, Tag, Tooltip, Avatar } from "antd";
import { CheckCircleFilled, EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";

// Helper to get display name from string or object
const getDisplayName = (val) => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.name) return val.name;
  return '';
};

export default function InfluencerCard({ influencer, onAddToBucket, onAddToCampaign }) {
  // Main category/tag
  const mainCategory = influencer.contentCategories?.[0] || "Influencer";
  // Verified badge logic (customize as needed)
  const isVerified = influencer.verified || influencer.isVerified;
  // Location
  const city = getDisplayName(influencer.city);
  const country = getDisplayName(influencer.country);
  // Avatar initials fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials(influencer.fullName);

  return (
    <div
      className="bg-white rounded-2xl shadow flex flex-col md:flex-row items-center p-4 gap-4 min-h-[220px] h-full w-full max-w-full"
      style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.04)' }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center">
        <Avatar
          src={influencer.profilePicture}
          size={80}
          style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }}
        >
          {initials}
        </Avatar>
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col justify-between w-full">
        {/* Top tag */}
        <div className="flex items-center gap-2 mb-1">
          <Tag color="#e9d8fd" className="font-medium text-xs px-3 py-1 rounded-full" style={{ color: '#7c3aed', background: '#f3e8ff', border: 'none' }}>
            {mainCategory}
          </Tag>
        </div>
        {/* Name, badge, and location */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-semibold text-base text-color">
            {influencer.fullName || 'Unknown Name'}
          </span>
          {isVerified && (
            <Tooltip title="Verified Influencer">
              <CheckCircleFilled style={{ color: '#52c41a', fontSize: 18 }} />
            </Tooltip>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-xs mb-2">
          {influencer.rate && (
            <span className="font-medium">${influencer.rate}/hr</span>
          )}
          {(city || country) && (
            <span className="flex items-center gap-1">
              <EnvironmentOutlined />
              {city}{city && country ? ',' : ''} {country}
            </span>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href={`/brand/influencer-discovery/influencerProfile/${influencer.id}`}>
            <Button
              className="rounded-full px-4 font-medium border border-gray-300 bg-white hover:bg-gray-50"
              size="small"
            >
              View profile
            </Button>
          </Link>
          <Button
            className="rounded-full px-4 font-medium border border-primary text-primary bg-white hover:bg-primary hover:text-white"
            size="small"
            onClick={onAddToBucket}
          >
            Add to Bucket
          </Button>
          <Button
            className="rounded-full px-4 font-medium border border-secondary text-secondary bg-white hover:bg-secondary hover:text-white"
            size="small"
            onClick={onAddToCampaign}
          >
            Add to Campaign
          </Button>
          <Tooltip title="Chat with this influencer">
            <Link href={`/brand/chat/${influencer.id}`}>
              <Button
                icon={<MailOutlined />}
                className="rounded-full border border-gray-300 bg-white hover:bg-gray-50"
                size="small"
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
} 