'use strict';

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const prompt = require('prompt');

MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
  if (err) {
    console.log(error);
    process.exit(1);
  } else {
    db.collection('admin').find({}).toArray().then(function(docs) {
      if (docs.length === 0) {
        prompt.start();
        prompt.get({
          properties: {
            password: {
              description: 'Enter your password',
              type: 'string',
              hidden: true,
              required: true
            }
          }
        }, function (err, result) {
          bcrypt.hash(result.password, 10, function(err, hash) {
            if(err) {
              console.log(error);
              process.exit(1);
            } else {
              db.collection('admin').insertOne({password: hash}).then(function() {
                console.log('Password set!');
                prompt.stop();
                process.exit(0);
              }).catch(function(err) {
                console.log(error);
                process.exit(1);
              });
            }
          });
          result.password;
        });
      } else {
        console.log('Password has already been set.');
        process.exit(1);
      }
    });
  }
});
