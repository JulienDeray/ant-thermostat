'use strict';

var gpio = require("gpio");

class HeaterService {
  constructor() {
    this.on = false;

    var gpio1 = gpio1.export({
       direction: 'out',
       interval: 200,
       ready: () => gpio1.set(1, () => console.log(gpio1.value));
    });
  }

  start() {
    if (!this.isOn) {
      this.on = true;
      gpio1.set(0, () => console.log('-- Heater started ! --'));
    }
  }

  stop() {
    if (this.isOn) {
      this.on = false;
      gpio1.set(1, () => console.log('-- Heater stopped ! --'));
    }
  }

  get isOn() {
    return this.on;
  }
}

module.exports = HeaterService;
