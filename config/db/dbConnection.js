const knexClient = require("knex");

const dbCredentials = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const authDB = knexClient.knex({
  client: "mysql2",
  connection: {
    ...dbCredentials,
    database: process.env.DB_AUTH,
  },
});

const example1DB = knexClient.knex({
  client: "mysql2",
  connection: {
    ...dbCredentials,
    database: process.env.DB_EXAMPLE,
  },
});

module.exports.dbConnections = {
  authDB,
  example1DB,
};
