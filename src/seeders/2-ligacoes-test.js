"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ligacoes",
      [
        {
          data: new Date("2024-07-01T12:34:56Z"),
          idOperador: 2,
        },
        {
          data: new Date("2024-07-02T14:22:18Z"),
          idOperador: 2,
        },
        {
          data: new Date("2024-07-03T16:45:30Z"),
          idOperador: 4,
        },
        {
          data: new Date("2024-07-04T09:10:45Z"),
          idOperador: 4,
        },
        {
          data: new Date("2024-07-05T11:25:00Z"),
          idOperador: 14,
        },
        {
          data: new Date("2024-07-06T13:35:12Z"),
          idOperador: 14,
        },
        {
          data: new Date("2024-07-07T15:45:30Z"),
          idOperador: 18,
        },
        {
          data: new Date("2024-07-08T17:55:45Z"),
          idOperador: 18,
        },
        {
          data: new Date("2024-07-09T18:22:30Z"),
          idOperador: 18,
        },
        {
          data: new Date("2024-07-10T20:15:00Z"),
          idOperador: 20,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
      raw: true,
    });
    await queryInterface.bulkDelete("ligacoes", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {
      raw: true,
    });
  },
};
