import express from "express";
import { authenticate, isAdmin } from "./middleware.js";

const router = express.Router();

// 📌 Rota acessível para qualquer usuário autenticado
router.get("/user", authenticate, (req, res) => {
  res.json({ message: `Olá, usuário ${req.user.id}! Você está autenticado.` });
});

// 📌 Rota exclusiva para ADMIN
router.get("/admin", authenticate, isAdmin, (req, res) => {
  res.json({ message: `Olá, Admin! Você tem permissão para acessar esta rota.` });
});

export default router;
