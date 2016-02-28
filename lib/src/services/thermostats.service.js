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

    const date = new Date();
    console.log('==', date, '==');
    console.log('Mode :', date.getHours() >= Constants.nightHours || date.getHours() < Constants.dayHours ? 'Night' : 'Day');
    console.log('Goal :', goal, '°C');
    console.log('Temperature :', temperatureN, '°C');

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
      console.log('Action : Stop');
      heaterService.stop();
      console.log('Heater State :', heaterService.isOn);
    }

    function heat() {
      console.log('Action : Start');
      heaterService.start();
      console.log('Heater State :', heaterService.isOn);
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
