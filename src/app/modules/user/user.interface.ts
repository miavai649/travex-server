import { Types } from 'mongoose'

export type TUser = {
  name: string
  email: string
  password: string
  gender: 'male' | 'female' | 'others'
  profileImage: string
  bio: string
  birthDate: string
  mobileNumber: string
  address: string
  isVerified: boolean
  followers: Types.ObjectId[]
  following: Types.ObjectId[]
}
