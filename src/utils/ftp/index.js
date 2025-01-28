import { messages } from "../../constants/index.js";
import config from "../../config/index.js";
import * as ftp from "basic-ftp";

export const checkFtpServerConnection = async () => {
  const client = new ftp.Client();
  try {
    await client.access({
      host: config.FTP_HOST,
      user: config.FTP_USER,
      password: config.FTP_PASSWORD,
    });
    console.log(messages.FTP_SERVER_CONNECTION_SUCCESSFULLY_CHECKED);
  } catch (error) {
    console.log(messages.FTP_SERVER_ERROR_ON_CONNECTION_CHECK, error);
  }
  client.close();
};
