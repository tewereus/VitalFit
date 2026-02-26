import React from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaChartLine,
} from "react-icons/fa";

const UserDashboard = ({ stats }) => {
  // Format numbers with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.total?.count || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-4">
              <FaUserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Users
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.active?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.active?.percentage || 0}% of total users
              </p>
            </div>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-4">
              <FaUserTimes className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Blocked Users
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.blocked?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.blocked?.percentage || 0}% of total users
              </p>
            </div>
          </div>
        </div>

        {/* New Users (This Month) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
              <FaUserClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                New Users (This Month)
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.newUsers?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.newUsers?.trend > 0 ? "+" : ""}
                {stats?.newUsers?.trend || 0}% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
