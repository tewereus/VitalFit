import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserLock, FaTimes, FaSpinner, FaUserSlash } from "react-icons/fa";

const BlockMemberModal = ({
  isOpen,
  onClose,
  userToBlock,
  blockType = "user",
}) => {
  const dispatch = useDispatch();
  // Gold theme mock data
  const mockUsers = [
    { id: 1, username: "john", isBlocked: false, status: "active" },
    { id: 2, username: "jane", isBlocked: false, status: "active" },
    { id: 3, username: "blockeduser", isBlocked: true, status: "blocked" },
    { id: 4, username: "goldmember", isBlocked: false, status: "active" },
    { id: 5, username: "trialuser", isBlocked: false, status: "active" },
  ];

  const user =
    mockUsers.find((u) => u.username === userToBlock?.username) || mockUsers[0];
  // const isAffiliateBlock = blockType === "affiliate";
  // const blockedUntil = null;
  // const isCurrentlyBlocked = user.isBlocked;
  // const blockReason = user.reason || "";
  // const blockNote = "";
  // const { isLoading } = useSelector((state) => state.users);
  const isAffiliateBlock = blockType === "affiliate";
  const blockedUntil = isAffiliateBlock
    ? userToBlock?.affiliateBlockedUntil
    : userToBlock?.blockedUntil;
  const isCurrentlyBlocked = isAffiliateBlock
    ? userToBlock?.isAffiliateBlocked
    : userToBlock?.isBlocked;
  const blockReason = isAffiliateBlock
    ? userToBlock?.affiliateBlockReason
    : userToBlock?.reason;
  const blockNote = isAffiliateBlock
    ? userToBlock?.affiliateBlockNote
    : userToBlock?.note;

  const [formData, setFormData] = useState({
    reason: "manual_block",
    duration: 60, // Default to 1 hour
    note: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToBlock) {
      if (isCurrentlyBlocked === true && blockedUntil) {
        const durationInMinutes = Math.round(
          (new Date(blockedUntil) - new Date()) / (1000 * 60),
        );
        setFormData({
          reason: blockReason || "manual_block",
          duration: durationInMinutes > 0 ? durationInMinutes : 26280000, // Handle expired or indefinite
          note: blockNote || "",
        });
      } else {
        // Reset form for a new block
        setFormData({
          reason: "manual_block",
          duration: 60,
          note: "",
        });
      }
      setErrors({});
    }
  }, [userToBlock]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    } else if (isNaN(formData.duration) || formData.duration <= 0) {
      newErrors.duration = "Duration must be a positive number of minutes.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const blockData = {
        userId: userToBlock._id,
        reason: formData.reason,
        duration: parseInt(formData.duration),
        note: formData.note,
      };
      console.log(blockData);
      dispatch(async ({ securityPassword, headers } = {}) => {
        try {
          if (isAffiliateBlock) {
            await dispatch(
              blockAffiliateUser({
                data: blockData,
                securityPassword,
                headers,
              }),
            ).unwrap();
          } else {
            await dispatch(
              blockUser({
                data: blockData,
                securityPassword,
                headers,
              }),
            ).unwrap();
          }
          onClose();
        } catch (error) {}
      });
    }
  };

  const handleUnblock = () => {
    executeWithSecurity(async ({ securityPassword, headers } = {}) => {
      try {
        if (isAffiliateBlock) {
          await dispatch(
            unblockAffiliateUser({
              userId: userToBlock._id,
              securityPassword,
              headers,
            }),
          ).unwrap();
        } else {
          await dispatch(
            unblockUser({
              userId: userToBlock._id,
              securityPassword,
              headers,
            }),
          ).unwrap();
        }
        onClose();
      } catch (error) {}
    });
  };

  const reasonOptions = [
    { value: "manual_block", label: "Manual Block" },
    { value: "suspicious_activity", label: "Suspicious Activity" },
    { value: "spamming", label: "Spamming" },
    { value: "abusive_behavior", label: "Abusive Behavior" },
    { value: "cheating", label: "Cheating" },
    {
      value: "terms_of_service_violation",
      label: "Terms of Service Violation",
    },
  ];

  const durationOptions = [
    { value: 30, label: "30 minutes" },
    { value: 60, label: "1 hour" },
    { value: 360, label: "6 hours" },
    { value: 1440, label: "1 day" },
    { value: 10080, label: "1 week" },
    { value: 43200, label: "1 month" },
    { value: 26280000, label: "Indefinite" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaUserLock className="text-red-500 mr-3 text-xl" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isAffiliateBlock ? "Block Affiliate Access" : "Block User"}:{" "}
              {userToBlock?.username}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 sm:p-6 space-y-4">
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500"
              >
                {reasonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Duration (minutes)
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.duration
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500`}
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.duration && (
                <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Note (Optional)
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Add an internal note about this block..."
                rows="3"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
            >
              Cancel
            </button>
            {isCurrentlyBlocked === true && (
              <button
                type="button"
                onClick={handleUnblock}
                // disabled={isLoading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center disabled:opacity-50"
              >
                <FaUserSlash className="mr-2" />{" "}
                {isAffiliateBlock ? "Unblock Affiliate Access" : "Unblock User"}
              </button>
            )}
            <button
              type="submit"
              // disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center disabled:opacity-50"
            >
              {/* {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : ( */}
              <FaUserLock className="mr-2" />
              {/* )} */}
              {isCurrentlyBlocked === true ? "Update Block" : "Block User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlockMemberModal;
