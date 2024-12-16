// const { Pool } = require("pg");
require("dotenv").config();
const { Sequelize } = require("sequelize");

// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRES_PORT,
// });

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  logging: false,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("unable to connect to the database: ", error);
  }
};

// pool
//   .connect()
//   .then(() => {
//     console.log("Connected to PostgreSQl database");
//   })
//   .catch((err) => {
//     console.error("Error connecting to database");
//   });

// module.exports = pool;

module.exports = { sq: sequelize, testDbConnection };
