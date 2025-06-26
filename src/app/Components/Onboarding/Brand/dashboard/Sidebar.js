"use client";
import MenuChildren from "./MenuChildren";
import Image from "next/image";
import { useContext } from "react";
import { authContext } from "@/assets/context/use-context";
import { LogoutOutlined } from "@ant-design/icons";

const Sidebar = ({ collapse, setCollapse, icon }) => {
  const { logoutBrand, logoutInfluencer, user } = useContext(authContext);
  const toggleSidebar = () => {
    setCollapse(!collapse);
  };

  const handleLogout = () => {
    if (user?.roleName === "Brand") {
      logoutBrand();
    } else if (user?.roleName === "Influencer") {
      logoutInfluencer();
    } else {
      // fallback: try both
      logoutBrand();
      logoutInfluencer();
    }
  };

  return (
    <section className="bg-white shadow-lg h-screen transition-all duration-300 relative">
      {/* Logo Section */}
      <div className="h-[10vh] flex items-center justify-center px-6 border-b border-input">
        {!collapse && (
          <div className="flex items-center space-x-2">
            {/* Replace with your actual logo */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <h1 className="text-color font-bold text-xl">Influencer</h1>
          </div>
        )}
        {collapse && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute -right-3 top-16 bg-white rounded-full p-1 shadow-md border border-input transition-all duration-300 hover:bg-gray-50 ${
          collapse ? "rotate-180" : ""
        }`}
      >
        {icon}
      </button>

      {/* Menu Items */}
      <div className="space-y-4 py-6 px-4">
        <MenuChildren {...{ collapse }} />
      </div>

      {/* Bottom Section */}
      {!collapse && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-sm text-red-600 border border-input rounded-xl py-3 flex items-center justify-center gap-2"
          >
            <LogoutOutlined className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
