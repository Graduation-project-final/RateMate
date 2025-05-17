require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: "Abd2001@",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
