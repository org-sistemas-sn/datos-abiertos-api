import { messages } from "../../constants/index.js";
import config from "../../config/index.js";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey"; 
const privateKey = await fs.readFile("./src/keys/private.pem", "utf-8");
const publicKey = await fs.readFile("./src/keys/public.pem", "utf-8");

export const signJWT = (payload) => {
  try {
    const token = jwt.sign(payload, privateKey, {
      expiresIn: config.JWT_EXPIRES_IN,
      algorithm: config.JWT_ALGORITHM,
    });
    return token;
  } catch (error) {
    console.log(messages.JWT_ERROR_ON_TOKEN_SIGNING, error);
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
      return res.status(403).json({ message: 'No se proporcionó un token.' });
  }

  try {
      const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Token no válido.' });
  }
};
