import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userRegisterSchema } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userRegisterSchema),
  UserControllers.createUser,
);
router.get("/", UserControllers.getAllUsers);

router.get(
  "/current-user",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  UserControllers.getCurrentUser,
);
router.put(
  "/toggle-follower",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  UserControllers.toggleFollowUser,
);
router.put(
  "/update-user/:id",
  auth(USER_ROLE.USER),
  UserControllers.updateUser,
);

export const UserRoutes = router;
