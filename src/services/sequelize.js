import { Sequelize } from "sequelize";
import dbConfig from "../config/database.js";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

export default sequelize;
