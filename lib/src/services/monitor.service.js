'use strict';

var MongoDriver = require('../utils/mongoDriver.service.js');

class MonitorService extends MongoDriver {
  constructor() {
    super();
  }

  recordTemperature(temperature) {
    super.query(() => {
      console.log(`inserting ${temperature} !`);
    });
  }
}

module.exports = MonitorService;
