"use client";
import React, { useEffect, useState } from "react";
import { MdCampaign } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { useProtectedRoute } from "@/assets/hooks/authGuard";
import SplashScreen from "@/app/Components/SplashScreen";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import StatsCards from "@/app/Components/Brand/DashboardStats/StatsCards";
import CampaignsChart from "@/app/Components/Brand/DashboardStats/CampaignsChart";
import { fetchAllBrandCampaigns } from "@/redux/features/stepper/campaign-stepper";
import ApplicantsStatusChart from "@/app/Components/Brand/DashboardStats/ApplicantsStatusChart";
import ProductsPerCampaignChart from "@/app/Components/Brand/DashboardStats/ProductsPerCampaignChart";
import ApplicantsPerCampaignChart from "@/app/Components/Brand/DashboardStats/ApplicantsPerCampaignChart";

const Dashboard = () => {
  const { brandCampaigns } = useSelector((store) => store.campaign);
  const [loading, setLoading] = useState(false);
  const isAuthorized = useProtectedRoute();
  const auth = useAuth();
  const dispatch = useDispatch();

  // Calculate stats
  const totalCampaigns = Array.isArray(brandCampaigns) ? brandCampaigns.length : 0;
  const allCollaborators = Array.isArray(brandCampaigns)
    ? brandCampaigns.flatMap((c) => c.collaborators || [])
    : [];
  const totalApplicants = allCollaborators.length;
  const pendingApplicants = allCollaborators.filter((c) => c.status === "pending").length;
  const totalProducts = Array.isArray(brandCampaigns)
    ? brandCampaigns.reduce((acc, c) => acc + (c.products ? c.products.length : 0), 0)
    : 0;

  // Placeholder for engagement rate (if available in data)
  const engagementRate = null;

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      await dispatch(fetchAllBrandCampaigns(auth));
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchCampaigns();
    }
  }, [auth]);

  if (isAuthorized === null) {
    return <SplashScreen />;
  }

  if (!isAuthorized) {
    return null;
  }

  // Skeleton loader
  if (loading || !brandCampaigns) {
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-32" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80 w-full" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <StatsCards
        totalCampaigns={totalCampaigns}
        totalApplicants={totalApplicants}
        pendingApplicants={pendingApplicants}
        totalProducts={totalProducts}
        engagementRate={engagementRate}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
        <CampaignsChart brandCampaigns={brandCampaigns} />
        <ApplicantsStatusChart brandCampaigns={brandCampaigns} />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
        <ProductsPerCampaignChart brandCampaigns={brandCampaigns} />
        <ApplicantsPerCampaignChart brandCampaigns={brandCampaigns} />
      </div>
    </div>
  );
};

export default Dashboard;
