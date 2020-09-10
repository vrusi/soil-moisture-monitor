var Plant = require("../models").Plant;
var Sensor = require("../models").Sensor;

Plant.Sensor = Plant.hasOne(Sensor, { foreignKey: "plantID" });

exports.create = async function (req, res) {
  try {
    const plant = await Plant.create({
      name: req.body.name,
      description: req.body.description,
      recommendedMoisturePercentage: req.body.recommendedMoisturePercentage,
      imagePath: req.body.imagePath,
    });

    const sensor = await Sensor.findByPk(req.body.sensorID);

    plant.setSensor(sensor);
    res.status(201).send(plant);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.delete = function (req, res) {
  return Plant.findByPk(req.params.id)
    .then((plant) => {
      if (!plant) return res.status(204).send();

      return plant
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch(() => res.status(204).send());
};

exports.index = function (req, res) {
  return Plant.findAll({
    order: [["name", "ASC"]],
  })
    .then((plant) => res.status(200).send(plant))
    .catch((error) => res.status(400).send(error));
};

exports.update = async function (req, res) {
  try {
    let plant = await Plant.findByPk(req.params.id);

    if (req.body.newName) plant.name = req.body.newName;

    if (req.body.newDescription) plant.description = req.body.newDescription;

    if (req.body.newRecommendedMoisturePercentage)
      plant.recommendedMoisturePercentage =
        req.body.newRecommendedMoisturePercentage;

    if (req.body.newImagePath) plant.imagePath = req.body.newImagePath;

    if (req.body.newSensorID) {
      plant.setSensor(null);
      let newSensor = await Sensor.findByPk(req.body.newSensorID);
      plant.setSensor(newSensor);
    }

    await plant.save();
    res.status(200).send(plant);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
