import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TImageFiles } from "../../interfaces/file.interface";
import { PostsSearchableFields } from "./post.constant";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDb = async (payload: TPost, images: TImageFiles) => {
  payload.images = images.postImages.map((image) => image.path);

  const post = await Post.create(payload);
  return post;
};

const getAllPostsFromDb = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(
    Post.find({ isDelete: false }).populate("author"),
    query,
  )
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(PostsSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getPostByFromDB = async (postId: string) => {
  const result = await Post.findById(postId).populate("author");
  return result;
};

const updatePostIntoDB = async (
  postId: string,
  payload: TPost,
  images: TImageFiles,
) => {
  if (images.postImages?.length > 0) {
    payload.images = images.postImages.map((image) => image.path);
  }

  const result = await Post.findByIdAndUpdate(postId, payload, { new: true });
  return result;
};

const deletePostIntoDb = async (postId: string) => {
  const isPostExists = await Post.findById(postId);

  // check if the post is exist or not
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  const result = await Post.findByIdAndUpdate(
    postId,
    { isDelete: true },
    { new: true },
  );
  return result;
};

export const PostServices = {
  createPostIntoDb,
  getAllPostsFromDb,
  getPostByFromDB,
  updatePostIntoDB,
  deletePostIntoDb,
};
