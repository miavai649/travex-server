import { Schema, model, Types } from "mongoose";
import { TUser } from "./user.interface";
import { GENDER } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUser>(
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
    profileImage: {
      type: String,
      default: "https://i.ibb.co.com/vkVW6s0/download.png",
    },
    bio: {
      type: String,
    },
    birthDate: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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

export const User = model<TUser>("User", userSchema);
