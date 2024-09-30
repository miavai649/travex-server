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

const getAllPosts = catchAsync(async (req, res) => {
  const post = await PostServices.getAllPostsFromDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts retrieved successfully",
    data: post,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const post = await PostServices.getPostByFromDB(postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post retrieved successfully",
    data: post,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  getPostById,
};
