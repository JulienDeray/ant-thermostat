'use strict';

var Constants = require('../utils/constants.service.js');
var SimpleNodeLogger = require('simple-node-logger');

class LoggerService {
  constructor() {
    const opts = {
      logDirectory:'/home/pi/ant-logs',
      fileNamePattern:'roll-<DATE>.log',
      dateFormat:'YYYY.MM.DD',
  		timestampFormat:'YYYY-MM-DD HH:mm:ss'
  	};

  	this.logger = SimpleNodeLogger.createRollingFileLogger( opts );
  }

  log(goal, temperature, action, heaterState) {
    const date = new Date();
    this.logger.info('Mode : ', date.getHours() >= Constants.nightHours || date.getHours() < Constants.dayHours ? 'Night' : 'Day');
    this.logger.info('Goal : ', goal, '°C');
    this.logger.info('Temperature : ', temperature, '°C');
    this.logger.info('Action : ', action ? 'Heating' : 'NOT Heating');
    this.logger.info('Heater State : ', heaterState ? 'On' : 'Off');
  }
}

module.exports = LoggerService;
