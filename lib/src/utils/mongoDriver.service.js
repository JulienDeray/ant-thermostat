'use strict';

const MongoClient = require('mongodb').MongoClient;

class MongoDriver {
  get url() {
     return 'mongodb://localhost:27017/antthermostat';
  }

  query(fn) {
    MongoClient.connect(this.url, (err, db) => {
      console.log("Connected correctly to server.");
      fn();
      db.close();
    });
  }
}

module.exports = MongoDriver;
