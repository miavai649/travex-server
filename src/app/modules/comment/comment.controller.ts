import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoDb(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment Submitted Successfully!",
    data: result,
  });
});

const getCommentsForIndividualPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.getCommentsForIndividualPost(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comments retrieved Successfully!",
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getCommentsForIndividualPost,
};
