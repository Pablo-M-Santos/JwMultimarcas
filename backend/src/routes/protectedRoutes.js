import express from "express";
import { authenticate, isAdmin } from "../middlwares/middleware.js";

const router = express.Router();

router.get("/user", authenticate, (req, res) => {
  res.json({ message: `Olá, cliente ${req.user.id}! Você está autenticado.` });
});

router.get("/admin", authenticate, isAdmin, (req, res) => {
  res.json({
    message: `Olá, Admin! Você tem permissão para acessar esta rota.`,
  });
});

export default router;

/**
 * @swagger
 * /protected/user:
 *   get:
 *     summary: Rota acessível por qualquer usuário autenticado
 *     description: Rota que exibe uma mensagem para usuários autenticados
 *     tags: [Protegido]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get("/user", authenticate, (req, res) => {
  res.json({ message: `Olá, usuário ${req.user.id}! Você está autenticado.` });
});

/**
 * @swagger
 * /protected/admin:
 *   get:
 *     summary: Rota exclusiva para administradores
 *     description: Rota que exibe uma mensagem exclusiva para administradores
 *     tags: [Protegido]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin autenticado com sucesso
 *       403:
 *         description: Acesso restrito para admins
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get("/admin", authenticate, isAdmin, (req, res) => {
  res.json({
    message: `Olá, Admin! Você tem permissão para acessar esta rota.`,
  });
});
