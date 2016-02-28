'use strict';

var express = require('express');
var router = express.Router();

var TemperatureService = require('../lib/src/services/temperature.service.js');
var temperatureService = new TemperatureService();

var HeaterService = require('../lib/src/services/heater.service.js');
let heaterService = new HeaterService();

function isNight() {
  var Constants = require('../lib/src/utils/constants.service.js');
  const hourNow = new Date().getHours();
  return (hourNow >= Constants.nightHours || hourNow < Constants.dayHours);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { temperature: temperatureService.temperature, heaterOn: heaterService.isOn, isNight: isNight() });
});

module.exports = router;

var express = require('express');
var router = express.Router();
