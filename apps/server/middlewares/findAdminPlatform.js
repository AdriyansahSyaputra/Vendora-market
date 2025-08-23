import User from "../models/userModel.js";

export const findAdminPlatform = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication needed." });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only platform admins can access this route.",
      });
    }

    const admin = await User.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    req.adminId = admin;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
