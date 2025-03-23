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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price: parseFloat(price) },
    });

    res.json({
      message: "Produto atualizado com sucesso",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar o produto" });
  }
};

// Deletar Produto (Apenas Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    await prisma.product.delete({ where: { id } });

    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o produto" });
  }
};
