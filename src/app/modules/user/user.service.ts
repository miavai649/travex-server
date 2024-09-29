import { QueryBuilder } from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";

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

const getCurrentUser = async (userEmail: string, userRole: string) => {
  const result = await User.findOne({ email: userEmail, role: userRole });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getCurrentUser,
};
