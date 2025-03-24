'use client'
import React,{ useState } from 'react'
import Sidebar from "@/app/Components/Onboarding/Brand/dashboard/InfluencerSidebar";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import InfluencerCustomizedHeader from '@/app/Components/Onboarding/Brand/dashboard/influencer/CustomizedHeader';

export default function DashboardLayout({ children }) {
    const [collapse, setCollapse] = useState(false);
  
    const icon = collapse ? (
      <RiArrowRightDoubleFill className="text-primary cursor-pointer bg-background p-1 rounded-full h-8 w-8" />
    ) : (
      <RiArrowLeftDoubleFill className="text-primary cursor-pointer text-2xl bg-background rounded-full h-8 w-8" />
    );

  return (
    <div className="flex h-screen flex-row md:overflow-hidden bg-background">
      <section className={`flex-none ${collapse ? 'w-16' : 'w-64'}`}>
        <Sidebar {...{ collapse, setCollapse, icon }} />
      </section>
      <section className="w-full overflow-y-auto">
        <InfluencerCustomizedHeader />
        <div className="flex-grow py-6 px-2 md:px-6 md:py-6 ">
          {children}
        </div>
      </section>
    </div>
  );
}