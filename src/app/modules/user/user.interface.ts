import { ObjectId } from "mongoose";
import { GENDER } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  gender: keyof typeof GENDER;
  profileImage: string;
  bio: string;
  birthDate: string;
  mobileNumber: string;
  address: string;
  isVerified: boolean;
  followers: ObjectId[];
  following: ObjectId[];
};
