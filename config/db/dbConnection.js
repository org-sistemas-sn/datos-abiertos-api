const knexClient = require("knex");

const dbCredentials = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME, // era DB_USER
  password: process.env.DB_PASSWORD, // era DB_PASS
};

const authDB = knexClient({
  client: "pg", // CAMBIADO de mysql2 a pg
  connection: {
    ...dbCredentials,
    database: process.env.DB_NAME, // DB_AUTH no está definido en .env
  },
});

module.exports.dbConnections = {
  authDB,
};
