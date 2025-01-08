const md5 = require("md5");

const { errorMessages } = require("../../_constants/errors");
const { getUser } = require("../../utils/auth");
const { createToken } = require("../../utils/jwt");

class authController {
  static async login(req, res) {
    try {
      const { name, password } = req.body;
      const user = await getUser(name, md5(password));

      if (!user?.length) {
        res.status(401).json({
          message: errorMessages.WRONG_CREDENTIALS,
        });
      } else {
        const token = createToken({ user });
        res.json({ token });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: errorMessages.UNEXPECTED });
    }
  }
}
module.exports = authController;
