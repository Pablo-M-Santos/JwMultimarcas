import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { authenticate, isAdmin } from "../middlwares/middleware.js";

const router = express.Router();

router.post("/products", authenticate, isAdmin, createProduct);

router.get("/products", getAllProducts);

export default router;
