import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";
import { authenticate, isAdmin } from "../middlwares/middleware.js";

const router = express.Router();

router.get("/users", authenticate, isAdmin, getAllUsers);
router.delete("/users/:id", authenticate, isAdmin, deleteUser);

export default router;
