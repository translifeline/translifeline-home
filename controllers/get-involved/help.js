'use strict';

const menu = require('../common/menu');
const banner = require('../common/banner')

/* A controller for the home page. */
function controller(app) {
  app.get('/help', function (req, res) {
    banner(app).then(function(banner) {
      let data = {
        menu: menu(),
        showBanner: false,
        banner: banner,
        showSidebar: true
      };
      res.render('get-involved/help', data);
    });
  });
}

module.exports = controller;
