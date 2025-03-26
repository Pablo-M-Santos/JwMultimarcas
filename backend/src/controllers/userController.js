import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "12345678";

// Obtém todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os usuários" });
  }
};


// Deletar Usuário
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log("ID do usuário a ser deletado:", userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log("Usuário não encontrado com o ID:", userId);
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    console.log("Usuário encontrado:", user);

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    console.log("Usuário deletado com sucesso:", userId);

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar o usuário:", error);
    return res.status(500).json({ error: "Erro ao deletar o usuário." });
  }
};
