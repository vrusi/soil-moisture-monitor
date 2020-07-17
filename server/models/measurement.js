'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Measurement.init({
    sensorID: DataTypes.INTEGER,
    plantID: DataTypes.INTEGER,
    moistureValue: DataTypes.INTEGER,
    moisturePercentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Measurement',
  });
  return Measurement;
};