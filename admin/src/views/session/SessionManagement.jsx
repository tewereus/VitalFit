import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../../api/axios";
import {
  FaTrash,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaQuestionCircle,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { format, formatDistanceToNow } from "date-fns";

const sessions = [
  {
    _id: "69a04de0a4074ea333ff394e",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-26T15:07:37.574Z",
    expiresAt: "2026-03-01T13:42:56.331Z",
    token: "3090525454599969216598ace0eda4fbcc28cfbb035f59b99fd828e1e9f8944d",
    createdAt: "2026-02-26T13:42:56.333Z",
    updatedAt: "2026-02-26T15:07:37.575Z",
    __v: 0,
    isCurrent: true,
  },
  {
    _id: "69a04a4aa4074ea333ff3883",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-26T13:27:40.689Z",
    expiresAt: "2026-03-01T13:27:38.333Z",
    token: "70d8ab17aae811ac9c0b0b7120e70accc3a174572e347fb54672247b1c234d8d",
    createdAt: "2026-02-26T13:27:38.335Z",
    updatedAt: "2026-02-26T13:27:40.689Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "69a03937a4074ea333ff36b2",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-26T12:14:51.463Z",
    expiresAt: "2026-03-01T12:14:47.452Z",
    token: "7f4af16ca21a4ed0d5dba96adf61ce039d2b80ca1fdb21a4742ced2c4e1ff3c1",
    createdAt: "2026-02-26T12:14:47.454Z",
    updatedAt: "2026-02-26T12:14:51.463Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c70e2917cfe517c6651bd",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T15:23:44.189Z",
    expiresAt: "2026-02-26T15:23:14.403Z",
    token: "6f77469a477f0e35581f72ddb80fd210a42aa5d33d256a3614148c56223c70bc",
    createdAt: "2026-02-23T15:23:14.406Z",
    updatedAt: "2026-02-23T15:23:44.190Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c6cdc36506abd589c301f",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T15:06:04.532Z",
    expiresAt: "2026-02-26T15:06:04.282Z",
    token: "aca33d1e72697e23c72df0f69ed9f9b2b72376a53120858ec267bb59fbacbc4a",
    createdAt: "2026-02-23T15:06:04.284Z",
    updatedAt: "2026-02-23T15:06:04.532Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c6cc536506abd589c2fa0",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T15:05:58.155Z",
    expiresAt: "2026-02-26T15:05:41.355Z",
    token: "f3dca33542a633824c4ad10cb6e8b499fbcea0f9011be9e1475de4bc46a3f6dc",
    createdAt: "2026-02-23T15:05:41.357Z",
    updatedAt: "2026-02-23T15:05:58.155Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c6ca936506abd589c2f31",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T15:05:20.057Z",
    expiresAt: "2026-02-26T15:05:13.544Z",
    token: "136d7c8bab1e69b31694a3b90ac748477ce17c66dd3069e2a6288e961614704a",
    createdAt: "2026-02-23T15:05:13.545Z",
    updatedAt: "2026-02-23T15:05:20.057Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c6c7f36506abd589c2eb8",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T15:04:42.417Z",
    expiresAt: "2026-02-26T15:04:31.592Z",
    token: "4da056e214f307bbab7ea26199ed65086e5ae7552693339a2eb9a8d215043032",
    createdAt: "2026-02-23T15:04:31.593Z",
    updatedAt: "2026-02-23T15:04:42.417Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c684e007d4b4054173e83",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T14:46:38.611Z",
    expiresAt: "2026-02-26T14:46:38.219Z",
    token: "925dbca9ba087bf5680af26cae9d7dd490465a73173207c2dfe3a9754226f74d",
    createdAt: "2026-02-23T14:46:38.221Z",
    updatedAt: "2026-02-23T14:46:38.611Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "699c44a9075a5ea606438886",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-23T13:33:23.929Z",
    expiresAt: "2026-02-26T12:14:33.239Z",
    token: "afbae0723c2a0d278ecb71ad8a739844b6b52b843c2cd037525312f4f50660ae",
    createdAt: "2026-02-23T12:14:33.241Z",
    updatedAt: "2026-02-23T13:33:23.930Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "6999bffb2c2b275dadfd21f3",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-22T08:02:22.641Z",
    expiresAt: "2026-02-24T14:23:55.660Z",
    token: "17396f82c923cd16571a703ff219be499fd1b847715f7214040f468e3b63b3e8",
    createdAt: "2026-02-21T14:23:55.664Z",
    updatedAt: "2026-02-22T08:02:22.641Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "69985f8b8b015a59aa9b4122",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-21T13:31:03.543Z",
    expiresAt: "2026-02-23T13:20:11.918Z",
    token: "71a61c7ec33efaab6acb8ab44889a5a39ae2c627bb699647cc1b2e7526bc2700",
    createdAt: "2026-02-20T13:20:11.920Z",
    updatedAt: "2026-02-21T13:31:03.543Z",
    __v: 0,
    isCurrent: false,
  },
  {
    _id: "69957034f967032fe114bb3d",
    userId: "66ffd63e1160aa94cc77cdc0",
    userModel: "Admin",
    deviceInfo:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0",
    ipAddress: "::1",
    browser: "Edge 145.0.0.0",
    os: "Windows 10",
    deviceType: "unknown",
    isActive: true,
    lastActivity: "2026-02-18T13:17:42.362Z",
    expiresAt: "2026-02-21T07:54:28.747Z",
    token: "f3c33acfc1e68580023b13d214a21892537278bd72f0c59181c2bd79ea436417",
    createdAt: "2026-02-18T07:54:28.749Z",
    updatedAt: "2026-02-18T13:17:42.363Z",
    __v: 0,
    isCurrent: false,
  },
];

const SessionManagement = () => {
  const [sessionsd, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        // const response = await axiosPrivate.get("/admin/sessions");
        // setSessions(response?.data);
        setError(null);
      } catch (err) {
        setError("Failed to load sessions. Please try again later.");
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleTerminateSession = async (sessionId) => {
    try {
      await axiosPrivate.post(`/admin/sessions/${sessionId}/terminate`);

      setSessions(sessions.filter((session) => session._id !== sessionId));

      toast.success("Session terminated successfully");
    } catch (err) {
      toast.error("Failed to terminate session");
      console.error("Error terminating session:", err);
    }
  };

  const handleTerminateAllOtherSessions = async () => {
    try {
      await axiosPrivate.post("/admin/sessions/terminate-all-other");

      const currentSessionId = sessions.find(
        (session) => session.isCurrent,
      )?._id;
      setSessions(
        sessions.filter((session) => session._id === currentSessionId),
      );

      toast.success("All other sessions terminated successfully");
    } catch (err) {
      toast.error("Failed to terminate other sessions");
      console.error("Error terminating other sessions:", err);
    }
  };

  const handleLogoutFromAllDevices = async () => {
    try {
      await axiosPrivate.post("/admin/sessions/logout-all");

      dispatch(logout());

      navigate("/");

      toast.success("Logged out from all devices successfully");
    } catch (err) {
      toast.error("Failed to logout from all devices");
      console.error("Error logging out from all devices:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const deriveDeviceType = (session) => {
    if (!session) return "unknown";

    if (session.deviceType && session.deviceType !== "unknown") {
      return session.deviceType;
    }

    const source =
      session.deviceInfo || session.userAgent || session.browser || "";
    const ua = String(source).toLowerCase();

    if (
      ua.includes("mobile") ||
      ua.includes("android") ||
      ua.includes("iphone")
    ) {
      return "mobile";
    }

    if (ua.includes("ipad") || ua.includes("tablet")) {
      return "tablet";
    }

    if (
      ua.includes("windows") ||
      ua.includes("macintosh") ||
      ua.includes("linux") ||
      ua.includes("x11")
    ) {
      return "desktop";
    }

    return "unknown";
  };

  const getDeviceIcon = (session) => {
    const type = deriveDeviceType(session);
    switch (type) {
      case "desktop":
        return <FaDesktop className="text-blue-500" />;
      case "mobile":
        return <FaMobile className="text-teal-500" />;
      case "tablet":
        return <FaTablet className="text-purple-500" />;
      default:
        return <FaQuestionCircle className="text-gray-500" />;
    }
  };

  const getDeviceLabel = (session) => {
    const type = deriveDeviceType(session);
    if (type === "unknown") {
      return "Unknown device";
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getSessionStatus = (session) => {
    if (!session) {
      return {
        label: "Unknown",
        className:
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      };
    }

    const now = new Date();
    const expiresAt = session.expiresAt ? new Date(session.expiresAt) : null;
    const isExpired = expiresAt ? expiresAt < now : false;

    if (session.isCurrent) {
      return {
        label: "Current Session",
        className:
          "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
      };
    }

    if (isExpired) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
    }

    if (session.isActive) {
      return {
        label: "Active",
        className:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      };
    }

    return {
      label: "Inactive",
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <div className="flex items-center">
          <FaExclamationTriangle className="mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 enhanced-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Session Management
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handleTerminateAllOtherSessions}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Terminate Other Sessions
          </button>
          <button
            onClick={handleLogoutFromAllDevices}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout From All Devices
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Browser
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sessions.map((session) => (
              <tr
                key={session._id}
                className={
                  session.isCurrent ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">{getDeviceIcon(session)}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {getDeviceLabel(session)}
                      </div>
                      {session.isCurrent && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-100">
                    {session.browser || "Unknown"}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {session.os || "Unknown OS"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-100">
                    {session.ipAddress || "Unknown"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-100">
                    {session.lastActivity
                      ? formatDistanceToNow(new Date(session.lastActivity), {
                          addSuffix: true,
                        })
                      : "Unknown"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {session.lastActivity
                      ? format(new Date(session.lastActivity), "PPp")
                      : ""}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(() => {
                    const status = getSessionStatus(session);
                    return (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}
                      >
                        {status.label}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center"
                    >
                      <FaEye className="mr-1" />
                      View
                    </button>
                    {!session.isCurrent && (
                      <button
                        onClick={() => handleTerminateSession(session._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                      >
                        <FaTrash className="mr-1" />
                        Terminate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedSession(null)}
          ></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Session Details
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedSession._id}
                </p>
              </div>
              {(() => {
                const status = getSessionStatus(selectedSession);
                return (
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}
                  >
                    {status.label}
                  </span>
                );
              })()}
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Device
                  </h3>
                  <div className="mt-1 flex items-center space-x-2">
                    {getDeviceIcon(selectedSession)}
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {getDeviceLabel(selectedSession)}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Browser / OS
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {selectedSession.browser || "Unknown browser"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedSession.os || "Unknown OS"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    IP Address
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {selectedSession.ipAddress || "Unknown"}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {selectedSession.location || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Created At
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {formatDate(selectedSession.createdAt) || "Unknown"}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Last Activity
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {selectedSession.lastActivity
                      ? formatDate(selectedSession.lastActivity)
                      : "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedSession.lastActivity
                      ? formatDistanceToNow(
                          new Date(selectedSession.lastActivity),
                          { addSuffix: true },
                        )
                      : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Expires At
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {selectedSession.expiresAt
                      ? formatDate(selectedSession.expiresAt)
                      : "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedSession.expiresAt
                      ? formatDistanceToNow(
                          new Date(selectedSession.expiresAt),
                          { addSuffix: true },
                        )
                      : ""}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Security
                  </h3>
                  <div className="mt-1 space-y-1 text-xs text-gray-900 dark:text-gray-100">
                    <p>
                      Current:{" "}
                      <span className="font-semibold">
                        {selectedSession.isCurrent ? "Yes" : "No"}
                      </span>
                    </p>
                    <p>
                      Active:{" "}
                      <span className="font-semibold">
                        {selectedSession.isActive ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  User Agent
                </h3>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-300 break-words">
                  {selectedSession.userAgent ||
                    selectedSession.deviceInfo ||
                    "Unknown"}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Raw Session Data
                </h3>
                <pre className="mt-1 text-[11px] text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/60 p-3 rounded-lg whitespace-pre-wrap break-all">
                  {JSON.stringify(selectedSession, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedSession(null)}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-blue-700 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;
