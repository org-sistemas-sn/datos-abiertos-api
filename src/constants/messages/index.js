import config from "../../config/index.js";

const messages = {
  SERVER_RUNNING: `Server running on port: ${config.PORT}`,

  DB_SUCCESSFULLY_RUNNING: `Connected to '${config.DB_NAME}' database`,
  DB_ERROR_RUNNING: `Unabled to connect to the ${config.DB_NAME} database`,

  FTP_SERVER_CONNECTION_SUCCESSFULLY_CHECKED: `Connected to ${config.FTP_HOST} FTP server`,
  FTP_SERVER_ERROR_ON_CONNECTION_CHECK: `Unabled to connect to FTP server`,

  SERVER_STATUS: "Online",

  JWT_ERROR_ON_TOKEN_SIGNING: "Error on JWT sign",
  JWT_ERROR_ON_TOKEN_VERIFICATION: "Error on JWT verifying ",

  EMAIL_SERVER_RUNNING: `Connected to email server from '${config.EMAIL_SERVER_ADDRESS}' address`,
  EMAIL_SERVER_ERROR_RUNNING: `Unabled to connect to email server`,
};

export default messages;
