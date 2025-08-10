import express from "express";
import multer from "multer";
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
import { productSchema } from "../validators/productValidator.js";
import {
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { parseJsonFields } from "../middlewares/parseFormDataMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const productJsonFields = ["variations", "dimensions", "promos"];

// Route product category start
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
// Route product category end

// Route product start
router.post(
  "/product/create",
  authenticateUser,
  findUserStore,
  upload.array("images", 5),
  parseJsonFields(productJsonFields),
  validate(productSchema),
  createProduct
);

router.put(
  "/product/:id/update",
  authenticateUser,
  findUserStore,
  upload.array("images", 5),
  parseJsonFields(productJsonFields),
  validate(productSchema),
  updateProduct
);
// Route product end

export default router;
