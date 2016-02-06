'use strict';

var Constants = require('../utils/constants.service.js');
var HeaterService = require('./heater.service.js');
var MonitorService = require('./monitor.service.js');
var TemperatureService = require('./temperature.service.js');

let heaterService = new HeaterService();
let temperatureService = new TemperatureService();
let monitorService = new MonitorService();

class ThermostatsService {
  regulate(temperatureN, temperatureNMinus1) {
    const goal = Constants.temperatureExpected;
    const celerity = temperatureNMinus1 - temperatureN;
    const toGoal = goal - temperatureN;
    const inertie = Constants.inertie;

    if (toGoal < 0) {
      stopHeater();
    }
    else {
      if (celerity >= inertie * toGoal) {
        stopHeater();
      }
      else {
        startHeater();
      }
    }

    function stopHeater() {
      if (heaterService.isOn) {
        heaterService.stop();
      }
    }

    function startHeater() {
      if (!heaterService.isOn) {
        heaterService.start();
      }
    }
  }

  regulationRoutine(temparatureN, temperatureNMinus1) {
    if (temparatureN) {
      temperatureNMinus1 = temparatureN;
      temparatureN = temperatureService.temperature;
      monitorService.recordTemperature(temparatureN);
      this.regulate(temparatureN, temperatureNMinus1);
    }
    else {
      temparatureN = temperatureService.temperature;
    }
  }
}

module.exports = ThermostatsService;
