const { errorMessages } = require("../_constants/errors");
const { decodeToken } = require("../utils/jwt");

const isAuthorizedUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const JWT = decodeToken(authorization);

    if (!JWT)
      return res.status(401).json({
        message: errorMessages.WRONG_CREDENTIALS,
      });

    req.decoded = JWT;
    return next();
  } catch (e) {
    if (e.name === "TokenExpiredError")
      return res.status(400).json({ message: errorMessages.TOKEN_EXPIRED });

    console.log("Token error", e);
    return res.status(500).json({ message: errorMessages.UNEXPECTED });
  }
};

module.exports = { isAuthorizedUser };
