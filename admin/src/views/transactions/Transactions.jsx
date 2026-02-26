import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaMoneyBillWave,
  FaSearch,
  FaFilter,
  FaPlus,
  FaCalendarAlt,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaFileDownload,
} from "react-icons/fa";
import TransactionTabs from "./TransactionTabs";
import CreateTransactionModal from "./CreateTransactionModal";
import DateRangePicker from "../../components/DateRangePicker";
import ExportTransactionsModal from "../../components/ExportTransactionsModal";

import Pagination from "../../components/shared/Pagination";

const transactions = {
  success: true,
  count: 10,
  total: 39,
  totalPages: 4,
  currentPage: 1,
  stats: {
    completed: {
      count: 10,
      totalAmount: 6156.12,
    },
    pending: {
      count: 27,
      totalAmount: 20544.95,
    },
    approved: {
      count: 2,
      totalAmount: 1700,
    },
  },
  data: [
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
  ],
};

const pagination = {
  currentPage: 1,
  totalPages: 4,
  total: 39,
};

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

const Transactions = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // State for modals and filters
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false); // New state for export modal
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    method: "",
    search: "",
  });

  // Fetch transactions with current filters
  const fetchTransactions = () => {
    const params = {
      ...filters,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      page: currentPage,
      limit: limit,
    };
    // dispatch(getAllTransactions(params));
  };

  // Handle export
  const handleExport = async (filename) => {
    const params = {
      ...filters,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };
    // executeWithSecurity(async ({ securityPassword, headers } = {}) => {
    //   try {
    //     const response = await dispatch(
    //       exportTransactions({ params, securityPassword, headers }),
    //     ).unwrap();
    //     const blob = new Blob([response], { type: "text/csv" });
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download =
    //       filename.trim() !== ""
    //         ? `${filename.trim()}.csv`
    //         : `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    //     window.URL.revokeObjectURL(url);
    //   } catch (error) {
    //     console.error("Error exporting transactions:", error);
    //   }
    // });
  };

  // Fetch on mount and when filters/dateRange change
  useEffect(() => {
    // fetchTransactions();
  }, [
    filters.status,
    filters.type,
    filters.method,
    filters.search,
    dateRange.startDate,
    dateRange.endDate,
    currentPage,
    limit,
  ]);

  // Load dashboard data on component mount
  // useEffect(() => {
  //   dispatch(getTransactionDashboard());
  // }, [dispatch]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // fetchTransactions();
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date range selection
  const handleDateRangeChange = (range) => {
    if (range.startDate && range.endDate) {
      setDateRange(range);
      setShowDatePicker(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      type: "",
      method: "",
      startDate: "",
      endDate: "",
      search: "",
    });
    setDateRange({ startDate: null, endDate: null });
  };

  // Use dynamic stats from the current filter result if available, otherwise fallback to dashboard
  const currentStats =
    stats && Object.keys(stats).length > 0
      ? stats
      : dashboard?.statusCounts || {};

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Transactions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage financial transactions across the platform
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearch}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white w-full md:w-64"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                />
              </form>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FaFilter className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Filter</span>
            </button>

            {/* Date Range Button */}
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {dateRange.startDate && dateRange.endDate
                    ? `${formatDate(dateRange.startDate)} - ${formatDate(
                        dateRange.endDate,
                      )}`
                    : "Date Range"}
                </span>
              </button>
              {showDatePicker && (
                <div className="absolute right-0 mt-2 z-10">
                  <DateRangePicker
                    onChange={handleDateRangeChange}
                    initialDateRange={dateRange}
                    onClose={() => setShowDatePicker(false)}
                  />
                </div>
              )}
            </div>

            {/* Create Transaction Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <FaPlus size={14} />
              <span>New Transaction</span>
            </button>

            {/* Export Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <FaFileDownload size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Types</option>
                  <option value="deposit">Payment</option>
                  <option value="withdrawal">Withdrawal</option>
                  {/* <option value="refund">Refund</option>
                  <option value="adjustment">Adjustment</option> */}
                </select>
              </div>

              {/* Method Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Method
                </label>
                <select
                  name="method"
                  value={filters.method}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Methods</option>
                  {/* <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                  <option value="other">Other</option> */}
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

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
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {Object.values(currentStats).reduce(
                      (total, status) => total + (status?.count || 0),
                      0,
                    ) || 0}
                  </p>
                  {Object.values(currentStats).reduce(
                    (total, status) => total + (status?.totalAmount || 0),
                    0,
                  ) > 0 && (
                    <p className="text-lg font-medium text-teal-600 dark:text-teal-400 ml-2">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        Object.values(currentStats).reduce(
                          (total, status) => total + (status?.totalAmount || 0),
                          0,
                        ),
                      )}
                    </p>
                  )}
                </div>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pending
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {currentStats.pending?.count || 0}
                  </p>
                  {currentStats.pending?.totalAmount > 0 && (
                    <p className="text-lg font-medium text-yellow-600 dark:text-yellow-400 ml-2">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(currentStats.pending.totalAmount)}
                    </p>
                  )}
                </div>
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
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {currentStats.completed?.count || 0}
                  </p>
                  {currentStats.completed?.totalAmount > 0 && (
                    <p className="text-lg font-medium text-green-600 dark:text-green-400 ml-2">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(currentStats.completed.totalAmount)}
                    </p>
                  )}
                </div>
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
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {(currentStats.failed?.count || 0) +
                      (currentStats.cancelled?.count || 0)}
                  </p>
                  {(currentStats.failed?.totalAmount > 0 ||
                    currentStats.cancelled?.totalAmount > 0) && (
                    <p className="text-lg font-medium text-red-600 dark:text-red-400 ml-2">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        (currentStats.failed?.totalAmount || 0) +
                          (currentStats.cancelled?.totalAmount || 0),
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Tabs */}
      <TransactionTabs transactions={transactions} />
      {pagination && pagination.total > limit && (
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItems={pagination.total}
            parPage={limit}
            showItem={5}
          />
          <div className="flex items-center gap-2">
            <label className="text-gray-700 dark:text-gray-300">
              Items per page:
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => {
                if (e.target.value >= 1) {
                  setLimit(parseInt(e.target.value));
                  setCurrentPage(1);
                }
              }}
              min="1"
              className="w-20 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            />
          </div>
        </div>
      )}

      {/* Create Transaction Modal */}
      {showCreateModal && (
        <CreateTransactionModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Export Transactions Modal */}
      {showExportModal && (
        <ExportTransactionsModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onConfirmExport={handleExport}
          totalTransactions={pagination?.total || 0}
          filters={filters}
          dateRange={dateRange} // Pass the dateRange prop
        />
      )}
    </div>
  );
};

export default Transactions;
