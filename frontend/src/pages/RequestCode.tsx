import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const RequestCode = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendVerificationCode = async () => {
    setLoading(true);

    try {
      await api.post("/auth/send-code", { email });
      alert("Código de verificação enviado para o seu e-mail.");
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      console.error("Erro ao enviar código de verificação", error);
      alert("Erro ao enviar código. Verifique se o e-mail está correto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Solicitar Código</h2>
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendVerificationCode} disabled={loading}>
        {loading ? "Enviando..." : "Enviar Código"}
      </button>
    </div>
  );
};

export default RequestCode;
