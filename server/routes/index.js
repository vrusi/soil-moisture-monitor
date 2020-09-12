var express = require("express");
var sensorController = require("../controllers/sensorController");
var plantController = require("../controllers/plantController");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Plants" });
});

router.post("/sensors", sensorController.create);
router.delete("/sensors/:id", sensorController.delete);
router.get("/sensors", sensorController.index);

router.patch("/sensors/:id", sensorController.update);

router.post("/plants", plantController.create);
router.delete("/plants/:id", plantController.delete);
router.get("/plants", plantController.index);

router.patch("/plants/:id", plantController.update);

router.post("/measurements", (req, res, next) => {
  console.log("HERE");
  console.log("Here", req);
  res.render("");
});

module.exports = router;
