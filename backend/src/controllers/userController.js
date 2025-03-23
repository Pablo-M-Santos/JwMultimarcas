import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "12345678";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os usuários" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id; // Obtém o ID do usuário da URL
  console.log("ID do usuário a ser deletado:", userId); // Log do ID do usuário

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Log para verificar se o usuário foi encontrado
    if (!user) {
      console.log("Usuário não encontrado com o ID:", userId);
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    console.log("Usuário encontrado:", user); // Log do usuário encontrado

    // Deleta o usuário
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // Log de sucesso
    console.log("Usuário deletado com sucesso:", userId);

    // Retorna uma resposta de sucesso
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    // Log do erro
    console.error("Erro ao deletar o usuário:", error);
    return res.status(500).json({ error: "Erro ao deletar o usuário." });
  }
};
