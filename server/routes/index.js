var express = require("express");
var sensorController = require("../controllers/sensorController");
var plantController = require("../controllers/plantController");
var measurementController = require("../controllers/measurementController");
var router = express.Router();

router.post("/sensors", sensorController.create);
router.delete("/sensors/:id", sensorController.delete);
router.get("/sensors", sensorController.index);
router.patch("/sensors/:id", sensorController.update);

router.post("/plants", plantController.create);
router.delete("/plants/:id", plantController.delete);
router.get("/plants", plantController.index);
router.patch("/plants/:id", plantController.update);

router.post("/measurements", measurementController.create);
router.delete("/measurements/:id", measurementController.delete);
router.get("/measurements", measurementController.index);

module.exports = router;
