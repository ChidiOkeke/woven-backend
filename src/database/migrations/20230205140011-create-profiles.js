"use strict";
/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
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
      profile_type: {
        allowNull: false,
        type: Sequelize.ENUM("client", "contractor"),
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(19, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Profiles");
  },
};
