import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
const router = express.Router()

router.post(
  '/register-user',
  validateRequest(AuthValidation.userRegisterValidationSchema),
  AuthControllers.registerUser
)
router.post(
  '/login',
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthControllers.loginUser
)
router.post(
  '/change-password',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
)
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
)

export const AuthRoutes = router
