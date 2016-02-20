'use strict';

var wpi = require('wiring-pi');

class HeaterService {
  constructor() {
    this.on = false;
    wpi.setup('gpio');
    wpi.pinMode(1, wpi.OUTPUT);
    wpi.digitalWrite(18, 1);
  }

  start() {
    console.log('start');
    if (!this.isOn) {
      this.on = true;
      wpi.digitalWrite(18, 0);
    }
  }

  stop() {
    console.log('stop');
    if (this.isOn) {
      this.on = false;
      wpi.digitalWrite(18, 1);
    }
  }

  get isOn() {
    return this.on;
  }
}

module.exports = HeaterService;
