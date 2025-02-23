import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "12345678"; // Chave do token

// 📌 Registro de Usuário
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "E-mail já cadastrado" });

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "client", // Por padrão, cliente
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

// 📌 Login de Usuário
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "E-mail ou senha inválidos" });

    // Compara a senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "E-mail ou senha inválidos" });

    // Gera um token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};
