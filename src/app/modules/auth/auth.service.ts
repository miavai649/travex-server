import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser, TRegisterUser } from './auth.interface'
import { USER_ROLE } from '../user/user.constant'
import { createToken } from '../../utils/jwtVerification'
import config from '../../config'
import { JwtPayload } from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '../../utils/sendEmail'

const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email)

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is already exist!')
  }

  payload.role = USER_ROLE.USER

  //create new user
  const newUser = await User.create(payload)

  // jwt payload for create access and refresh token
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    mobileNumber: newUser.mobileNumber,
    gender: newUser.gender,
    role: newUser.role,
    birthDate: newUser.birthDate,
    status: newUser.status
  }

  // create access token and send it to the client
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string
  )

  // create refresh token and send it to the client
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken
  }
}

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist in our data base
  const user = await User.isUserExistsByEmail(payload?.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!')
  }

  // checking if the user is blocked by the admin

  const userStatus = user?.status

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  // jwt payload for create access and refresh token
  const jwtPayload = {
    _id: user._id!,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    gender: user.gender,
    role: user.role,
    birthDate: user.birthDate,
    status: user.status
  }

  // create access token and send it to the client
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires_in as string
  )

  // create refresh token and send it to the client
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist in the database
  const user = await User.isUserExistsByEmail(userData.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!')
  }

  // checking if the user is blocked by the admin
  const userStatus = user?.status

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  //checking if the given password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  )

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date()
    }
  )

  return null
}

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email: email })

  // check if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // checking if the user is blocked by the admin
  const userStatus = user?.status

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  const jwtPayload = {
    _id: user._id!,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    gender: user.gender,
    role: user.role,
    birthDate: user.birthDate,
    status: user.status
  }

  const resetToken = createToken(
    jwtPayload,
    config.access_secret as string,
    '10m'
  )

  const resetUILink = `${config.reset_pass_ui_link}?id=${user?._id}&token=${resetToken}`

  const emailHTML = `<div style="text-align: center; padding: 20px;">
      <h2>Password Reset</h2>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUILink}" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease, transform 0.3s ease;" onmousedown="this.style.backgroundColor='#0056b3'; this.style.transform='scale(0.95)';" onmouseup="this.style.backgroundColor='#007bff'; this.style.transform='scale(1)';" onmouseout="this.style.backgroundColor='#007bff'; this.style.transform='scale(1)';">
        Reset Password
      </a>
      <p>This link will expire in 10 minutes.</p>
    </div>`

  sendEmail(user?.email as string, emailHTML)
}
export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  forgetPassword
}
