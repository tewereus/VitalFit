import React from "react";
import {
  FaUserTimes,
  FaUserCheck,
  FaUserClock,
  FaPrint,
  FaMotorcycle,
  FaUsers,
} from "react-icons/fa";

const ManagerDashboard = ({ stats }) => {
  // Format numbers with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Staff */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Staff
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.total?.count || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Active Staff */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
              <FaUserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Staff
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.active?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.active?.percentage || 0}% of total managers
              </p>
            </div>
          </div>
        </div>

        {/* Total Printers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-red-600 dark:text-red-400 mr-4">
              <FaUserTimes className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Inactive Staff
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.inactive?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.inactive?.percentage || 0}% of total managers
              </p>
            </div>
          </div>
        </div>

        {/* Total Riders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
              <FaUserClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                New Staff
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.new?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.new?.percentage || 0}% of total managers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
