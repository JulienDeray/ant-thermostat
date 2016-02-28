'use strict';

var Constants = require('../utils/constants.service.js');
var HeaterService = require('./heater.service.js');
var MonitorService = require('./monitor.service.js');
var TemperatureService = require('./temperature.service.js');

let heaterService = new HeaterService();
let temperatureService = new TemperatureService();
let monitorService = new MonitorService();

class ThermostatsService {
  constructor() {
    this.temperatureN = temperatureService.temperature;
  }

  getGoal() {
    const hourNow = new Date().getHours();
    if (hourNow >= Constants.nightHours && hourNow < Constants.dayHours) {
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

    if (toGoal < 0) {
      doNotHeat();
    }
    else {
      if (celerity >= inertie * toGoal) {
        doNotHeat();
      }
      else {
        heat();
      }
    }

    function doNotHeat() {
      heaterService.stop();
    }

    function heat() {
      heaterService.start();
    }
  }

  regulationRoutine() {
    this.temperatureNMinus1 = this.temperatureN;
    this.temperatureN = temperatureService.temperature;
    monitorService.recordTemperature(this.temperatureN);
    this.regulate(this.temperatureN, this.temperatureNMinus1);
  }
}

module.exports = ThermostatsService;
