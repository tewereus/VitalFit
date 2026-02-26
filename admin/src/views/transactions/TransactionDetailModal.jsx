import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheck,
  FaSpinner,
  FaDownload,
  FaUpload,
  FaClipboard,
  FaHandHoldingUsd,
  FaMobileAlt,
  FaUniversity,
  FaExternalLinkAlt,
} from "react-icons/fa";
import TransactionStatusBadge from "./TransactionStatusBadge";
import TransactionTypeBadge from "./TransactionTypeBadge";

Modal.setAppElement("#root");

const TransactionDetailModal = ({
  transaction,
  isOpen,
  onClose,
  zIndex = 100,
}) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [attachment, setAttachment] = useState({
    name: "",
    file: null,
    type: "document",
  });
  const [showAttachmentForm, setShowAttachmentForm] = useState(false);

  // Determine verification data source
  const verificationData =
    transaction.metadata?.payer ||
    transaction.metadata?.reference ||
    transaction.metadata?.payerName ||
    transaction.metadata?.receiptNo
      ? transaction.metadata
      : null;

  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachment({
          ...attachment,
          file: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle attachment upload
  const handleAttachmentUpload = () => {
    if (!attachment.name || !attachment.file) {
      toast.error("Please provide a name and file");
      return;
    }

    setIsUploading(true);
  };

  // Copy transaction ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  // Helper to generate receipt URL if not present in transaction
  const getReceiptUrl = () => {
    // 1. Check if explicitly saved
    if (transaction.metadata?.receiptUrl)
      return transaction.metadata.receiptUrl;

    // 2. Try to generate it
    const method = (
      transaction.metadata?.method ||
      transaction.metadata?.paymentGateway ||
      ""
    ).toLowerCase();
    const reference = transaction.referenceId || transaction.reference;
    const destination =
      transaction.metadata?.destination ||
      transaction.metadata?.accountNumber ||
      transaction.metadata?.phone ||
      transaction.metadata?.receiverAccount ||
      "";

    if (!reference) return null;
    const ref = reference.trim();
    const accountDigits = destination.replace(/\D/g, "");

    if (method.includes("telebirr")) {
      return `https://transactioninfo.ethiotelecom.et/receipt/${ref}`;
    } else if (method.includes("dashen")) {
      return `https://receipt.dashensuperapp.com/receipt/${ref}`;
    } else if (method.includes("cbe") && !method.includes("birr")) {
      return `https://apps.cbe.com.et:100/?id=${ref}${accountDigits.slice(-8)}`;
    } else if (method.includes("cbebirr") || method.includes("birr")) {
      return `https://cbepay1.cbe.com.et/aureceipt?TID=${ref}&PH=${accountDigits}`;
    } else if (method.includes("abyssinia")) {
      return `https://cs.bankofabyssinia.com/api/onlineSlip/getDetails/?id=${ref}${accountDigits.slice(
        -8,
      )}`;
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl mx-auto mt-20 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-auto max-h-[90vh] enhanced-scrollbar"
      overlayClassName="fixed inset-0 bg-black/75 flex justify-center z-50"
      style={{ overlay: { zIndex } }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <FaMoneyBillWave className="mr-2 text-teal-500 dark:text-teal-400" />
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Transaction ID */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Transaction ID
              </div>
              <button
                onClick={() => copyToClipboard(transaction.referenceId)}
                className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300"
                title="Copy to clipboard"
              >
                <FaClipboard size={14} />
              </button>
            </div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1">
              {transaction.referenceId}
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 flex items-center">
              <TransactionStatusBadge status={transaction.status} />
            </div>
          </div>

          {/* User */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">User</div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 flex items-center">
              <FaUser className="mr-2 text-teal-500 dark:text-teal-400" />
              {transaction.user?.fullname ||
                transaction.user?.username ||
                "N/A"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {transaction.user?.email || ""}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {transaction.user?.mobile || ""}
            </div>
          </div>

          {/* Type */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Type</div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 flex items-center">
              <TransactionTypeBadge type={transaction.type} />
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Amount
            </div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1">
              {formatCurrency(transaction.amount, transaction.currency)}
            </div>
          </div>

          {/* Method */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Payment Method
            </div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 capitalize">
              {transaction?.metadata?.paymentGateway || "N/A"}
            </div>
          </div>

          {/* Collected By (if cash transaction) */}
          {transaction.method === "cash" &&
            transaction.cashHandling &&
            transaction.cashHandling.collectedBy && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Collected By
                </div>
                <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 flex items-center">
                  <FaUser className="mr-2 text-yellow-500 dark:text-yellow-400" />
                  {transaction.cashHandling.collectedBy.fullname || "Unknown"}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {transaction.cashHandling.collectedBy.email || ""}
                </div>
              </div>
            )}

          {/* Date */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created Date
            </div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 flex items-center">
              <FaCalendarAlt className="mr-2 text-teal-500 dark:text-teal-400" />
              {formatDate(transaction.createdAt)}
            </div>
          </div>

          {/* Processing Date (if completed) */}
          {transaction.processingDate && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Processing Date
              </div>
              <div className="text-lg font-medium text-gray-800 dark:text-white mt-1 flex items-center">
                <FaCalendarAlt className="mr-2 text-teal-500 dark:text-teal-400" />
                {formatDate(transaction.processingDate)}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Description
          </div>
          <div className="text-lg font-medium text-gray-800 dark:text-white mt-1">
            {transaction.description}
          </div>
        </div>

        {/* Reference */}
        {transaction.reference && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Reference
            </div>
            <div className="text-lg font-medium text-gray-800 dark:text-white mt-1">
              {transaction.reference}
            </div>
          </div>
        )}

        {/* Notes */}
        {transaction.notes && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Notes
            </div>
            <div className="text-base text-gray-800 dark:text-white mt-1 whitespace-pre-line">
              {transaction.notes}
            </div>
          </div>
        )}

        {/* Withdrawal Details - Enhanced UI */}
        {transaction.type === "withdrawal" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 shadow-sm">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaHandHoldingUsd className="text-teal-600 dark:text-teal-400" />
                <span className="font-bold text-gray-800 dark:text-white text-sm uppercase tracking-wide">
                  Withdrawal Information
                </span>
              </div>
              {transaction.metadata?.source && (
                <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded capitalize">
                  Via {transaction.metadata.source}
                </span>
              )}
            </div>

            {/* Success UI for Completed Withdrawals */}
            {transaction.status === "completed" && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 border-t border-green-100 dark:border-green-800/30 flex justify-between items-center">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <FaCheck className="text-lg" />
                  <span className="font-bold text-sm">
                    Withdrawal Completed Successfully
                  </span>
                </div>
                {getReceiptUrl() && (
                  <a
                    href={getReceiptUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-700 text-xs font-bold hover:bg-green-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                  >
                    <FaExternalLinkAlt /> View Receipt
                  </a>
                )}
              </div>
            )}

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination Account */}
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Destination Account
                </span>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    {transaction.metadata?.method?.includes("cbe") ||
                    transaction.metadata?.method?.includes("bank") ? (
                      <FaUniversity size={20} />
                    ) : (
                      <FaMobileAlt size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white text-base break-all">
                      {transaction.metadata?.destination ||
                        transaction.metadata?.withdrawalDetails
                          ?.accountNumber ||
                        "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {transaction.metadata?.method ||
                        transaction.metadata?.withdrawalDetails?.bankName ||
                        "Unknown Method"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Note / Rejection Reason */}
              {transaction.metadata?.note && (
                <div
                  className={`p-3 rounded-lg border ${
                    transaction.status === "failed"
                      ? "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800/50"
                      : "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-800/50"
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                      transaction.status === "failed"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {transaction.status === "failed"
                      ? "Rejection Reason"
                      : "Admin Note"}
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {transaction.metadata.note}
                  </p>
                  {transaction.metadata.updatedAt && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                      <FaCheck size={10} /> Processed on{" "}
                      {new Date(
                        transaction.metadata.updatedAt,
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receipt Button for Deposits (if available) */}
        {transaction.type === "deposit" &&
          transaction.status === "completed" &&
          getReceiptUrl() && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 flex justify-between items-center shadow-sm">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Transaction Receipt
              </span>
              <a
                href={getReceiptUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 px-4 py-2 rounded-lg border border-teal-200 dark:border-teal-800 text-sm font-bold hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
              >
                <FaExternalLinkAlt />
                View Official Receipt
              </a>
            </div>
          )}

        {/* Metadata */}
        {transaction.metadata &&
          Object.keys(transaction.metadata).length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Additional Details
              </div>

              {/* Verification Data */}
              {verificationData && (
                <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">
                      Verification Data
                    </div>
                    {transaction.metadata?.note && (
                      <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">
                        Admin Verified
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {verificationData.payer && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Payer
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.payer}
                        </span>
                      </div>
                    )}
                    {verificationData.payerName && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Payer Name
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.payerName}
                        </span>
                      </div>
                    )}
                    {verificationData.payerTelebirrNo && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Payer Mobile
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.payerTelebirrNo}
                        </span>
                      </div>
                    )}
                    {verificationData.payerAccountType && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Account Type
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.payerAccountType}
                        </span>
                      </div>
                    )}
                    {verificationData.settledAmount && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Settled Amount
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.settledAmount}
                        </span>
                      </div>
                    )}
                    {verificationData.transactionStatus && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Status
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.transactionStatus}
                        </span>
                      </div>
                    )}
                    {verificationData.payerAccount && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Payer Account
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.payerAccount}
                        </span>
                      </div>
                    )}
                    {verificationData.creditedPartyName && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Credited Name
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.creditedPartyName}
                        </span>
                      </div>
                    )}
                    {verificationData.creditedPartyAccountNo && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Credited Account
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.creditedPartyAccountNo}
                        </span>
                      </div>
                    )}
                    {verificationData.receiver && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Receiver
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.receiver}
                        </span>
                      </div>
                    )}
                    {verificationData.receiverAccount && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Receiver Account
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.receiverAccount}
                        </span>
                      </div>
                    )}
                    {verificationData.amount && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Verified Amount
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.amount}
                        </span>
                      </div>
                    )}
                    {verificationData.settledDateTime && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Settled Date
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.settledDateTime}
                        </span>
                      </div>
                    )}
                    {verificationData.date && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Bank Date
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {new Date(verificationData.date).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {verificationData.reference && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Bank Reference
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium font-mono">
                          {verificationData.reference}
                        </span>
                      </div>
                    )}
                    {verificationData.receiptNo && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Receipt No
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium font-mono">
                          {verificationData.receiptNo}
                        </span>
                      </div>
                    )}
                    {verificationData.paymentReason && (
                      <div className="md:col-span-2">
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Payment Reason
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.paymentReason}
                        </span>
                      </div>
                    )}
                    {verificationData.reason && (
                      <div className="md:col-span-2">
                        <span className="text-gray-500 dark:text-gray-400 text-xs block">
                          Reason
                        </span>
                        <span className="text-gray-800 dark:text-white font-medium">
                          {verificationData.reason}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order ID */}
              {transaction.metadata.orderId && (
                <div className="mb-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Order ID
                  </div>
                  <div className="text-base text-gray-800 dark:text-white">
                    {transaction.metadata.orderId.orderID || "N/A"}
                  </div>
                </div>
              )}

              {/* Refund Reason */}
              {transaction.metadata.refundReason && (
                <div className="mb-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Refund Reason
                  </div>
                  <div className="text-base text-gray-800 dark:text-white">
                    {transaction.metadata.refundReason}
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Attachments */}
        {transaction.attachments && transaction.attachments.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Attachments
            </div>
            <div className="space-y-2">
              {transaction.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <FaFileAlt className="text-teal-500 dark:text-teal-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        {attachment.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(attachment.uploadedAt)}
                      </div>
                    </div>
                  </div>
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300"
                  >
                    <FaDownload size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Attachment Form */}
        {showAttachmentForm && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add Attachment
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={attachment.name}
                  onChange={(e) =>
                    setAttachment({ ...attachment, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Receipt, Invoice, etc."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={attachment.type}
                  onChange={(e) =>
                    setAttachment({ ...attachment, type: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="document">Document</option>
                  <option value="receipt">Receipt</option>
                  <option value="invoice">Invoice</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAttachmentForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAttachmentUpload}
                  disabled={isUploading}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload size={14} />
                      <span>Upload</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setShowAttachmentForm(!showAttachmentForm)}
            className="bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 border border-teal-500 dark:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <FaUpload size={14} />
            <span>{showAttachmentForm ? "Cancel" : "Add Attachment"}</span>
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionDetailModal;
