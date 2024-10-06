import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";

const createUserIntoDb = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const updateUserIntoDb = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getCurrentUser = async (userEmail: string, userRole: string) => {
  const result = await User.findOne({ email: userEmail, role: userRole });
  return result;
};

const toggleFollowUser = async (userEmail: string, followingId: string) => {
  // checking if the user is exist in the database
  const follower = await User.isUserExistsByEmail(userEmail);
  const following = await User.findById(followingId);

  if (!following || !follower) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  if (following?.status === "BLOCKED" || follower?.status === "BLOCKED") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked!");
  }

  const isFollowing = following?.followers?.includes(
    new mongoose.Types.ObjectId(follower?._id),
  );

  if (isFollowing) {
    // unFollow the user
    await User.findByIdAndUpdate(
      follower?._id,
      { $pull: { following: following?._id } },
      { new: true },
    );
    await User.findByIdAndUpdate(
      following?._id,
      { $pull: { followers: follower?._id } },
      { new: true },
    );

    return null;
  } else {
    // follow the user
    await User.findByIdAndUpdate(
      follower?._id,
      { $addToSet: { following: following?._id } },
      { new: true },
    );
    await User.findByIdAndUpdate(
      following?._id,
      { $addToSet: { followers: follower?._id } },
      { new: true },
    );

    return null;
  }
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getCurrentUser,
  updateUserIntoDb,
  toggleFollowUser,
};
