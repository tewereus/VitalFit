import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaMoon,
  FaSun,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toggleDarkMode, logout } from "../store/auth/authSlice";

const Navigation = ({ onToggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      user?.preference?.mode === "dark" ||
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    if (user?.preference?.mode) {
      const isDark = user.preference.mode === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [user?.preference?.mode]);

  const handleTheme = () => {
    const newMode = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);

    if (user) {
      dispatch(toggleDarkMode({ preference: { mode: newMode } }))
        .unwrap()
        .catch((error) => console.error("Failed to update dark mode:", error));
    }
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/");
      });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile/Tablet hamburger menu */}
            <button
              onClick={onToggleSidebar}
              className={`xl:hidden p-2 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
                         transition-colors mr-3 ${
                           isSidebarOpen
                             ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                             : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                         }`}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/admin"
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              Admin Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={handleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100
                       dark:hover:bg-gray-700 focus:outline-none focus:ring-2
                       focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-1 sm:space-x-3">
                <Link
                  to="profile"
                  className="flex items-center space-x-2 px-2 sm:px-4 py-2 rounded-lg
                           text-gray-700 dark:text-gray-200 hover:bg-gray-100
                           dark:hover:bg-gray-700 transition-colors"
                >
                  {user.profile || user.image ? (
                    <img
                      src={user.profile || user.image}
                      alt="Profile"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                  ) : (
                    <FaUser className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-2 sm:px-4 py-2.5 text-red-600 dark:text-red-400
                     hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="w-5 h-5 sm:mr-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
