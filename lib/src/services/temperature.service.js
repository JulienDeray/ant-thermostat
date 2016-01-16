'use strict';

var MathUtilsService = require('../utils/mathUtils.service.js');

class TemperatureService {
  constructor(temperature) {
    this.temperature = temperature;
  }

  getTemperature() {
    let range = {
      min: this.temperature - 0.5,
      max : this.temperature + 0.5
    };

    this.temperature = MathUtilsService.round2decimals(MathUtilsService.getRandomBetween(range.min, range.max));

    return this.temperature;
  }
}

module.exports = TemperatureService;
