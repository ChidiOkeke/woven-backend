"use strict";
/* eslint-disable no-undef */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("Jobs", {
      type: "FOREIGN KEY",
      fields: ["contract_id"],
      name: "fk_contract_id",
      references: {
        table: "contracts",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("Jobs", "fk_contract_id");
  },
};
