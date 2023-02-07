"use strict";
/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Contracts", {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        unique: true,
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
    await queryInterface.dropTable("Contracts");
  },
};
