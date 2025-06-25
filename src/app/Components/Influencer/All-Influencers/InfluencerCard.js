import React from "react";
import { Button, Tag, Tooltip, Avatar, Checkbox, Badge } from "antd";
import {
  CheckCircleFilled,
  EnvironmentOutlined,
  MailOutlined,
  TeamOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

// Helper to get display name from string or object
const getDisplayName = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.name) return val.name;
  return "";
};

export default function InfluencerCard({
  influencer,
  onAddToBucket,
  onAddToCampaign,
  isSelected = false,
  onSelect = null,
  showCheckbox = false,
  bucketList = [],
  brandCampaigns = [],
}) {
  // Main category/tag
  const mainCategory = influencer.contentCategories?.[0] || "Influencer";
  // Verified badge logic (customize as needed)
  const isVerified = influencer.verified || influencer.isVerified;
  // Location
  const city = getDisplayName(influencer.city);
  const country = getDisplayName(influencer.country);

  // Check if influencer is in any bucket
  const isInBucket = bucketList.some((bucket) =>
    bucket.influencers.some((inf) => inf.id === influencer.influencerId)
  );

  // Check if influencer is in any campaign
  const isInCampaign = brandCampaigns.some((campaign) =>
    campaign.collaborators.some(
      (collab) => collab.influencer === influencer.influencerId
    )
  );

  // Avatar initials fallback
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials(influencer.fullName);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        className={`bg-white rounded-2xl shadow flex flex-col md:flex-row items-center p-4 gap-4 min-h-[220px] h-full w-full max-w-full relative transition-all duration-200 ${
          isSelected 
            ? "ring-1 ring-primary ring-opacity-60 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary shadow-sm transform scale-[1.02]" 
            : "hover:shadow-md"
        }`}
        style={{ 
          boxShadow: isSelected 
            ? "0 4px 16px rgba(59, 130, 246, 0.08), 0 2px 8px rgba(0,0,0,0.04)" 
            : "0 4px 24px 0 rgba(0,0,0,0.04)"
        }}
      >
        {/* Selection Checkbox */}
        {showCheckbox && (
          <div className="absolute top-3 left-3 z-10">
            <Checkbox
              className="scale-125"
              checked={isSelected}
              onChange={(e) =>
                onSelect && onSelect(influencer.influencerId, e.target.checked)
              }
            />
          </div>
        )}
        
        {/* Status indicators - moved to top right */}
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          {isInBucket && (
            <Tag 
              color="blue" 
              className="text-xs flex items-center gap-1 font-semibold px-3 py-1 rounded-full shadow-sm border-0"
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <TeamOutlined />
              In Bucket
            </Tag>
          )}
          {isInCampaign && (
            <Tag 
              color="green" 
              className="text-xs flex items-center gap-1 font-semibold px-3 py-1 rounded-full shadow-sm border-0"
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <ShoppingOutlined />
              In Campaign
            </Tag>
          )}
        </div>

        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          <Avatar
            src={influencer.profilePicture}
            size={80}
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
          >
            {initials}
          </Avatar>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between w-full">
          {/* Top tag */}
          {/* Status indicators - removed from here */}

          {/* Name, badge, and location */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-base text-color">
              {influencer.fullName || "Unknown Name"}
            </span>
            {isVerified && (
              <Tooltip title="Verified Influencer">
                <CheckCircleFilled style={{ color: "#52c41a", fontSize: 18 }} />
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
                {city}
                {city && country ? "," : ""} {country}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            <Link
              href={`/onboarding/brand/dashboard/influencerProfile/${influencer.influencerId}`}
            >
              <Button
                className="rounded-full px-4 font-medium border border-gray-300 bg-white hover:bg-gray-50"
                size="small"
              >
                View profile
              </Button>
            </Link>
            <button
              className={`rounded px-4 font-medium border ${
                isInBucket
                  ? "border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed"
                  : "border-primary text-primary bg-white hover:bg-primary hover:text-white"
              }`}
              size="small"
              onClick={!isInBucket ? onAddToBucket : undefined}
              disabled={isInBucket}
            >
              {isInBucket ? "In Bucket" : "Add to Bucket"}
            </button>
            <button
              className={`rounded px-4 font-medium border ${
                isInCampaign
                  ? "border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed"
                  : "border-secondary text-secondary bg-white hover:bg-secondary hover:text-white"
              }`}
              size="small"
              onClick={!isInCampaign ? onAddToCampaign : undefined}
              disabled={isInCampaign}
            >
              {isInCampaign ? "In Campaign" : "Add to Campaign"}
            </button>
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
    </div>
  );
}

