var Sensor = require("../models").Sensor;

exports.create = function (req, res) {
  return Sensor.create(
    {
      label: req.body.label,
      airValue: req.body.airValue,
      waterValue: req.body.waterValue,
      version: req.body.version,
    }
  )
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
    .catch((error) => {res.status(400).send(error);console.log(error);});
};
