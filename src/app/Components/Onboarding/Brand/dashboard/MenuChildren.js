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
    <div className="space-y-2">
      {filteredMenus.map((item, index) => {
        const isParentOpen = openIndex === index;
        const hasActiveChild = item.children?.some(child => child.path === currentPath);
        const showChildren = isParentOpen || hasActiveChild;
        const Icon = showChildren ? IoChevronDownOutline : IoChevronForward;

        return (
          <div key={index} className="relative">
            {!item.children ? (
              <Link
                href={item.path}
                className={`group flex items-center ${
                  collapse ? "justify-center px-2" : "px-4"
                } py-3 rounded-xl transition-all duration-200 ${
                  currentPath === item.path
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-gray hover:bg-gray-50"
                }`}
              >
                <span className={`text-xl ${
                  currentPath === item.path
                    ? "text-white"
                    : "text-gray group-hover:text-primary"
                }`}>
                  {item.icon}
                </span>
                {!collapse && (
                  <span className={`ml-3 text-sm font-medium ${
                    currentPath === item.path
                      ? "text-white"
                      : "text-gray group-hover:text-primary"
                  }`}>
                    {item.label}
                  </span>
                )}
                {currentPath === item.path && !collapse && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => handleMenuToggle(index)}
                  className={`group w-full flex items-center justify-between ${
                    collapse ? "px-2" : "px-4"
                  } py-3 rounded-xl transition-all duration-200 ${
                    hasActiveChild
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`text-xl ${
                      hasActiveChild
                        ? "text-primary"
                        : "text-gray group-hover:text-primary"
                    }`}>
                      {item.icon}
                    </span>
                    {!collapse && (
                      <span className={`ml-3 text-sm font-medium ${
                        hasActiveChild
                          ? "text-primary"
                          : "text-gray group-hover:text-primary"
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!collapse && (
                    <Icon className={`text-sm transition-transform duration-200 ${
                      showChildren ? "rotate-180" : ""
                    } ${
                      hasActiveChild
                        ? "text-primary"
                        : "text-gray group-hover:text-primary"
                    }`} />
                  )}
                </button>

                {showChildren && !collapse && (
                  <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.path}
                        className={`group flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                          currentPath === child.path
                            ? "bg-primary/10 text-primary"
                            : "text-gray hover:bg-gray-50"
                        }`}
                      >
                        <span className={`text-sm ${
                          currentPath === child.path
                            ? "text-primary"
                            : "text-gray group-hover:text-primary"
                        }`}>
                          {child.icon}
                        </span>
                        <span className={`ml-3 text-sm ${
                          currentPath === child.path
                            ? "font-medium text-primary"
                            : "text-gray group-hover:text-primary"
                        }`}>
                          {child.label}
                        </span>
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