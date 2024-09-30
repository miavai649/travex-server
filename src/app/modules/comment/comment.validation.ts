import { z } from "zod";

const createCommentValidationSchema = z.object({
  body: z.object({
    post: z.string(),
    comment: z.string().min(1, { message: "Comment cannot be empty" }),
  }),
});

export const CommentValidations = {
  createCommentValidationSchema,
};
