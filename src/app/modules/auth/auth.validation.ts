import { z } from "zod";
import { GENDER } from "../user/user.constant";

const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    gender: z.enum(Object.keys(GENDER) as [keyof typeof GENDER]),
    birthDate: z.string().min(1, { message: "Birth date is required" }),
    mobileNumber: z.string().min(10, { message: "Mobile number is required" }),
  }),
});
export const AuthValidation = {
  userRegisterValidationSchema,
};
