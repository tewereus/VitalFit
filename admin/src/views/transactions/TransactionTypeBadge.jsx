import React from "react";
import { 
  FaMoneyBillWave, 
  FaArrowUp, 
  FaUndo, 
  FaBalanceScale 
} from "react-icons/fa";

const TransactionTypeBadge = ({ type }) => {
  const getTypeConfig = () => {
    switch (type) {
      case "payment":
        return {
          icon: <FaMoneyBillWave />,
          text: "Payment",
          bgClass: "bg-blue-100 dark:bg-blue-900/30",
          textClass: "text-blue-800 dark:text-blue-300",
        };
      case "withdrawal":
        return {
          icon: <FaArrowUp />,
          text: "Withdrawal",
          bgClass: "bg-purple-100 dark:bg-purple-900/30",
          textClass: "text-purple-800 dark:text-purple-300",
        };
      case "refund":
        return {
          icon: <FaUndo />,
          text: "Refund",
          bgClass: "bg-orange-100 dark:bg-orange-900/30",
          textClass: "text-orange-800 dark:text-orange-300",
        };
      case "adjustment":
        return {
          icon: <FaBalanceScale />,
          text: "Adjustment",
          bgClass: "bg-teal-100 dark:bg-teal-900/30",
          textClass: "text-teal-800 dark:text-teal-300",
        };
      default:
        return {
          icon: <FaMoneyBillWave />,
          text: type || "Unknown",
          bgClass: "bg-gray-100 dark:bg-gray-700",
          textClass: "text-gray-800 dark:text-gray-300",
        };
    }
  };

  const { icon, text, bgClass, textClass } = getTypeConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgClass} ${textClass}`}
    >
      <span className="mr-1">{icon}</span>
      {text}
    </span>
  );
};

export default TransactionTypeBadge;
