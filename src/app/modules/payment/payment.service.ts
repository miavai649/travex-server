import { join } from "path";
import { User } from "../user/user.model";
import { TPayment, TPaymentData } from "./payment.interface";
import { Payment } from "./payment.model";
import {
  calculateExpiryDate,
  generateUniqueId,
  initiatePayment,
  verifyPayment,
} from "./payment.utils";
import { readFileSync } from "fs";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createPaymentIntoDB = async (body: TPayment) => {
  const isUserExist = await User.findById(body.user);

  const newId = await generateUniqueId();
  if (isUserExist && newId) {
    const paymentData: any = {
      ...body,
      transactionId: newId,
      paymentUser: isUserExist,
    };

    const paymentSession = await initiatePayment(paymentData);
    return paymentSession;
  }
};

const confirmationService = async (
  transactionId?: string | undefined,
  payload?: string | undefined,
) => {
  let message = "";
  let parsedPayload;

  try {
    const res = await verifyPayment(transactionId);

    try {
      parsedPayload = JSON.parse(payload || "{}");
    } catch (error) {
      throw new Error("Invalid JSON format in payload");
    }

    if (
      !parsedPayload.user ||
      !parsedPayload.price ||
      !parsedPayload.transactionId ||
      !parsedPayload.title ||
      !parsedPayload.expiry
    ) {
      throw new Error("Missing required payment data fields.");
    }

    const paymentDataPayload = parsedPayload as TPaymentData;

    const paymentData = {
      user: paymentDataPayload.user,
      amount: Number(paymentDataPayload.price),
      status: res && res.pay_status === "Successful" ? "Active" : "Expired",
      transactionId: paymentDataPayload.transactionId,
      planTitle: paymentDataPayload.title,
      planPrice: Number(paymentDataPayload.price),
      expiryDate: calculateExpiryDate(paymentDataPayload.expiry),
    };

    if (isNaN(paymentData.amount) || isNaN(paymentData.planPrice)) {
      throw new Error("amount and plan price cannot be Nan");
    }

    if (res && res.pay_status === "Successful") {
      await User.findByIdAndUpdate(
        { _id: paymentData.user },
        { isVerified: true },
      );

      await Payment.create(paymentData);
      message = "Payment successful";
      const filePath = join(__dirname, "../../../../views/confirmation.html");
      let template = readFileSync(filePath, "utf-8");
      template = template.replace("{{message}}", message);
      return template;
    } else {
      throw new Error("Payment validation failed.");
    }
  } catch (error: any) {
    message = "Payment failed";

    const filePath = join(__dirname, "../../../../views/failConfirmation.html");
    let template;
    try {
      template = readFileSync(filePath, "utf-8");
    } catch (fileError) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to load failConfirmation template",
      );
    }
    template = template.replace("{{message}}", message);
    return template;
  }
};

export const PaymentServices = {
  createPaymentIntoDB,
  confirmationService,
};
