import React from "react";
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
  FaUser,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const TransactionSummary = ({ summary }) => {
  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "collected":
        return "Collected";
      case "verified":
        return "Verified";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "collected":
        return "text-blue-600 dark:text-blue-400";
      case "verified":
        return "text-indigo-600 dark:text-indigo-400";
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
      case "cancelled":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

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
                Total Transactions:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {summary.today.count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount:
              </span>
              <span className="font-medium text-teal-600 dark:text-teal-400">
                {formatCurrency(summary.today.total)}
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
                        {data.count} ({formatCurrency(data.total)})
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
              <FaCalendarWeek size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Week
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Transactions:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {summary.week.count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount:
              </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {formatCurrency(summary.week.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.week.byStatus).map(
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
                        {data.count} ({formatCurrency(data.total)})
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
              <FaCalendarAlt size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Month
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Transactions:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {summary.month.count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount:
              </span>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                {formatCurrency(summary.month.total)}
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
                        {data.count} ({formatCurrency(data.total)})
                      </span>
                    </div>
                  )
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
                Total Transactions:
              </span>
              <span className="font-medium text-gray-800 dark:text-white">
                {summary.year.count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount:
              </span>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                {formatCurrency(summary.year.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.year.byStatus).map(
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
                        {data.count} ({formatCurrency(data.total)})
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Cash Collectors */}
      {summary.topCollectors && summary.topCollectors.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-teal-500 dark:text-teal-400" />
            Top Cash Collectors
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Collector
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Transactions
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Total Collected
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Verified
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Pending
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {summary.topCollectors.map((collector) => (
                  <tr key={collector._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      <FaUser className="mr-2 text-gray-400" size={14} />
                      {collector.name || collector._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {collector.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatCurrency(collector.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 flex items-center">
                      <FaArrowDown className="mr-1" size={12} />
                      {formatCurrency(collector.verified)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
                      <FaArrowUp className="mr-1" size={12} />
                      {formatCurrency(collector.pending)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSummary;
