'use strict';

var wpi = require('wiring-pi');

class HeaterService {
  constructor() {
    this.on = false;
    wpi.pinMode(1, 'OUTPUT');
    wpi.digitalWrite(1, 0);
  }

  start() {
    console.log('start');
    if (!this.isOn) {
      this.on = true;
      wpi.digitalWrite(1, 1);
    }
  }

  stop() {
    console.log('stop');
    if (this.isOn) {
      this.on = false;
      wpi.digitalWrite(1, 0);
    }
  }

  get isOn() {
    return this.on;
  }
}

module.exports = HeaterService;
