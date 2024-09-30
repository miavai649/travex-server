import { QueryBuilder } from "../../builder/QueryBuilder";
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
  const users = new QueryBuilder(Post.find().populate("author"), query)
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

export const PostServices = {
  createPostIntoDb,
  getAllPostsFromDb,
  getPostByFromDB,
};
