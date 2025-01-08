const { dbConnections } = require("../config/db/dbConnection");
const { errorMessages } = require("../_constants/errors");

module.exports.getUser = async (name, password) => {
  const userCredentials = {
    name,
    password,
  };

  try {
    const user = await dbConnections
      .authDB(process.env.T_AUTH)
      .select("user", "mail", "role") //fields as an example
      .where(userCredentials);

    return user;
  } catch (error) {
    throw new Error(errorMessages.DB_SEARCH, error);
  }
};
