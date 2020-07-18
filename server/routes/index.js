var express = require('express');
var sensorsController = require('../controllers/sensorController');
var plantsController = require('../controllers/plantController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plants' });
});

router.post('/sensors', sensorsController.create);
router.delete('/sensors/:id', sensorsController.delete);
router.get('/sensors', sensorsController.index);

router.post('/plants', plantsController.create);
router.delete('/plants/:id', plantsController.delete);
router.get('/plants', plantsController.index);

module.exports = router;
