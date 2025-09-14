import express from "express";
import {
  applySellerApplication,
  getMyApplication,
} from "../controllers/sellerApplicationController.js";
import { sellerApplicationSchema } from "../validators/sellerApplicationsValidator.js";
import { validate } from "../middlewares/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  getUserNotifications,
  markNotificationsAsRead,
  getNotificationById,
} from "../controllers/notificationController.js";
import {
  addItemToCart,
  getCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../controllers/cartController.js";
import {
  getAllProductsForMarketplace,
  getProductDetails,
} from "../controllers/productController.js";
import {
  createUploadMiddleware,
  validateFileCount,
} from "../middlewares/uploadMiddleware.js";
import {
  updateUserProfile,
  getUserData,
} from "../controllers/userController.js";

const router = express.Router();

const profileUploadConfig = {
  fieldName: "avatar",
  maxCount: 1,
  maxSizeMB: 2,
};

const uploadProfileImage = createUploadMiddleware(profileUploadConfig);
const validateProfileImageCount = validateFileCount({
  fieldName: "avatar",
  minCount: 0,
  message: "Maksimal 1 file avatar yang diizinkan.",
});

router.post(
  "/apply",
  authenticateUser,
  validate(sellerApplicationSchema),
  applySellerApplication
);

router.get("/my-application", authenticateUser, getMyApplication);

router.get("/notifications", authenticateUser, getUserNotifications);

router.put("/notifications/read", authenticateUser, markNotificationsAsRead);

router.get("/notifications/:id", authenticateUser, getNotificationById);

// Profile routes
router.get("/profile", authenticateUser, getUserData);

router.put(
  "/profile/update",
  authenticateUser,
  uploadProfileImage,
  validateProfileImageCount,
  updateUserProfile
);
// End Profile routes

// Cart routes start
router.get("/cart", authenticateUser, getCart);

router.post("/cart", authenticateUser, addItemToCart);

router.put("/cart/:cartItemId", authenticateUser, updateCartItemQuantity);

router.delete("/cart/:cartItemId", authenticateUser, removeCartItem);
// Cart routes end

router.get("/products", getAllProductsForMarketplace);

router.get("/product/:slug", getProductDetails);

export default router;
