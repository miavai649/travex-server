import { ObjectId } from "mongoose";
import { GENDER } from "../modules/user/user.constant";

export interface IJwtPayload {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  gender: keyof typeof GENDER;
  role: string;
  birthDate: string;
}
