"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { menu } from "@/assets/menu";
import { useAuth } from "@/assets/hooks/use-auth";
import { jwtDecode } from "jwt-decode";

const BrandMenuChildren = ({ collapse }) => {
  const currentPath = usePathname();
  const auth = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [filteredMenus, setFilteredMenus] = useState([]);

  // Initialize filtered menus and open state
  useEffect(() => {
    if (auth) {
      try {
        const user = typeof auth === "string" ? jwtDecode(auth) : null;
        const filtered = menu.filter((item) => 
          item.role.includes(user?.roleName)
        );
        setFilteredMenus(filtered);

        // Find and set initially open parent based on current path
        const parentIndex = filtered.findIndex(item => 
          item.children?.some(child => child.path === currentPath)
        );
        if (parentIndex !== -1) {
          setOpenIndex(parentIndex);
        }
      } catch (err) {
        console.error("Failed to decode auth token:", err);
      }
    }
  }, [auth, currentPath]);

  const handleMenuToggle = (index) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {filteredMenus.map((item, index) => {
        const isParentOpen = openIndex === index;
        const hasActiveChild = item.children?.some(child => child.path === currentPath);
        const showChildren = isParentOpen || hasActiveChild;
        const Icon = showChildren ? IoChevronDownOutline : IoChevronForward;

        return (
          <div key={index} className="space-y-2">
            {!item.children ? (
              <Link
                href={item.path}
                className={`flex items-center ${collapse ? "justify-center" : "gap-4"} ${
                  currentPath === item.path
                    ? "bg-gradient-to-r from-primary to-secondary rounded-3xl px-3 py-3 text-background"
                    : "text-color hover:bg-gray-100 rounded-3xl px-3 py-3"
                }`}
              >
                <span>{item.icon}</span>
                {!collapse && <span className="text-sm">{item.label}</span>}
              </Link>
            ) : (
              <>
                <div
                  onClick={() => handleMenuToggle(index)}
                  className={`flex items-center justify-between cursor-pointer p-3 rounded-3xl ${
                    hasActiveChild ? "bg-gray-100" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4 text-color">
                    <span>{item.icon}</span>
                    {!collapse && <span className="text-sm">{item.label}</span>}
                  </div>
                  {!collapse && <Icon className="text-color" />}
                </div>

                {showChildren && (
                  <div className="pl-8 space-y-2">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.path}
                        className={`flex items-center gap-2 p-2 rounded-3xl ${
                          currentPath === child.path
                            ? "bg-primary text-white"
                            : "text-color hover:bg-gray-100"
                        }`}
                      >
                        <span>{child.icon}</span>
                        <span className="text-sm">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BrandMenuChildren;