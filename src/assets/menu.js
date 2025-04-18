import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaUsersGear } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";

export const menu = [
  {
    label: "Dashboard",
    path: "/onboarding/brand/dashboard",
    icon: <BiSolidDashboard />,
    role: ["Brand"],
  },
  {
    label: "Dashboard",
    path: "/onboarding/influencer/dashboard",
    icon: <BiSolidDashboard />,
    role: ["Influencer"],
  },
  {
    label: "Influencer Discovery",
    path: "/brand/influencer-discovery",
    icon: <FaUsersGear />,
    role: ["Brand"],
  },
  {
    label: "Create Campaign",
    path: "/brand/create-campaign",
    icon: <MdCampaign className="text-xl" />,
    role: ["Brand"],
  },
  {
    label: "Campaigns",
    path: "/onboarding/influencer/dashboard/campaigns",
    icon: <MdCampaign />,
    role: ["Influencer"],
  },
  {
    label: "My Profile",
    path: "/onboarding/influencer/profile",
    icon: <FaUserEdit />,
    role: ["Influencer"],
  },
  {
    label: "Opportunities",
    path: "",
    icon: <FaCarAlt />,
    role: ["Influencer", "Brand"],
  },
  {
    label: "Collaboration",
    path: "",
    icon: <FaUsers />,
    role: ["Influencer", "Brand"],
  },
  {
    label: "Inbox",
    path: "",
    icon: <FaMessage />,
    role: ["Influencer", "Brand"],
  },
  {
    label: "Settings",
    path: "",
    icon: <IoMdSettings />,
    role: ["Influencer", "Brand"],
  },
];
