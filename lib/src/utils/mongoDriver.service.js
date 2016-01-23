'use strict';

const MongoClient = require('mongodb').MongoClient;

class MongoDriver {
  get url() {
     return 'mongodb://localhost:27017/antthermostat';
  }

  query(fn) {
    MongoClient.connect(this.url, (err, db) => {
      if (err) {
        console.log(err.toString());
        throw err;
      }
      console.log("Inserting into DB.");
      fn(db);
      db.close();
    });
  }
}

module.exports = MongoDriver;
