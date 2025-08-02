import express from "express";
import { validate } from "../middlewares/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  updateApplicationStatus,
  getAllSellerApplications,
} from "../controllers/sellerApplicationController.js";

const router = express.Router();

router.put(
  "/seller-applications/:id/status",
  authenticateUser,
  updateApplicationStatus
);

router.get("/seller-applications", authenticateUser, getAllSellerApplications);

export default router;
