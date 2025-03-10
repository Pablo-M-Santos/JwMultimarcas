import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const role = localStorage.getItem("role"); // Pegando a role salva

  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
