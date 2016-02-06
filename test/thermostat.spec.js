'use strict';

let sinon = require('sinon'),
    rewire = require('rewire'),
    assert = require('assert'),
    should = require('should');

let ThermostatsService = rewire('../lib/src/services/thermostats.service.js');

describe('ThermostatsService', function() {
  let start,
    stop,
    thermostatsService;

  beforeEach(function() {
    start = sinon.spy();
    stop = sinon.spy();
    const recordTemperature = sinon.spy();

    ThermostatsService.__set__({
      heaterService: {
        start: start,
        stop: stop
      },
      monitorService: {
        recordTemperature: recordTemperature
      }
    });

    thermostatsService = new ThermostatsService();
  });

  describe('bellow the threshold - going up', function() {
    it('should start heating', function() {
      thermostatsService.regulate(23, 23);
      start.called.should.equal(true, "heater didn't start");
    });

    it('should continue heating', function() {
      thermostatsService.regulate(24, 23);
      start.called.should.equal(true, 'heater stopped');
    });

    it('should stop heating', function() {
      thermostatsService.regulate(24, 22);
      stop.called.should.equal(true, "heater didn't stop");
    });
  });

  describe('bellow the threshold - going down', function() {
    it('should restart the heater', function() {
      thermostatsService.regulate(24, 25);
      start.calledOnce.should.equal(true, "heater didn't start again");
    });
  });

  describe('exceeding the threshold - going up', function() {
    it('should let the heater off', function() {
      thermostatsService.regulate(27, 25);
      stop.called.should.equal(true, "heater didn't stop");
    });
  });

  describe('exceeding the threshold - going down', function() {
    it('should startthe heater', function() {
      thermostatsService.regulate(25, 27);
      start.called.should.equal(true, "heater didn't start");
    });
  });

  describe('greater than the threshold - going up', function() {
    it('should stop the heater', function() {
      thermostatsService.regulate(28, 27);
      stop.calledOnce.should.equal(true, "heater didn't stop");
    });
  });

  describe('greater than the threshold - going down', function() {
    it('should stop the heater', function() {
      thermostatsService.regulate(27, 28);
      stop.calledOnce.should.equal(true, "heater didn't stop");
    });

    it('should start the heater', function() {
      thermostatsService.regulate(26, 27);
      start.calledOnce.should.equal(true, "heater didn't start");
    });
  });
});
