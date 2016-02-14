'use strict';

var MathUtilsService = require('../utils/mathUtils.service.js');
var ds18b20 = require('ds18b20');
var Constants = require('../utils/constants.service.js');

class TemperatureService {
  constructor() {
  }

  get temperature() {
    return ds18b20.temperatureSync(Constants.sensorId);
  }
}

module.exports = TemperatureService;
