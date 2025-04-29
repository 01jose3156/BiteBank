import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import * as transactionController from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", authMiddleware, transactionController.createTransaction);
router.get("/", authMiddleware, transactionController.getUserTransactions);

export default router;