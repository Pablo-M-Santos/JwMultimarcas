import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/authRoutes.js";
import userRoutes from "./src/userRoutes.js";
import protectedRoutes from "./src/protectedRoutes.js";
import { swaggerDocs, swaggerUi } from "./src/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);

app.use(userRoutes);

app.use("/protected", protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
