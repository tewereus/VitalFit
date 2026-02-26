// ViewManager.js
import React from "react";
import {
  FiX,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiMapPin,
  FiGrid,
} from "react-icons/fi";

const ViewManager = ({ setIsView, selectedUser }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500";
      case "waiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500";
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl h-[85vh] flex flex-col enhanced-scrollbar">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Manager Details
          </h2>
          <button
            onClick={() => setIsView(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200 rounded-full hover:bg-gray-100 
                     dark:hover:bg-gray-700 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiUser className="w-12 h-12 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                ID
              </label>
              <p className="font-medium dark:text-white">
                {selectedUser.unique_id}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Full Name
              </label>
              <p className="font-medium dark:text-white">
                {selectedUser.fullname}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </label>
              <div className="flex items-center space-x-2">
                <FiMail className="text-gray-400" />
                <p className="font-medium dark:text-white">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Mobile
              </label>
              <div className="flex items-center space-x-2">
                <FiPhone className="text-gray-400" />
                <p className="font-medium dark:text-white">
                  {selectedUser.mobile}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </label>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  selectedUser.status,
                )}`}
              >
                {selectedUser.status}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Main Status
              </label>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  selectedUser.main_status,
                )}`}
              >
                {selectedUser.main_status}
              </span>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiMapPin /> Address Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Country
                </label>
                <p className="font-medium dark:text-white">
                  {selectedUser.address?.country?.country_name || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Region
                </label>
                <p className="font-medium dark:text-white">
                  {selectedUser.address?.region?.region_name || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-gray-400">
                  Sub Region
                </label>
                <p className="font-medium dark:text-white">
                  {selectedUser.address?.subRegion?.subregion_name || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Work Area Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiGrid /> Work Area
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedUser.workArea.map((area, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  {area.subregion_name || "N/A"}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Preference Mode
              </label>
              <p className="font-medium dark:text-white capitalize">
                {selectedUser.preference.mode}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Language
              </label>
              <p className="font-medium dark:text-white uppercase">
                {selectedUser.preference.language}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Total Sales
              </label>
              <p className="font-medium dark:text-white">{selectedUser.sold}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Created At
              </label>
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-gray-400" />
                <p className="font-medium dark:text-white">
                  {new Date(selectedUser.createdAt.$date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end">
          <button
            onClick={() => setIsView(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                     dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewManager;
