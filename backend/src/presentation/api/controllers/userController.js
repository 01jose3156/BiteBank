import * as userService from "../../../bussiness/UserService.js";
import * as authService from "../../../bussiness/authService.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      const token = await authService.loginUser({ email, password });
      res.status(200).json(token);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
  
  export const logoutUser = async (req, res) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
  
      await authService.logout(token);
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getProfile = async (req, res) => {
    try {
      const user = await userService.getUserById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { password, ...userData } = user.toObject();
  
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};