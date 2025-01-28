import { messages } from "../../constants/index.js";
import config from "../../config/index.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: config.EMAIL_SERVER_HOST,
  port: config.EMAIL_SERVER_PORT,
  auth: {
    user: config.EMAIL_SERVER_USER,
    pass: config.EMAIL_SERVER_PASS,
  },
  tls: {
    secure: false,
    ignoreTLS: true,
    rejectUnauthorized: false,
  },
});

export const checkEmailServerConnection = async () => {
  try {
    await transporter.verify();
    console.log(messages.EMAIL_SERVER_RUNNING);
  } catch (error) {
    console.log(messages.EMAIL_SERVER_ERROR_RUNNING, error);
  }
};

export default transporter;
