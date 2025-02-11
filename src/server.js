import config from "./config/index.js";
import express from "express";
import router from "./routes/index.js";
import { syncDb } from "./db/index.js";
import cors from "cors";
import morgan from "morgan";
import { messages } from "./constants/index.js";
import { setRequestOrigin } from "./middlewares/index.js";
import { checkFtpServerConnection } from "./utils/ftp/index.js";
import { checkEmailServerConnection } from "./utils/nodemailer/index.js";

syncDb();

if (config.CHECK_FTP_SERVER_CONNECTION) {
  checkFtpServerConnection();
}

if (config.CHECK_EMAIL_SERVER_CONNECTION) {
  checkEmailServerConnection();
}

const app = express();

app.use(setRequestOrigin);
app.use("*", cors(config.CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (config.MORGAN_LOGGING) {
  app.use(morgan(config.MORGAN_FORMAT));
}

app.use("/api", router);

app.listen(config.PORT, () => console.log(messages.SERVER_RUNNING));
