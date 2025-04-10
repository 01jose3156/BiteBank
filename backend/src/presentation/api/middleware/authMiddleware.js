import jwt from "jsonwebtoken";
import ValidToken from "../../../data/models/validTokens.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "default_secret");

    const tokenExists = await ValidToken.findOne({ token });
    if (!tokenExists) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const addValidToken = async (token) => {
  await ValidToken.create({ token });
};

export const removeValidToken = async (token) => {
  const existingToken = await ValidToken.findOne({ token: token.trim() });
  if (existingToken) {
    await ValidToken.deleteOne({ token: token.trim() });
  }
};