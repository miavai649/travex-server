import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { User } from "../user/user.model";
import { TRegisterUser } from "./auth.interface";
import { USER_ROLE } from "../user/user.constant";
import { createToken } from "../../utils/jwtVerification";
import config from "../../config";

const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already exist!");
  }

  payload.role = USER_ROLE.USER;

  //create new user
  const newUser = await User.create(payload);

  // jwt payload for create access and refresh token
  const jwtPayload = {
    _id: newUser._id.toString(),
    name: newUser.name,
    email: newUser.email,
    mobileNumber: newUser.mobileNumber,
    gender: newUser.gender,
    role: newUser.role,
    birthDate: newUser.birthDate,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUser,
};
