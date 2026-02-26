import React from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaChartLine,
} from "react-icons/fa";

// Gold theme mock data
const mockStats = {
  total: { count: 1200 },
  active: { count: 950, percentage: 79 },
  blocked: { count: 50, percentage: 4 },
  newMembers: { count: 90, trend: 12 },
};

const MemberDashboard = () => {
  // Use mockStats only
  const stats = mockStats;
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Members */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Members
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.total?.count || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Active Members */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-200 dark:bg-yellow-800/30 text-yellow-700 dark:text-yellow-300 mr-4">
              <FaUserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Members
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.active?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.active?.percentage || 0}% of total members
              </p>
            </div>
          </div>
        </div>

        {/* Blocked Members */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-4">
              <FaUserTimes className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Blocked Members
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.blocked?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.blocked?.percentage || 0}% of total members
              </p>
            </div>
          </div>
        </div>

        {/* New Members (This Month) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-300 dark:bg-yellow-700/30 text-yellow-800 dark:text-yellow-200 mr-4">
              <FaUserClock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                New Members (This Month)
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatNumber(stats?.newMembers?.count || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stats?.newMembers?.trend > 0 ? "+" : ""}
                {stats?.newMembers?.trend || 0}% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
