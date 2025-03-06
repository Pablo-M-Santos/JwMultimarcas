import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role")); // 🔥 Pega o role salvo no localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div>
      <h2>Home</h2>

      {role === "admin" && (
        <div>
          <Link to="/users">Usuários</Link>
          <br />
          <Link to="/products">Produtos</Link>
        </div>
      )}

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Home;
