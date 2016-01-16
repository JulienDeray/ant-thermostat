'use strict';

var express = require('express');
var router = express.Router();

var TemperatureService = require('../lib/src/services/temperature.service.js');
var temperatureService = new TemperatureService(27);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { temperature: temperatureService.getTemperature() });
});

module.exports = router;

var express = require('express');
var router = express.Router();
