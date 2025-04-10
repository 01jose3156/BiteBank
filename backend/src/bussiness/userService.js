import bcrypt from "bcryptjs";
import User from "../data/models/User.js";

export const createUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  const user = new User(userData);
  return await user.save();
};

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id, updateData) => {
  updateData.updatedAt = new Date();
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
