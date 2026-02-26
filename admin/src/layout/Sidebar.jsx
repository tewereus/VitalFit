import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/enhanced-scrollbar.css";
import {
  FaChartBar,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaMoneyBillWave,
  FaUserShield,
} from "react-icons/fa";

const Sidebar = ({ onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  const isActive = (path) => {
    if (path === "dashboard") {
      return location.pathname === "/admin";
    }
    return location.pathname.includes(path);
  };

  const MenuItem = ({ icon: Icon, text, onClick, isOpen, children, badge }) => {
    const isMenuActive = isActive(text?.toLowerCase());

    const handleClick = () => {
      onClick();
      // Close sidebar on mobile when navigating to a page (not dropdown)
      if (isMobile && !children) {
        onClose();
      }
    };

    return (
      <div className="mb-1">
        <button
          onClick={handleClick}
          className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
            isMenuActive && !children
              ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/20"
          }`}
        >
          <Icon
            className={`w-5 h-5 mr-3 ${
              isMenuActive && !children
                ? "text-teal-500 dark:text-teal-400"
                : ""
            }`}
          />
          <span className="flex-1 text-left">{text}</span>
          {badge && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2">
              {badge}
            </span>
          )}
          {children && (
            <span className="transform transition-transform duration-200">
              {isOpen ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
        </button>
        {children && isOpen && (
          <div className="ml-4 mt-1 space-y-1">{children}</div>
        )}
      </div>
    );
  };

  const SubMenuItem = ({ to, text }) => (
    <Link
      to={to}
      onClick={() => isMobile && onClose()}
      className={`block px-4 py-2 rounded-lg transition-colors ${
        isActive(to)
          ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {text}
    </Link>
  );

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-md enhanced-scrollbar">
      <div className="p-4 space-y-2">
        <MenuItem
          icon={FaChartBar}
          text="Dashboard"
          onClick={() => navigate("/admin")}
        />

        <MenuItem
          icon={FaUsers}
          text="Users"
          onClick={() => {
            setIsUsersOpen(!isUsersOpen);
          }}
          isOpen={isUsersOpen}
        >
          <SubMenuItem to="members" text="Members" />
          <SubMenuItem to="staffs" text="Staffs" />
          <SubMenuItem to="trainers" text="Trainers" />
        </MenuItem>

        <MenuItem
          icon={FaMoneyBillWave}
          text="Transactions"
          onClick={() => {
            navigate("transactions");
          }}
          isOpen={isTransactionsOpen}
        />
        <MenuItem
          icon={FaCog}
          text="Settings"
          onClick={() => navigate("settings")}
        />

        <MenuItem
          icon={FaUserShield}
          text="Security"
          onClick={() => {
            setIsSecurityOpen(!isSecurityOpen);
            setIsUsersOpen(false);
          }}
          isOpen={isSecurityOpen}
        >
          <SubMenuItem to="sessions" text="Session Management" />
        </MenuItem>
      </div>
    </div>
  );
};

export default Sidebar;
