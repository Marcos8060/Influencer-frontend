"use client";
import React, { useEffect } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import AuthGuard from "@/assets/hooks/authGuard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppliedCampaigns,
  getApprovedCampaigns,
} from "@/redux/features/stepper/campaign-stepper";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import StatsCards from "@/app/Components/Influencer/DashboardStats/StatsCards";
import StatusDistributionChart from "@/app/Components/Influencer/DashboardStats/StatusDistributionChart";
import CampaignsOverTimeChart from "@/app/Components/Influencer/DashboardStats/CampaignsOverTimeChart";
import ProductsPerCampaignChart from "@/app/Components/Influencer/DashboardStats/ProductsPerCampaignChart";
import DeadlinesChart from "@/app/Components/Influencer/DashboardStats/DeadlinesChart";
import SocialChannelsChart from "@/app/Components/Influencer/DashboardStats/SocialChannelsChart";

const InfluencerDashboard = () => {
  const { appliedCampaigns, approvedCampaigns } = useSelector(
    (store) => store.campaign
  );
  const dispatch = useDispatch();
  const auth = useAuth();

  const getCampaigns = async () => {
    try {
      await dispatch(getAppliedCampaigns(auth));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  const getApprovedCampaign = async () => {
    try {
      await dispatch(getApprovedCampaigns(auth));
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  useEffect(() => {
    if (auth) {
      getCampaigns();
      getApprovedCampaign();
    }
  }, [auth]);

  // Calculate stats
  const now = new Date();
  const in7Days = new Date(now);
  in7Days.setDate(now.getDate() + 7);
  const allCampaigns = [
    ...(appliedCampaigns || []),
    ...(approvedCampaigns || []),
  ];
  const upcomingDeadlines = allCampaigns.filter((c) => {
    const end = new Date(c.endDate);
    return end > now && end <= in7Days;
  }).length;
  const totalCollaborations = allCampaigns.length;
  // Placeholder for engagement rate
  const engagementRate = null;

  // Skeleton loader
  if (!appliedCampaigns || !approvedCampaigns) {
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-5 grid-cols-1 md:gap-8 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-2xl h-32"
            />
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-2xl h-80 w-full"
            />
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-2xl h-80 w-full"
            />
          ))}
        </div>
        <div className="grid md:grid-cols-1 grid-cols-1 gap-8 mt-8">
          <div className="bg-gray-200 animate-pulse rounded-2xl h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div>
        <StatsCards
          pendingApplications={appliedCampaigns.length}
          approvedApplications={approvedCampaigns.length}
          upcomingDeadlines={upcomingDeadlines}
          totalCollaborations={totalCollaborations}
          engagementRate={engagementRate}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          <StatusDistributionChart
            appliedCampaigns={appliedCampaigns}
            approvedCampaigns={approvedCampaigns}
          />
          <CampaignsOverTimeChart
            appliedCampaigns={appliedCampaigns}
            approvedCampaigns={approvedCampaigns}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          <ProductsPerCampaignChart
            appliedCampaigns={appliedCampaigns}
            approvedCampaigns={approvedCampaigns}
          />
          <DeadlinesChart
            appliedCampaigns={appliedCampaigns}
            approvedCampaigns={approvedCampaigns}
          />
        </div>
        <div className="grid md:grid-cols-1 grid-cols-1 gap-8 mt-8">
          <SocialChannelsChart
            appliedCampaigns={appliedCampaigns}
            approvedCampaigns={approvedCampaigns}
          />
        </div>
      </div>
    </AuthGuard>
  );
};

export default InfluencerDashboard;
