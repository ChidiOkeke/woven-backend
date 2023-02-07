import { Sequelize } from "sequelize";
import sequelize from "../services/sequelize.js";

const Contract = sequelize.define("Contract", {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID,
  },
  status: {
    allowNull: false,
    type: Sequelize.ENUM("new", "in_progress", "terminated"),
    defaultValue: "new",
  },
  client_id: {
    allowNull: false,
    type: Sequelize.UUID,
  },
  contractor_id: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

export default Contract;
