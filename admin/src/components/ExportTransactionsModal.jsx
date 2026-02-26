import React, { useState, useEffect } from "react";
import { FaTimes, FaFileDownload } from "react-icons/fa";

const ExportTransactionsModal = ({
  isOpen,
  onClose,
  onConfirmExport,
  totalTransactions,
  filters,
  dateRange, // Accept the new dateRange prop
}) => {
  const [exportFileName, setExportFileName] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Set a default filename when the modal opens
      setExportFileName(
        `transactions_${new Date().toISOString().slice(0, 10)}`
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirmExport(exportFileName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            onClick={() => console.log(filters)}
          >
            Export Transactions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            You are about to export{" "}
            <span className="font-bold text-teal-600 dark:text-teal-400">
              {totalTransactions}
            </span>{" "}
            transaction(s).
          </p>
          {(Object.values(filters).some((value) => value) || // Check if any filter has a truthy value
            dateRange.startDate || // Check dateRange.startDate
            dateRange.endDate) && ( // Check dateRange.endDate
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <p className="font-semibold mb-1">Applied Filters:</p>
              <ul className="list-disc list-inside ml-2">
                {filters.status && <li>Status: {filters.status}</li>}
                {filters.type && <li>Type: {filters.type}</li>}
                {filters.method && <li>Method: {filters.method}</li>}
                {filters.search && <li>Search: "{filters.search}"</li>}
                {(dateRange.startDate || dateRange.endDate) && (
                  <li>
                    Date Range:{" "}
                    {dateRange.startDate
                      ? new Date(dateRange.startDate).toLocaleDateString()
                      : "Start"}
                    {" - "}
                    {dateRange.endDate
                      ? new Date(dateRange.endDate).toLocaleDateString()
                      : "End"}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="exportFileName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Filename
          </label>
          <input
            type="text"
            id="exportFileName"
            value={exportFileName}
            onChange={(e) => setExportFileName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., transactions_report"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <FaFileDownload />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportTransactionsModal;
