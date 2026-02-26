import axios from "axios";
import { base_url } from "./axiosConfig";

// Create axios instance for private (authenticated) requests
export const axiosPrivate = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

// Create axios instance for public requests
export const axiosPublic = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token from cookies and app identifier
axiosPrivate.interceptors.request.use(
  (config) => {
    // Add a custom header to identify this as an admin application request
    config.headers["X-App-Type"] = "admin";
    // Add X-Security-Password header if it's provided in the config
    // This allows the security password to be passed through the axios instance
    if (config.headers && config.headers["x-security-password"]) {
      config.headers["X-Security-Password"] =
        config.headers["x-security-password"];
      // Remove the lowercase version to avoid duplication
      delete config.headers["x-security-password"];
    }

    // Add X-Security-Verified-Timestamp header if it's provided in the config
    // This allows the security verification timestamp to be passed through the axios instance
    if (config.headers && config.headers["x-security-verified-timestamp"]) {
      config.headers["X-Security-Verified-Timestamp"] =
        config.headers["x-security-verified-timestamp"];
      // Remove the lowercase version to avoid duplication
      delete config.headers["x-security-verified-timestamp"];
    }
    // No need to manually add token as it will be sent automatically with cookies
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to check if we are on the login page (with or without query params)
function isOnLoginPage() {
  return window.location.pathname === "/" || window.location.pathname === "/login";
}

// User type for this application
const USER_TYPE = "admin";

// Track if we're currently in the process of logging out
let isLoggingOut = false;

// Add response interceptor to handle token refresh
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    // Prevent infinite loop: if already on login page, do not attempt refresh/logout/redirect
    if (isOnLoginPage()) {
      return Promise.reject(error);
    }

    // Check if this is a logout request
    const isLogoutRequest = prevRequest?.url?.includes("/logout");

    // If this is a logout request, set the flag
    if (isLogoutRequest) {
      isLoggingOut = true;
    }

    // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet and we're not logging out
    if (
      error?.response?.status === 401 &&
      !prevRequest?._retry &&
      !isLoggingOut
    ) {
      prevRequest._retry = true;

      // Check if the response indicates token expiration
      const isTokenExpired = error?.response?.data?.tokenExpired;
      // Check if the response includes a user type
      const userType = error?.response?.data?.userType || USER_TYPE;

      // Check if this is a refresh token request that failed
      const isRefreshTokenRequest =
        prevRequest?.url?.includes("/refresh-token");

      // If the refresh token request itself failed, redirect to login
      if (isRefreshTokenRequest) {
        window.location.href = "/?expired=true";
        return Promise.reject(error);
      }

      try {
        // Try to refresh the token using the type-specific endpoint - don't use custom headers
        await axios.post(
          `${base_url}/${userType}/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        // Retry the original request
        return axiosPrivate(prevRequest);
      } catch (refreshError) {
        // If refresh fails, dispatch logout action and redirect to login
        try {
          // Import the store and logout action
          const { store } = require("../store/store");
          const { user_reset } = require("../store/auth/authSlice");

          // Dispatch logout action
          store
            .dispatch(user_reset())
            .unwrap()
            .then(() => {
              // Clear any admin data from localStorage using our service function
              const {
                default: authService,
              } = require("../store/auth/authService");
              if (authService.clearLocalStorage) {
                authService.clearLocalStorage();
              }

              // Redirect to login page
              window.location.href = "/?expired=true";
            })
            .catch(() => {
              // If logout fails, just redirect
              window.location.href = "/?expired=true";
            });
        } catch (storeError) {
          // If we can't access the store, just redirect
          window.location.href = "/?expired=true";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
