import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import {
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaSpinner,
  FaCheck,
  FaSearch,
} from "react-icons/fa";

Modal.setAppElement("#root");

const users = [
  {
    preference: {
      mode: "light",
      language: "en",
    },
    affiliateBlockedUntil: null,
    _id: "68235d4d5db113269123f9e8",
    username: "mmmdsa",
    fullname: "ghffdfdgd",
    email: "mmm@mmm.mmm",
    mobile: "123454321",
    password: "$2a$10$SO1J0Dk94uL/PEWIw4TA1uvHmBXahKPMLJ0C5CzFNY/7NoHyE1wm6",
    role: "user",
    isBlocked: false,
    lockUntil: null,
    level: 0,
    ordersCount: 3,
    createdAt: "2025-05-13T14:55:09.510Z",
    updatedAt: "2026-02-17T11:54:12.639Z",
    lastLoginAt: "2026-02-17T11:54:12.529Z",
    lastLoginIp: "::1",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjM1ZDRkNWRiMTEzMjY5MTIzZjllOCIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTc3MTMyOTI1MiwiZXhwIjoxNzcxNTg4NDUyfQ.lCv252nm7j0p0ymUc_uDwkb_0imPmsGxgGYTRRLDqk4",
    profile:
      "https://res.cloudinary.com/dtwsoqhh4/image/upload/v1748327408/profiles/jltuajvazza4ksxjjoah.png",
    passwordChangedAt: "2025-05-27T11:55:41.353Z",
    blockedUntil: null,
    reason: "",
    affiliateBlockNote: "",
    affiliateBlockReason: "",
    isAffiliateBlocked: false,
  },
  {
    preference: {
      mode: "dark",
      language: "en",
    },
    isAffiliateBlocked: false,
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    affiliateBlockNote: "",
    _id: "682304a946aad12499b38059",
    username: "mmm",
    fullname: "mmm",
    email: "tewereus16@gmail.com",
    mobile: "147852369",
    password: "$2a$10$E8cqwoDaUKKGnzled7ZWGuSs0nQxTWChKX7NPzKRsxpyvYCN1yB.i",
    profile:
      "https://res.cloudinary.com/dtwsoqhh4/image/upload/v1747125417/profiles/qzpessliskfufge8zxcq.jpg",
    role: "user",
    isBlocked: false,
    lockUntil: null,
    level: 0,
    ordersCount: 0,
    createdAt: "2025-05-13T08:36:57.946Z",
    updatedAt: "2026-02-03T12:49:31.335Z",
    lastLoginAt: "2025-05-13T08:42:31.610Z",
    lastLoginIp: "::1",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjMwNGE5NDZhYWQxMjQ5OWIzODA1OSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTc0NzEyNTc1MSwiZXhwIjoxNzQ3Mzg0OTUxfQ.ep9877uYHZJ3vAr_M5SeoJlrrhYFR_--h3IKR7p8ryw",
    blockedUntil: null,
    reason: "",
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    isAffiliateBlocked: false,
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    affiliateBlockNote: "",
    _id: "6823006c145abe6609719755",
    username: "kkk",
    fullname: "kkkdfb",
    email: "jjj@jjj.jjj",
    mobile: "123321124",
    password: "$2a$10$jJejKhVnehOvHcg02S42iOgespagRQE2ApVTEtnn5Qz7W6YAfrYdu",
    profile:
      "https://res.cloudinary.com/dtwsoqhh4/image/upload/v1747124552/profiles/d4omyctfbhktyvi3gp4g.jpg",
    role: "user",
    isBlocked: false,
    lockUntil: null,
    level: 0,
    ordersCount: 0,
    createdAt: "2025-05-13T08:18:52.944Z",
    updatedAt: "2026-02-04T11:21:49.154Z",
    lastLoginAt: "2026-02-04T11:21:49.019Z",
    lastLoginIp: "::1",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjMwMDZjMTQ1YWJlNjYwOTcxOTc1NSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTc3MDIwNDEwOSwiZXhwIjoxNzcwNDYzMzA5fQ.yuZlt17q621qktqixSWlHLebYqUGtersVh_OW7m73Fc",
    blockedUntil: null,
    reason: "",
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    isAffiliateBlocked: false,
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    affiliateBlockNote: "",
    _id: "67443f357ba768bb8b489d06",
    username: "gfdgsfd",
    fullname: "tteqwteewqeq",
    email: "ghgasd@sadsd.das",
    mobile: "123123125",
    password: "$2a$10$XwH4/jXkfAJpIgxhPZah6uL4oz3J4OkY1A2iLFkib5Q.GUcAji4CK",
    role: "user",
    isBlocked: false,
    lockUntil: null,
    createdAt: "2024-11-25T09:11:17.945Z",
    updatedAt: "2026-02-03T13:25:07.749Z",
    level: 0,
    blockedUntil: null,
    ordersCount: 0,
    reason: "",
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    reason: "",
    blockedUntil: null,
    isAffiliateBlocked: false,
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    affiliateBlockNote: "",
    lockUntil: null,
    ordersCount: 0,
    _id: "6742e9dc2d01c48cb4377669",
    username: "gjhg",
    fullname: "gfhdhgjjghhg",
    email: "tygjgjk@gjhgjh.hgf",
    mobile: "111112226",
    password: "$2a$10$mejA5XWihq9hc5hbm8eiouR/2mtcrwOt6wCHNL241L0QnyeGq7txq",
    role: "user",
    isBlocked: false,
    createdAt: "2024-11-24T08:54:52.760Z",
    updatedAt: "2024-12-08T13:22:20.462Z",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDJlOWRjMmQwMWM0OGNiNDM3NzY2OSIsImlhdCI6MTczMjUyNTY4NCwiZXhwIjoxNzMyNzg0ODg0fQ.wPJCl__HJ6mwpzAR_WnysgHBbq6RIdZSl-yLy5qn_vU",
    level: 0,
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    reason: "",
    blockedUntil: null,
    isAffiliateBlocked: false,
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    affiliateBlockNote: "",
    lockUntil: null,
    ordersCount: 0,
    _id: "6742df182d01c48cb4377641",
    username: "qqqqqqqq",
    fullname: "qqqqqq",
    email: "qqqqq@qq.ggg",
    mobile: "111112222",
    password: "$2a$10$qU5LQw6S1q/B7RrSBBocwu8juE8JMnYWe4A20Q/1TmmlmNMNkcYwK",
    profile: null,
    role: "user",
    isBlocked: false,
    createdAt: "2024-11-24T08:08:56.637Z",
    updatedAt: "2024-12-08T13:22:20.462Z",
    level: 0,
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    _id: "6731b637bada57ba72473f30",
    username: "tewe reus",
    fullname: "tewe reus",
    email: "qqq@qqq.qq",
    mobile: "111111112",
    password: "$2a$10$AFZbWbp1DzCRb.HlO6iN5.5dtdjxCPbWf8r84XXi8d9G8GDRCgRQe",
    profile:
      "https://product-images.obsv3.et-global-1.ethiotelecom.et/profiles/users/1751876168243-d9e3a280f4662d9f.jpeg",
    role: "user",
    isBlocked: false,
    createdAt: "2024-11-11T07:41:46.388Z",
    updatedAt: "2026-02-25T12:21:04.106Z",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzFiNjM3YmFkYTU3YmE3MjQ3M2YzMCIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTc3MTg1ODExOCwiZXhwIjoxNzcxODU4MTM4fQ.nosD7uOmY99qcKG552FUgxLFYA1UCJuXHfodkjqyzk0",
    passwordResetExpires: "2024-11-24T09:13:03.900Z",
    passwordResetToken:
      "9f278f63470703d8b5579abb6de98e6ff2d1558a55aadd8e055df783b0bec7c5",
    lockUntil: null,
    level: 4,
    ordersCount: 21,
    lastLoginAt: "2026-02-23T14:48:38.790Z",
    lastLoginIp: "::1",
    blockedUntil: null,
    reason: "",
    affiliateBlockNote: "",
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    isAffiliateBlocked: false,
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    reason: "",
    blockedUntil: null,
    isAffiliateBlocked: false,
    affiliateBlockReason: "",
    affiliateBlockedUntil: null,
    affiliateBlockNote: "",
    lockUntil: null,
    ordersCount: 0,
    _id: "6731b75dbada57ba72473f36",
    username: "JHGhJH",
    fullname: "tewfde reus",
    email: "qqq@qfqgq.qq",
    mobile: "1111111612",
    password: "$2a$10$AFZbWbp1DzCRb.HlO6iN5.5dtdjxCPbWf8r84XXi8d9G8GDRCgRQe",
    profile: "",
    role: "user",
    isBlocked: false,
    createdAt: "2024-11-11T07:41:46.388Z",
    updatedAt: "2024-12-08T13:22:20.462Z",
    level: 0,
  },
];

const CreateTransactionModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    userName: "",
    amount: "",
    currency: "ETB",
    type: "payment",
    method: "bank",
    description: "",
    reference: "",
    notes: "",
    metadata: {},
    withdrawalDestination: "",
    withdrawalMethod: "telebirr",
    withdrawalNote: "",
  });

  // Load users on component mount
  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);

  // Filter users based on search term
  useEffect(() => {
    if (users && users.length > 0 && searchTerm) {
      const lowered = searchTerm.toLowerCase();
      const filtered = users.filter((user) => {
        const fullname = (user.fullname || "").toLowerCase();
        const email = (user.email || "").toLowerCase();
        const username = (user.username || "").toLowerCase();
        const mobile = (user.mobile || "").toLowerCase();
        return (
          fullname.includes(lowered) ||
          email.includes(lowered) ||
          username.includes(lowered) ||
          mobile.includes(lowered)
        );
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user selection
  const handleUserSelect = (user) => {
    setFormData((prev) => ({
      ...prev,
      user: user._id,
      userName: user.fullname || user.username || user.email || "",
    }));
    setSearchTerm(user.fullname);
    setShowUserDropdown(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.user) {
      toast.error("Please select a user");
      return;
    }

    if (!formData.amount || formData.amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!formData.description) {
      toast.error("Please enter a description");
      return;
    }

    // Prepare metadata based on transaction type
    let metadata = {};
    if (formData.type === "withdrawal") {
      if (!formData.withdrawalDestination) {
        toast.error("Please enter a withdrawal destination");
        return;
      }
      metadata = {
        destination: formData.withdrawalDestination,
        source: "web",
        method: formData.withdrawalMethod || "telebirr",
      };
      if (formData.withdrawalNote) {
        metadata.note = formData.withdrawalNote;
      }
    } else if (formData.type === "refund" && formData.refundReason) {
      metadata.refundReason = formData.refundReason;
    }

    // Create transaction data
    const transactionData = {
      user: formData.user,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      type: formData.type,
      status: formData.type === "withdrawal" ? "completed" : "pending",
      method:
        formData.type === "withdrawal"
          ? formData.withdrawalMethod
          : formData.method,
      description: formData.description,
      reference: formData.reference,
      notes: formData.notes,
      metadata,
    };

    setIsCreating(true);
    // dispatch(createTransaction(transactionData))
    //   .unwrap()
    //   .then(() => {
    //     toast.success("Transaction created successfully");
    //     setIsCreating(false);
    //     onClose();
    //   })
    //   .catch((error) => {
    //     toast.error(error || "Failed to create transaction");
    //     setIsCreating(false);
    //   });
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
            <FaMoneyBillWave className="mr-2 text-teal-500 dark:text-teal-400" />
            Create Transaction
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                User
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowUserDropdown(true);
                  }}
                  onFocus={() => setShowUserDropdown(true)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Search users..."
                />
              </div>
              {showUserDropdown && filteredUsers.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                  <ul className="py-1">
                    {filteredUsers.map((user) => (
                      <li
                        key={user._id}
                        onClick={() => handleUserSelect(user)}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center"
                      >
                        <FaUser className="mr-2 text-gray-500 dark:text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullname}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formData.user && (
                <div className="mt-2 text-sm text-teal-600 dark:text-teal-400 flex items-center">
                  <FaCheck className="mr-1" />
                  Selected: {formData.userName}
                </div>
              )}
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transaction Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="payment">Payment</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="refund">Refund</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>

            {/* Amount and Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            {formData.type !== "withdrawal" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Transaction description"
              />
            </div>

            {/* Reference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reference (Optional)
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Invoice #, Order #, etc."
              />
            </div>

            {/* Type-specific fields */}
            {formData.type === "withdrawal" && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Withdrawal Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Destination (Phone / Account)
                    </label>
                    <input
                      type="text"
                      name="withdrawalDestination"
                      value={formData.withdrawalDestination}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Method
                    </label>
                    <select
                      name="withdrawalMethod"
                      value={formData.withdrawalMethod}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="telebirr">Telebirr</option>
                      <option value="cbe">CBE</option>
                      <option value="cbebirr">CBEbirr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Note (Optional)
                    </label>
                    <input
                      type="text"
                      name="withdrawalNote"
                      value={formData.withdrawalNote}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.type === "refund" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Refund Reason
                </label>
                <textarea
                  name="refundReason"
                  value={formData.refundReason || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      refundReason: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Reason for refund"
                ></textarea>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Additional notes"
              ></textarea>
            </div>

            {/* Submit Button */}
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
                disabled={isCreating}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FaCheck size={14} />
                    <span>Create Transaction</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTransactionModal;
