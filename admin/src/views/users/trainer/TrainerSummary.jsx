import React from "react";
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
  FaUser,
  FaUserClock,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaUserCheck,
  FaUserTimes,
  FaPrint,
  FaMotorcycle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const TrainerSummary = () => {
  // Get manager data from Redux store
  const managers = [
    {
      preference: {
        mode: "dark",
        language: "en",
      },
      riders: {
        riders: ["681de41e8c1dea86f9665935"],
        count: 1,
      },
      address: {
        country: {
          _id: "6730f786cb2352abe4944194",
          country_name: "Ethiopia",
        },
        region: {
          _id: "67339ec3e13c8bd68f9f6019",
          region_name: "Addis Ababa",
        },
        subRegion: {
          _id: "674ea8bd91bd52b4a4fdf87e",
          subregion_name: "Lemi Kura",
        },
      },
      lockUntil: null,
      _id: "681de3048c1dea86f96658c6",
      fullname: "abcde",
      email: "wqeqweq@wqew.qw",
      mobile: "111111111",
      password: "$2a$10$lXWuCdWkTl.hBnPaa82FWenkATLgpe7hB7eVuErNG4pn103xagmRK",
      role: "manager",
      status: "active",
      main_status: "active",
      printers: ["681de4368c1dea86f966593e"],
      profile: "",
      workArea: [
        {
          _id: "674ea8bd91bd52b4a4fdf87e",
          subregion_name: "Lemi Kura",
        },
      ],
      sold: 0,
      payment: [],
      createdAt: "2025-05-09T11:12:04.721Z",
      updatedAt: "2026-02-14T06:46:27.029Z",
      unique_id: "4911ba",
      managerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6IjY4MWRlMzA0OGMxZGVhODZmOTY2NThjNiIsInJvbGUiOiJtYW5hZ2VyIn0sImlhdCI6MTc0Njc5MjkxMiwiZXhwIjoxNzQ3MDUyMTEyfQ.ITVZfBCRDXNMS5GP-hywFbephOvdDstnI3hoX3YCAVI",
      isLocked: false,
      lastLoginAt: "2026-02-14T06:45:59.778Z",
      lastLoginIp: "::1",
      refreshToken: "",
    },
    {
      preference: {
        mode: "light",
        language: "en",
      },
      riders: [],
      address: {
        country: {
          _id: "6730f786cb2352abe4944194",
          country_name: "Ethiopia",
        },
        region: {
          _id: "67339e99e13c8bd68f9f6010",
          region_name: "Tigray",
        },
        subRegion: {
          _id: "673846acfcb49e967768b1c3",
          subregion_name: "Mekelle",
        },
      },
      isLocked: false,
      lockUntil: null,
      lastLoginAt: null,
      lastLoginIp: null,
      _id: "6759d4c603c43dde49ff23ab",
      fullname: "jhkgljhkdfjs",
      email: "qqq@qq.qq",
      mobile: "124578963",
      password: "$2a$10$OPolTW6EqN6EWvyNWfHiB.gdGXi6j8I89YF00GY5pk/.LdLcmEs.6",
      role: "manager",
      status: "inactive",
      main_status: "inactive",
      printers: [],
      profile: "",
      workArea: [
        {
          _id: "673846acfcb49e967768b1c3",
          subregion_name: "Mekelle",
        },
      ],
      sold: 0,
      payment: [],
      createdAt: "2024-12-11T18:07:02.216Z",
      updatedAt: "2024-12-11T18:07:02.348Z",
      unique_id: "0b3e74",
    },
    {
      preference: {
        mode: "dark",
        language: "en",
      },
      riders: [],
      address: {
        country: {
          _id: "6730f786cb2352abe4944194",
          country_name: "Ethiopia",
        },
        region: {
          _id: "67339ec3e13c8bd68f9f6019",
          region_name: "Addis Ababa",
        },
        subRegion: {
          _id: "67339edee13c8bd68f9f6021",
          subregion_name: "Yeka",
        },
      },
      isLocked: false,
      lockUntil: null,
      lastLoginAt: null,
      lastLoginIp: null,
      _id: "6756a81c3ec625e747834c12",
      fullname: "Abrham Yhune",
      email: "aaa@aaa.aa",
      mobile: "123654789",
      password: "$2a$10$2fPXnNFAeb2pLawJVvyK3.7nC6Tz.QsFwXifEat7vpNvz1oNoygIO",
      role: "manager",
      status: "inactive",
      main_status: "active",
      printers: ["675e825390770b1fa10d69e4"],
      profile: "",
      workArea: [
        {
          _id: "67339edee13c8bd68f9f6021",
          subregion_name: "Yeka",
        },
        {
          _id: "673846acfcb49e967768b1c3",
          subregion_name: "Mekelle",
        },
      ],
      sold: 0,
      payment: [],
      createdAt: "2024-12-09T08:19:40.225Z",
      updatedAt: "2025-05-09T15:55:16.439Z",
      unique_id: "88c040",
      managerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTZhODFjM2VjNjI1ZTc0NzgzNGMxMiIsImlhdCI6MTczNDE2NTA4MiwiZXhwIjoxNzM0NDI0MjgyfQ.lFE5tti4LQJLD1cp5gnfNxGhvouGSgsEKsPCIy_o_88",
    },
    {
      preference: {
        mode: "dark",
        language: "en",
      },
      riders: {
        riders: [
          "676bbfe5049170726e847c6b",
          "676bbff5049170726e847c71",
          "676bc035049170726e847c7b",
          "676bc061049170726e847c85",
          "676bc0ae840fc5dd1329c5d0",
          "676bc18a302aa3fccfe85e3a",
          "6815e86649159885a402a339",
          "681de2cf8c1dea86f96658ab",
        ],
        count: 8,
      },
      address: {
        country: {
          _id: "6730f786cb2352abe4944194",
          country_name: "Ethiopia",
        },
        region: {
          _id: "67339ec3e13c8bd68f9f6019",
          region_name: "Addis Ababa",
        },
        subregion: "67339edee13c8bd68f9f6021",
      },
      lockUntil: null,
      _id: "6700f217096652f25b0357ab",
      email: "qqq@qqq.qq",
      mobile: "123123123",
      password: "$2a$10$olI7HFODThqA0At.0Ergj.EOJfzM/M58NU0rHb87HglavwEJNir4K",
      role: "manager",
      status: "active",
      main_status: "active",
      printers: [
        "6738c2f0109f7a34fb1a663e",
        "67fb7c746062810aa3399ea5",
        "680dfc399184f5246796f515",
      ],
      profile:
        "https://product-images.obsv3.et-global-1.ethiotelecom.et/profiles/managers/1751878173442-5209e5635404195f.png",
      sold: 0,
      payment: [],
      createdAt: "2024-10-05T08:00:23.216Z",
      updatedAt: "2026-02-25T12:08:00.712Z",
      unique_id: "296c6e",
      fullname: "tewe reus",
      managerToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6IjY3MDBmMjE3MDk2NjUyZjI1YjAzNTdhYiIsInJvbGUiOiJtYW5hZ2VyIn0sImlhdCI6MTc0NjgwNjE5MywiZXhwIjoxNzQ3MDY1MzkzfQ.UhKnYaVtT7Pf4fu4L1PSI2i7-G0NbNH6pEFL0Spqx_w",
      workArea: [
        {
          _id: "67339edee13c8bd68f9f6021",
          subregion_name: "Yeka",
        },
      ],
      isLocked: false,
      lastLoginAt: "2026-02-25T12:07:43.936Z",
      lastLoginIp: "::1",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDBmMjE3MDk2NjUyZjI1YjAzNTdhYiIsInVzZXJUeXBlIjoiIiwiaWF0IjoxNzcyMDIxMjgwLCJleHAiOjE3NzIyODA0ODB9.eZawIiXs_vU_8Ps13Faz0vFv23ZgUL9RpR6jt5j5sGQ",
      passwordChangedAt: "2025-05-27T11:56:14.532Z",
    },
    {
      preference: {
        mode: "light",
        language: "en",
      },
      riders: {
        riders: [],
        count: 0,
      },
      workArea: [],
      isLocked: false,
      lockUntil: null,
      lastLoginAt: null,
      lastLoginIp: null,
      _id: "66ffd7211160aa94cc77cdce",
      email: "fds@fds.df",
      mobile: "934221719",
      role: "manager",
      status: "inactive",
      main_status: "unavailable",
      printers: [],
      profile: "",
      sold: 0,
      payment: [],
      createdAt: "2024-08-31T15:42:09.737Z",
      updatedAt: "2024-09-14T15:51:08.631Z",
      unique_id: "140af1",
      fullname: "iuhihuhidew",
      password: "sfdfdsfs",
    },
    {
      preference: {
        mode: "light",
        language: "en",
      },
      riders: {
        riders: [],
        count: 0,
      },
      workArea: [],
      isLocked: false,
      lockUntil: null,
      lastLoginAt: null,
      lastLoginIp: null,
      _id: "66ffd7041160aa94cc77cdca",
      email: "tewe@gmail.com",
      mobile: "934221718",
      role: "manager",
      status: "inactive",
      main_status: "waiting",
      printers: [],
      profile: "",
      sold: 0,
      payment: [],
      createdAt: "2024-08-31T15:34:02.141Z",
      updatedAt: "2024-11-11T08:47:07.073Z",
      unique_id: "cba86d",
      fullname: "Tewolde Gebreyesus",
      password: "$2a$10$K0KYa7bjOLcgPc34m5waGusEWM5cktr6j1hdO/e1aUIaaThSLd6WG",
    },
  ];

  // Format numbers with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  // Calculate basic stats from available manager data
  const activeTrainers =
    managers?.filter((manager) => manager.status === "active")?.length || 0;
  const inactiveTrainers =
    managers?.filter((manager) => manager.status === "inactive")?.length || 0;
  const totalTrainers = managers?.length || 0;

  // Calculate percentages
  const activePercentage =
    totalTrainers > 0 ? Math.round((activeTrainers / totalTrainers) * 100) : 0;
  const inactivePercentage =
    totalTrainers > 0
      ? Math.round((inactiveTrainers / totalTrainers) * 100)
      : 0;

  // Calculate main status stats
  const mainStatusCounts = {
    active:
      managers?.filter((manager) => manager.main_status === "active")?.length ||
      0,
    inactive:
      managers?.filter((manager) => manager.main_status === "inactive")
        ?.length || 0,
    waiting:
      managers?.filter((manager) => manager.main_status === "waiting")
        ?.length || 0,
    unavailable:
      managers?.filter((manager) => manager.main_status === "unavailable")
        ?.length || 0,
  };

  // Calculate printer and rider stats
  const totalPrinters = managers?.reduce(
    (sum, manager) => sum + (manager.printers?.length || 0),
    0,
  );
  const totalRiders = managers?.reduce(
    (sum, manager) => sum + (manager.riders?.count || 0),
    0,
  );
  const avgPrintersPerTrainer =
    totalTrainers > 0 ? (totalPrinters / totalTrainers).toFixed(1) : 0;
  const avgRidersPerTrainer =
    totalTrainers > 0 ? (totalRiders / totalTrainers).toFixed(1) : 0;

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "waiting":
        return "Waiting";
      case "unavailable":
        return "Unavailable";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status) {
      case "active":
        return "text-teal-600 dark:text-teal-400";
      case "inactive":
        return "text-red-600 dark:text-red-400";
      case "waiting":
        return "text-yellow-600 dark:text-yellow-400";
      case "unavailable":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Calculate time-based summaries
  const calculateTimePeriodStats = () => {
    if (!managers || managers.length === 0) {
      return {
        today: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            inactive: { count: 0, percentage: 0 },
            waiting: { count: 0, percentage: 0 },
            unavailable: { count: 0, percentage: 0 },
          },
        },
        week: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            inactive: { count: 0, percentage: 0 },
            waiting: { count: 0, percentage: 0 },
            unavailable: { count: 0, percentage: 0 },
          },
        },
        month: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            inactive: { count: 0, percentage: 0 },
            waiting: { count: 0, percentage: 0 },
            unavailable: { count: 0, percentage: 0 },
          },
        },
        year: {
          total: 0,
          byStatus: {
            active: { count: 0, percentage: 0 },
            inactive: { count: 0, percentage: 0 },
            waiting: { count: 0, percentage: 0 },
            unavailable: { count: 0, percentage: 0 },
          },
        },
      };
    }

    const now = new Date();

    // Calculate start dates for different time periods
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    weekStart.setHours(0, 0, 0, 0);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const yearStart = new Date(now.getFullYear(), 0, 1);

    // Filter managers by time periods
    const todayTrainers = managers.filter(
      (manager) => new Date(manager.createdAt) >= todayStart,
    );
    const weekTrainers = managers.filter(
      (manager) => new Date(manager.createdAt) >= weekStart,
    );
    const monthTrainers = managers.filter(
      (manager) => new Date(manager.createdAt) >= monthStart,
    );
    const yearTrainers = managers.filter(
      (manager) => new Date(manager.createdAt) >= yearStart,
    );

    // Calculate stats for each time period
    const calculateStats = (periodTrainers) => {
      const total = periodTrainers.length;

      const activeCount = periodTrainers.filter(
        (m) => m.main_status === "active",
      ).length;
      const inactiveCount = periodTrainers.filter(
        (m) => m.main_status === "inactive",
      ).length;
      const waitingCount = periodTrainers.filter(
        (m) => m.main_status === "waiting",
      ).length;
      const unavailableCount = periodTrainers.filter(
        (m) => m.main_status === "unavailable",
      ).length;

      const activePercentage =
        total > 0 ? Math.round((activeCount / total) * 100) : 0;
      const inactivePercentage =
        total > 0 ? Math.round((inactiveCount / total) * 100) : 0;
      const waitingPercentage =
        total > 0 ? Math.round((waitingCount / total) * 100) : 0;
      const unavailablePercentage =
        total > 0 ? Math.round((unavailableCount / total) * 100) : 0;

      return {
        total,
        byStatus: {
          active: { count: activeCount, percentage: activePercentage },
          inactive: { count: inactiveCount, percentage: inactivePercentage },
          waiting: { count: waitingCount, percentage: waitingPercentage },
          unavailable: {
            count: unavailableCount,
            percentage: unavailablePercentage,
          },
        },
      };
    };

    return {
      today: calculateStats(todayTrainers),
      week: calculateStats(weekTrainers),
      month: calculateStats(monthTrainers),
      year: calculateStats(yearTrainers),
    };
  };

  const summary = calculateTimePeriodStats();

  return (
    <div className="space-y-6">
      {/* Time-based summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-3">
              <FaCalendarDay size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Today
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                New Trainers:
              </span>
              <span className="font-medium text-teal-600 dark:text-teal-400">
                {formatNumber(summary.today.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.today.byStatus).map(
                  ([status, data]) => (
                    <div
                      key={status}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`text-xs ${getStatusColorClass(status)}`}
                      >
                        {formatStatus(status)}:
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {data.count} ({data.percentage}%)
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
              <FaCalendarWeek size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Week
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                New Trainers:
              </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {formatNumber(summary.week.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.week.byStatus).map(([status, data]) => (
                  <div
                    key={status}
                    className="flex justify-between items-center"
                  >
                    <span className={`text-xs ${getStatusColorClass(status)}`}>
                      {formatStatus(status)}:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {data.count} ({data.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-3">
              <FaCalendarAlt size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Month
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                New Trainers:
              </span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {formatNumber(summary.month.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.month.byStatus).map(
                  ([status, data]) => (
                    <div
                      key={status}
                      className="flex justify-between items-center"
                    >
                      <span
                        className={`text-xs ${getStatusColorClass(status)}`}
                      >
                        {formatStatus(status)}:
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {data.count} ({data.percentage}%)
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This Year */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mr-3">
              <FaCalendar size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              This Year
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                New Trainers:
              </span>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                {formatNumber(summary.year.total)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Status:
              </p>
              <div className="space-y-1">
                {Object.entries(summary.year.byStatus).map(([status, data]) => (
                  <div
                    key={status}
                    className="flex justify-between items-center"
                  >
                    <span className={`text-xs ${getStatusColorClass(status)}`}>
                      {formatStatus(status)}:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {data.count} ({data.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Trainer Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Current Trainer Statistics
          </h3>
          <div className="p-2 rounded-full bg-teal-100 dark:bg-blue-900/30 text-teal-600 dark:text-teal-400">
            <FaUsers className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Trainers */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 mr-3">
                <FaUsers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Trainers
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {formatNumber(totalTrainers)}
                </p>
              </div>
            </div>
          </div>

          {/* Active Trainers */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-3">
                <FaUserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Trainers
                </p>
                <p className="text-lg font-medium text-teal-600 dark:text-teal-400">
                  {formatNumber(activeTrainers)} ({activePercentage}%)
                </p>
              </div>
            </div>
          </div>

          {/* Inactive Trainers */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3">
                <FaUserTimes className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Inactive Trainers
                </p>
                <p className="text-lg font-medium text-red-600 dark:text-red-400">
                  {formatNumber(inactiveTrainers)} ({inactivePercentage}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Status Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Main Status Distribution
          </h3>
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <FaUser className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mr-3">
                <FaUserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active
                </p>
                <p className="text-lg font-medium text-teal-600 dark:text-teal-400">
                  {formatNumber(mainStatusCounts.active)} (
                  {totalTrainers > 0
                    ? Math.round(
                        (mainStatusCounts.active / totalTrainers) * 100,
                      )
                    : 0}
                  %)
                </p>
              </div>
            </div>
          </div>

          {/* Inactive */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3">
                <FaUserTimes className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Inactive
                </p>
                <p className="text-lg font-medium text-red-600 dark:text-red-400">
                  {formatNumber(mainStatusCounts.inactive)} (
                  {totalTrainers > 0
                    ? Math.round(
                        (mainStatusCounts.inactive / totalTrainers) * 100,
                      )
                    : 0}
                  %)
                </p>
              </div>
            </div>
          </div>

          {/* Waiting */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-3">
                <FaUserClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Waiting
                </p>
                <p className="text-lg font-medium text-yellow-600 dark:text-yellow-400">
                  {formatNumber(mainStatusCounts.waiting)} (
                  {totalTrainers > 0
                    ? Math.round(
                        (mainStatusCounts.waiting / totalTrainers) * 100,
                      )
                    : 0}
                  %)
                </p>
              </div>
            </div>
          </div>

          {/* Unavailable */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 mr-3">
                <FaUser className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unavailable
                </p>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  {formatNumber(mainStatusCounts.unavailable)} (
                  {totalTrainers > 0
                    ? Math.round(
                        (mainStatusCounts.unavailable / totalTrainers) * 100,
                      )
                    : 0}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerSummary;
