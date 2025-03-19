import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api/api";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  if (!email) {
    alert("O email não foi passado corretamente.");
    navigate("/login"); // Redireciona caso o email não tenha sido passado
    return;
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ativa o estado de carregamento enquanto a requisição é feita

    try {
      const response = await api.post("/auth/verify-code", { email, code });
      console.log(response.data);

      // Verifica a resposta da API para ver se a verificação foi bem-sucedida
      if (response.data.message === "Código verificado com sucesso") {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redireciona para a página inicial em caso de sucesso
      } else {
        alert("Código inválido, tente novamente.");
      }
    } catch (error) {
      console.error("Erro na verificação do código", error);
      alert("Houve um erro ao verificar o código. Tente novamente.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento após a requisição
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
