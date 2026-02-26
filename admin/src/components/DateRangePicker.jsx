import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

const DateRangePicker = ({ onChange, initialDateRange, onClose }) => {
  const [startDate, setStartDate] = useState(initialDateRange?.startDate || null);
  const [endDate, setEndDate] = useState(initialDateRange?.endDate || null);
  const [activeInput, setActiveInput] = useState("start");

  // Format date for input
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date change
  const handleDateChange = (e, type) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    
    if (type === "start") {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(date);
      }
      setActiveInput("end");
    } else {
      setEndDate(date);
      if (startDate && date < startDate) {
        setStartDate(date);
      }
    }
  };

  // Apply date range
  const applyDateRange = () => {
    if (startDate && endDate) {
      onChange({ startDate, endDate });
    }
  };

  // Clear date range
  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    onChange({ startDate: null, endDate: null });
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".date-range-picker")) return;
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Predefined ranges
  const predefinedRanges = [
    {
      label: "Today",
      getRange: () => {
        const today = new Date();
        return { startDate: today, endDate: today };
      },
    },
    {
      label: "Yesterday",
      getRange: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return { startDate: yesterday, endDate: yesterday };
      },
    },
    {
      label: "Last 7 Days",
      getRange: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 6);
        return { startDate: start, endDate: end };
      },
    },
    {
      label: "Last 30 Days",
      getRange: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 29);
        return { startDate: start, endDate: end };
      },
    },
    {
      label: "This Month",
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date();
        return { startDate: start, endDate: end };
      },
    },
    {
      label: "Last Month",
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { startDate: start, endDate: end };
      },
    },
  ];

  // Apply predefined range
  const applyPredefinedRange = (getRange) => {
    const { startDate: start, endDate: end } = getRange();
    setStartDate(start);
    setEndDate(end);
    onChange({ startDate: start, endDate: end });
  };

  return (
    <div className="date-range-picker bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
          <FaCalendarAlt className="mr-2 text-teal-500 dark:text-teal-400" />
          Date Range
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaTimes size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={(e) => handleDateChange(e, "start")}
            className={`w-full rounded-lg border ${
              activeInput === "start"
                ? "border-teal-500 dark:border-teal-400 ring-2 ring-teal-500/50"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
            onClick={() => setActiveInput("start")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={(e) => handleDateChange(e, "end")}
            className={`w-full rounded-lg border ${
              activeInput === "end"
                ? "border-teal-500 dark:border-teal-400 ring-2 ring-teal-500/50"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
            onClick={() => setActiveInput("end")}
            min={startDate ? formatDateForInput(startDate) : ""}
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Predefined Ranges
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {predefinedRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => applyPredefinedRange(range.getRange)}
              className="text-sm px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={clearDateRange}
          className="text-sm px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={applyDateRange}
          disabled={!startDate || !endDate}
          className="text-sm px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
