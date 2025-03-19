import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, setAuthToken } from "../api/api";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, role, verified } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setAuthToken(token);

      // Se o usuário não tiver verificado, redireciona para a tela de verificação do código
      if (!verified) {
        navigate("/verify-code", { state: { email } });
        return;
      }

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        localStorage.setItem("cart", savedCart);
      }

      const from = location.state?.from || "/";
      navigate(from); // Garantir redirecionamento para a página inicial ou anterior
    } catch (error) {
      console.error("Erro no login", error);
    }
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return;

    try {
      const decoded = jwtDecode<{
        email: string;
        name: string;
        picture?: string;
      }>(response.credential);

      const googleResponse = await api.post("/auth/google-login", {
        tokenId: response.credential,
      });

      const { token, role } = googleResponse.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", decoded.email);
      localStorage.setItem("name", decoded.name);
      if (decoded.picture) {
        localStorage.setItem("picture", decoded.picture);
      }

      setAuthToken(token);

      navigate("/"); // Redireciona para a página inicial após login com Google
    } catch (error) {
      console.error("Erro no login com Google", error);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Falha no login com Google");
  };

  const handleSendVerificationCode = async () => {
    try {
      await api.post("/auth/send-code", { email });
      alert("Código de verificação enviado para o seu e-mail.");
      setTimeout(() => {
        navigate("/verify-code", { state: { email } });
      }, 500);
    } catch (error) {
      console.error("Erro ao enviar código de verificação", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <button onClick={handleSendVerificationCode}>
        Enviar código de verificação
      </button>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
};

export default Login;
