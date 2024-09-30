import { ObjectId } from "mongoose";

export type TComment = {
  post: ObjectId;
  commenter: ObjectId;
  comment: string;
};
