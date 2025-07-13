import express from "express";
import {
  registerUser,
  login,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { validate } from "../middlewares/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), login);

router.get("/me", authenticateUser, getCurrentUser);

router.post("/logout", logout);

export default router;
