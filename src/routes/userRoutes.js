import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authenticate, isAdmin } from "../middlwares/middleware.js";

const router = express.Router();

router.get("/users", authenticate, isAdmin, getAllUsers);

export default router;
