import * as transactionService from "../../../bussiness/transactionService.js";

export const createTransaction = async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;
    const transaction = await transactionService.createTransaction(senderId, receiverId, amount);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.userId; 
    const transactions = await transactionService.getTransactionsByUser(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
