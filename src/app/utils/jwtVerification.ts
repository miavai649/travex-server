import jwt, { JwtPayload } from "jsonwebtoken";
import { IJwtPayload } from "../interfaces";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
