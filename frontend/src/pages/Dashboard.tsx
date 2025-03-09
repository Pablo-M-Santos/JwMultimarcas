import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");

  if (userRole !== "admin") {
    navigate("/");
  }

  return (
    <div>
      <Navbar />
      <h3>Dashboard - Administrador</h3>
      <p>Informações básicas do administrador...</p>
    </div>
  );
};

export default Dashboard;
