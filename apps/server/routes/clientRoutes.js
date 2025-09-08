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
import { addItemToCart } from "../controllers/cartController.js";
import {
  getAllProductsForMarketplace,
  getProductDetails,
} from "../controllers/productController.js";
import { getAllProductCategoriesForMarketplace } from "../controllers/productCategoryController.js";

const router = express.Router();

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

router.post("/cart", authenticateUser, addItemToCart);

router.get("/products", getAllProductsForMarketplace);

router.get("/product/:slug", getProductDetails);

router.get("/categories", getAllProductCategoriesForMarketplace);

export default router;
