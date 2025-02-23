import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/authRoutes.js";
import protectedRoutes from "./src/protectedRoutes.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use("/auth", authRoutes);

app.use("/protected", protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));




