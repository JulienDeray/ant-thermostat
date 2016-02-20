'use strict';

var gpio = require("gpio");

class HeaterService {
  constructor() {
    this.on = false;

    this.gpio1 = gpio.export({
       direction: 'out',
       interval: 200,
       ready: () => gpio1.set(1, () => console.log(gpio1.value))
    });
  }

  start() {
    console.log('start');
    if (!this.isOn) {
      this.on = true;
      this.gpio1.set(0, () => console.log('-- Heater started ! --'));
    }
  }

  stop() {
    console.log('stop');
    if (this.isOn) {
      this.on = false;
      this.gpio1.set(1, () => console.log('-- Heater stopped ! --'));
    }
  }

  get isOn() {
    return this.on;
  }
}

module.exports = HeaterService;
