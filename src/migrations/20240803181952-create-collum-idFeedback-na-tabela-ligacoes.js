"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ligacoes", "idFeedback", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "feedbacks",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ligacoes", "idFeedback", {});
  },
};
