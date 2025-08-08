import Store from "../models/storeModel.js";

export const findUserStore = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication needed." });
    }

    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "Access denied. Only sellers can access this route.",
      });
    }

    // Cari toko berdasarkan 'ownerId' yang cocok dengan '_id' user yang sedang login
    const store = await Store.findOne({ ownerId: req.user._id });

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    req.storeId = store._id.toString();
    req.store = store;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
