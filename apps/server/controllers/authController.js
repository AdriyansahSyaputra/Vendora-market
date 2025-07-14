import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    // Cek apakah pengguna sudah ada
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    // Cek username atau email sudah ada
    if (existingUser) {
      return res.status(400).json({
        errors: {
          email:
            existingUser.email === email ? "Email already exists" : undefined,
          username:
            existingUser.username === username
              ? "Username already exists"
              : undefined,
        },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = "1d";

// Login function
// Handles both normal user login and special admin login
export const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Special admin login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const payload = {
        email,
        role: "admin",
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .setHeader("Authorization", `Bearer ${token}`)
        .json({
          message: "Admin login successful",
          user: payload,
          redirect: "/dashboard",
        });
    }

    // Normal Login
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() },
      ],
    });

    if (!user) {
      // Kirim error umum untuk keamanan
      return res
        .status(401)
        .json({ message: "Username/Email or password is invalid" });
    }

    // Verifikasi Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({
          errors: { password: "Username/Email or password is invalid" },
        });
    }

    // Buat Token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      username: user.username,
      avatar: user.avatar,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    // Tentukan redirect berdasarkan role
    let redirect = "/";
    if (user.role === "admin") redirect = "/dashboard";

    // Kirim token di cookie dan header
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .setHeader("Authorization", `Bearer ${token}`) // Set header manual
      .status(200)
      .json({
        message: "Login successful",
        user: payload,
        redirect,
      });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(200)
    .json({ message: "Logout successful" });
};

// Get current user information
// This function retrieves the current user's information from the request object
export const getCurrentUser = (req, res) => {
  const user = req.user;
  if (!user) return res.status(404).json({ message: "User not found." });

  return res.status(200).json(user);
};
