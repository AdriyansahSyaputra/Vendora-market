import express from "express";
import { validate } from "../middlewares/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { findAdminPlatform } from "../middlewares/findAdminPlatform.js";
import {
  updateApplicationStatus,
  getAllSellerApplications,
} from "../controllers/sellerApplicationController.js";
import { parseJsonFields } from "../middlewares/parseFormDataMiddleware.js";
import {
  createUploadMiddleware,
  validateFileCount,
} from "../middlewares/uploadMiddleware.js";
import { createVoucherSchema } from "../validators/voucherValidator.js";
import {
  createPlatformVoucher,
  updatePlatformVoucher,
  deletePlatformVoucher,
  getAllPlatformVouchers,
} from "../controllers/voucherController.js";

const router = express.Router();

const voucherJsonFields = ["discountValue", "minPurchaseAmount", "usageLimit"];

// Configurasi Multer untuk upload file
const productUploadConfig = {
  fieldName: "image",
  maxCount: 1,
  maxSizeMB: 1,
};

const uploadProductImages = createUploadMiddleware(productUploadConfig);
const validateProductImageCount = validateFileCount({
  fieldName: "image",
  minCount: 1,
  message: "image is required.",
});

router.put(
  "/seller-applications/:id/status",
  authenticateUser,
  updateApplicationStatus
);

router.get("/seller-applications", authenticateUser, getAllSellerApplications);

// Route voucher start
router.post(
  "/voucher/platform/create",
  authenticateUser,
  findAdminPlatform,
  uploadProductImages,
  validateProductImageCount,
  parseJsonFields(voucherJsonFields),
  validate(createVoucherSchema),
  createPlatformVoucher
);

router.put(
  "/voucher/platform/:id/update",
  authenticateUser,
  findAdminPlatform,
  uploadProductImages,
  validateProductImageCount,
  parseJsonFields(voucherJsonFields),
  validate(createVoucherSchema),
  updatePlatformVoucher
);

router.delete(
  "/voucher/platform/:id/delete",
  authenticateUser,
  findAdminPlatform,
  deletePlatformVoucher
);

router.get(
  "/voucher/platform",
  authenticateUser,
  findAdminPlatform,
  getAllPlatformVouchers
);
// Route voucher end

export default router;
