"use client";
import MenuChildren from "./MenuChildren";
import Image from "next/image";

const Sidebar = ({ collapse, setCollapse, icon }) => {
  const toggleSidebar = () => {
    setCollapse(!collapse);
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
          <div className="bg-background rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-semibold">?</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-color">Need Help?</h3>
                <p className="text-xs text-gray">Contact support</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
