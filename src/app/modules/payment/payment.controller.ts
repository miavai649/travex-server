import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.createPaymentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment Created Successfully",
    data: result,
  });
});

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, payload } = req.query;
  const result = await PaymentServices.confirmationService(
    transactionId as string,
    payload as string,
  );

  res.send(result);
});

export const PaymentController = {
  createPayment,
  confirmationController,
};
