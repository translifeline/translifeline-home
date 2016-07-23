'use strict';

const menu = require('../common/menu');
const banner = require('../common/banner')

/* A controller for the home page. */
function controller(app) {
  app.get('/staff', function (req, res) {
    let data = {
      menu: menu(),
      showBanner: true,
      banner: banner()
    };
    res.render('about/staff', data);
  });
}

module.exports = controller;
