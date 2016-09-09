'use strict';

const menu = require('../common/menu');

/* A controller for the home page. */
function controller(app) {
  app.get('/admin', function (req, res) {
    let data = {
      menu: menu(),
      showBanner: false
    };
    res.render('admin', data);
  });
}

module.exports = controller;
