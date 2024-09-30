import { ObjectId } from "mongoose";
import { POST_CATEGORY } from "./post.constant";

export type TPost = {
  _id?: string;
  title: string;
  content: string;
  author: ObjectId;
  images?: string[];
  category: keyof typeof POST_CATEGORY;
  isPremium: boolean;
  isDelete: boolean;
};
