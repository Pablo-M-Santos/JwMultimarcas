import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, setAuthToken } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setAuthToken(token);

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        localStorage.setItem("cart", savedCart);
      }

      const from = location.state?.from || "/";
      navigate(from);
    } catch (error) {
      console.error("Erro no login", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
