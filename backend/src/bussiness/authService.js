import User from "../data/models/User.js";
import ValidToken from "../data/models/ValidToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const loginUser = async (credentials) => {
  const { email, password } = credentials;
  
  const user = await User.findOne({ email });
  if (!user) throw new Error(`User not found: ${email}`);
  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error(`Incorrect password for user: ${email}`);
  
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "24h" });
  await ValidToken.create({ token });
  
  return { access_token: token };
};

export const logout = async (token) => {
  if (!token) throw new Error("Token is required");

  const existingToken = await ValidToken.findOne({ token: token.trim() });
  if (existingToken) {
    await ValidToken.deleteOne({ token: token.trim() });
  }

  return { message: "User logged out successfully" };
};