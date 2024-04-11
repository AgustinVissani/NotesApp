"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "None",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Work",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Study",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hobby",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
