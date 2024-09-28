import { catchAsync } from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.service";

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.userRegisterIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: user,
  });
});

export const UserControllers = {
  userRegister,
};
