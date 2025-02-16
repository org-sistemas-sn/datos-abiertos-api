const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./keys/private.pem");
const publicKey = fs.readFileSync("./keys/public.pem");

const signOptions = { expiresIn: "16h", algorithm: "RS256" };

const createToken = payload => jwt.sign(payload, privateKey, signOptions);

const decodeToken = token => {
  const [, JWT] = token.split(" ");
  return jwt.verify(JWT, publicKey);
};

module.exports = { createToken, decodeToken };
