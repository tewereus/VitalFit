import React, { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

// Gold theme mock data
const mockUsers = [
  {
    id: 1,
    username: "john",
    email: "john@email.com",
    mobile: "1234567890",
    status: "active",
    reason: "",
    balance: 100,
  },
  {
    id: 2,
    username: "jane",
    email: "jane@email.com",
    mobile: "2345678901",
    status: "active",
    reason: "",
    balance: 200,
  },
  {
    id: 3,
    username: "blockeduser",
    email: "blocked@email.com",
    mobile: "3456789012",
    status: "blocked",
    reason: "Violation",
    balance: 0,
  },
  {
    id: 4,
    username: "goldmember",
    email: "gold@email.com",
    mobile: "4567890123",
    status: "active",
    reason: "",
    balance: 500,
  },
  {
    id: 5,
    username: "trialuser",
    email: "trial@email.com",
    mobile: "5678901234",
    status: "active",
    reason: "",
    balance: 50,
  },
];

const EditMember = ({ setIsEdit, selectedUser }) => {
  // Use mock data for editing
  const user =
    mockUsers.find((u) => u.username === selectedUser?.username) ||
    mockUsers[0];
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    status: user.status,
    reason: user.reason || "",
    balance: user.balance,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend call, just close modal
    setIsEdit(false);
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
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 
                     dark:focus:ring-yellow-600 focus:border-transparent transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 
                     dark:focus:ring-yellow-600 focus:border-transparent transition-colors"
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
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 
                     dark:focus:ring-yellow-600 focus:border-transparent transition-colors"
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
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 
                     dark:focus:ring-yellow-600 focus:border-transparent transition-colors"
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
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 
                   focus:ring-4 focus:ring-yellow-500/50 transition-colors"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
