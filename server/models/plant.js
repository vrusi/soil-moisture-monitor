"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plant.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2048),
      lastMoistureValue: DataTypes.INTEGER,
      lastMoisturePercentage: DataTypes.INTEGER,
      recommendedMoisturePercentage: DataTypes.INTEGER,
      imagePath: DataTypes.STRING(2048),
    },
    {
      sequelize,
      modelName: "Plant",
    }
  );
  return Plant;
};
