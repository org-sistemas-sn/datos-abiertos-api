import { messages } from "../constants/index.js";
import config from "../config/index.js";
import { Sequelize } from "sequelize";

const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DIALECT,
  SEQUELIZE_LOGGING,
  SEQUELIZE_RAW_QUERIES,
} = config;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: SEQUELIZE_LOGGING,
  port: 5000
});

export const syncDb = async () => {
  try {
    await sequelize.sync({
      alter: false
    });
    console.log(messages.DB_SUCCESSFULLY_RUNNING);
  } catch (error) {
    console.log(messages.DB_ERROR_RUNNING, error);
  }
};

export default sequelize;
