import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Nome e preço são obrigatórios" });
    }

    const newProduct = await prisma.product.create({
      data: { name, price: parseFloat(price) },
    });

    res
      .status(201)
      .json({ message: "Produto criado com sucesso", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o produto" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};
