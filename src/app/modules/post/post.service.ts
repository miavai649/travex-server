import { TImageFiles } from "../../interfaces/file.interface";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDb = async (payload: TPost, images: TImageFiles) => {
  payload.images = images.postImages.map((image) => image.path);

  const post = await Post.create(payload);
  return post;
};

export const PostServices = {
  createPostIntoDb,
};
