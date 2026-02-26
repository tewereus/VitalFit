import React from "react";
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
  FaUser,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const UserSummary = () => {
  // Get user stats from Redux store (placeholder for now)
  const { users } = useSelector((state) => state.users);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  // Calculate some basic stats from available user data
  const activeUsers = users?.filter((user) => !user.isBlocked)?.length || 0;
  const blockedUsers = users?.filter((user) => user.isBlocked)?.length || 0;
  const totalUsers = users?.length || 0;

  // Calculate percentages
  const activePercentage =
    totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const blockedPercentage =
    totalUsers > 0 ? Math.round((blockedUsers / totalUsers) * 100) : 0;

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "blocked":
        return "Blocked";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status) {
      case "active":
        return "text-teal-600 dark:text-teal-400";
      case "blocked":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Calculate real data for time-based summaries
  const calculateTimePeriodStats = () => {
    if (!users || users.length === 0) {
      return {
        today: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            blocked: { count: 0, percentage: 0 },
          },
        },
        week: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            blocked: { count: 0, percentage: 0 },
          },
        },
        month: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            blocked: { count: 0, percentage: 0 },
          },
        },
        year: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            blocked: { count: 0, percentage: 0 },
          },
        },
      };
    }

    const now = new Date();

    // Calculate start dates for different time periods
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    weekStart.setHours(0, 0, 0, 0);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const yearStart = new Date(now.getFullYear(), 0, 1);

    // Filter users by time periods
    const todayUsers = users.filter(
      (user) => new Date(user.createdAt) >= todayStart,
    );
    const weekUsers = users.filter(
      (user) => new Date(user.createdAt) >= weekStart,
    );
    const monthUsers = users.filter(
      (user) => new Date(user.createdAt) >= monthStart,
    );
    const yearUsers = users.filter(
      (user) => new Date(user.createdAt) >= yearStart,
    );

    // Calculate stats for each time period
    const calculateStats = (periodUsers) => {
      const total = periodUsers.length;
      const activeCount = periodUsers.filter((user) => !user.isBlocked).length;
      const blockedCount = periodUsers.filter((user) => user.isBlocked).length;

      const activePercentage =
        total > 0 ? Math.round((activeCount / total) * 100) : 0;
      const blockedPercentage =
        total > 0 ? Math.round((blockedCount / total) * 100) : 0;

      return {
        total,
        byStatus: {
          active: { count: activeCount, percentage: activePercentage },
          blocked: { count: blockedCount, percentage: blockedPercentage },
        },
      };
    };

    return {
      today: calculateStats(todayUsers),
      week: calculateStats(weekUsers),
      month: calculateStats(monthUsers),
      year: calculateStats(yearUsers),
    };
  };

  const summary = calculateTimePeriodStats();

  return (
    <div className="space-y-6">
      {/* Time-based summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-3">
              <FaCalendarDay size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Today
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Users:
              </span>
              <span className="font-medium text-teal-600 dark:text-teal-400">
                {formatNumber(summary.today.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.today.byStatus).map(
                  ([status, data]) => (
                    <div
                      key={status}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`text-xs ${getStatusColorClass(status)}`}
                      >
                        {formatStatus(status)}:
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {data.count} ({data.percentage}%)
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-3">
              <FaCalendarWeek size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Week
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Users:
              </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {formatNumber(summary.week.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.week.byStatus).map(([status, data]) => (
                  <div
                    key={status}
                    className="flex justify-between items-center"
                  >
                    <span className={`text-xs ${getStatusColorClass(status)}`}>
                      {formatStatus(status)}:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {data.count} ({data.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-3">
              <FaCalendarAlt size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Month
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Users:
              </span>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                {formatNumber(summary.month.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.month.byStatus).map(
                  ([status, data]) => (
                    <div
                      key={status}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`text-xs ${getStatusColorClass(status)}`}
                      >
                        {formatStatus(status)}:
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {data.count} ({data.percentage}%)
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This Year */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mr-3">
              <FaCalendar size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Year
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Users:
              </span>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                {formatNumber(summary.year.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.year.byStatus).map(([status, data]) => (
                  <div
                    key={status}
                    className="flex justify-between items-center"
                  >
                    <span className={`text-xs ${getStatusColorClass(status)}`}>
                      {formatStatus(status)}:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {data.count} ({data.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current User Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Current User Statistics
          </h3>
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FaUsers className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Users */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-200 dark:bg-yellow-600/20 text-yellow-700 dark:text-yellow-300 mr-3">
                <FaUsers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {formatNumber(totalUsers)}
                </p>
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-3">
                <FaUserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Users
                </p>
                <p className="text-lg font-medium text-teal-600 dark:text-teal-400">
                  {formatNumber(activeUsers)} ({activePercentage}%)
                </p>
              </div>
            </div>
          </div>

          {/* Blocked Users */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3">
                <FaUserTimes className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Blocked Users
                </p>
                <p className="text-lg font-medium text-red-600 dark:text-red-400">
                  {formatNumber(blockedUsers)} ({blockedPercentage}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
