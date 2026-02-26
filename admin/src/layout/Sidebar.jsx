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
  const dispatch = useDispatch();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
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
            setIsImagesOpen(false);
            setIsProductsOpen(false);
            setIsAddressOpen(false);
          }}
          isOpen={isUsersOpen}
        >
          <SubMenuItem to="users" text="Users" />
          <SubMenuItem to="managers" text="Managers" />
          <SubMenuItem to="printers" text="Printers" />
          <SubMenuItem to="riders" text="Riders" />
        </MenuItem>

        <MenuItem
          icon={FaHandshake}
          text="Affiliate"
          onClick={() => navigate("affiliates")}
          badge={
            withdrawalStats?.counts?.pending > 0
              ? withdrawalStats.counts.pending
              : null
          }
        />

        <MenuItem
          icon={FaBoxes}
          text="Products"
          onClick={() => {
            setIsProductsOpen(!isProductsOpen);
            setIsUsersOpen(false);
            setIsImagesOpen(false);
            setIsAddressOpen(false);
          }}
          isOpen={isProductsOpen}
        >
          <SubMenuItem to="products" text="Products" />
          <SubMenuItem to="product-types" text="Product Types" />
          <SubMenuItem to="product-categories" text="Product Categories" />
        </MenuItem>

        <MenuItem
          icon={FaWarehouse}
          text="Inventory"
          onClick={() => navigate("inventory")}
        />

        <MenuItem
          icon={FaMapMarkerAlt}
          text="Address"
          onClick={() => {
            setIsAddressOpen(!isAddressOpen);
            setIsUsersOpen(false);
            setIsImagesOpen(false);
            setIsProductsOpen(false);
          }}
          isOpen={isAddressOpen}
        >
          <SubMenuItem to="countries" text="Countries" />
          <SubMenuItem to="regions" text="Regions" />
          <SubMenuItem to="sub-Regions" text="Sub Regions" />
          <SubMenuItem to="locations" text="Locations" />
        </MenuItem>

        <MenuItem
          icon={FaPalette}
          text="Colors"
          onClick={() => navigate("colors")}
        />

        <MenuItem
          icon={FaTextHeight}
          text="Sizes"
          onClick={() => navigate("sizes")}
        />

        <MenuItem
          icon={FaImages}
          text="Images"
          onClick={() => {
            setIsImagesOpen(!isImagesOpen);
            setIsUsersOpen(false);
            setIsProductsOpen(false);
            setIsAddressOpen(false);
          }}
          isOpen={isImagesOpen}
        >
          <SubMenuItem to="images" text="Images" />
          <SubMenuItem to="image-types" text="Image Types" />
          <SubMenuItem to="image-categories" text="Image Categories" />
        </MenuItem>

        <MenuItem
          icon={FaTicketAlt}
          text="Coupons"
          onClick={() => navigate("coupons")}
        />

        <MenuItem
          icon={FaBullhorn}
          text="Announcements"
          onClick={() => navigate("banners")}
          activePath="banners"
        />

        <MenuItem
          icon={FaMoneyBillWave}
          text="Transactions"
          onClick={() => {
            setIsTransactionsOpen(!isTransactionsOpen);
            setIsUsersOpen(false);
            setIsImagesOpen(false);
            setIsProductsOpen(false);
            setIsAddressOpen(false);
            setIsAnalyticsOpen(false);
            setIsSecurityOpen(false);
          }}
          isOpen={isTransactionsOpen}
        >
          <SubMenuItem to="transactions" text="All Transactions" />
          <SubMenuItem to="refunds" text="Refunds" />
        </MenuItem>

        <MenuItem
          icon={FaChartLine}
          text="Analytics"
          onClick={() => {
            setIsAnalyticsOpen(!isAnalyticsOpen);
            setIsUsersOpen(false);
            setIsImagesOpen(false);
            setIsProductsOpen(false);
            setIsAddressOpen(false);
          }}
          isOpen={isAnalyticsOpen}
        >
          <SubMenuItem to="analytics/orders" text="Order Analytics" />
          <SubMenuItem to="analytics/finance" text="Financial Analytics" />
        </MenuItem>

        <MenuItem
          icon={FaTachometerAlt}
          text="System Metrics"
          onClick={() => navigate("metrics")}
          activePath="metrics"
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
            setIsImagesOpen(false);
            setIsProductsOpen(false);
            setIsAddressOpen(false);
            setIsAnalyticsOpen(false);
          }}
          isOpen={isSecurityOpen}
        >
          <SubMenuItem to="sessions" text="Session Management" />
          <SubMenuItem to="audit-logs" text="Audit Logs" />
          <SubMenuItem to="ip-blocks" text="IP Blocking" />
          <SubMenuItem to="cache-monitor" text="Cache Monitor" />
        </MenuItem>
      </div>
    </div>
  );
};

export default Sidebar;
