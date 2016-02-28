'use strict';

var express = require('express');
var router = express.Router();

var TemperatureService = require('../lib/src/services/temperature.service.js');
var temperatureService = new TemperatureService();

var HeaterService = require('../lib/src/services/heater.service.js');
let heaterService = new HeaterService();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { temperature: temperatureService.temperature, heaterOn: heaterService.isOn });
});

module.exports = router;

var express = require('express');
var router = express.Router();
