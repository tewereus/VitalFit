import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiX,
  FiUser,
  FiShoppingBag,
  FiImage,
  FiDollarSign,
  FiActivity,
  FiShield,
  FiTag,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
} from "react-icons/fi";

const ViewMember = ({
  setIsView,
  selectedUser,
  hideAffiliateAssets = false,
}) => {
  // Use mock data only
  const mockUsers = [
    { id: 1, mockUsersname: "john", status: "active", joined: "2026-02-01" },
    { id: 2, mockUsersname: "jane", status: "active", joined: "2026-02-10" },
    {
      id: 3,
      mockUsersname: "blockedmockUsers",
      status: "blocked",
      joined: "2026-01-15",
    },
    {
      id: 4,
      mockUsersname: "goldmember",
      status: "active",
      joined: "2026-02-20",
    },
    {
      id: 5,
      mockUsersname: "trialmockUsers",
      status: "active",
      joined: "2026-02-25",
    },
  ];
  // const mockUsers =
  //   mockUsers.find((u) => u.mockUsersname === selectedUser?.mockUsersname) ||
  //   mockUsers[0];
  const dispatch = useDispatch();
  // const { selectedUserFullDetails, isLoading, mockUsersImages } = useSelector(
  //   (state) => state.mockUserss,
  // );
  const [activeTab, setActiveTab] = useState("overview");

  // State for Orders tab
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [loadingOrderDetails, setLoadingOrderDetails] = useState({});

  // State for Transactions tab
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionDetailModalOpen, setIsTransactionDetailModalOpen] =
    useState(false);

  // State for Image Modal
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getUserFullDetails(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Or ETB based on your app
    }).format(amount || 0);
  };

  // --- Handlers for modals and expansion ---
  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeImageModal = () => setSelectedImage(null);

  const handleOpenTransactionModal = (trx) => {
    setSelectedTransaction(trx);
    setIsTransactionDetailModalOpen(true);
  };

  const handleCloseTransactionModal = () => {
    setIsTransactionDetailModalOpen(false);
    setSelectedTransaction(null);
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoadingOrderDetails((prev) => ({ ...prev, [orderId]: true }));
      const response = await dispatch(
        getOrderDetailsForAffiliate(orderId),
      ).unwrap();
      if (response.success) {
        setOrderDetails((prev) => ({ ...prev, [orderId]: response.data }));
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoadingOrderDetails((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
    if (orderId && !orderDetails[orderId] && expandedOrder !== orderId) {
      fetchOrderDetails(orderId);
    }
  };
  // Mock details
  const affiliateProducts = [];
  const affiliateEarnings = 0;
  const orders = [];
  const images = [];
  const transactions = [];
  const auditLogs = [];
  const sessions = [];
  const couponsUsed = [];
  // const {
  //   mockUsers,
  //   affiliateProducts,
  //   affiliateEarnings,
  //   orders,
  //   images,
  //   transactions,
  //   auditLogs,
  //   sessions,
  //   couponsUsed,
  // } = selectedUserFullDetails;

  const mockUsersCouponUsages = couponsUsed
    ? couponsUsed
        .flatMap((coupon) =>
          coupon.usageHistory
            .filter(
              (usage) => String(usage.mockUsers) === String(mockUsers._id),
            )
            .map((usage) => ({ ...usage, coupon })),
        )
        .sort((a, b) => new Date(b.usedAt) - new Date(a.usedAt))
    : [];

  const tabs = [{ id: "overview", label: "Overview", icon: FiUser }].filter(
    (tab) =>
      !hideAffiliateAssets || (tab.id !== "affiliate" && tab.id !== "assets"),
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-full w-full mx-auto">
      {/* Header */}

      <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <img
            src={
              mockUsers?.profile || "https://avatar.iran.liara.run/public/boy"
            }
            alt={mockUsers?.mockUsersname}
            className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
          />
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {mockUsers?.fullname}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs font-medium uppercase">
                {mockUsers?.role}
              </span>
              <span>•</span>
              <span>{mockUsers?.email}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsView(false)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FiX className="text-gray-500 dark:text-gray-400 w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-teal-500 text-teal-600 dark:text-teal-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <tab.icon className="mr-2 w-4 h-4" />
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                  Contact Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-teal-500" />
                    <span className="dark:text-gray-200">
                      {mockUsers?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-teal-500" />
                    <span className="dark:text-gray-200">
                      {mockUsers?.mobile}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-teal-500" />
                    <span className="dark:text-gray-200">
                      {mockUsers?.address || "No address provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                  Account Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        mockUsers?.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {mockUsers?.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Joined
                    </span>
                    <span className="dark:text-gray-200">
                      {new Date(mockUsers?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Last Login
                    </span>
                    <span className="dark:text-gray-200">
                      {formatDate(mockUsers?.lastLoginAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                  Activity Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {orders?.length || 0}
                    </div>
                    <div className="text-xs text-blue-600/80 dark:text-blue-400/80">
                      Orders
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {images?.length || 0}
                    </div>
                    <div className="text-xs text-purple-600/80 dark:text-purple-400/80">
                      Uploads
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg col-span-2">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(affiliateEarnings?.totalEarnings)}
                    </div>
                    <div className="text-xs text-green-600/80 dark:text-green-400/80">
                      Total Earnings
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupons Used Section */}
            {mockUsersCouponUsages && mockUsersCouponUsages.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiTag /> Coupon Usage History
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Coupon
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Discount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date Used
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockUsersCouponUsages.map((usage) => (
                        <tr key={usage._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                              {usage.coupon.code}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {usage.coupon.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                            {formatCurrency(usage.discountAmount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {usage.order ? (
                              <a
                                href={`/admin/orders/${usage.order._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {usage.order.orderID}
                              </a>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(usage.usedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => toggleExpandOrder(order._id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {order.orderID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {order.products?.length || 0} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300">
                            {expandedOrder === order._id ? (
                              <FiChevronUp size={18} />
                            ) : (
                              <FiChevronDown size={18} />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedOrder === order._id && (
                        <tr className="bg-gray-50 dark:bg-gray-700">
                          <td colSpan="6" className="p-4">
                            {loadingOrderDetails[order._id] ? (
                              <div className="flex justify-center items-center p-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
                              </div>
                            ) : orderDetails[order._id] ? (
                              <div className="p-4 border border-indigo-200 dark:border-indigo-700 bg-indigo-50/60 dark:bg-indigo-900/30 rounded-lg text-xs text-gray-800 dark:text-gray-100 space-y-3">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-bold text-base text-indigo-800 dark:text-indigo-200">
                                    Order Details:{" "}
                                    {orderDetails[order._id].orderID}
                                  </h3>
                                  <a
                                    href={`/admin/orders/${
                                      orderDetails[order._id]._id
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                                  >
                                    <FiExternalLink
                                      className="mr-1"
                                      size={12}
                                    />
                                    View Full Order
                                  </a>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <p>
                                      <span className="font-semibold">
                                        Customer:
                                      </span>{" "}
                                      {orderDetails[order._id].orderBy?.name}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Email:
                                      </span>{" "}
                                      {orderDetails[order._id].orderBy?.email}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p>
                                      <span className="font-semibold">
                                        Status:
                                      </span>{" "}
                                      <span className="uppercase font-bold">
                                        {orderDetails[order._id].status}
                                      </span>
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Total:
                                      </span>{" "}
                                      <span className="font-bold">
                                        {formatCurrency(
                                          orderDetails[order._id].total,
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Products in Order
                                  </h4>
                                  {orderDetails[order._id].products?.map(
                                    (p, pIndex) => {
                                      const mockUsersImagesCount =
                                        p.affiliate?.images?.filter(
                                          (img) =>
                                            img.uploader === mockUsers._id,
                                        ).length || 0;
                                      const isAffiliater =
                                        p.affiliate?.product?.affiliater ===
                                          mockUsers._id ||
                                        p.affiliate?.product?.affiliater
                                          ?._id === mockUsers._id;
                                      return (
                                        <div
                                          key={pIndex}
                                          className="flex gap-3 items-start border-t border-indigo-200 dark:border-indigo-700/50 pt-2 mt-2"
                                        >
                                          <img
                                            src={p.fullImage}
                                            alt={p.product?.title}
                                            className="w-16 h-16 object-cover rounded-md cursor-pointer"
                                            onClick={() =>
                                              openImageModal(p.fullImage)
                                            }
                                          />
                                          <div className="flex-1">
                                            <p className="font-semibold text-sm">
                                              {p.product?.title}
                                            </p>
                                            {(mockUsersImagesCount > 0 ||
                                              isAffiliater) && (
                                              <div className="mt-2 bg-green-100 dark:bg-green-900/40 p-2 rounded border border-green-200 dark:border-green-800/50">
                                                <p className="font-bold text-green-800 dark:text-green-300 text-[10px] uppercase mb-1">
                                                  Profit Source
                                                </p>
                                                {mockUsersImagesCount > 0 && (
                                                  <div className="mb-1">
                                                    <p className="flex items-center text-green-700 dark:text-green-200 gap-1.5 mb-1">
                                                      <FiImage size={12} />
                                                      <span>
                                                        {mockUsersImagesCount}{" "}
                                                        of your image
                                                        {mockUsersImagesCount >
                                                        1
                                                          ? "s"
                                                          : ""}{" "}
                                                        used
                                                      </span>
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 pl-4 mt-1">
                                                      {p.affiliate?.images
                                                        ?.filter(
                                                          (img) =>
                                                            img.uploader ===
                                                            mockUsers._id,
                                                        )
                                                        .map((img, idx) => {
                                                          const matchedImage =
                                                            mockUsersImages?.find(
                                                              (ui) =>
                                                                ui._id ===
                                                                img.imageId,
                                                            );
                                                          return (
                                                            <div
                                                              key={idx}
                                                              className="flex items-center gap-2"
                                                            >
                                                              {matchedImage && (
                                                                <img
                                                                  src={
                                                                    matchedImage
                                                                      .image[0]
                                                                  }
                                                                  alt="Used asset"
                                                                  className="w-8 h-8 object-cover rounded border border-green-300 cursor-pointer"
                                                                  onClick={() =>
                                                                    openImageModal(
                                                                      matchedImage
                                                                        .image[0],
                                                                    )
                                                                  }
                                                                />
                                                              )}
                                                              <span className="font-mono text-[10px] bg-green-50 dark:bg-green-800/50 px-1 rounded select-all">
                                                                {img.imageId}
                                                              </span>
                                                            </div>
                                                          );
                                                        })}
                                                    </div>
                                                  </div>
                                                )}
                                                {isAffiliater && (
                                                  <p className="flex items-center text-green-700 dark:text-green-200 gap-1.5">
                                                    <FiShoppingBag size={12} />
                                                    <span>
                                                      You are the affiliate
                                                    </span>
                                                  </p>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center p-4">
                                Could not load order details.
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "affiliate" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(affiliateEarnings?.totalEarnings)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pending Payout
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {formatCurrency(
                    affiliateEarnings?.paymentDetails?.pendingAmount,
                  )}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paid Out
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(
                    affiliateEarnings?.paymentDetails?.paidAmount,
                  )}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold dark:text-white mt-6 mb-2">
              Affiliate Products ({affiliateProducts?.length || 0})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {affiliateProducts &&
                affiliateProducts.map((prod) => (
                  <div
                    key={prod._id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex"
                  >
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                      <img
                        src={prod.products?.fullImage}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <h4 className="font-medium text-sm dark:text-white line-clamp-1">
                        {prod.products?.product?.title || "Product"}
                      </h4>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-medium">
                            {formatCurrency(prod.affiliatePrice)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Profit:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(prod.affiliateProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Link ID:</span>
                          <span className="font-mono">{prod.uniqueId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === "assets" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images && images.length > 0 ? (
              images.map((img) => (
                <div
                  key={img._id}
                  className="group relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
                >
                  <img
                    src={img.image[0]}
                    alt="User Asset"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <span className="text-white text-xs font-medium">
                      Sold: {img.sold}
                    </span>
                    <span className="text-gray-300 text-[10px]">
                      {new Date(img.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="absolute top-1 right-1">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        img.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {img.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                No images uploaded
              </div>
            )}
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {transactions && transactions.length > 0 ? (
                  transactions.map((trx) => (
                    <tr
                      key={trx._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => handleOpenTransactionModal(trx)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(trx.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                            trx.type === "withdrawal"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {trx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(trx.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            trx.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : trx.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {trx.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiClock /> Active Sessions
                </h3>
              </div>
              <div className="p-6">
                {sessions && sessions.length > 0 ? (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div
                        key={session._id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm dark:text-white">
                            {session.deviceType || "Unknown Device"} -{" "}
                            {session.os || "Unknown OS"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {session.browser} • {session.ipAddress}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Last Active: {formatDate(session.lastActivity)}
                          </p>
                          {session.isActive && (
                            <span className="text-xs text-green-600 font-medium">
                              Active Now
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No active sessions info available.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiShield /> Audit Logs
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {auditLogs && auditLogs.length > 0 ? (
                      auditLogs.slice(0, 10).map((log) => (
                        <tr key={log._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(log.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {log.ipAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                log.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No audit logs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMember;
