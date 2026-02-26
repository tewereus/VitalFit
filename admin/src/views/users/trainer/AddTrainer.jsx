import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import MultiSelect from "../../../components/shared/MultiSelect";
import { toast } from "react-hot-toast";

const AddTrainer = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    password: "",
    fullname: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobile) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const performAddTrainer = async ({ securityPassword, headers } = {}) => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
      };

      // await dispatch(
      //   addTrainer({
      //     data,
      //     securityPassword,
      //     headers,
      //   }),
      // ).unwrap();

      toast.success("Trainer added successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to add manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // executeWithSecurity(performAddTrainer);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
      };

      // await dispatch(
      //   addTrainer({
      //     data,
      //     securityPassword,
      //     headers,
      //   }),
      // ).unwrap();

      toast.success("Trainer added successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to add manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl h-[85vh] flex flex-col">
      {/* Fixed Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Add New Trainer
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400
                     dark:hover:text-gray-200 rounded-full hover:bg-gray-100
                     dark:hover:bg-gray-700 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <form
          id="managerForm"
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >
          <div className="flex-grow overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
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
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{9}"
                    placeholder="9 digits mobile number"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                           dark:focus:ring-teal-600 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                           dark:focus:ring-teal-600 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500
                           dark:focus:ring-teal-600 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100
                     dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            form="managerForm"
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
              "Add Trainer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTrainer;
