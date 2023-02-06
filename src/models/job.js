import { Sequelize } from "sequelize";
import sequelize from "../services/sequelize.js";
import Contract from "./contract.js";

const Job = sequelize.define("Job", {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID,
    unique: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  
  contract_id: {
    allowNull: false,
    type: Sequelize.UUID,
  },
  status: {
    allowNull: false,
    type: Sequelize.ENUM("paid", "unpaid"),
  },
  amount: {
    allowNull: false,
    type: Sequelize.DECIMAL(19, 2),
  },
});

export default Job;
