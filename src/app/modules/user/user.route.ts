import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userRegisterSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userRegisterSchema),
  UserControllers.createUser,
);
router.get("/", UserControllers.getAllUsers);

export const UserRoutes = router;
