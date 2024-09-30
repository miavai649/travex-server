import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { PostValidations } from "./post.validation";
import { PostControllers } from "./post.controller";
import { multerUpload } from "../../config/multer.config";
import { bodyDataParsing } from "../../middleware/bodyDataParsing";

const router = express.Router();

router.post(
  "/create-post",
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: "postImages" }]),
  bodyDataParsing,
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

export const PostRoutes = router;
