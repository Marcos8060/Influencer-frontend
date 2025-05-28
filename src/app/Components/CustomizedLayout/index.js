'use client'
import React, { useState, useEffect } from 'react'
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import BrandCustomizedHeader from '@/app/Components/Onboarding/Brand/dashboard/brand/CustomizedHeader';
import Sidebar from '@/app/Components/Onboarding/Brand/dashboard/Sidebar';
import { Drawer } from '@/assets/drawer';
import { menu } from "@/assets/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/assets/hooks/use-auth";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomizedLayout({ children }) {
    const [collapse, setCollapse] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedParentMenu, setSelectedParentMenu] = useState(null);
    const currentPath = usePathname();
    const auth = useAuth();
    const [mainMenus, setMainMenus] = useState([]);
    const [moreMenus, setMoreMenus] = useState([]);
  
    const icon = collapse ? (
      <RiArrowRightDoubleFill className="text-primary cursor-pointer bg-background p-1 rounded-full h-8 w-8" />
    ) : (
      <RiArrowLeftDoubleFill className="text-primary cursor-pointer text-2xl bg-background rounded-full h-8 w-8" />
    );

    // Filter and organize menu items
    useEffect(() => {
      if (auth) {
        try {
          const user = typeof auth === "string" ? jwtDecode(auth) : null;
          const filtered = menu.filter((item) => item.role.includes(user?.roleName));
          
          // Get the first 4 important menus for the bottom nav
          const mainNavMenus = filtered.filter(item => 
            item.label === "Dashboard" || 
            item.label === "Campaigns" || 
            item.label === "Influencers" ||
            item.label === "Inbox"
          );
          
          setMainMenus(mainNavMenus);
          setMoreMenus(filtered.filter(item => !mainNavMenus.includes(item)));
        } catch (err) {
          console.error("Failed to decode auth token:", err);
        }
      }
    }, [auth]);

    const handleMoreClick = () => {
      setMobileMenuOpen(true);
      setSelectedParentMenu(null);
    };

    const handleMenuItemClick = (item) => {
      if (item.children) {
        setSelectedParentMenu(item);
        setMobileMenuOpen(true);
      } else if (item.path) {
        // If it's a direct link item, navigate to it
        window.location.href = item.path;
        setMobileMenuOpen(false);
      }
    };

    const handleBack = () => {
      if (selectedParentMenu) {
        setSelectedParentMenu(null);
      } else {
        setMobileMenuOpen(false);
      }
    };

    const isMenuActive = (item) => {
      if (item.path === currentPath) return true;
      if (item.children) {
        return item.children.some(child => child.path === currentPath);
      }
      return false;
    };

    const getDefaultChildPath = (item) => {
      if (item.children && item.children.length > 0) {
        return item.children[0].path;
      }
      return item.path;
    };

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <section className={`hidden md:block flex-none ${collapse ? 'w-16' : 'w-64'}`}>
        <Sidebar {...{ collapse, setCollapse, icon }} />
      </section>

      {/* Main Content */}
      <section className="w-full overflow-y-auto pb-16 md:pb-0">
        <BrandCustomizedHeader />
        <div className="flex-grow p-4 md:p-6">
          {children}
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
        <div className="flex items-center justify-around h-16">
          {mainMenus.map((item, index) => (
            <Link
              key={index}
              href={getDefaultChildPath(item)}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault();
                  handleMenuItemClick(item);
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${
                isMenuActive(item)
                  ? "text-primary"
                  : "text-gray hover:text-primary"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              {item.children && isMenuActive(item) && (
                <span className="absolute -top-1 right-1/4 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
          <button
            onClick={handleMoreClick}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray hover:text-primary"
          >
            <span className="text-xl">
              <RiMenu2Fill />
            </span>
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => !selectedParentMenu && setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-input">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-50 rounded-full"
                >
                  {selectedParentMenu ? <IoChevronBack size={24} /> : <IoClose size={24} />}
                </button>
                <h2 className="font-semibold text-color">
                  {selectedParentMenu ? selectedParentMenu.label : 'More Options'}
                </h2>
                <div className="w-10" /> {/* Spacer for alignment */}
              </div>

              {/* Menu Content */}
              <div className="overflow-y-auto max-h-[70vh]">
                {selectedParentMenu ? (
                  // Show children of selected menu
                  <div className="p-4 space-y-2">
                    {selectedParentMenu.children.map((child, index) => (
                      <Link
                        key={index}
                        href={child.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                          currentPath === child.path
                            ? "bg-primary/10 text-primary"
                            : "text-gray hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xl">{child.icon}</span>
                        <span className="font-medium">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Show more menu items
                  <div className="p-4 space-y-2">
                    {moreMenus.map((item, index) => (
                      item.children ? (
                        // Items with children - show as expandable
                        <button
                          key={index}
                          onClick={() => handleMenuItemClick(item)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                            isMenuActive(item)
                              ? "bg-primary/10 text-primary"
                              : "text-gray hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <IoChevronBack className="rotate-180" size={20} />
                        </button>
                      ) : (
                        // Items without children - show as direct links
                        <Link
                          key={index}
                          href={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                            currentPath === item.path
                              ? "bg-primary/10 text-primary"
                              : "text-gray hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Safe Area */}
              <div className="h-safe-area bg-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}