'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sensors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      name: {
        type: Sequelize.STRING
      },
      conditions: {
        type: Sequelize.STRING
      },
      lastMoistureValue: {
        type: Sequelize.INTEGER
      },
      lastMoisturePercentage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Plants');
  }
};