import { z } from "zod";
import { POST_CATEGORY } from "./post.constant";

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    author: z.string().min(1, { message: "Author ID is required" }),
    images: z.array(z.string()).optional(),
    category: z.enum(
      Object.keys(POST_CATEGORY) as [keyof typeof POST_CATEGORY],
    ),
    isPremium: z.boolean().optional(),
    isDelete: z.boolean().optional().default(false),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
};
