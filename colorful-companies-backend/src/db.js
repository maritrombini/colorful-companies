import Sequelize from "sequelize";
import dotenv from "dotenv/config.js";

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "postgres",
  host: dbHost,
});

export default sequelize;