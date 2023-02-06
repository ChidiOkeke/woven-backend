"use strict";
/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("Contracts", {
      type: "FOREIGN KEY",
      fields: ["client_id"],
      name: "fk_client_id",
      references: {
        table: "profiles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    await queryInterface.addConstraint("Contracts", {
      type: "FOREIGN KEY",
      fields: ["contractor_id"],
      name: "fk_contractor_id",
      references: {
        table: "profiles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("Contracts", "fk_client_id");
    await queryInterface.removeConstraint("Contracts", "fk_contractor_id");
  },
};
