import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { CommentValidations } from "./comment.validation";
import { CommentControllers } from "./comment.controller";

const router = express.Router();

router.post(
  "/create-comment",
  auth(USER_ROLE.USER),
  validateRequest(CommentValidations.createCommentValidationSchema),
  CommentControllers.createComment,
);
export const CommentRoutes = router;
