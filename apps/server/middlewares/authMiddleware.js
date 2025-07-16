import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader && authHeader.split(" ")[1];
  const tokenFromCookie = req.cookies.token;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ message: "No token provided. Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader && authHeader.split(" ")[1];
  const tokenFromCookie = req.cookies.token;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    // ignore error, user tetap anonym
  }

  next();
};

export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action.",
      });
    }
    next();
  };
