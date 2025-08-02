import express from "express";
import {
  applySellerApplication,
  getMyApplication,
} from "../controllers/sellerApplicationController.js";
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

router.get("/my-application", authenticateUser, getMyApplication);

export default router;
