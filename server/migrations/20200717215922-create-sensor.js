"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sensors", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plantID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Plants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        unique: true,
        allowNull: true,
      },
      label: {
        type: Sequelize.STRING,
        unique: true,
      },
      airValue: {
        type: Sequelize.INTEGER,
      },
      waterValue: {
        type: Sequelize.INTEGER,
      },
      version: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sensors");
  },
};
