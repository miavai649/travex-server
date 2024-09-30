import express, { NextFunction, Request, Response } from "express";
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
router.get("/", PostControllers.getAllPosts);
router.get("/:id", PostControllers.getPostById);
router.put(
  "/:id",
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: "postImages" }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.postData);
    next();
  },
  validateRequest(PostValidations.updatePostValidationSchema),
  PostControllers.updatePost,
);
router.delete("/:id", PostControllers.deletePost);

export const PostRoutes = router;
