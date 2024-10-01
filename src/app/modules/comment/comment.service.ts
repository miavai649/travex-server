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

export const CommentServices = {
  createCommentIntoDb,
  getCommentsForIndividualPost,
};
