'use strict';

const menu = require('../common/menu');
const passport = require('passport');
const mongodb = require('mongodb');

/* A controller for banner admin routes. */
function controller(app) {
  // Interface for creating a new banner image
  app.get('/admin/create-banner', passport.authenticate('basic', { session: false }), function (req, res) {
    let data = {
      menu: menu(),
      showBanner: false
    };
    res.render('admin/create-banner', data);
  });

  // Create a new banner image.
  app.post('/banner', passport.authenticate('basic', { session: false }), function (req, res) {
    let db = app.get('database');
    db.collection('banner').insertOne({
      img: req.body.img,
      alt: req.body.alt,
      link: req.body.link,
      bg: req.body.bg,
      createdAt: Date.now()
    }).then(function() {
      res.sendStatus(200);
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });

  // Update an existing banner image.
  app.patch('/banner', passport.authenticate('basic', { session: false }), function (req, res) {
    let db = app.get('database');
    let id = req.body.id;
    db.collection('banner').findOne({_id: mongodb.ObjectId(id)}).then(function(bannerItem) {
      let img = bannerItem.img;
      let createdAt = bannerItem.createdAt;
      db.collection('banner').update({
        _id: mongodb.ObjectId(id)
      }, {
        $set: {
          img: img,
          alt: req.body.alt,
          link: req.body.link,
          bg: req.body.bg,
          createdAt: createdAt,
          updatedAt: Date.now()
        }
      }).then(function() {
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

  // Delete a banner image.
  app.delete('/banner', passport.authenticate('basic', { session: false }), function (req, res) {
    let db = app.get('database');
    let id = req.body.id;
    db.collection('banner').remove({
      _id: mongodb.ObjectId(id)
    }).then(function() {
      res.sendStatus(200);
    }).catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });
}

module.exports = controller;
