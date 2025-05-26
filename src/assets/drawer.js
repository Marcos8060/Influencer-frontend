'use client'
import { AiOutlineClose } from "react-icons/ai";
import MenuChildren from '@/app/Components/Onboarding/Brand/dashboard/MenuChildren';
import menu from '../assets/menu'
import { useContext } from "react";
import { authContext } from "./context/use-context";

export const Drawer = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const { user } = useContext(authContext)

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-opacity-50 z-40 transition-opacity md:hidden"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer Content */}
      <div 
        className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden"
      >
        <div className="h-full flex flex-col">
          {/* Drawer Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-input">
            {/* <Logo /> */}
            <h1>Logo</h1>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <AiOutlineClose className="text-xl text-primary" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <MenuChildren collapsed={false} />
          </nav>

          {/* User Profile - Optional */}
          <div className="p-4 border-t border-input">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-semibold text-gray-500">Welcome {user?.firstName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};