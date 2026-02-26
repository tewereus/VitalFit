import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaCheckDouble,
  FaCalendarAlt,
  FaChartBar,
  FaSpinner,
  FaUsers,
  FaCheck,
} from "react-icons/fa";

// Import components
import TransactionTable from "./TransactionTable";

import TransactionSummary from "./TransactionSummary";
import TransactionDetailModal from "./TransactionDetailModal";

// Helper function to combine class names conditionally
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const transactions = [
  {
    _id: "699ee930405fb6abd52d8ffb",
    transactionId: "TRX-22064361-1397",
    user: {
      _id: "6731b637bada57ba72473f30",
      fullname: "tewe reus",
      email: "qqq@qqq.qq",
      mobile: "111111112",
    },
    amount: 458.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260214-000001",
    reference: "OPTZ-260214-000001",
    metadata: {
      orderId: {
        _id: "6990236f494d0a6d61e8b9e6",
        orderID: "OPTZ-260214-000001",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 458.85,
    createdBy: null,
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
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260218-000001",
    reference: "OPTZ-260218-000001",
    metadata: {
      orderId: {
        _id: "6995a89f3b0b8ea3fa4d1cee",
        orderID: "OPTZ-260218-000001",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
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
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000016",
    reference: "OPTZ-260217-000016",
    metadata: {
      orderId: {
        _id: "69947f6b5d0a17e669727bcb",
        orderID: "OPTZ-260217-000016",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
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
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000015",
    reference: "OPTZ-260217-000015",
    metadata: {
      orderId: {
        _id: "69947f645d0a17e669727bb8",
        orderID: "OPTZ-260217-000015",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
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
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000014",
    reference: "OPTZ-260217-000014",
    metadata: {
      orderId: {
        _id: "69947c5fc40c87f097b8470c",
        orderID: "OPTZ-260217-000014",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
    createdAt: "2026-02-17T14:43:44.711Z",
    updatedAt: "2026-02-17T14:43:44.711Z",
    __v: 0,
  },
  {
    _id: "69947a283ae158a5a6ae44c6",
    transactionId: "TRX-38280563-7702",
    user: {
      _id: "6731b637bada57ba72473f30",
      fullname: "tewe reus",
      email: "qqq@qqq.qq",
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000012",
    reference: "OPTZ-260217-000012",
    metadata: {
      orderId: {
        _id: "699479a63ae158a5a6ae436f",
        orderID: "OPTZ-260217-000012",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
    createdAt: "2026-02-17T14:24:40.565Z",
    updatedAt: "2026-02-17T14:24:40.565Z",
    __v: 0,
  },
  {
    _id: "699470bce18f1c886b771af2",
    transactionId: "TRX-35868361-3832",
    user: {
      _id: "6731b637bada57ba72473f30",
      fullname: "tewe reus",
      email: "qqq@qqq.qq",
      mobile: "111111112",
    },
    amount: 1147.7,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000010",
    reference: "OPTZ-260217-000010",
    metadata: {
      orderId: {
        _id: "69947078e18f1c886b7719b4",
        orderID: "OPTZ-260217-000010",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 1147.7,
    createdBy: null,
    createdAt: "2026-02-17T13:44:28.362Z",
    updatedAt: "2026-02-17T13:44:28.362Z",
    __v: 0,
  },
  {
    _id: "6994641fd5874e82734881bf",
    transactionId: "TRX-32639312-3569",
    user: {
      _id: "6731b637bada57ba72473f30",
      fullname: "tewe reus",
      email: "qqq@qqq.qq",
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000009",
    reference: "OPTZ-260217-000009",
    metadata: {
      orderId: {
        _id: "699463e7d5874e82734880b6",
        orderID: "OPTZ-260217-000009",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
    createdAt: "2026-02-17T12:50:39.316Z",
    updatedAt: "2026-02-17T12:50:39.316Z",
    __v: 0,
  },
  {
    _id: "69946152936f4be1091fcb39",
    transactionId: "TRX-31922870-4595",
    user: {
      _id: "6731b637bada57ba72473f30",
      fullname: "tewe reus",
      email: "qqq@qqq.qq",
      mobile: "111111112",
    },
    amount: 573.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000008",
    reference: "OPTZ-260217-000008",
    metadata: {
      orderId: {
        _id: "6994612f936f4be1091fca98",
        orderID: "OPTZ-260217-000008",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 573.85,
    createdBy: null,
    createdAt: "2026-02-17T12:38:42.871Z",
    updatedAt: "2026-02-17T12:38:42.871Z",
    __v: 0,
  },
  {
    _id: "69945788936f4be1091fc88f",
    transactionId: "TRX-29416172-0673",
    user: {
      _id: "6731b637bada57ba72473f30",
      fullname: "tewe reus",
      email: "qqq@qqq.qq",
      mobile: "111111112",
    },
    amount: 873.85,
    currency: "USD",
    type: "payment",
    status: "pending",
    method: "cash",
    description: "Payment for order OPTZ-260217-000006",
    reference: "OPTZ-260217-000006",
    metadata: {
      orderId: {
        _id: "69945772936f4be1091fc707",
        orderID: "OPTZ-260217-000006",
        status: "Delivered",
      },
    },
    fees: 0,
    netAmount: 873.85,
    createdBy: null,
    createdAt: "2026-02-17T11:56:56.173Z",
    updatedAt: "2026-02-17T11:56:56.173Z",
    __v: 0,
  },
];

const timeframeTransactions = {
  success: true,
  timeframe: "today",
  count: 0,
  totals: {},
  data: [],
};

const transactionSummary = {
  today: {
    total: 0,
    count: 0,
    byStatus: {},
  },
  week: {
    total: 458.85,
    count: 1,
    byStatus: {
      pending: {
        count: 1,
        total: 458.85,
      },
    },
  },
  month: {
    total: 12170.119999999999,
    count: 21,
    byStatus: {
      pending: {
        count: 19,
        total: 11138.15,
      },
      completed: {
        count: 2,
        total: 1031.97,
      },
    },
  },
  year: {
    total: 19851.97,
    count: 31,
    byStatus: {
      completed: {
        count: 6,
        total: 1967.8200000000002,
      },
      pending: {
        count: 23,
        total: 16184.15,
      },
      approved: {
        count: 2,
        total: 1700,
      },
    },
  },
  topCollectors: [
    {
      _id: "6731b637bada57ba72473f30",
      count: 2,
      total: 1032.7,
      verified: 0,
      completed: 458.85,
      pending: 573.85,
    },
  ],
};

const stats = {
  counts: {
    pending: 2,
    approved: 2,
    rejected: 0,
    completed: 2,
    total: 6,
  },
  amounts: {
    pending: 1050,
    approved: 1700,
    completed: 265,
    total: 3015,
  },
  monthlyData: [
    {
      month: "2026-01",
      count: 4,
      amount: 1965,
    },
  ],
  topUsers: [
    {
      _id: "6731b637bada57ba72473f30",
      totalAmount: 1965,
      count: 4,
      userId: "6731b637bada57ba72473f30",
      user: {
        username: "tewe reus",
        fullname: "tewe reus",
        email: "qqq@qqq.qq",
      },
    },
  ],
};

const pagination = {
  currentPage: 1,
  totalPages: 4,
  total: 39,
};

const TransactionTabs = () => {
  const dispatch = useDispatch();

  // State for modals and filters
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "timeframe") {
      // dispatch(
      //   getTransactionsByTimeframe({
      //     timeframe: selectedTimeframe,
      //     status: selectedStatus,
      //   })
      // );
    } else if (activeTab === "summary") {
      // dispatch(getTransactionSummary());
    } else {
      const params = { page: currentPage, limit: pageSize };
      if (activeTab === "deposit") params.type = "deposit";
      if (activeTab === "withdrawal") params.type = "withdrawal";
      if (selectedStatus) params.status = selectedStatus;
      // dispatch(getAllTransactions(params));
    }
  }, [
    dispatch,
    currentPage,
    pageSize,
    activeTab,
    selectedTimeframe,
    selectedStatus,
  ]);

  // Handle page change for all transactions
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // dispatch(getAllTransactions({ page: newPage, limit: pageSize }));
  };

  // Handle timeframe change
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    // dispatch(getTransactionsByTimeframe({ timeframe, status: selectedStatus }));
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setSelectedStatus(status);
    // dispatch(
    //   getTransactionsByTimeframe({ timeframe: selectedTimeframe, status })
    // );
  };

  // View transaction details
  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  // Open collection modal
  const openCollectionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowCollectionModal(true);
  };

  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  // Tab definitions
  const tabs = [
    {
      id: "all",
      label: "All Transactions",
      icon: <FaMoneyBillWave />,
    },
    {
      id: "deposit",
      label: "Deposits",
      icon: <FaHandHoldingUsd />,
    },
    {
      id: "withdrawal",
      label: "Withdrawals",
      icon: <FaCheckDouble />,
    },
    {
      id: "timeframe",
      label: "Time Reports",
      icon: <FaCalendarAlt />,
    },
    {
      id: "summary",
      label: "Summary",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      onClick={() => console.log(transactions)}
    >
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center px-6 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400"
                : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 border-b-2 border-transparent",
            )}
          >
            <span className="mr-2">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${tab.badgeClass}`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Main Transaction Tables (All, Deposit, Withdrawal) */}
        {(activeTab === "all" ||
          activeTab === "deposit" ||
          activeTab === "withdrawal") && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                {activeTab === "all" && "All Transactions"}
                {activeTab === "deposit" && "Deposit Transactions"}
                {activeTab === "withdrawal" && "Withdrawal Transactions"}
              </h3>
              <div className="flex items-center gap-3">
                {pagination && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {transactions?.length || 0} of{" "}
                    {pagination.total || 0} transactions
                  </div>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedStatus("")}
                    className={`px-3 py-1 text-xs rounded-md ${
                      selectedStatus === ""
                        ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedStatus("completed")}
                    className={`px-3 py-1 text-xs rounded-md ${
                      selectedStatus === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setSelectedStatus("pending")}
                    className={`px-3 py-1 text-xs rounded-md ${
                      selectedStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setSelectedStatus("failed")}
                    className={`px-3 py-1 text-xs rounded-md ${
                      selectedStatus === "failed"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Failed / Cancelled
                  </button>
                </div>
              </div>
            </div>
            <TransactionTable
              transactions={transactions || []}
              viewTransactionDetails={viewTransactionDetails}
              openCollectionModal={openCollectionModal}
              showPagination={true}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Time Reports Tab */}
        {activeTab === "timeframe" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Time-Based Reports
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTimeframeChange("today")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === "today"
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => handleTimeframeChange("week")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === "week"
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => handleTimeframeChange("month")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === "month"
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => handleTimeframeChange("year")}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === "year"
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  This Year
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex space-x-2 mb-2">
                <button
                  onClick={() => handleStatusFilterChange("")}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedStatus === ""
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  All Statuses
                </button>
                <button
                  onClick={() => handleStatusFilterChange("pending")}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusFilterChange("failed")}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedStatus === "failed"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Failed / Cancelled
                </button>
                <button
                  onClick={() => handleStatusFilterChange("completed")}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedStatus === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Completed
                </button>
              </div>

              {/* Totals by status */}
              {stats?.timeframe?.totals && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {Object.entries(stats.timeframe.totals).map(
                    ([status, amount]) => (
                      <div
                        key={status}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {status}
                        </p>
                        <p className="text-lg font-medium text-gray-800 dark:text-white">
                          {formatCurrency(amount)}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>

            <TransactionTable
              transactions={timeframeTransactions}
              isLoading={transactionsLoading}
              viewTransactionDetails={viewTransactionDetails}
              openCollectionModal={openCollectionModal}
              showPagination={false}
            />
          </div>
        )}

        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Transaction Summary
            </h3>
            {transactionsLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : transactionSummary ? (
              <TransactionSummary summary={transactionSummary} />
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No summary data available
              </div>
            )}
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

export default TransactionTabs;
