import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userRegisterSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/register-user",
  validateRequest(userRegisterSchema),
  UserControllers.userRegister,
);
router.get("/", UserControllers.getAllUsers);

export const UserRoutes = router;
