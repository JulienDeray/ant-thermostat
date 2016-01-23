'use strict';

var Constants = require('../utils/constants.service.js');
var HeaterService = require('./heater.service.js');

const heaterService = new HeaterService();

class ThermostatsService {
  regulate(temperature) {
    const goal = Constants.temperatureExpected();
    if ( temperature > goal ) {
      heaterService.stop();
    }
    else {
      heaterService.start();
    }
  }
}

module.exports = ThermostatsService;
