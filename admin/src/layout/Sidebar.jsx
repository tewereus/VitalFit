import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/enhanced-scrollbar.css";
import {
  FaChartBar,
  FaUsers,
  FaBoxes,
  FaWarehouse,
  FaMapMarkerAlt,
  FaPalette,
  FaImages,
  FaChevronDown,
  FaSignOutAlt,
  FaChevronRight,
  FaTicketAlt,
  FaTextHeight,
  FaCog,
  FaMoneyBillWave,
  FaChartLine,
  FaShoppingCart,
  FaKey,
  FaUserShield,
  FaShieldAlt,
  FaTachometerAlt,
  FaHandshake,
  FaBullhorn,
} from "react-icons/fa";

const Sidebar = ({ onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  const isActive = (path) => {
    if (!path) {
      return false;
    }
    if (path === "dashboard") {
      return location.pathname === "/admin";
    }
    return location.pathname.includes(path);
  };

  const MenuItem = ({
    icon: Icon,
    text,
    onClick,
    isOpen,
    children,
    badge,
    activePath,
  }) => {
    const isMenuActive = isActive(activePath || text?.toLowerCase());

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
          className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
            isMenuActive && !children
              ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/20"
          }`}
        >
          <Icon
            className={`w-5 h-5 mr-2 ${
              isMenuActive && !children
                ? "text-teal-500 dark:text-teal-400"
                : ""
            }`}
          />
          <span className="flex-1 text-left">{text}</span>
          {badge && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
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

  const SubMenuItem = ({ to, text, state }) => (
    <Link
      to={to}
      state={state}
      onClick={() => isMobile && onClose()}
      className={`block px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
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
      <div className="px-3 py-4 sm:p-4 space-y-2">
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
          <SubMenuItem to="staff" text="Staff" />
        </MenuItem>

        <MenuItem
          icon={FaMoneyBillWave}
          text="Transactions"
          onClick={() => {
            navigate("/transactions");
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
