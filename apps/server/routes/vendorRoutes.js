import express from "express";
import { validate } from "../middlewares/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { findUserStore } from "../middlewares/findUserStore.js";
import {
  createProductCategorySchema,
  updateProductCategorySchema,
} from "../validators/productCategoryValidator.js";
import {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getAllProductCategories,
} from "../controllers/productCategoryController.js";

const router = express.Router();

router.post(
  "/product-category/create",
  authenticateUser,
  findUserStore,
  validate(createProductCategorySchema),
  createProductCategory
);

router.put(
  "/product-category/:id/update",
  authenticateUser,
  findUserStore,
  validate(updateProductCategorySchema),
  updateProductCategory
);

router.delete(
  "/product-category/:id/delete",
  authenticateUser,
  findUserStore,
  deleteProductCategory
);

router.get(
  "/product-category",
  authenticateUser,
  findUserStore,
  getAllProductCategories
);

export default router;
