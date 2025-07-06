import express from 'express';
import { getTransactionByUserId, createTransaction, deleteTransaction, getTransactionSummary } from '../controllers/transactionsController.js';

const router = express.Router();

// Define the API endpoints for transactions
router.post("/", createTransaction);

router.get("/:userId", getTransactionByUserId);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getTransactionSummary);
export default router;