import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

export const menu = [
  {
    label: "Dashboard",
    path: "/onboarding/brand/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    label: "Opportunities",
    path: "/onboarding/brand/dashboard",
    icon: <FaCarAlt />,
  },
  {
    label: "Collaboration",
    path: "/onboarding/brand/dashboard",
    icon: <FaUsers />,
  },
  {
    label: "Invitations",
    path: "/onboarding/brand/dashboard",
    icon: <FaCarAlt />,
  },
  {
    label: "Content",
    path: "/onboarding/brand/dashboard",
    icon: <FaCarAlt />,
  },
  {
    label: "Inbox",
    path: "/onboarding/brand/dashboard",
    icon: <FaMessage />,
  },
  {
    label: "Settings",
    path: "/onboarding/brand/dashboard",
    icon: <IoMdSettings />,
  },
];
