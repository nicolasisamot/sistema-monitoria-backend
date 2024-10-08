require("dotenv").config();
const config = {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB,
  },
};

module.exports = config;
