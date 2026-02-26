import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
// import {
//   getTransactionDashboard,
//   reset,
// } from "../../store/transaction/transactionSlice";
import TransactionStatusBadge from "./TransactionStatusBadge";
import TransactionTypeBadge from "./TransactionTypeBadge";
import TransactionDetailModal from "./TransactionDetailModal";
import { Link } from "react-router-dom";

// Import chart components from react-chartjs-2 and chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const dashboard = {
  statusCounts: {
    pending: {
      count: 27,
      totalAmount: 20544.95,
    },
    completed: {
      count: 10,
      totalAmount: 6156.12,
    },
    approved: {
      count: 2,
      totalAmount: 1700,
    },
  },
  typeCounts: {
    withdrawal: {
      count: 6,
      totalAmount: 3015,
    },
    refund: {
      count: 6,
      totalAmount: 5289.97,
    },
    payment: {
      count: 27,
      totalAmount: 20096.100000000002,
    },
  },
  recentTransactions: [
    {
      _id: "699ee930405fb6abd52d8ffb",
      transactionId: "TRX-22064361-1397",
      user: {
        _id: "6731b637bada57ba72473f30",
        fullname: "tewe reus",
        email: "qqq@qqq.qq",
      },
      amount: 458.85,
      currency: "USD",
      type: "payment",
      status: "pending",
      method: "cash",
      description: "Payment for order OPTZ-260214-000001",
      reference: "OPTZ-260214-000001",
      metadata: {
        orderId: "6990236f494d0a6d61e8b9e6",
      },
      fees: 0,
      netAmount: 458.85,
      createdBy: "681de2cf8c1dea86f96658ab",
      createdAt: "2026-02-25T12:21:04.364Z",
      updatedAt: "2026-02-25T12:21:04.364Z",
      __v: 0,
    },
    {
      _id: "6995ba4ba78fe09405c580f8",
      transactionId: "TRX-20235431-6167",
      user: {
        _id: "6731b637bada57ba72473f30",
        fullname: "tewe reus",
        email: "qqq@qqq.qq",
      },
      amount: 573.85,
      currency: "USD",
      type: "payment",
      status: "pending",
      method: "cash",
      description: "Payment for order OPTZ-260218-000001",
      reference: "OPTZ-260218-000001",
      metadata: {
        orderId: "6995a89f3b0b8ea3fa4d1cee",
      },
      fees: 0,
      netAmount: 573.85,
      createdBy: "680dfc399184f5246796f515",
      createdAt: "2026-02-18T13:10:35.434Z",
      updatedAt: "2026-02-18T13:10:35.434Z",
      __v: 0,
    },
    {
      _id: "699480cd059cc193e3e5b04d",
      transactionId: "TRX-39981406-2486",
      user: {
        _id: "6731b637bada57ba72473f30",
        fullname: "tewe reus",
        email: "qqq@qqq.qq",
      },
      amount: 573.85,
      currency: "USD",
      type: "payment",
      status: "pending",
      method: "cash",
      description: "Payment for order OPTZ-260217-000016",
      reference: "OPTZ-260217-000016",
      metadata: {
        orderId: "69947f6b5d0a17e669727bcb",
      },
      fees: 0,
      netAmount: 573.85,
      createdBy: "680dfc399184f5246796f515",
      createdAt: "2026-02-17T14:53:01.407Z",
      updatedAt: "2026-02-17T14:53:01.407Z",
      __v: 0,
    },
    {
      _id: "69948019df6fe3966e6af146",
      transactionId: "TRX-39801725-7418",
      user: {
        _id: "6731b637bada57ba72473f30",
        fullname: "tewe reus",
        email: "qqq@qqq.qq",
      },
      amount: 573.85,
      currency: "USD",
      type: "payment",
      status: "pending",
      method: "cash",
      description: "Payment for order OPTZ-260217-000015",
      reference: "OPTZ-260217-000015",
      metadata: {
        orderId: "69947f645d0a17e669727bb8",
      },
      fees: 0,
      netAmount: 573.85,
      createdBy: "680dfc399184f5246796f515",
      createdAt: "2026-02-17T14:50:01.728Z",
      updatedAt: "2026-02-17T14:50:01.728Z",
      __v: 0,
    },
    {
      _id: "69947ea05d0a17e669727b91",
      transactionId: "TRX-39424708-3673",
      user: {
        _id: "6731b637bada57ba72473f30",
        fullname: "tewe reus",
        email: "qqq@qqq.qq",
      },
      amount: 573.85,
      currency: "USD",
      type: "payment",
      status: "pending",
      method: "cash",
      description: "Payment for order OPTZ-260217-000014",
      reference: "OPTZ-260217-000014",
      metadata: {
        orderId: "69947c5fc40c87f097b8470c",
      },
      fees: 0,
      netAmount: 573.85,
      createdBy: "680dfc399184f5246796f515",
      createdAt: "2026-02-17T14:43:44.711Z",
      updatedAt: "2026-02-17T14:43:44.711Z",
      __v: 0,
    },
  ],
  monthlyTotals: [
    {
      month: "Jan 2026",
      count: 10,
      totalAmount: 7681.85,
      paymentAmount: 458.85,
      withdrawalAmount: 2965,
      refundAmount: 4258,
    },
    {
      month: "Feb 2026",
      count: 21,
      totalAmount: 12170.12,
      paymentAmount: 11088.15,
      withdrawalAmount: 50,
      refundAmount: 1031.97,
    },
  ],
};

const TransactionDashboard = () => {
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // View transaction details
  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  // Prepare chart data
  const getChartData = () => {
    if (!dashboard || !dashboard.monthlyTotals) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: dashboard.monthlyTotals.map((item) => item.month),
      datasets: [
        {
          label: "Payments",
          data: dashboard.monthlyTotals.map((item) => item.paymentAmount),
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
        },
        {
          label: "Withdrawals",
          data: dashboard.monthlyTotals.map((item) => item.withdrawalAmount),
          backgroundColor: "rgba(139, 92, 246, 0.5)",
          borderColor: "rgb(139, 92, 246)",
          borderWidth: 1,
        },
        {
          label: "Refunds",
          data: dashboard.monthlyTotals.map((item) => item.refundAmount),
          backgroundColor: "rgba(249, 115, 22, 0.5)",
          borderColor: "rgb(249, 115, 22)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: document.documentElement.classList.contains("dark")
            ? "#e5e7eb"
            : "#374151",
        },
      },
      title: {
        display: true,
        text: "Monthly Transaction Amounts",
        color: document.documentElement.classList.contains("dark")
          ? "#e5e7eb"
          : "#374151",
      },
    },
    scales: {
      x: {
        grid: {
          color: document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: document.documentElement.classList.contains("dark")
            ? "#e5e7eb"
            : "#374151",
        },
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: document.documentElement.classList.contains("dark")
            ? "#e5e7eb"
            : "#374151",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Transaction Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Overview of financial transactions across the platform
            </p>
          </div>

          <Link
            to="/admin/transactions"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <FaMoneyBillWave size={14} />
            <span>View All Transactions</span>
          </Link>
        </div>

        {dashboard ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-4">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {Object.values(dashboard.typeCounts || {}).reduce(
                        (sum, item) => sum + item.count,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
                    <FaSpinner size={20} />
                  </div>
                  <div>
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      onClick={() => console.log(dashboard)}
                    >
                      Pending
                    </p>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {dashboard.statusCounts?.pending?.count || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Completed Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                    <FaCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completed
                    </p>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {dashboard.statusCounts?.completed?.count || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Failed Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-4">
                    <FaTimes size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Failed/Cancelled
                    </p>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {(dashboard.statusCounts?.failed?.count || 0) +
                        (dashboard.statusCounts?.cancelled?.count || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Type Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Payments */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                    <FaArrowDown size={16} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Payments
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Count
                    </p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                      {dashboard.typeCounts?.payment?.count || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                      {formatCurrency(
                        dashboard.typeCounts?.payment?.totalAmount || 0,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Withdrawals */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                    <FaArrowUp size={16} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Withdrawals
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Count
                    </p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                      {dashboard.typeCounts?.withdrawal?.count || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                      {formatCurrency(
                        dashboard.typeCounts?.withdrawal?.totalAmount || 0,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Refunds */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mr-3">
                    <FaExchangeAlt size={16} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Refunds
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Count
                    </p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                      {dashboard.typeCounts?.refund?.count || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                      {formatCurrency(
                        dashboard.typeCounts?.refund?.totalAmount || 0,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                <FaChartLine className="mr-2 text-teal-500 dark:text-teal-400" />
                Transaction Trends
              </h3>
              <div className="h-80">
                <Bar data={getChartData()} options={chartOptions} />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                  <FaCalendarAlt className="mr-2 text-teal-500 dark:text-teal-400" />
                  Recent Transactions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Transaction ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {dashboard.recentTransactions &&
                      dashboard.recentTransactions.map((transaction) => (
                        <tr
                          key={transaction._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => viewTransactionDetails(transaction)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.transactionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {transaction.user?.fullname || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <TransactionTypeBadge type={transaction.type} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(
                              transaction.amount,
                              transaction.currency,
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <TransactionStatusBadge
                              status={transaction.status}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {formatDate(transaction.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div
                              className="flex justify-end space-x-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  viewTransactionDetails(transaction);
                                }}
                                className="text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
                              >
                                <FaEye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/admin/transactions"
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                >
                  View All Transactions
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <FaMoneyBillWave className="text-gray-300 dark:text-gray-600 text-6xl mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-1">
              No Transaction Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start by creating transactions to see dashboard data
            </p>
            <Link
              to="/admin/transactions"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Go to Transactions
            </Link>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
};

export default TransactionDashboard;
