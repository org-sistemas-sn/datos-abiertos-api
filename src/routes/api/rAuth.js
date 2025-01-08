const authRouter = require("express").Router();

const authController = require("../../controllers/cAuth");

authRouter.post("/login", authController.login);

module.exports = { authRouter };
