import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import {
  FaSpinner,
  FaCheckDouble,
  FaExclamationTriangle,
  FaUser,
  FaMoneyBillWave,
  FaTimes,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { FiLock } from "react-icons/fi";

Modal.setAppElement("#root");

const BulkCompletionModal = ({
  isOpen,
  onClose,
  rider = null,
  manager = null,
  transactionIds = [],
  onConfirm,
  isLoading = false,
}) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [notes, setNotes] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generateReceipt, setGenerateReceipt] = useState(false);

  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    onConfirm({
      password,
      notes,
      transactionIds,
      riderId: rider?._id,
      managerId: manager?._id,
      generateReceipt,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl mx-auto mt-20 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black/75 flex justify-center z-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <FaFileInvoiceDollar className="mr-2 text-teal-500 dark:text-teal-400" />
            Complete All Verified Transactions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2 flex items-center">
            <FaUser className="mr-2 text-teal-500" />
            {manager ? "Manager Details" : "Rider Details"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {manager ? "Manager Name" : "Rider Name"}
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white flex items-center">
                {manager?.fullname || rider?.fullname || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Verified Transactions
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {manager?.verifiedTransactions ||
                    rider?.verifiedTransactions ||
                    transactionIds.length ||
                    0}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mobile Number
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white">
                {manager?.mobile || rider?.mobile || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Verified Amount
              </p>
              <p className="text-base font-medium text-gray-800 dark:text-white">
                {formatCurrency(
                  manager?.totalVerifiedAmount || rider?.verifiedCash || 0
                )}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Additional notes about this completion"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="generateReceipt"
                checked={generateReceipt}
                onChange={(e) => setGenerateReceipt(e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label
                htmlFor="generateReceipt"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Generate receipt for this transaction
              </label>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaCheckDouble size={14} />
                    <span>Complete All Transactions</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Password Confirmation Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiLock className="text-amber-500 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Confirm Your Password
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For security reasons, please enter your password to complete all
              verified transactions for this {manager ? "manager" : "rider"}.
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 py-2.5 px-4 text-base ${
                    passwordError ? "border-red-500 dark:border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword("");
                    setPasswordError("");
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 rounded-md shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm Completion"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BulkCompletionModal;
