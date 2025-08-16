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
import { productSchema } from "../validators/productValidator.js";
import {
  createProduct,
  updateProduct,
  getAllProductsByStore,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { parseJsonFields } from "../middlewares/parseFormDataMiddleware.js";
import {
  createUploadMiddleware,
  validateFileCount,
} from "../middlewares/uploadMiddleware.js";

const router = express.Router();

const productJsonFields = ["variations", "dimensions", "promos"];

// Configurasi Multer untuk upload file
const productUploadConfig = {
  fieldName: "images",
  maxCount: 5,
  maxSizeMB: 3,
};

const uploadProductImages = createUploadMiddleware(productUploadConfig);
const validateProductImageCount = validateFileCount({
  fieldName: "images",
  minCount: 1,
  message: "At least one image is required.",
});

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
  uploadProductImages,
  validateProductImageCount,
  parseJsonFields(productJsonFields),
  validate(productSchema),
  createProduct
);

router.put(
  "/product/:id/update",
  authenticateUser,
  findUserStore,
  uploadProductImages,
  validateProductImageCount,
  parseJsonFields(productJsonFields),
  validate(productSchema),
  updateProduct
);

router.delete(
  "/product/:id/delete",
  authenticateUser,
  findUserStore,
  deleteProduct
);

router.get(
  "/product/details/:slug",
  authenticateUser,
  findUserStore,
  getProductDetails
);

router.get("/products", authenticateUser, findUserStore, getAllProductsByStore);
// Route product end

export default router;
