'use client'
import React,{ useState } from 'react'
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";
import BrandCustomizedHeader from '@/app/Components/Onboarding/Brand/dashboard/brand/CustomizedHeader';
import Sidebar from '@/app/Components/Onboarding/Brand/dashboard/Sidebar';
import { Drawer } from '@/assets/drawer';

export default function CustomizedLayout({ children }) {
    const [collapse, setCollapse] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    const icon = collapse ? (
      <RiArrowRightDoubleFill className="text-primary cursor-pointer bg-background p-1 rounded-full h-8 w-8" />
    ) : (
      <RiArrowLeftDoubleFill className="text-primary cursor-pointer text-2xl bg-background rounded-full h-8 w-8" />
    );

  return (
    <div className="flex h-screen flex-row md:overflow-hidden bg-background">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white shadow-lg"
        aria-label="Open menu"
      >
        <RiMenu2Fill className="text-2xl text-primary" />
      </button>

      {/* Mobile Drawer */}
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />

      {/* Desktop Sidebar */}
      <section className={`hidden md:block flex-none ${collapse ? 'w-16' : 'w-64'}`}>
        <Sidebar {...{ collapse, setCollapse, icon }} />
      </section>

      {/* Main Content */}
      <section className="w-full overflow-y-auto">
        <BrandCustomizedHeader />
        <div className="flex-grow py-6 px-2 md:px-6 md:py-6">
          {children}
        </div>
      </section>
    </div>
  );
}