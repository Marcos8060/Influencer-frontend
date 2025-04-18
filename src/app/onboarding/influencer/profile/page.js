'use client'
import React from "react";
import LeftBar from "@/app/Components/Influencer/profile/LeftBar";
import RightBar from "@/app/Components/Influencer/profile/RightBar";
import SplashScreen from "@/app/Components/SplashScreen";
import { useProtectedRoute } from "@/assets/hooks/authGuard";

const InfluencerProfile = () => {
  const isAuthorized = useProtectedRoute();

  if (!isAuthorized) {
    return null;
  }
  return (
    <section className="md:flex gap-4 justify-between md:space-y-0 space-y-4">
      <div className="md:w-3/12 w-full">
        <LeftBar />
      </div>
      <div className="md:w-9/12 w-full">
        <RightBar />
      </div>
    </section>
  );
};

export default InfluencerProfile;
