import mongoose from "mongoose";

const paymentRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // matches the model name in userModel.js
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["bkash", "rocket", "nagad"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: String,
  },
  { timestamps: true }
);

export default mongoose.model("PaymentRequest", paymentRequestSchema);
