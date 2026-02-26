import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTools,
  FaLock,
  FaCalendarAlt,
  FaTimes,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";
import MultiSelect from "./shared/MultiSelect";

const MaintenanceModal = ({ isOpen, onClose, currentStatus }) => {
  const [formData, setFormData] = useState({
    isEnabled: currentStatus?.isEnabled || false,
    message:
      currentStatus?.message ||
      "We are currently performing maintenance. Please check back later.",
    endTime: currentStatus?.endTime
      ? new Date(currentStatus.endTime).toISOString().slice(0, 16)
      : "",
    adminPassword: "",
    affectedRoles: currentStatus?.affectedRoles || [
      "user",
      "manager",
      "printer",
      "rider",
    ],
    showWarning:
      currentStatus?.showWarning !== undefined
        ? currentStatus.showWarning
        : true,
    warningPeriod: currentStatus?.warningPeriod || 15,
    warningMessage:
      currentStatus?.warningMessage ||
      "The system will be undergoing maintenance soon. Please save your work.",
  });

  // Role options for MultiSelect
  const roleOptions = [
    { value: "user", label: "Users" },
    { value: "manager", label: "Managers" },
    { value: "printer", label: "Printers" },
    { value: "rider", label: "Riders" },
  ];

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle role selection change
  const handleRolesChange = (selectedRoles) => {
    setFormData({
      ...formData,
      affectedRoles: selectedRoles,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.adminPassword) {
      newErrors.adminPassword = "Admin password is required";
    }

    if (formData.isEnabled && !formData.message) {
      newErrors.message = "Message is required when enabling maintenance mode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const performMaintenanceToggle = async ({
  //   securityPassword,
  //   headers,
  // } = {}) => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   console.log(formData);

  //   try {
  //     // await dispatch(
  //     //   toggleMaintenanceMode({
  //     //     data: formData,
  //     //     securityPassword,
  //     //     headers,
  //     //   }),
  //     // ).unwrap();

  //     onClose();
  //     // Reset form
  //     setFormData({
  //       ...formData,
  //       adminPassword: "",
  //     });
  //   } catch (error) {
  //     // Handle specific errors
  //     if (error.response?.data?.message === "Invalid admin password") {
  //       setErrors({
  //         ...errors,
  //         adminPassword: "Invalid password",
  //       });
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FaTools className="mr-2 text-teal-500 dark:text-teal-400" />
              Maintenance Mode
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Maintenance Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {formData.isEnabled ? "Enabled" : "Disabled"}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.isEnabled
                      ? "Site is in maintenance mode"
                      : "Site is operating normally"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isEnabled"
                    checked={formData.isEnabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                </label>
              </div>

              {/* Maintenance Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maintenance Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-lg border ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                  placeholder="Enter message to display during maintenance"
                  disabled={!formData.isEnabled}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* End Time */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1 text-teal-500 dark:text-teal-400" />
                  Expected End Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  disabled={!formData.isEnabled}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  If set, a countdown timer will be displayed to users
                </p>
              </div>

              {/* Affected Roles */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaUsers className="mr-1 text-teal-500 dark:text-teal-400" />
                  Who will be in maintenance mode?
                </label>
                <MultiSelect
                  options={roleOptions}
                  selectedOptions={formData.affectedRoles}
                  onChange={handleRolesChange}
                  placeholder="Select roles (default: all)"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Select which user types will see the maintenance page
                </p>
              </div>

              {/* Warning Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Maintenance Warning Settings
                </h4>

                {/* Show Warning Toggle */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-700 dark:text-gray-300">
                      Show Warning Before Maintenance
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Display a warning to users before maintenance begins
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="showWarning"
                      checked={formData.showWarning}
                      onChange={handleChange}
                      className="sr-only peer"
                      disabled={!formData.isEnabled}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                  </label>
                </div>

                {formData.showWarning && (
                  <>
                    {/* Warning Period */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Warning Period (minutes)
                      </label>
                      <input
                        type="number"
                        name="warningPeriod"
                        value={formData.warningPeriod}
                        onChange={handleChange}
                        min="1"
                        max="1440"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        disabled={!formData.isEnabled || !formData.showWarning}
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        How many minutes before maintenance to show the warning
                        (1-1440)
                      </p>
                    </div>

                    {/* Warning Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Warning Message
                      </label>
                      <textarea
                        name="warningMessage"
                        value={formData.warningMessage}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        disabled={!formData.isEnabled || !formData.showWarning}
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Message to display to users before maintenance begins
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Admin Password */}
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaLock className="mr-1 text-teal-500 dark:text-teal-400" />
                  Admin Password
                </label>
                <input
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.adminPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                  placeholder="Enter your admin password to confirm"
                />
                {errors.adminPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.adminPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {formData.isEnabled ? "Enable" : "Disable"} Maintenance Mode
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModal;
