import { ObjectId } from "mongoose";
import { GENDER, USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  gender: keyof typeof GENDER;
  role: keyof typeof USER_ROLE;
  profileImage: string;
  isVerified: boolean;
  birthDate: string;
  bio?: string;
  address?: string;
  followers?: ObjectId[];
  following?: ObjectId[];
};
