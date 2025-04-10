import express from "express";
import * as userController from "../controllers/UserController.js";

const router = express.Router();

router.post("/", userController.createUser);

router.post("/login", userController.login);

router.post("/logout", userController.logoutUser);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;