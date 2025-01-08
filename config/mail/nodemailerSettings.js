require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SENDER_HOST,
  port: +process.env.MAIL_SENDER_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_SENDER_USER,
    pass: process.env.MAIL_SENDER_PASS,
  },
  tls: {
    secure: false,
    ignoreTLS: true,
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method",
  },
});

transporter
  .verify()
  .then(() => {
    console.log("ready to send emails");
  })
  .catch(console.log);

module.exports = transporter;
