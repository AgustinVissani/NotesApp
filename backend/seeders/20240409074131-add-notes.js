"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Notes", [
      {
        title: "Meeting",
        content: "Prepare presentation for Monday's meeting.",
        archived: false,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Chapter exam",
        content: "Review chapter 5 for the exam tomorrow.",
        archived: false,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Guitar",
        content: "Practice playing the guitar for at least 30 minutes.",
        archived: true,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Report",
        content: "Send the report to the manager.",
        archived: false,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Online course",
        content: "Complete the assignments for the online course.",
        archived: false,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sketch",
        content: "Draw a sketch of the landscape.",
        archived: false,
        categoryId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Team meeting",
        content: "Schedule a meeting with the team.",
        archived: false,
        categoryId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Math problems",
        content: "Practice solving math problems.",
        archived: false,
        categoryId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cooking",
        content: "Try a new recipe for dinner.",
        archived: false,
        categoryId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Organize folder structure",
        content: "Organize files and documents.",
        archived: false,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "textbook",
        content: "Read a chapter from the textbook.",
        archived: false,
        categoryId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Photos",
        content: "Take photos of nature in the park.",
        archived: true,
        categoryId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Notes", null, {});
  },
};
