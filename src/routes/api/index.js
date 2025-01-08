const apiRouter = require("express").Router();
const cors = require("cors");

const { corsOptions } = require("../../../config/cors/corsOptions");
const { isAuthorizedUser } = require("../../../middlewares/isAuthorizedUser");
const { authRouter } = require("./rAuth");

apiRouter.use("/auth", cors(corsOptions.auth), authRouter);

//example of protected route with cors and token
apiRouter.use("/protected", cors(corsOptions.example1), isAuthorizedUser, authRouter);

module.exports = { apiRouter };
