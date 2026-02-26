import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "./store/auth/authSlice";
import ThemeInitializer from "./components/ThemeInitializer";
import Login from "./views/auth/Login";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";
import Users from "./views/users/users/Users";
import { PrivateRoutes } from "./views/routes/PrivateRoutes";
import { OpenRoutes } from "./views/routes/OpenRoutes";
import Manager from "./views/users/staff/Manager";
import Transactions from "./views/transactions/Transactions";
import Settings from "./views/settings/Settings";
import SessionManagement from "./views/session/SessionManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <OpenRoutes>
        <Login />
      </OpenRoutes>
    ),
  },
  {
    path: "/admin",
    element: (
      // <PrivateRoutes>
      <MainLayout />
      // </PrivateRoutes>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "members", element: <Users /> },
      { path: "staff", element: <Manager /> },
      { path: "transactions", element: <Transactions /> },
      { path: "settings", element: <Settings /> },
      { path: "sessions", element: <SessionManagement /> },
    ],
  },
]);

// Create a wrapper component to handle token refresh
function AppWrapper() {
  const dispatch = useDispatch();

  // Set up a timer to refresh the token periodically
  useEffect(() => {
    // Try to refresh token on app load
    const refreshAccessToken = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch (error) {
        console.log("Token refresh failed:", error);
      }
    };

    // Call once on mount
    refreshAccessToken();

    // Set up interval to refresh token every 20 minutes
    const refreshInterval = setInterval(
      () => {
        refreshAccessToken();
      },
      20 * 60 * 1000,
    ); // 20 minutes

    // Clean up interval on unmount
    return () => clearInterval(refreshInterval);
  }, [dispatch]);

  return (
    <>
      <ThemeInitializer />
      <RouterProvider router={router} />
    </>
  );
}

function App() {
  return <AppWrapper />;
}

export default App;
