import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

/**
 * @desc Middleware untuk memastikan pengguna terautentikasi.
 * Memverifikasi token dari cookie atau header 'Authorization'.
 * Jika valid, melampirkan payload token ke `req.user`.
 */
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
  const tokenFromCookie = req.cookies.token;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password -__v");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user for this token not found." });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token is invalid or has expired." });
  }
};

/**
 * @desc Middleware untuk otentikasi opsional.
 * Jika token ada dan valid, lampirkan data user. Jika tidak, lanjutkan saja.
 * Berguna untuk route yang menampilkan konten berbeda untuk user login dan tamu.
 */
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
  const tokenFromCookie = req.cookies.token;

  const token = tokenFromHeader || tokenFromCookie;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Abaikan error, anggap pengguna sebagai tamu
      req.user = null;
    }
  }

  next();
};

/**
 * @desc Middleware untuk memberikan otorisasi berdasarkan peran (role).
 * @param {...String} allowedRoles - Daftar peran yang diizinkan untuk mengakses route.
 * @returns Middleware function
 * @example router.get('/admin-only', authenticateUser, authorizeRoles('admin'), getAdminData);
 */
export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    // Diasumsikan authenticateUser sudah dijalankan sebelumnya
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission for this resource.",
      });
    }
    next();
  };
