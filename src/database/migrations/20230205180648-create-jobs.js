"use strict";
/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
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
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contract_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      client_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      contractor_id: {
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
    await queryInterface.dropTable("Jobs");
  },
};
