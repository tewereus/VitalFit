import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiX } from "react-icons/fi";
import { updateUser } from "../../../store/users/userSlice";
import SecurityPasswordModal from "../../../components/SecurityPasswordModal";
import useSecurityVerification from "../../../hooks/useSecurityVerification";

const EditUser = ({ setIsEdit, selectedUser }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: selectedUser.username,
    email: selectedUser.email,
    mobile: selectedUser.mobile,
    status: selectedUser.status,
    reason: selectedUser.reason || "",
    balance: selectedUser.balance,
  });
  const {
    showSecurityModal,
    executeWithSecurity,
    handleSecuritySuccess,
    handleSecurityClose,
  } = useSecurityVerification("edit");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToUpdate = { ...formData };
    if (dataToUpdate.status !== "blocked") {
      dataToUpdate.reason = "";
    }
    executeWithSecurity(async ({ securityPassword, headers }) => {
      await dispatch(
        updateUser({
          id: selectedUser._id,
          data: dataToUpdate,
          securityPassword,
          headers,
        }),
      );
      setIsEdit(false);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-h-[90vh] overflow-y-auto enhanced-scrollbar">
      <div className="flex justify-between items-center px-4 py-4 sm:p-6 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white">Edit User</h2>
        <button
          onClick={() => setIsEdit(false)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FiX className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Account Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 
                     dark:focus:ring-teal-600 focus:border-transparent transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
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
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
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
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 
                     dark:focus:ring-teal-600 focus:border-transparent transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setIsEdit(false)}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                   dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                   focus:ring-4 focus:ring-teal-500/50 transition-colors"
          >
            Update User
          </button>
        </div>
      </form>
      <SecurityPasswordModal
        isOpen={showSecurityModal}
        onClose={handleSecurityClose}
        onSuccess={handleSecuritySuccess}
        action="edit user"
        title="Security Verification - Edit User"
      />
    </div>
  );
};

export default EditUser;
