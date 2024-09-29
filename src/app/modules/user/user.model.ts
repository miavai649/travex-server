import { Schema, model, Types } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import { GENDER, USER_ROLE } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.keys(GENDER),
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.USER,
    },
    profileImage: {
      type: String,
      default: "https://i.ibb.co.com/vkVW6s0/download.png",
    },
    bio: {
      type: String,
      default: null,
    },
    birthDate: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

// hashing password before it save to our database
userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// after saving the user in the response we are sending empty string in the password field
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// checking if the user is already exist in the data base
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

// checking if the given password is matched with the correct password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

// checking if the jwt token issued time if before the password changed time
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>("User", userSchema);
