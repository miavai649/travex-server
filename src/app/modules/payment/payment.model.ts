import mongoose, { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "AAMARPAY",
    },
    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    planTitle: {
      type: String,
      required: true,
    },
    planPrice: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<TPayment>("Payment", PaymentSchema);
