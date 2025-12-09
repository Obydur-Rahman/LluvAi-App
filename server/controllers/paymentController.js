import PaymentRequest from "../models/paymentRequestModel.js";
import userModel from "../models/userModel.js";

// User submits manual payment request
export const createManualPaymentRequest = async (req, res) => {
  try {
    const { amount, credits, method, transactionId } = req.body;
    const userId = req.user.id;

    if (!amount || !credits || !method || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "Amount, credits, method, and transaction ID are required",
      });
    }

    const validMethods = ["bkash", "rocket", "nagad"];
    if (!validMethods.includes(method)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const paymentRequest = new PaymentRequest({
      userId,
      amount,
      method,
      credits,
      transactionId,
      status: "pending",
    });

    await paymentRequest.save();

    res.json({
      success: true,
      message: "Payment request submitted. Awaiting admin approval.",
      paymentRequest,
    });
  } catch (error) {
    console.error("Payment request error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin approves payment request
export const approvePaymentRequest = async (req, res) => {
  try {
    const { paymentId, adminNotes } = req.body;

    const paymentRequest = await PaymentRequest.findById(paymentId);
    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: "Payment request not found",
      });
    }

    // Update payment status
    paymentRequest.status = "approved";
    paymentRequest.adminNotes = adminNotes || "";
    await paymentRequest.save();

    // Credit user
    // Add credits based on requested credits, not currency amount
    await userModel.findByIdAndUpdate(
      paymentRequest.userId,
      { $inc: { creditBalance: paymentRequest.credits } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment approved and credits added to user",
    });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin rejects payment request
export const rejectPaymentRequest = async (req, res) => {
  try {
    const { paymentId, adminNotes } = req.body;

    const paymentRequest = await PaymentRequest.findById(paymentId);
    if (!paymentRequest) {
      return res.status(404).json({
        success: false,
        message: "Payment request not found",
      });
    }

    paymentRequest.status = "rejected";
    paymentRequest.adminNotes = adminNotes || "";
    await paymentRequest.save();

    res.json({
      success: true,
      message: "Payment request rejected",
    });
  } catch (error) {
    console.error("Rejection error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all pending payments
export const listPendingPayments = async (req, res) => {
  try {
    const payments = await PaymentRequest.find({ status: "pending" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("List pending error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's payment history
export const getUserPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await PaymentRequest.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
