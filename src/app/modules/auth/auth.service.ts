import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser, TRegisterUser } from "./auth.interface";
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
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    mobileNumber: newUser.mobileNumber,
    gender: newUser.gender,
    role: newUser.role,
    birthDate: newUser.birthDate,
    status: newUser.status,
  };

  // create access token and send it to the client
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string,
  );

  // create refresh token and send it to the client
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

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist in our data base
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // checking if the user is blocked by the admin

  const userStatus = user?.status;

  if (userStatus === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  // jwt payload for create access and refresh token
  const jwtPayload = {
    _id: user._id!,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    gender: user.gender,
    role: user.role,
    birthDate: user.birthDate,
    status: user.status,
  };

  // create access token and send it to the client
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string,
  );

  // create refresh token and send it to the client
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
  loginUser,
};
