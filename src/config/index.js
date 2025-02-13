import * as dotenv from "dotenv";
dotenv.config();

import corsOptions from "./cors/index.js";

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3306,

  CORS_OPTIONS: corsOptions,

  DB_HOST: process.env.DB_HOST || "",
  DB_NAME: process.env.DB_NAME || "",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",

  CHECK_FTP_SERVER_CONNECTION: false,
  FTP_HOST: process.env.FTP_HOST || "",
  FTP_USER: process.env.FTP_USER || "",
  FTP_PASSWORD: process.env.FTP_PASSWORD || "",

  SEQUELIZE_LOGGING: false,
  SEQUELIZE_RAW_QUERIES: true,

  BCRYPT_SALT_ROUNDS: +process.env.BCRYPT_SALT_ROUNDS || 10,

  MORGAN_LOGGING: true,
  MORGAN_FORMAT: "tiny",

  JWT_EXPIRES_IN: "16h",
  JWT_ALGORITHM: "RS256",

  CHECK_EMAIL_SERVER_CONNECTION: false,
  EMAIL_SERVER_PORT: +process.env.EMAIL_SERVER_PORT || "",
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST || "",
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER || "",
  EMAIL_SERVER_PASS: process.env.EMAIL_SERVER_PASS || "",
  EMAIL_SERVER_ADDRESS: process.env.EMAIL_SERVER_ADDRESS || "",
};

export default config;
