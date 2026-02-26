import React, { useState, useEffect } from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useResponsive } from "../hooks/useResponsive";
import "../styles/responsive-layout.css";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Consider both mobile and tablet as "small screens" that need overlay sidebar
  const isSmallScreen = isMobile || isTablet;

  // Close sidebar when clicking outside on small screens
  useEffect(() => {
    if (isSmallScreen && isSidebarOpen) {
      const handleClickOutside = (event) => {
        const sidebar = document.getElementById("sidebar");
        const hamburger = document.querySelector(
          '[aria-label="Toggle sidebar"]'
        );

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          hamburger &&
          !hamburger.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSmallScreen, isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex pt-16">
        {/* Small Screen Overlay */}
        {isSmallScreen && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-50
                     bg-white dark:bg-gray-800 border-r border-gray-200
                     dark:border-gray-700 transition-all duration-300 ease-in-out
                     shadow-sm transform
                     ${
                       isSmallScreen
                         ? isSidebarOpen
                           ? "translate-x-0"
                           : "-translate-x-full"
                         : "translate-x-0"
                     }`}
        >
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            isMobile={isSmallScreen}
          />
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300
                         ${isSmallScreen ? "ml-0" : "ml-64"}
                         ${isMobile ? "p-2" : isTablet ? "p-4" : "p-6 lg:p-8"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm
                          border border-gray-200 dark:border-gray-700
                          ${isMobile ? "p-3" : isTablet ? "p-4" : "p-6"}`}
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
