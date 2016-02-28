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
    if (!this.isOn) {
      this.on = true;
      wpi.digitalWrite(18, 0);
    }
  }

  stop() {
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
