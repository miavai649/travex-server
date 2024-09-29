import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/register-user",
  validateRequest(AuthValidation.userRegisterValidationSchema),
  AuthControllers.registerUser,
);
router.post(
  "/login",
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
