'use strict';

const menu = require('../common/menu');
const passport = require('passport');

/* A controller for the home page. */
function controller(app) {
  app.get('/admin', passport.authenticate('basic', { session: false }), function (req, res) {
    let data = {
      menu: menu(),
      showBanner: false
    };
    res.render('admin/admin', data);
  });
}

module.exports = controller;
