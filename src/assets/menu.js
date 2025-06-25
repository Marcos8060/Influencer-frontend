import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaUsersGear } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaBoxOpen } from "react-icons/fa";

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
    path: "/onboarding/brand/dashboard/search-influencers",
    icon: <FaUsersGear />,
    role: ["Brand"],
    // children: [
    //   {
    //     label: "Influencer Discovery",
    //     path: "/brand/influencer-discovery",
    //     icon: <GoDotFill className="text-xs" />,
    //     role: ["Brand"],
    //   },
    //   {
    //     label: "Influencer Discovery",
    //     path: "/onboarding/brand/dashboard/search-influencers",
    //     icon: <GoDotFill className="text-xs" />,
    //     role: ["Brand"],
    //   },
    // ],
  },
  {
    label: "Buckets",
    path: "/brand/buckets",
    icon: <FaBoxOpen />,
    role: ["Brand"],
  },
  {
    label: "Brand Discovery",
    path: "/onboarding/influencer/buckets",
    icon: <FaUsersGear />,
    role: ["Influencer"],
  },
  {
    label: "Campaigns",
    path: "/brand/create-campaign",
    icon: <MdCampaign className="text-xl" />,
    role: ["Brand"],
    children: [
      {
        label: "Create Campaigns",
        path: "/brand/create-campaign",
        icon: <GoDotFill className="text-xs" />,
        role: ["Brand"],
      },
      {
        label: "View Campaigns",
        path: "/brand/view-campaigns",
        icon: <GoDotFill className="text-xs" />,
        role: ["Brand"],
      },
    ],
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
    label: "My Profile",
    path: "/onboarding/brand/brand-profile",
    icon: <FaUserEdit />,
    role: ["Brand"],
  },
  // {
  //   label: "Opportunities",
  //   path: "",
  //   icon: <FaCarAlt />,
  //   role: ["Influencer", "Brand"],
  // },
  {
    label: "Collaboration",
    path: "/",
    icon: <FaUsers />,
    role: ["Influencer", "Brand"],
  },
  {
    label: "Inbox",
    path: "/onboarding/brand/chat-box",
    icon: <FaMessage />,
    role: ["Brand"],
  },
  {
    label: "Inbox",
    path: "/onboarding/influencer/chat-box",
    icon: <FaMessage />,
    role: ["Influencer"],
  },
  {
    label: "Settings",
    path: "/",
    icon: <IoMdSettings />,
    role: ["Influencer", "Brand"],
  },
];
