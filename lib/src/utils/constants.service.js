'use strict';

class Constants {
  static get temperatureRecordInterval() { return  10 * 1000; }
  static get temperatureExpectedByNight() { return 22; }
  static get temperatureExpectedByDay() { return 26; }
  static get nightHours() { return 21; }
  static get dayHours() { return 8; }
  static get inertie() { return 1; }
  static get sensorId() { return '28-0315a48177ff'; }
}

module.exports = Constants;
