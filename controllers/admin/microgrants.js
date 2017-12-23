'use strict';

const passport = require('passport');
const mongodb = require('mongodb');

/* A controller for the donate admin routes. */
function controller(app) {
  // Update donate page data.
  app.post('/microgrants', passport.authenticate('basic', { session: false }), function (req, res) {
    let data = {
      title: req.body.title,
      text: req.body.text,
      img: req.body.img,
      alt: req.body.alt,
      goal: req.body.goal,
      start: req.body.start,
      end: req.body.end,
      matchMultiplier: req.body.matchMultiplier,
      matchMax: req.body.matchMax,
      updatedAt: Date.now()
    };
    let db = app.get('database');

    db.collection('microgrants').findOne({}).then(function(doc) {
      db.collection('microgrants').update({}, data, {upsert: true}).then(function() {
        res.sendStatus(200);
      }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });
}

module.exports = controller;
