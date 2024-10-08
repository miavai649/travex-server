import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/create", PaymentController.createPayment);

router.post("/confirmation", PaymentController.confirmationController);

export const PaymentRoute = router;
