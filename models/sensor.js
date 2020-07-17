'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sensor.init({
    label: DataTypes.STRING,
    airValue: DataTypes.INTEGER,
    waterValue: DataTypes.INTEGER,
    version: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};