var Sensor = require("../models").Sensor;

exports.create = function (req, res) {
  return Sensor.create({
    label: req.body.label,
    plantID: req.body.plantID,
    airValue: req.body.airValue,
    waterValue: req.body.waterValue,
    version: req.body.version,
    notes: req.body.notes,
  })
    .then((sensor) => res.status(201).send(sensor))
    .catch((error) => res.status(400).send(error));
};

exports.delete = function (req, res) {
  return Sensor.findByPk(req.params.id)
    .then((sensor) => {
      if (!sensor) return res.status(204).send();

      return sensor
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch(() => res.status(204).send());
};

exports.index = function (req, res) {
  return Sensor.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((sensor) => res.status(200).send(sensor))
    .catch((error) => {
      res.status(400).send(error);
      console.log(error);
    });
};

exports.update = async function (req, res) {
  try {
    if (req.body.plantID) {
      await Sensor.update(
        { plantID: null },
        { where: { plantID: req.body.plantID }, returning: true }
      );
    }

    const response = await Sensor.update(req.body, {
      where: { id: req.body.id },
      returning: true,
    });

    const updatedSensor = response[1][0];

    res.status(200).send(updatedSensor);
    console.log(response);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
