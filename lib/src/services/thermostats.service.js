'use strict';

var Constants = require('../utils/constants.service.js');
var HeaterService = require('./heater.service.js');
var LoggerService = require('./logger.service.js');
var TemperatureService = require('./temperature.service.js');

let heaterService = new HeaterService();
let temperatureService = new TemperatureService();
let monitorService = new LoggerService();

class ThermostatsService {
  constructor() {
    this.temperatureN = temperatureService.temperature;
  }

  getGoal() {
    const hourNow = new Date().getHours();
    if (hourNow >= Constants.nightHours || hourNow < Constants.dayHours) {
      return Constants.temperatureExpectedByNight;
    }
    else {
      return Constants.temperatureExpectedByDay;
    }
  }

  regulate(temperatureN, temperatureNMinus1) {
    const goal = this.getGoal();
    const celerity = temperatureN - temperatureNMinus1;
    const toGoal = goal - temperatureN;
    const inertie = Constants.inertie;

    let action;
    if (toGoal < 0) {
      action = doNotHeat();
    }
    else {
      if (celerity >= inertie * toGoal) {
        action = doNotHeat();
      }
      else {
        action = heat();
      }
    }

    LoggerService.log(goal, temperatureN, action);

    function doNotHeat() {
      heaterService.stop();
      return false;
    }

    function heat() {
      heaterService.start();
      return true;
    }
  }

  regulationRoutine() {
    this.temperatureNMinus1 = this.temperatureN;
    this.temperatureN = temperatureService.temperature;
    this.regulate(this.temperatureN, this.temperatureNMinus1);
  }
}

module.exports = ThermostatsService;
