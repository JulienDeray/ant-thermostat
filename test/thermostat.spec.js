'use strict';

let sinon = require('sinon'),
    rewire = require('rewire'),
    assert = require('assert'),
    should = require('should');

let ThermostatsService = rewire('../lib/src/services/thermostats.service.js');

describe('ThermostatsService', function() {
  describe('starting up', function () {
    it('should heat up and stabilize at the given temperature', function () {
      const initialTemperature = 23;

      const start = sinon.spy();
      const stop = sinon.spy();

      ThermostatsService.__set__({
        heaterService: {
          start: start,
          stop: stop
        }
      });

      let thermostatsService = new ThermostatsService();
      thermostatsService.regulate(start, start);

      start.calledOnce.should.equal(true, 'startHeater not called');
    });
  });
});
