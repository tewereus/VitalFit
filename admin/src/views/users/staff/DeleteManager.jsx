import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-hot-toast";

const DeleteManager = ({ setIsDelete, selectedUser }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const performDeleteManager = async ({ securityPassword, headers } = {}) => {
    setIsSubmitting(true);

    try {
      // await dispatch(
      //   deleteManager({
      //     id: selectedUser._id,
      //     securityPassword,
      //     headers,
      //   })
      // ).unwrap();
      toast.success("Manager deleted successfully");
      setIsDelete(false);
    } catch (error) {
      toast.error(error?.message || "Failed to delete manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    // executeWithSecurity(performDeleteManager);
    setIsSubmitting(true);

    try {
      // await dispatch(
      //   deleteManager({
      //     id: selectedUser._id,
      //     securityPassword,
      //     headers,
      //   })
      // ).unwrap();
      toast.success("Manager deleted successfully");
      setIsDelete(false);
    } catch (error) {
      toast.error(error?.message || "Failed to delete manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white">
          Delete Manager
        </h2>
        <button
          onClick={() => setIsDelete(false)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FiX className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="p-6">
        <div
          className="flex items-center justify-center w-16 h-16 mx-auto mb-4
                    bg-red-100 dark:bg-red-900/30 rounded-full"
        >
          <FiAlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
        </div>

        <h3 className="mb-2 text-lg font-medium text-center dark:text-white">
          Delete {selectedUser.fullname}
        </h3>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete this manager? This action cannot be
          undone and will remove all associated data.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDelete(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100
                   dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                   focus:ring-4 focus:ring-red-500/50 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
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
              "Delete Manager"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteManager;
