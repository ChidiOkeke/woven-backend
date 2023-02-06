/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
  },
};

export default dbConfig;
