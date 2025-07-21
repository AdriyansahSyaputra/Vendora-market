import express from "express";
import { applySellerApplication } from "../controllers/sellerApplicationController.js";
import { sellerApplicationSchema } from "../validators/sellerApplicationsValidator.js";
import { validate } from "../middlewares/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/apply",
  authenticateUser,
  validate(sellerApplicationSchema),
  applySellerApplication
);

export default router;