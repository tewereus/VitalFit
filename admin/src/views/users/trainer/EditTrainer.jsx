import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import MultiSelect from "../../../components/shared/MultiSelect";
import { toast } from "react-hot-toast";

const EditTrainer = ({ setIsEdit, selectedUser }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: selectedUser?.email || "",
    mobile: selectedUser?.mobile || "",
    status: selectedUser?.status || "inactive",
    main_status: selectedUser?.main_status || "inactive",
    fullname: selectedUser?.fullname || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkAreaChange = (selectedSubRegions) => {
    const workArea = Array.from(
      new Set([formData.subRegion, ...selectedSubRegions]),
    );
    setFormData((prev) => ({
      ...prev,
      workArea,
    }));
  };

  const performUpdateTrainer = async ({ securityPassword, headers } = {}) => {
    setIsSubmitting(true);

    try {
      const data = {
        ...formData,
        workArea: formData.workArea,
      };

      await dispatch(
        updateTrainer({
          data: { id: selectedUser._id, data },
          securityPassword,
          headers,
        }),
      ).unwrap();

      toast.success("Trainer updated successfully");
      setIsEdit(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        ...formData,
        workArea: formData.workArea,
      };

      // await dispatch(
      //   updateTrainer({
      //     data: { id: selectedUser._id, data },
      //     securityPassword,
      //     headers,
      //   }),
      // ).unwrap();

      toast.success("Trainer updated successfully");
      setIsEdit(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl h-[85vh] flex flex-col enhanced-scrollbar">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Trainer
          </h2>
          <button
            onClick={() => setIsEdit(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400
                     dark:hover:text-gray-200 rounded-full hover:bg-gray-100
                     dark:hover:bg-gray-700 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form
          id="editTrainerForm"
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                       dark:focus:ring-teal-600 focus:border-transparent transition-colors"
                // required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{9}"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                       dark:focus:ring-teal-600 focus:border-transparent transition-colors"
                // required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                       dark:focus:ring-teal-600 focus:border-transparent transition-colors"
                // required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                       dark:focus:ring-teal-600 focus:border-transparent transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Main Status
              </label>
              <select
                name="main_status"
                value={formData.main_status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                       dark:focus:ring-teal-600 focus:border-transparent transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="waiting">Waiting</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsEdit(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100
                     dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            form="editTrainerForm"
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                     focus:ring-4 focus:ring-teal-500/50 transition-colors
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
              "Update Trainer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTrainer;
