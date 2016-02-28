'use strict';

var Constants = require('../utils/constants.service.js');

class LoggerService {
  constructor() {
  }

  log(goal, temperature, action, heaterState) {
    const date = new Date();
    console.log('==', date, '==');
    console.log('Mode :', date.getHours() >= Constants.nightHours || date.getHours() < Constants.dayHours ? 'Night' : 'Day');
    console.log('Goal :', goal, '°C');
    console.log('Temperature :', temperature, '°C');
    console.log('Action : ', action ? 'Heating' : 'NOT Heating');
    console.log('Heater State :', heaterState ? 'On' : 'Off');
  }
}

module.exports = LoggerService;
