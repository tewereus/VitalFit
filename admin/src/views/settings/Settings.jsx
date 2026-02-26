import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCog,
  FaShieldAlt,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
  FaSpinner,
  FaGlobe,
  FaTools,
  FaDatabase,
} from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { toast } from "react-hot-toast";
import MaintenanceModal from "../../components/MaintenanceModal";

// Helper function to combine class names conditionally
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const maintenance = {
  isEnabled: false,
  message: "We are currently performing maintenance. Please check back later.",
  allowAdminAccess: true,
  startTime: "2026-02-09T07:19:38.984Z",
  endTime: null,
  updatedBy: "66ffd63e1160aa94cc77cdc0",
  affectedRoles: ["user", "manager", "printer", "rider"],
  showWarning: false,
  warningMessage:
    "The system will be undergoing maintenance soon. Please save your work.",
  warningPeriod: 15,
};

const Settings = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("general");
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [isSubmittingAdminPassword, setIsSubmittingAdminPassword] =
    useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState(null);
  const [adminActionDescription, setAdminActionDescription] = useState("");

  // Open maintenance mode modal
  const openMaintenanceModal = () => {
    setShowMaintenanceModal(true);
  };

  // Close maintenance mode modal
  const closeMaintenanceModal = () => {
    setShowMaintenanceModal(false);
  };

  const openAdminPasswordModalForAction = (description, action) => {
    setAdminActionDescription(description);
    setPendingAdminAction(() => action);
    setAdminPasswordInput("");
    setAdminPasswordError("");
    setShowAdminPasswordModal(true);
  };

  const handleAdminPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!adminPasswordInput.trim()) {
      setAdminPasswordError("Password is required");
      return;
    }

    if (!pendingAdminAction) {
      setShowAdminPasswordModal(false);
      return;
    }

    setIsSubmittingAdminPassword(true);
    try {
      await pendingAdminAction(adminPasswordInput.trim());
      setShowAdminPasswordModal(false);
      setAdminPasswordInput("");
      setAdminPasswordError("");
    } finally {
      setIsSubmittingAdminPassword(false);
    }
  };

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Maintenance Mode Modal */}
      <MaintenanceModal
        isOpen={showMaintenanceModal}
        onClose={closeMaintenanceModal}
        currentStatus={maintenance}
      />

      <main
        className={cn(
          "p-4 sm:p-6 md:p-8 transition-opacity duration-500 opacity-100",
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <FaCog className="text-teal-500 dark:text-teal-400 mr-3 text-4xl" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Settings
            </h1>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200",
                    activeTab === tab.id
                      ? "text-teal-500 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400",
                  )}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <FaCog className="mr-2 text-teal-500 dark:text-teal-400" />
                  General Settings
                </h2>

                <div className="space-y-6">
                  {/* Maintenance Mode */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                          <FaGlobe className="mr-2 text-teal-500 dark:text-teal-400" />
                          Maintenance Mode
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Enable maintenance mode to temporarily disable the
                          site for visitors
                        </p>
                      </div>
                      <button
                        onClick={openMaintenanceModal}
                        className={cn(
                          "p-2 rounded-lg text-white transition-colors",
                          maintenance?.isEnabled
                            ? "bg-teal-500 hover:bg-teal-600"
                            : "bg-gray-400 hover:bg-gray-500",
                        )}
                      >
                        {maintenance?.isEnabled ? (
                          <FaToggleOn size={24} />
                        ) : (
                          <FaToggleOff size={24} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Admin Password Confirmation Modal */}
      {showAdminPasswordModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          style={{ zIndex: 999 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiLock className="text-amber-500 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Confirm Your Password
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For security reasons, please enter your admin password to confirm{" "}
              {adminActionDescription}
            </p>

            <form onSubmit={handleAdminPasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="admin-password"
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    if (adminPasswordError) {
                      setAdminPasswordError("");
                    }
                  }}
                  className={`block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 py-2.5 px-4 text-base ${
                    adminPasswordError
                      ? "border-red-500 dark:border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                  disabled={isSubmittingAdminPassword}
                />
                {adminPasswordError && (
                  <p className="mt-1 text-sm text-red-500">
                    {adminPasswordError}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminPasswordModal(false);
                    setAdminPasswordInput("");
                    setAdminPasswordError("");
                  }}
                  disabled={isSubmittingAdminPassword}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAdminPassword}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 rounded-md shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmittingAdminPassword ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
