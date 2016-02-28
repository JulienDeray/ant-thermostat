'use strict';

var MongoDriver = require('../utils/mongoDriver.service.js');

class MonitorService extends MongoDriver {
  constructor() {
    super();
  }

  recordTemperature(temperature) {
    super.query((db) => {
      var temperatures = db.collection('temperatures');
      temperatures.insert({ timestamp: new Date(), temperature: temperature },
        (err, result) => {
          if (err) {
            console.log(err.toString());
          }
        });
    });
  }
}

module.exports = MonitorService;
