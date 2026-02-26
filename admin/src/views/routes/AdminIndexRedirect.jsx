import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../Dashboard";

const AdminIndexRedirect = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  if (user.role === "staff") {
    return <Navigate to="members" replace />;
  }

  // default admin
  return <Dashboard />;
};

export default AdminIndexRedirect;
