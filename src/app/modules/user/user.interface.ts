import { Model, ObjectId } from "mongoose";
import { GENDER, USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  gender: keyof typeof GENDER;
  role: keyof typeof USER_ROLE;
  profileImage: string;
  passwordChangedAt?: Date;
  isVerified: boolean;
  birthDate: string;
  bio?: string;
  address?: string;
  followers?: ObjectId[];
  following?: ObjectId[];
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
