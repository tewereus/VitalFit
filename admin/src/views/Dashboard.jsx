// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   FaUsers,
//   FaShoppingCart,
//   FaDollarSign,
//   FaBox,
//   FaChartLine,
//   FaGlobe,
//   FaClock,
//   FaExclamationTriangle,
//   FaCalendarAlt,
//   FaEye,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import { FiRefreshCw, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// // import {
// //   getDashboardOverview,
// //   getRevenueAnalytics,
// //   getOrderAnalytics,
// //   getUserAnalytics,
// //   getRecentActivities,
// //   getTopProducts,
// //   getSystemMetrics,
// //   getInventoryAlerts,
// // } from "../store/dashboard/dashboardSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   // const {
//   //   overview,
//   //   revenueAnalytics,
//   //   orderAnalytics,
//   //   userAnalytics,
//   //   recentActivities,
//   //   topProducts,
//   //   systemMetrics,
//   //   inventoryAlerts,
//   //   isLoading,
//   // } = useSelector((state) => state.dashboard);

//   const [timeframe, setTimeframe] = useState("monthly");
//   const [lastRefresh, setLastRefresh] = useState(new Date());

//   // useEffect(() => {
//   //   // Load dashboard data on component mount
//   //   dispatch(getDashboardOverview(timeframe));
//   //   dispatch(getRevenueAnalytics(timeframe));
//   //   dispatch(getOrderAnalytics(timeframe));
//   //   dispatch(getUserAnalytics(timeframe));
//   //   dispatch(getRecentActivities(10));
//   //   dispatch(getTopProducts({ limit: 5, timeframe }));
//   //   dispatch(getSystemMetrics());
//   //   dispatch(getInventoryAlerts());
//   // }, [dispatch, timeframe]);

//   // const handleRefresh = () => {
//   //   dispatch(getDashboardOverview(timeframe));
//   //   dispatch(getRevenueAnalytics(timeframe));
//   //   dispatch(getOrderAnalytics(timeframe));
//   //   dispatch(getUserAnalytics(timeframe));
//   //   dispatch(getRecentActivities(10));
//   //   dispatch(getTopProducts({ limit: 5, timeframe }));
//   //   dispatch(getSystemMetrics());
//   //   dispatch(getInventoryAlerts());
//   //   setLastRefresh(new Date());
//   // };

//   const handleTimeframeChange = (newTimeframe) => {
//     setTimeframe(newTimeframe);
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount || 0);
//   };

//   // Format percentage
//   const formatPercentage = (value) => {
//     return `${(value || 0).toFixed(1)}%`;
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Chart colors
//   const colors = {
//     primary: "#14b8a6",
//     secondary: "#06b6d4",
//     accent: "#8b5cf6",
//     success: "#10b981",
//     warning: "#f59e0b",
//     error: "#ef4444",
//     gray: "#6b7280",
//   };

//   const pieColors = [
//     colors.primary,
//     colors.secondary,
//     colors.accent,
//     colors.warning,
//     colors.error,
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-3 py-4 sm:p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
//               Enterprise Dashboard
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">
//               Comprehensive business analytics and insights
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Timeframe Selector */}
//             <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
//               {["daily", "weekly", "monthly", "yearly"].map((tf) => (
//                 <button
//                   key={tf}
//                   onClick={() => handleTimeframeChange(tf)}
//                   className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
//                     timeframe === tf
//                       ? "bg-teal-600 text-white"
//                       : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   }`}
//                 >
//                   {tf.charAt(0).toUpperCase() + tf.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Refresh Button */}
//             <button
//               onClick={handleRefresh}
//               disabled={isLoading}
//               className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-lg shadow-sm transition-colors w-full sm:w-auto"
//             >
//               <FiRefreshCw
//                 className={`text-sm ${isLoading ? "animate-spin" : ""}`}
//               />
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Last Updated */}
//         <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//           <FaClock />
//           <span>Last updated: {formatDate(lastRefresh)}</span>
//         </div>
//       </div>

//       {/* Key Metrics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Revenue */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                 Total Revenue
//               </p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-white">
//                 {formatCurrency(overview?.thisMonth?.revenue)}
//               </p>
//               <div className="flex items-center mt-2">
//                 {overview?.thisMonth?.revenueGrowth >= 0 ? (
//                   <FiTrendingUp className="text-green-500 text-sm mr-1" />
//                 ) : (
//                   <FiTrendingDown className="text-red-500 text-sm mr-1" />
//                 )}
//                 <span
//                   className={`text-sm font-medium ${
//                     overview?.thisMonth?.revenueGrowth >= 0
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {formatPercentage(overview?.thisMonth?.revenueGrowth)}
//                 </span>
//                 <span className="text-gray-500 text-sm ml-1">
//                   vs last month
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
//               <FaDollarSign className="text-teal-600 dark:text-teal-400 text-xl" />
//             </div>
//           </div>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                 Total Orders
//               </p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-white">
//                 {overview?.thisMonth?.orders?.toLocaleString() || 0}
//               </p>
//               <div className="flex items-center mt-2">
//                 {overview?.thisMonth?.orderGrowth >= 0 ? (
//                   <FiTrendingUp className="text-green-500 text-sm mr-1" />
//                 ) : (
//                   <FiTrendingDown className="text-red-500 text-sm mr-1" />
//                 )}
//                 <span
//                   className={`text-sm font-medium ${
//                     overview?.thisMonth?.orderGrowth >= 0
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {formatPercentage(overview?.thisMonth?.orderGrowth)}
//                 </span>
//                 <span className="text-gray-500 text-sm ml-1">
//                   vs last month
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
//               <FaShoppingCart className="text-blue-600 dark:text-blue-400 text-xl" />
//             </div>
//           </div>
//         </div>

//         {/* Total Users */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                 Total Users
//               </p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-white">
//                 {overview?.totals?.users?.toLocaleString() || 0}
//               </p>
//               <div className="flex items-center mt-2">
//                 <FaArrowUp className="text-green-500 text-sm mr-1" />
//                 <span className="text-sm font-medium text-green-600">
//                   {overview?.newUsersThisWeek || 0}
//                 </span>
//                 <span className="text-gray-500 text-sm ml-1">
//                   new this week
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
//               <FaUsers className="text-purple-600 dark:text-purple-400 text-xl" />
//             </div>
//           </div>
//         </div>

//         {/* Total Products */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                 Total Products
//               </p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-white">
//                 {overview?.totals?.products?.toLocaleString() || 0}
//               </p>
//               <div className="flex items-center mt-2">
//                 <FaBox className="text-gray-500 text-sm mr-1" />
//                 <span className="text-sm text-gray-500">
//                   {overview?.totals?.images || 0} images
//                 </span>
//               </div>
//             </div>
//             <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
//               <FaBox className="text-orange-600 dark:text-orange-400 text-xl" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Revenue Trends */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               Revenue Trends
//             </h3>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <FaChartLine />
//               <span>
//                 {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
//               </span>
//             </div>
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={revenueAnalytics?.trends || []}>
//                 <defs>
//                   <linearGradient
//                     id="revenueGradient"
//                     x1="0"
//                     y1="0"
//                     x2="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="5%"
//                       stopColor={colors.primary}
//                       stopOpacity={0.3}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor={colors.primary}
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#374151"
//                   opacity={0.3}
//                 />
//                 <XAxis
//                   dataKey="period"
//                   stroke="#6b7280"
//                   fontSize={12}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   stroke="#6b7280"
//                   fontSize={12}
//                   tickLine={false}
//                   tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                   formatter={(value) => [formatCurrency(value), "Revenue"]}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke={colors.primary}
//                   strokeWidth={2}
//                   fill="url(#revenueGradient)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Order Status Distribution */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               Order Status Distribution
//             </h3>
//             <FaShoppingCart className="text-gray-500" />
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={overview?.orderStatusDistribution || []}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={120}
//                   paddingAngle={5}
//                   dataKey="count"
//                   nameKey="_id"
//                 >
//                   {(overview?.orderStatusDistribution || []).map(
//                     (entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={pieColors[index % pieColors.length]}
//                       />
//                     ),
//                   )}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#ccc",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                   formatter={(value, name) => [value, name]}
//                 />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Secondary Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* User Registration Trends */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               User Registration Trends
//             </h3>
//             <FaUsers className="text-gray-500" />
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={userAnalytics?.registrationTrends || []}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#374151"
//                   opacity={0.3}
//                 />
//                 <XAxis
//                   dataKey="period"
//                   stroke="#6b7280"
//                   fontSize={12}
//                   tickLine={false}
//                 />
//                 <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                   formatter={(value) => [value, "New Users"]}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="newUsers"
//                   stroke={colors.secondary}
//                   strokeWidth={3}
//                   dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
//                   activeDot={{ r: 6, stroke: colors.secondary, strokeWidth: 2 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               Top Selling Products
//             </h3>
//             <FaBox className="text-gray-500" />
//           </div>

//           {(topProducts || []).length > 0 ? (
//             <div className="space-y-6">
//               {/* Vertical Bar Chart - Top 5 Products */}
//               <div className="h-96">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={topProducts.slice(0, 5).map((product, index) => ({
//                       name:
//                         (product.productName || "Unknown Product").length > 12
//                           ? (
//                               product.productName || "Unknown Product"
//                             ).substring(0, 12) + "..."
//                           : product.productName || "Unknown Product",
//                       fullName: product.productName || "Unknown Product",
//                       count: product.count || 0,
//                       revenue: product.totalRevenue || 0,
//                       rank: index + 1,
//                     }))}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#E5E7EB"
//                       opacity={0.5}
//                     />
//                     <XAxis
//                       dataKey="name"
//                       stroke="#6B7280"
//                       fontSize={11}
//                       angle={-45}
//                       textAnchor="end"
//                       height={60}
//                       interval={0}
//                     />
//                     <YAxis
//                       stroke="#6B7280"
//                       fontSize={12}
//                       tickFormatter={(value) => `${value}`}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#FFFFFF",
//                         border: "1px solid #E5E7EB",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                         color: "#1F2937",
//                       }}
//                       formatter={(value, name) => {
//                         if (name === "count") {
//                           return [`${value} units`, "Units Sold"];
//                         }
//                         return [value, name];
//                       }}
//                       labelFormatter={(label, payload) => {
//                         if (payload && payload[0]) {
//                           return `${payload[0].payload.fullName}`;
//                         }
//                         return label;
//                       }}
//                     />
//                     <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]}>
//                       {topProducts.slice(0, 5).map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={
//                             index === 0
//                               ? "#10B981" // Green for #1
//                               : index === 1
//                                 ? "#3B82F6" // Blue for #2
//                                 : index === 2
//                                   ? "#F59E0B" // Yellow for #3
//                                   : index === 3
//                                     ? "#EF4444" // Red for #4
//                                     : "#8B5CF6" // Purple for #5
//                           }
//                         />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Top 5 Products Summary */}
//               {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
//                 {topProducts.slice(0, 5).map((product, index) => (
//                   <div
//                     key={product._id}
//                     className={`p-3 rounded-lg border-2 ${
//                       index === 0
//                         ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
//                         : index === 1
//                         ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
//                         : index === 2
//                         ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700"
//                         : index === 3
//                         ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700"
//                         : "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <div
//                         className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
//                           index === 0
//                             ? "bg-green-500"
//                             : index === 1
//                             ? "bg-blue-500"
//                             : index === 2
//                             ? "bg-yellow-500"
//                             : index === 3
//                             ? "bg-red-500"
//                             : "bg-purple-500"
//                         }`}
//                       >
//                         {index + 1}
//                       </div>
//                       <p className="font-medium text-gray-800 dark:text-white text-xs truncate flex-1">
//                         {product.productName || "Unknown Product"}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <div className="flex justify-between items-center">
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           Units:
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800 dark:text-white">
//                           {product.count || 0}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           Revenue:
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800 dark:text-white">
//                           {formatCurrency(product.totalRevenue || 0)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div> */}
//             </div>
//           ) : (
//             <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//               <FaBox className="mx-auto text-3xl mb-4 opacity-50" />
//               <p className="text-lg font-medium mb-2">
//                 No Sales Data Available
//               </p>
//               <p className="text-sm">
//                 Product sales data will appear here once orders are completed
//               </p>
//               <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
//                 <p className="text-xs text-blue-600 dark:text-blue-400">
//                   💡 Tip: Sales data is filtered by the selected timeframe above
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* System Alerts (promoted section) */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex flex-wrap items-stretch justify-start gap-3 w-full md:w-auto">
//             <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
//               <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 System Alerts
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Inventory and platform level warnings
//               </p>
//             </div>
//           </div>
//           {inventoryAlerts && inventoryAlerts.length > 0 && (
//             <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
//               {inventoryAlerts.length} alerts
//             </span>
//           )}
//         </div>
//         <div className="max-h-80 overflow-y-auto space-y-3 enhanced-scrollbar">
//           {inventoryAlerts && inventoryAlerts.length > 0 ? (
//             <>
//               {["warning", "error", "info"].map((severity) => {
//                 const alertsOfType = inventoryAlerts.filter(
//                   (alert) => alert.severity === severity,
//                 );
//                 if (alertsOfType.length === 0) return null;

//                 return (
//                   <div key={severity} className="space-y-2">
//                     <h5
//                       className={`text-xs font-medium uppercase tracking-wide ${
//                         severity === "warning"
//                           ? "text-yellow-600"
//                           : severity === "error"
//                             ? "text-red-600"
//                             : "text-blue-600"
//                       }`}
//                     >
//                       {severity} ({alertsOfType.length})
//                     </h5>
//                     {alertsOfType.map((alert) => (
//                       <div
//                         key={alert.id}
//                         className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${
//                           alert.severity === "warning"
//                             ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400"
//                             : alert.severity === "error"
//                               ? "bg-red-50 dark:bg-red-900/20 border-red-400"
//                               : "bg-blue-50 dark:bg-blue-900/20 border-blue-400"
//                         }`}
//                       >
//                         <FaExclamationTriangle
//                           className={`text-sm mt-0.5 flex-shrink-0 ${
//                             alert.severity === "warning"
//                               ? "text-yellow-600"
//                               : alert.severity === "error"
//                                 ? "text-red-600"
//                                 : "text-blue-600"
//                           }`}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-800 dark:text-white">
//                             {alert.title}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1 break-words">
//                             {alert.message}
//                           </p>
//                           <p className="text-xs text-gray-400 mt-1">
//                             {formatDate(alert.timestamp)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 );
//               })}
//             </>
//           ) : (
//             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//               <FaExclamationTriangle className="mx-auto text-2xl mb-2 opacity-50" />
//               <p className="text-sm">No active alerts</p>
//               <p className="text-xs mt-1">All systems operational</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quick Stats Footer */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* System Health */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//               <FaChartLine className="text-green-600 dark:text-green-400" />
//             </div>
//             <h4 className="font-semibold text-gray-800 dark:text-white">
//               System Health
//             </h4>
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Database
//               </span>
//               <span
//                 className={`text-sm font-medium ${
//                   systemMetrics?.systemHealth?.database?.connected
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {systemMetrics?.systemHealth?.database?.status || "Unknown"}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Cache
//               </span>
//               <span
//                 className={`text-sm font-medium ${
//                   systemMetrics?.systemHealth?.cache?.connected
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {systemMetrics?.systemHealth?.cache?.status || "Unknown"}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Server Uptime
//               </span>
//               <span className="text-sm font-medium text-blue-600">
//                 {systemMetrics?.systemHealth?.server?.uptime || "Unknown"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Performance Metrics */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//               <FaGlobe className="text-blue-600 dark:text-blue-400" />
//             </div>
//             <h4 className="font-semibold text-gray-800 dark:text-white">
//               Performance
//             </h4>
//           </div>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Memory Usage
//               </span>
//               <span className="text-sm font-medium text-blue-600">
//                 {systemMetrics?.systemHealth?.memory?.heapUsed || 0}MB /{" "}
//                 {systemMetrics?.systemHealth?.memory?.heapTotal || 0}MB
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Node Version
//               </span>
//               <span className="text-sm font-medium text-blue-600">
//                 {systemMetrics?.systemHealth?.server?.nodeVersion || "Unknown"}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Active Users
//               </span>
//               <span className="text-sm font-medium text-blue-600">
//                 {userAnalytics?.activeUsers || 0}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Alerts & Notifications (now shows recent activity) */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <FaClock className="text-blue-600 dark:text-blue-400" />
//               </div>
//               <h4 className="font-semibold text-gray-800 dark:text-white">
//                 Recent Activities
//               </h4>
//             </div>
//             {recentActivities && recentActivities.length > 0 && (
//               <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
//                 {recentActivities.length} events
//               </span>
//             )}
//           </div>
//           <div className="max-h-64 overflow-y-auto space-y-3 enhanced-scrollbar">
//             {recentActivities && recentActivities.length > 0 ? (
//               recentActivities.slice(0, 6).map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
//                 >
//                   <div
//                     className={`p-2 rounded-full ${
//                       activity.type === "order"
//                         ? "bg-green-100 dark:bg-green-900/30"
//                         : "bg-purple-100 dark:bg-purple-900/30"
//                     }`}
//                   >
//                     {activity.type === "order" ? (
//                       <FaShoppingCart className="text-green-600 dark:text-green-400 text-sm" />
//                     ) : (
//                       <FaUsers className="text-purple-600 dark:text-purple-400 text-sm" />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-800 dark:text-white">
//                       {activity.title}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                       {activity.description}
//                     </p>
//                     <p className="text-[11px] text-gray-400 mt-1">
//                       {formatDate(activity.timestamp)}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                 <FaClock className="mx-auto text-2xl mb-2 opacity-50" />
//                 <p className="text-sm">No recent activities</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaBox,
  FaChartLine,
  FaGlobe,
  FaClock,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { FiRefreshCw, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockOverview = {
  thisMonth: {
    revenue: 125000,
    revenueGrowth: 8.2,
    orders: 320,
    orderGrowth: 3.5,
  },
  totals: {
    users: 2100,
    products: 120,
    images: 350,
  },
  newUsersThisWeek: 34,
  orderStatusDistribution: [
    { _id: "Completed", count: 180 },
    { _id: "Pending", count: 60 },
    { _id: "Cancelled", count: 20 },
    { _id: "Shipped", count: 40 },
    { _id: "Refunded", count: 20 },
  ],
};

const mockRevenueAnalytics = {
  trends: [
    { period: "Jan", revenue: 90000 },
    { period: "Feb", revenue: 95000 },
    { period: "Mar", revenue: 100000 },
    { period: "Apr", revenue: 110000 },
    { period: "May", revenue: 120000 },
    { period: "Jun", revenue: 125000 },
  ],
};

const mockUserAnalytics = {
  registrationTrends: [
    { period: "Jan", newUsers: 120 },
    { period: "Feb", newUsers: 140 },
    { period: "Mar", newUsers: 160 },
    { period: "Apr", newUsers: 180 },
    { period: "May", newUsers: 200 },
    { period: "Jun", newUsers: 210 },
  ],
  activeUsers: 320,
};

const mockTopProducts = [
  { productName: "Protein Bar", count: 120, totalRevenue: 2400 },
  { productName: "Yoga Mat", count: 90, totalRevenue: 1800 },
  { productName: "Dumbbells", count: 70, totalRevenue: 3500 },
  { productName: "Fitness Tracker", count: 50, totalRevenue: 5000 },
  { productName: "Water Bottle", count: 40, totalRevenue: 800 },
];

const mockSystemMetrics = {
  systemHealth: {
    database: { connected: true, status: "Connected" },
    cache: { connected: false, status: "Disconnected" },
    server: { uptime: "5 days 4 hrs", nodeVersion: "v18.16.0" },
    memory: { heapUsed: 120, heapTotal: 256 },
  },
};

const mockInventoryAlerts = [
  {
    id: 1,
    severity: "warning",
    title: "Low Stock: Protein Bar",
    message: "Only 10 units left in inventory.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    severity: "error",
    title: "Out of Stock: Yoga Mat",
    message: "No units left. Please restock soon.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    severity: "info",
    title: "New Product Added",
    message: "Fitness Tracker is now available.",
    timestamp: new Date().toISOString(),
  },
];

const mockRecentActivities = [
  {
    id: 1,
    type: "order",
    title: "Order #1234 Completed",
    description: "John Doe completed an order for Protein Bars.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    type: "user",
    title: "New User Registered",
    description: "Jane Smith joined the platform.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    type: "order",
    title: "Order #1235 Pending",
    description: "Order for Yoga Mats is pending payment.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    type: "user",
    title: "User Upgraded Membership",
    description: "Alex Lee upgraded to Premium.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 5,
    type: "order",
    title: "Order #1236 Cancelled",
    description: "Order for Dumbbells was cancelled.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 6,
    type: "order",
    title: "Order #1237 Shipped",
    description: "Water Bottle order shipped.",
    timestamp: new Date().toISOString(),
  },
];

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Use mock data
  const overview = mockOverview;
  const revenueAnalytics = mockRevenueAnalytics;
  const userAnalytics = mockUserAnalytics;
  const topProducts = mockTopProducts;
  const systemMetrics = mockSystemMetrics;
  const inventoryAlerts = mockInventoryAlerts;
  const recentActivities = mockRecentActivities;
  const isLoading = false;

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${(value || 0).toFixed(1)}%`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Chart colors
  const colors = {
    primary: "#14b8a6",
    secondary: "#06b6d4",
    accent: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    gray: "#6b7280",
  };

  const pieColors = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.warning,
    colors.error,
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-3 py-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Enterprise Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive business analytics and insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              {["daily", "weekly", "monthly", "yearly"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    timeframe === tf
                      ? "bg-teal-500 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-700"
                  }`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white rounded-lg shadow-sm transition-colors w-full sm:w-auto"
            >
              <FiRefreshCw
                className={`text-sm ${isLoading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaClock />
          <span>Last updated: {formatDate(lastRefresh)}</span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {formatCurrency(overview?.thisMonth?.revenue)}
              </p>
              <div className="flex items-center mt-2">
                {overview?.thisMonth?.revenueGrowth >= 0 ? (
                  <FiTrendingUp className="text-green-500 text-sm mr-1" />
                ) : (
                  <FiTrendingDown className="text-red-500 text-sm mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    overview?.thisMonth?.revenueGrowth >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatPercentage(overview?.thisMonth?.revenueGrowth)}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  vs last month
                </span>
              </div>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <FaDollarSign className="text-teal-600 dark:text-teal-400 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Members */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Members
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {overview?.totals?.members?.toLocaleString() || 32}
              </p>
              <div className="flex items-center mt-2">
                <FaArrowUp className="text-green-500 text-sm mr-1" />
                <span className="text-sm font-medium text-green-600">
                  {overview?.newMembersThisWeek || 5}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  new this week
                </span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <FaUsers className="text-yellow-600 dark:text-yellow-400 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Classes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Staff
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {overview?.totals?.classes?.toLocaleString() || 3}
              </p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <FaUsers className="text-teal-600 dark:text-teal-400 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Trainers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Trainers
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {overview?.totals?.trainers?.toLocaleString() || 7}
              </p>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <FaUsers className="text-teal-600 dark:text-teal-400 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Revenue Trends
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaChartLine />
              <span>
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueAnalytics?.trends || []}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={colors.primary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="period"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [formatCurrency(value), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={colors.primary}
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Payment Plan Distribution
            </h3>
            <FaShoppingCart className="text-gray-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overview?.orderStatusDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                >
                  {(overview?.orderStatusDistribution || []).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ),
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value, name) => [value, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Registration Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              User Registration Trends
            </h3>
            <FaUsers className="text-gray-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userAnalytics?.registrationTrends || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="period"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [value, "New Users"]}
                />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke={colors.secondary}
                  strokeWidth={3}
                  dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: colors.secondary, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Top Selling Products
            </h3>
            <FaBox className="text-gray-500" />
          </div>

          {(topProducts || []).length > 0 ? (
            <div className="space-y-6">
              {/* Vertical Bar Chart - Top 5 Products */}
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topProducts.slice(0, 5).map((product, index) => ({
                      name:
                        (product.productName || "Unknown Product").length > 12
                          ? (
                              product.productName || "Unknown Product"
                            ).substring(0, 12) + "..."
                          : product.productName || "Unknown Product",
                      fullName: product.productName || "Unknown Product",
                      count: product.count || 0,
                      revenue: product.totalRevenue || 0,
                      rank: index + 1,
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E5E7EB"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#6B7280"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        color: "#1F2937",
                      }}
                      formatter={(value, name) => {
                        if (name === "count") {
                          return [`${value} units`, "Units Sold"];
                        }
                        return [value, name];
                      }}
                      labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                          return `${payload[0].payload.fullName}`;
                        }
                        return label;
                      }}
                    />
                    <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]}>
                      {topProducts.slice(0, 5).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? "#10B981" // Green for #1
                              : index === 1
                                ? "#3B82F6" // Blue for #2
                                : index === 2
                                  ? "#F59E0B" // Yellow for #3
                                  : index === 3
                                    ? "#EF4444" // Red for #4
                                    : "#8B5CF6" // Purple for #5
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FaBox className="mx-auto text-3xl mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">
                No Sales Data Available
              </p>
              <p className="text-sm">
                Product sales data will appear here once orders are completed
              </p>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  💡 Tip: Sales data is filtered by the selected timeframe above
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Alerts (promoted section) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap items-stretch justify-start gap-3 w-full md:w-auto">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                System Alerts
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Inventory and platform level warnings
              </p>
            </div>
          </div>
          {inventoryAlerts && inventoryAlerts.length > 0 && (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              {inventoryAlerts.length} alerts
            </span>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto space-y-3 enhanced-scrollbar">
          {inventoryAlerts && inventoryAlerts.length > 0 ? (
            <>
              {["warning", "error", "info"].map((severity) => {
                const alertsOfType = inventoryAlerts.filter(
                  (alert) => alert.severity === severity,
                );
                if (alertsOfType.length === 0) return null;

                return (
                  <div key={severity} className="space-y-2">
                    <h5
                      className={`text-xs font-medium uppercase tracking-wide ${
                        severity === "warning"
                          ? "text-yellow-600"
                          : severity === "error"
                            ? "text-red-600"
                            : "text-blue-600"
                      }`}
                    >
                      {severity} ({alertsOfType.length})
                    </h5>
                    {alertsOfType.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${
                          alert.severity === "warning"
                            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400"
                            : alert.severity === "error"
                              ? "bg-red-50 dark:bg-red-900/20 border-red-400"
                              : "bg-blue-50 dark:bg-blue-900/20 border-blue-400"
                        }`}
                      >
                        <FaExclamationTriangle
                          className={`text-sm mt-0.5 flex-shrink-0 ${
                            alert.severity === "warning"
                              ? "text-yellow-600"
                              : alert.severity === "error"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {alert.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 break-words">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(alert.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FaExclamationTriangle className="mx-auto text-2xl mb-2 opacity-50" />
              <p className="text-sm">No active alerts</p>
              <p className="text-xs mt-1">All systems operational</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FaChartLine className="text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-white">
              System Health
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Database
              </span>
              <span
                className={`text-sm font-medium ${
                  systemMetrics?.systemHealth?.database?.connected
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {systemMetrics?.systemHealth?.database?.status || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Cache
              </span>
              <span
                className={`text-sm font-medium ${
                  systemMetrics?.systemHealth?.cache?.connected
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {systemMetrics?.systemHealth?.cache?.status || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Server Uptime
              </span>
              <span className="text-sm font-medium text-blue-600">
                {systemMetrics?.systemHealth?.server?.uptime || "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FaGlobe className="text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-white">
              Performance
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Memory Usage
              </span>
              <span className="text-sm font-medium text-blue-600">
                {systemMetrics?.systemHealth?.memory?.heapUsed || 0}MB /{" "}
                {systemMetrics?.systemHealth?.memory?.heapTotal || 0}MB
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Node Version
              </span>
              <span className="text-sm font-medium text-blue-600">
                {systemMetrics?.systemHealth?.server?.nodeVersion || "Unknown"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Users
              </span>
              <span className="text-sm font-medium text-blue-600">
                {userAnalytics?.activeUsers || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications (now shows recent activity) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaClock className="text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Recent Activities
              </h4>
            </div>
            {recentActivities && recentActivities.length > 0 && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                {recentActivities.length} events
              </span>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto space-y-3 enhanced-scrollbar">
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "order"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-purple-100 dark:bg-purple-900/30"
                    }`}
                  >
                    {activity.type === "order" ? (
                      <FaShoppingCart className="text-green-600 dark:text-green-400 text-sm" />
                    ) : (
                      <FaUsers className="text-purple-600 dark:text-purple-400 text-sm" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FaClock className="mx-auto text-2xl mb-2 opacity-50" />
                <p className="text-sm">No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
