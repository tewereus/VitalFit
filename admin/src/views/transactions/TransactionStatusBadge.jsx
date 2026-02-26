import React from "react";
import {
  FaSpinner,
  FaCheck,
  FaTimes,
  FaBan,
  FaHandHoldingUsd,
  FaCheckDouble,
} from "react-icons/fa";

const TransactionStatusBadge = ({ status, cashHandling }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: <FaSpinner className="animate-spin" />,
          text: "Pending",
          bgClass: "bg-yellow-100 dark:bg-yellow-900/30",
          textClass: "text-yellow-800 dark:text-yellow-300",
        };
      // "collected" status has been removed, cash is now "pending" until verified
      case "verified":
        return {
          icon: <FaCheckDouble />,
          text: "Deposit Verified",
          bgClass: "bg-indigo-100 dark:bg-indigo-900/30",
          textClass: "text-indigo-800 dark:text-indigo-300",
        };
      case "completed":
        return {
          icon: <FaCheck />,
          text: "Completed",
          bgClass: "bg-green-100 dark:bg-green-900/30",
          textClass: "text-green-800 dark:text-green-300",
        };
      case "failed":
        return {
          icon: <FaTimes />,
          text: "Failed",
          bgClass: "bg-red-100 dark:bg-red-900/30",
          textClass: "text-red-800 dark:text-red-300",
        };
      case "cancelled":
        return {
          icon: <FaBan />,
          text: "Cancelled",
          bgClass: "bg-gray-100 dark:bg-gray-700",
          textClass: "text-gray-800 dark:text-gray-300",
        };
      default:
        return {
          icon: <FaSpinner />,
          text: status || "Unknown",
          bgClass: "bg-gray-100 dark:bg-gray-700",
          textClass: "text-gray-800 dark:text-gray-300",
        };
    }
  };

  const { icon, text, bgClass, textClass } = getStatusConfig();

  // Get tooltip text with collector/verifier info
  const getTooltipText = () => {
    if (!cashHandling) return null;

    let tooltipText = "";

    if (
      cashHandling.collectedBy &&
      status === "pending" &&
      cashHandling.collectionDate
    ) {
      tooltipText = `Collected by: ${
        cashHandling.collectedBy.fullname || "Unknown"
      }`;
      if (cashHandling.collectionDate) {
        tooltipText += ` on ${new Date(
          cashHandling.collectionDate
        ).toLocaleDateString()}`;
      }
    }

    if (cashHandling.verifiedBy && status === "verified") {
      tooltipText = `Verified by: ${
        cashHandling.verifiedBy.fullname || "Unknown"
      }`;
      if (cashHandling.verificationDate) {
        tooltipText += ` on ${new Date(
          cashHandling.verificationDate
        ).toLocaleDateString()}`;
      }
      if (cashHandling.depositReference) {
        tooltipText += ` (Ref: ${cashHandling.depositReference})`;
      }
    }

    return tooltipText;
  };

  const tooltipText = getTooltipText();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgClass} ${textClass}`}
      title={tooltipText}
    >
      <span className="mr-1">{icon}</span>
      {text}
    </span>
  );
};

export default TransactionStatusBadge;
