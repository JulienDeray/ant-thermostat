'use strict';

var express = require('express');
var router = express.Router();

var TemperatureService = require('../lib/src/services/temperature.service.js');
var temperatureService = new TemperatureService();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { temperature: temperatureService.temperature });
});

module.exports = router;

var express = require('express');
var router = express.Router();
