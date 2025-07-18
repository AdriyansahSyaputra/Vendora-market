import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = "1d";

/**
 * @desc Fungsi utilitas untuk menandatangani token dan mengirimkannya dalam cookie.
 * @param {object} user - Objek user dari database.
 * @param {number} statusCode - Kode status HTTP untuk respons.
 * @param {object} res - Objek respons Express.
 */
const sendTokenResponse = (user, statusCode, res) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    username: user.username,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
  };

  res.cookie("token", token, cookieOptions);

  const redirect = user.role === "admin" ? "/dashboard" : "/";

  res.status(statusCode).json({
    message: "Operation successful",
    user: payload,
    redirect,
  });
};

export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "Email or username is already registered." });
    }

    const user = await User.create({ fullName, username, email, password });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

// Login function
// Handles both normal user login and special admin login
export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Identifier and password are required." });
  }

  try {
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() },
      ],
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Invalid identifier or password." });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout successful." });
};

// Get current user information
// This function retrieves the current user's information from the request object
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
