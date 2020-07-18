var Plant = require('..models').Plant;

exports.create = function (req, res) {
    return Plant
        .create({
            sensorID: req.body.sensorID,
            name: req.body.name,
            conditions: req.body.conditions,
            lastMoistureValue: req.body.lastMoistureValue,
            lastMoisturePercentage: req.body.lastMoisturePercentage
        })
        .then((plant) => res.status(201).sent(plant))
        .catch((error) => res.status(400).send(error));
}

exports.delete = function (req, res) {
    return Plant
        .findByPk(req.params.id)
        .then(plant => {
            if (!plant)
                return res.status(204).send();
            
            return plant
                .destroy()
                .then(() => res.status(204).send())
                .catch((error) => res.status(400).send(error));
        })
        .catch(() => res.status(204).send());
}

exports.index = function (req, res) {
    return Plant
        .findAll({
            order:
            [['name', 'ASC']]
        })
        .then((plant) => res.status(200).send(plant))
        .catch((error) => res.status(400).send(error));
}