"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Contacts", [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone_number: "123-456-7890",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Contacts", {
      email: "john.doe@example.com",
    });
  },
};
