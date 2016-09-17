'use strict';

const menu = require('../common/menu');
const banner = require('../common/banner');
const donate = require('../common/donate');
const passport = require('passport');

/* A controller for the admin page. */
function controller(app) {
  app.get('/admin', passport.authenticate('basic', { session: false }), function (req, res) {
    banner(app).then(function(banner) {
      donate(app).then(function(donate) {
        let data = {
          menu: menu(),
          showBanner: false,
          banner: banner,
          donate: donate
        };
        res.render('admin/admin', data);
      });
    });
  });
}

module.exports = controller;
