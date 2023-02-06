import { Sequelize } from "sequelize";
import sequelize from "../services/sequelize.js";

const Profile = sequelize.define("Profile", {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  profile_type: {
    allowNull: false,
    type: Sequelize.ENUM("client", "contractor"),
  },
  balance: {
    allowNull: false,
    type: Sequelize.DECIMAL(19, 2),
  },
});

export default Profile;
