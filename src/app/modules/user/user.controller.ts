import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const user = await UserServices.createUserIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users Retrieved Successfully",
    data: users,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.updateUserIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update user successfully!",
    data: result,
  });
});

const getCurrentUser = catchAsync(async (req, res) => {
  const { email, role } = req.user;

  const result = await UserServices.getCurrentUser(email, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Current user retrieved successfully!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
};
