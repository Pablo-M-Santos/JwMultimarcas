import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticate, isAdmin } from "../middlwares/middleware.js";

const router = express.Router();

router.post("/products", authenticate, isAdmin, createProduct);
router.put("/products/:id", authenticate, isAdmin, updateProduct);
router.delete("/products/:id", authenticate, isAdmin, deleteProduct);

router.get("/products", getAllProducts);

export default router;
