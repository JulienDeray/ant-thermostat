'use strict';

class Constants {
  static get temperatureRecordInterval() { return 1 * 60 * 1000; }
  static get temperatureExpected() { return 20; }
  static get inertie() { return 1; }
  static get sensorId() { return '28-0315a48177ff'; }
}

module.exports = Constants;
