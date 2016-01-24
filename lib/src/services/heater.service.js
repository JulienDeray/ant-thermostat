'use strict';

var on = false;

class HeaterService {
  start() {
    on = true;
    console.log('-- Heater started ! --');
  }

  stop() {
    on = false;
    console.log('-- Heater stopped ! --');
  }

  get isOn() {
    return on;
  }
}

module.exports = HeaterService;
