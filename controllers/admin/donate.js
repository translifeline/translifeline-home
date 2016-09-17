'use strict';

const passport = require('passport');
const mongodb = require('mongodb');

/* A controller for the donate admin routes. */
function controller(app) {
  // Update donate page data.
  app.post('/donate', passport.authenticate('basic', { session: false }), function (req, res) {
    let data = {
      title: req.body.title,
      text: req.body.text,
      img: req.body.img,
      goal: req.body.goal,
      start: req.body.start,
      end: req.body.end,
      matchMultiplier: req.body.matchMultiplier,
      matchMax: req.body.matchMax,
      updatedAt: Date.now()
    };
    let db = app.get('database');

    db.collection('donate').findOne({}).then(function(doc) {
      if (doc) {
        db.collection('donate').update({
          _id: mongodb.ObjectId(doc._id)
        }, {
          $set: { data }
        }).then(function() {
          res.sendStatus(200);
        }).catch(function(err) {
          console.log(err);
          res.sendStatus(500);
        });
      } else {
        db.collection('donate').insertOne(data).then(function() {
          res.sendStatus(200);
        }).catch(function(err) {
          console.log(err);
          res.sendStatus(500);
        });
      }
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });
}

module.exports = controller;