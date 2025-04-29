import User from "../data/models/User.js";
import Transaction from "../data/models/Transaction.js";

export const createTransaction = async (senderId, receiverId, amount) => {
  if (amount <= 0) {
    throw new Error("El monto debe ser mayor a 0");
  }

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    throw new Error("Usuario remitente o receptor no encontrado");
  }

  if (sender.balance < amount) {
    throw new Error("Fondos insuficientes");
  }

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  const transaction = new Transaction({ senderId, receiverId, amount });
  return await transaction.save();
};

export const getTransactionsByUser = async (userId) => {
  return await Transaction.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).populate("senderId receiverId", "fullName email");
};
