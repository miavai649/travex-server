import { JwtPayload } from "jsonwebtoken";
import { TComment } from "./comment.interface";
import { Post } from "../post/post.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Comment } from "./comment.model";

const createCommentIntoDb = async (payload: TComment, user: JwtPayload) => {
  const post = await Post.findById(payload.post);

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found!");
  }

  payload.commenter = user._id;

  const result = await Comment.create(payload);
  return result;
};

const getCommentsForIndividualPost = async (postId: string) => {
  const result = await Comment.find({ post: postId }).populate("commenter");
  return result;
};

const updateMyComment = async (
  id: string,
  payload: TComment,
  user: JwtPayload,
) => {
  const comment = await Comment.findById(id);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found!");
  }

  if (comment.commenter.toString() !== user._id.toString()) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this comment!",
    );
  }

  const result = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const CommentServices = {
  createCommentIntoDb,
  getCommentsForIndividualPost,
  updateMyComment,
};
