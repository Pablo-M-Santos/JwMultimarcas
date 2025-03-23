import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, setAuthToken } from "../api/api";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  if (!email) {
    alert("O email não foi passado corretamente.");
    navigate("/request-code");
    return;
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-code", { email, code });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", email);

        if (response.data.picture) {
          localStorage.setItem("picture", response.data.picture);
        }

        setAuthToken(response.data.token);

        navigate("/");
      } else {
        alert("Código inválido, tente novamente.");
      }
    } catch (error) {
      console.error("Erro na verificação do código", error);
      alert("Houve um erro ao verificar o código. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Verificação de Código</h2>
      <form onSubmit={handleVerifyCode}>
        <input
          type="text"
          placeholder="Digite o código de verificação"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;
