var Measurement = require("../models").Measurement;
var Plant = require("../models").Plant;
var Sensor = require("../models").Sensor;

Measurement.Plant = Measurement.belongsTo(Plant, { foreignKey: "plantID" });
Measurement.Sensor = Measurement.belongsTo(Sensor, { foreignKey: "sensorID" });

exports.create = async function (req, res) {
  try {
    const measurement = await Measurement.create({
      plantID: req.body.plantID,
      sensorID: req.body.sensorID,
      moistureValue: req.body.moistureValue,
      moisturePercentage: req.body.moisturePercentage,
    });
    res.status(201).send(measurement);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.delete = function (req, res) {
  return Measurement.findByPk(req.params.id)
    .then((measurement) => {
      if (!measurement) return res.status(204).send();

      return measurement
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch(() => res.status(204).send());
};

exports.index = function (req, res) {
  return Measurement.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((measurement) => res.status(200).send(measurement))
    .catch((error) => res.status(400).send(error));
};
