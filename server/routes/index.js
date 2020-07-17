var express = require('express');
var sensorsController = require('../controllers/sensorController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plants' });
});

router.post('/sensors', sensorsController.create);
router.delete('/sensors/:id', sensorsController.delete);
router.get('/sensors', sensorsController.index);

module.exports = router;
