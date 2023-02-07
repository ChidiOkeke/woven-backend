/* eslint-disable no-undef */
import bodyParser from "body-parser";
import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv";
import sequelize from "./services/sequelize.js";

dotenv.config();

try {
  const server = express();
  server.use(bodyParser.json());
  server.use(router);
  
  const port = process.env.SERVER_PORT || 3000;

  server.listen(port);
  console.log(`[EXPRESS] Express server running on port ${port}`);
} catch (error) {
  console.log("[EXPRESS] Error during express service initialization");
  throw error;
}
