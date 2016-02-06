'use strict';

class HeaterService {
  constructor() {
    this.on = false;
  }

  start() {
    if (!this.isOn) {
      this.on = true;
      console.log('-- Heater started ! --');
    }
  }

  stop() {
    if (this.isOn) {
      this.on = false;
      console.log('-- Heater stopped ! --');
    }
  }

  get isOn() {
    return this.on;
  }
}

module.exports = HeaterService;
