import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api/api";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso! Faça login.");
        navigate("/login");
      }
    } catch (error) {
      console.log("Erro no cadastro", error);
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
      navigate("/");
    } catch (error) {
      console.error("Erro no cadastro com Google", error);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>

      <p>Ou cadastre-se com:</p>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.error("Erro no Google Login")}
      />

      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
};

export default Cadastro;
