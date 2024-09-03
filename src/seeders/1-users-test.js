"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "Ana Silva",
          email: "ana.silva@example.com",
          username: "ana_silva",
          password: "AnaSilva123!",
          role: "operador",
        },
        {
          nome: "Pedro Oliveira",
          email: "pedro.oliveira@example.com",
          username: "pedro_oliveira",
          password: "Pedro1234@",
          role: "operador",
        },
        {
          nome: "Mariana Costa",
          email: "mariana.costa@example.com",
          username: "mariana_costa",
          password: "MarianaCosta567#",
          role: "operador",
        },
        {
          nome: "Lucas Santos",
          email: "lucas.santos@example.com",
          username: "lucas_santos",
          password: "Lucas123!@",
          role: "operador",
        },
        {
          nome: "Isabela Pereira",
          email: "isabela.pereira@example.com",
          username: "isabela_pereira",
          password: "Isabela5678#",
          role: "operador",
        },
        {
          nome: "Rafaela Ferreira",
          email: "rafaela.ferreira@example.com",
          username: "rafaela_ferreira",
          password: "RafaelaF123@",
          role: "monitor",
        },
        {
          nome: "Gabriel Lima",
          email: "gabriel.lima@example.com",
          username: "gabriel_lima",
          password: "GabrielLima456#",
          role: "operador",
        },
        {
          nome: "Juliana Barbosa",
          email: "juliana.barbosa@example.com",
          username: "juliana_barbosa",
          password: "Juliana123!@",
          role: "operador",
        },
        {
          nome: "Thiago Almeida",
          email: "thiago.almeida@example.com",
          username: "thiago_almeida",
          password: "Thiago5678#",
          role: "operador",
        },
        {
          nome: "Camila Rocha",
          email: "camila.rocha@example.com",
          username: "camila_rocha",
          password: "CamilaR123@",
          role: "monitor",
        },
        {
          nome: "Felipe Souza",
          email: "felipe.souza@example.com",
          username: "felipe_souza",
          password: "Felipe5678#",
          role: "operador",
        },
        {
          nome: "Amanda Costa",
          email: "amanda.costa@example.com",
          username: "amanda_costa",
          password: "Amanda123!@",
          role: "operador",
        },
        {
          nome: "Marcos Oliveira",
          email: "marcos.oliveira@example.com",
          username: "marcos_oliveira",
          password: "Marcos5678#",
          role: "operador",
        },
        {
          nome: "Carolina Santos",
          email: "carolina.santos@example.com",
          username: "carolina_santos",
          password: "Carolina123!@",
          role: "operador",
        },
        {
          nome: "Gustavo Silva",
          email: "gustavo.silva@example.com",
          username: "gustavo_silva",
          password: "Gustavo5678#",
          role: "operador",
        },
        {
          nome: "Fernanda Martins",
          email: "fernanda.martins@example.com",
          username: "fernanda_martins",
          password: "Fernanda123!@",
          role: "operador",
        },
        {
          nome: "Rodrigo Almeida",
          email: "rodrigo.almeida@example.com",
          username: "rodrigo_almeida",
          password: "Rodrigo5678#",
          role: "monitor",
        },
        {
          nome: "Patrícia Oliveira",
          email: "patricia.oliveira@example.com",
          username: "patricia_oliveira",
          password: "Patricia123!@",
          role: "operador",
        },
        {
          nome: "Luciana Costa",
          email: "luciana.costa@example.com",
          username: "luciana_costa",
          password: "Luciana5678#",
          role: "operador",
        },
        {
          nome: "Diego Santos",
          email: "diego.santos@example.com",
          username: "diego_santos",
          password: "Diego123!@",
          role: "operador",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {
      raw: true,
    });
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", {
      raw: true,
    });
  },
};
