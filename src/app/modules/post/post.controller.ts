import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import { TImageFiles } from "../../interfaces/file.interface";

const createPost = catchAsync(async (req, res) => {
  const post = await PostServices.createPostIntoDb(
    req.body,
    req.files as TImageFiles,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post Created Successfully",
    data: post,
  });
});

export const PostControllers = {
  createPost,
};
