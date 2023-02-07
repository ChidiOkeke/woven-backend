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

    await queryInterface.addConstraint("Jobs", {
      type: "FOREIGN KEY",
      fields: ["client_id"],
      name: "fk_Job_client_id",
      references: {
        table: "profiles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    await queryInterface.addConstraint("Jobs", {
      type: "FOREIGN KEY",
      fields: ["contractor_id"],
      name: "fk_job_contractor_id",
      references: {
        table: "profiles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("Jobs", "fk_contract_id");
    await queryInterface.removeConstraint("Jobs", "fk_job_client_id");
    await queryInterface.removeConstraint("Jobs", "fk_job_contractor_id");
  },
};
