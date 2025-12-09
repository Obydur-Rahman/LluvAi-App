import express from "express";
import userAuth from "../middlewares/auth.js";
import adminAuth from "../middlewares/admin.js";
import {
  createManualPaymentRequest,
  approvePaymentRequest,
  rejectPaymentRequest,
  listPendingPayments,
  getUserPaymentHistory,
} from "../controllers/paymentController.js";

const router = express.Router();

// User routes
router.post("/manual", userAuth, createManualPaymentRequest);
router.get("/history", userAuth, getUserPaymentHistory);

// Admin routes
router.get("/pending", userAuth, adminAuth, listPendingPayments);
router.post("/approve", userAuth, adminAuth, approvePaymentRequest);
router.post("/reject", userAuth, adminAuth, rejectPaymentRequest);

export default router;
