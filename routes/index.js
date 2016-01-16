'use strict';

var express = require('express');
var router = express.Router();

var TemperatureService = require('../lib/src/services/temperature.service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { temperature: TemperatureService.getTemperature() });
});

module.exports = router;

var express = require('express');
var router = express.Router();
