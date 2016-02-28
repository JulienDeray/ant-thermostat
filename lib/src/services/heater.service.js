'use strict';

var wpi = require('wiring-pi');

class HeaterService {
  constructor() {
    wpi.setup('gpio');
    wpi.pinMode(1, wpi.OUTPUT);
    wpi.digitalWrite(18, 1);
  }

  start() {
    wpi.digitalWrite(18, 0);
  }

  stop() {
    wpi.digitalWrite(18, 1);
  }

  get isOn() {
    return wpi.digitalRead(18) === 0;
  }
}

module.exports = HeaterService;
