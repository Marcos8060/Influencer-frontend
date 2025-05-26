'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatLayout = ({ 
  sidebar, 
  mainContent, 
  isMobile, 
  showSidebar, 
  onToggleSidebar 
}) => {
  return (
    <div className="h-[calc(100vh-64px)] flex bg-background">
      {/* Sidebar for chat list */}
      <AnimatePresence>
        {(showSidebar || !isMobile) && (
          <motion.div
            initial={isMobile ? { x: -300 } : false}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              ${isMobile ? 'absolute z-30' : 'relative'}
              w-80 h-full bg-white border-r border-input
              flex flex-col
            `}
          >
            {sidebar}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full relative">
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        {mainContent}
      </div>
    </div>
  );
};

export default ChatLayout; 