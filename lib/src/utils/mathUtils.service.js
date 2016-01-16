'use strict';

class MathUtilsService {
  static round2decimals(num) {
    return Math.round(num * 100) / 100;
  }

  static getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
}

module.exports = MathUtilsService;
