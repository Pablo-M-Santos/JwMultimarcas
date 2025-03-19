import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const role = localStorage.getItem("role");

  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
