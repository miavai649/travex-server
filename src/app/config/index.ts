import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  access_secret: process.env.ACCESS_TOKEN,
  access_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_secret: process.env.REFRESH_TOKEN,
  refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
