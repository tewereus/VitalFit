import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "../../store/auth/authSlice";

export const OpenRoutes = ({ children }) => {
  // Check if user is authenticated from Redux state
  const { user, isLoading } = useSelector((state) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // If we don't have a user, try to refresh the token once
    if (!user && !isAuthChecked) {
      setIsAuthChecked(true);
      dispatch(refreshToken())
        .unwrap()
        .catch((error) => {
          console.error("Failed to refresh token:", error);
        });
    }
  }, [user, isAuthChecked, dispatch]);

  // Show loading spinner while checking authentication
  if (isLoading || (!user && !isAuthChecked)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user doesn't exist in Redux state, they are not authenticated
  return !user ? children : <Navigate to="/admin" replace={true} />;
};
