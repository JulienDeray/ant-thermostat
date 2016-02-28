'use strict';

class LoggerService {
  constructor() {
  }

  log(goal, temperature, action) {
    const date = new Date();
    console.log('==', date, '==');
    console.log('Mode :', date.getHours() >= Constants.nightHours || date.getHours() < Constants.dayHours ? 'Night' : 'Day');
    console.log('Goal :', goal, '°C');
    console.log('Temperature :', temperatureN, '°C');
    console.log('Action : ', action ? 'Heating' : 'NOT Heating');
    console.log('Heater State :', heaterService.isOn);
  }
}

module.exports = LoggerService;
