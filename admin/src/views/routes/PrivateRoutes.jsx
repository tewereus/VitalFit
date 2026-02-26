import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = ({ children, allowedRoles }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};
