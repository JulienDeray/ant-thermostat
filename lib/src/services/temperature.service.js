'use strict';

var MathUtilsService = require('../utils/mathUtils.service.js');

class TemperatureService {
  static getTemperature() {
    return MathUtilsService.round2decimals(MathUtilsService.getRandomBetween(0, 40));
  }
}

module.exports = TemperatureService;
