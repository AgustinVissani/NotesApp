"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Notes", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
    await queryInterface.addConstraint("Notes", {
      fields: ["categoryId"],
      type: "foreign key",
      name: "fk_notes_category_id",
      references: {
        table: "Categories",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
    await queryInterface.changeColumn("Notes", "archived", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("Notes", "categoryId", {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    });
  },

  async down(queryInterface, Sequelize) {
  },
};
