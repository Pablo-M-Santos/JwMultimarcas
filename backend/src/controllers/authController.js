import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "12345678";
const GOOGLE_CLIENT_ID =
  "355361599465-3hus4sf98tom9dds64q15rupsio2pi60.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pablomoreirasantos.hp@gmail.com",
    pass: "owee ehga aigb uzip",
  },
});

const verificationCodes = new Map();
const verificationCodeExpiration = 5 * 60 * 1000;

// Envio de código de verificação por e-mail
export const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "E-mail não encontrado" });
    }

    const code = crypto.randomInt(100000, 999999).toString();
    const expirationTime = Date.now() + verificationCodeExpiration;
    verificationCodes.set(email, { code, expirationTime });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Seu código de verificação",
      text: `Seu código de verificação é: ${code}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ message: "Código enviado para o e-mail" });
    } catch (mailError) {
      console.error("Erro ao enviar e-mail:", mailError);
      return res
        .status(500)
        .json({ error: "Erro ao enviar o código de verificação" });
    }
  } catch (error) {
    console.error("Erro no servidor ao enviar o código de verificação:", error);
    res.status(500).json({ error: "Erro no servidor ao enviar o código" });
  }
};

// Verificação do código recebido pelo usuário
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const codeData = verificationCodes.get(email);

    if (!codeData) {
      return res.status(400).json({ error: "Código não encontrado" });
    }

    if (codeData.expirationTime < Date.now()) {
      verificationCodes.delete(email);
      return res.status(400).json({ error: "Código expirado" });
    }

    if (codeData.code !== code) {
      return res.status(400).json({ error: "Código inválido" });
    }

    verificationCodes.delete(email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Código verificado com sucesso",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Erro ao validar código:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};


// Login com e-mail e senha
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "E-mail ou senha inválidos" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "E-mail ou senha inválidos" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login realizado com sucesso",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};


// Registro de novo usuário
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "E-mail já cadastrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "client",
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};


// Login com Google
export const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { name, email, password: "", role: "client" },
      });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login com Google realizado com sucesso",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Erro ao autenticar com Google:", error);
    res.status(500).json({ error: "Erro ao autenticar com o Google" });
  }
};


// Obtém o perfil do usuário autenticado
export const getUserProfile = async (req, res) => {
  try {
    console.log("ID do usuário extraído do token:", req.user.id); 

    const userId = req.user.id; 

    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true, picture: true }, 
    });

    console.log("Usuário encontrado:", user); 

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error); 
    res.status(500).json({ error: "Erro no servidor" });
  }
};
